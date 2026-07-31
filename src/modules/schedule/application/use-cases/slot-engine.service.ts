import { Injectable } from '@nestjs/common';
import { IScheduleRepository } from '../../domain/repositories/schedule.repository.interface';
import {
  WorkingHoursEntity, ScheduleExceptionEntity, GeneratedSlotEntity,
} from '../../domain/entities/schedule.entity';

export interface SlotWindow {
  start: string; // HH:mm
  end: string;   // HH:mm
}

@Injectable()
export class SlotEngineService {
  constructor() {}

  /**
   * Deterministic slot generation algorithm:
   * 1. For each date in [fromDate, toDate]:
   *    a. Find matching WorkingHours entry for that day-of-week
   *    b. Skip if date is a holiday, leave day, or exception
   *    c. Split session window by break periods
   *    d. Slice each window into (slotDurationMinutes + bufferMinutes) intervals
   * 2. Return array of GeneratedSlot objects (NOT persisted here)
   */
  generateSlots(params: {
    scheduleId: string;
    fromDate: Date;
    toDate: Date;
    workingHours: WorkingHoursEntity[];
    exceptions: ScheduleExceptionEntity[];
    holidayDates: Date[];
    leaveDates: Date[];
    slotDurationMinutes: number;
    bufferMinutes: number;
  }): Omit<GeneratedSlotEntity, 'id' | 'createdAt'>[] {
    const {
      scheduleId, fromDate, toDate, workingHours, exceptions,
      holidayDates, leaveDates, slotDurationMinutes, bufferMinutes,
    } = params;

    const slots: Omit<GeneratedSlotEntity, 'id' | 'createdAt'>[] = [];
    const totalSlotMinutes = slotDurationMinutes + bufferMinutes;

    // Normalize dates for comparison (strip time)
    const normalizeDate = (d: Date) => new Date(d.getFullYear(), d.getMonth(), d.getDate());
    const holidaySet = new Set(holidayDates.map((d) => normalizeDate(d).toISOString()));
    const leaveSet = new Set(leaveDates.map((d) => normalizeDate(d).toISOString()));

    // Build exception time blocks: [startMs, endMs]
    const exceptionBlocks = exceptions.map((ex) => [
      new Date(ex.startDatetime).getTime(),
      new Date(ex.endDatetime).getTime(),
    ]);

    const current = new Date(normalizeDate(fromDate));
    const end = normalizeDate(toDate);

    while (current <= end) {
      const dayOfWeek = current.getDay(); // 0=Sunday, 1=Monday, ...
      const dateKey = current.toISOString();
      const slotDateCopy = new Date(current);

      // Skip holidays
      if (holidaySet.has(dateKey)) {
        current.setDate(current.getDate() + 1);
        continue;
      }

      // Skip leave dates
      if (leaveSet.has(dateKey)) {
        current.setDate(current.getDate() + 1);
        continue;
      }

      // Check if any exception fully covers this date
      const dayStartMs = slotDateCopy.getTime();
      const dayEndMs = dayStartMs + 24 * 60 * 60 * 1000;
      const fullDayException = exceptionBlocks.some(([s, e]) => s <= dayStartMs && e >= dayEndMs);
      if (fullDayException) {
        current.setDate(current.getDate() + 1);
        continue;
      }

      // Find all working-hours entries for this day-of-week
      const dayHours = workingHours.filter((wh) => wh.dayOfWeek === dayOfWeek && wh.isEnabled);

      for (const wh of dayHours) {
        // Get sub-windows from the session (accounting for break)
        const windows = this.splitByBreak(wh.startTime, wh.endTime, wh.breakStart, wh.breakEnd);

        for (const win of windows) {
          let curMinutes = this.timeToMinutes(win.start);
          const endMinutes = this.timeToMinutes(win.end);

          while (curMinutes + slotDurationMinutes <= endMinutes) {
            const slotStart = this.minutesToTime(curMinutes);
            const slotEnd = this.minutesToTime(curMinutes + slotDurationMinutes);

            // Check if this specific slot falls in an exception window
            const slotStartMs = this.dateTimeMs(slotDateCopy, slotStart);
            const slotEndMs = this.dateTimeMs(slotDateCopy, slotEnd);
            const inException = exceptionBlocks.some(([s, e]) => slotStartMs < e && slotEndMs > s);

            if (!inException) {
              slots.push({
                scheduleId,
                slotDate: new Date(slotDateCopy),
                startTime: slotStart,
                endTime: slotEnd,
                durationMinutes: slotDurationMinutes,
                status: 'AVAILABLE' as any,
                statusReason: null,
              });
            }

            curMinutes += totalSlotMinutes;
          }
        }
      }

      current.setDate(current.getDate() + 1);
    }

    return slots;
  }

  private splitByBreak(startTime: string, endTime: string, breakStart?: string | null, breakEnd?: string | null): SlotWindow[] {
    if (!breakStart || !breakEnd) {
      return [{ start: startTime, end: endTime }];
    }
    const windows: SlotWindow[] = [];
    // Window before break
    if (this.timeToMinutes(breakStart) > this.timeToMinutes(startTime)) {
      windows.push({ start: startTime, end: breakStart });
    }
    // Window after break
    if (this.timeToMinutes(endTime) > this.timeToMinutes(breakEnd)) {
      windows.push({ start: breakEnd, end: endTime });
    }
    return windows.length > 0 ? windows : [{ start: startTime, end: endTime }];
  }

  private timeToMinutes(time: string): number {
    const [h, m] = time.split(':').map(Number);
    return h * 60 + m;
  }

  private minutesToTime(minutes: number): string {
    const h = Math.floor(minutes / 60);
    const m = minutes % 60;
    return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
  }

  private dateTimeMs(date: Date, time: string): number {
    const [h, m] = time.split(':').map(Number);
    return new Date(date.getFullYear(), date.getMonth(), date.getDate(), h, m).getTime();
  }
}

import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { IScheduleRepository } from '../../domain/repositories/schedule.repository.interface';
import { SlotEngineService } from './slot-engine.service';
import { Logger } from 'nestjs-pino';
import {
  CreateScheduleDto, UpsertWorkingHoursDto, BlockScheduleDto, CreateLeaveBlockDto,
  GenerateSlotsDto, CreateShiftDto, AssignStaffToShiftDto, CreateHolidayDto,
} from '../../presentation/dto/create-schedule.dto';
import {
  ScheduleFullResponseDto, GeneratedSlotResponseDto, ShiftResponseDto,
  HolidayResponseDto, ScheduleAuditLogResponseDto, ScheduleStatsResponseDto,
} from '../../presentation/dto/schedule-response.dto';

@Injectable()
export class ScheduleService {
  constructor(
    @Inject('IScheduleRepository')
    private readonly repository: IScheduleRepository,
    private readonly slotEngine: SlotEngineService,
    private readonly logger: Logger,
  ) {}

  private mapSchedule(s: any): ScheduleFullResponseDto {
    return {
      id: s.id,
      ownerType: s.ownerType,
      doctorProfileId: s.doctorProfileId || undefined,
      staffId: s.staffId || undefined,
      facilityId: s.facilityId || undefined,
      departmentId: s.departmentId || undefined,
      title: s.title,
      timezone: s.timezone,
      slotDurationMinutes: s.slotDurationMinutes,
      bufferMinutes: s.bufferMinutes,
      maxPatientsPerSlot: s.maxPatientsPerSlot,
      effectiveFrom: s.effectiveFrom.toISOString().split('T')[0],
      effectiveTo: s.effectiveTo ? s.effectiveTo.toISOString().split('T')[0] : undefined,
      isActive: s.isActive,
      notes: s.notes || undefined,
      isDeleted: s.isDeleted,
      workingHours: s.workingHours?.map((wh: any) => ({
        id: wh.id,
        dayOfWeek: wh.dayOfWeek,
        sessionType: wh.sessionType,
        startTime: wh.startTime,
        endTime: wh.endTime,
        breakStart: wh.breakStart || undefined,
        breakEnd: wh.breakEnd || undefined,
        isEnabled: wh.isEnabled,
        createdAt: wh.createdAt.toISOString(),
      })) || [],
      exceptions: s.exceptions?.map((ex: any) => ({
        id: ex.id,
        exceptionType: ex.exceptionType,
        startDatetime: ex.startDatetime.toISOString(),
        endDatetime: ex.endDatetime.toISOString(),
        reason: ex.reason || undefined,
        addedBy: ex.addedBy || undefined,
        createdAt: ex.createdAt.toISOString(),
      })) || [],
      leaveBlocks: s.leaveBlocks?.map((lb: any) => ({
        id: lb.id,
        leaveType: lb.leaveType,
        startDate: lb.startDate.toISOString().split('T')[0],
        endDate: lb.endDate.toISOString().split('T')[0],
        reason: lb.reason || undefined,
        status: lb.status,
        createdAt: lb.createdAt.toISOString(),
      })) || [],
      createdAt: s.createdAt.toISOString(),
      updatedAt: s.updatedAt.toISOString(),
    };
  }

  // ─── Schedule CRUD ───────────────────────────────────────────────────────

  async createSchedule(userId: string, dto: CreateScheduleDto): Promise<ScheduleFullResponseDto> {
    const schedule = await this.repository.createSchedule({ ...dto, createdBy: userId });

    if (dto.workingHours && dto.workingHours.length > 0) {
      await this.repository.upsertWorkingHours(schedule.id, dto.workingHours);
    }

    await this.repository.createAuditLog({
      scheduleId: schedule.id,
      action: 'CREATED',
      performedBy: userId,
      details: `Schedule created for ${dto.ownerType}`,
    });

    const fresh = await this.repository.findScheduleById(schedule.id);
    return this.mapSchedule(fresh!);
  }

  async getSchedules(): Promise<ScheduleFullResponseDto[]> {
    const schedules = await this.repository.findSchedules();
    return schedules.map((s) => this.mapSchedule(s));
  }

  async getScheduleById(id: string): Promise<ScheduleFullResponseDto> {
    const schedule = await this.repository.findScheduleById(id);
    if (!schedule) throw new NotFoundException('Schedule not found');
    return this.mapSchedule(schedule);
  }

  async updateSchedule(id: string, dto: Partial<CreateScheduleDto>): Promise<ScheduleFullResponseDto> {
    const schedule = await this.repository.findScheduleById(id);
    if (!schedule) throw new NotFoundException('Schedule not found');

    const updated = await this.repository.updateSchedule(id, dto);

    if (dto.workingHours && dto.workingHours.length > 0) {
      await this.repository.upsertWorkingHours(id, dto.workingHours);
    }

    await this.repository.createAuditLog({ scheduleId: id, action: 'UPDATED', details: 'Schedule updated' });
    const fresh = await this.repository.findScheduleById(id);
    return this.mapSchedule(fresh!);
  }

  async softDeleteSchedule(id: string): Promise<{ message: string }> {
    const schedule = await this.repository.findScheduleById(id);
    if (!schedule) throw new NotFoundException('Schedule not found');
    await this.repository.softDeleteSchedule(id);
    return { message: 'Schedule soft-deleted successfully' };
  }

  async searchSchedules(query: string): Promise<ScheduleFullResponseDto[]> {
    if (!query?.trim()) return [];
    const results = await this.repository.searchSchedules(query.trim());
    return results.map((s) => this.mapSchedule(s));
  }

  async getStatistics(): Promise<ScheduleStatsResponseDto> {
    return this.repository.getStatistics();
  }

  // ─── Slot Generation Engine ──────────────────────────────────────────────

  async generateSlots(id: string, dto: GenerateSlotsDto, userId: string): Promise<{ generated: number; slots: GeneratedSlotResponseDto[] }> {
    const schedule = await this.repository.findScheduleById(id);
    if (!schedule) throw new NotFoundException('Schedule not found');

    const fromDate = new Date(dto.fromDate);
    const toDate = new Date(dto.toDate);

    // Resolve holidays and leave blocks for the date range
    const holidays = await this.repository.findHolidaysInRange(fromDate, toDate, schedule.facilityId || undefined);
    const holidayDates = holidays.map((h) => new Date(h.holidayDate));

    const leaveBlocks = schedule.leaveBlocks || [];
    const leaveDates: Date[] = [];
    for (const lb of leaveBlocks) {
      const lbStart = new Date(lb.startDate);
      const lbEnd = new Date(lb.endDate);
      const cur = new Date(lbStart);
      while (cur <= lbEnd) {
        leaveDates.push(new Date(cur));
        cur.setDate(cur.getDate() + 1);
      }
    }

    const workingHours = await this.repository.findWorkingHours(id);
    const exceptions = await this.repository.findExceptions(id);

    // Delete existing AVAILABLE slots in range before regenerating
    await this.repository.deleteSlotsByScheduleAndDate(id, fromDate, toDate);

    const rawSlots = this.slotEngine.generateSlots({
      scheduleId: id,
      fromDate,
      toDate,
      workingHours,
      exceptions,
      holidayDates,
      leaveDates,
      slotDurationMinutes: schedule.slotDurationMinutes,
      bufferMinutes: schedule.bufferMinutes,
    });

    const generated = await this.repository.bulkUpsertSlots(rawSlots);

    await this.repository.createAuditLog({
      scheduleId: id,
      action: 'SLOTS_GENERATED',
      performedBy: userId,
      details: `Generated ${generated} slots from ${dto.fromDate} to ${dto.toDate}`,
    });

    const persistedSlots = await this.repository.findSlotsByScheduleAndDate(id, fromDate, toDate);
    return {
      generated,
      slots: persistedSlots.map((slot) => ({
        id: slot.id,
        scheduleId: slot.scheduleId,
        slotDate: new Date(slot.slotDate).toISOString().split('T')[0],
        startTime: slot.startTime,
        endTime: slot.endTime,
        durationMinutes: slot.durationMinutes,
        status: slot.status,
        statusReason: slot.statusReason || undefined,
        createdAt: slot.createdAt.toISOString(),
      })),
    };
  }

  async getSlots(id: string, fromDate: string, toDate: string): Promise<GeneratedSlotResponseDto[]> {
    const schedule = await this.repository.findScheduleById(id);
    if (!schedule) throw new NotFoundException('Schedule not found');

    const slots = await this.repository.findSlotsByScheduleAndDate(id, new Date(fromDate), new Date(toDate));
    return slots.map((slot) => ({
      id: slot.id,
      scheduleId: slot.scheduleId,
      slotDate: new Date(slot.slotDate).toISOString().split('T')[0],
      startTime: slot.startTime,
      endTime: slot.endTime,
      durationMinutes: slot.durationMinutes,
      status: slot.status,
      statusReason: slot.statusReason || undefined,
      createdAt: slot.createdAt.toISOString(),
    }));
  }

  // ─── Blocking ───────────────────────────────────────────────────────────

  async blockSchedule(id: string, dto: BlockScheduleDto, userId: string): Promise<ScheduleFullResponseDto> {
    const schedule = await this.repository.findScheduleById(id);
    if (!schedule) throw new NotFoundException('Schedule not found');

    await this.repository.createException(id, { ...dto, addedBy: userId });
    await this.repository.createAuditLog({
      scheduleId: id,
      action: 'BLOCKED',
      performedBy: userId,
      details: `Exception: ${dto.exceptionType} from ${dto.startDatetime} to ${dto.endDatetime}`,
    });

    const fresh = await this.repository.findScheduleById(id);
    return this.mapSchedule(fresh!);
  }

  async unblockSchedule(id: string, exceptionId: string, userId: string): Promise<ScheduleFullResponseDto> {
    const schedule = await this.repository.findScheduleById(id);
    if (!schedule) throw new NotFoundException('Schedule not found');

    await this.repository.deleteException(exceptionId);
    await this.repository.createAuditLog({
      scheduleId: id,
      action: 'UNBLOCKED',
      performedBy: userId,
      details: `Exception ${exceptionId} removed`,
    });

    const fresh = await this.repository.findScheduleById(id);
    return this.mapSchedule(fresh!);
  }

  async addLeaveBlock(id: string, dto: CreateLeaveBlockDto, userId: string): Promise<ScheduleFullResponseDto> {
    const schedule = await this.repository.findScheduleById(id);
    if (!schedule) throw new NotFoundException('Schedule not found');

    await this.repository.createLeaveBlock(id, { ...dto, approvedBy: userId });
    await this.repository.createAuditLog({
      scheduleId: id,
      action: 'LEAVE_ADDED',
      performedBy: userId,
      details: `Leave ${dto.leaveType} from ${dto.startDate} to ${dto.endDate}`,
    });

    const fresh = await this.repository.findScheduleById(id);
    return this.mapSchedule(fresh!);
  }

  async getHistory(id: string): Promise<ScheduleAuditLogResponseDto[]> {
    const schedule = await this.repository.findScheduleById(id, true);
    if (!schedule) throw new NotFoundException('Schedule not found');
    const logs = await this.repository.findAuditLogs(id);
    return logs.map((l) => ({
      id: l.id,
      scheduleId: l.scheduleId,
      action: l.action,
      performedBy: l.performedBy || undefined,
      details: l.details || undefined,
      createdAt: l.createdAt.toISOString(),
    }));
  }

  // ─── Shifts ──────────────────────────────────────────────────────────────

  async createShift(dto: CreateShiftDto): Promise<ShiftResponseDto> {
    const shift = await this.repository.createShift(dto);
    return this.mapShift(shift);
  }

  async getShifts(facilityId?: string): Promise<ShiftResponseDto[]> {
    const shifts = await this.repository.findShifts(facilityId);
    return shifts.map((s) => this.mapShift(s));
  }

  async assignStaffToShift(shiftId: string, dto: AssignStaffToShiftDto): Promise<ShiftResponseDto> {
    const shift = await this.repository.findShiftById(shiftId);
    if (!shift) throw new NotFoundException('Shift not found');
    await this.repository.assignStaffToShift(shiftId, dto);
    const fresh = await this.repository.findShiftById(shiftId);
    return this.mapShift(fresh!);
  }

  async getShiftAssignments(shiftId: string): Promise<any[]> {
    const shift = await this.repository.findShiftById(shiftId);
    if (!shift) throw new NotFoundException('Shift not found');
    const assignments = await this.repository.findShiftAssignments(shiftId);
    return assignments.map((a) => ({
      id: a.id,
      shiftId: a.shiftId,
      staffId: a.staffId,
      assignedDate: new Date(a.assignedDate).toISOString().split('T')[0],
      status: a.status,
      notes: a.notes || undefined,
      createdAt: a.createdAt.toISOString(),
    }));
  }

  private mapShift(s: any): ShiftResponseDto {
    return {
      id: s.id,
      facilityId: s.facilityId,
      departmentId: s.departmentId || undefined,
      name: s.name,
      shiftType: s.shiftType,
      startTime: s.startTime,
      endTime: s.endTime,
      breakDurationMinutes: s.breakDurationMinutes,
      isActive: s.isActive,
      assignments: s.assignments?.map((a: any) => ({
        id: a.id,
        staffId: a.staffId,
        assignedDate: new Date(a.assignedDate).toISOString().split('T')[0],
        status: a.status,
        notes: a.notes || undefined,
        createdAt: a.createdAt.toISOString(),
      })) || [],
      createdAt: s.createdAt.toISOString(),
      updatedAt: s.updatedAt.toISOString(),
    };
  }

  // ─── Holidays ────────────────────────────────────────────────────────────

  async createHoliday(dto: CreateHolidayDto): Promise<HolidayResponseDto> {
    const holiday = await this.repository.createHoliday(dto);
    return this.mapHoliday(holiday);
  }

  async getHolidays(facilityId?: string): Promise<HolidayResponseDto[]> {
    const holidays = await this.repository.findHolidays(facilityId);
    return holidays.map((h) => this.mapHoliday(h));
  }

  private mapHoliday(h: any): HolidayResponseDto {
    return {
      id: h.id,
      facilityId: h.facilityId || undefined,
      name: h.name,
      holidayDate: new Date(h.holidayDate).toISOString().split('T')[0],
      isRecurring: h.isRecurring,
      description: h.description || undefined,
      createdAt: h.createdAt.toISOString(),
    };
  }
}

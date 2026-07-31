import { WorkingHoursEntity, ScheduleExceptionEntity, GeneratedSlotEntity } from '../../domain/entities/schedule.entity';
export interface SlotWindow {
    start: string;
    end: string;
}
export declare class SlotEngineService {
    constructor();
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
    }): Omit<GeneratedSlotEntity, 'id' | 'createdAt'>[];
    private splitByBreak;
    private timeToMinutes;
    private minutesToTime;
    private dateTimeMs;
}

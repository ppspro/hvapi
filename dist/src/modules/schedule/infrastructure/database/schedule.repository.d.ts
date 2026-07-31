import { DatabaseService } from "../../../../database/database.service";
import { IScheduleRepository } from '../../domain/repositories/schedule.repository.interface';
import { ScheduleEntity, WorkingHoursEntity, ScheduleExceptionEntity, LeaveBlockEntity, HolidayCalendarEntity, ShiftEntity, ShiftAssignmentEntity, GeneratedSlotEntity, ScheduleAuditLogEntity } from '../../domain/entities/schedule.entity';
export declare class ScheduleRepository implements IScheduleRepository {
    private readonly db;
    constructor(db: DatabaseService);
    createSchedule(data: any): Promise<ScheduleEntity>;
    findScheduleById(id: string, includeDeleted?: boolean): Promise<ScheduleEntity | null>;
    findSchedules(includeDeleted?: boolean): Promise<ScheduleEntity[]>;
    updateSchedule(id: string, data: any): Promise<ScheduleEntity>;
    softDeleteSchedule(id: string): Promise<void>;
    searchSchedules(query: string): Promise<ScheduleEntity[]>;
    upsertWorkingHours(scheduleId: string, hours: any[]): Promise<WorkingHoursEntity[]>;
    findWorkingHours(scheduleId: string): Promise<WorkingHoursEntity[]>;
    createException(scheduleId: string, data: any): Promise<ScheduleExceptionEntity>;
    deleteException(exceptionId: string): Promise<void>;
    findExceptions(scheduleId: string): Promise<ScheduleExceptionEntity[]>;
    createLeaveBlock(scheduleId: string, data: any): Promise<LeaveBlockEntity>;
    findLeaveBlocks(scheduleId: string): Promise<LeaveBlockEntity[]>;
    createHoliday(data: any): Promise<HolidayCalendarEntity>;
    findHolidays(facilityId?: string): Promise<HolidayCalendarEntity[]>;
    findHolidaysInRange(startDate: Date, endDate: Date, facilityId?: string): Promise<HolidayCalendarEntity[]>;
    createShift(data: any): Promise<ShiftEntity>;
    findShifts(facilityId?: string): Promise<ShiftEntity[]>;
    findShiftById(id: string): Promise<ShiftEntity | null>;
    assignStaffToShift(shiftId: string, data: any): Promise<ShiftAssignmentEntity>;
    findShiftAssignments(shiftId: string): Promise<ShiftAssignmentEntity[]>;
    bulkUpsertSlots(slots: any[]): Promise<number>;
    findSlotsByScheduleAndDate(scheduleId: string, fromDate: Date, toDate: Date): Promise<GeneratedSlotEntity[]>;
    deleteSlotsByScheduleAndDate(scheduleId: string, fromDate: Date, toDate: Date): Promise<void>;
    createAuditLog(data: {
        scheduleId: string;
        action: string;
        performedBy?: string;
        details?: string;
    }): Promise<ScheduleAuditLogEntity>;
    findAuditLogs(scheduleId: string): Promise<ScheduleAuditLogEntity[]>;
    getStatistics(): Promise<{
        totalSchedules: number;
        activeSchedules: number;
        doctorSchedules: number;
        staffSchedules: number;
        facilitySchedules: number;
        totalGeneratedSlots: number;
        availableSlots: number;
        totalShifts: number;
        totalHolidays: number;
    }>;
}

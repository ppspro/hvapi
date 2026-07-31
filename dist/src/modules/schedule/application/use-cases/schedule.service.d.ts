import { IScheduleRepository } from '../../domain/repositories/schedule.repository.interface';
import { SlotEngineService } from './slot-engine.service';
import { Logger } from 'nestjs-pino';
import { CreateScheduleDto, BlockScheduleDto, CreateLeaveBlockDto, GenerateSlotsDto, CreateShiftDto, AssignStaffToShiftDto, CreateHolidayDto } from '../../presentation/dto/create-schedule.dto';
import { ScheduleFullResponseDto, GeneratedSlotResponseDto, ShiftResponseDto, HolidayResponseDto, ScheduleAuditLogResponseDto, ScheduleStatsResponseDto } from '../../presentation/dto/schedule-response.dto';
export declare class ScheduleService {
    private readonly repository;
    private readonly slotEngine;
    private readonly logger;
    constructor(repository: IScheduleRepository, slotEngine: SlotEngineService, logger: Logger);
    private mapSchedule;
    createSchedule(userId: string, dto: CreateScheduleDto): Promise<ScheduleFullResponseDto>;
    getSchedules(): Promise<ScheduleFullResponseDto[]>;
    getScheduleById(id: string): Promise<ScheduleFullResponseDto>;
    updateSchedule(id: string, dto: Partial<CreateScheduleDto>): Promise<ScheduleFullResponseDto>;
    softDeleteSchedule(id: string): Promise<{
        message: string;
    }>;
    searchSchedules(query: string): Promise<ScheduleFullResponseDto[]>;
    getStatistics(): Promise<ScheduleStatsResponseDto>;
    generateSlots(id: string, dto: GenerateSlotsDto, userId: string): Promise<{
        generated: number;
        slots: GeneratedSlotResponseDto[];
    }>;
    getSlots(id: string, fromDate: string, toDate: string): Promise<GeneratedSlotResponseDto[]>;
    blockSchedule(id: string, dto: BlockScheduleDto, userId: string): Promise<ScheduleFullResponseDto>;
    unblockSchedule(id: string, exceptionId: string, userId: string): Promise<ScheduleFullResponseDto>;
    addLeaveBlock(id: string, dto: CreateLeaveBlockDto, userId: string): Promise<ScheduleFullResponseDto>;
    getHistory(id: string): Promise<ScheduleAuditLogResponseDto[]>;
    createShift(dto: CreateShiftDto): Promise<ShiftResponseDto>;
    getShifts(facilityId?: string): Promise<ShiftResponseDto[]>;
    assignStaffToShift(shiftId: string, dto: AssignStaffToShiftDto): Promise<ShiftResponseDto>;
    getShiftAssignments(shiftId: string): Promise<any[]>;
    private mapShift;
    createHoliday(dto: CreateHolidayDto): Promise<HolidayResponseDto>;
    getHolidays(facilityId?: string): Promise<HolidayResponseDto[]>;
    private mapHoliday;
}

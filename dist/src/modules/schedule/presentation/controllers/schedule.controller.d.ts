import { ScheduleService } from '../../application/use-cases/schedule.service';
import { CreateScheduleDto, GenerateSlotsDto, BlockScheduleDto, CreateLeaveBlockDto } from '../dto/create-schedule.dto';
import { ScheduleFullResponseDto, GeneratedSlotResponseDto, ScheduleAuditLogResponseDto, ScheduleStatsResponseDto } from '../dto/schedule-response.dto';
export declare class ScheduleController {
    private readonly scheduleService;
    constructor(scheduleService: ScheduleService);
    createSchedule(req: any, dto: CreateScheduleDto): Promise<ScheduleFullResponseDto>;
    getSchedules(): Promise<ScheduleFullResponseDto[]>;
    searchSchedules(query: string): Promise<ScheduleFullResponseDto[]>;
    getStatistics(): Promise<ScheduleStatsResponseDto>;
    getScheduleById(id: string): Promise<ScheduleFullResponseDto>;
    updateSchedule(id: string, dto: Partial<CreateScheduleDto>): Promise<ScheduleFullResponseDto>;
    softDeleteSchedule(id: string): Promise<any>;
    generateSlots(req: any, id: string, dto: GenerateSlotsDto): Promise<any>;
    getSlots(id: string, fromDate: string, toDate: string): Promise<GeneratedSlotResponseDto[]>;
    blockSchedule(req: any, id: string, dto: BlockScheduleDto): Promise<ScheduleFullResponseDto>;
    unblockSchedule(req: any, id: string, exceptionId: string): Promise<ScheduleFullResponseDto>;
    addLeaveBlock(req: any, id: string, dto: CreateLeaveBlockDto): Promise<ScheduleFullResponseDto>;
    getHistory(id: string): Promise<ScheduleAuditLogResponseDto[]>;
}

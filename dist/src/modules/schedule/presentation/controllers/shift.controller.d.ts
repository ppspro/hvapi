import { ScheduleService } from '../../application/use-cases/schedule.service';
import { CreateShiftDto, AssignStaffToShiftDto } from '../dto/create-schedule.dto';
import { ShiftResponseDto } from '../dto/schedule-response.dto';
export declare class ShiftController {
    private readonly scheduleService;
    constructor(scheduleService: ScheduleService);
    createShift(dto: CreateShiftDto): Promise<ShiftResponseDto>;
    getShifts(facilityId?: string): Promise<ShiftResponseDto[]>;
    assignStaffToShift(id: string, dto: AssignStaffToShiftDto): Promise<ShiftResponseDto>;
    getShiftAssignments(id: string): Promise<any[]>;
}

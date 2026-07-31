import { ScheduleService } from '../../application/use-cases/schedule.service';
import { CreateHolidayDto } from '../dto/create-schedule.dto';
import { HolidayResponseDto } from '../dto/schedule-response.dto';
export declare class HolidayController {
    private readonly scheduleService;
    constructor(scheduleService: ScheduleService);
    createHoliday(dto: CreateHolidayDto): Promise<HolidayResponseDto>;
    getHolidays(facilityId?: string): Promise<HolidayResponseDto[]>;
}

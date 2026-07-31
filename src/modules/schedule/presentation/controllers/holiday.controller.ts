import { Controller, Post, Get, Body, Query, UseGuards, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse as SwaggerResponse, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { ScheduleService } from '../../application/use-cases/schedule.service';
import { CreateHolidayDto } from '../dto/create-schedule.dto';
import { HolidayResponseDto } from '../dto/schedule-response.dto';

@ApiTags('Holidays')
@Controller('holidays')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth('JWT-Auth')
export class HolidayController {
  constructor(private readonly scheduleService: ScheduleService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Add a holiday to the calendar (global or facility-specific)' })
  @SwaggerResponse({ status: 201, type: HolidayResponseDto })
  async createHoliday(@Body() dto: CreateHolidayDto): Promise<HolidayResponseDto> {
    return this.scheduleService.createHoliday(dto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'List holidays (global + optional facility-specific)' })
  @ApiQuery({ name: 'facilityId', required: false, description: 'Filter by facility (also includes global holidays)' })
  @SwaggerResponse({ status: 200, type: [HolidayResponseDto] })
  async getHolidays(@Query('facilityId') facilityId?: string): Promise<HolidayResponseDto[]> {
    return this.scheduleService.getHolidays(facilityId);
  }
}

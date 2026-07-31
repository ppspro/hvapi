import {
  Controller, Post, Get, Put, Delete, Body, Param, Query, UseGuards, Req, HttpCode, HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse as SwaggerResponse, ApiBearerAuth, ApiParam, ApiQuery } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { ScheduleService } from '../../application/use-cases/schedule.service';
import {
  CreateScheduleDto, GenerateSlotsDto, BlockScheduleDto, CreateLeaveBlockDto,
} from '../dto/create-schedule.dto';
import {
  ScheduleFullResponseDto, GeneratedSlotResponseDto, ScheduleAuditLogResponseDto, ScheduleStatsResponseDto,
} from '../dto/schedule-response.dto';

@ApiTags('Schedules')
@Controller('schedules')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth('JWT-Auth')
export class ScheduleController {
  constructor(private readonly scheduleService: ScheduleService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a schedule profile (doctor / staff / facility)' })
  @SwaggerResponse({ status: 201, type: ScheduleFullResponseDto })
  async createSchedule(@Req() req: any, @Body() dto: CreateScheduleDto): Promise<ScheduleFullResponseDto> {
    return this.scheduleService.createSchedule(req.user.userId, dto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'List all schedule profiles' })
  @SwaggerResponse({ status: 200, type: [ScheduleFullResponseDto] })
  async getSchedules(): Promise<ScheduleFullResponseDto[]> {
    return this.scheduleService.getSchedules();
  }

  @Get('search')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Search schedules by owner type, title, facility or doctor' })
  @ApiQuery({ name: 'q', required: true })
  @SwaggerResponse({ status: 200, type: [ScheduleFullResponseDto] })
  async searchSchedules(@Query('q') query: string): Promise<ScheduleFullResponseDto[]> {
    return this.scheduleService.searchSchedules(query);
  }

  @Get('statistics')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Platform-wide scheduling engine statistics' })
  @SwaggerResponse({ status: 200, type: ScheduleStatsResponseDto })
  async getStatistics(): Promise<ScheduleStatsResponseDto> {
    return this.scheduleService.getStatistics();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get schedule detail with working hours, exceptions, leave blocks' })
  @ApiParam({ name: 'id', description: 'Schedule ID' })
  @SwaggerResponse({ status: 200, type: ScheduleFullResponseDto })
  async getScheduleById(@Param('id') id: string): Promise<ScheduleFullResponseDto> {
    return this.scheduleService.getScheduleById(id);
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Update schedule profile and/or working hours' })
  @ApiParam({ name: 'id', description: 'Schedule ID' })
  @SwaggerResponse({ status: 200, type: ScheduleFullResponseDto })
  async updateSchedule(@Param('id') id: string, @Body() dto: Partial<CreateScheduleDto>): Promise<ScheduleFullResponseDto> {
    return this.scheduleService.updateSchedule(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Soft-delete a schedule profile' })
  @ApiParam({ name: 'id', description: 'Schedule ID' })
  @SwaggerResponse({ status: 200, description: 'Schedule soft-deleted' })
  async softDeleteSchedule(@Param('id') id: string): Promise<any> {
    return this.scheduleService.softDeleteSchedule(id);
  }

  @Post(':id/generate-slots')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Run slot generation engine for a date range' })
  @ApiParam({ name: 'id', description: 'Schedule ID' })
  @SwaggerResponse({ status: 200, description: 'Generated availability slots' })
  async generateSlots(@Req() req: any, @Param('id') id: string, @Body() dto: GenerateSlotsDto): Promise<any> {
    return this.scheduleService.generateSlots(id, dto, req.user.userId);
  }

  @Get(':id/slots')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get generated slots for a schedule in a date range' })
  @ApiParam({ name: 'id', description: 'Schedule ID' })
  @ApiQuery({ name: 'fromDate', required: true, example: '2025-08-01' })
  @ApiQuery({ name: 'toDate', required: true, example: '2025-08-31' })
  @SwaggerResponse({ status: 200, type: [GeneratedSlotResponseDto] })
  async getSlots(
    @Param('id') id: string,
    @Query('fromDate') fromDate: string,
    @Query('toDate') toDate: string,
  ): Promise<GeneratedSlotResponseDto[]> {
    return this.scheduleService.getSlots(id, fromDate, toDate);
  }

  @Post(':id/block')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Add schedule exception (vacation, conference, emergency, etc.)' })
  @ApiParam({ name: 'id', description: 'Schedule ID' })
  @SwaggerResponse({ status: 200, type: ScheduleFullResponseDto })
  async blockSchedule(@Req() req: any, @Param('id') id: string, @Body() dto: BlockScheduleDto): Promise<ScheduleFullResponseDto> {
    return this.scheduleService.blockSchedule(id, dto, req.user.userId);
  }

  @Post(':id/unblock')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Remove a schedule exception by its ID' })
  @ApiParam({ name: 'id', description: 'Schedule ID' })
  @ApiQuery({ name: 'exceptionId', required: true })
  @SwaggerResponse({ status: 200, type: ScheduleFullResponseDto })
  async unblockSchedule(@Req() req: any, @Param('id') id: string, @Query('exceptionId') exceptionId: string): Promise<ScheduleFullResponseDto> {
    return this.scheduleService.unblockSchedule(id, exceptionId, req.user.userId);
  }

  @Post(':id/leave')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Add leave block (sick, casual, earned, emergency) to schedule' })
  @ApiParam({ name: 'id', description: 'Schedule ID' })
  @SwaggerResponse({ status: 200, type: ScheduleFullResponseDto })
  async addLeaveBlock(@Req() req: any, @Param('id') id: string, @Body() dto: CreateLeaveBlockDto): Promise<ScheduleFullResponseDto> {
    return this.scheduleService.addLeaveBlock(id, dto, req.user.userId);
  }

  @Get(':id/history')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get full schedule audit & modification history' })
  @ApiParam({ name: 'id', description: 'Schedule ID' })
  @SwaggerResponse({ status: 200, type: [ScheduleAuditLogResponseDto] })
  async getHistory(@Param('id') id: string): Promise<ScheduleAuditLogResponseDto[]> {
    return this.scheduleService.getHistory(id);
  }
}

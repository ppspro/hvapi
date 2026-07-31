import { Controller, Post, Get, Body, Param, Query, UseGuards, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse as SwaggerResponse, ApiBearerAuth, ApiParam, ApiQuery } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { ScheduleService } from '../../application/use-cases/schedule.service';
import { CreateShiftDto, AssignStaffToShiftDto } from '../dto/create-schedule.dto';
import { ShiftResponseDto } from '../dto/schedule-response.dto';

@ApiTags('Shifts')
@Controller('shifts')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth('JWT-Auth')
export class ShiftController {
  constructor(private readonly scheduleService: ScheduleService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create shift definition (Morning / Evening / Night / Split / Custom)' })
  @SwaggerResponse({ status: 201, type: ShiftResponseDto })
  async createShift(@Body() dto: CreateShiftDto): Promise<ShiftResponseDto> {
    return this.scheduleService.createShift(dto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'List shift definitions, optionally filtered by facility' })
  @ApiQuery({ name: 'facilityId', required: false })
  @SwaggerResponse({ status: 200, type: [ShiftResponseDto] })
  async getShifts(@Query('facilityId') facilityId?: string): Promise<ShiftResponseDto[]> {
    return this.scheduleService.getShifts(facilityId);
  }

  @Post(':id/assign')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Assign a staff member to a shift for a specific date' })
  @ApiParam({ name: 'id', description: 'Shift ID' })
  @SwaggerResponse({ status: 200, type: ShiftResponseDto })
  async assignStaffToShift(@Param('id') id: string, @Body() dto: AssignStaffToShiftDto): Promise<ShiftResponseDto> {
    return this.scheduleService.assignStaffToShift(id, dto);
  }

  @Get(':id/assignments')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get all staff assignments for a specific shift' })
  @ApiParam({ name: 'id', description: 'Shift ID' })
  @SwaggerResponse({ status: 200, description: 'Shift assignment list' })
  async getShiftAssignments(@Param('id') id: string): Promise<any[]> {
    return this.scheduleService.getShiftAssignments(id);
  }
}

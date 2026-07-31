import {
  Controller, Post, Get, Put, Body, Param, Query, UseGuards, Req, HttpCode, HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse as SwaggerResponse, ApiBearerAuth, ApiParam, ApiQuery } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { ImmunisationService } from '../../application/use-cases/immunisation.service';
import {
  CreateVaccineDto, CreateVaccinationScheduleDto, CreateVaccinationRecordDto,
  AdministerDoseDto, DeferDoseDto, CreateCertificateDto, ReminderConfigDto, RecordActionDto,
} from '../dto/create-vaccine.dto';
import {
  VaccineResponseDto, VaccinationScheduleResponseDto, VaccinationRecordResponseDto,
  VaccinationCertificateResponseDto, ReminderConfigResponseDto, ImmunisationStatsResponseDto,
} from '../dto/immunisation-response.dto';

@ApiTags('Immunisation Platform')
@Controller('immunisation')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth('JWT-Auth')
export class ImmunisationController {
  constructor(private readonly service: ImmunisationService) {}

  // ─── Vaccine & Schedule Directory ──────────────────────────────────────────

  @Post('vaccines')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Register a vaccine in directory' })
  @SwaggerResponse({ status: 201, type: VaccineResponseDto })
  async createVaccine(@Body() dto: CreateVaccineDto): Promise<VaccineResponseDto> {
    return this.service.createVaccine(dto);
  }

  @Get('vaccines')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'List all available vaccines' })
  @SwaggerResponse({ status: 200, type: [VaccineResponseDto] })
  async getVaccines(): Promise<VaccineResponseDto[]> {
    return this.service.getVaccines();
  }

  @Post('schedules')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a vaccination schedule / dose rule' })
  @SwaggerResponse({ status: 201, type: VaccinationScheduleResponseDto })
  async createSchedule(@Body() dto: CreateVaccinationScheduleDto): Promise<VaccinationScheduleResponseDto> {
    return this.service.createSchedule(dto);
  }

  @Get('schedules')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'List vaccination schedules (supports vaccineId filter)' })
  @ApiQuery({ name: 'vaccineId', required: false })
  @SwaggerResponse({ status: 200, type: [VaccinationScheduleResponseDto] })
  async getSchedules(@Query('vaccineId') vaccineId?: string): Promise<VaccinationScheduleResponseDto[]> {
    return this.service.getSchedules(vaccineId);
  }

  // ─── Record Lifecycle Endpoints ───────────────────────────────────────────

  @Post('records')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create/Schedule a patient vaccination record' })
  @SwaggerResponse({ status: 201, type: VaccinationRecordResponseDto })
  async createRecord(@Req() req: any, @Body() dto: CreateVaccinationRecordDto): Promise<VaccinationRecordResponseDto> {
    return this.service.createRecord(req.user.userId, dto);
  }

  @Get('records')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'List all vaccination records for current patient' })
  @SwaggerResponse({ status: 200, type: [VaccinationRecordResponseDto] })
  async getRecords(@Req() req: any): Promise<VaccinationRecordResponseDto[]> {
    return this.service.getRecords(req.user.userId);
  }

  @Get('search')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Search immunisation directory by vaccine, batch, or facility' })
  @ApiQuery({ name: 'q', required: true })
  @SwaggerResponse({ status: 200, type: [VaccinationRecordResponseDto] })
  async searchRecords(@Query('q') query: string): Promise<VaccinationRecordResponseDto[]> {
    return this.service.searchRecords(query);
  }

  @Get('statistics')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get immunisation platform statistics' })
  @SwaggerResponse({ status: 200, type: ImmunisationStatsResponseDto })
  async getStatistics(): Promise<ImmunisationStatsResponseDto> {
    return this.service.getStatistics();
  }

  @Get('records/:id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get specific vaccination record details' })
  @ApiParam({ name: 'id', description: 'Vaccination Record ID' })
  @SwaggerResponse({ status: 200, type: VaccinationRecordResponseDto })
  async getRecordById(@Req() req: any, @Param('id') id: string): Promise<VaccinationRecordResponseDto> {
    return this.service.getRecordById(req.user.userId, id);
  }

  @Put('records/:id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Update vaccination record details (blocked if ARCHIVED)' })
  @ApiParam({ name: 'id', description: 'Vaccination Record ID' })
  @SwaggerResponse({ status: 200, type: VaccinationRecordResponseDto })
  async updateRecord(@Req() req: any, @Param('id') id: string, @Body() dto: Partial<CreateVaccinationRecordDto>): Promise<VaccinationRecordResponseDto> {
    return this.service.updateRecord(req.user.userId, id, dto);
  }

  @Post('records/:id/administer')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Administer a dose (captures batch, lot, site, administrator)' })
  @ApiParam({ name: 'id', description: 'Vaccination Record ID' })
  @SwaggerResponse({ status: 200, type: VaccinationRecordResponseDto })
  async administerDose(@Req() req: any, @Param('id') id: string, @Body() dto: AdministerDoseDto): Promise<VaccinationRecordResponseDto> {
    return this.service.administerDose(req.user.userId, id, dto);
  }

  @Post('records/:id/complete')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Mark vaccination record / series as completed' })
  @ApiParam({ name: 'id', description: 'Vaccination Record ID' })
  @SwaggerResponse({ status: 200, type: VaccinationRecordResponseDto })
  async completeRecord(@Req() req: any, @Param('id') id: string, @Body() dto: RecordActionDto): Promise<VaccinationRecordResponseDto> {
    return this.service.completeRecord(req.user.userId, id, dto);
  }

  @Post('records/:id/defer')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Defer a dose with clinical reason and rescheduled date' })
  @ApiParam({ name: 'id', description: 'Vaccination Record ID' })
  @SwaggerResponse({ status: 200, type: VaccinationRecordResponseDto })
  async deferRecord(@Req() req: any, @Param('id') id: string, @Body() dto: DeferDoseDto): Promise<VaccinationRecordResponseDto> {
    return this.service.deferRecord(req.user.userId, id, dto);
  }

  @Post('records/:id/archive')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Archive a vaccination record' })
  @ApiParam({ name: 'id', description: 'Vaccination Record ID' })
  @SwaggerResponse({ status: 200, type: VaccinationRecordResponseDto })
  async archiveRecord(@Req() req: any, @Param('id') id: string, @Body() dto: RecordActionDto): Promise<VaccinationRecordResponseDto> {
    return this.service.archiveRecord(req.user.userId, id, dto);
  }

  @Post('records/:id/restore')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Restore an archived vaccination record' })
  @ApiParam({ name: 'id', description: 'Vaccination Record ID' })
  @SwaggerResponse({ status: 200, type: VaccinationRecordResponseDto })
  async restoreRecord(@Req() req: any, @Param('id') id: string, @Body() dto: RecordActionDto): Promise<VaccinationRecordResponseDto> {
    return this.service.restoreRecord(req.user.userId, id, dto);
  }

  // ─── Digital Certificates & Reminders ─────────────────────────────────────

  @Post('certificates')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Generate digital vaccine certificate with QR token & PDF link' })
  @SwaggerResponse({ status: 201, type: VaccinationCertificateResponseDto })
  async generateCertificate(@Req() req: any, @Body() dto: CreateCertificateDto): Promise<VaccinationCertificateResponseDto> {
    return this.service.generateCertificate(req.user.userId, dto);
  }

  @Get('certificates')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'List all digital vaccine certificates for current patient' })
  @SwaggerResponse({ status: 200, type: [VaccinationCertificateResponseDto] })
  async getCertificates(@Req() req: any): Promise<VaccinationCertificateResponseDto[]> {
    return this.service.getCertificates(req.user.userId);
  }

  @Post('reminders/config')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Configure vaccination reminder metadata & preferences' })
  @SwaggerResponse({ status: 200, type: ReminderConfigResponseDto })
  async configureReminder(@Req() req: any, @Body() dto: ReminderConfigDto): Promise<ReminderConfigResponseDto> {
    return this.service.configureReminder(req.user.userId, dto);
  }
}

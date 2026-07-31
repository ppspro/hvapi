import {
  Controller, Post, Get, Put, Delete, Body, Param, Query, UseGuards, Req, HttpCode, HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse as SwaggerResponse, ApiBearerAuth, ApiParam, ApiQuery } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { DoctorService } from '../../application/use-cases/doctor.service';
import {
  RegisterDoctorDto, AddQualificationDto, AddCertificationDto, AddExperienceDto,
  AttachDoctorDocumentDto, DoctorActionDto, RenewLicenseDto,
} from '../dto/register-doctor.dto';
import {
  DoctorProfileFullResponseDto, DoctorDocumentResponseDto, DoctorHistoryItemDto, DoctorStatsResponseDto,
} from '../dto/doctor-response.dto';
import { DoctorProfileResponseDto, ScheduleSlotResponseDto } from '../dto/doctor-profile.dto';

@ApiTags('Doctors')
@Controller('doctors')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth('JWT-Auth')
export class DoctorController {
  constructor(private readonly doctorService: DoctorService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Register/Create a doctor profile in Master Registry' })
  @SwaggerResponse({ status: 201, type: DoctorProfileFullResponseDto })
  async registerDoctor(@Req() req: any, @Body() dto: RegisterDoctorDto): Promise<DoctorProfileFullResponseDto> {
    return this.doctorService.registerDoctor(req.user.userId, dto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'List all registered doctor profiles in Master Registry' })
  @SwaggerResponse({ status: 200, type: [DoctorProfileFullResponseDto] })
  async getDoctors(): Promise<DoctorProfileFullResponseDto[]> {
    return this.doctorService.getDoctors();
  }

  @Get('search')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Enterprise doctor search (by name, registration, license, dept, specialization)' })
  @ApiQuery({ name: 'q', required: true })
  @SwaggerResponse({ status: 200, type: [DoctorProfileFullResponseDto] })
  async searchDoctors(@Query('q') query: string): Promise<DoctorProfileFullResponseDto[]> {
    return this.doctorService.searchDoctors(query);
  }

  @Get('statistics')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get platform-wide doctor directory statistics' })
  @SwaggerResponse({ status: 200, type: DoctorStatsResponseDto })
  async getStatistics(): Promise<DoctorStatsResponseDto> {
    return this.doctorService.getStatistics();
  }

  @Get('verification/pending')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'List doctor profiles pending admin verification' })
  @SwaggerResponse({ status: 200, type: [DoctorProfileFullResponseDto] })
  async getPendingDoctors(): Promise<DoctorProfileFullResponseDto[]> {
    return this.doctorService.getPendingDoctors();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get complete doctor profile details' })
  @ApiParam({ name: 'id', description: 'Doctor Profile ID' })
  @SwaggerResponse({ status: 200, type: DoctorProfileFullResponseDto })
  async getDoctorById(@Param('id') id: string): Promise<DoctorProfileFullResponseDto> {
    return this.doctorService.getDoctorById(id);
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Update doctor profile details' })
  @ApiParam({ name: 'id', description: 'Doctor Profile ID' })
  @SwaggerResponse({ status: 200, type: DoctorProfileFullResponseDto })
  async updateDoctor(@Param('id') id: string, @Body() dto: Partial<RegisterDoctorDto>): Promise<DoctorProfileFullResponseDto> {
    return this.doctorService.updateDoctor(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Soft-delete a doctor profile' })
  @ApiParam({ name: 'id', description: 'Doctor Profile ID' })
  @SwaggerResponse({ status: 200, description: 'Doctor profile soft-deleted' })
  async softDeleteDoctor(@Param('id') id: string): Promise<any> {
    return this.doctorService.softDeleteDoctor(id);
  }

  @Post(':id/verify')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Approve & verify doctor registration' })
  @ApiParam({ name: 'id', description: 'Doctor Profile ID' })
  @SwaggerResponse({ status: 200, type: DoctorProfileFullResponseDto })
  async verifyDoctor(@Req() req: any, @Param('id') id: string, @Body() dto: DoctorActionDto): Promise<DoctorProfileFullResponseDto> {
    return this.doctorService.verifyDoctor(id, dto, req.user.userId);
  }

  @Post(':id/reject')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Reject doctor verification with reason' })
  @ApiParam({ name: 'id', description: 'Doctor Profile ID' })
  @SwaggerResponse({ status: 200, type: DoctorProfileFullResponseDto })
  async rejectDoctor(@Req() req: any, @Param('id') id: string, @Body() dto: DoctorActionDto): Promise<DoctorProfileFullResponseDto> {
    return this.doctorService.rejectDoctor(id, dto, req.user.userId);
  }

  @Post(':id/suspend')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Suspend doctor registration' })
  @ApiParam({ name: 'id', description: 'Doctor Profile ID' })
  @SwaggerResponse({ status: 200, type: DoctorProfileFullResponseDto })
  async suspendDoctor(@Req() req: any, @Param('id') id: string, @Body() dto: DoctorActionDto): Promise<DoctorProfileFullResponseDto> {
    return this.doctorService.suspendDoctor(id, dto, req.user.userId);
  }

  @Post(':id/restore')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Restore suspended doctor registration' })
  @ApiParam({ name: 'id', description: 'Doctor Profile ID' })
  @SwaggerResponse({ status: 200, type: DoctorProfileFullResponseDto })
  async restoreDoctor(@Req() req: any, @Param('id') id: string, @Body() dto: DoctorActionDto): Promise<DoctorProfileFullResponseDto> {
    return this.doctorService.restoreDoctor(id, dto, req.user.userId);
  }

  @Post(':id/renew-license')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Renew medical registration license (extends expiry)' })
  @ApiParam({ name: 'id', description: 'Doctor Profile ID' })
  @SwaggerResponse({ status: 200, type: DoctorProfileFullResponseDto })
  async renewLicense(@Req() req: any, @Param('id') id: string, @Body() dto: RenewLicenseDto): Promise<DoctorProfileFullResponseDto> {
    return this.doctorService.renewLicense(id, dto, req.user.userId);
  }

  @Post(':id/generate-qr')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Generate/Issue Doctor Digital Verification QR token' })
  @ApiParam({ name: 'id', description: 'Doctor Profile ID' })
  @SwaggerResponse({ status: 200, description: 'Generated QR Token details' })
  async generateQr(@Req() req: any, @Param('id') id: string): Promise<any> {
    return this.doctorService.generateQr(req.user.userId, id);
  }

  @Get(':id/documents')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'List attached doctor credential documents' })
  @ApiParam({ name: 'id', description: 'Doctor Profile ID' })
  @SwaggerResponse({ status: 200, type: [DoctorDocumentResponseDto] })
  async getDocuments(@Param('id') id: string): Promise<DoctorDocumentResponseDto[]> {
    return this.doctorService.getDocuments(id);
  }

  @Post(':id/documents')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Attach credential document (reusing MedicalAttachment)' })
  @ApiParam({ name: 'id', description: 'Doctor Profile ID' })
  @SwaggerResponse({ status: 201, type: DoctorDocumentResponseDto })
  async attachDocument(@Param('id') id: string, @Body() dto: AttachDoctorDocumentDto): Promise<DoctorDocumentResponseDto> {
    return this.doctorService.attachDocument(id, dto);
  }

  @Get(':id/history')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get complete verification & status lifecycle history' })
  @ApiParam({ name: 'id', description: 'Doctor Profile ID' })
  @SwaggerResponse({ status: 200, type: [DoctorHistoryItemDto] })
  async getHistory(@Param('id') id: string): Promise<DoctorHistoryItemDto[]> {
    return this.doctorService.getHistory(id);
  }

  @Get(':id/slots')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get Doctor Availability Schedule Slots' })
  @ApiParam({ name: 'id', description: 'Doctor Profile ID' })
  @SwaggerResponse({ status: 200, type: [ScheduleSlotResponseDto] })
  async getDoctorSlots(@Param('id') doctorId: string): Promise<ScheduleSlotResponseDto[]> {
    return this.doctorService.getDoctorSlots(doctorId);
  }
}

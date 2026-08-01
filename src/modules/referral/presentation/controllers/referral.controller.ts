import {
  Controller, Get, Post, Put, Delete, Body, Param, Query, UseGuards, Req, HttpCode, HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse as SwaggerResponse, ApiBearerAuth, ApiParam, ApiQuery } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { ReferralService } from '../../application/use-cases/referral.service';
import {
  ReferralResponseDto, ReferralNoteResponseDto, ReferralAttachmentResponseDto,
  ReferralStatusHistoryResponseDto, ReferralDashboardStatsResponseDto,
} from '../dto/referral-response.dto';
import {
  CreateReferralDto, TriageReferralDto, UpdateReferralStatusDto, AddReferralNoteDto, AddReferralAttachmentDto,
} from '../dto/referral-enterprise.dto';

@ApiTags('Referral & Care Coordination')
@Controller('referrals')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth('JWT-Auth')
export class ReferralController {
  constructor(private readonly referralService: ReferralService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create patient care referral' })
  @SwaggerResponse({ status: 201, type: ReferralResponseDto })
  async createReferral(@Req() req: any, @Body() dto: CreateReferralDto): Promise<ReferralResponseDto> {
    return this.referralService.createReferral(req.user.userId, dto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'List patient care referrals with optional filters' })
  @ApiQuery({ name: 'patientId', required: false })
  @ApiQuery({ name: 'referringDoctorId', required: false })
  @ApiQuery({ name: 'receivingDoctorId', required: false })
  @ApiQuery({ name: 'receivingFacilityId', required: false })
  @ApiQuery({ name: 'status', required: false })
  @ApiQuery({ name: 'priority', required: false })
  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({ name: 'limit', required: false })
  @SwaggerResponse({ status: 200, description: 'Paginated referral list' })
  async getReferrals(
    @Query('patientId') patientId?: string,
    @Query('referringDoctorId') referringDoctorId?: string,
    @Query('receivingDoctorId') receivingDoctorId?: string,
    @Query('receivingFacilityId') receivingFacilityId?: string,
    @Query('status') status?: string,
    @Query('priority') priority?: string,
    @Query('page') page?: number,
    @Query('limit') limit?: number,
  ) {
    return this.referralService.getReferrals({
      patientId, referringDoctorId, receivingDoctorId, receivingFacilityId, status, priority, page, limit,
    });
  }

  @Get('my-incoming')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'List incoming referrals for current doctor/facility' })
  @SwaggerResponse({ status: 200, description: 'Incoming referral list' })
  async getMyIncoming(@Req() req: any) {
    return this.referralService.getReferrals({ receivingDoctorId: req.user.userId });
  }

  @Get('my-outgoing')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'List outgoing referrals created by current doctor' })
  @SwaggerResponse({ status: 200, description: 'Outgoing referral list' })
  async getMyOutgoing(@Req() req: any) {
    return this.referralService.getReferrals({ referringDoctorId: req.user.userId });
  }

  @Get('dashboard/stats')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get referral dashboard metrics and SLA performance analytics' })
  @ApiQuery({ name: 'facilityId', required: false })
  @SwaggerResponse({ status: 200, type: ReferralDashboardStatsResponseDto })
  async getDashboardStats(@Query('facilityId') facilityId?: string): Promise<ReferralDashboardStatsResponseDto> {
    return this.referralService.getDashboardStats(facilityId);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get referral details by ID' })
  @ApiParam({ name: 'id', description: 'Referral ID' })
  @SwaggerResponse({ status: 200, type: ReferralResponseDto })
  async getReferralById(@Param('id') id: string): Promise<ReferralResponseDto> {
    return this.referralService.getReferralById(id);
  }

  @Put(':id/triage')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Triage patient referral (Approve/Decline/Redirect)' })
  @ApiParam({ name: 'id', description: 'Referral ID' })
  @SwaggerResponse({ status: 200, type: ReferralResponseDto })
  async triageReferral(@Req() req: any, @Param('id') id: string, @Body() dto: TriageReferralDto): Promise<ReferralResponseDto> {
    return this.referralService.triageReferral(id, req.user.userId, dto);
  }

  @Put(':id/status')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Update referral status (IN_PROGRESS, COMPLETED, CANCELLED)' })
  @ApiParam({ name: 'id', description: 'Referral ID' })
  @SwaggerResponse({ status: 200, type: ReferralResponseDto })
  async updateStatus(@Req() req: any, @Param('id') id: string, @Body() dto: UpdateReferralStatusDto): Promise<ReferralResponseDto> {
    return this.referralService.updateStatus(id, req.user.userId, dto);
  }

  @Post(':id/notes')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Add clinical coordination note to referral' })
  @ApiParam({ name: 'id', description: 'Referral ID' })
  @SwaggerResponse({ status: 201, type: ReferralNoteResponseDto })
  async addNote(@Req() req: any, @Param('id') id: string, @Body() dto: AddReferralNoteDto): Promise<ReferralNoteResponseDto> {
    const userRole = req.user.role || 'DOCTOR';
    return this.referralService.addNote(id, req.user.userId, userRole, dto);
  }

  @Get(':id/notes')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'List clinical notes for referral' })
  @ApiParam({ name: 'id', description: 'Referral ID' })
  @SwaggerResponse({ status: 200, type: [ReferralNoteResponseDto] })
  async getNotes(@Param('id') id: string): Promise<ReferralNoteResponseDto[]> {
    return this.referralService.getNotes(id);
  }

  @Post(':id/attachments')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Link medical attachment to referral' })
  @ApiParam({ name: 'id', description: 'Referral ID' })
  @SwaggerResponse({ status: 201, type: ReferralAttachmentResponseDto })
  async addAttachment(@Req() req: any, @Param('id') id: string, @Body() dto: AddReferralAttachmentDto): Promise<ReferralAttachmentResponseDto> {
    return this.referralService.addAttachment(id, req.user.userId, dto);
  }

  @Get(':id/attachments')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'List linked medical attachments for referral' })
  @ApiParam({ name: 'id', description: 'Referral ID' })
  @SwaggerResponse({ status: 200, type: [ReferralAttachmentResponseDto] })
  async getAttachments(@Param('id') id: string): Promise<ReferralAttachmentResponseDto[]> {
    return this.referralService.getAttachments(id);
  }

  @Get(':id/history')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get immutable status transition history for referral' })
  @ApiParam({ name: 'id', description: 'Referral ID' })
  @SwaggerResponse({ status: 200, type: [ReferralStatusHistoryResponseDto] })
  async getHistory(@Param('id') id: string): Promise<ReferralStatusHistoryResponseDto[]> {
    return this.referralService.getHistory(id);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Soft-delete referral' })
  @ApiParam({ name: 'id', description: 'Referral ID' })
  @SwaggerResponse({ status: 200, description: 'Referral soft-deleted' })
  async softDeleteReferral(@Param('id') id: string) {
    return this.referralService.softDeleteReferral(id);
  }
}

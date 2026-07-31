import {
  Controller, Post, Get, Patch, Put, Delete, Body, Param, UseGuards,
  Req, HttpCode, HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse as SwaggerResponse, ApiBearerAuth, ApiParam } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { FamilyService } from '../../application/use-cases/family.service';
import { CreateInvitationDto, InvitationResponseDto } from '../dto/invitation.dto';
import { UpdateFamilyMemberDto, FamilyMemberResponseDto } from '../dto/family-member.dto';
import { CreateGuardianDto, UpdateGuardianDto } from '../dto/guardian.dto';
import { CreateDependentDto, UpdateDependentDto } from '../dto/dependent.dto';
import { CreateConsentDto, UpdateConsentDto, ConsentRecordResponseDto, ConsentHistoryResponseDto } from '../dto/consent.dto';

@ApiTags('Family')
@Controller('family')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth('JWT-Auth')
export class FamilyController {
  constructor(private readonly familyService: FamilyService) {}

  // ─── Invitations ──────────────────────────────────────────────────────────

  @Post('invitations')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a family invitation' })
  @SwaggerResponse({ status: 201, type: InvitationResponseDto })
  async createInvitation(@Req() req: any, @Body() dto: CreateInvitationDto): Promise<InvitationResponseDto> {
    return this.familyService.createInvitation(req.user.userId, dto);
  }

  @Post('invitations/:id/resend')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Resend a pending family invitation (max 5 times)' })
  @ApiParam({ name: 'id', description: 'Invitation ID' })
  @SwaggerResponse({ status: 200, type: InvitationResponseDto })
  async resendInvitation(@Req() req: any, @Param('id') id: string): Promise<InvitationResponseDto> {
    return this.familyService.resendInvitation(req.user.userId, id);
  }

  @Post('invitations/:id/accept')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Accept a family invitation — auto-creates family member record' })
  @ApiParam({ name: 'id', description: 'Invitation ID' })
  @SwaggerResponse({ status: 200, description: 'Invitation accepted and family member created' })
  async acceptInvitation(@Req() req: any, @Param('id') id: string): Promise<any> {
    return this.familyService.acceptInvitation(req.user.userId, id);
  }

  @Post('invitations/:id/reject')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Reject a family invitation' })
  @ApiParam({ name: 'id', description: 'Invitation ID' })
  @SwaggerResponse({ status: 200, description: 'Invitation rejected' })
  async rejectInvitation(@Req() req: any, @Param('id') id: string): Promise<any> {
    return this.familyService.rejectInvitation(req.user.userId, id);
  }

  @Delete('invitations/:id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Cancel a pending family invitation' })
  @ApiParam({ name: 'id', description: 'Invitation ID' })
  @SwaggerResponse({ status: 200, description: 'Invitation cancelled' })
  async cancelInvitation(@Req() req: any, @Param('id') id: string): Promise<any> {
    return this.familyService.cancelInvitation(req.user.userId, id);
  }

  @Get('invitations')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'List all invitations sent by the patient' })
  @SwaggerResponse({ status: 200, type: [InvitationResponseDto] })
  async getInvitations(@Req() req: any): Promise<InvitationResponseDto[]> {
    return this.familyService.getInvitations(req.user.userId);
  }

  // ─── Family Members ───────────────────────────────────────────────────────

  @Get('members')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'List all active family members' })
  @SwaggerResponse({ status: 200, type: [FamilyMemberResponseDto] })
  async getFamilyMembers(@Req() req: any): Promise<FamilyMemberResponseDto[]> {
    return this.familyService.getFamilyMembers(req.user.userId);
  }

  @Get('members/:id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get a specific family member' })
  @ApiParam({ name: 'id', description: 'Family Member ID' })
  @SwaggerResponse({ status: 200, type: FamilyMemberResponseDto })
  async getFamilyMemberById(@Req() req: any, @Param('id') id: string): Promise<FamilyMemberResponseDto> {
    return this.familyService.getFamilyMemberById(req.user.userId, id);
  }

  @Patch('members/:id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Update family member details or status' })
  @ApiParam({ name: 'id', description: 'Family Member ID' })
  @SwaggerResponse({ status: 200, type: FamilyMemberResponseDto })
  async updateFamilyMember(@Req() req: any, @Param('id') id: string, @Body() dto: UpdateFamilyMemberDto): Promise<FamilyMemberResponseDto> {
    return this.familyService.updateFamilyMember(req.user.userId, id, dto);
  }

  @Delete('members/:id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Remove (archive) a family member' })
  @ApiParam({ name: 'id', description: 'Family Member ID' })
  @SwaggerResponse({ status: 200, description: 'Family member removed' })
  async removeFamilyMember(@Req() req: any, @Param('id') id: string): Promise<any> {
    return this.familyService.removeFamilyMember(req.user.userId, id);
  }

  // ─── Consent Records ─────────────────────────────────────────────────────

  @Post('consents')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Grant a consent category to a family member' })
  @SwaggerResponse({ status: 201, type: ConsentRecordResponseDto })
  async grantConsent(@Req() req: any, @Body() dto: CreateConsentDto): Promise<ConsentRecordResponseDto> {
    return this.familyService.grantConsent(req.user.userId, dto);
  }

  @Put('consents/:id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Update consent (expiry date, notes)' })
  @ApiParam({ name: 'id', description: 'Consent Record ID' })
  @SwaggerResponse({ status: 200, type: ConsentRecordResponseDto })
  async updateConsent(@Req() req: any, @Param('id') id: string, @Body() dto: UpdateConsentDto): Promise<ConsentRecordResponseDto> {
    return this.familyService.updateConsent(req.user.userId, id, dto);
  }

  @Delete('consents/:id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Revoke a granted consent — blocks access immediately' })
  @ApiParam({ name: 'id', description: 'Consent Record ID' })
  @SwaggerResponse({ status: 200, description: 'Consent revoked' })
  async revokeConsent(@Req() req: any, @Param('id') id: string): Promise<any> {
    return this.familyService.revokeConsent(req.user.userId, id);
  }

  @Get('consents')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'List all active consents granted by the patient' })
  @SwaggerResponse({ status: 200, type: [ConsentRecordResponseDto] })
  async getConsents(@Req() req: any): Promise<ConsentRecordResponseDto[]> {
    return this.familyService.getConsents(req.user.userId);
  }

  @Get('consents/history')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get full consent audit history for the patient' })
  @SwaggerResponse({ status: 200, type: [ConsentHistoryResponseDto] })
  async getConsentHistory(@Req() req: any): Promise<ConsentHistoryResponseDto[]> {
    return this.familyService.getConsentHistory(req.user.userId);
  }

  // ─── Guardians ────────────────────────────────────────────────────────────

  @Get('guardians')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'List all guardians assigned to the patient' })
  @SwaggerResponse({ status: 200, type: [FamilyMemberResponseDto] })
  async getGuardians(@Req() req: any): Promise<FamilyMemberResponseDto[]> {
    return this.familyService.getGuardians(req.user.userId);
  }

  @Post('guardians')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Assign a guardian to the patient' })
  @SwaggerResponse({ status: 201, type: FamilyMemberResponseDto })
  async createGuardian(@Req() req: any, @Body() dto: CreateGuardianDto): Promise<FamilyMemberResponseDto> {
    return this.familyService.createGuardian(req.user.userId, dto);
  }

  @Patch('guardians/:id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Update guardian verification status or primary flag' })
  @ApiParam({ name: 'id', description: 'Guardian (FamilyMember) ID' })
  @SwaggerResponse({ status: 200, type: FamilyMemberResponseDto })
  async updateGuardian(@Req() req: any, @Param('id') id: string, @Body() dto: UpdateGuardianDto): Promise<FamilyMemberResponseDto> {
    return this.familyService.updateGuardian(req.user.userId, id, dto);
  }

  // ─── Dependents ───────────────────────────────────────────────────────────

  @Get('dependents')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'List all dependents registered under this patient' })
  @SwaggerResponse({ status: 200, type: [FamilyMemberResponseDto] })
  async getDependents(@Req() req: any): Promise<FamilyMemberResponseDto[]> {
    return this.familyService.getDependents(req.user.userId);
  }

  @Post('dependents')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Register a dependent (minor, senior, or care patient)' })
  @SwaggerResponse({ status: 201, type: FamilyMemberResponseDto })
  async createDependent(@Req() req: any, @Body() dto: CreateDependentDto): Promise<FamilyMemberResponseDto> {
    return this.familyService.createDependent(req.user.userId, dto);
  }

  @Patch('dependents/:id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Update dependent details' })
  @ApiParam({ name: 'id', description: 'Dependent (FamilyMember) ID' })
  @SwaggerResponse({ status: 200, type: FamilyMemberResponseDto })
  async updateDependent(@Req() req: any, @Param('id') id: string, @Body() dto: UpdateDependentDto): Promise<FamilyMemberResponseDto> {
    return this.familyService.updateDependent(req.user.userId, id, dto);
  }

  @Delete('dependents/:id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Remove a dependent' })
  @ApiParam({ name: 'id', description: 'Dependent (FamilyMember) ID' })
  @SwaggerResponse({ status: 200, description: 'Dependent removed' })
  async removeDependent(@Req() req: any, @Param('id') id: string): Promise<any> {
    return this.familyService.removeDependent(req.user.userId, id);
  }
}

import { Controller, Post, Patch, Get, Put, Delete, Body, Param, UseGuards, Req, HttpCode, HttpStatus, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse as SwaggerResponse, ApiBearerAuth, ApiConsumes } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { PatientService } from '../../application/use-cases/patient.service';
import { OnboardDemographicsDto, OnboardDemographicsResponseDto } from '../dto/onboard-demographics.dto';
import { OnboardEmergencyInfoDto, OnboardEmergencyInfoResponseDto } from '../dto/onboard-emergency-info.dto';
import { OnboardFamilyInviteDto, OnboardFamilyInviteResponseDto } from '../dto/onboard-family-invite.dto';
import { UpdateFamilyConsentDto, UpdateFamilyConsentResponseDto } from '../dto/update-family-consent.dto';
import { PatientProfileResponseDto } from '../dto/patient-profile.dto';
import { RegisterPatientDto, RegisterPatientResponseDto } from '../dto/register-patient.dto';
import { OnboardInsuranceDto, OnboardInsuranceResponseDto } from '../dto/onboard-insurance.dto';
import { OnboardHealthCardDto, OnboardHealthCardResponseDto } from '../dto/onboard-health-card.dto';
import { OnboardingProgressResponseDto } from '../dto/onboarding-progress.dto';
import { UpdateBasicInfoDto } from '../dto/update-basic-info.dto';
import { UpdateContactDto } from '../dto/update-contact.dto';
import { UpdateAddressDto } from '../dto/update-address.dto';
import { UpdatePreferencesDto } from '../dto/update-preferences.dto';
import { UpdateMedicalSummaryDto } from '../dto/update-medical-summary.dto';
import { FullPatientProfileResponseDto } from '../dto/full-patient-profile.dto';
import { ProfileCompletionResponseDto, ProfileTimelineResponseDto } from '../dto/profile-completion.dto';

@ApiTags('Patients')
@Controller('patients')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth('JWT-Auth')
export class PatientController {
  constructor(private readonly patientService: PatientService) {}

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Step 1: Initialize Patient Draft Registration' })
  @SwaggerResponse({ status: 201, type: RegisterPatientResponseDto })
  async register(@Req() req: any): Promise<RegisterPatientResponseDto> {
    return this.patientService.register(req.user.userId);
  }

  @Get('register/status')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Check Draft Registration Progress Status' })
  @SwaggerResponse({ status: 200, description: 'Current registration phase status' })
  async getRegistrationStatus(@Req() req: any): Promise<any> {
    return this.patientService.getRegistrationStatus(req.user.userId);
  }

  @Patch('register/resume')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Resume and update registration progress' })
  @SwaggerResponse({ status: 200, description: 'Resumed registration details' })
  async resumeRegistration(@Req() req: any, @Query('step') step: string): Promise<any> {
    return this.patientService.resumeRegistration(req.user.userId, parseInt(step || '1', 10));
  }

  @Post('onboarding/demographics')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Step 2: Patient Demographic Registration' })
  @SwaggerResponse({ status: 200, type: OnboardDemographicsResponseDto })
  async onboardDemographics(@Req() req: any, @Body() dto: OnboardDemographicsDto): Promise<OnboardDemographicsResponseDto> {
    return this.patientService.onboardDemographics(req.user.userId, dto);
  }

  @Put('onboarding/demographics')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Step 2: Update Demographics Details' })
  @SwaggerResponse({ status: 200, type: OnboardDemographicsResponseDto })
  async updateDemographics(@Req() req: any, @Body() dto: OnboardDemographicsDto): Promise<OnboardDemographicsResponseDto> {
    return this.patientService.onboardDemographics(req.user.userId, dto);
  }

  @Post('onboarding/emergency-contact')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Step 3: Save Emergency Contact' })
  @SwaggerResponse({ status: 200, type: OnboardEmergencyInfoResponseDto })
  async onboardEmergencyContact(@Req() req: any, @Body() dto: OnboardEmergencyInfoDto): Promise<OnboardEmergencyInfoResponseDto> {
    return this.patientService.onboardEmergencyInfo(req.user.userId, dto);
  }

  @Put('onboarding/emergency-contact')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Step 3: Update Emergency Contact' })
  @SwaggerResponse({ status: 200, type: OnboardEmergencyInfoResponseDto })
  async updateEmergencyContact(@Req() req: any, @Body() dto: OnboardEmergencyInfoDto): Promise<OnboardEmergencyInfoResponseDto> {
    return this.patientService.onboardEmergencyInfo(req.user.userId, dto);
  }

  @Post('onboarding/insurance')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Step 4: Save Primary/Secondary Insurance Link' })
  @SwaggerResponse({ status: 200, type: OnboardInsuranceResponseDto })
  async onboardInsurance(@Req() req: any, @Body() dto: OnboardInsuranceDto): Promise<OnboardInsuranceResponseDto> {
    return this.patientService.onboardInsurance(req.user.userId, dto);
  }

  @Put('onboarding/insurance')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Step 4: Update Insurance Details' })
  @SwaggerResponse({ status: 200, type: OnboardInsuranceResponseDto })
  async updateInsurance(@Req() req: any, @Body() dto: OnboardInsuranceDto): Promise<OnboardInsuranceResponseDto> {
    return this.patientService.onboardInsurance(req.user.userId, dto);
  }

  @Post('onboarding/health-card')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Step 5: Initialize Secure Digital Health Card' })
  @SwaggerResponse({ status: 200, type: OnboardHealthCardResponseDto })
  async onboardHealthCard(@Req() req: any): Promise<OnboardHealthCardResponseDto> {
    return this.patientService.onboardHealthCard(req.user.userId);
  }

  @Post('onboarding/family-invite')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Step 6: Family Account Linkage Request' })
  @SwaggerResponse({ status: 200, type: OnboardFamilyInviteResponseDto })
  async onboardFamilyInvite(@Req() req: any, @Body() dto: OnboardFamilyInviteDto): Promise<OnboardFamilyInviteResponseDto> {
    return this.patientService.onboardFamilyInvite(req.user.userId, dto);
  }

  @Get('onboarding/progress')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get Step-by-Step Onboarding Progress Checklist' })
  @SwaggerResponse({ status: 200, type: OnboardingProgressResponseDto })
  async getOnboardingProgress(@Req() req: any): Promise<OnboardingProgressResponseDto> {
    return this.patientService.getOnboardingProgress(req.user.userId);
  }

  @Post('onboarding/complete')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Finalize and Complete Onboarding Registration' })
  @SwaggerResponse({ status: 200, description: 'Final onboarding status transition completed successfully' })
  async completeOnboarding(@Req() req: any): Promise<any> {
    return this.patientService.completeOnboarding(req.user.userId);
  }

  @Get('profile/completion')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get overall Patient Profile Completion percentage' })
  @SwaggerResponse({ status: 200, description: 'Completion percentage value' })
  async getCompletionPercentage(@Req() req: any): Promise<{ completionPercentage: number }> {
    const progress = await this.patientService.getOnboardingProgress(req.user.userId);
    return { completionPercentage: progress.completionPercentage };
  }

  @Get('me')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get Patient Profile Details' })
  @SwaggerResponse({ status: 200, type: PatientProfileResponseDto })
  async getProfile(@Req() req: any): Promise<PatientProfileResponseDto> {
    return this.patientService.getProfile(req.user.userId);
  }

  @Put('me')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Update Patient Profile' })
  @SwaggerResponse({ status: 200, type: PatientProfileResponseDto })
  async updateProfile(@Req() req: any, @Body() dto: OnboardDemographicsDto): Promise<PatientProfileResponseDto> {
    return this.patientService.updateProfile(req.user.userId, dto);
  }

  @Patch('family-consents/:id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Accept / Reject Family Linkage Consent' })
  @SwaggerResponse({ status: 200, type: UpdateFamilyConsentResponseDto })
  async updateFamilyConsent(@Param('id') consentId: string, @Body() dto: UpdateFamilyConsentDto): Promise<UpdateFamilyConsentResponseDto> {
    return this.patientService.updateFamilyConsent(consentId, dto);
  }

  // ─── Phase 5: Profile Management ───────────────────────────────────────────

  @Get('me/full')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get Full Patient Profile with all extended fields' })
  @SwaggerResponse({ status: 200, type: FullPatientProfileResponseDto })
  async getFullProfile(@Req() req: any): Promise<FullPatientProfileResponseDto> {
    return this.patientService.getFullProfile(req.user.userId);
  }

  @Patch('me/basic')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Update Basic Patient Information (name, DOB, gender, nationality, etc.)' })
  @SwaggerResponse({ status: 200, type: FullPatientProfileResponseDto })
  async updateBasicInfo(@Req() req: any, @Body() dto: UpdateBasicInfoDto): Promise<FullPatientProfileResponseDto> {
    return this.patientService.updateBasicInfo(req.user.userId, dto);
  }

  @Patch('me/contact')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Update Contact Preferences' })
  @SwaggerResponse({ status: 200, description: 'Contact preferences updated' })
  async updateContact(@Req() req: any, @Body() dto: UpdateContactDto): Promise<any> {
    return this.patientService.updateContact(req.user.userId, dto);
  }

  @Patch('me/address')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Update Current and Permanent Address' })
  @SwaggerResponse({ status: 200, description: 'Address updated' })
  async updateAddress(@Req() req: any, @Body() dto: UpdateAddressDto): Promise<any> {
    return this.patientService.updateAddress(req.user.userId, dto);
  }

  @Patch('me/preferences')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Update Communication Preferences and Privacy Settings' })
  @SwaggerResponse({ status: 200, description: 'Communication preferences updated' })
  async updatePreferences(@Req() req: any, @Body() dto: UpdatePreferencesDto): Promise<any> {
    return this.patientService.updatePreferences(req.user.userId, dto);
  }

  @Patch('me/medical-summary')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Update Medical Summary (blood group, allergies, conditions, disabilities)' })
  @SwaggerResponse({ status: 200, description: 'Medical summary updated' })
  async updateMedicalSummary(@Req() req: any, @Body() dto: UpdateMedicalSummaryDto): Promise<any> {
    return this.patientService.updateMedicalSummary(req.user.userId, dto);
  }

  @Post('me/photo')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Upload or Replace Profile Photo (provide photoUrl and photoKey)' })
  @SwaggerResponse({ status: 200, description: 'Profile photo uploaded' })
  async uploadPhoto(@Req() req: any, @Body() body: { photoUrl: string; photoKey: string }): Promise<any> {
    return this.patientService.uploadPhoto(req.user.userId, body.photoUrl, body.photoKey);
  }

  @Delete('me/photo')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Delete Profile Photo' })
  @SwaggerResponse({ status: 200, description: 'Profile photo deleted' })
  async deletePhoto(@Req() req: any): Promise<any> {
    return this.patientService.deletePhoto(req.user.userId);
  }

  @Get('profile/completion')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get Patient Profile Completion Status with section breakdown' })
  @SwaggerResponse({ status: 200, type: ProfileCompletionResponseDto })
  async getProfileCompletion(@Req() req: any): Promise<ProfileCompletionResponseDto> {
    return this.patientService.getProfileCompletion(req.user.userId);
  }

  @Get('profile/timeline')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get Patient Profile Change Timeline' })
  @SwaggerResponse({ status: 200, type: ProfileTimelineResponseDto })
  async getProfileTimeline(@Req() req: any): Promise<ProfileTimelineResponseDto> {
    return this.patientService.getProfileTimeline(req.user.userId);
  }

  @Get('profile/activity')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get Patient Profile Activity Summary' })
  @SwaggerResponse({ status: 200, description: 'Profile activity summary' })
  async getProfileActivity(@Req() req: any): Promise<any> {
    return this.patientService.getProfileActivity(req.user.userId);
  }
}

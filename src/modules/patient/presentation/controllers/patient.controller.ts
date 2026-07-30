import { Controller, Post, Patch, Get, Put, Body, Param, UseGuards, Req, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { PatientService } from '../../application/use-cases/patient.service';
import { OnboardDemographicsDto, OnboardDemographicsResponseDto } from '../dto/onboard-demographics.dto';
import { OnboardEmergencyInfoDto, OnboardEmergencyInfoResponseDto } from '../dto/onboard-emergency-info.dto';
import { OnboardFamilyInviteDto, OnboardFamilyInviteResponseDto } from '../dto/onboard-family-invite.dto';
import { UpdateFamilyConsentDto, UpdateFamilyConsentResponseDto } from '../dto/update-family-consent.dto';
import { PatientProfileResponseDto } from '../dto/patient-profile.dto';

@ApiTags('Patients')
@Controller('patients')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth('JWT-Auth')
export class PatientController {
  constructor(private readonly patientService: PatientService) {}

  @Post('onboarding/demographics')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Step 2: Patient Demographic Registration' })
  @ApiResponse({ status: 200, type: OnboardDemographicsResponseDto })
  async onboardDemographics(@Req() req: any, @Body() dto: OnboardDemographicsDto): Promise<OnboardDemographicsResponseDto> {
    return this.patientService.onboardDemographics(req.user.userId, dto);
  }

  @Post('onboarding/emergency-info')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Step 3: Emergency Contact Info' })
  @ApiResponse({ status: 200, type: OnboardEmergencyInfoResponseDto })
  async onboardEmergencyInfo(@Req() req: any, @Body() dto: OnboardEmergencyInfoDto): Promise<OnboardEmergencyInfoResponseDto> {
    return this.patientService.onboardEmergencyInfo(req.user.userId, dto);
  }

  @Post('onboarding/family-invite')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Step 6: Family Account Linkage Request' })
  @ApiResponse({ status: 200, type: OnboardFamilyInviteResponseDto })
  async onboardFamilyInvite(@Req() req: any, @Body() dto: OnboardFamilyInviteDto): Promise<OnboardFamilyInviteResponseDto> {
    return this.patientService.onboardFamilyInvite(req.user.userId, dto);
  }

  @Patch('family-consents/:id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Accept / Reject Family Linkage Consent' })
  @ApiResponse({ status: 200, type: UpdateFamilyConsentResponseDto })
  async updateFamilyConsent(@Param('id') consentId: string, @Body() dto: UpdateFamilyConsentDto): Promise<UpdateFamilyConsentResponseDto> {
    return this.patientService.updateFamilyConsent(consentId, dto);
  }

  @Get('me')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get Patient Profile Details' })
  @ApiResponse({ status: 200, type: PatientProfileResponseDto })
  async getProfile(@Req() req: any): Promise<PatientProfileResponseDto> {
    return this.patientService.getProfile(req.user.userId);
  }

  @Put('me')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Update Patient Profile' })
  @ApiResponse({ status: 200, type: PatientProfileResponseDto })
  async updateProfile(@Req() req: any, @Body() dto: OnboardDemographicsDto): Promise<PatientProfileResponseDto> {
    return this.patientService.updateProfile(req.user.userId, dto);
  }
}

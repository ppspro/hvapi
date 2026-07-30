import { PatientService } from '../../application/use-cases/patient.service';
import { OnboardDemographicsDto, OnboardDemographicsResponseDto } from '../dto/onboard-demographics.dto';
import { OnboardEmergencyInfoDto, OnboardEmergencyInfoResponseDto } from '../dto/onboard-emergency-info.dto';
import { OnboardFamilyInviteDto, OnboardFamilyInviteResponseDto } from '../dto/onboard-family-invite.dto';
import { UpdateFamilyConsentDto, UpdateFamilyConsentResponseDto } from '../dto/update-family-consent.dto';
import { PatientProfileResponseDto } from '../dto/patient-profile.dto';
export declare class PatientController {
    private readonly patientService;
    constructor(patientService: PatientService);
    onboardDemographics(req: any, dto: OnboardDemographicsDto): Promise<OnboardDemographicsResponseDto>;
    onboardEmergencyInfo(req: any, dto: OnboardEmergencyInfoDto): Promise<OnboardEmergencyInfoResponseDto>;
    onboardFamilyInvite(req: any, dto: OnboardFamilyInviteDto): Promise<OnboardFamilyInviteResponseDto>;
    updateFamilyConsent(consentId: string, dto: UpdateFamilyConsentDto): Promise<UpdateFamilyConsentResponseDto>;
    getProfile(req: any): Promise<PatientProfileResponseDto>;
    updateProfile(req: any, dto: OnboardDemographicsDto): Promise<PatientProfileResponseDto>;
}

import { IPatientRepository } from '../../domain/repositories/patient.repository.interface';
import { OnboardDemographicsDto, OnboardDemographicsResponseDto } from '../../presentation/dto/onboard-demographics.dto';
import { OnboardEmergencyInfoDto, OnboardEmergencyInfoResponseDto } from '../../presentation/dto/onboard-emergency-info.dto';
import { OnboardFamilyInviteDto, OnboardFamilyInviteResponseDto } from '../../presentation/dto/onboard-family-invite.dto';
import { UpdateFamilyConsentDto, UpdateFamilyConsentResponseDto } from '../../presentation/dto/update-family-consent.dto';
import { PatientProfileResponseDto } from '../../presentation/dto/patient-profile.dto';
export declare class PatientService {
    private readonly patientRepository;
    constructor(patientRepository: IPatientRepository);
    onboardDemographics(userId: string, dto: OnboardDemographicsDto): Promise<OnboardDemographicsResponseDto>;
    onboardEmergencyInfo(userId: string, dto: OnboardEmergencyInfoDto): Promise<OnboardEmergencyInfoResponseDto>;
    onboardFamilyInvite(userId: string, dto: OnboardFamilyInviteDto): Promise<OnboardFamilyInviteResponseDto>;
    updateFamilyConsent(consentId: string, dto: UpdateFamilyConsentDto): Promise<UpdateFamilyConsentResponseDto>;
    getProfile(userId: string): Promise<PatientProfileResponseDto>;
    updateProfile(userId: string, dto: Partial<OnboardDemographicsDto>): Promise<PatientProfileResponseDto>;
}

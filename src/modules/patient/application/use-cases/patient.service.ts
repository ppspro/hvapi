import { Injectable, NotFoundException, BadRequestException, Inject } from '@nestjs/common';
import { IPatientRepository } from '../../domain/repositories/patient.repository.interface';
import { OnboardDemographicsDto, OnboardDemographicsResponseDto } from '../../presentation/dto/onboard-demographics.dto';
import { OnboardEmergencyInfoDto, OnboardEmergencyInfoResponseDto } from '../../presentation/dto/onboard-emergency-info.dto';
import { OnboardFamilyInviteDto, OnboardFamilyInviteResponseDto } from '../../presentation/dto/onboard-family-invite.dto';
import { UpdateFamilyConsentDto, UpdateFamilyConsentResponseDto } from '../../presentation/dto/update-family-consent.dto';
import { PatientProfileResponseDto } from '../../presentation/dto/patient-profile.dto';
import { RegisterPatientDto, RegisterPatientResponseDto } from '../../presentation/dto/register-patient.dto';
import { OnboardInsuranceDto, OnboardInsuranceResponseDto } from '../../presentation/dto/onboard-insurance.dto';
import { OnboardHealthCardDto, OnboardHealthCardResponseDto } from '../../presentation/dto/onboard-health-card.dto';
import { OnboardingProgressResponseDto } from '../../presentation/dto/onboarding-progress.dto';
import { UpdateBasicInfoDto } from '../../presentation/dto/update-basic-info.dto';
import { UpdateContactDto } from '../../presentation/dto/update-contact.dto';
import { UpdateAddressDto } from '../../presentation/dto/update-address.dto';
import { UpdatePreferencesDto } from '../../presentation/dto/update-preferences.dto';
import { UpdateMedicalSummaryDto } from '../../presentation/dto/update-medical-summary.dto';
import { FullPatientProfileResponseDto } from '../../presentation/dto/full-patient-profile.dto';
import { ProfileCompletionResponseDto, ProfileTimelineResponseDto } from '../../presentation/dto/profile-completion.dto';

@Injectable()
export class PatientService {
  constructor(
    @Inject('IPatientRepository')
    private readonly patientRepository: IPatientRepository,
  ) {}

  async register(userId: string): Promise<RegisterPatientResponseDto> {
    const existing = await this.patientRepository.findProfileByUserId(userId);
    if (existing) {
      throw new BadRequestException('Patient profile already registered for this user');
    }

    const patientNumber = `PT-${Date.now()}`;
    const profile = await this.patientRepository.createProfile(userId, {
      patientNumber,
      onboardingStep: 1,
      status: 'DRAFT',
    });

    return {
      profileId: profile.id,
      patientNumber: profile.patientNumber!,
      status: profile.status,
      onboardingStep: profile.onboardingStep,
    };
  }

  async getRegistrationStatus(userId: string): Promise<any> {
    const profile = await this.patientRepository.findProfileByUserId(userId);
    if (!profile) {
      throw new NotFoundException('Registration status not found. Please register first');
    }
    return {
      status: profile.status,
      onboardingStep: profile.onboardingStep,
      patientNumber: profile.patientNumber,
    };
  }

  async resumeRegistration(userId: string, step: number): Promise<any> {
    const profile = await this.patientRepository.findProfileByUserId(userId);
    if (!profile) {
      throw new NotFoundException('Patient profile not found');
    }
    if (step < 1 || step > 6) {
      throw new BadRequestException('Invalid onboarding step index');
    }
    const updated = await this.patientRepository.updateProfile(profile.id, { onboardingStep: step });
    return {
      status: updated.status,
      onboardingStep: updated.onboardingStep,
      patientNumber: updated.patientNumber,
    };
  }

  async onboardDemographics(userId: string, dto: OnboardDemographicsDto): Promise<OnboardDemographicsResponseDto> {
    let profile = await this.patientRepository.findProfileByUserId(userId);
    if (!profile) {
      // Auto register draft if not exists for easy onboarding integration
      profile = await this.patientRepository.createProfile(userId, {
        patientNumber: `PT-${Date.now()}`,
        onboardingStep: 1,
        status: 'DRAFT',
      });
    }

    profile = await this.patientRepository.updateProfile(profile.id, {
      firstName: dto.firstName,
      lastName: dto.lastName,
      dateOfBirth: new Date(dto.dateOfBirth),
      gender: dto.gender,
      bloodGroup: dto.bloodGroup,
      address: dto.address,
      onboardingStep: Math.max(profile.onboardingStep, 2),
    });

    return {
      profileId: profile.id,
      message: 'Demographics onboarding completed successfully',
      nextStep: 3,
    };
  }

  async onboardEmergencyInfo(userId: string, dto: OnboardEmergencyInfoDto): Promise<OnboardEmergencyInfoResponseDto> {
    const profile = await this.patientRepository.findProfileByUserId(userId);
    if (!profile || profile.onboardingStep < 2) {
      throw new BadRequestException('Cannot skip mandatory onboarding steps. Complete demographics step first.');
    }

    const dbUser = await this.dbUserFetch(userId);
    if (dbUser && dbUser.phone === dto.phone) {
      throw new BadRequestException('Emergency contact phone number cannot be the same as the patient\'s phone number');
    }

    let contact = await this.patientRepository.findEmergencyContactByProfileId(profile.id);
    if (!contact) {
      contact = await this.patientRepository.createEmergencyContact(profile.id, {
        name: dto.name,
        relationship: dto.relationship,
        phone: dto.phone,
      });
    } else {
      contact = await this.patientRepository.updateEmergencyContact(profile.id, {
        name: dto.name,
        relationship: dto.relationship,
        phone: dto.phone,
      });
    }

    await this.patientRepository.updateProfile(profile.id, {
      onboardingStep: Math.max(profile.onboardingStep, 3),
    });

    return {
      contactId: contact.id,
      message: 'Emergency information onboarding completed successfully',
      nextStep: 4,
    };
  }

  async onboardInsurance(userId: string, dto: OnboardInsuranceDto): Promise<OnboardInsuranceResponseDto> {
    const profile = await this.patientRepository.findProfileByUserId(userId);
    if (!profile || profile.onboardingStep < 3) {
      throw new BadRequestException('Cannot skip mandatory onboarding steps. Complete emergency contact step first.');
    }

    let policy = await this.patientRepository.findInsurancePolicyByProfileId(profile.id);
    if (!policy) {
      policy = await this.patientRepository.createInsurancePolicy(profile.id, {
        providerName: dto.providerName,
        policyNumber: dto.policyNumber,
        coverageDetails: dto.coverageDetails,
        expiryDate: dto.expiryDate,
        secondaryProvider: dto.secondaryProvider,
        secondaryPolicyNumber: dto.secondaryPolicyNumber,
        secondaryCoverage: dto.secondaryCoverage,
        verificationStatus: 'PENDING',
      });
    } else {
      policy = await this.patientRepository.updateInsurancePolicy(profile.id, {
        providerName: dto.providerName,
        policyNumber: dto.policyNumber,
        coverageDetails: dto.coverageDetails,
        expiryDate: dto.expiryDate,
        secondaryProvider: dto.secondaryProvider,
        secondaryPolicyNumber: dto.secondaryPolicyNumber,
        secondaryCoverage: dto.secondaryCoverage,
      });
    }

    await this.patientRepository.updateProfile(profile.id, {
      onboardingStep: Math.max(profile.onboardingStep, 4),
    });

    return {
      policyId: policy.id,
      message: 'Primary and optional secondary insurance linked successfully',
      nextStep: 5,
    };
  }

  async onboardHealthCard(userId: string): Promise<OnboardHealthCardResponseDto> {
    const profile = await this.patientRepository.findProfileByUserId(userId);
    if (!profile || profile.onboardingStep < 4) {
      throw new BadRequestException('Cannot skip mandatory onboarding steps. Complete insurance link step first.');
    }

    let card = await this.patientRepository.findHealthCardByProfileId(profile.id);
    if (!card) {
      const cardNumber = `HC-${Date.now()}`;
      const expiresAt = new Date();
      expiresAt.setFullYear(expiresAt.getFullYear() + 5);

      card = await this.patientRepository.createHealthCard(profile.id, {
        cardNumber,
        status: 'ACTIVE',
        issuedAt: new Date(),
        expiresAt,
      });
    }

    await this.patientRepository.updateProfile(profile.id, {
      onboardingStep: Math.max(profile.onboardingStep, 5),
    });

    return {
      cardId: card.id,
      cardNumber: card.cardNumber,
      message: 'Digital Health Card initialized successfully',
      nextStep: 6,
    };
  }

  async onboardFamilyInvite(userId: string, dto: OnboardFamilyInviteDto): Promise<OnboardFamilyInviteResponseDto> {
    const profile = await this.patientRepository.findProfileByUserId(userId);
    if (!profile || profile.onboardingStep < 5) {
      throw new BadRequestException('Cannot skip mandatory onboarding steps. Complete health card step first.');
    }

    const consent = await this.patientRepository.createFamilyConsent(profile.id, dto.inviteePhone, dto.relationship);
    await this.patientRepository.updateProfile(profile.id, {
      onboardingStep: Math.max(profile.onboardingStep, 6),
    });

    return {
      consentId: consent.id,
      message: 'Family invitation sent successfully',
      nextStep: 6,
    };
  }

  async getOnboardingProgress(userId: string): Promise<OnboardingProgressResponseDto> {
    const profile = await this.patientRepository.findProfileByUserId(userId);
    if (!profile) {
      throw new NotFoundException('Patient profile not found');
    }

    const contact = await this.patientRepository.findEmergencyContactByProfileId(profile.id);
    const insurance = await this.patientRepository.findInsurancePolicyByProfileId(profile.id);
    const card = await this.patientRepository.findHealthCardByProfileId(profile.id);

    const steps = [
      { step: 1, name: 'Identity Verification', completed: true },
      { step: 2, name: 'Patient Demographics', completed: !!profile.firstName },
      { step: 3, name: 'Emergency Contact', completed: !!contact },
      { step: 4, name: 'Insurance Mapping', completed: !!insurance },
      { step: 5, name: 'Health Card Initialization', completed: !!card },
      { step: 6, name: 'Family Invitation', completed: profile.onboardingStep >= 6 },
    ];

    const completedCount = steps.filter(s => s.completed).length;
    const completionPercentage = Math.round((completedCount / 6) * 100);

    return {
      completionPercentage,
      status: profile.status,
      steps,
    };
  }

  async completeOnboarding(userId: string): Promise<any> {
    const profile = await this.patientRepository.findProfileByUserId(userId);
    if (!profile) {
      throw new NotFoundException('Patient profile not found');
    }

    const contact = await this.patientRepository.findEmergencyContactByProfileId(profile.id);
    const insurance = await this.patientRepository.findInsurancePolicyByProfileId(profile.id);
    const card = await this.patientRepository.findHealthCardByProfileId(profile.id);

    if (!profile.firstName || !contact || !insurance || !card) {
      throw new BadRequestException('Cannot complete onboarding. Mandatory steps details are missing');
    }

    await this.patientRepository.updateProfile(profile.id, {
      status: 'COMPLETED',
      onboardingStep: 7,
    });

    return {
      success: true,
      message: 'Onboarding completed and profile finalized successfully',
    };
  }

  async updateFamilyConsent(consentId: string, dto: UpdateFamilyConsentDto): Promise<UpdateFamilyConsentResponseDto> {
    const consent = await this.patientRepository.findConsentById(consentId);
    if (!consent) {
      throw new NotFoundException('Consent invitation not found');
    }

    if (consent.status !== 'PENDING') {
      throw new BadRequestException('Consent status has already been decided');
    }

    await this.patientRepository.updateConsentStatus(consentId, dto.status);

    if (dto.status === 'ACCEPTED') {
      await this.patientRepository.createFamilyMember(
        consent.patientProfileId,
        'Family Member',
        consent.relationship,
        consent.inviteePhone,
      );
    }

    return {
      success: true,
      message: `Consent invitation updated to ${dto.status} successfully`,
    };
  }

  async getProfile(userId: string): Promise<PatientProfileResponseDto> {
    const profile = await this.patientRepository.findProfileByUserId(userId);
    if (!profile) {
      throw new NotFoundException('Patient profile not found');
    }

    return {
      id: profile.id,
      firstName: profile.firstName || undefined,
      lastName: profile.lastName || undefined,
      dateOfBirth: profile.dateOfBirth ? profile.dateOfBirth.toISOString().split('T')[0] : undefined,
      gender: profile.gender || undefined,
      bloodGroup: profile.bloodGroup || undefined,
      address: profile.address || undefined,
      onboardingStep: profile.onboardingStep,
    };
  }

  async updateProfile(userId: string, dto: Partial<OnboardDemographicsDto>): Promise<PatientProfileResponseDto> {
    const profile = await this.patientRepository.findProfileByUserId(userId);
    if (!profile) {
      throw new NotFoundException('Patient profile not found');
    }

    const updated = await this.patientRepository.updateProfile(profile.id, {
      firstName: dto.firstName,
      lastName: dto.lastName,
      dateOfBirth: dto.dateOfBirth ? new Date(dto.dateOfBirth) : undefined,
      gender: dto.gender,
      bloodGroup: dto.bloodGroup,
      address: dto.address,
    });

    return {
      id: updated.id,
      firstName: updated.firstName || undefined,
      lastName: updated.lastName || undefined,
      dateOfBirth: updated.dateOfBirth ? updated.dateOfBirth.toISOString().split('T')[0] : undefined,
      gender: updated.gender || undefined,
      bloodGroup: updated.bloodGroup || undefined,
      address: updated.address || undefined,
      onboardingStep: updated.onboardingStep,
    };
  }

  async getFullProfile(userId: string): Promise<FullPatientProfileResponseDto> {
    const profile = await this.patientRepository.findProfileByUserId(userId);
    if (!profile) {
      throw new NotFoundException('Patient profile not found');
    }
    return this.mapToFullProfile(profile);
  }

  async updateBasicInfo(userId: string, dto: UpdateBasicInfoDto): Promise<FullPatientProfileResponseDto> {
    const profile = await this.patientRepository.findProfileByUserId(userId);
    if (!profile) {
      throw new NotFoundException('Patient profile not found');
    }

    const updated = await this.patientRepository.updateProfile(profile.id, {
      firstName: dto.firstName,
      lastName: dto.lastName,
      dateOfBirth: dto.dateOfBirth ? new Date(dto.dateOfBirth) : undefined,
      gender: dto.gender,
      bloodGroup: dto.bloodGroup,
      nationality: dto.nationality,
      occupation: dto.occupation,
      maritalStatus: dto.maritalStatus,
      languages: dto.languages,
    } as any);

    await this.patientRepository.createProfileAuditLog(profile.id, 'BASIC_INFO_UPDATED', undefined, undefined, undefined, userId);
    return this.mapToFullProfile(updated);
  }

  async updateContact(userId: string, dto: UpdateContactDto): Promise<any> {
    const profile = await this.patientRepository.findProfileByUserId(userId);
    if (!profile) {
      throw new NotFoundException('Patient profile not found');
    }

    const updated = await this.patientRepository.updateProfile(profile.id, {
      prefContactMethod: dto.prefContactMethod,
    } as any);

    await this.patientRepository.createProfileAuditLog(profile.id, 'CONTACT_UPDATED', undefined, undefined, undefined, userId);
    return {
      prefContactMethod: (updated as any).prefContactMethod,
      message: 'Contact preferences updated successfully',
    };
  }

  async updateAddress(userId: string, dto: UpdateAddressDto): Promise<any> {
    const profile = await this.patientRepository.findProfileByUserId(userId);
    if (!profile) {
      throw new NotFoundException('Patient profile not found');
    }

    const updateData: any = {};
    if (dto.currentAddress) {
      updateData.currentAddressLine1 = dto.currentAddress.line1;
      updateData.currentAddressLine2 = dto.currentAddress.line2;
      updateData.currentCity = dto.currentAddress.city;
      updateData.currentState = dto.currentAddress.state;
      updateData.currentDistrict = dto.currentAddress.district;
      updateData.currentPostalCode = dto.currentAddress.postalCode;
      updateData.currentCountry = dto.currentAddress.country;
    }
    if (dto.permanentAddress) {
      updateData.permanentAddressLine1 = dto.permanentAddress.line1;
      updateData.permanentAddressLine2 = dto.permanentAddress.line2;
      updateData.permanentCity = dto.permanentAddress.city;
      updateData.permanentState = dto.permanentAddress.state;
      updateData.permanentPostalCode = dto.permanentAddress.postalCode;
      updateData.permanentCountry = dto.permanentAddress.country;
    }

    await this.patientRepository.updateProfile(profile.id, updateData);
    await this.patientRepository.createProfileAuditLog(profile.id, 'ADDRESS_UPDATED', undefined, undefined, undefined, userId);

    return { message: 'Address updated successfully' };
  }

  async updatePreferences(userId: string, dto: UpdatePreferencesDto): Promise<any> {
    const profile = await this.patientRepository.findProfileByUserId(userId);
    if (!profile) {
      throw new NotFoundException('Patient profile not found');
    }

    await this.patientRepository.updateProfile(profile.id, {
      emailNotifications: dto.emailNotifications,
      smsNotifications: dto.smsNotifications,
      pushNotifications: dto.pushNotifications,
      prefContactMethod: dto.prefContactMethod,
      profileVisibility: dto.profileVisibility,
    } as any);

    await this.patientRepository.createProfileAuditLog(profile.id, 'PREFERENCES_UPDATED', undefined, undefined, undefined, userId);
    return { message: 'Communication preferences updated successfully' };
  }

  async updateMedicalSummary(userId: string, dto: UpdateMedicalSummaryDto): Promise<any> {
    const profile = await this.patientRepository.findProfileByUserId(userId);
    if (!profile) {
      throw new NotFoundException('Patient profile not found');
    }

    await this.patientRepository.updateProfile(profile.id, {
      bloodGroup: dto.bloodGroup,
      knownAllergies: dto.knownAllergies,
      chronicConditions: dto.chronicConditions,
      disabilities: dto.disabilities,
    } as any);

    await this.patientRepository.createProfileAuditLog(profile.id, 'MEDICAL_SUMMARY_UPDATED', undefined, undefined, undefined, userId);
    return { message: 'Medical summary updated successfully' };
  }

  async uploadPhoto(userId: string, photoUrl: string, photoKey: string): Promise<any> {
    const profile = await this.patientRepository.findProfileByUserId(userId);
    if (!profile) {
      throw new NotFoundException('Patient profile not found');
    }

    await this.patientRepository.updateProfile(profile.id, {
      photoUrl,
      photoKey,
    } as any);

    await this.patientRepository.createProfileAuditLog(profile.id, 'PHOTO_UPLOADED', 'photoUrl', (profile as any).photoUrl || 'none', photoUrl, userId);
    return { photoUrl, message: 'Profile photo updated successfully' };
  }

  async deletePhoto(userId: string): Promise<any> {
    const profile = await this.patientRepository.findProfileByUserId(userId);
    if (!profile) {
      throw new NotFoundException('Patient profile not found');
    }
    if (!(profile as any).photoUrl) {
      throw new BadRequestException('No profile photo exists to delete');
    }

    await this.patientRepository.updateProfile(profile.id, { photoUrl: null, photoKey: null } as any);
    await this.patientRepository.createProfileAuditLog(profile.id, 'PHOTO_DELETED', 'photoUrl', (profile as any).photoUrl, undefined, userId);
    return { message: 'Profile photo deleted successfully' };
  }

  async getProfileCompletion(userId: string): Promise<ProfileCompletionResponseDto> {
    const profile = await this.patientRepository.findProfileByUserId(userId) as any;
    if (!profile) {
      throw new NotFoundException('Patient profile not found');
    }

    const contact = await this.patientRepository.findEmergencyContactByProfileId(profile.id);
    const insurance = await this.patientRepository.findInsurancePolicyByProfileId(profile.id);
    const card = await this.patientRepository.findHealthCardByProfileId(profile.id);

    const sections = [
      {
        section: 'Basic Information',
        completed: !!(profile.firstName && profile.lastName && profile.dateOfBirth && profile.gender),
        missingFields: [
          ...(!profile.firstName ? ['firstName'] : []),
          ...(!profile.lastName ? ['lastName'] : []),
          ...(!profile.dateOfBirth ? ['dateOfBirth'] : []),
          ...(!profile.gender ? ['gender'] : []),
        ],
      },
      {
        section: 'Demographics',
        completed: !!(profile.nationality && profile.maritalStatus),
        missingFields: [
          ...(!profile.nationality ? ['nationality'] : []),
          ...(!profile.maritalStatus ? ['maritalStatus'] : []),
        ],
      },
      {
        section: 'Address',
        completed: !!(profile.currentCity && profile.currentCountry),
        missingFields: [
          ...(!profile.currentCity ? ['currentCity'] : []),
          ...(!profile.currentCountry ? ['currentCountry'] : []),
        ],
      },
      {
        section: 'Emergency Contact',
        completed: !!contact,
        missingFields: !contact ? ['emergencyContact'] : [],
      },
      {
        section: 'Insurance',
        completed: !!insurance,
        missingFields: !insurance ? ['insurancePolicy'] : [],
      },
      {
        section: 'Health Card',
        completed: !!card,
        missingFields: !card ? ['healthCard'] : [],
      },
      {
        section: 'Photo',
        completed: !!profile.photoUrl,
        missingFields: !profile.photoUrl ? ['photoUrl'] : [],
      },
      {
        section: 'Medical Summary',
        completed: !!(profile.bloodGroup),
        missingFields: !profile.bloodGroup ? ['bloodGroup'] : [],
      },
    ];

    const completedCount = sections.filter(s => s.completed).length;
    const completionPercentage = Math.round((completedCount / sections.length) * 100);

    return {
      completionPercentage,
      status: profile.status,
      sections,
    };
  }

  async getProfileTimeline(userId: string): Promise<ProfileTimelineResponseDto> {
    const profile = await this.patientRepository.findProfileByUserId(userId);
    if (!profile) {
      throw new NotFoundException('Patient profile not found');
    }

    const logs = await this.patientRepository.findProfileAuditLogs(profile.id);
    const events = logs.map((log: any) => ({
      action: log.action,
      fieldChanged: log.fieldChanged || undefined,
      timestamp: log.createdAt.toISOString(),
    }));

    return { events };
  }

  async getProfileActivity(userId: string): Promise<any> {
    const profile = await this.patientRepository.findProfileByUserId(userId);
    if (!profile) {
      throw new NotFoundException('Patient profile not found');
    }

    const logs = await this.patientRepository.findProfileAuditLogs(profile.id);
    return {
      totalChanges: logs.length,
      lastActivity: logs.length > 0 ? logs[0].createdAt : null,
      recentActions: logs.slice(0, 5).map((l: any) => ({ action: l.action, timestamp: l.createdAt })),
    };
  }

  private mapToFullProfile(profile: any): FullPatientProfileResponseDto {
    return {
      id: profile.id,
      patientNumber: profile.patientNumber || undefined,
      firstName: profile.firstName || undefined,
      lastName: profile.lastName || undefined,
      dateOfBirth: profile.dateOfBirth ? profile.dateOfBirth.toISOString().split('T')[0] : undefined,
      gender: profile.gender || undefined,
      bloodGroup: profile.bloodGroup || undefined,
      nationality: profile.nationality || undefined,
      occupation: profile.occupation || undefined,
      maritalStatus: profile.maritalStatus || undefined,
      languages: profile.languages || [],
      currentAddress: (profile.currentCity || profile.currentCountry) ? {
        line1: profile.currentAddressLine1 || undefined,
        line2: profile.currentAddressLine2 || undefined,
        city: profile.currentCity || undefined,
        state: profile.currentState || undefined,
        district: profile.currentDistrict || undefined,
        postalCode: profile.currentPostalCode || undefined,
        country: profile.currentCountry || undefined,
      } : undefined,
      permanentAddress: (profile.permanentCity || profile.permanentCountry) ? {
        line1: profile.permanentAddressLine1 || undefined,
        line2: profile.permanentAddressLine2 || undefined,
        city: profile.permanentCity || undefined,
        state: profile.permanentState || undefined,
        postalCode: profile.permanentPostalCode || undefined,
        country: profile.permanentCountry || undefined,
      } : undefined,
      photoUrl: profile.photoUrl || undefined,
      knownAllergies: profile.knownAllergies || [],
      chronicConditions: profile.chronicConditions || [],
      disabilities: profile.disabilities || [],
      prefContactMethod: profile.prefContactMethod || undefined,
      emailNotifications: profile.emailNotifications ?? true,
      smsNotifications: profile.smsNotifications ?? true,
      pushNotifications: profile.pushNotifications ?? true,
      profileVisibility: profile.profileVisibility || 'PRIVATE',
      onboardingStep: profile.onboardingStep,
      status: profile.status,
      createdAt: profile.createdAt.toISOString(),
      updatedAt: profile.updatedAt.toISOString(),
    };
  }

  private async dbUserFetch(userId: string) {
    const prisma = (this.patientRepository as any).db;
    if (!prisma) {
      return null;
    }
    return await prisma.user.findUnique({ where: { id: userId } });
  }
}

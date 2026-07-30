import { Injectable, NotFoundException, BadRequestException, Inject } from '@nestjs/common';
import { IPatientRepository } from '../../domain/repositories/patient.repository.interface';
import { OnboardDemographicsDto, OnboardDemographicsResponseDto } from '../../presentation/dto/onboard-demographics.dto';
import { OnboardEmergencyInfoDto, OnboardEmergencyInfoResponseDto } from '../../presentation/dto/onboard-emergency-info.dto';
import { OnboardFamilyInviteDto, OnboardFamilyInviteResponseDto } from '../../presentation/dto/onboard-family-invite.dto';
import { UpdateFamilyConsentDto, UpdateFamilyConsentResponseDto } from '../../presentation/dto/update-family-consent.dto';
import { PatientProfileResponseDto } from '../../presentation/dto/patient-profile.dto';

@Injectable()
export class PatientService {
  constructor(
    @Inject('IPatientRepository')
    private readonly patientRepository: IPatientRepository,
  ) {}

  async onboardDemographics(userId: string, dto: OnboardDemographicsDto): Promise<OnboardDemographicsResponseDto> {
    let profile = await this.patientRepository.findProfileByUserId(userId);
    if (!profile) {
      profile = await this.patientRepository.createProfile(userId, {
        firstName: dto.firstName,
        lastName: dto.lastName,
        dateOfBirth: new Date(dto.dateOfBirth),
        gender: dto.gender,
        bloodGroup: dto.bloodGroup,
        address: dto.address,
      });
    } else {
      profile = await this.patientRepository.updateProfile(profile.id, {
        firstName: dto.firstName,
        lastName: dto.lastName,
        dateOfBirth: new Date(dto.dateOfBirth),
        gender: dto.gender,
        bloodGroup: dto.bloodGroup,
        address: dto.address,
        onboardingStep: 2,
      });
    }

    return {
      profileId: profile.id,
      message: 'Demographics onboarding completed successfully',
      nextStep: 3,
    };
  }

  async onboardEmergencyInfo(userId: string, dto: OnboardEmergencyInfoDto): Promise<OnboardEmergencyInfoResponseDto> {
    const profile = await this.patientRepository.findProfileByUserId(userId);
    if (!profile) {
      throw new NotFoundException('Patient profile not found. Complete demographics step first.');
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

    await this.patientRepository.updateProfile(profile.id, { onboardingStep: 3 });

    return {
      contactId: contact.id,
      message: 'Emergency information onboarding completed successfully',
      nextStep: 4,
    };
  }

  async onboardFamilyInvite(userId: string, dto: OnboardFamilyInviteDto): Promise<OnboardFamilyInviteResponseDto> {
    const profile = await this.patientRepository.findProfileByUserId(userId);
    if (!profile) {
      throw new NotFoundException('Patient profile not found');
    }

    const consent = await this.patientRepository.createFamilyConsent(profile.id, dto.inviteePhone, dto.relationship);
    await this.patientRepository.updateProfile(profile.id, { onboardingStep: 7 });

    return {
      consentId: consent.id,
      message: 'Family invitation sent successfully',
      nextStep: 7,
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
      // Create actual family member relationship record upon consent approval
      await this.patientRepository.createFamilyMember(
        consent.patientProfileId,
        'Family Member', // Placeholder full name per PRD v1 consent flow logic
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
      firstName: profile.firstName,
      lastName: profile.lastName,
      dateOfBirth: profile.dateOfBirth.toISOString().split('T')[0],
      gender: profile.gender,
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
      firstName: updated.firstName,
      lastName: updated.lastName,
      dateOfBirth: updated.dateOfBirth.toISOString().split('T')[0],
      gender: updated.gender,
      bloodGroup: updated.bloodGroup || undefined,
      address: updated.address || undefined,
      onboardingStep: updated.onboardingStep,
    };
  }
}

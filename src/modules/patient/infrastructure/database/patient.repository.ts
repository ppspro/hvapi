import { Injectable } from '@nestjs/common';
import { DatabaseService } from '@database/database.service';
import { IPatientRepository } from '../../domain/repositories/patient.repository.interface';
import { PatientProfileEntity, EmergencyContactEntity, FamilyConsentEntity, FamilyMemberEntity } from '../../domain/entities/patient.entity';

@Injectable()
export class PatientRepository implements IPatientRepository {
  constructor(private readonly db: DatabaseService) {}

  async findProfileByUserId(userId: string): Promise<PatientProfileEntity | null> {
    return (await this.db.patientProfile.findUnique({
      where: { userId },
    })) as PatientProfileEntity | null;
  }

  async findProfileById(profileId: string): Promise<PatientProfileEntity | null> {
    return (await this.db.patientProfile.findUnique({
      where: { id: profileId },
    })) as PatientProfileEntity | null;
  }

  async createProfile(userId: string, data: Partial<PatientProfileEntity>): Promise<PatientProfileEntity> {
    return (await this.db.patientProfile.create({
      data: {
        userId,
        firstName: data.firstName!,
        lastName: data.lastName!,
        dateOfBirth: new Date(data.dateOfBirth!),
        gender: data.gender!,
        bloodGroup: data.bloodGroup || null,
        address: data.address || null,
        onboardingStep: 2,
      },
    })) as PatientProfileEntity;
  }

  async updateProfile(profileId: string, data: Partial<PatientProfileEntity>): Promise<PatientProfileEntity> {
    const updateData: any = { ...data };
    if (data.dateOfBirth) {
      updateData.dateOfBirth = new Date(data.dateOfBirth);
    }
    return (await this.db.patientProfile.update({
      where: { id: profileId },
      data: updateData,
    })) as PatientProfileEntity;
  }

  async createEmergencyContact(profileId: string, data: Partial<EmergencyContactEntity>): Promise<EmergencyContactEntity> {
    return (await this.db.emergencyContact.create({
      data: {
        patientProfileId: profileId,
        name: data.name!,
        relationship: data.relationship!,
        phone: data.phone!,
      },
    })) as EmergencyContactEntity;
  }

  async updateEmergencyContact(profileId: string, data: Partial<EmergencyContactEntity>): Promise<EmergencyContactEntity> {
    return (await this.db.emergencyContact.update({
      where: { patientProfileId: profileId },
      data,
    })) as EmergencyContactEntity;
  }

  async findEmergencyContactByProfileId(profileId: string): Promise<EmergencyContactEntity | null> {
    return (await this.db.emergencyContact.findUnique({
      where: { patientProfileId: profileId },
    })) as EmergencyContactEntity | null;
  }

  async createFamilyConsent(profileId: string, inviteePhone: string, relationship: string): Promise<FamilyConsentEntity> {
    return (await this.db.familyConsent.create({
      data: {
        patientProfileId: profileId,
        inviteePhone,
        relationship,
        status: 'PENDING',
      },
    })) as FamilyConsentEntity;
  }

  async findConsentById(consentId: string): Promise<FamilyConsentEntity | null> {
    return (await this.db.familyConsent.findUnique({
      where: { id: consentId },
    })) as FamilyConsentEntity | null;
  }

  async updateConsentStatus(consentId: string, status: 'ACCEPTED' | 'REJECTED'): Promise<FamilyConsentEntity> {
    return (await this.db.familyConsent.update({
      where: { id: consentId },
      data: { status },
    })) as FamilyConsentEntity;
  }

  async createFamilyMember(profileId: string, fullName: string, relationship: string, phone: string): Promise<FamilyMemberEntity> {
    return (await this.db.familyMember.create({
      data: {
        patientProfileId: profileId,
        fullName,
        relationship,
        phone,
      },
    })) as FamilyMemberEntity;
  }
}

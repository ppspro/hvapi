import { PatientProfileEntity, EmergencyContactEntity, FamilyConsentEntity, FamilyMemberEntity } from '../entities/patient.entity';

export interface IPatientRepository {
  findProfileByUserId(userId: string): Promise<PatientProfileEntity | null>;
  findProfileById(profileId: string): Promise<PatientProfileEntity | null>;
  createProfile(userId: string, data: Partial<PatientProfileEntity>): Promise<PatientProfileEntity>;
  updateProfile(profileId: string, data: Partial<PatientProfileEntity>): Promise<PatientProfileEntity>;
  
  createEmergencyContact(profileId: string, data: Partial<EmergencyContactEntity>): Promise<EmergencyContactEntity>;
  updateEmergencyContact(profileId: string, data: Partial<EmergencyContactEntity>): Promise<EmergencyContactEntity>;
  findEmergencyContactByProfileId(profileId: string): Promise<EmergencyContactEntity | null>;

  createInsurancePolicy(profileId: string, data: any): Promise<any>;
  updateInsurancePolicy(profileId: string, data: any): Promise<any>;
  findInsurancePolicyByProfileId(profileId: string): Promise<any | null>;

  createHealthCard(profileId: string, data: any): Promise<any>;
  findHealthCardByProfileId(profileId: string): Promise<any | null>;

  createFamilyConsent(profileId: string, inviteePhone: string, relationship: string): Promise<FamilyConsentEntity>;
  findConsentById(consentId: string): Promise<FamilyConsentEntity | null>;
  updateConsentStatus(consentId: string, status: 'ACCEPTED' | 'REJECTED'): Promise<FamilyConsentEntity>;
  createFamilyMember(profileId: string, fullName: string, relationship: string, phone: string): Promise<FamilyMemberEntity>;

  createProfileAuditLog(profileId: string, action: string, fieldChanged?: string, previousValue?: string, newValue?: string, performedByUserId?: string): Promise<void>;
  findProfileAuditLogs(profileId: string): Promise<any[]>;
}


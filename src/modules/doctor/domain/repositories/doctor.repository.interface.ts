import {
  DoctorProfileEntity,
  DoctorQualificationEntity,
  DoctorCertificationEntity,
  DoctorExperienceEntity,
  DoctorDocumentEntity,
  DoctorScheduleSlotEntity,
  DoctorHistoryEntity,
  DoctorAuditLogEntity,
} from '../entities/doctor.entity';

export interface IDoctorRepository {
  findProfileByUserId(userId: string): Promise<DoctorProfileEntity | null>;

  createDoctor(data: any): Promise<DoctorProfileEntity>;
  findDoctorById(id: string, includeDeleted?: boolean): Promise<DoctorProfileEntity | null>;
  findDoctorByRegistrationNumber(registrationNumber: string): Promise<DoctorProfileEntity | null>;
  findDoctorByLicenseNumber(licenseNumber: string): Promise<DoctorProfileEntity | null>;
  findDoctorByProviderIdentifier(providerIdentifier: string): Promise<DoctorProfileEntity | null>;
  findDoctors(includeDeleted?: boolean): Promise<DoctorProfileEntity[]>;
  findPendingDoctors(): Promise<DoctorProfileEntity[]>;
  updateDoctor(id: string, data: any): Promise<DoctorProfileEntity>;
  softDeleteDoctor(id: string): Promise<void>;
  searchDoctors(query: string): Promise<DoctorProfileEntity[]>;

  addQualification(doctorProfileId: string, data: any): Promise<DoctorQualificationEntity>;
  addCertification(doctorProfileId: string, data: any): Promise<DoctorCertificationEntity>;
  addExperience(doctorProfileId: string, data: any): Promise<DoctorExperienceEntity>;
  attachDocument(doctorProfileId: string, data: any): Promise<DoctorDocumentEntity>;
  findDocumentsByDoctorId(doctorProfileId: string): Promise<DoctorDocumentEntity[]>;

  findSlotsByDoctorId(doctorProfileId: string): Promise<DoctorScheduleSlotEntity[]>;

  createHistory(doctorProfileId: string, data: {
    action: string;
    previousStatus?: string;
    newStatus: string;
    reason?: string;
    performedBy?: string;
  }): Promise<DoctorHistoryEntity>;

  findHistoryByDoctorId(doctorProfileId: string): Promise<DoctorHistoryEntity[]>;

  createAuditLog(data: {
    doctorProfileId: string;
    action: string;
    performedBy?: string;
    details?: string;
  }): Promise<DoctorAuditLogEntity>;

  getStatistics(): Promise<{
    totalDoctors: number;
    verifiedDoctors: number;
    pendingDoctors: number;
    suspendedDoctors: number;
  }>;
}

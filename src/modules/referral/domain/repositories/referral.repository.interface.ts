import {
  PatientReferralEntity, ReferralNoteEntity, ReferralAttachmentEntity, ReferralStatusHistoryEntity,
} from '../entities/referral.entity';

export interface IReferralRepository {
  createReferral(data: any): Promise<PatientReferralEntity>;
  findReferrals(filters: {
    patientId?: string;
    referringDoctorId?: string;
    receivingDoctorId?: string;
    receivingFacilityId?: string;
    status?: string;
    priority?: string;
    page?: number;
    limit?: number;
  }): Promise<{ data: PatientReferralEntity[]; total: number }>;

  findReferralById(id: string): Promise<PatientReferralEntity | null>;
  findReferralByNumber(referralNumber: string): Promise<PatientReferralEntity | null>;
  updateReferralStatus(id: string, status: string, changedBy: string, reason?: string): Promise<PatientReferralEntity>;
  triageReferral(id: string, outcome: string, changedBy: string, receivingDoctorId?: string, reason?: string): Promise<PatientReferralEntity>;

  addNote(data: { referralId: string; authorId: string; authorRole: string; noteText: string; isPrivate?: boolean }): Promise<ReferralNoteEntity>;
  findNotes(referralId: string, includePrivate?: boolean): Promise<ReferralNoteEntity[]>;

  addAttachment(data: { referralId: string; attachmentId: string; attachedBy: string }): Promise<ReferralAttachmentEntity>;
  findAttachments(referralId: string): Promise<ReferralAttachmentEntity[]>;

  findStatusHistory(referralId: string): Promise<ReferralStatusHistoryEntity[]>;
  getDashboardStats(facilityId?: string): Promise<{
    totalReferrals: number;
    pendingTriageCount: number;
    acceptedCount: number;
    completedCount: number;
    avgCompletionTimeHours: number;
  }>;

  softDeleteReferral(id: string): Promise<PatientReferralEntity>;
}

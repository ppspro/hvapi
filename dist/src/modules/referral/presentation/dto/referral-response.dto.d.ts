export declare class ReferralNoteResponseDto {
    id: string;
    referralId: string;
    authorId: string;
    authorRole: string;
    noteText: string;
    isPrivate: boolean;
    createdAt: string;
}
export declare class ReferralAttachmentResponseDto {
    id: string;
    referralId: string;
    attachmentId: string;
    attachedBy: string;
    createdAt: string;
}
export declare class ReferralStatusHistoryResponseDto {
    id: string;
    referralId: string;
    fromStatus?: string;
    toStatus: string;
    changedBy: string;
    reason?: string;
    createdAt: string;
}
export declare class ReferralResponseDto {
    id: string;
    referralNumber: string;
    patientId: string;
    referringDoctorId: string;
    referringFacilityId: string;
    receivingDoctorId?: string;
    receivingFacilityId: string;
    medicalRecordId?: string;
    referralType: string;
    priority: string;
    status: string;
    reasonForReferral: string;
    clinicalSummary?: string;
    specialtyRequired?: string;
    expiresAt?: string;
    acceptedAt?: string;
    completedAt?: string;
    rejectedAt?: string;
    rejectionReason?: string;
    createdAt: string;
    updatedAt: string;
    notes?: ReferralNoteResponseDto[];
    attachments?: ReferralAttachmentResponseDto[];
    statusHistory?: ReferralStatusHistoryResponseDto[];
}
export declare class ReferralDashboardStatsResponseDto {
    totalReferrals: number;
    pendingTriageCount: number;
    acceptedCount: number;
    completedCount: number;
    avgCompletionTimeHours: number;
}

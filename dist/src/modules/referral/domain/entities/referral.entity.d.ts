export declare class PatientReferralEntity {
    id: string;
    referralNumber: string;
    patientId: string;
    referringDoctorId: string;
    referringFacilityId: string;
    receivingDoctorId?: string | null;
    receivingFacilityId: string;
    medicalRecordId?: string | null;
    referralType: string;
    priority: string;
    status: string;
    reasonForReferral: string;
    clinicalSummary?: string | null;
    specialtyRequired?: string | null;
    expiresAt?: Date | null;
    acceptedAt?: Date | null;
    completedAt?: Date | null;
    rejectedAt?: Date | null;
    rejectionReason?: string | null;
    isDeleted: boolean;
    deletedAt?: Date | null;
    createdAt: Date;
    updatedAt: Date;
    notes?: ReferralNoteEntity[];
    attachments?: ReferralAttachmentEntity[];
    statusHistory?: ReferralStatusHistoryEntity[];
}
export declare class ReferralNoteEntity {
    id: string;
    referralId: string;
    authorId: string;
    authorRole: string;
    noteText: string;
    isPrivate: boolean;
    createdAt: Date;
}
export declare class ReferralAttachmentEntity {
    id: string;
    referralId: string;
    attachmentId: string;
    attachedBy: string;
    createdAt: Date;
}
export declare class ReferralStatusHistoryEntity {
    id: string;
    referralId: string;
    fromStatus?: string | null;
    toStatus: string;
    changedBy: string;
    reason?: string | null;
    createdAt: Date;
}

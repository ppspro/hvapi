export declare class CreateReferralDto {
    patientId: string;
    receivingFacilityId: string;
    receivingDoctorId?: string;
    medicalRecordId?: string;
    referralType?: string;
    priority?: string;
    reasonForReferral: string;
    clinicalSummary?: string;
    specialtyRequired?: string;
}
export declare class TriageReferralDto {
    outcome: string;
    receivingDoctorId?: string;
    reason?: string;
}
export declare class UpdateReferralStatusDto {
    status: string;
    reason?: string;
}
export declare class AddReferralNoteDto {
    noteText: string;
    isPrivate?: boolean;
}
export declare class AddReferralAttachmentDto {
    attachmentId: string;
}

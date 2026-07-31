export declare class MedicalAttachmentResponseDto {
    id: string;
    medicalRecordId?: string;
    patientProfileId: string;
    fileName: string;
    originalName: string;
    fileSize: number;
    mimeType: string;
    category: string;
    storageKey: string;
    storageUrl: string;
    checksum?: string;
    version: number;
    isDeleted: boolean;
    virusScanStatus: string;
    createdAt: string;
    updatedAt: string;
}
export declare class AttachmentVersionResponseDto {
    id: string;
    attachmentId: string;
    version: number;
    storageKey: string;
    storageUrl: string;
    fileSize: number;
    createdById?: string;
    createdAt: string;
}
export declare class MedicalRecordResponseDto {
    id: string;
    patientProfileId: string;
    title: string;
    chiefComplaint?: string;
    clinicalNotes?: string;
    treatmentPlan?: string;
    followUpInstructions?: string;
    status: string;
    isDeleted: boolean;
    deletedAt?: string;
    encounters?: any[];
    diagnoses?: any[];
    vitalSigns?: any[];
    procedures?: any[];
    attachments?: MedicalAttachmentResponseDto[];
    createdAt: string;
    updatedAt: string;
}
export declare class MedicalTimelineItemDto {
    id: string;
    eventType: string;
    title: string;
    status?: string;
    category?: string;
    date: string;
    details: any;
}

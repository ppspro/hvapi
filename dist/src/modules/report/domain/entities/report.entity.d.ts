export declare class MedicalReportEntity {
    id: string;
    patientProfileId: string;
    title: string;
    description?: string | null;
    category: string;
    status: string;
    reportDate?: Date | null;
    prescribedBy?: string | null;
    providerName?: string | null;
    facilityName?: string | null;
    doctorName?: string | null;
    pageCount: number;
    language: string;
    tags: string[];
    notes?: string | null;
    verificationStatus: string;
    verifiedBy?: string | null;
    verifiedAt?: Date | null;
    currentVersion: number;
    isDeleted: boolean;
    deletedAt?: Date | null;
    createdAt: Date;
    updatedAt: Date;
    attachments?: ReportAttachmentEntity[];
    versions?: ReportVersionEntity[];
}
export declare class ReportAttachmentEntity {
    id: string;
    medicalReportId: string;
    fileName: string;
    originalName?: string | null;
    fileSize: number;
    mimeType: string;
    storageKey?: string | null;
    storageUrl: string;
    checksum?: string | null;
    createdAt: Date;
}
export declare class ReportVersionEntity {
    id: string;
    medicalReportId: string;
    version: number;
    fileName: string;
    storageKey?: string | null;
    storageUrl: string;
    fileSize: number;
    mimeType: string;
    createdById?: string | null;
    createdAt: Date;
}
export declare class ReportAuditLogEntity {
    id: string;
    medicalReportId: string;
    action: string;
    performedBy?: string | null;
    details?: string | null;
    createdAt: Date;
}

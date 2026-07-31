export declare class ReportAttachmentDto {
    id: string;
    fileName: string;
    originalName?: string;
    fileSize: number;
    mimeType: string;
    storageKey?: string;
    storageUrl: string;
    checksum?: string;
    createdAt: string;
}
export declare class ReportVersionResponseDto {
    id: string;
    medicalReportId: string;
    version: number;
    fileName: string;
    storageKey?: string;
    storageUrl: string;
    fileSize: number;
    mimeType: string;
    createdById?: string;
    createdAt: string;
}
export declare class FullReportResponseDto {
    id: string;
    patientProfileId: string;
    title: string;
    description?: string;
    category: string;
    status: string;
    reportDate?: string;
    prescribedBy?: string;
    providerName?: string;
    facilityName?: string;
    doctorName?: string;
    pageCount: number;
    language: string;
    tags: string[];
    notes?: string;
    verificationStatus: string;
    verifiedBy?: string;
    verifiedAt?: string;
    currentVersion: number;
    isDeleted: boolean;
    attachments: ReportAttachmentDto[];
    versions?: ReportVersionResponseDto[];
    createdAt: string;
    updatedAt: string;
}
export declare class DownloadTokenResponseDto {
    downloadUrl: string;
    token: string;
    expiresAt: string;
}
export declare class PreviewMetadataResponseDto {
    id: string;
    title: string;
    fileName: string;
    fileSize: number;
    mimeType: string;
    pageCount: number;
    language: string;
    storageUrl: string;
    isPdf: boolean;
    verificationStatus: string;
}

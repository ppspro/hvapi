export declare enum ReportCategory {
    LAB = "LAB",
    RADIOLOGY = "RADIOLOGY",
    PRESCRIPTION = "PRESCRIPTION",
    REFERRAL = "REFERRAL",
    DISCHARGE = "DISCHARGE",
    VACCINATION = "VACCINATION",
    CLINICAL_NOTES = "CLINICAL_NOTES",
    INSURANCE = "INSURANCE",
    CUSTOM = "CUSTOM"
}
export declare class UploadReportDto {
    title: string;
    description?: string;
    category?: ReportCategory;
    reportDate?: string;
    prescribedBy?: string;
    providerName?: string;
    facilityName?: string;
    doctorName?: string;
    pageCount?: number;
    language?: string;
    tags?: string[];
    notes?: string;
    fileName: string;
    fileSize: number;
    mimeType: string;
    storageUrl: string;
    storageKey?: string;
    checksum?: string;
}
export declare class UpdateReportDto {
    title?: string;
    description?: string;
    category?: ReportCategory;
    reportDate?: string;
    providerName?: string;
    doctorName?: string;
    tags?: string[];
    notes?: string;
}
export declare class ReplaceReportFileDto {
    fileName: string;
    fileSize: number;
    mimeType: string;
    storageUrl: string;
    storageKey?: string;
}
export declare class VerifyReportDto {
    notes?: string;
}

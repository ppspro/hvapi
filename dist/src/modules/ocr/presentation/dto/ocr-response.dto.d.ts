export declare class OCRPageResponseDto {
    id: string;
    ocrJobId: string;
    pageNumber: number;
    imagePath?: string;
    rawText?: string;
    confidence: number;
    rotationAngle: number;
    processingMetadata?: any;
    createdAt: string;
}
export declare class ExtractedFieldResponseDto {
    id: string;
    ocrJobId: string;
    fieldName: string;
    fieldValue: string;
    confidence: number;
    boundingBox?: any;
    validationStatus: string;
    requiresReview: boolean;
    createdAt: string;
}
export declare class OCRTemplateResponseDto {
    id: string;
    code: string;
    name: string;
    documentType: string;
    fieldDefinitions?: any;
    validationRules?: any;
    version: number;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
}
export declare class OCRVerificationResponseDto {
    id: string;
    ocrJobId: string;
    reviewedBy: string;
    reviewStatus: string;
    reviewNotes?: string;
    completedAt?: string;
    createdAt: string;
}
export declare class OCRJobResponseDto {
    id: string;
    medicalAttachmentId: string;
    documentType: string;
    status: string;
    submittedBy?: string;
    startedAt?: string;
    completedAt?: string;
    processingTimeMs?: number;
    overallConfidence?: number;
    confidenceLevel: string;
    failureReason?: string;
    pages: OCRPageResponseDto[];
    extractedFields: ExtractedFieldResponseDto[];
    verifications: OCRVerificationResponseDto[];
    createdAt: string;
    updatedAt: string;
}
export declare class OCRDashboardResponseDto {
    totalJobs: number;
    completedJobs: number;
    reviewRequiredJobs: number;
    failedJobs: number;
    averageConfidence: number;
    activeTemplatesCount: number;
}

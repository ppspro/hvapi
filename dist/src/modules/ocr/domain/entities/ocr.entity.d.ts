export declare class OCRJobEntity {
    id: string;
    medicalAttachmentId: string;
    documentType: string;
    status: string;
    submittedBy?: string | null;
    startedAt?: Date | null;
    completedAt?: Date | null;
    processingTimeMs?: number | null;
    overallConfidence?: number | null;
    confidenceLevel: string;
    failureReason?: string | null;
    isDeleted: boolean;
    deletedAt?: Date | null;
    createdAt: Date;
    updatedAt: Date;
    pages?: OCRPageEntity[];
    extractedFields?: ExtractedFieldEntity[];
    verifications?: OCRVerificationEntity[];
}
export declare class OCRPageEntity {
    id: string;
    ocrJobId: string;
    pageNumber: number;
    imagePath?: string | null;
    rawText?: string | null;
    confidence: number;
    rotationAngle: number;
    processingMetadata?: string | null;
    createdAt: Date;
    updatedAt: Date;
}
export declare class ExtractedFieldEntity {
    id: string;
    ocrJobId: string;
    fieldName: string;
    fieldValue: string;
    confidence: number;
    boundingBox?: string | null;
    validationStatus: string;
    requiresReview: boolean;
    createdAt: Date;
    updatedAt: Date;
}
export declare class OCRTemplateEntity {
    id: string;
    code: string;
    name: string;
    documentType: string;
    fieldDefinitions?: string | null;
    validationRules?: string | null;
    version: number;
    isActive: boolean;
    isDeleted: boolean;
    deletedAt?: Date | null;
    createdAt: Date;
    updatedAt: Date;
}
export declare class OCRVerificationEntity {
    id: string;
    ocrJobId: string;
    reviewedBy: string;
    reviewStatus: string;
    reviewNotes?: string | null;
    completedAt?: Date | null;
    createdAt: Date;
    updatedAt: Date;
}
export declare class OCRAuditLogEntity {
    id: string;
    ocrJobId?: string | null;
    action: string;
    performedBy?: string | null;
    details?: string | null;
    createdAt: Date;
}

export declare class OcrDocumentEntity {
    id: string;
    patientProfileId: string;
    imageUrl: string;
    status: string;
    createdAt: Date;
    updatedAt: Date;
}
export declare class OcrExtractionEntity {
    id: string;
    documentId: string;
    extractedData: string;
    confidence: number;
    createdAt: Date;
}
export declare class OcrReviewEntity {
    id: string;
    documentId: string;
    correctedData: string;
    reviewedAt: Date;
}

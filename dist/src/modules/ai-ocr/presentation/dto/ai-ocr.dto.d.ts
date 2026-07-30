export declare class AiOcrExtractDto {
    imageUrl: string;
}
export declare class AiOcrExtractResponseDto {
    documentId: string;
    extractedData: {
        title: string;
        category: string;
        prescribedBy?: string;
    };
    confidence: number;
}
export declare class AiOcrConfirmDto {
    documentId: string;
    confirmedData: string;
}
export declare class AiOcrConfirmResponseDto {
    success: boolean;
    message: string;
}

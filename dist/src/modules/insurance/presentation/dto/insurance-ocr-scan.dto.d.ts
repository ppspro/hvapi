export declare class InsuranceOcrScanDto {
    imageUrl: string;
}
export declare class InsuranceOcrScanResponseDto {
    ocrId: string;
    extractedData: {
        providerName: string;
        policyNumber: string;
        coverageDetails?: string;
    };
    confidence: number;
}

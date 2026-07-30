export declare class InsurancePolicyEntity {
    id: string;
    patientProfileId: string;
    providerName: string;
    policyNumber: string;
    coverageDetails: string | null;
    createdAt: Date;
    updatedAt: Date;
}
export declare class InsuranceOcrRecordEntity {
    id: string;
    patientProfileId: string;
    imageUrl: string;
    extractedData: string;
    isConfirmed: boolean;
    createdAt: Date;
    updatedAt: Date;
}

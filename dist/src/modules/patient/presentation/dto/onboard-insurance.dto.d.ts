export declare class OnboardInsuranceDto {
    providerName: string;
    policyNumber: string;
    coverageDetails?: string;
    expiryDate: string;
    secondaryProvider?: string;
    secondaryPolicyNumber?: string;
    secondaryCoverage?: string;
}
export declare class OnboardInsuranceResponseDto {
    policyId: string;
    message: string;
    nextStep: number;
}

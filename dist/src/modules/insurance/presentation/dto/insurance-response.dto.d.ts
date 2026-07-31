export declare class InsuranceProviderResponseDto {
    id: string;
    name: string;
    code: string;
    contactEmail?: string;
    contactPhone?: string;
    address?: string;
    networkType: string;
    isActive: boolean;
    createdAt: string;
}
export declare class InsurancePlanResponseDto {
    id: string;
    providerId: string;
    name: string;
    planCode: string;
    planType: string;
    deductibleAmount: number;
    copayAmount: number;
    maxCoverageLimit: number;
    preAuthRequired: boolean;
    waitingPeriodDays: number;
    createdAt: string;
}
export declare class InsuranceBeneficiaryResponseDto {
    id: string;
    policyId: string;
    fullName: string;
    relationship: string;
    dateOfBirth?: string;
    isPrimary: boolean;
    createdAt: string;
}
export declare class InsurancePolicyResponseDto {
    id: string;
    patientProfileId: string;
    providerId?: string;
    planId?: string;
    providerName: string;
    policyNumber: string;
    groupNumber?: string;
    status: string;
    coverageDetails?: string;
    startDate?: string;
    expiryDate?: string;
    verificationStatus: string;
    verifiedBy?: string;
    verifiedAt?: string;
    copayAmount?: number;
    deductibleAmount?: number;
    maxLimit?: number;
    preAuthRequired: boolean;
    secondaryProvider?: string;
    secondaryPolicyNumber?: string;
    secondaryCoverage?: string;
    isDeleted: boolean;
    beneficiaries?: InsuranceBeneficiaryResponseDto[];
    qrToken?: string;
    createdAt: string;
    updatedAt: string;
}
export declare class InsuranceClaimDraftResponseDto {
    id: string;
    policyId: string;
    patientProfileId: string;
    claimNumber: string;
    status: string;
    totalAmount: number;
    diagnosisCodes: string[];
    treatmentDate?: string;
    notes?: string;
    attachedRecordIds: string[];
    attachedReportIds: string[];
    createdAt: string;
}
export declare class InsuranceStatsResponseDto {
    totalPolicies: number;
    activePolicies: number;
    verifiedPolicies: number;
    totalClaimDrafts: number;
    totalProviders: number;
}

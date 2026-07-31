export declare enum InsurancePolicyStatus {
    DRAFT = "DRAFT",
    ACTIVE = "ACTIVE",
    SUSPENDED = "SUSPENDED",
    EXPIRED = "EXPIRED",
    CANCELLED = "CANCELLED",
    ARCHIVED = "ARCHIVED"
}
export declare class CreateProviderDto {
    name: string;
    code: string;
    contactEmail?: string;
    contactPhone?: string;
    address?: string;
    networkType?: string;
}
export declare class CreatePlanDto {
    providerId: string;
    name: string;
    planCode: string;
    planType?: string;
    deductibleAmount?: number;
    copayAmount?: number;
    maxCoverageLimit?: number;
    preAuthRequired?: boolean;
    waitingPeriodDays?: number;
}
export declare class CreateBeneficiaryDto {
    fullName: string;
    relationship: string;
    dateOfBirth?: string;
    isPrimary?: boolean;
}
export declare class CreateFullPolicyDto {
    providerName: string;
    providerId?: string;
    planId?: string;
    policyNumber: string;
    groupNumber?: string;
    status?: InsurancePolicyStatus;
    coverageDetails?: string;
    startDate?: string;
    expiryDate?: string;
    copayAmount?: number;
    deductibleAmount?: number;
    maxLimit?: number;
    preAuthRequired?: boolean;
    beneficiaries?: CreateBeneficiaryDto[];
}
export declare class PolicyActionDto {
    reason?: string;
}
export declare class CreateClaimDraftDto {
    policyId: string;
    totalAmount: number;
    diagnosisCodes?: string[];
    treatmentDate?: string;
    notes?: string;
    attachedRecordIds?: string[];
    attachedReportIds?: string[];
}

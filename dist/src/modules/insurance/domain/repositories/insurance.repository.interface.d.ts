import { InsuranceProviderEntity, InsurancePlanEntity, InsurancePolicyEntity, InsuranceClaimDraftEntity, InsuranceHistoryEntity, InsuranceAuditLogEntity } from '../entities/insurance.entity';
export interface IInsuranceRepository {
    findProfileByUserId(userId: string): Promise<{
        id: string;
    } | null>;
    createProvider(data: any): Promise<InsuranceProviderEntity>;
    findProviders(): Promise<InsuranceProviderEntity[]>;
    createPlan(data: any): Promise<InsurancePlanEntity>;
    findPlans(providerId?: string): Promise<InsurancePlanEntity[]>;
    createPolicy(patientProfileId: string, providerName: string, policyNumber: string, coverageDetails?: string): Promise<InsurancePolicyEntity>;
    createFullPolicy(data: any): Promise<InsurancePolicyEntity>;
    findPolicyById(id: string, includeDeleted?: boolean): Promise<InsurancePolicyEntity | null>;
    findPolicyByProfileId(patientProfileId: string, includeDeleted?: boolean): Promise<InsurancePolicyEntity | null>;
    findPoliciesByProfile(patientProfileId: string, includeDeleted?: boolean): Promise<InsurancePolicyEntity[]>;
    updatePolicy(id: string, providerName: string, policyNumber: string, coverageDetails?: string): Promise<InsurancePolicyEntity>;
    updatePolicyDetails(id: string, data: any): Promise<InsurancePolicyEntity>;
    softDeletePolicy(id: string): Promise<void>;
    searchPolicies(query: string): Promise<InsurancePolicyEntity[]>;
    createClaimDraft(data: any): Promise<InsuranceClaimDraftEntity>;
    findClaimDraftsByProfile(patientProfileId: string): Promise<InsuranceClaimDraftEntity[]>;
    createHistory(policyId: string, data: {
        action: string;
        previousStatus?: string;
        newStatus: string;
        reason?: string;
        performedBy?: string;
    }): Promise<InsuranceHistoryEntity>;
    createAuditLog(data: {
        policyId: string;
        action: string;
        performedBy?: string;
        details?: string;
    }): Promise<InsuranceAuditLogEntity>;
    saveOcrRecord(patientProfileId: string, imageUrl: string, extractedData: string): Promise<any>;
    findOcrRecordById(id: string): Promise<any>;
    getStatistics(): Promise<{
        totalPolicies: number;
        activePolicies: number;
        verifiedPolicies: number;
        totalClaimDrafts: number;
        totalProviders: number;
    }>;
}

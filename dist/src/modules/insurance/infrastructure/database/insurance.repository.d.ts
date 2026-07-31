import { DatabaseService } from "../../../../database/database.service";
import { IInsuranceRepository } from '../../domain/repositories/insurance.repository.interface';
import { InsuranceProviderEntity, InsurancePlanEntity, InsurancePolicyEntity, InsuranceClaimDraftEntity, InsuranceHistoryEntity, InsuranceAuditLogEntity } from '../../domain/entities/insurance.entity';
export declare class InsuranceRepository implements IInsuranceRepository {
    private readonly db;
    constructor(db: DatabaseService);
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
    saveOcrRecord(patientProfileId: string, imageUrl: string, extractedData: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        patientProfileId: string;
        imageUrl: string;
        extractedData: string;
        isConfirmed: boolean;
    }>;
    findOcrRecordById(id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        patientProfileId: string;
        imageUrl: string;
        extractedData: string;
        isConfirmed: boolean;
    } | null>;
    getStatistics(): Promise<{
        totalPolicies: number;
        activePolicies: number;
        verifiedPolicies: number;
        totalClaimDrafts: number;
        totalProviders: number;
    }>;
}

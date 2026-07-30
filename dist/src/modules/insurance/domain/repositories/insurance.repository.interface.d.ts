import { InsurancePolicyEntity, InsuranceOcrRecordEntity } from '../entities/insurance.entity';
export interface IInsuranceRepository {
    findProfileByUserId(userId: string): Promise<{
        id: string;
    } | null>;
    findPolicyByProfileId(profileId: string): Promise<InsurancePolicyEntity | null>;
    createPolicy(profileId: string, providerName: string, policyNumber: string, coverageDetails?: string): Promise<InsurancePolicyEntity>;
    updatePolicy(policyId: string, providerName: string, policyNumber: string, coverageDetails?: string): Promise<InsurancePolicyEntity>;
    createOcrRecord(profileId: string, imageUrl: string, extractedData: string): Promise<InsuranceOcrRecordEntity>;
    findOcrRecordById(ocrId: string): Promise<InsuranceOcrRecordEntity | null>;
    confirmOcrRecord(ocrId: string): Promise<void>;
}

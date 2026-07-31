import { Injectable } from '@nestjs/common';
import { DatabaseService } from '@database/database.service';
import { IInsuranceRepository } from '../../domain/repositories/insurance.repository.interface';
import {
  InsuranceProviderEntity,
  InsurancePlanEntity,
  InsurancePolicyEntity,
  InsuranceClaimDraftEntity,
  InsuranceHistoryEntity,
  InsuranceAuditLogEntity,
} from '../../domain/entities/insurance.entity';

@Injectable()
export class InsuranceRepository implements IInsuranceRepository {
  constructor(private readonly db: DatabaseService) {}

  async findProfileByUserId(userId: string): Promise<{ id: string } | null> {
    return this.db.patientProfile.findUnique({ where: { userId }, select: { id: true } });
  }

  async createProvider(data: any): Promise<InsuranceProviderEntity> {
    return (await this.db.insuranceProvider.create({
      data: {
        name: data.name,
        code: data.code,
        contactEmail: data.contactEmail || null,
        contactPhone: data.contactPhone || null,
        address: data.address || null,
        networkType: data.networkType || 'PPO',
        isActive: data.isActive ?? true,
      },
    })) as unknown as InsuranceProviderEntity;
  }

  async findProviders(): Promise<InsuranceProviderEntity[]> {
    return (await this.db.insuranceProvider.findMany({
      where: { isActive: true },
      orderBy: { name: 'asc' },
    })) as unknown as InsuranceProviderEntity[];
  }

  async createPlan(data: any): Promise<InsurancePlanEntity> {
    return (await this.db.insurancePlan.create({
      data: {
        providerId: data.providerId,
        name: data.name,
        planCode: data.planCode,
        planType: data.planType || 'COMPREHENSIVE',
        deductibleAmount: data.deductibleAmount || 0,
        copayAmount: data.copayAmount || 0,
        maxCoverageLimit: data.maxCoverageLimit || 100000,
        preAuthRequired: data.preAuthRequired ?? false,
        waitingPeriodDays: data.waitingPeriodDays || 0,
      },
    })) as unknown as InsurancePlanEntity;
  }

  async findPlans(providerId?: string): Promise<InsurancePlanEntity[]> {
    return (await this.db.insurancePlan.findMany({
      where: providerId ? { providerId } : {},
      orderBy: { name: 'asc' },
    })) as unknown as InsurancePlanEntity[];
  }

  async createPolicy(patientProfileId: string, providerName: string, policyNumber: string, coverageDetails?: string): Promise<InsurancePolicyEntity> {
    const policy = await this.db.insurancePolicy.create({
      data: {
        patientProfileId,
        providerName,
        policyNumber,
        coverageDetails: coverageDetails || null,
        status: 'ACTIVE',
      },
      include: { beneficiaries: true, claimDrafts: true, history: true },
    });

    await this.createHistory(policy.id, {
      action: 'CREATED',
      newStatus: 'ACTIVE',
      reason: 'Initial policy creation during onboarding',
    });

    return policy as unknown as InsurancePolicyEntity;
  }

  async createFullPolicy(data: any): Promise<InsurancePolicyEntity> {
    const policy = await this.db.insurancePolicy.create({
      data: {
        patientProfileId: data.patientProfileId,
        providerId: data.providerId || null,
        planId: data.planId || null,
        providerName: data.providerName,
        policyNumber: data.policyNumber,
        groupNumber: data.groupNumber || null,
        status: data.status || 'ACTIVE',
        coverageDetails: data.coverageDetails || null,
        startDate: data.startDate ? new Date(data.startDate) : new Date(),
        expiryDate: data.expiryDate ? new Date(data.expiryDate) : null,
        copayAmount: data.copayAmount || null,
        deductibleAmount: data.deductibleAmount || null,
        maxLimit: data.maxLimit || null,
        preAuthRequired: data.preAuthRequired ?? false,
        secondaryProvider: data.secondaryProvider || null,
        secondaryPolicyNumber: data.secondaryPolicyNumber || null,
        secondaryCoverage: data.secondaryCoverage || null,
        beneficiaries: data.beneficiaries ? {
          create: data.beneficiaries.map((b: any) => ({
            fullName: b.fullName,
            relationship: b.relationship,
            dateOfBirth: b.dateOfBirth ? new Date(b.dateOfBirth) : null,
            isPrimary: b.isPrimary ?? false,
          })),
        } : undefined,
      },
      include: { beneficiaries: true, claimDrafts: true, history: true },
    });

    await this.createHistory(policy.id, {
      action: 'CREATED',
      newStatus: policy.status,
      reason: 'Created full policy',
      performedBy: data.createdById,
    });

    return policy as unknown as InsurancePolicyEntity;
  }

  async findPolicyById(id: string, includeDeleted = false): Promise<InsurancePolicyEntity | null> {
    return (await this.db.insurancePolicy.findFirst({
      where: { id, ...(includeDeleted ? {} : { isDeleted: false }) },
      include: { beneficiaries: true, claimDrafts: true, history: { orderBy: { createdAt: 'desc' } } },
    })) as unknown as InsurancePolicyEntity | null;
  }

  async findPolicyByProfileId(patientProfileId: string, includeDeleted = false): Promise<InsurancePolicyEntity | null> {
    return (await this.db.insurancePolicy.findFirst({
      where: { patientProfileId, ...(includeDeleted ? {} : { isDeleted: false }) },
      include: { beneficiaries: true, claimDrafts: true, history: { orderBy: { createdAt: 'desc' } } },
    })) as unknown as InsurancePolicyEntity | null;
  }

  async findPoliciesByProfile(patientProfileId: string, includeDeleted = false): Promise<InsurancePolicyEntity[]> {
    return (await this.db.insurancePolicy.findMany({
      where: { patientProfileId, ...(includeDeleted ? {} : { isDeleted: false }) },
      include: { beneficiaries: true, claimDrafts: true, history: { orderBy: { createdAt: 'desc' } } },
      orderBy: { createdAt: 'desc' },
    })) as unknown as InsurancePolicyEntity[];
  }

  async updatePolicy(id: string, providerName: string, policyNumber: string, coverageDetails?: string): Promise<InsurancePolicyEntity> {
    return (await this.db.insurancePolicy.update({
      where: { id },
      data: {
        providerName,
        policyNumber,
        coverageDetails: coverageDetails || undefined,
      },
      include: { beneficiaries: true, claimDrafts: true, history: { orderBy: { createdAt: 'desc' } } },
    })) as unknown as InsurancePolicyEntity;
  }

  async updatePolicyDetails(id: string, data: any): Promise<InsurancePolicyEntity> {
    return (await this.db.insurancePolicy.update({
      where: { id },
      data: {
        providerName: data.providerName || undefined,
        policyNumber: data.policyNumber || undefined,
        groupNumber: data.groupNumber || undefined,
        status: data.status as any || undefined,
        coverageDetails: data.coverageDetails || undefined,
        startDate: data.startDate ? new Date(data.startDate) : undefined,
        expiryDate: data.expiryDate ? new Date(data.expiryDate) : undefined,
        verificationStatus: data.verificationStatus || undefined,
        verifiedBy: data.verifiedBy || undefined,
        verifiedAt: data.verifiedAt ? new Date(data.verifiedAt) : undefined,
        copayAmount: data.copayAmount ?? undefined,
        deductibleAmount: data.deductibleAmount ?? undefined,
        maxLimit: data.maxLimit ?? undefined,
        preAuthRequired: data.preAuthRequired ?? undefined,
        secondaryProvider: data.secondaryProvider || undefined,
        secondaryPolicyNumber: data.secondaryPolicyNumber || undefined,
        secondaryCoverage: data.secondaryCoverage || undefined,
        isDeleted: data.isDeleted ?? undefined,
        deletedAt: data.deletedAt || undefined,
      },
      include: { beneficiaries: true, claimDrafts: true, history: { orderBy: { createdAt: 'desc' } } },
    })) as unknown as InsurancePolicyEntity;
  }

  async softDeletePolicy(id: string): Promise<void> {
    await this.db.insurancePolicy.update({
      where: { id },
      data: { isDeleted: true, deletedAt: new Date() },
    });
  }

  async searchPolicies(query: string): Promise<InsurancePolicyEntity[]> {
    const q = query.toLowerCase();
    return (await this.db.insurancePolicy.findMany({
      where: {
        isDeleted: false,
        OR: [
          { providerName: { contains: q, mode: 'insensitive' } },
          { policyNumber: { contains: q, mode: 'insensitive' } },
          { groupNumber: { contains: q, mode: 'insensitive' } },
        ],
      },
      include: { beneficiaries: true, claimDrafts: true, history: true },
      orderBy: { createdAt: 'desc' },
    })) as unknown as InsurancePolicyEntity[];
  }

  async createClaimDraft(data: any): Promise<InsuranceClaimDraftEntity> {
    const claimNumber = `CLM-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    return (await this.db.insuranceClaimDraft.create({
      data: {
        policyId: data.policyId,
        patientProfileId: data.patientProfileId,
        claimNumber,
        status: 'DRAFT',
        totalAmount: data.totalAmount,
        diagnosisCodes: data.diagnosisCodes || [],
        treatmentDate: data.treatmentDate ? new Date(data.treatmentDate) : new Date(),
        notes: data.notes || null,
        attachedRecordIds: data.attachedRecordIds || [],
        attachedReportIds: data.attachedReportIds || [],
        createdById: data.createdById || null,
      },
    })) as unknown as InsuranceClaimDraftEntity;
  }

  async findClaimDraftsByProfile(patientProfileId: string): Promise<InsuranceClaimDraftEntity[]> {
    return (await this.db.insuranceClaimDraft.findMany({
      where: { patientProfileId },
      orderBy: { createdAt: 'desc' },
    })) as unknown as InsuranceClaimDraftEntity[];
  }

  async createHistory(policyId: string, data: {
    action: string;
    previousStatus?: string;
    newStatus: string;
    reason?: string;
    performedBy?: string;
  }): Promise<InsuranceHistoryEntity> {
    return (await this.db.insuranceHistory.create({
      data: {
        policyId,
        action: data.action,
        previousStatus: data.previousStatus || null,
        newStatus: data.newStatus,
        reason: data.reason || null,
        performedBy: data.performedBy || null,
      },
    })) as unknown as InsuranceHistoryEntity;
  }

  async createAuditLog(data: {
    policyId: string;
    action: string;
    performedBy?: string;
    details?: string;
  }): Promise<InsuranceAuditLogEntity> {
    return (await this.db.insuranceAuditLog.create({
      data: {
        policyId: data.policyId,
        action: data.action,
        performedBy: data.performedBy || null,
        details: data.details || null,
      },
    })) as unknown as InsuranceAuditLogEntity;
  }

  async saveOcrRecord(patientProfileId: string, imageUrl: string, extractedData: string) {
    return this.db.insuranceOcrRecord.create({
      data: { patientProfileId, imageUrl, extractedData, isConfirmed: false },
    });
  }

  async findOcrRecordById(id: string) {
    return this.db.insuranceOcrRecord.findUnique({ where: { id } });
  }

  async getStatistics() {
    const totalPolicies = await this.db.insurancePolicy.count({ where: { isDeleted: false } });
    const activePolicies = await this.db.insurancePolicy.count({ where: { status: 'ACTIVE', isDeleted: false } });
    const verifiedPolicies = await this.db.insurancePolicy.count({ where: { verificationStatus: 'VERIFIED', isDeleted: false } });
    const totalClaimDrafts = await this.db.insuranceClaimDraft.count();
    const totalProviders = await this.db.insuranceProvider.count({ where: { isActive: true } });

    return {
      totalPolicies,
      activePolicies,
      verifiedPolicies,
      totalClaimDrafts,
      totalProviders,
    };
  }
}

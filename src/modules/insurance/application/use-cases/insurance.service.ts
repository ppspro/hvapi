import { Injectable, NotFoundException, BadRequestException, ForbiddenException, Inject } from '@nestjs/common';
import { IInsuranceRepository } from '../../domain/repositories/insurance.repository.interface';
import { OnboardInsuranceDto, OnboardInsuranceResponseDto } from '../../presentation/dto/onboard-insurance.dto';
import { InsuranceOcrScanDto, InsuranceOcrScanResponseDto } from '../../presentation/dto/insurance-ocr-scan.dto';
import { InsuranceOcrConfirmDto, InsuranceOcrConfirmResponseDto } from '../../presentation/dto/insurance-ocr-confirm.dto';
import {
  CreateProviderDto, CreatePlanDto, CreateFullPolicyDto, PolicyActionDto, CreateClaimDraftDto,
} from '../../presentation/dto/create-provider.dto';
import {
  InsuranceProviderResponseDto, InsurancePlanResponseDto, InsurancePolicyResponseDto,
  InsuranceClaimDraftResponseDto, InsuranceStatsResponseDto,
} from '../../presentation/dto/insurance-response.dto';
import { QrService } from '@modules/qr/application/use-cases/qr.service';
import { QrEntityType } from '@modules/qr/presentation/dto/generate-qr.dto';
import { Logger } from 'nestjs-pino';

@Injectable()
export class InsuranceService {
  constructor(
    @Inject('IInsuranceRepository')
    private readonly repository: IInsuranceRepository,
    private readonly qrService: QrService,
    private readonly logger: Logger,
  ) {}

  private async resolveProfile(userId: string): Promise<string> {
    const profile = await this.repository.findProfileByUserId(userId);
    if (!profile) {
      throw new NotFoundException('Patient profile not found. Complete demographics onboarding first.');
    }
    return profile.id;
  }

  private mapPolicy(p: any): InsurancePolicyResponseDto {
    return {
      id: p.id,
      patientProfileId: p.patientProfileId,
      providerId: p.providerId || undefined,
      planId: p.planId || undefined,
      providerName: p.providerName,
      policyNumber: p.policyNumber,
      groupNumber: p.groupNumber || undefined,
      status: p.status,
      coverageDetails: p.coverageDetails || undefined,
      startDate: p.startDate ? new Date(p.startDate).toISOString().split('T')[0] : undefined,
      expiryDate: p.expiryDate ? new Date(p.expiryDate).toISOString().split('T')[0] : undefined,
      verificationStatus: p.verificationStatus,
      verifiedBy: p.verifiedBy || undefined,
      verifiedAt: p.verifiedAt?.toISOString() || undefined,
      copayAmount: p.copayAmount ?? undefined,
      deductibleAmount: p.deductibleAmount ?? undefined,
      maxLimit: p.maxLimit ?? undefined,
      preAuthRequired: p.preAuthRequired ?? false,
      secondaryProvider: p.secondaryProvider || undefined,
      secondaryPolicyNumber: p.secondaryPolicyNumber || undefined,
      secondaryCoverage: p.secondaryCoverage || undefined,
      isDeleted: p.isDeleted,
      beneficiaries: p.beneficiaries?.map((b: any) => ({
        id: b.id,
        policyId: b.policyId,
        fullName: b.fullName,
        relationship: b.relationship,
        dateOfBirth: b.dateOfBirth ? new Date(b.dateOfBirth).toISOString().split('T')[0] : undefined,
        isPrimary: b.isPrimary,
        createdAt: b.createdAt.toISOString(),
      })) || [],
      createdAt: p.createdAt.toISOString(),
      updatedAt: p.updatedAt.toISOString(),
    };
  }

  private mapClaim(c: any): InsuranceClaimDraftResponseDto {
    return {
      id: c.id,
      policyId: c.policyId,
      patientProfileId: c.patientProfileId,
      claimNumber: c.claimNumber,
      status: c.status,
      totalAmount: c.totalAmount,
      diagnosisCodes: c.diagnosisCodes || [],
      treatmentDate: c.treatmentDate ? new Date(c.treatmentDate).toISOString().split('T')[0] : undefined,
      notes: c.notes || undefined,
      attachedRecordIds: c.attachedRecordIds || [],
      attachedReportIds: c.attachedReportIds || [],
      createdAt: c.createdAt.toISOString(),
    };
  }

  // ─── Patient Onboarding Hook (Step 4 Backward Compatibility) ─────────────

  async onboardInsurance(userId: string, dto: OnboardInsuranceDto): Promise<OnboardInsuranceResponseDto> {
    const profileId = await this.resolveProfile(userId);
    let policy = await this.repository.findPolicyByProfileId(profileId);

    if (!policy) {
      policy = await this.repository.createPolicy(profileId, dto.providerName, dto.policyNumber, dto.coverageDetails);
      this.logger.log({ msg: 'New insurance policy created during onboarding', policyId: policy.id });
    } else {
      policy = await this.repository.updatePolicy(policy.id, dto.providerName, dto.policyNumber, dto.coverageDetails);
      this.logger.log({ msg: 'Insurance policy updated during onboarding', policyId: policy.id });
    }

    return {
      policyId: policy.id,
      message: 'Insurance onboarding completed successfully',
      nextStep: 5,
    };
  }

  // ─── Provider & Plan Management ──────────────────────────────────────────

  async createProvider(dto: CreateProviderDto): Promise<InsuranceProviderResponseDto> {
    const provider = await this.repository.createProvider(dto);
    return {
      id: provider.id,
      name: provider.name,
      code: provider.code,
      contactEmail: provider.contactEmail || undefined,
      contactPhone: provider.contactPhone || undefined,
      address: provider.address || undefined,
      networkType: provider.networkType,
      isActive: provider.isActive,
      createdAt: provider.createdAt.toISOString(),
    };
  }

  async getProviders(): Promise<InsuranceProviderResponseDto[]> {
    const providers = await this.repository.findProviders();
    return providers.map((p) => ({
      id: p.id,
      name: p.name,
      code: p.code,
      contactEmail: p.contactEmail || undefined,
      contactPhone: p.contactPhone || undefined,
      address: p.address || undefined,
      networkType: p.networkType,
      isActive: p.isActive,
      createdAt: p.createdAt.toISOString(),
    }));
  }

  async createPlan(dto: CreatePlanDto): Promise<InsurancePlanResponseDto> {
    const plan = await this.repository.createPlan(dto);
    return {
      id: plan.id,
      providerId: plan.providerId,
      name: plan.name,
      planCode: plan.planCode,
      planType: plan.planType,
      deductibleAmount: plan.deductibleAmount,
      copayAmount: plan.copayAmount,
      maxCoverageLimit: plan.maxCoverageLimit,
      preAuthRequired: plan.preAuthRequired,
      waitingPeriodDays: plan.waitingPeriodDays,
      createdAt: plan.createdAt.toISOString(),
    };
  }

  async getPlans(providerId?: string): Promise<InsurancePlanResponseDto[]> {
    const plans = await this.repository.findPlans(providerId);
    return plans.map((p) => ({
      id: p.id,
      providerId: p.providerId,
      name: p.name,
      planCode: p.planCode,
      planType: p.planType,
      deductibleAmount: p.deductibleAmount,
      copayAmount: p.copayAmount,
      maxCoverageLimit: p.maxCoverageLimit,
      preAuthRequired: p.preAuthRequired,
      waitingPeriodDays: p.waitingPeriodDays,
      createdAt: p.createdAt.toISOString(),
    }));
  }

  // ─── Policy Lifecycle ─────────────────────────────────────────────────────

  async createFullPolicy(userId: string, dto: CreateFullPolicyDto): Promise<InsurancePolicyResponseDto> {
    const profileId = await this.resolveProfile(userId);

    const policy = await this.repository.createFullPolicy({
      ...dto,
      patientProfileId: profileId,
      createdById: userId,
    });

    // Request QR token generation from Enterprise QR Subsystem
    try {
      const qr = await this.qrService.generateQr(userId, {
        entityId: policy.id,
        entityType: QrEntityType.INSURANCE,
      });
      (policy as any).qrToken = qr.token;
    } catch (err) {
      this.logger.warn({ msg: 'QR generation skipped for insurance policy', err });
    }

    await this.repository.createAuditLog({
      policyId: policy.id,
      action: 'CREATED',
      performedBy: userId,
      details: `Issued policy ${policy.policyNumber} with ${policy.providerName}`,
    });

    return this.mapPolicy(policy);
  }

  async getPolicies(userId: string): Promise<InsurancePolicyResponseDto[]> {
    const profileId = await this.resolveProfile(userId);
    const policies = await this.repository.findPoliciesByProfile(profileId);
    return policies.map((p) => this.mapPolicy(p));
  }

  async getPolicyById(userId: string, policyId: string): Promise<InsurancePolicyResponseDto> {
    const profileId = await this.resolveProfile(userId);
    const policy = await this.repository.findPolicyById(policyId);

    if (!policy) throw new NotFoundException('Insurance policy not found');
    if (policy.patientProfileId !== profileId) throw new ForbiddenException('Access denied');

    return this.mapPolicy(policy);
  }

  async updatePolicyDetails(userId: string, policyId: string, dto: Partial<CreateFullPolicyDto>): Promise<InsurancePolicyResponseDto> {
    const profileId = await this.resolveProfile(userId);
    const policy = await this.repository.findPolicyById(policyId);

    if (!policy) throw new NotFoundException('Insurance policy not found');
    if (policy.patientProfileId !== profileId) throw new ForbiddenException('Access denied');
    if (policy.status === 'ARCHIVED') {
      throw new BadRequestException('Archived policies cannot be updated. Restore it first.');
    }

    const updated = await this.repository.updatePolicyDetails(policyId, dto);

    await this.repository.createAuditLog({
      policyId,
      action: 'UPDATED',
      performedBy: userId,
      details: 'Updated insurance policy parameters',
    });

    return this.mapPolicy(updated);
  }

  async activatePolicy(userId: string, policyId: string, dto: PolicyActionDto): Promise<InsurancePolicyResponseDto> {
    const profileId = await this.resolveProfile(userId);
    const policy = await this.repository.findPolicyById(policyId);

    if (!policy) throw new NotFoundException('Insurance policy not found');
    if (policy.patientProfileId !== profileId) throw new ForbiddenException('Access denied');

    const prevStatus = policy.status;
    const updated = await this.repository.updatePolicyDetails(policyId, { status: 'ACTIVE' });

    await this.repository.createHistory(policyId, {
      action: 'ACTIVATED',
      previousStatus: prevStatus,
      newStatus: 'ACTIVE',
      reason: dto.reason || 'Policy activated',
      performedBy: userId,
    });

    return this.mapPolicy(updated);
  }

  async renewPolicy(userId: string, policyId: string, dto: PolicyActionDto): Promise<InsurancePolicyResponseDto> {
    const profileId = await this.resolveProfile(userId);
    const policy = await this.repository.findPolicyById(policyId);

    if (!policy) throw new NotFoundException('Insurance policy not found');
    if (policy.patientProfileId !== profileId) throw new ForbiddenException('Access denied');

    const newExpiry = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000); // 1 year extension
    const prevStatus = policy.status;
    const updated = await this.repository.updatePolicyDetails(policyId, {
      status: 'ACTIVE',
      expiryDate: newExpiry,
    });

    await this.repository.createHistory(policyId, {
      action: 'RENEWED',
      previousStatus: prevStatus,
      newStatus: 'ACTIVE',
      reason: dto.reason || 'Policy renewed for 1 year',
      performedBy: userId,
    });

    return this.mapPolicy(updated);
  }

  async suspendPolicy(userId: string, policyId: string, dto: PolicyActionDto): Promise<InsurancePolicyResponseDto> {
    const profileId = await this.resolveProfile(userId);
    const policy = await this.repository.findPolicyById(policyId);

    if (!policy) throw new NotFoundException('Insurance policy not found');
    if (policy.patientProfileId !== profileId) throw new ForbiddenException('Access denied');

    const prevStatus = policy.status;
    const updated = await this.repository.updatePolicyDetails(policyId, { status: 'SUSPENDED' });

    await this.repository.createHistory(policyId, {
      action: 'SUSPENDED',
      previousStatus: prevStatus,
      newStatus: 'SUSPENDED',
      reason: dto.reason || 'Policy suspended',
      performedBy: userId,
    });

    return this.mapPolicy(updated);
  }

  async cancelPolicy(userId: string, policyId: string, dto: PolicyActionDto): Promise<InsurancePolicyResponseDto> {
    const profileId = await this.resolveProfile(userId);
    const policy = await this.repository.findPolicyById(policyId);

    if (!policy) throw new NotFoundException('Insurance policy not found');
    if (policy.patientProfileId !== profileId) throw new ForbiddenException('Access denied');

    const prevStatus = policy.status;
    const updated = await this.repository.updatePolicyDetails(policyId, { status: 'CANCELLED' });

    await this.repository.createHistory(policyId, {
      action: 'CANCELLED',
      previousStatus: prevStatus,
      newStatus: 'CANCELLED',
      reason: dto.reason || 'Policy cancelled',
      performedBy: userId,
    });

    return this.mapPolicy(updated);
  }

  async archivePolicy(userId: string, policyId: string, dto: PolicyActionDto): Promise<InsurancePolicyResponseDto> {
    const profileId = await this.resolveProfile(userId);
    const policy = await this.repository.findPolicyById(policyId);

    if (!policy) throw new NotFoundException('Insurance policy not found');
    if (policy.patientProfileId !== profileId) throw new ForbiddenException('Access denied');

    const prevStatus = policy.status;
    const updated = await this.repository.updatePolicyDetails(policyId, { status: 'ARCHIVED' });

    await this.repository.createHistory(policyId, {
      action: 'ARCHIVED',
      previousStatus: prevStatus,
      newStatus: 'ARCHIVED',
      reason: dto.reason || 'Policy archived',
      performedBy: userId,
    });

    return this.mapPolicy(updated);
  }

  async restorePolicy(userId: string, policyId: string, dto: PolicyActionDto): Promise<InsurancePolicyResponseDto> {
    const profileId = await this.resolveProfile(userId);
    const policy = await this.repository.findPolicyById(policyId, true);

    if (!policy) throw new NotFoundException('Insurance policy not found');
    if (policy.patientProfileId !== profileId) throw new ForbiddenException('Access denied');

    const prevStatus = policy.status;
    const updated = await this.repository.updatePolicyDetails(policyId, {
      status: 'ACTIVE',
      isDeleted: false,
      deletedAt: null,
    });

    await this.repository.createHistory(policyId, {
      action: 'RESTORED',
      previousStatus: prevStatus,
      newStatus: 'ACTIVE',
      reason: dto.reason || 'Policy restored',
      performedBy: userId,
    });

    return this.mapPolicy(updated);
  }

  async verifyPolicy(userId: string, policyId: string): Promise<InsurancePolicyResponseDto> {
    const profileId = await this.resolveProfile(userId);
    const policy = await this.repository.findPolicyById(policyId);

    if (!policy) throw new NotFoundException('Insurance policy not found');
    if (policy.patientProfileId !== profileId) throw new ForbiddenException('Access denied');

    const updated = await this.repository.updatePolicyDetails(policyId, {
      verificationStatus: 'VERIFIED',
      verifiedBy: userId,
      verifiedAt: new Date(),
    });

    await this.repository.createAuditLog({
      policyId,
      action: 'VERIFIED',
      performedBy: userId,
      details: 'Policy coverage verified',
    });

    return this.mapPolicy(updated);
  }

  // ─── Claim Draft Preparation ─────────────────────────────────────────────

  async createClaimDraft(userId: string, dto: CreateClaimDraftDto): Promise<InsuranceClaimDraftResponseDto> {
    const profileId = await this.resolveProfile(userId);
    const policy = await this.repository.findPolicyById(dto.policyId);

    if (!policy) throw new NotFoundException('Insurance policy not found');
    if (policy.patientProfileId !== profileId) throw new ForbiddenException('Access denied');

    const claim = await this.repository.createClaimDraft({
      ...dto,
      patientProfileId: profileId,
      createdById: userId,
    });

    await this.repository.createAuditLog({
      policyId: policy.id,
      action: 'CLAIM_DRAFT_CREATED',
      performedBy: userId,
      details: `Created claim draft ${claim.claimNumber} for amount $${dto.totalAmount}`,
    });

    return this.mapClaim(claim);
  }

  async getClaimDrafts(userId: string): Promise<InsuranceClaimDraftResponseDto[]> {
    const profileId = await this.resolveProfile(userId);
    const claims = await this.repository.findClaimDraftsByProfile(profileId);
    return claims.map((c) => this.mapClaim(c));
  }

  // ─── Search & Statistics ──────────────────────────────────────────────────

  async searchPolicies(query: string): Promise<InsurancePolicyResponseDto[]> {
    if (!query || query.trim().length === 0) return [];
    const policies = await this.repository.searchPolicies(query.trim());
    return policies.map((p) => this.mapPolicy(p));
  }

  async getStatistics(): Promise<InsuranceStatsResponseDto> {
    return this.repository.getStatistics();
  }

  // ─── OCR Scanning Operations (Step 4 OCR Hook) ──────────────────────────

  async scanInsuranceCard(userId: string, dto: InsuranceOcrScanDto): Promise<InsuranceOcrScanResponseDto> {
    const profileId = await this.resolveProfile(userId);

    const mockExtracted = {
      providerName: 'Blue Shield OCR Candidate',
      policyNumber: 'POL987654321',
      coverageDetails: 'Co-pay $20 (Extracted)',
    };

    const record = await this.repository.saveOcrRecord(profileId, dto.imageUrl, JSON.stringify(mockExtracted));

    return {
      ocrId: record.id,
      extractedData: mockExtracted,
      confidence: 0.95,
    };
  }

  async confirmOcrScan(userId: string, dto: InsuranceOcrConfirmDto): Promise<InsuranceOcrConfirmResponseDto> {
    const profileId = await this.resolveProfile(userId);
    const ocrRecord = await this.repository.findOcrRecordById(dto.ocrId);

    if (!ocrRecord) {
      throw new NotFoundException('OCR record not found');
    }

    const policy = await this.repository.createPolicy(
      profileId,
      dto.confirmedData.providerName,
      dto.confirmedData.policyNumber,
      dto.confirmedData.coverageDetails,
    );

    return {
      policyId: policy.id,
      message: 'Insurance OCR data confirmed and policy saved',
    };
  }

}

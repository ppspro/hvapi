"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InsuranceService = void 0;
const common_1 = require("@nestjs/common");
const qr_service_1 = require("../../../qr/application/use-cases/qr.service");
const generate_qr_dto_1 = require("../../../qr/presentation/dto/generate-qr.dto");
const nestjs_pino_1 = require("nestjs-pino");
let InsuranceService = class InsuranceService {
    constructor(repository, qrService, logger) {
        this.repository = repository;
        this.qrService = qrService;
        this.logger = logger;
    }
    async resolveProfile(userId) {
        const profile = await this.repository.findProfileByUserId(userId);
        if (!profile) {
            throw new common_1.NotFoundException('Patient profile not found. Complete demographics onboarding first.');
        }
        return profile.id;
    }
    mapPolicy(p) {
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
            beneficiaries: p.beneficiaries?.map((b) => ({
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
    mapClaim(c) {
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
    async onboardInsurance(userId, dto) {
        const profileId = await this.resolveProfile(userId);
        let policy = await this.repository.findPolicyByProfileId(profileId);
        if (!policy) {
            policy = await this.repository.createPolicy(profileId, dto.providerName, dto.policyNumber, dto.coverageDetails);
            this.logger.log({ msg: 'New insurance policy created during onboarding', policyId: policy.id });
        }
        else {
            policy = await this.repository.updatePolicy(policy.id, dto.providerName, dto.policyNumber, dto.coverageDetails);
            this.logger.log({ msg: 'Insurance policy updated during onboarding', policyId: policy.id });
        }
        return {
            policyId: policy.id,
            message: 'Insurance onboarding completed successfully',
            nextStep: 5,
        };
    }
    async createProvider(dto) {
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
    async getProviders() {
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
    async createPlan(dto) {
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
    async getPlans(providerId) {
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
    async createFullPolicy(userId, dto) {
        const profileId = await this.resolveProfile(userId);
        const policy = await this.repository.createFullPolicy({
            ...dto,
            patientProfileId: profileId,
            createdById: userId,
        });
        try {
            const qr = await this.qrService.generateQr(userId, {
                entityId: policy.id,
                entityType: generate_qr_dto_1.QrEntityType.INSURANCE,
            });
            policy.qrToken = qr.token;
        }
        catch (err) {
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
    async getPolicies(userId) {
        const profileId = await this.resolveProfile(userId);
        const policies = await this.repository.findPoliciesByProfile(profileId);
        return policies.map((p) => this.mapPolicy(p));
    }
    async getPolicyById(userId, policyId) {
        const profileId = await this.resolveProfile(userId);
        const policy = await this.repository.findPolicyById(policyId);
        if (!policy)
            throw new common_1.NotFoundException('Insurance policy not found');
        if (policy.patientProfileId !== profileId)
            throw new common_1.ForbiddenException('Access denied');
        return this.mapPolicy(policy);
    }
    async updatePolicyDetails(userId, policyId, dto) {
        const profileId = await this.resolveProfile(userId);
        const policy = await this.repository.findPolicyById(policyId);
        if (!policy)
            throw new common_1.NotFoundException('Insurance policy not found');
        if (policy.patientProfileId !== profileId)
            throw new common_1.ForbiddenException('Access denied');
        if (policy.status === 'ARCHIVED') {
            throw new common_1.BadRequestException('Archived policies cannot be updated. Restore it first.');
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
    async activatePolicy(userId, policyId, dto) {
        const profileId = await this.resolveProfile(userId);
        const policy = await this.repository.findPolicyById(policyId);
        if (!policy)
            throw new common_1.NotFoundException('Insurance policy not found');
        if (policy.patientProfileId !== profileId)
            throw new common_1.ForbiddenException('Access denied');
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
    async renewPolicy(userId, policyId, dto) {
        const profileId = await this.resolveProfile(userId);
        const policy = await this.repository.findPolicyById(policyId);
        if (!policy)
            throw new common_1.NotFoundException('Insurance policy not found');
        if (policy.patientProfileId !== profileId)
            throw new common_1.ForbiddenException('Access denied');
        const newExpiry = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000);
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
    async suspendPolicy(userId, policyId, dto) {
        const profileId = await this.resolveProfile(userId);
        const policy = await this.repository.findPolicyById(policyId);
        if (!policy)
            throw new common_1.NotFoundException('Insurance policy not found');
        if (policy.patientProfileId !== profileId)
            throw new common_1.ForbiddenException('Access denied');
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
    async cancelPolicy(userId, policyId, dto) {
        const profileId = await this.resolveProfile(userId);
        const policy = await this.repository.findPolicyById(policyId);
        if (!policy)
            throw new common_1.NotFoundException('Insurance policy not found');
        if (policy.patientProfileId !== profileId)
            throw new common_1.ForbiddenException('Access denied');
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
    async archivePolicy(userId, policyId, dto) {
        const profileId = await this.resolveProfile(userId);
        const policy = await this.repository.findPolicyById(policyId);
        if (!policy)
            throw new common_1.NotFoundException('Insurance policy not found');
        if (policy.patientProfileId !== profileId)
            throw new common_1.ForbiddenException('Access denied');
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
    async restorePolicy(userId, policyId, dto) {
        const profileId = await this.resolveProfile(userId);
        const policy = await this.repository.findPolicyById(policyId, true);
        if (!policy)
            throw new common_1.NotFoundException('Insurance policy not found');
        if (policy.patientProfileId !== profileId)
            throw new common_1.ForbiddenException('Access denied');
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
    async verifyPolicy(userId, policyId) {
        const profileId = await this.resolveProfile(userId);
        const policy = await this.repository.findPolicyById(policyId);
        if (!policy)
            throw new common_1.NotFoundException('Insurance policy not found');
        if (policy.patientProfileId !== profileId)
            throw new common_1.ForbiddenException('Access denied');
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
    async createClaimDraft(userId, dto) {
        const profileId = await this.resolveProfile(userId);
        const policy = await this.repository.findPolicyById(dto.policyId);
        if (!policy)
            throw new common_1.NotFoundException('Insurance policy not found');
        if (policy.patientProfileId !== profileId)
            throw new common_1.ForbiddenException('Access denied');
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
    async getClaimDrafts(userId) {
        const profileId = await this.resolveProfile(userId);
        const claims = await this.repository.findClaimDraftsByProfile(profileId);
        return claims.map((c) => this.mapClaim(c));
    }
    async searchPolicies(query) {
        if (!query || query.trim().length === 0)
            return [];
        const policies = await this.repository.searchPolicies(query.trim());
        return policies.map((p) => this.mapPolicy(p));
    }
    async getStatistics() {
        return this.repository.getStatistics();
    }
    async scanInsuranceCard(userId, dto) {
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
    async confirmOcrScan(userId, dto) {
        const profileId = await this.resolveProfile(userId);
        const ocrRecord = await this.repository.findOcrRecordById(dto.ocrId);
        if (!ocrRecord) {
            throw new common_1.NotFoundException('OCR record not found');
        }
        const policy = await this.repository.createPolicy(profileId, dto.confirmedData.providerName, dto.confirmedData.policyNumber, dto.confirmedData.coverageDetails);
        return {
            policyId: policy.id,
            message: 'Insurance OCR data confirmed and policy saved',
        };
    }
};
exports.InsuranceService = InsuranceService;
exports.InsuranceService = InsuranceService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('IInsuranceRepository')),
    __metadata("design:paramtypes", [Object, qr_service_1.QrService,
        nestjs_pino_1.Logger])
], InsuranceService);
//# sourceMappingURL=insurance.service.js.map
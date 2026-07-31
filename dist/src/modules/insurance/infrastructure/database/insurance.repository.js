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
Object.defineProperty(exports, "__esModule", { value: true });
exports.InsuranceRepository = void 0;
const common_1 = require("@nestjs/common");
const database_service_1 = require("../../../../database/database.service");
let InsuranceRepository = class InsuranceRepository {
    constructor(db) {
        this.db = db;
    }
    async findProfileByUserId(userId) {
        return this.db.patientProfile.findUnique({ where: { userId }, select: { id: true } });
    }
    async createProvider(data) {
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
        }));
    }
    async findProviders() {
        return (await this.db.insuranceProvider.findMany({
            where: { isActive: true },
            orderBy: { name: 'asc' },
        }));
    }
    async createPlan(data) {
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
        }));
    }
    async findPlans(providerId) {
        return (await this.db.insurancePlan.findMany({
            where: providerId ? { providerId } : {},
            orderBy: { name: 'asc' },
        }));
    }
    async createPolicy(patientProfileId, providerName, policyNumber, coverageDetails) {
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
        return policy;
    }
    async createFullPolicy(data) {
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
                    create: data.beneficiaries.map((b) => ({
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
        return policy;
    }
    async findPolicyById(id, includeDeleted = false) {
        return (await this.db.insurancePolicy.findFirst({
            where: { id, ...(includeDeleted ? {} : { isDeleted: false }) },
            include: { beneficiaries: true, claimDrafts: true, history: { orderBy: { createdAt: 'desc' } } },
        }));
    }
    async findPolicyByProfileId(patientProfileId, includeDeleted = false) {
        return (await this.db.insurancePolicy.findFirst({
            where: { patientProfileId, ...(includeDeleted ? {} : { isDeleted: false }) },
            include: { beneficiaries: true, claimDrafts: true, history: { orderBy: { createdAt: 'desc' } } },
        }));
    }
    async findPoliciesByProfile(patientProfileId, includeDeleted = false) {
        return (await this.db.insurancePolicy.findMany({
            where: { patientProfileId, ...(includeDeleted ? {} : { isDeleted: false }) },
            include: { beneficiaries: true, claimDrafts: true, history: { orderBy: { createdAt: 'desc' } } },
            orderBy: { createdAt: 'desc' },
        }));
    }
    async updatePolicy(id, providerName, policyNumber, coverageDetails) {
        return (await this.db.insurancePolicy.update({
            where: { id },
            data: {
                providerName,
                policyNumber,
                coverageDetails: coverageDetails || undefined,
            },
            include: { beneficiaries: true, claimDrafts: true, history: { orderBy: { createdAt: 'desc' } } },
        }));
    }
    async updatePolicyDetails(id, data) {
        return (await this.db.insurancePolicy.update({
            where: { id },
            data: {
                providerName: data.providerName || undefined,
                policyNumber: data.policyNumber || undefined,
                groupNumber: data.groupNumber || undefined,
                status: data.status || undefined,
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
        }));
    }
    async softDeletePolicy(id) {
        await this.db.insurancePolicy.update({
            where: { id },
            data: { isDeleted: true, deletedAt: new Date() },
        });
    }
    async searchPolicies(query) {
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
        }));
    }
    async createClaimDraft(data) {
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
        }));
    }
    async findClaimDraftsByProfile(patientProfileId) {
        return (await this.db.insuranceClaimDraft.findMany({
            where: { patientProfileId },
            orderBy: { createdAt: 'desc' },
        }));
    }
    async createHistory(policyId, data) {
        return (await this.db.insuranceHistory.create({
            data: {
                policyId,
                action: data.action,
                previousStatus: data.previousStatus || null,
                newStatus: data.newStatus,
                reason: data.reason || null,
                performedBy: data.performedBy || null,
            },
        }));
    }
    async createAuditLog(data) {
        return (await this.db.insuranceAuditLog.create({
            data: {
                policyId: data.policyId,
                action: data.action,
                performedBy: data.performedBy || null,
                details: data.details || null,
            },
        }));
    }
    async saveOcrRecord(patientProfileId, imageUrl, extractedData) {
        return this.db.insuranceOcrRecord.create({
            data: { patientProfileId, imageUrl, extractedData, isConfirmed: false },
        });
    }
    async findOcrRecordById(id) {
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
};
exports.InsuranceRepository = InsuranceRepository;
exports.InsuranceRepository = InsuranceRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [database_service_1.DatabaseService])
], InsuranceRepository);
//# sourceMappingURL=insurance.repository.js.map
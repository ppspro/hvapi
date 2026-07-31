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
exports.FamilyRepository = void 0;
const common_1 = require("@nestjs/common");
const database_service_1 = require("../../../../database/database.service");
let FamilyRepository = class FamilyRepository {
    constructor(db) {
        this.db = db;
    }
    async findProfileByUserId(userId) {
        return this.db.patientProfile.findUnique({ where: { userId }, select: { id: true } });
    }
    async createInvitation(patientProfileId, data) {
        return (await this.db.familyConsent.create({
            data: {
                patientProfileId,
                inviteePhone: data.inviteePhone,
                inviteeName: data.inviteeName || null,
                relationship: data.relationship,
                relationshipType: data.relationshipType || 'OTHER',
                invitationToken: data.invitationToken,
                expiresAt: data.expiresAt || null,
                status: 'PENDING',
                resendCount: 0,
            },
        }));
    }
    async findInvitationById(id) {
        return (await this.db.familyConsent.findUnique({ where: { id } }));
    }
    async findInvitationByToken(token) {
        return (await this.db.familyConsent.findUnique({ where: { invitationToken: token } }));
    }
    async findInvitationsByProfile(patientProfileId) {
        return (await this.db.familyConsent.findMany({
            where: { patientProfileId },
            orderBy: { createdAt: 'desc' },
        }));
    }
    async updateInvitation(id, data) {
        return (await this.db.familyConsent.update({
            where: { id },
            data: {
                status: data.status,
                resendCount: data.resendCount,
                acceptedAt: data.acceptedAt || undefined,
                rejectedAt: data.rejectedAt || undefined,
                cancelledAt: data.cancelledAt || undefined,
                inviteeName: data.inviteeName || undefined,
            },
        }));
    }
    async deleteInvitation(id) {
        await this.db.familyConsent.delete({ where: { id } });
    }
    async createFamilyMember(patientProfileId, data) {
        return (await this.db.familyMember.create({
            data: {
                patientProfileId,
                fullName: data.fullName,
                relationship: data.relationship,
                relationshipType: data.relationshipType || 'OTHER',
                phone: data.phone,
                isPrimary: data.isPrimary ?? false,
                isGuardian: data.isGuardian ?? false,
                isDependent: data.isDependent ?? false,
                isCaregiver: data.isCaregiver ?? false,
                notes: data.notes || null,
            },
        }));
    }
    async findFamilyMemberById(id) {
        return (await this.db.familyMember.findUnique({ where: { id } }));
    }
    async findFamilyMembersByProfile(patientProfileId) {
        return (await this.db.familyMember.findMany({
            where: { patientProfileId, status: { not: 'ARCHIVED' } },
            orderBy: { createdAt: 'asc' },
        }));
    }
    async findGuardiansByProfile(patientProfileId) {
        return (await this.db.familyMember.findMany({
            where: { patientProfileId, isGuardian: true, status: 'ACTIVE' },
        }));
    }
    async findDependentsByProfile(patientProfileId) {
        return (await this.db.familyMember.findMany({
            where: { patientProfileId, isDependent: true, status: 'ACTIVE' },
        }));
    }
    async updateFamilyMember(id, data) {
        return (await this.db.familyMember.update({
            where: { id },
            data: {
                fullName: data.fullName || undefined,
                relationship: data.relationship || undefined,
                relationshipType: data.relationshipType || undefined,
                phone: data.phone || undefined,
                status: data.status || undefined,
                isPrimary: data.isPrimary ?? undefined,
                isGuardian: data.isGuardian ?? undefined,
                isDependent: data.isDependent ?? undefined,
                isCaregiver: data.isCaregiver ?? undefined,
                verificationStatus: data.verificationStatus || undefined,
                notes: data.notes || undefined,
                archivedAt: data.archivedAt || undefined,
            },
        }));
    }
    async deleteFamilyMember(id) {
        await this.db.familyMember.update({ where: { id }, data: { status: 'ARCHIVED', archivedAt: new Date() } });
    }
    async createConsentRecord(patientProfileId, familyMemberId, data) {
        return (await this.db.consentRecord.create({
            data: {
                patientProfileId,
                familyMemberId,
                category: data.category,
                expiresAt: data.expiresAt || null,
                notes: data.notes || null,
            },
        }));
    }
    async findConsentRecordById(id) {
        return (await this.db.consentRecord.findUnique({ where: { id } }));
    }
    async findConsentsByProfile(patientProfileId, activeOnly = false) {
        return (await this.db.consentRecord.findMany({
            where: { patientProfileId, ...(activeOnly ? { isActive: true } : {}) },
            orderBy: { createdAt: 'desc' },
        }));
    }
    async findConsentsByMember(familyMemberId, activeOnly = false) {
        return (await this.db.consentRecord.findMany({
            where: { familyMemberId, ...(activeOnly ? { isActive: true } : {}) },
            orderBy: { createdAt: 'desc' },
        }));
    }
    async updateConsentRecord(id, data) {
        return (await this.db.consentRecord.update({
            where: { id },
            data: {
                isActive: data.isActive ?? undefined,
                revokedAt: data.revokedAt || undefined,
                expiresAt: data.expiresAt || undefined,
                notes: data.notes || undefined,
            },
        }));
    }
    async createConsentHistory(consentRecordId, action, performedBy, reason) {
        return (await this.db.consentHistory.create({
            data: { consentRecordId, action, performedBy: performedBy || null, reason: reason || null },
        }));
    }
    async findConsentHistory(consentRecordId) {
        return (await this.db.consentHistory.findMany({
            where: { consentRecordId },
            orderBy: { createdAt: 'desc' },
        }));
    }
    async findAllConsentHistoryByProfile(patientProfileId) {
        return (await this.db.consentHistory.findMany({
            where: { consentRecord: { patientProfileId } },
            orderBy: { createdAt: 'desc' },
            take: 100,
        }));
    }
};
exports.FamilyRepository = FamilyRepository;
exports.FamilyRepository = FamilyRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [database_service_1.DatabaseService])
], FamilyRepository);
//# sourceMappingURL=family.repository.js.map
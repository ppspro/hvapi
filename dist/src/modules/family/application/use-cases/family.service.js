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
exports.FamilyService = void 0;
const common_1 = require("@nestjs/common");
const crypto_1 = require("crypto");
let FamilyService = class FamilyService {
    constructor(familyRepository) {
        this.familyRepository = familyRepository;
    }
    async resolveProfile(userId) {
        const profile = await this.familyRepository.findProfileByUserId(userId);
        if (!profile) {
            throw new common_1.NotFoundException('Patient profile not found. Please complete registration first.');
        }
        return profile.id;
    }
    mapInvitation(inv) {
        return {
            id: inv.id,
            inviteePhone: inv.inviteePhone,
            inviteeName: inv.inviteeName || undefined,
            relationship: inv.relationship,
            relationshipType: inv.relationshipType,
            status: inv.status,
            invitationToken: inv.invitationToken,
            resendCount: inv.resendCount,
            expiresAt: inv.expiresAt?.toISOString() || undefined,
            acceptedAt: inv.acceptedAt?.toISOString() || undefined,
            rejectedAt: inv.rejectedAt?.toISOString() || undefined,
            cancelledAt: inv.cancelledAt?.toISOString() || undefined,
            createdAt: inv.createdAt.toISOString(),
        };
    }
    mapMember(m) {
        return {
            id: m.id,
            fullName: m.fullName,
            relationship: m.relationship,
            relationshipType: m.relationshipType,
            phone: m.phone,
            status: m.status,
            isPrimary: m.isPrimary,
            isGuardian: m.isGuardian,
            isDependent: m.isDependent,
            isCaregiver: m.isCaregiver,
            verificationStatus: m.verificationStatus,
            notes: m.notes || undefined,
            createdAt: m.createdAt.toISOString(),
            updatedAt: m.updatedAt.toISOString(),
        };
    }
    mapConsent(c) {
        return {
            id: c.id,
            patientProfileId: c.patientProfileId,
            familyMemberId: c.familyMemberId,
            category: c.category,
            isActive: c.isActive,
            grantedAt: c.grantedAt.toISOString(),
            revokedAt: c.revokedAt?.toISOString() || undefined,
            expiresAt: c.expiresAt?.toISOString() || undefined,
            notes: c.notes || undefined,
            createdAt: c.createdAt.toISOString(),
        };
    }
    mapHistory(h) {
        return {
            id: h.id,
            consentRecordId: h.consentRecordId,
            action: h.action,
            performedBy: h.performedBy || undefined,
            reason: h.reason || undefined,
            createdAt: h.createdAt.toISOString(),
        };
    }
    async createInvitation(userId, dto) {
        const profileId = await this.resolveProfile(userId);
        const existing = await this.familyRepository.findInvitationsByProfile(profileId);
        const duplicate = existing.find((inv) => inv.inviteePhone === dto.inviteePhone && (inv.status === 'PENDING'));
        if (duplicate) {
            throw new common_1.BadRequestException('A pending invitation already exists for this phone number. Cancel or resend it.');
        }
        const invitationToken = (0, crypto_1.randomUUID)();
        const expiresAt = dto.expiresAt ? new Date(dto.expiresAt) : new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
        const invitation = await this.familyRepository.createInvitation(profileId, {
            inviteePhone: dto.inviteePhone,
            inviteeName: dto.inviteeName,
            relationship: dto.relationship,
            relationshipType: dto.relationshipType || 'OTHER',
            invitationToken,
            expiresAt,
        });
        return this.mapInvitation(invitation);
    }
    async resendInvitation(userId, invitationId) {
        const profileId = await this.resolveProfile(userId);
        const invitation = await this.familyRepository.findInvitationById(invitationId);
        if (!invitation)
            throw new common_1.NotFoundException('Invitation not found');
        if (invitation.patientProfileId !== profileId)
            throw new common_1.ForbiddenException('Access denied');
        if (invitation.status !== 'PENDING') {
            throw new common_1.BadRequestException(`Cannot resend invitation with status: ${invitation.status}`);
        }
        if (invitation.resendCount >= 5) {
            throw new common_1.BadRequestException('Maximum resend limit (5) reached for this invitation');
        }
        const updated = await this.familyRepository.updateInvitation(invitationId, {
            resendCount: invitation.resendCount + 1,
        });
        return this.mapInvitation(updated);
    }
    async acceptInvitation(userId, invitationId) {
        const profileId = await this.resolveProfile(userId);
        const invitation = await this.familyRepository.findInvitationById(invitationId);
        if (!invitation)
            throw new common_1.NotFoundException('Invitation not found');
        if (invitation.patientProfileId !== profileId)
            throw new common_1.ForbiddenException('Access denied');
        if (invitation.status !== 'PENDING') {
            throw new common_1.BadRequestException(`Invitation is already ${invitation.status}`);
        }
        if (invitation.expiresAt && new Date() > invitation.expiresAt) {
            await this.familyRepository.updateInvitation(invitationId, { status: 'EXPIRED' });
            throw new common_1.BadRequestException('Invitation has expired');
        }
        await this.familyRepository.updateInvitation(invitationId, {
            status: 'ACCEPTED',
            acceptedAt: new Date(),
        });
        const member = await this.familyRepository.createFamilyMember(profileId, {
            fullName: invitation.inviteeName || 'Family Member',
            relationship: invitation.relationship,
            relationshipType: invitation.relationshipType,
            phone: invitation.inviteePhone,
            isGuardian: invitation.relationshipType === 'GUARDIAN' || invitation.relationshipType === 'PARENT',
            isDependent: invitation.relationshipType === 'DEPENDENT' || invitation.relationshipType === 'CHILD',
            isCaregiver: invitation.relationshipType === 'CAREGIVER',
        });
        return { message: 'Invitation accepted and family member added', memberId: member.id };
    }
    async rejectInvitation(userId, invitationId) {
        const profileId = await this.resolveProfile(userId);
        const invitation = await this.familyRepository.findInvitationById(invitationId);
        if (!invitation)
            throw new common_1.NotFoundException('Invitation not found');
        if (invitation.patientProfileId !== profileId)
            throw new common_1.ForbiddenException('Access denied');
        if (invitation.status !== 'PENDING') {
            throw new common_1.BadRequestException(`Invitation is already ${invitation.status}`);
        }
        await this.familyRepository.updateInvitation(invitationId, {
            status: 'REJECTED',
            rejectedAt: new Date(),
        });
        return { message: 'Invitation rejected' };
    }
    async cancelInvitation(userId, invitationId) {
        const profileId = await this.resolveProfile(userId);
        const invitation = await this.familyRepository.findInvitationById(invitationId);
        if (!invitation)
            throw new common_1.NotFoundException('Invitation not found');
        if (invitation.patientProfileId !== profileId)
            throw new common_1.ForbiddenException('Access denied');
        if (!['PENDING'].includes(invitation.status)) {
            throw new common_1.BadRequestException('Only pending invitations can be cancelled');
        }
        await this.familyRepository.updateInvitation(invitationId, {
            status: 'CANCELLED',
            cancelledAt: new Date(),
        });
        return { message: 'Invitation cancelled' };
    }
    async getInvitations(userId) {
        const profileId = await this.resolveProfile(userId);
        const invitations = await this.familyRepository.findInvitationsByProfile(profileId);
        return invitations.map((inv) => this.mapInvitation(inv));
    }
    async getFamilyMembers(userId) {
        const profileId = await this.resolveProfile(userId);
        const members = await this.familyRepository.findFamilyMembersByProfile(profileId);
        return members.map((m) => this.mapMember(m));
    }
    async getFamilyMemberById(userId, memberId) {
        const profileId = await this.resolveProfile(userId);
        const member = await this.familyRepository.findFamilyMemberById(memberId);
        if (!member)
            throw new common_1.NotFoundException('Family member not found');
        if (member.patientProfileId !== profileId)
            throw new common_1.ForbiddenException('Access denied');
        return this.mapMember(member);
    }
    async updateFamilyMember(userId, memberId, dto) {
        const profileId = await this.resolveProfile(userId);
        const member = await this.familyRepository.findFamilyMemberById(memberId);
        if (!member)
            throw new common_1.NotFoundException('Family member not found');
        if (member.patientProfileId !== profileId)
            throw new common_1.ForbiddenException('Access denied');
        const updated = await this.familyRepository.updateFamilyMember(memberId, {
            fullName: dto.fullName,
            relationship: dto.relationship,
            relationshipType: dto.relationshipType,
            phone: dto.phone,
            status: dto.status,
            isPrimary: dto.isPrimary,
            notes: dto.notes,
        });
        return this.mapMember(updated);
    }
    async removeFamilyMember(userId, memberId) {
        const profileId = await this.resolveProfile(userId);
        const member = await this.familyRepository.findFamilyMemberById(memberId);
        if (!member)
            throw new common_1.NotFoundException('Family member not found');
        if (member.patientProfileId !== profileId)
            throw new common_1.ForbiddenException('Access denied');
        await this.familyRepository.deleteFamilyMember(memberId);
        return { message: 'Family member removed (archived)' };
    }
    async getGuardians(userId) {
        const profileId = await this.resolveProfile(userId);
        const guardians = await this.familyRepository.findGuardiansByProfile(profileId);
        return guardians.map((g) => this.mapMember(g));
    }
    async createGuardian(userId, dto) {
        const profileId = await this.resolveProfile(userId);
        const member = await this.familyRepository.createFamilyMember(profileId, {
            fullName: dto.fullName,
            relationship: dto.relationship,
            relationshipType: dto.relationshipType,
            phone: dto.phone,
            isGuardian: true,
            isPrimary: dto.isPrimary ?? false,
            notes: dto.notes,
        });
        return this.mapMember(member);
    }
    async updateGuardian(userId, memberId, dto) {
        const profileId = await this.resolveProfile(userId);
        const member = await this.familyRepository.findFamilyMemberById(memberId);
        if (!member)
            throw new common_1.NotFoundException('Guardian not found');
        if (member.patientProfileId !== profileId)
            throw new common_1.ForbiddenException('Access denied');
        if (!member.isGuardian)
            throw new common_1.BadRequestException('This family member is not a guardian');
        const updated = await this.familyRepository.updateFamilyMember(memberId, {
            verificationStatus: dto.verificationStatus,
            isPrimary: dto.isPrimary,
            notes: dto.notes,
        });
        return this.mapMember(updated);
    }
    async getDependents(userId) {
        const profileId = await this.resolveProfile(userId);
        const dependents = await this.familyRepository.findDependentsByProfile(profileId);
        return dependents.map((d) => this.mapMember(d));
    }
    async createDependent(userId, dto) {
        const profileId = await this.resolveProfile(userId);
        const member = await this.familyRepository.createFamilyMember(profileId, {
            fullName: dto.fullName,
            relationship: dto.relationship,
            relationshipType: dto.relationshipType,
            phone: dto.phone,
            isDependent: true,
            isCaregiver: dto.isCaregiver ?? false,
            notes: dto.notes,
        });
        return this.mapMember(member);
    }
    async updateDependent(userId, memberId, dto) {
        const profileId = await this.resolveProfile(userId);
        const member = await this.familyRepository.findFamilyMemberById(memberId);
        if (!member)
            throw new common_1.NotFoundException('Dependent not found');
        if (member.patientProfileId !== profileId)
            throw new common_1.ForbiddenException('Access denied');
        if (!member.isDependent)
            throw new common_1.BadRequestException('This family member is not a dependent');
        const updated = await this.familyRepository.updateFamilyMember(memberId, {
            fullName: dto.fullName,
            phone: dto.phone,
            notes: dto.notes,
        });
        return this.mapMember(updated);
    }
    async removeDependent(userId, memberId) {
        const profileId = await this.resolveProfile(userId);
        const member = await this.familyRepository.findFamilyMemberById(memberId);
        if (!member)
            throw new common_1.NotFoundException('Dependent not found');
        if (member.patientProfileId !== profileId)
            throw new common_1.ForbiddenException('Access denied');
        if (!member.isDependent)
            throw new common_1.BadRequestException('This family member is not a dependent');
        await this.familyRepository.deleteFamilyMember(memberId);
        return { message: 'Dependent removed' };
    }
    async grantConsent(userId, dto) {
        const profileId = await this.resolveProfile(userId);
        const member = await this.familyRepository.findFamilyMemberById(dto.familyMemberId);
        if (!member)
            throw new common_1.NotFoundException('Family member not found');
        if (member.patientProfileId !== profileId)
            throw new common_1.ForbiddenException('Access denied');
        const existingConsents = await this.familyRepository.findConsentsByMember(dto.familyMemberId, true);
        const duplicate = existingConsents.find((c) => c.category === dto.category && c.isActive);
        if (duplicate) {
            throw new common_1.BadRequestException(`Active consent for category ${dto.category} already exists for this member`);
        }
        const record = await this.familyRepository.createConsentRecord(profileId, dto.familyMemberId, {
            category: dto.category,
            expiresAt: dto.expiresAt ? new Date(dto.expiresAt) : undefined,
            notes: dto.notes,
        });
        await this.familyRepository.createConsentHistory(record.id, 'GRANTED', userId);
        return this.mapConsent(record);
    }
    async updateConsent(userId, consentId, dto) {
        const profileId = await this.resolveProfile(userId);
        const record = await this.familyRepository.findConsentRecordById(consentId);
        if (!record)
            throw new common_1.NotFoundException('Consent record not found');
        if (record.patientProfileId !== profileId)
            throw new common_1.ForbiddenException('Access denied');
        if (!record.isActive)
            throw new common_1.BadRequestException('Cannot update a revoked consent');
        const updated = await this.familyRepository.updateConsentRecord(consentId, {
            expiresAt: dto.expiresAt ? new Date(dto.expiresAt) : undefined,
            notes: dto.notes,
        });
        await this.familyRepository.createConsentHistory(consentId, 'UPDATED', userId);
        return this.mapConsent(updated);
    }
    async revokeConsent(userId, consentId) {
        const profileId = await this.resolveProfile(userId);
        const record = await this.familyRepository.findConsentRecordById(consentId);
        if (!record)
            throw new common_1.NotFoundException('Consent record not found');
        if (record.patientProfileId !== profileId)
            throw new common_1.ForbiddenException('Access denied');
        if (!record.isActive)
            throw new common_1.BadRequestException('Consent is already revoked');
        await this.familyRepository.updateConsentRecord(consentId, {
            isActive: false,
            revokedAt: new Date(),
        });
        await this.familyRepository.createConsentHistory(consentId, 'REVOKED', userId, 'Consent withdrawn by patient');
        return { message: 'Consent revoked successfully' };
    }
    async getConsents(userId) {
        const profileId = await this.resolveProfile(userId);
        const consents = await this.familyRepository.findConsentsByProfile(profileId, true);
        return consents.map((c) => this.mapConsent(c));
    }
    async getConsentHistory(userId) {
        const profileId = await this.resolveProfile(userId);
        const history = await this.familyRepository.findAllConsentHistoryByProfile(profileId);
        return history.map((h) => this.mapHistory(h));
    }
};
exports.FamilyService = FamilyService;
exports.FamilyService = FamilyService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('IFamilyRepository')),
    __metadata("design:paramtypes", [Object])
], FamilyService);
//# sourceMappingURL=family.service.js.map
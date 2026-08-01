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
exports.ReferralService = void 0;
const common_1 = require("@nestjs/common");
const nestjs_pino_1 = require("nestjs-pino");
let ReferralService = class ReferralService {
    constructor(referralRepository, logger) {
        this.referralRepository = referralRepository;
        this.logger = logger;
    }
    async createReferral(userId, dto) {
        const referral = await this.referralRepository.createReferral({
            ...dto,
            referringDoctorId: userId,
            referringFacilityId: 'facility-uuid-default',
        });
        return this.mapReferral(referral);
    }
    async getReferrals(filters) {
        const res = await this.referralRepository.findReferrals(filters);
        return {
            data: res.data.map((r) => this.mapReferral(r)),
            total: res.total,
        };
    }
    async getReferralById(id) {
        const ref = await this.referralRepository.findReferralById(id);
        if (!ref)
            throw new common_1.NotFoundException('Referral not found');
        return this.mapReferral(ref);
    }
    async triageReferral(id, userId, dto) {
        const ref = await this.referralRepository.triageReferral(id, dto.outcome, userId, dto.receivingDoctorId, dto.reason);
        return this.mapReferral(ref);
    }
    async updateStatus(id, userId, dto) {
        const ref = await this.referralRepository.updateReferralStatus(id, dto.status, userId, dto.reason);
        return this.mapReferral(ref);
    }
    async addNote(id, userId, userRole, dto) {
        const ref = await this.referralRepository.findReferralById(id);
        if (!ref)
            throw new common_1.NotFoundException('Referral not found');
        const note = await this.referralRepository.addNote({
            referralId: id,
            authorId: userId,
            authorRole: userRole || 'DOCTOR',
            noteText: dto.noteText,
            isPrivate: dto.isPrivate,
        });
        return {
            id: note.id,
            referralId: note.referralId,
            authorId: note.authorId,
            authorRole: note.authorRole,
            noteText: note.noteText,
            isPrivate: note.isPrivate,
            createdAt: note.createdAt.toISOString(),
        };
    }
    async getNotes(id) {
        const notes = await this.referralRepository.findNotes(id, true);
        return notes.map((n) => ({
            id: n.id,
            referralId: n.referralId,
            authorId: n.authorId,
            authorRole: n.authorRole,
            noteText: n.noteText,
            isPrivate: n.isPrivate,
            createdAt: n.createdAt.toISOString(),
        }));
    }
    async addAttachment(id, userId, dto) {
        const ref = await this.referralRepository.findReferralById(id);
        if (!ref)
            throw new common_1.NotFoundException('Referral not found');
        const att = await this.referralRepository.addAttachment({
            referralId: id,
            attachmentId: dto.attachmentId,
            attachedBy: userId,
        });
        return {
            id: att.id,
            referralId: att.referralId,
            attachmentId: att.attachmentId,
            attachedBy: att.attachedBy,
            createdAt: att.createdAt.toISOString(),
        };
    }
    async getAttachments(id) {
        const atts = await this.referralRepository.findAttachments(id);
        return atts.map((a) => ({
            id: a.id,
            referralId: a.referralId,
            attachmentId: a.attachmentId,
            attachedBy: a.attachedBy,
            createdAt: a.createdAt.toISOString(),
        }));
    }
    async getHistory(id) {
        const history = await this.referralRepository.findStatusHistory(id);
        return history.map((h) => ({
            id: h.id,
            referralId: h.referralId,
            fromStatus: h.fromStatus || undefined,
            toStatus: h.toStatus,
            changedBy: h.changedBy,
            reason: h.reason || undefined,
            createdAt: h.createdAt.toISOString(),
        }));
    }
    async getDashboardStats(facilityId) {
        return this.referralRepository.getDashboardStats(facilityId);
    }
    async softDeleteReferral(id) {
        const ref = await this.referralRepository.findReferralById(id);
        if (!ref)
            throw new common_1.NotFoundException('Referral not found');
        await this.referralRepository.softDeleteReferral(id);
        return { message: 'Referral soft-deleted successfully' };
    }
    mapReferral(r) {
        return {
            id: r.id,
            referralNumber: r.referralNumber,
            patientId: r.patientId,
            referringDoctorId: r.referringDoctorId,
            referringFacilityId: r.referringFacilityId,
            receivingDoctorId: r.receivingDoctorId || undefined,
            receivingFacilityId: r.receivingFacilityId,
            medicalRecordId: r.medicalRecordId || undefined,
            referralType: r.referralType,
            priority: r.priority,
            status: r.status,
            reasonForReferral: r.reasonForReferral,
            clinicalSummary: r.clinicalSummary || undefined,
            specialtyRequired: r.specialtyRequired || undefined,
            expiresAt: r.expiresAt ? r.expiresAt.toISOString() : undefined,
            acceptedAt: r.acceptedAt ? r.acceptedAt.toISOString() : undefined,
            completedAt: r.completedAt ? r.completedAt.toISOString() : undefined,
            rejectedAt: r.rejectedAt ? r.rejectedAt.toISOString() : undefined,
            rejectionReason: r.rejectionReason || undefined,
            createdAt: r.createdAt.toISOString(),
            updatedAt: r.updatedAt.toISOString(),
            notes: r.notes ? r.notes.map((n) => ({
                id: n.id,
                referralId: n.referralId,
                authorId: n.authorId,
                authorRole: n.authorRole,
                noteText: n.noteText,
                isPrivate: n.isPrivate,
                createdAt: n.createdAt.toISOString(),
            })) : undefined,
            attachments: r.attachments ? r.attachments.map((a) => ({
                id: a.id,
                referralId: a.referralId,
                attachmentId: a.attachmentId,
                attachedBy: a.attachedBy,
                createdAt: a.createdAt.toISOString(),
            })) : undefined,
            statusHistory: r.statusHistory ? r.statusHistory.map((h) => ({
                id: h.id,
                referralId: h.referralId,
                fromStatus: h.fromStatus || undefined,
                toStatus: h.toStatus,
                changedBy: h.changedBy,
                reason: h.reason || undefined,
                createdAt: h.createdAt.toISOString(),
            })) : undefined,
        };
    }
};
exports.ReferralService = ReferralService;
exports.ReferralService = ReferralService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('IReferralRepository')),
    __metadata("design:paramtypes", [Object, nestjs_pino_1.Logger])
], ReferralService);
//# sourceMappingURL=referral.service.js.map
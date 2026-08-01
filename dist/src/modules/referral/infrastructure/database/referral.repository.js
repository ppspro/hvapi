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
exports.PrismaReferralRepository = void 0;
const common_1 = require("@nestjs/common");
const database_service_1 = require("../../../../database/database.service");
let PrismaReferralRepository = class PrismaReferralRepository {
    constructor(db) {
        this.db = db;
    }
    async createReferral(data) {
        const count = await this.db.patientReferral.count();
        const year = new Date().getFullYear();
        const referralNumber = `REF-${year}-${String(count + 1).padStart(5, '0')}`;
        return (await this.db.patientReferral.create({
            data: {
                referralNumber,
                patientId: data.patientId,
                referringDoctorId: data.referringDoctorId,
                referringFacilityId: data.referringFacilityId,
                receivingDoctorId: data.receivingDoctorId || null,
                receivingFacilityId: data.receivingFacilityId,
                medicalRecordId: data.medicalRecordId || null,
                referralType: data.referralType || 'SPECIALIST_CONSULTATION',
                priority: data.priority || 'ROUTINE',
                status: data.status || 'SUBMITTED',
                reasonForReferral: data.reasonForReferral,
                clinicalSummary: data.clinicalSummary || null,
                specialtyRequired: data.specialtyRequired || null,
                expiresAt: data.expiresAt ? new Date(data.expiresAt) : null,
                statusHistory: {
                    create: {
                        fromStatus: null,
                        toStatus: data.status || 'SUBMITTED',
                        changedBy: data.referringDoctorId,
                        reason: 'Initial Referral Creation',
                    },
                },
            },
            include: { notes: true, attachments: true, statusHistory: true },
        }));
    }
    async findReferrals(filters) {
        const page = filters.page || 1;
        const limit = filters.limit || 20;
        const skip = (page - 1) * limit;
        const where = {
            isDeleted: false,
            ...(filters.patientId ? { patientId: filters.patientId } : {}),
            ...(filters.referringDoctorId ? { referringDoctorId: filters.referringDoctorId } : {}),
            ...(filters.receivingDoctorId ? { receivingDoctorId: filters.receivingDoctorId } : {}),
            ...(filters.receivingFacilityId ? { receivingFacilityId: filters.receivingFacilityId } : {}),
            ...(filters.status ? { status: filters.status } : {}),
            ...(filters.priority ? { priority: filters.priority } : {}),
        };
        const [data, total] = await Promise.all([
            this.db.patientReferral.findMany({
                where,
                include: { notes: true, attachments: true, statusHistory: true },
                orderBy: { createdAt: 'desc' },
                skip,
                take: limit,
            }),
            this.db.patientReferral.count({ where }),
        ]);
        return { data: data, total };
    }
    async findReferralById(id) {
        const ref = await this.db.patientReferral.findFirst({
            where: { id, isDeleted: false },
            include: { notes: true, attachments: true, statusHistory: true },
        });
        return ref;
    }
    async findReferralByNumber(referralNumber) {
        const ref = await this.db.patientReferral.findFirst({
            where: { referralNumber, isDeleted: false },
            include: { notes: true, attachments: true, statusHistory: true },
        });
        return ref;
    }
    async updateReferralStatus(id, status, changedBy, reason) {
        const current = await this.findReferralById(id);
        if (!current)
            throw new common_1.NotFoundException('Referral record not found');
        const updated = await this.db.patientReferral.update({
            where: { id },
            data: {
                status: status,
                acceptedAt: status === 'ACCEPTED' ? new Date() : undefined,
                completedAt: status === 'COMPLETED' ? new Date() : undefined,
                rejectedAt: status === 'REJECTED' ? new Date() : undefined,
                rejectionReason: status === 'REJECTED' ? reason : undefined,
                statusHistory: {
                    create: {
                        fromStatus: current.status,
                        toStatus: status,
                        changedBy,
                        reason: reason || `Status changed to ${status}`,
                    },
                },
            },
            include: { notes: true, attachments: true, statusHistory: true },
        });
        return updated;
    }
    async triageReferral(id, outcome, changedBy, receivingDoctorId, reason) {
        const current = await this.findReferralById(id);
        if (!current)
            throw new common_1.NotFoundException('Referral record not found');
        let targetStatus = 'TRIAGED';
        if (outcome === 'APPROVED')
            targetStatus = 'ACCEPTED';
        if (outcome === 'DECLINED')
            targetStatus = 'REJECTED';
        const updated = await this.db.patientReferral.update({
            where: { id },
            data: {
                status: targetStatus,
                receivingDoctorId: receivingDoctorId || undefined,
                acceptedAt: targetStatus === 'ACCEPTED' ? new Date() : undefined,
                rejectedAt: targetStatus === 'REJECTED' ? new Date() : undefined,
                rejectionReason: targetStatus === 'REJECTED' ? reason : undefined,
                statusHistory: {
                    create: {
                        fromStatus: current.status,
                        toStatus: targetStatus,
                        changedBy,
                        reason: reason || `Triaged: ${outcome}`,
                    },
                },
            },
            include: { notes: true, attachments: true, statusHistory: true },
        });
        return updated;
    }
    async addNote(data) {
        return (await this.db.referralNote.create({
            data: {
                referralId: data.referralId,
                authorId: data.authorId,
                authorRole: data.authorRole,
                noteText: data.noteText,
                isPrivate: data.isPrivate || false,
            },
        }));
    }
    async findNotes(referralId, includePrivate = true) {
        return (await this.db.referralNote.findMany({
            where: {
                referralId,
                ...(includePrivate ? {} : { isPrivate: false }),
            },
            orderBy: { createdAt: 'desc' },
        }));
    }
    async addAttachment(data) {
        return (await this.db.referralAttachment.create({
            data: {
                referralId: data.referralId,
                attachmentId: data.attachmentId,
                attachedBy: data.attachedBy,
            },
        }));
    }
    async findAttachments(referralId) {
        return (await this.db.referralAttachment.findMany({
            where: { referralId },
            orderBy: { createdAt: 'desc' },
        }));
    }
    async findStatusHistory(referralId) {
        return (await this.db.referralStatusHistory.findMany({
            where: { referralId },
            orderBy: { createdAt: 'asc' },
        }));
    }
    async getDashboardStats(facilityId) {
        const where = {
            isDeleted: false,
            ...(facilityId ? { receivingFacilityId: facilityId } : {}),
        };
        const [total, pendingTriage, accepted, completed] = await Promise.all([
            this.db.patientReferral.count({ where }),
            this.db.patientReferral.count({ where: { ...where, status: 'SUBMITTED' } }),
            this.db.patientReferral.count({ where: { ...where, status: 'ACCEPTED' } }),
            this.db.patientReferral.count({ where: { ...where, status: 'COMPLETED' } }),
        ]);
        return {
            totalReferrals: total,
            pendingTriageCount: pendingTriage,
            acceptedCount: accepted,
            completedCount: completed,
            avgCompletionTimeHours: 18.5,
        };
    }
    async softDeleteReferral(id) {
        return (await this.db.patientReferral.update({
            where: { id },
            data: { isDeleted: true, deletedAt: new Date() },
        }));
    }
};
exports.PrismaReferralRepository = PrismaReferralRepository;
exports.PrismaReferralRepository = PrismaReferralRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [database_service_1.DatabaseService])
], PrismaReferralRepository);
//# sourceMappingURL=referral.repository.js.map
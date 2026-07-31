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
exports.MedicalRecordRepository = void 0;
const common_1 = require("@nestjs/common");
const database_service_1 = require("../../../../database/database.service");
let MedicalRecordRepository = class MedicalRecordRepository {
    constructor(db) {
        this.db = db;
    }
    async findProfileByUserId(userId) {
        return this.db.patientProfile.findUnique({ where: { userId }, select: { id: true } });
    }
    async createRecord(patientProfileId, data) {
        return (await this.db.medicalRecord.create({
            data: {
                patientProfileId,
                title: data.title,
                chiefComplaint: data.chiefComplaint || null,
                clinicalNotes: data.clinicalNotes || null,
                treatmentPlan: data.treatmentPlan || null,
                followUpInstructions: data.followUpInstructions || null,
                status: data.status || 'FINAL',
                createdById: data.createdById || null,
                encounters: data.encounter ? {
                    create: {
                        providerName: data.encounter.providerName || null,
                        facilityName: data.encounter.facilityName || null,
                        encounterType: data.encounter.encounterType || 'CONSULTATION',
                        encounterDate: data.encounter.encounterDate ? new Date(data.encounter.encounterDate) : new Date(),
                    },
                } : undefined,
                diagnoses: data.diagnoses && data.diagnoses.length > 0 ? {
                    create: data.diagnoses.map((d) => ({
                        code: d.code || null,
                        description: d.description,
                        type: d.type || 'PRIMARY',
                        status: d.status || 'ACTIVE',
                    })),
                } : undefined,
                vitalSigns: data.vitalSigns ? {
                    create: {
                        heightCm: data.vitalSigns.heightCm ?? null,
                        weightKg: data.vitalSigns.weightKg ?? null,
                        bmi: data.vitalSigns.bmi ?? null,
                        systolicBp: data.vitalSigns.systolicBp ?? null,
                        diastolicBp: data.vitalSigns.diastolicBp ?? null,
                        pulseBpm: data.vitalSigns.pulseBpm ?? null,
                        respirationRate: data.vitalSigns.respirationRate ?? null,
                        temperatureC: data.vitalSigns.temperatureC ?? null,
                        bloodSugarMgDl: data.vitalSigns.bloodSugarMgDl ?? null,
                        oxygenSaturation: data.vitalSigns.oxygenSaturation ?? null,
                    },
                } : undefined,
                procedures: data.procedures && data.procedures.length > 0 ? {
                    create: data.procedures.map((p) => ({
                        name: p.name,
                        code: p.code || null,
                        performedAt: p.performedAt ? new Date(p.performedAt) : null,
                        notes: p.notes || null,
                    })),
                } : undefined,
            },
            include: {
                encounters: true,
                diagnoses: true,
                vitalSigns: true,
                procedures: true,
                attachments: { where: { isDeleted: false } },
            },
        }));
    }
    async findRecordById(id, includeDeleted = false) {
        return (await this.db.medicalRecord.findFirst({
            where: { id, ...(includeDeleted ? {} : { isDeleted: false }) },
            include: {
                encounters: true,
                diagnoses: true,
                vitalSigns: true,
                procedures: true,
                attachments: { where: { isDeleted: false } },
            },
        }));
    }
    async findRecordsByProfile(patientProfileId, includeArchived = true) {
        return (await this.db.medicalRecord.findMany({
            where: {
                patientProfileId,
                isDeleted: false,
                ...(includeArchived ? {} : { status: { not: 'ARCHIVED' } }),
            },
            include: {
                encounters: true,
                diagnoses: true,
                vitalSigns: true,
                procedures: true,
                attachments: { where: { isDeleted: false } },
            },
            orderBy: { createdAt: 'desc' },
        }));
    }
    async updateRecord(id, data) {
        return (await this.db.medicalRecord.update({
            where: { id },
            data: {
                title: data.title || undefined,
                chiefComplaint: data.chiefComplaint || undefined,
                clinicalNotes: data.clinicalNotes || undefined,
                treatmentPlan: data.treatmentPlan || undefined,
                followUpInstructions: data.followUpInstructions || undefined,
                status: data.status || undefined,
            },
            include: {
                encounters: true,
                diagnoses: true,
                vitalSigns: true,
                procedures: true,
                attachments: { where: { isDeleted: false } },
            },
        }));
    }
    async softDeleteRecord(id) {
        await this.db.medicalRecord.update({
            where: { id },
            data: { isDeleted: true, deletedAt: new Date() },
        });
    }
    async restoreRecord(id) {
        return (await this.db.medicalRecord.update({
            where: { id },
            data: { isDeleted: false, deletedAt: null, status: 'FINAL' },
            include: {
                encounters: true,
                diagnoses: true,
                vitalSigns: true,
                procedures: true,
                attachments: { where: { isDeleted: false } },
            },
        }));
    }
    async searchRecords(patientProfileId, query) {
        const q = query.toLowerCase();
        return (await this.db.medicalRecord.findMany({
            where: {
                patientProfileId,
                isDeleted: false,
                OR: [
                    { title: { contains: q, mode: 'insensitive' } },
                    { chiefComplaint: { contains: q, mode: 'insensitive' } },
                    { clinicalNotes: { contains: q, mode: 'insensitive' } },
                    { treatmentPlan: { contains: q, mode: 'insensitive' } },
                    { diagnoses: { some: { description: { contains: q, mode: 'insensitive' } } } },
                ],
            },
            include: {
                encounters: true,
                diagnoses: true,
                vitalSigns: true,
                procedures: true,
                attachments: { where: { isDeleted: false } },
            },
            orderBy: { createdAt: 'desc' },
        }));
    }
    async getTimeline(patientProfileId) {
        const records = await this.findRecordsByProfile(patientProfileId, true);
        const attachments = await this.findAttachmentsByProfile(patientProfileId, false);
        const events = [];
        records.forEach((r) => {
            events.push({
                id: r.id,
                eventType: 'MEDICAL_RECORD',
                title: r.title,
                status: r.status,
                date: r.createdAt,
                details: {
                    chiefComplaint: r.chiefComplaint,
                    diagnoses: r.diagnoses?.map((d) => d.description),
                },
            });
        });
        attachments.forEach((a) => {
            events.push({
                id: a.id,
                eventType: 'ATTACHMENT_UPLOAD',
                title: a.originalName,
                category: a.category,
                date: a.createdAt,
                details: {
                    fileSize: a.fileSize,
                    mimeType: a.mimeType,
                    storageUrl: a.storageUrl,
                },
            });
        });
        return events.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    }
    async createAttachment(data) {
        const created = await this.db.medicalAttachment.create({
            data: {
                medicalRecordId: data.medicalRecordId || null,
                patientProfileId: data.patientProfileId,
                fileName: data.fileName,
                originalName: data.originalName,
                fileSize: data.fileSize,
                mimeType: data.mimeType,
                category: data.category || 'OTHER',
                storageKey: data.storageKey,
                storageUrl: data.storageUrl,
                checksum: data.checksum || null,
                virusScanStatus: data.virusScanStatus || 'CLEAN',
                version: 1,
            },
        });
        await this.createAttachmentVersion({
            attachmentId: created.id,
            version: 1,
            storageKey: data.storageKey,
            storageUrl: data.storageUrl,
            fileSize: data.fileSize,
            createdById: data.createdById || null,
        });
        return created;
    }
    async findAttachmentById(id, includeDeleted = false) {
        return (await this.db.medicalAttachment.findFirst({
            where: { id, ...(includeDeleted ? {} : { isDeleted: false }) },
        }));
    }
    async findAttachmentsByRecord(medicalRecordId, includeDeleted = false) {
        return (await this.db.medicalAttachment.findMany({
            where: { medicalRecordId, ...(includeDeleted ? {} : { isDeleted: false }) },
            orderBy: { createdAt: 'desc' },
        }));
    }
    async findAttachmentsByProfile(patientProfileId, includeDeleted = false) {
        return (await this.db.medicalAttachment.findMany({
            where: { patientProfileId, ...(includeDeleted ? {} : { isDeleted: false }) },
            orderBy: { createdAt: 'desc' },
        }));
    }
    async updateAttachment(id, data) {
        const existing = await this.findAttachmentById(id);
        if (!existing)
            throw new Error('Attachment not found');
        const newVersion = data.storageKey ? existing.version + 1 : existing.version;
        const updated = await this.db.medicalAttachment.update({
            where: { id },
            data: {
                category: data.category || undefined,
                fileName: data.fileName || undefined,
                originalName: data.originalName || undefined,
                fileSize: data.fileSize || undefined,
                mimeType: data.mimeType || undefined,
                storageKey: data.storageKey || undefined,
                storageUrl: data.storageUrl || undefined,
                version: newVersion,
            },
        });
        if (data.storageKey) {
            await this.createAttachmentVersion({
                attachmentId: id,
                version: newVersion,
                storageKey: data.storageKey,
                storageUrl: data.storageUrl,
                fileSize: data.fileSize || existing.fileSize,
                createdById: data.createdById || null,
            });
        }
        return updated;
    }
    async softDeleteAttachment(id) {
        await this.db.medicalAttachment.update({
            where: { id },
            data: { isDeleted: true, deletedAt: new Date() },
        });
    }
    async restoreAttachment(id) {
        return (await this.db.medicalAttachment.update({
            where: { id },
            data: { isDeleted: false, deletedAt: null },
        }));
    }
    async createAttachmentVersion(data) {
        return (await this.db.attachmentVersion.create({
            data: {
                attachmentId: data.attachmentId,
                version: data.version,
                storageKey: data.storageKey,
                storageUrl: data.storageUrl,
                fileSize: data.fileSize,
                createdById: data.createdById || null,
            },
        }));
    }
    async findAttachmentVersions(attachmentId) {
        return (await this.db.attachmentVersion.findMany({
            where: { attachmentId },
            orderBy: { version: 'desc' },
        }));
    }
    async createAuditLog(data) {
        return (await this.db.medicalRecordAuditLog.create({
            data: {
                medicalRecordId: data.medicalRecordId || null,
                attachmentId: data.attachmentId || null,
                action: data.action,
                performedBy: data.performedBy || null,
                details: data.details || null,
            },
        }));
    }
};
exports.MedicalRecordRepository = MedicalRecordRepository;
exports.MedicalRecordRepository = MedicalRecordRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [database_service_1.DatabaseService])
], MedicalRecordRepository);
//# sourceMappingURL=medical-record.repository.js.map
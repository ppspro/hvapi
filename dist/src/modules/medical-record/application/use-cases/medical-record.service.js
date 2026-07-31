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
exports.MedicalRecordService = void 0;
const common_1 = require("@nestjs/common");
const ALLOWED_MIME_TYPES = [
    'image/jpeg',
    'image/png',
    'image/webp',
    'application/pdf',
    'application/dicom',
    'image/tiff',
];
const MAX_FILE_SIZE = 15 * 1024 * 1024;
const qr_service_1 = require("../../../qr/application/use-cases/qr.service");
let MedicalRecordService = class MedicalRecordService {
    constructor(repository, qrService) {
        this.repository = repository;
        this.qrService = qrService;
    }
    async resolveProfile(userId) {
        const profile = await this.repository.findProfileByUserId(userId);
        if (!profile) {
            throw new common_1.NotFoundException('Patient profile not found. Please complete registration first.');
        }
        return profile.id;
    }
    calculateBmi(heightCm, weightKg) {
        if (heightCm && weightKg && heightCm > 0) {
            const heightM = heightCm / 100;
            return Math.round((weightKg / (heightM * heightM)) * 10) / 10;
        }
        return undefined;
    }
    sanitizeFilename(filename) {
        return filename.replace(/[^a-zA-Z0-9._-]/g, '_');
    }
    mapRecord(r) {
        return {
            id: r.id,
            patientProfileId: r.patientProfileId,
            title: r.title,
            chiefComplaint: r.chiefComplaint || undefined,
            clinicalNotes: r.clinicalNotes || undefined,
            treatmentPlan: r.treatmentPlan || undefined,
            followUpInstructions: r.followUpInstructions || undefined,
            status: r.status,
            isDeleted: r.isDeleted,
            deletedAt: r.deletedAt?.toISOString() || undefined,
            encounters: r.encounters || [],
            diagnoses: r.diagnoses || [],
            vitalSigns: r.vitalSigns || [],
            procedures: r.procedures || [],
            attachments: r.attachments?.map((a) => this.mapAttachment(a)) || [],
            createdAt: r.createdAt.toISOString(),
            updatedAt: r.updatedAt.toISOString(),
        };
    }
    mapAttachment(a) {
        return {
            id: a.id,
            medicalRecordId: a.medicalRecordId || undefined,
            patientProfileId: a.patientProfileId,
            fileName: a.fileName,
            originalName: a.originalName,
            fileSize: a.fileSize,
            mimeType: a.mimeType,
            category: a.category,
            storageKey: a.storageKey,
            storageUrl: a.storageUrl,
            checksum: a.checksum || undefined,
            version: a.version,
            isDeleted: a.isDeleted,
            virusScanStatus: a.virusScanStatus,
            createdAt: a.createdAt.toISOString(),
            updatedAt: a.updatedAt.toISOString(),
        };
    }
    async createRecord(userId, dto) {
        const profileId = await this.resolveProfile(userId);
        if (dto.vitalSigns && dto.vitalSigns.heightCm && dto.vitalSigns.weightKg) {
            dto.vitalSigns.bmi = this.calculateBmi(dto.vitalSigns.heightCm, dto.vitalSigns.weightKg);
        }
        const record = await this.repository.createRecord(profileId, {
            ...dto,
            createdById: userId,
        });
        await this.repository.createAuditLog({
            medicalRecordId: record.id,
            action: 'CREATED',
            performedBy: userId,
            details: `Created medical record: ${record.title}`,
        });
        return this.mapRecord(record);
    }
    async getRecords(userId) {
        const profileId = await this.resolveProfile(userId);
        const records = await this.repository.findRecordsByProfile(profileId, true);
        return records.map((r) => this.mapRecord(r));
    }
    async getRecordById(userId, recordId) {
        const profileId = await this.resolveProfile(userId);
        const record = await this.repository.findRecordById(recordId);
        if (!record)
            throw new common_1.NotFoundException('Medical record not found');
        if (record.patientProfileId !== profileId)
            throw new common_1.ForbiddenException('Access denied');
        return this.mapRecord(record);
    }
    async updateRecord(userId, recordId, dto) {
        const profileId = await this.resolveProfile(userId);
        const record = await this.repository.findRecordById(recordId);
        if (!record)
            throw new common_1.NotFoundException('Medical record not found');
        if (record.patientProfileId !== profileId)
            throw new common_1.ForbiddenException('Access denied');
        if (record.status === 'ARCHIVED') {
            throw new common_1.BadRequestException('Archived medical records are immutable and cannot be updated. Restore it first.');
        }
        const updated = await this.repository.updateRecord(recordId, dto);
        await this.repository.createAuditLog({
            medicalRecordId: recordId,
            action: 'UPDATED',
            performedBy: userId,
            details: `Updated medical record fields`,
        });
        return this.mapRecord(updated);
    }
    async softDeleteRecord(userId, recordId) {
        const profileId = await this.resolveProfile(userId);
        const record = await this.repository.findRecordById(recordId);
        if (!record)
            throw new common_1.NotFoundException('Medical record not found');
        if (record.patientProfileId !== profileId)
            throw new common_1.ForbiddenException('Access denied');
        await this.repository.softDeleteRecord(recordId);
        await this.repository.createAuditLog({
            medicalRecordId: recordId,
            action: 'SOFT_DELETED',
            performedBy: userId,
        });
        return { message: 'Medical record soft-deleted successfully' };
    }
    async archiveRecord(userId, recordId) {
        const profileId = await this.resolveProfile(userId);
        const record = await this.repository.findRecordById(recordId);
        if (!record)
            throw new common_1.NotFoundException('Medical record not found');
        if (record.patientProfileId !== profileId)
            throw new common_1.ForbiddenException('Access denied');
        if (record.status === 'ARCHIVED')
            throw new common_1.BadRequestException('Record is already archived');
        const updated = await this.repository.updateRecord(recordId, { status: 'ARCHIVED' });
        await this.repository.createAuditLog({
            medicalRecordId: recordId,
            action: 'ARCHIVED',
            performedBy: userId,
        });
        return this.mapRecord(updated);
    }
    async restoreRecord(userId, recordId) {
        const profileId = await this.resolveProfile(userId);
        const record = await this.repository.findRecordById(recordId, true);
        if (!record)
            throw new common_1.NotFoundException('Medical record not found');
        if (record.patientProfileId !== profileId)
            throw new common_1.ForbiddenException('Access denied');
        if (!record.isDeleted && record.status !== 'ARCHIVED') {
            throw new common_1.BadRequestException('Record is not deleted or archived');
        }
        const restored = await this.repository.restoreRecord(recordId);
        await this.repository.createAuditLog({
            medicalRecordId: recordId,
            action: 'RESTORED',
            performedBy: userId,
        });
        return this.mapRecord(restored);
    }
    async searchRecords(userId, query) {
        const profileId = await this.resolveProfile(userId);
        if (!query || query.trim().length === 0) {
            return this.getRecords(userId);
        }
        const records = await this.repository.searchRecords(profileId, query.trim());
        return records.map((r) => this.mapRecord(r));
    }
    async getTimeline(userId) {
        const profileId = await this.resolveProfile(userId);
        const rawEvents = await this.repository.getTimeline(profileId);
        return rawEvents.map((e) => ({
            id: e.id,
            eventType: e.eventType,
            title: e.title,
            status: e.status || undefined,
            category: e.category || undefined,
            date: new Date(e.date).toISOString(),
            details: e.details,
        }));
    }
    async uploadAttachment(userId, recordId, dto) {
        const profileId = await this.resolveProfile(userId);
        if (!ALLOWED_MIME_TYPES.includes(dto.mimeType.toLowerCase())) {
            throw new common_1.BadRequestException(`MIME type '${dto.mimeType}' is not supported. Allowed: ${ALLOWED_MIME_TYPES.join(', ')}`);
        }
        if (dto.fileSize > MAX_FILE_SIZE) {
            throw new common_1.BadRequestException(`File size exceeds maximum limit of 15MB (${dto.fileSize} bytes provided).`);
        }
        if (recordId) {
            const record = await this.repository.findRecordById(recordId);
            if (!record)
                throw new common_1.NotFoundException('Target medical record not found');
            if (record.patientProfileId !== profileId)
                throw new common_1.ForbiddenException('Access denied');
        }
        const sanitizedFileName = this.sanitizeFilename(dto.fileName);
        const attachment = await this.repository.createAttachment({
            medicalRecordId: recordId,
            patientProfileId: profileId,
            fileName: sanitizedFileName,
            originalName: dto.originalName,
            fileSize: dto.fileSize,
            mimeType: dto.mimeType,
            category: dto.category || 'OTHER',
            storageKey: dto.storageKey,
            storageUrl: dto.storageUrl,
            checksum: dto.checksum,
            virusScanStatus: 'CLEAN',
            createdById: userId,
        });
        await this.repository.createAuditLog({
            medicalRecordId: recordId || undefined,
            attachmentId: attachment.id,
            action: 'ATTACHMENT_UPLOADED',
            performedBy: userId,
            details: `Uploaded attachment: ${sanitizedFileName}`,
        });
        return this.mapAttachment(attachment);
    }
    async getRecordAttachments(userId, recordId) {
        const profileId = await this.resolveProfile(userId);
        const record = await this.repository.findRecordById(recordId);
        if (!record)
            throw new common_1.NotFoundException('Medical record not found');
        if (record.patientProfileId !== profileId)
            throw new common_1.ForbiddenException('Access denied');
        const attachments = await this.repository.findAttachmentsByRecord(recordId);
        return attachments.map((a) => this.mapAttachment(a));
    }
    async getAttachmentById(userId, attachmentId) {
        const profileId = await this.resolveProfile(userId);
        const attachment = await this.repository.findAttachmentById(attachmentId);
        if (!attachment)
            throw new common_1.NotFoundException('Attachment not found');
        if (attachment.patientProfileId !== profileId)
            throw new common_1.ForbiddenException('Access denied');
        return this.mapAttachment(attachment);
    }
    async updateAttachment(userId, attachmentId, dto) {
        const profileId = await this.resolveProfile(userId);
        const attachment = await this.repository.findAttachmentById(attachmentId);
        if (!attachment)
            throw new common_1.NotFoundException('Attachment not found');
        if (attachment.patientProfileId !== profileId)
            throw new common_1.ForbiddenException('Access denied');
        const updated = await this.repository.updateAttachment(attachmentId, {
            ...dto,
            createdById: userId,
        });
        await this.repository.createAuditLog({
            attachmentId,
            action: 'ATTACHMENT_UPDATED',
            performedBy: userId,
            details: dto.storageKey ? 'Uploaded new attachment version' : 'Updated attachment metadata',
        });
        return this.mapAttachment(updated);
    }
    async softDeleteAttachment(userId, attachmentId) {
        const profileId = await this.resolveProfile(userId);
        const attachment = await this.repository.findAttachmentById(attachmentId);
        if (!attachment)
            throw new common_1.NotFoundException('Attachment not found');
        if (attachment.patientProfileId !== profileId)
            throw new common_1.ForbiddenException('Access denied');
        await this.repository.softDeleteAttachment(attachmentId);
        await this.repository.createAuditLog({
            attachmentId,
            action: 'ATTACHMENT_DELETED',
            performedBy: userId,
        });
        return { message: 'Attachment soft-deleted successfully' };
    }
    async restoreAttachment(userId, attachmentId) {
        const profileId = await this.resolveProfile(userId);
        const attachment = await this.repository.findAttachmentById(attachmentId, true);
        if (!attachment)
            throw new common_1.NotFoundException('Attachment not found');
        if (attachment.patientProfileId !== profileId)
            throw new common_1.ForbiddenException('Access denied');
        if (!attachment.isDeleted)
            throw new common_1.BadRequestException('Attachment is not deleted');
        const restored = await this.repository.restoreAttachment(attachmentId);
        await this.repository.createAuditLog({
            attachmentId,
            action: 'ATTACHMENT_RESTORED',
            performedBy: userId,
        });
        return this.mapAttachment(restored);
    }
    async getAttachmentVersions(userId, attachmentId) {
        const profileId = await this.resolveProfile(userId);
        const attachment = await this.repository.findAttachmentById(attachmentId, true);
        if (!attachment)
            throw new common_1.NotFoundException('Attachment not found');
        if (attachment.patientProfileId !== profileId)
            throw new common_1.ForbiddenException('Access denied');
        const versions = await this.repository.findAttachmentVersions(attachmentId);
        return versions.map((v) => ({
            id: v.id,
            attachmentId: v.attachmentId,
            version: v.version,
            storageKey: v.storageKey,
            storageUrl: v.storageUrl,
            fileSize: v.fileSize,
            createdById: v.createdById || undefined,
            createdAt: v.createdAt.toISOString(),
        }));
    }
};
exports.MedicalRecordService = MedicalRecordService;
exports.MedicalRecordService = MedicalRecordService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('IMedicalRecordRepository')),
    __metadata("design:paramtypes", [Object, qr_service_1.QrService])
], MedicalRecordService);
//# sourceMappingURL=medical-record.service.js.map
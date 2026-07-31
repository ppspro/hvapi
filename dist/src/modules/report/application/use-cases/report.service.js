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
exports.ReportService = void 0;
const common_1 = require("@nestjs/common");
const nestjs_pino_1 = require("nestjs-pino");
const ALLOWED_REPORT_MIME_TYPES = [
    'application/pdf',
    'image/jpeg',
    'image/png',
    'image/webp',
    'image/tiff',
    'application/dicom',
];
const qr_service_1 = require("../../../qr/application/use-cases/qr.service");
let ReportService = class ReportService {
    constructor(repository, qrService, logger) {
        this.repository = repository;
        this.qrService = qrService;
        this.logger = logger;
    }
    async resolveProfile(userId) {
        const profile = await this.repository.findProfileByUserId(userId);
        if (!profile) {
            throw new common_1.NotFoundException('Patient profile not found. Please complete registration first.');
        }
        return profile.id;
    }
    mapReport(r) {
        return {
            id: r.id,
            patientProfileId: r.patientProfileId,
            title: r.title,
            description: r.description || undefined,
            category: r.category,
            status: r.status,
            reportDate: r.reportDate ? new Date(r.reportDate).toISOString().split('T')[0] : undefined,
            prescribedBy: r.prescribedBy || undefined,
            providerName: r.providerName || undefined,
            facilityName: r.facilityName || undefined,
            doctorName: r.doctorName || undefined,
            pageCount: r.pageCount || 1,
            language: r.language || 'en',
            tags: r.tags || [],
            notes: r.notes || undefined,
            verificationStatus: r.verificationStatus,
            verifiedBy: r.verifiedBy || undefined,
            verifiedAt: r.verifiedAt?.toISOString() || undefined,
            currentVersion: r.currentVersion || 1,
            isDeleted: r.isDeleted,
            attachments: r.attachments?.map((a) => ({
                id: a.id,
                fileName: a.fileName,
                originalName: a.originalName || undefined,
                fileSize: a.fileSize,
                mimeType: a.mimeType,
                storageKey: a.storageKey || undefined,
                storageUrl: a.storageUrl,
                checksum: a.checksum || undefined,
                createdAt: a.createdAt.toISOString(),
            })) || [],
            versions: r.versions?.map((v) => this.mapVersion(v)),
            createdAt: r.createdAt.toISOString(),
            updatedAt: r.updatedAt.toISOString(),
        };
    }
    mapVersion(v) {
        return {
            id: v.id,
            medicalReportId: v.medicalReportId,
            version: v.version,
            fileName: v.fileName,
            storageKey: v.storageKey || undefined,
            storageUrl: v.storageUrl,
            fileSize: v.fileSize,
            mimeType: v.mimeType,
            createdById: v.createdById || undefined,
            createdAt: v.createdAt.toISOString(),
        };
    }
    async uploadReport(userId, dto) {
        const profileId = await this.resolveProfile(userId);
        if (!ALLOWED_REPORT_MIME_TYPES.includes(dto.mimeType.toLowerCase())) {
            throw new common_1.BadRequestException(`File type '${dto.mimeType}' is not supported for diagnostic reports. Allowed: PDF, Images, DICOM.`);
        }
        const report = await this.repository.createReport({
            patientProfileId: profileId,
            title: dto.title,
            description: dto.description,
            category: dto.category || 'LAB',
            status: 'UPLOADED',
            reportDate: dto.reportDate,
            prescribedBy: dto.prescribedBy,
            providerName: dto.providerName,
            facilityName: dto.facilityName,
            doctorName: dto.doctorName,
            pageCount: dto.pageCount || 1,
            language: dto.language || 'en',
            tags: dto.tags || [],
            notes: dto.notes,
            fileName: dto.fileName,
            originalName: dto.fileName,
            fileSize: dto.fileSize,
            mimeType: dto.mimeType,
            storageKey: dto.storageKey,
            storageUrl: dto.storageUrl,
            checksum: dto.checksum,
            createdById: userId,
        });
        await this.repository.createAuditLog({
            medicalReportId: report.id,
            action: 'UPLOADED',
            performedBy: userId,
            details: `Uploaded report: ${report.title} (${dto.fileName})`,
        });
        this.logger.log({ msg: 'Report uploaded successfully', reportId: report.id, userId });
        return this.mapReport(report);
    }
    async getReportsList(userId, category) {
        const profileId = await this.resolveProfile(userId);
        const reports = await this.repository.findReportsByProfile(profileId, category);
        return reports.map((r) => this.mapReport(r));
    }
    async getReportDetails(userId, reportId) {
        const profileId = await this.resolveProfile(userId);
        const report = await this.repository.findReportById(reportId);
        if (!report)
            throw new common_1.NotFoundException('Medical report not found');
        if (report.patientProfileId !== profileId)
            throw new common_1.ForbiddenException('Access denied');
        return this.mapReport(report);
    }
    async updateReport(userId, reportId, dto) {
        const profileId = await this.resolveProfile(userId);
        const report = await this.repository.findReportById(reportId);
        if (!report)
            throw new common_1.NotFoundException('Medical report not found');
        if (report.patientProfileId !== profileId)
            throw new common_1.ForbiddenException('Access denied');
        if (report.status === 'ARCHIVED') {
            throw new common_1.BadRequestException('Archived reports are read-only. Restore the report before updating.');
        }
        const updated = await this.repository.updateReport(reportId, dto);
        await this.repository.createAuditLog({
            medicalReportId: reportId,
            action: 'UPDATED',
            performedBy: userId,
            details: 'Updated report metadata',
        });
        return this.mapReport(updated);
    }
    async softDeleteReport(userId, reportId) {
        const profileId = await this.resolveProfile(userId);
        const report = await this.repository.findReportById(reportId);
        if (!report)
            throw new common_1.NotFoundException('Medical report not found');
        if (report.patientProfileId !== profileId)
            throw new common_1.ForbiddenException('Access denied');
        await this.repository.softDeleteReport(reportId);
        await this.repository.createAuditLog({
            medicalReportId: reportId,
            action: 'SOFT_DELETED',
            performedBy: userId,
        });
        return { message: 'Report soft-deleted successfully' };
    }
    async archiveReport(userId, reportId) {
        const profileId = await this.resolveProfile(userId);
        const report = await this.repository.findReportById(reportId);
        if (!report)
            throw new common_1.NotFoundException('Medical report not found');
        if (report.patientProfileId !== profileId)
            throw new common_1.ForbiddenException('Access denied');
        if (report.status === 'ARCHIVED')
            throw new common_1.BadRequestException('Report is already archived');
        const updated = await this.repository.updateReport(reportId, { status: 'ARCHIVED' });
        await this.repository.createAuditLog({
            medicalReportId: reportId,
            action: 'ARCHIVED',
            performedBy: userId,
        });
        return this.mapReport(updated);
    }
    async restoreReport(userId, reportId) {
        const profileId = await this.resolveProfile(userId);
        const report = await this.repository.findReportById(reportId, true);
        if (!report)
            throw new common_1.NotFoundException('Medical report not found');
        if (report.patientProfileId !== profileId)
            throw new common_1.ForbiddenException('Access denied');
        if (!report.isDeleted && report.status !== 'ARCHIVED') {
            throw new common_1.BadRequestException('Report is not deleted or archived');
        }
        const restored = await this.repository.restoreReport(reportId);
        await this.repository.createAuditLog({
            medicalReportId: reportId,
            action: 'RESTORED',
            performedBy: userId,
        });
        return this.mapReport(restored);
    }
    async replaceReportFile(userId, reportId, dto) {
        const profileId = await this.resolveProfile(userId);
        const report = await this.repository.findReportById(reportId);
        if (!report)
            throw new common_1.NotFoundException('Medical report not found');
        if (report.patientProfileId !== profileId)
            throw new common_1.ForbiddenException('Access denied');
        if (report.status === 'ARCHIVED') {
            throw new common_1.BadRequestException('Archived reports cannot be replaced. Restore the report first.');
        }
        const newVersionNumber = report.currentVersion + 1;
        await this.repository.createAttachment(reportId, {
            fileName: dto.fileName,
            originalName: dto.fileName,
            fileSize: dto.fileSize,
            mimeType: dto.mimeType,
            storageKey: dto.storageKey,
            storageUrl: dto.storageUrl,
        });
        await this.repository.createReportVersion({
            medicalReportId: reportId,
            version: newVersionNumber,
            fileName: dto.fileName,
            storageKey: dto.storageKey,
            storageUrl: dto.storageUrl,
            fileSize: dto.fileSize,
            mimeType: dto.mimeType,
            createdById: userId,
        });
        const updated = await this.repository.updateReport(reportId, {
            currentVersion: newVersionNumber,
        });
        await this.repository.createAuditLog({
            medicalReportId: reportId,
            action: 'REPLACED',
            performedBy: userId,
            details: `Replaced report PDF with version ${newVersionNumber} (${dto.fileName})`,
        });
        return this.mapReport(updated);
    }
    async getReportVersions(userId, reportId) {
        const profileId = await this.resolveProfile(userId);
        const report = await this.repository.findReportById(reportId, true);
        if (!report)
            throw new common_1.NotFoundException('Medical report not found');
        if (report.patientProfileId !== profileId)
            throw new common_1.ForbiddenException('Access denied');
        const versions = await this.repository.findReportVersions(reportId);
        return versions.map((v) => this.mapVersion(v));
    }
    async verifyReport(userId, reportId, dto) {
        const profileId = await this.resolveProfile(userId);
        const report = await this.repository.findReportById(reportId);
        if (!report)
            throw new common_1.NotFoundException('Medical report not found');
        if (report.patientProfileId !== profileId)
            throw new common_1.ForbiddenException('Access denied');
        const updated = await this.repository.updateReport(reportId, {
            status: 'VERIFIED',
            verificationStatus: 'VERIFIED',
            verifiedBy: userId,
            verifiedAt: new Date(),
            notes: dto.notes ? `${report.notes || ''}\n[Verification Note]: ${dto.notes}`.trim() : report.notes,
        });
        await this.repository.createAuditLog({
            medicalReportId: reportId,
            action: 'VERIFIED',
            performedBy: userId,
            details: `Report marked as VERIFIED: ${dto.notes || 'No notes'}`,
        });
        return this.mapReport(updated);
    }
    async searchReports(userId, query) {
        const profileId = await this.resolveProfile(userId);
        if (!query || query.trim().length === 0) {
            return this.getReportsList(userId);
        }
        const reports = await this.repository.searchReports(profileId, query.trim());
        return reports.map((r) => this.mapReport(r));
    }
    async getCategories(userId) {
        const profileId = await this.resolveProfile(userId);
        const counts = await this.repository.getCategoriesCount(profileId);
        return { categories: counts };
    }
    async getTimeline(userId) {
        const profileId = await this.resolveProfile(userId);
        return this.repository.getTimeline(profileId);
    }
    async getDownloadToken(userId, reportId) {
        const profileId = await this.resolveProfile(userId);
        const report = await this.repository.findReportById(reportId);
        if (!report)
            throw new common_1.NotFoundException('Medical report not found');
        if (report.patientProfileId !== profileId)
            throw new common_1.ForbiddenException('Access denied');
        const attachment = report.attachments?.[0];
        const storageUrl = attachment?.storageUrl || 'https://cdn.hvapi.com/reports/sample.pdf';
        const token = `dl_token_${Date.now()}_${reportId.slice(0, 8)}`;
        const expiresAt = new Date(Date.now() + 15 * 60 * 1000).toISOString();
        return {
            downloadUrl: `${storageUrl}?token=${token}`,
            token,
            expiresAt,
        };
    }
    async getPreviewMetadata(userId, reportId) {
        const profileId = await this.resolveProfile(userId);
        const report = await this.repository.findReportById(reportId);
        if (!report)
            throw new common_1.NotFoundException('Medical report not found');
        if (report.patientProfileId !== profileId)
            throw new common_1.ForbiddenException('Access denied');
        const attachment = report.attachments?.[0];
        return {
            id: report.id,
            title: report.title,
            fileName: attachment?.fileName || 'report.pdf',
            fileSize: attachment?.fileSize || 524288,
            mimeType: attachment?.mimeType || 'application/pdf',
            pageCount: report.pageCount || 1,
            language: report.language || 'en',
            storageUrl: attachment?.storageUrl || 'https://cdn.hvapi.com/reports/sample.pdf',
            isPdf: (attachment?.mimeType || 'application/pdf').toLowerCase() === 'application/pdf',
            verificationStatus: report.verificationStatus,
        };
    }
};
exports.ReportService = ReportService;
exports.ReportService = ReportService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('IReportRepository')),
    __metadata("design:paramtypes", [Object, qr_service_1.QrService,
        nestjs_pino_1.Logger])
], ReportService);
//# sourceMappingURL=report.service.js.map
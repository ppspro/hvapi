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
exports.ReportRepository = void 0;
const common_1 = require("@nestjs/common");
const database_service_1 = require("../../../../database/database.service");
let ReportRepository = class ReportRepository {
    constructor(db) {
        this.db = db;
    }
    async findProfileByUserId(userId) {
        return this.db.patientProfile.findUnique({ where: { userId }, select: { id: true } });
    }
    async createReport(data) {
        const report = await this.db.medicalReport.create({
            data: {
                patientProfileId: data.patientProfileId,
                title: data.title,
                description: data.description || null,
                category: data.category || 'LAB',
                status: data.status || 'UPLOADED',
                reportDate: data.reportDate ? new Date(data.reportDate) : new Date(),
                prescribedBy: data.prescribedBy || null,
                providerName: data.providerName || null,
                facilityName: data.facilityName || null,
                doctorName: data.doctorName || null,
                pageCount: data.pageCount || 1,
                language: data.language || 'en',
                tags: data.tags || [],
                notes: data.notes || null,
                currentVersion: 1,
                attachments: data.fileName ? {
                    create: {
                        fileName: data.fileName,
                        originalName: data.originalName || data.fileName,
                        fileSize: data.fileSize,
                        mimeType: data.mimeType,
                        storageKey: data.storageKey || null,
                        storageUrl: data.storageUrl,
                        checksum: data.checksum || null,
                    },
                } : undefined,
            },
            include: { attachments: true, versions: true },
        });
        await this.createReportVersion({
            medicalReportId: report.id,
            version: 1,
            fileName: data.fileName,
            storageKey: data.storageKey || null,
            storageUrl: data.storageUrl,
            fileSize: data.fileSize,
            mimeType: data.mimeType,
            createdById: data.createdById || null,
        });
        return report;
    }
    async findReportById(id, includeDeleted = false) {
        return (await this.db.medicalReport.findFirst({
            where: { id, ...(includeDeleted ? {} : { isDeleted: false }) },
            include: { attachments: true, versions: { orderBy: { version: 'desc' } } },
        }));
    }
    async findReportsByProfile(patientProfileId, category) {
        return (await this.db.medicalReport.findMany({
            where: {
                patientProfileId,
                isDeleted: false,
                ...(category ? { category: category } : {}),
            },
            include: { attachments: true, versions: true },
            orderBy: { createdAt: 'desc' },
        }));
    }
    async updateReport(id, data) {
        return (await this.db.medicalReport.update({
            where: { id },
            data: {
                title: data.title || undefined,
                description: data.description || undefined,
                category: data.category || undefined,
                status: data.status || undefined,
                reportDate: data.reportDate ? new Date(data.reportDate) : undefined,
                prescribedBy: data.prescribedBy || undefined,
                providerName: data.providerName || undefined,
                facilityName: data.facilityName || undefined,
                doctorName: data.doctorName || undefined,
                pageCount: data.pageCount || undefined,
                language: data.language || undefined,
                tags: data.tags || undefined,
                notes: data.notes || undefined,
                verificationStatus: data.verificationStatus || undefined,
                verifiedBy: data.verifiedBy || undefined,
                verifiedAt: data.verifiedAt ? new Date(data.verifiedAt) : undefined,
                currentVersion: data.currentVersion || undefined,
            },
            include: { attachments: true, versions: true },
        }));
    }
    async softDeleteReport(id) {
        await this.db.medicalReport.update({
            where: { id },
            data: { isDeleted: true, deletedAt: new Date() },
        });
    }
    async restoreReport(id) {
        return (await this.db.medicalReport.update({
            where: { id },
            data: { isDeleted: false, deletedAt: null, status: 'UPLOADED' },
            include: { attachments: true, versions: true },
        }));
    }
    async searchReports(patientProfileId, query) {
        const q = query.toLowerCase();
        return (await this.db.medicalReport.findMany({
            where: {
                patientProfileId,
                isDeleted: false,
                OR: [
                    { title: { contains: q, mode: 'insensitive' } },
                    { description: { contains: q, mode: 'insensitive' } },
                    { providerName: { contains: q, mode: 'insensitive' } },
                    { doctorName: { contains: q, mode: 'insensitive' } },
                    { notes: { contains: q, mode: 'insensitive' } },
                    { tags: { has: q } },
                ],
            },
            include: { attachments: true, versions: true },
            orderBy: { createdAt: 'desc' },
        }));
    }
    async getCategoriesCount(patientProfileId) {
        const reports = await this.db.medicalReport.findMany({
            where: { patientProfileId, isDeleted: false },
            select: { category: true },
        });
        const counts = {
            LAB: 0, RADIOLOGY: 0, PRESCRIPTION: 0, REFERRAL: 0,
            DISCHARGE: 0, VACCINATION: 0, CLINICAL_NOTES: 0, INSURANCE: 0, CUSTOM: 0,
        };
        reports.forEach((r) => {
            counts[r.category] = (counts[r.category] || 0) + 1;
        });
        return counts;
    }
    async getTimeline(patientProfileId) {
        const reports = await this.findReportsByProfile(patientProfileId);
        return reports.map((r) => ({
            id: r.id,
            title: r.title,
            category: r.category,
            status: r.status,
            reportDate: r.reportDate || r.createdAt,
            pageCount: r.pageCount,
            verificationStatus: r.verificationStatus,
            createdAt: r.createdAt,
        })).sort((a, b) => new Date(b.reportDate).getTime() - new Date(a.reportDate).getTime());
    }
    async createAttachment(reportId, data) {
        return (await this.db.reportAttachment.create({
            data: {
                medicalReportId: reportId,
                fileName: data.fileName,
                originalName: data.originalName || data.fileName,
                fileSize: data.fileSize,
                mimeType: data.mimeType,
                storageKey: data.storageKey || null,
                storageUrl: data.storageUrl,
                checksum: data.checksum || null,
            },
        }));
    }
    async createReportVersion(data) {
        return (await this.db.reportVersion.create({
            data: {
                medicalReportId: data.medicalReportId,
                version: data.version,
                fileName: data.fileName,
                storageKey: data.storageKey || null,
                storageUrl: data.storageUrl,
                fileSize: data.fileSize,
                mimeType: data.mimeType,
                createdById: data.createdById || null,
            },
        }));
    }
    async findReportVersions(medicalReportId) {
        return (await this.db.reportVersion.findMany({
            where: { medicalReportId },
            orderBy: { version: 'desc' },
        }));
    }
    async createAuditLog(data) {
        return (await this.db.reportAuditLog.create({
            data: {
                medicalReportId: data.medicalReportId,
                action: data.action,
                performedBy: data.performedBy || null,
                details: data.details || null,
            },
        }));
    }
};
exports.ReportRepository = ReportRepository;
exports.ReportRepository = ReportRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [database_service_1.DatabaseService])
], ReportRepository);
//# sourceMappingURL=report.repository.js.map
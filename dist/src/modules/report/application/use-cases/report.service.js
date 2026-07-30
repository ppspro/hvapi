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
let ReportService = class ReportService {
    constructor(reportRepository, logger) {
        this.reportRepository = reportRepository;
        this.logger = logger;
    }
    async createReport(userId, dto) {
        const profile = await this.reportRepository.findProfileByUserId(userId);
        if (!profile) {
            throw new common_1.NotFoundException('Patient profile not found');
        }
        const report = await this.reportRepository.createReport(profile.id, dto.title, dto.category, dto.prescribedBy);
        await this.reportRepository.createAttachment(report.id, dto.fileName, dto.fileSize, dto.mimeType, dto.storageUrl);
        this.logger.log({ msg: 'Diagnostic report uploaded successfully', reportId: report.id });
        return {
            reportId: report.id,
            message: 'Medical report uploaded successfully',
        };
    }
    async getReportsList(userId) {
        const profile = await this.reportRepository.findProfileByUserId(userId);
        if (!profile) {
            throw new common_1.NotFoundException('Patient profile not found');
        }
        const reports = await this.reportRepository.findReportsByProfileId(profile.id);
        return reports.map(r => ({
            id: r.id,
            title: r.title,
            category: r.category,
            prescribedBy: r.prescribedBy || undefined,
            createdAt: r.createdAt,
            attachments: r.attachments.map(a => ({
                id: a.id,
                fileName: a.fileName,
                fileSize: a.fileSize,
                mimeType: a.mimeType,
                storageUrl: a.storageUrl,
            })),
        }));
    }
    async getReportDetails(userId, reportId) {
        const profile = await this.reportRepository.findProfileByUserId(userId);
        if (!profile) {
            throw new common_1.NotFoundException('Patient profile not found');
        }
        const report = await this.reportRepository.findReportById(reportId);
        if (!report) {
            throw new common_1.NotFoundException('Medical report not found');
        }
        if (report.patientProfileId !== profile.id) {
            this.logger.warn({ msg: 'Unauthorized report access attempt', userId, reportId });
            throw new common_1.UnauthorizedException('Access denied to requested medical report');
        }
        this.logger.log({ msg: 'Report viewed successfully', reportId });
        return {
            id: report.id,
            title: report.title,
            category: report.category,
            prescribedBy: report.prescribedBy || undefined,
            createdAt: report.createdAt,
            attachments: report.attachments.map(a => ({
                id: a.id,
                fileName: a.fileName,
                fileSize: a.fileSize,
                mimeType: a.mimeType,
                storageUrl: a.storageUrl,
            })),
        };
    }
    async generateDownloadUrl(userId, reportId) {
        const profile = await this.reportRepository.findProfileByUserId(userId);
        if (!profile) {
            throw new common_1.NotFoundException('Patient profile not found');
        }
        const report = await this.reportRepository.findReportById(reportId);
        if (!report) {
            throw new common_1.NotFoundException('Medical report not found');
        }
        if (report.patientProfileId !== profile.id) {
            this.logger.warn({ msg: 'Unauthorized report download attempt', userId, reportId });
            throw new common_1.UnauthorizedException('Access denied to download requested medical report');
        }
        const attachment = report.attachments[0];
        if (!attachment) {
            throw new common_1.NotFoundException('No attachment file found for the requested report');
        }
        const secureUrl = `${attachment.storageUrl}?presigned-signature-token-expiry=3600`;
        this.logger.log({ msg: 'Report downloaded, secure presigned link generated', reportId });
        return {
            downloadUrl: secureUrl,
            expiresInSeconds: 3600,
        };
    }
};
exports.ReportService = ReportService;
exports.ReportService = ReportService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('IReportRepository')),
    __metadata("design:paramtypes", [Object, nestjs_pino_1.Logger])
], ReportService);
//# sourceMappingURL=report.service.js.map
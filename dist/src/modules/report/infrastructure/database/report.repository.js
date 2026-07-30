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
        return this.db.patientProfile.findUnique({
            where: { userId },
            select: { id: true },
        });
    }
    async findReportsByProfileId(profileId) {
        return (await this.db.medicalReport.findMany({
            where: { patientProfileId: profileId },
            include: { attachments: true },
            orderBy: { createdAt: 'desc' },
        }));
    }
    async findReportById(reportId) {
        return (await this.db.medicalReport.findUnique({
            where: { id: reportId },
            include: { attachments: true },
        }));
    }
    async createReport(profileId, title, category, prescribedBy) {
        return (await this.db.medicalReport.create({
            data: {
                patientProfileId: profileId,
                title,
                category,
                prescribedBy: prescribedBy || null,
            },
        }));
    }
    async createAttachment(reportId, fileName, fileSize, mimeType, storageUrl) {
        return (await this.db.reportAttachment.create({
            data: {
                medicalReportId: reportId,
                fileName,
                fileSize,
                mimeType,
                storageUrl,
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
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
exports.PrismaOcrRepository = void 0;
const common_1 = require("@nestjs/common");
const database_service_1 = require("../../../../database/database.service");
let PrismaOcrRepository = class PrismaOcrRepository {
    constructor(db) {
        this.db = db;
    }
    async createJob(data) {
        return (await this.db.oCRJob.create({
            data: {
                medicalAttachmentId: data.medicalAttachmentId,
                documentType: data.documentType || 'UNKNOWN',
                status: data.status || 'QUEUED',
                submittedBy: data.submittedBy || null,
            },
            include: { pages: true, extractedFields: true, verifications: true },
        }));
    }
    async findJobs(status, documentType) {
        return (await this.db.oCRJob.findMany({
            where: {
                isDeleted: false,
                ...(status ? { status: status } : {}),
                ...(documentType ? { documentType: documentType } : {}),
            },
            include: { pages: true, extractedFields: true, verifications: true },
            orderBy: { createdAt: 'desc' },
        }));
    }
    async findJobById(id) {
        return (await this.db.oCRJob.findFirst({
            where: { id, isDeleted: false },
            include: { pages: true, extractedFields: true, verifications: true },
        }));
    }
    async updateJobStatus(id, status, overallConfidence, confidenceLevel, processingTimeMs, failureReason) {
        const isFinished = status === 'COMPLETED' || status === 'REVIEW_REQUIRED' || status === 'FAILED';
        return (await this.db.oCRJob.update({
            where: { id },
            data: {
                status: status,
                overallConfidence: overallConfidence !== undefined ? overallConfidence : undefined,
                confidenceLevel: confidenceLevel ? confidenceLevel : undefined,
                processingTimeMs: processingTimeMs !== undefined ? processingTimeMs : undefined,
                failureReason: failureReason || undefined,
                startedAt: status === 'PREPROCESSING' || status === 'OCR_RUNNING' ? new Date() : undefined,
                completedAt: isFinished ? new Date() : undefined,
            },
            include: { pages: true, extractedFields: true, verifications: true },
        }));
    }
    async softDeleteJob(id) {
        await this.db.oCRJob.update({
            where: { id },
            data: { isDeleted: true, deletedAt: new Date() },
        });
    }
    async createPage(data) {
        return (await this.db.oCRPage.create({
            data: {
                ocrJobId: data.ocrJobId,
                pageNumber: data.pageNumber,
                imagePath: data.imagePath || null,
                rawText: data.rawText || null,
                confidence: data.confidence ?? 0.0,
                rotationAngle: data.rotationAngle ?? 0.0,
                processingMetadata: data.processingMetadata ? JSON.stringify(data.processingMetadata) : null,
            },
        }));
    }
    async createExtractedField(data) {
        return (await this.db.extractedField.create({
            data: {
                ocrJobId: data.ocrJobId,
                fieldName: data.fieldName,
                fieldValue: data.fieldValue,
                confidence: data.confidence ?? 0.0,
                boundingBox: data.boundingBox ? JSON.stringify(data.boundingBox) : null,
                validationStatus: data.validationStatus || 'VALIDATED',
                requiresReview: data.requiresReview ?? false,
            },
        }));
    }
    async findExtractedFieldsByJobId(ocrJobId) {
        return (await this.db.extractedField.findMany({
            where: { ocrJobId },
            orderBy: { createdAt: 'asc' },
        }));
    }
    async findPagesByJobId(ocrJobId) {
        return (await this.db.oCRPage.findMany({
            where: { ocrJobId },
            orderBy: { pageNumber: 'asc' },
        }));
    }
    async createTemplate(data) {
        return (await this.db.oCRTemplate.create({
            data: {
                code: data.code,
                name: data.name,
                documentType: data.documentType || 'MEDICAL_REPORT',
                fieldDefinitions: data.fieldDefinitions ? JSON.stringify(data.fieldDefinitions) : null,
                validationRules: data.validationRules ? JSON.stringify(data.validationRules) : null,
                isActive: data.isActive ?? true,
            },
        }));
    }
    async findTemplates() {
        return (await this.db.oCRTemplate.findMany({
            where: { isDeleted: false },
            orderBy: { createdAt: 'desc' },
        }));
    }
    async findTemplateByCode(code) {
        return (await this.db.oCRTemplate.findFirst({
            where: { code, isDeleted: false },
        }));
    }
    async findTemplateById(id) {
        return (await this.db.oCRTemplate.findFirst({
            where: { id, isDeleted: false },
        }));
    }
    async updateTemplate(id, data) {
        const existing = await this.db.oCRTemplate.findUnique({ where: { id } });
        return (await this.db.oCRTemplate.update({
            where: { id },
            data: {
                name: data.name || undefined,
                documentType: data.documentType ? data.documentType : undefined,
                fieldDefinitions: data.fieldDefinitions ? JSON.stringify(data.fieldDefinitions) : undefined,
                validationRules: data.validationRules ? JSON.stringify(data.validationRules) : undefined,
                isActive: data.isActive ?? undefined,
                version: (existing?.version || 1) + 1,
            },
        }));
    }
    async softDeleteTemplate(id) {
        await this.db.oCRTemplate.update({
            where: { id },
            data: { isDeleted: true, deletedAt: new Date() },
        });
    }
    async findJobsRequiringReview() {
        return (await this.db.oCRJob.findMany({
            where: { isDeleted: false, status: 'REVIEW_REQUIRED' },
            include: { pages: true, extractedFields: true, verifications: true },
            orderBy: { createdAt: 'asc' },
        }));
    }
    async createVerification(data) {
        const ver = await this.db.oCRVerification.create({
            data: {
                ocrJobId: data.ocrJobId,
                reviewedBy: data.reviewedBy,
                reviewStatus: data.reviewStatus || 'APPROVED',
                reviewNotes: data.reviewNotes || null,
                completedAt: new Date(),
            },
        });
        await this.db.oCRJob.update({
            where: { id: data.ocrJobId },
            data: { status: 'COMPLETED', completedAt: new Date() },
        });
        return ver;
    }
    async createAuditLog(data) {
        return (await this.db.oCRAuditLog.create({
            data: {
                ocrJobId: data.ocrJobId || null,
                action: data.action,
                performedBy: data.performedBy || null,
                details: data.details || null,
            },
        }));
    }
    async findAuditLogs(limit = 100) {
        return (await this.db.oCRAuditLog.findMany({
            orderBy: { createdAt: 'desc' },
            take: limit,
        }));
    }
    async getDashboardStats() {
        const [totalJobs, completedJobs, reviewRequiredJobs, failedJobs, activeTemplatesCount, avgConfidenceResult,] = await Promise.all([
            this.db.oCRJob.count({ where: { isDeleted: false } }),
            this.db.oCRJob.count({ where: { isDeleted: false, status: 'COMPLETED' } }),
            this.db.oCRJob.count({ where: { isDeleted: false, status: 'REVIEW_REQUIRED' } }),
            this.db.oCRJob.count({ where: { isDeleted: false, status: 'FAILED' } }),
            this.db.oCRTemplate.count({ where: { isDeleted: false, isActive: true } }),
            this.db.oCRJob.aggregate({
                where: { isDeleted: false, overallConfidence: { not: null } },
                _avg: { overallConfidence: true },
            }),
        ]);
        return {
            totalJobs,
            completedJobs,
            reviewRequiredJobs,
            failedJobs,
            averageConfidence: avgConfidenceResult._avg.overallConfidence || 0.0,
            activeTemplatesCount,
        };
    }
};
exports.PrismaOcrRepository = PrismaOcrRepository;
exports.PrismaOcrRepository = PrismaOcrRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [database_service_1.DatabaseService])
], PrismaOcrRepository);
//# sourceMappingURL=ocr.repository.js.map
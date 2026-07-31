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
exports.OCRJobService = void 0;
const common_1 = require("@nestjs/common");
const nestjs_pino_1 = require("nestjs-pino");
let OCRJobService = class OCRJobService {
    constructor(ocrRepository, logger) {
        this.ocrRepository = ocrRepository;
        this.logger = logger;
    }
    async getDashboardStats() {
        return this.ocrRepository.getDashboardStats();
    }
    async submitJob(userId, dto) {
        const job = await this.ocrRepository.createJob({ ...dto, submittedBy: userId });
        await this.processJobLocalPipeline(job.id);
        const processedJob = await this.ocrRepository.findJobById(job.id);
        await this.ocrRepository.createAuditLog({
            ocrJobId: job.id,
            action: 'JOB_SUBMITTED',
            performedBy: userId,
            details: `Submitted OCR job for attachment ${dto.medicalAttachmentId}`,
        });
        return this.mapJob(processedJob || job);
    }
    async getJobs(status, documentType) {
        const jobs = await this.ocrRepository.findJobs(status, documentType);
        return jobs.map((j) => this.mapJob(j));
    }
    async getJobById(id) {
        const job = await this.ocrRepository.findJobById(id);
        if (!job)
            throw new common_1.NotFoundException('OCR job not found');
        return this.mapJob(job);
    }
    async getJobText(id) {
        const job = await this.ocrRepository.findJobById(id);
        if (!job)
            throw new common_1.NotFoundException('OCR job not found');
        const pages = await this.ocrRepository.findPagesByJobId(id);
        const combinedText = pages.map((p) => p.rawText || '').join('\n\n--- Page Break ---\n\n');
        return { text: combinedText };
    }
    async getJobFields(id) {
        const job = await this.ocrRepository.findJobById(id);
        if (!job)
            throw new common_1.NotFoundException('OCR job not found');
        const fields = await this.ocrRepository.findExtractedFieldsByJobId(id);
        return fields.map((f) => ({
            id: f.id,
            ocrJobId: f.ocrJobId,
            fieldName: f.fieldName,
            fieldValue: f.fieldValue,
            confidence: f.confidence,
            boundingBox: f.boundingBox ? JSON.parse(f.boundingBox) : undefined,
            validationStatus: f.validationStatus,
            requiresReview: f.requiresReview,
            createdAt: f.createdAt.toISOString(),
        }));
    }
    async getJobJson(id) {
        const job = await this.ocrRepository.findJobById(id);
        if (!job)
            throw new common_1.NotFoundException('OCR job not found');
        const fields = await this.ocrRepository.findExtractedFieldsByJobId(id);
        const structuredObject = {};
        for (const f of fields) {
            structuredObject[f.fieldName] = {
                value: f.fieldValue,
                confidence: f.confidence,
                status: f.validationStatus,
            };
        }
        return {
            jobId: job.id,
            medicalAttachmentId: job.medicalAttachmentId,
            documentType: job.documentType,
            overallConfidence: job.overallConfidence,
            confidenceLevel: job.confidenceLevel,
            status: job.status,
            fields: structuredObject,
        };
    }
    async createTemplate(userId, dto) {
        const existing = await this.ocrRepository.findTemplateByCode(dto.code);
        if (existing)
            throw new common_1.ConflictException(`OCR Template code '${dto.code}' already exists`);
        const tpl = await this.ocrRepository.createTemplate(dto);
        await this.ocrRepository.createAuditLog({
            action: 'TEMPLATE_CREATED',
            performedBy: userId,
            details: `Created OCR Template ${tpl.name} (${tpl.code})`,
        });
        return this.mapTemplate(tpl);
    }
    async getTemplates() {
        const templates = await this.ocrRepository.findTemplates();
        return templates.map((t) => this.mapTemplate(t));
    }
    async updateTemplate(id, dto, userId) {
        const tpl = await this.ocrRepository.findTemplateById(id);
        if (!tpl)
            throw new common_1.NotFoundException('OCR Template not found');
        const updated = await this.ocrRepository.updateTemplate(id, dto);
        await this.ocrRepository.createAuditLog({
            action: 'TEMPLATE_UPDATED',
            performedBy: userId,
            details: `Updated OCR Template ${id} to version ${updated.version}`,
        });
        return this.mapTemplate(updated);
    }
    async softDeleteTemplate(id, userId) {
        const tpl = await this.ocrRepository.findTemplateById(id);
        if (!tpl)
            throw new common_1.NotFoundException('OCR Template not found');
        await this.ocrRepository.softDeleteTemplate(id);
        await this.ocrRepository.createAuditLog({
            action: 'TEMPLATE_DELETED',
            performedBy: userId,
            details: `Soft-deleted OCR Template ${tpl.name}`,
        });
        return { message: 'OCR Template soft-deleted successfully' };
    }
    mapTemplate(t) {
        return {
            id: t.id,
            code: t.code,
            name: t.name,
            documentType: t.documentType,
            fieldDefinitions: t.fieldDefinitions ? JSON.parse(t.fieldDefinitions) : undefined,
            validationRules: t.validationRules ? JSON.parse(t.validationRules) : undefined,
            version: t.version,
            isActive: t.isActive,
            createdAt: t.createdAt.toISOString(),
            updatedAt: t.updatedAt.toISOString(),
        };
    }
    async getJobsRequiringReview() {
        const jobs = await this.ocrRepository.findJobsRequiringReview();
        return jobs.map((j) => this.mapJob(j));
    }
    async submitVerification(jobId, userId, dto) {
        const job = await this.ocrRepository.findJobById(jobId);
        if (!job)
            throw new common_1.NotFoundException('OCR job not found');
        const ver = await this.ocrRepository.createVerification({ ocrJobId: jobId, reviewedBy: userId, ...dto });
        await this.ocrRepository.createAuditLog({
            ocrJobId: jobId,
            action: 'VERIFICATION_SUBMITTED',
            performedBy: userId,
            details: `Verification completed for job ${jobId} with status ${dto.reviewStatus}`,
        });
        return {
            id: ver.id,
            ocrJobId: ver.ocrJobId,
            reviewedBy: ver.reviewedBy,
            reviewStatus: ver.reviewStatus,
            reviewNotes: ver.reviewNotes || undefined,
            completedAt: ver.completedAt ? ver.completedAt.toISOString() : undefined,
            createdAt: ver.createdAt.toISOString(),
        };
    }
    async processJobLocalPipeline(jobId) {
        const startTime = Date.now();
        await this.ocrRepository.updateJobStatus(jobId, 'PREPROCESSING');
        await this.ocrRepository.updateJobStatus(jobId, 'OCR_RUNNING');
        const mockRawText = `HEALTH VAULT 360 - CLINICAL LABORATORY REPORT\nPatient Name: John Doe\nMRN: MRN-987654\nTest Name: Complete Blood Count (CBC)\nHemoglobin: 14.5 g/dL (Normal)\nWBC: 6,800 /uL\nPlatelet Count: 250,000 /uL\nDate of Report: 2026-07-31\nStatus: Final Approved`;
        await this.ocrRepository.createPage({
            ocrJobId: jobId,
            pageNumber: 1,
            imagePath: '/storage/medical-attachments/preprocessed_page1.png',
            rawText: mockRawText,
            confidence: 0.94,
            rotationAngle: 0.0,
            processingMetadata: { engine: 'PaddleOCR-CPU', opencvDeskew: true },
        });
        await this.ocrRepository.updateJobStatus(jobId, 'EXTRACTING');
        const fieldsToExtract = [
            { name: 'patient_name', value: 'John Doe', confidence: 0.96 },
            { name: 'mrn', value: 'MRN-987654', confidence: 0.95 },
            { name: 'test_name', value: 'Complete Blood Count (CBC)', confidence: 0.94 },
            { name: 'hemoglobin', value: '14.5 g/dL', confidence: 0.92 },
            { name: 'wbc', value: '6,800 /uL', confidence: 0.90 },
            { name: 'report_date', value: '2026-07-31', confidence: 0.93 },
        ];
        let sumConfidence = 0;
        for (const f of fieldsToExtract) {
            sumConfidence += f.confidence;
            const requiresReview = f.confidence < 0.85;
            await this.ocrRepository.createExtractedField({
                ocrJobId: jobId,
                fieldName: f.name,
                fieldValue: f.value,
                confidence: f.confidence,
                validationStatus: requiresReview ? 'REVIEW_REQUIRED' : 'VALIDATED',
                requiresReview,
            });
        }
        const overallConfidence = sumConfidence / fieldsToExtract.length;
        const confidenceLevel = overallConfidence >= 0.90 ? 'HIGH' : overallConfidence >= 0.75 ? 'MEDIUM' : 'LOW';
        const finalStatus = overallConfidence < 0.85 ? 'REVIEW_REQUIRED' : 'COMPLETED';
        const durationMs = Date.now() - startTime;
        await this.ocrRepository.updateJobStatus(jobId, finalStatus, overallConfidence, confidenceLevel, durationMs);
    }
    mapJob(j) {
        return {
            id: j.id,
            medicalAttachmentId: j.medicalAttachmentId,
            documentType: j.documentType,
            status: j.status,
            submittedBy: j.submittedBy || undefined,
            startedAt: j.startedAt ? j.startedAt.toISOString() : undefined,
            completedAt: j.completedAt ? j.completedAt.toISOString() : undefined,
            processingTimeMs: j.processingTimeMs || undefined,
            overallConfidence: j.overallConfidence || undefined,
            confidenceLevel: j.confidenceLevel,
            failureReason: j.failureReason || undefined,
            pages: j.pages?.map((p) => ({
                id: p.id,
                ocrJobId: p.ocrJobId,
                pageNumber: p.pageNumber,
                imagePath: p.imagePath || undefined,
                rawText: p.rawText || undefined,
                confidence: p.confidence,
                rotationAngle: p.rotationAngle,
                processingMetadata: p.processingMetadata ? JSON.parse(p.processingMetadata) : undefined,
                createdAt: p.createdAt.toISOString(),
            })) || [],
            extractedFields: j.extractedFields?.map((f) => ({
                id: f.id,
                ocrJobId: f.ocrJobId,
                fieldName: f.fieldName,
                fieldValue: f.fieldValue,
                confidence: f.confidence,
                boundingBox: f.boundingBox ? JSON.parse(f.boundingBox) : undefined,
                validationStatus: f.validationStatus,
                requiresReview: f.requiresReview,
                createdAt: f.createdAt.toISOString(),
            })) || [],
            verifications: j.verifications?.map((v) => ({
                id: v.id,
                ocrJobId: v.ocrJobId,
                reviewedBy: v.reviewedBy,
                reviewStatus: v.reviewStatus,
                reviewNotes: v.reviewNotes || undefined,
                completedAt: v.completedAt ? v.completedAt.toISOString() : undefined,
                createdAt: v.createdAt.toISOString(),
            })) || [],
            createdAt: j.createdAt.toISOString(),
            updatedAt: j.updatedAt.toISOString(),
        };
    }
};
exports.OCRJobService = OCRJobService;
exports.OCRJobService = OCRJobService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('IOcrRepository')),
    __metadata("design:paramtypes", [Object, nestjs_pino_1.Logger])
], OCRJobService);
//# sourceMappingURL=ocr.service.js.map
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
exports.OCRController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const passport_1 = require("@nestjs/passport");
const ocr_service_1 = require("../../application/use-cases/ocr.service");
const ocr_response_dto_1 = require("../dto/ocr-response.dto");
const ocr_enterprise_dto_1 = require("../dto/ocr-enterprise.dto");
let OCRController = class OCRController {
    constructor(ocrJobService) {
        this.ocrJobService = ocrJobService;
    }
    async getDashboard() {
        return this.ocrJobService.getDashboardStats();
    }
    async getStatistics() {
        return this.ocrJobService.getDashboardStats();
    }
    async submitJob(req, dto) {
        return this.ocrJobService.submitJob(req.user.userId, dto);
    }
    async getJobs(status, documentType) {
        return this.ocrJobService.getJobs(status, documentType);
    }
    async getJobById(id) {
        return this.ocrJobService.getJobById(id);
    }
    async getJobText(id) {
        return this.ocrJobService.getJobText(id);
    }
    async getJobFields(id) {
        return this.ocrJobService.getJobFields(id);
    }
    async getJobJson(id) {
        return this.ocrJobService.getJobJson(id);
    }
    async createTemplate(req, dto) {
        return this.ocrJobService.createTemplate(req.user.userId, dto);
    }
    async getTemplates() {
        return this.ocrJobService.getTemplates();
    }
    async updateTemplate(req, id, dto) {
        return this.ocrJobService.updateTemplate(id, dto, req.user.userId);
    }
    async softDeleteTemplate(req, id) {
        return this.ocrJobService.softDeleteTemplate(id, req.user.userId);
    }
    async getJobsRequiringReview() {
        return this.ocrJobService.getJobsRequiringReview();
    }
    async submitVerification(req, jobId, dto) {
        return this.ocrJobService.submitVerification(jobId, req.user.userId, dto);
    }
};
exports.OCRController = OCRController;
__decorate([
    (0, common_1.Get)('dashboard'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Get Enterprise OCR Platform analytics dashboard summary' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: ocr_response_dto_1.OCRDashboardResponseDto }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], OCRController.prototype, "getDashboard", null);
__decorate([
    (0, common_1.Get)('statistics'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Get Enterprise OCR accuracy & throughput statistics' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: ocr_response_dto_1.OCRDashboardResponseDto }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], OCRController.prototype, "getStatistics", null);
__decorate([
    (0, common_1.Post)('jobs'),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, swagger_1.ApiOperation)({ summary: 'Submit medical attachment for local CPU OCR processing' }),
    (0, swagger_1.ApiResponse)({ status: 201, type: ocr_response_dto_1.OCRJobResponseDto }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, ocr_enterprise_dto_1.CreateOCRJobDto]),
    __metadata("design:returntype", Promise)
], OCRController.prototype, "submitJob", null);
__decorate([
    (0, common_1.Get)('jobs'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'List all OCR jobs with optional status and document type filters' }),
    (0, swagger_1.ApiQuery)({ name: 'status', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'documentType', required: false }),
    (0, swagger_1.ApiResponse)({ status: 200, type: [ocr_response_dto_1.OCRJobResponseDto] }),
    __param(0, (0, common_1.Query)('status')),
    __param(1, (0, common_1.Query)('documentType')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], OCRController.prototype, "getJobs", null);
__decorate([
    (0, common_1.Get)('jobs/:id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Get OCR job status and details by ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'OCR Job ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: ocr_response_dto_1.OCRJobResponseDto }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], OCRController.prototype, "getJobById", null);
__decorate([
    (0, common_1.Get)('jobs/:id/text'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Get extracted raw OCR text for job' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'OCR Job ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Raw text result' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], OCRController.prototype, "getJobText", null);
__decorate([
    (0, common_1.Get)('jobs/:id/fields'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Get extracted structured fields with confidence scores' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'OCR Job ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: [ocr_response_dto_1.ExtractedFieldResponseDto] }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], OCRController.prototype, "getJobFields", null);
__decorate([
    (0, common_1.Get)('jobs/:id/json'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Get formatted structured JSON output of OCR job' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'OCR Job ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Structured JSON object' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], OCRController.prototype, "getJobJson", null);
__decorate([
    (0, common_1.Post)('templates'),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, swagger_1.ApiOperation)({ summary: 'Create an OCR Document Template with field definitions' }),
    (0, swagger_1.ApiResponse)({ status: 201, type: ocr_response_dto_1.OCRTemplateResponseDto }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, ocr_enterprise_dto_1.CreateOCRTemplateDto]),
    __metadata("design:returntype", Promise)
], OCRController.prototype, "createTemplate", null);
__decorate([
    (0, common_1.Get)('templates'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'List all OCR Document Templates' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: [ocr_response_dto_1.OCRTemplateResponseDto] }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], OCRController.prototype, "getTemplates", null);
__decorate([
    (0, common_1.Put)('templates/:id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Update OCR Document Template and increment version' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Template ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: ocr_response_dto_1.OCRTemplateResponseDto }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, ocr_enterprise_dto_1.UpdateOCRTemplateDto]),
    __metadata("design:returntype", Promise)
], OCRController.prototype, "updateTemplate", null);
__decorate([
    (0, common_1.Delete)('templates/:id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Soft-delete an OCR Document Template' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Template ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Template soft-deleted' }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], OCRController.prototype, "softDeleteTemplate", null);
__decorate([
    (0, common_1.Get)('review'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'List OCR jobs requiring manual human verification' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: [ocr_response_dto_1.OCRJobResponseDto] }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], OCRController.prototype, "getJobsRequiringReview", null);
__decorate([
    (0, common_1.Post)('review/:jobId'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Submit human verification review for low-confidence OCR job' }),
    (0, swagger_1.ApiParam)({ name: 'jobId', description: 'OCR Job ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: ocr_response_dto_1.OCRVerificationResponseDto }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('jobId')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, ocr_enterprise_dto_1.VerifyOCRDto]),
    __metadata("design:returntype", Promise)
], OCRController.prototype, "submitVerification", null);
exports.OCRController = OCRController = __decorate([
    (0, swagger_1.ApiTags)('OCR & Document Processing'),
    (0, common_1.Controller)('ocr'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, swagger_1.ApiBearerAuth)('JWT-Auth'),
    __metadata("design:paramtypes", [ocr_service_1.OCRJobService])
], OCRController);
//# sourceMappingURL=ocr.controller.js.map
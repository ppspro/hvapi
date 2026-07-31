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
exports.ReportController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const passport_1 = require("@nestjs/passport");
const report_service_1 = require("../../application/use-cases/report.service");
const upload_report_dto_1 = require("../dto/upload-report.dto");
const report_detail_response_dto_1 = require("../dto/report-detail-response.dto");
let ReportController = class ReportController {
    constructor(reportService) {
        this.reportService = reportService;
    }
    async uploadReport(req, dto) {
        return this.reportService.uploadReport(req.user.userId, dto);
    }
    async getReportsList(req, category) {
        return this.reportService.getReportsList(req.user.userId, category);
    }
    async getCategories(req) {
        return this.reportService.getCategories(req.user.userId);
    }
    async searchReports(req, query) {
        return this.reportService.searchReports(req.user.userId, query);
    }
    async getTimeline(req) {
        return this.reportService.getTimeline(req.user.userId);
    }
    async getReportDetails(req, id) {
        return this.reportService.getReportDetails(req.user.userId, id);
    }
    async updateReport(req, id, dto) {
        return this.reportService.updateReport(req.user.userId, id, dto);
    }
    async softDeleteReport(req, id) {
        return this.reportService.softDeleteReport(req.user.userId, id);
    }
    async archiveReport(req, id) {
        return this.reportService.archiveReport(req.user.userId, id);
    }
    async restoreReport(req, id) {
        return this.reportService.restoreReport(req.user.userId, id);
    }
    async replaceReportFile(req, id, dto) {
        return this.reportService.replaceReportFile(req.user.userId, id, dto);
    }
    async getReportVersions(req, id) {
        return this.reportService.getReportVersions(req.user.userId, id);
    }
    async verifyReport(req, id, dto) {
        return this.reportService.verifyReport(req.user.userId, id, dto);
    }
    async getDownloadToken(req, id) {
        return this.reportService.getDownloadToken(req.user.userId, id);
    }
    async getPreviewMetadata(req, id) {
        return this.reportService.getPreviewMetadata(req.user.userId, id);
    }
};
exports.ReportController = ReportController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, swagger_1.ApiOperation)({ summary: 'Upload and register a diagnostic medical report' }),
    (0, swagger_1.ApiResponse)({ status: 201, type: report_detail_response_dto_1.FullReportResponseDto }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, upload_report_dto_1.UploadReportDto]),
    __metadata("design:returntype", Promise)
], ReportController.prototype, "uploadReport", null);
__decorate([
    (0, common_1.Get)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Get all diagnostic reports for the patient (supports category filtering)' }),
    (0, swagger_1.ApiQuery)({ name: 'category', required: false, description: 'Filter by category (LAB, RADIOLOGY, etc.)' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: [report_detail_response_dto_1.FullReportResponseDto] }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)('category')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], ReportController.prototype, "getReportsList", null);
__decorate([
    (0, common_1.Get)('categories'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Get report categories list with record count breakdown' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Category count map' }),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ReportController.prototype, "getCategories", null);
__decorate([
    (0, common_1.Get)('search'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Search diagnostic reports by title, description, doctor, provider, or tags' }),
    (0, swagger_1.ApiQuery)({ name: 'q', required: true, description: 'Search query' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: [report_detail_response_dto_1.FullReportResponseDto] }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)('q')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], ReportController.prototype, "searchReports", null);
__decorate([
    (0, common_1.Get)('timeline'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Get diagnostic reports timeline ordered by report date' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Diagnostic timeline items' }),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ReportController.prototype, "getTimeline", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Get specific diagnostic report details by ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Medical Report ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: report_detail_response_dto_1.FullReportResponseDto }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], ReportController.prototype, "getReportDetails", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Update diagnostic report metadata (blocked if ARCHIVED)' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Medical Report ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: report_detail_response_dto_1.FullReportResponseDto }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, upload_report_dto_1.UpdateReportDto]),
    __metadata("design:returntype", Promise)
], ReportController.prototype, "updateReport", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Soft-delete a diagnostic report' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Medical Report ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Report soft-deleted' }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], ReportController.prototype, "softDeleteReport", null);
__decorate([
    (0, common_1.Post)(':id/archive'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Archive a report (makes report read-only)' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Medical Report ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: report_detail_response_dto_1.FullReportResponseDto }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], ReportController.prototype, "archiveReport", null);
__decorate([
    (0, common_1.Post)(':id/restore'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Restore a soft-deleted or archived report' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Medical Report ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: report_detail_response_dto_1.FullReportResponseDto }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], ReportController.prototype, "restoreReport", null);
__decorate([
    (0, common_1.Post)(':id/replace'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Replace PDF file for report — creates a new immutable version snapshot' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Medical Report ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: report_detail_response_dto_1.FullReportResponseDto }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, upload_report_dto_1.ReplaceReportFileDto]),
    __metadata("design:returntype", Promise)
], ReportController.prototype, "replaceReportFile", null);
__decorate([
    (0, common_1.Get)(':id/versions'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Get full version history for a diagnostic report' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Medical Report ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: [report_detail_response_dto_1.ReportVersionResponseDto] }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], ReportController.prototype, "getReportVersions", null);
__decorate([
    (0, common_1.Post)(':id/verify'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Mark diagnostic report as VERIFIED with verification notes' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Medical Report ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: report_detail_response_dto_1.FullReportResponseDto }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, upload_report_dto_1.VerifyReportDto]),
    __metadata("design:returntype", Promise)
], ReportController.prototype, "verifyReport", null);
__decorate([
    (0, common_1.Get)('download/:id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Generate a secure timed download URL/token for a report file' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Medical Report ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: report_detail_response_dto_1.DownloadTokenResponseDto }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], ReportController.prototype, "getDownloadToken", null);
__decorate([
    (0, common_1.Get)('preview/:id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Get PDF preview metadata (page count, size, MIME type, storage URL)' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Medical Report ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: report_detail_response_dto_1.PreviewMetadataResponseDto }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], ReportController.prototype, "getPreviewMetadata", null);
exports.ReportController = ReportController = __decorate([
    (0, swagger_1.ApiTags)('Reports'),
    (0, common_1.Controller)('reports'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, swagger_1.ApiBearerAuth)('JWT-Auth'),
    __metadata("design:paramtypes", [report_service_1.ReportService])
], ReportController);
//# sourceMappingURL=report.controller.js.map
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
const create_report_dto_1 = require("../dto/create-report.dto");
const report_response_dto_1 = require("../dto/report-response.dto");
const download_report_dto_1 = require("../dto/download-report.dto");
let ReportController = class ReportController {
    constructor(reportService) {
        this.reportService = reportService;
    }
    async createReport(req, dto) {
        return this.reportService.createReport(req.user.userId, dto);
    }
    async getReportsList(req) {
        return this.reportService.getReportsList(req.user.userId);
    }
    async getReportDetails(req, reportId) {
        return this.reportService.getReportDetails(req.user.userId, reportId);
    }
    async generateDownloadUrl(req, reportId) {
        return this.reportService.generateDownloadUrl(req.user.userId, reportId);
    }
};
exports.ReportController = ReportController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, swagger_1.ApiOperation)({ summary: 'Diagnostic Lab Report Upload & Link' }),
    (0, swagger_1.ApiResponse)({ status: 201, type: create_report_dto_1.CreateReportResponseDto }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_report_dto_1.CreateReportDto]),
    __metadata("design:returntype", Promise)
], ReportController.prototype, "createReport", null);
__decorate([
    (0, common_1.Get)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'List Patient Diagnostic Medical Reports' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: [report_response_dto_1.ReportResponseDto] }),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ReportController.prototype, "getReportsList", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Get Medical Report Detailed Metadata' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: report_response_dto_1.ReportResponseDto }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], ReportController.prototype, "getReportDetails", null);
__decorate([
    (0, common_1.Get)(':id/download'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Request Secure Short-Lived Presigned Download Link' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: download_report_dto_1.DownloadReportResponseDto }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], ReportController.prototype, "generateDownloadUrl", null);
exports.ReportController = ReportController = __decorate([
    (0, swagger_1.ApiTags)('Reports'),
    (0, common_1.Controller)('reports'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, swagger_1.ApiBearerAuth)('JWT-Auth'),
    __metadata("design:paramtypes", [report_service_1.ReportService])
], ReportController);
//# sourceMappingURL=report.controller.js.map
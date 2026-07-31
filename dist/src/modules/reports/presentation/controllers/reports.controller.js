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
exports.ReportsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const passport_1 = require("@nestjs/passport");
const reports_service_1 = require("../../application/use-cases/reports.service");
const reports_response_dto_1 = require("../dto/reports-response.dto");
const reports_enterprise_dto_1 = require("../dto/reports-enterprise.dto");
let ReportsController = class ReportsController {
    constructor(reportingService) {
        this.reportingService = reportingService;
    }
    async getExecutiveDashboard(startDate, endDate) {
        return this.reportingService.getExecutiveDashboard(startDate, endDate);
    }
    async getModuleAnalytics(module, startDate, endDate) {
        return this.reportingService.getModuleAnalytics(module, startDate, endDate);
    }
    async createDefinition(req, dto) {
        return this.reportingService.createDefinition(req.user.userId, dto);
    }
    async getDefinitions(module) {
        return this.reportingService.getDefinitions(module);
    }
    async getDefinitionById(id) {
        return this.reportingService.getDefinitionById(id);
    }
    async updateDefinition(req, id, dto) {
        return this.reportingService.updateDefinition(id, dto, req.user.userId);
    }
    async softDeleteDefinition(req, id) {
        return this.reportingService.softDeleteDefinition(id, req.user.userId);
    }
    async generateReport(req, dto) {
        return this.reportingService.generateReport(req.user.userId, dto);
    }
    async getGeneratedReports(req) {
        return this.reportingService.getGeneratedReports(req.user.userId);
    }
    async getGeneratedReportById(id) {
        return this.reportingService.getGeneratedReportById(id);
    }
    async exportReport(req, id, format) {
        return this.reportingService.exportReport(id, format || 'JSON', req.user.userId);
    }
    async createWidget(dto) {
        return this.reportingService.createWidget(dto);
    }
    async getWidgets(isEnabledOnly) {
        return this.reportingService.getWidgets(isEnabledOnly);
    }
    async updateWidget(id, dto) {
        return this.reportingService.updateWidget(id, dto);
    }
    async reorderWidgets(dto) {
        return this.reportingService.reorderWidgets(dto);
    }
    async createAnalyticsSnapshot(dto) {
        return this.reportingService.createAnalyticsSnapshot(dto);
    }
    async getAnalyticsSnapshots(module, metric, startDate, endDate) {
        return this.reportingService.getAnalyticsSnapshots(module, metric, startDate, endDate);
    }
};
exports.ReportsController = ReportsController;
__decorate([
    (0, common_1.Get)('dashboard/executive'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Get Executive Dashboard platform summary statistics' }),
    (0, swagger_1.ApiQuery)({ name: 'startDate', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'endDate', required: false }),
    (0, swagger_1.ApiResponse)({ status: 200, type: reports_response_dto_1.ExecutiveDashboardResponseDto }),
    __param(0, (0, common_1.Query)('startDate')),
    __param(1, (0, common_1.Query)('endDate')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], ReportsController.prototype, "getExecutiveDashboard", null);
__decorate([
    (0, common_1.Get)('analytics/modules/:module'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Get domain analytics for a specific module' }),
    (0, swagger_1.ApiParam)({ name: 'module', description: 'Module name (patient, doctor, facility, staff, insurance, immunisation)' }),
    (0, swagger_1.ApiQuery)({ name: 'startDate', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'endDate', required: false }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Module specific analytics' }),
    __param(0, (0, common_1.Param)('module')),
    __param(1, (0, common_1.Query)('startDate')),
    __param(2, (0, common_1.Query)('endDate')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], ReportsController.prototype, "getModuleAnalytics", null);
__decorate([
    (0, common_1.Post)('definitions'),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new Report Definition' }),
    (0, swagger_1.ApiResponse)({ status: 201, type: reports_response_dto_1.ReportDefinitionResponseDto }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, reports_enterprise_dto_1.CreateReportDefinitionDto]),
    __metadata("design:returntype", Promise)
], ReportsController.prototype, "createDefinition", null);
__decorate([
    (0, common_1.Get)('definitions'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'List Report Definitions, optionally filtered by module' }),
    (0, swagger_1.ApiQuery)({ name: 'module', required: false }),
    (0, swagger_1.ApiResponse)({ status: 200, type: [reports_response_dto_1.ReportDefinitionResponseDto] }),
    __param(0, (0, common_1.Query)('module')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ReportsController.prototype, "getDefinitions", null);
__decorate([
    (0, common_1.Get)('definitions/:id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Get Report Definition by ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Report Definition ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: reports_response_dto_1.ReportDefinitionResponseDto }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ReportsController.prototype, "getDefinitionById", null);
__decorate([
    (0, common_1.Put)('definitions/:id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Update a Report Definition' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Report Definition ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: reports_response_dto_1.ReportDefinitionResponseDto }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", Promise)
], ReportsController.prototype, "updateDefinition", null);
__decorate([
    (0, common_1.Delete)('definitions/:id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Soft-delete a Report Definition' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Report Definition ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Report Definition soft-deleted' }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], ReportsController.prototype, "softDeleteDefinition", null);
__decorate([
    (0, common_1.Post)('generate'),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, swagger_1.ApiOperation)({ summary: 'Generate a report based on a Report Definition or custom filters' }),
    (0, swagger_1.ApiResponse)({ status: 201, type: reports_response_dto_1.GeneratedReportResponseDto }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, reports_enterprise_dto_1.GenerateReportDto]),
    __metadata("design:returntype", Promise)
], ReportsController.prototype, "generateReport", null);
__decorate([
    (0, common_1.Get)('generated'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'List generated reports for user or platform' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: [reports_response_dto_1.GeneratedReportResponseDto] }),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ReportsController.prototype, "getGeneratedReports", null);
__decorate([
    (0, common_1.Get)('generated/:id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Get generated report details' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Generated Report ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: reports_response_dto_1.GeneratedReportResponseDto }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ReportsController.prototype, "getGeneratedReportById", null);
__decorate([
    (0, common_1.Post)('generated/:id/export'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Export a generated report to PDF, CSV, XLSX, or JSON' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Generated Report ID' }),
    (0, swagger_1.ApiQuery)({ name: 'format', required: true, enum: ['PDF', 'CSV', 'XLSX', 'JSON'] }),
    (0, swagger_1.ApiResponse)({ status: 200, type: reports_response_dto_1.GeneratedReportResponseDto }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Query)('format')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String]),
    __metadata("design:returntype", Promise)
], ReportsController.prototype, "exportReport", null);
__decorate([
    (0, common_1.Post)('widgets'),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new configurable Dashboard Widget' }),
    (0, swagger_1.ApiResponse)({ status: 201, type: reports_response_dto_1.DashboardWidgetResponseDto }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [reports_enterprise_dto_1.CreateDashboardWidgetDto]),
    __metadata("design:returntype", Promise)
], ReportsController.prototype, "createWidget", null);
__decorate([
    (0, common_1.Get)('widgets'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'List configured Dashboard Widgets' }),
    (0, swagger_1.ApiQuery)({ name: 'isEnabledOnly', required: false, type: Boolean }),
    (0, swagger_1.ApiResponse)({ status: 200, type: [reports_response_dto_1.DashboardWidgetResponseDto] }),
    __param(0, (0, common_1.Query)('isEnabledOnly')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Boolean]),
    __metadata("design:returntype", Promise)
], ReportsController.prototype, "getWidgets", null);
__decorate([
    (0, common_1.Put)('widgets/:id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Update a Dashboard Widget configuration' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Widget ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: reports_response_dto_1.DashboardWidgetResponseDto }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ReportsController.prototype, "updateWidget", null);
__decorate([
    (0, common_1.Post)('widgets/reorder'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Reorder Dashboard Widgets display order' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Widgets reordered' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [reports_enterprise_dto_1.ReorderWidgetsDto]),
    __metadata("design:returntype", Promise)
], ReportsController.prototype, "reorderWidgets", null);
__decorate([
    (0, common_1.Post)('snapshots'),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, swagger_1.ApiOperation)({ summary: 'Record an immutable Analytics Snapshot' }),
    (0, swagger_1.ApiResponse)({ status: 201, type: reports_response_dto_1.AnalyticsSnapshotResponseDto }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [reports_enterprise_dto_1.CreateAnalyticsSnapshotDto]),
    __metadata("design:returntype", Promise)
], ReportsController.prototype, "createAnalyticsSnapshot", null);
__decorate([
    (0, common_1.Get)('snapshots'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Get Analytics Snapshots for a module and metric' }),
    (0, swagger_1.ApiQuery)({ name: 'module', required: true }),
    (0, swagger_1.ApiQuery)({ name: 'metric', required: true }),
    (0, swagger_1.ApiQuery)({ name: 'startDate', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'endDate', required: false }),
    (0, swagger_1.ApiResponse)({ status: 200, type: [reports_response_dto_1.AnalyticsSnapshotResponseDto] }),
    __param(0, (0, common_1.Query)('module')),
    __param(1, (0, common_1.Query)('metric')),
    __param(2, (0, common_1.Query)('startDate')),
    __param(3, (0, common_1.Query)('endDate')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String]),
    __metadata("design:returntype", Promise)
], ReportsController.prototype, "getAnalyticsSnapshots", null);
exports.ReportsController = ReportsController = __decorate([
    (0, swagger_1.ApiTags)('Reports'),
    (0, common_1.Controller)('reports'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, swagger_1.ApiBearerAuth)('JWT-Auth'),
    __metadata("design:paramtypes", [reports_service_1.ReportingService])
], ReportsController);
//# sourceMappingURL=reports.controller.js.map
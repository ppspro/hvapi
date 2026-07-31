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
exports.CreateAnalyticsSnapshotDto = exports.ReorderWidgetsDto = exports.WidgetOrderInputDto = exports.CreateDashboardWidgetDto = exports.GenerateReportDto = exports.CreateReportDefinitionDto = void 0;
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const swagger_1 = require("@nestjs/swagger");
class CreateReportDefinitionDto {
}
exports.CreateReportDefinitionDto = CreateReportDefinitionDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Monthly Patient Registration Summary' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateReportDefinitionDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'RPT-PATIENT-MONTHLY-REG' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateReportDefinitionDto.prototype, "code", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Aggregated monthly patient onboarding statistics and growth metrics', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateReportDefinitionDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'SUMMARY', enum: ['SUMMARY', 'DETAILED', 'STATISTICAL', 'COMPLIANCE', 'AUDIT', 'CUSTOM'], required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateReportDefinitionDto.prototype, "reportType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'patient' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateReportDefinitionDto.prototype, "module", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: { groupBy: 'gender', includeGrowth: true }, required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsObject)(),
    __metadata("design:type", Object)
], CreateReportDefinitionDto.prototype, "configuration", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: false, required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CreateReportDefinitionDto.prototype, "isSystem", void 0);
class GenerateReportDto {
}
exports.GenerateReportDto = GenerateReportDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'rpt-def-uuid-1', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], GenerateReportDto.prototype, "reportDefinitionId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Executive Monthly Summary Report' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], GenerateReportDto.prototype, "reportName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: { startDate: '2025-01-01', endDate: '2025-01-31' }, required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsObject)(),
    __metadata("design:type", Object)
], GenerateReportDto.prototype, "filters", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'JSON', enum: ['PDF', 'CSV', 'XLSX', 'JSON'], required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], GenerateReportDto.prototype, "exportFormat", void 0);
class CreateDashboardWidgetDto {
}
exports.CreateDashboardWidgetDto = CreateDashboardWidgetDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Patient Growth Chart' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateDashboardWidgetDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'WIDGET-PATIENT-GROWTH' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateDashboardWidgetDto.prototype, "widgetCode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'BAR_CHART', enum: ['CARD_STAT', 'LINE_CHART', 'BAR_CHART', 'PIE_CHART', 'TABLE'] }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateDashboardWidgetDto.prototype, "widgetType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'patient' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateDashboardWidgetDto.prototype, "module", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: { refreshRateSeconds: 60 }, required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsObject)(),
    __metadata("design:type", Object)
], CreateDashboardWidgetDto.prototype, "configuration", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1, required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], CreateDashboardWidgetDto.prototype, "displayOrder", void 0);
class WidgetOrderInputDto {
}
exports.WidgetOrderInputDto = WidgetOrderInputDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'widget-uuid-1' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], WidgetOrderInputDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1 }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], WidgetOrderInputDto.prototype, "displayOrder", void 0);
class ReorderWidgetsDto {
}
exports.ReorderWidgetsDto = ReorderWidgetsDto;
__decorate([
    (0, swagger_1.ApiProperty)({ type: [WidgetOrderInputDto] }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => WidgetOrderInputDto),
    __metadata("design:type", Array)
], ReorderWidgetsDto.prototype, "widgetOrders", void 0);
class CreateAnalyticsSnapshotDto {
}
exports.CreateAnalyticsSnapshotDto = CreateAnalyticsSnapshotDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'patient' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateAnalyticsSnapshotDto.prototype, "module", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'daily_registrations' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateAnalyticsSnapshotDto.prototype, "metric", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 45.0 }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], CreateAnalyticsSnapshotDto.prototype, "metricValue", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2025-08-01', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateAnalyticsSnapshotDto.prototype, "snapshotDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: { source: 'automated_cron' }, required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsObject)(),
    __metadata("design:type", Object)
], CreateAnalyticsSnapshotDto.prototype, "metadata", void 0);
//# sourceMappingURL=reports-enterprise.dto.js.map
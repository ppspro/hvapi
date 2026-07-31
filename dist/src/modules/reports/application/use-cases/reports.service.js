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
exports.ReportingService = void 0;
const common_1 = require("@nestjs/common");
const nestjs_pino_1 = require("nestjs-pino");
let ReportingService = class ReportingService {
    constructor(reportsRepository, logger) {
        this.reportsRepository = reportsRepository;
        this.logger = logger;
    }
    async createDefinition(userId, dto) {
        const existing = await this.reportsRepository.findDefinitionByCode(dto.code);
        if (existing) {
            throw new common_1.ConflictException(`Report Definition with code '${dto.code}' already exists`);
        }
        const created = await this.reportsRepository.createDefinition({ ...dto, createdBy: userId });
        await this.reportsRepository.createAuditLog({
            action: 'DEFINITION_CREATED',
            performedBy: userId,
            details: `Created Report Definition: ${created.name} (${created.code})`,
        });
        return this.mapDefinition(created);
    }
    async getDefinitions(module) {
        const defs = await this.reportsRepository.findDefinitions(module);
        return defs.map((d) => this.mapDefinition(d));
    }
    async getDefinitionById(id) {
        const def = await this.reportsRepository.findDefinitionById(id);
        if (!def)
            throw new common_1.NotFoundException('Report Definition not found');
        return this.mapDefinition(def);
    }
    async updateDefinition(id, dto, userId) {
        const def = await this.reportsRepository.findDefinitionById(id);
        if (!def)
            throw new common_1.NotFoundException('Report Definition not found');
        if (dto.code && dto.code !== def.code) {
            const existing = await this.reportsRepository.findDefinitionByCode(dto.code);
            if (existing)
                throw new common_1.ConflictException(`Report Definition with code '${dto.code}' already exists`);
        }
        const updated = await this.reportsRepository.updateDefinition(id, { ...dto, updatedBy: userId });
        await this.reportsRepository.createAuditLog({
            reportId: id,
            action: 'DEFINITION_UPDATED',
            performedBy: userId,
            details: `Updated Report Definition: ${updated.name}`,
        });
        return this.mapDefinition(updated);
    }
    async softDeleteDefinition(id, userId) {
        const def = await this.reportsRepository.findDefinitionById(id);
        if (!def)
            throw new common_1.NotFoundException('Report Definition not found');
        await this.reportsRepository.softDeleteDefinition(id);
        await this.reportsRepository.createAuditLog({
            reportId: id,
            action: 'DEFINITION_DELETED',
            performedBy: userId,
            details: `Soft-deleted Report Definition: ${def.name}`,
        });
        return { message: 'Report Definition soft-deleted successfully' };
    }
    mapDefinition(d) {
        return {
            id: d.id,
            name: d.name,
            code: d.code,
            description: d.description || undefined,
            reportType: d.reportType,
            module: d.module,
            configuration: d.configuration ? JSON.parse(d.configuration) : undefined,
            isSystem: d.isSystem,
            isActive: d.isActive,
            createdBy: d.createdBy || undefined,
            createdAt: d.createdAt.toISOString(),
            updatedAt: d.updatedAt.toISOString(),
        };
    }
    async generateReport(userId, dto) {
        const generated = await this.reportsRepository.createGeneratedReport({
            ...dto,
            generatedBy: userId,
            status: 'GENERATED',
            filePath: `/exports/reports/RPT_${Date.now()}.${(dto.exportFormat || 'JSON').toLowerCase()}`,
        });
        await this.reportsRepository.createAuditLog({
            reportId: generated.id,
            action: 'REPORT_GENERATED',
            performedBy: userId,
            details: `Generated report: ${generated.reportName} format=${generated.exportFormat}`,
        });
        return this.mapGeneratedReport(generated);
    }
    async getGeneratedReports(userId) {
        const reports = await this.reportsRepository.findGeneratedReports(userId);
        return reports.map((r) => this.mapGeneratedReport(r));
    }
    async getGeneratedReportById(id) {
        const report = await this.reportsRepository.findGeneratedReportById(id);
        if (!report)
            throw new common_1.NotFoundException('Generated report not found');
        return this.mapGeneratedReport(report);
    }
    async exportReport(id, exportFormat, userId) {
        const report = await this.reportsRepository.findGeneratedReportById(id);
        if (!report)
            throw new common_1.NotFoundException('Generated report not found');
        const filePath = `/exports/reports/RPT_${id}_EXPORTED.${exportFormat.toLowerCase()}`;
        const updated = await this.reportsRepository.updateGeneratedReportStatus(id, 'EXPORTED', filePath);
        await this.reportsRepository.createAuditLog({
            reportId: id,
            action: 'REPORT_EXPORTED',
            performedBy: userId,
            details: `Exported report ${id} to ${exportFormat} format`,
        });
        return this.mapGeneratedReport(updated);
    }
    mapGeneratedReport(r) {
        return {
            id: r.id,
            reportDefinitionId: r.reportDefinitionId || undefined,
            generatedBy: r.generatedBy || undefined,
            reportName: r.reportName,
            filters: r.filters ? JSON.parse(r.filters) : undefined,
            exportFormat: r.exportFormat,
            filePath: r.filePath || undefined,
            status: r.status,
            generatedAt: r.generatedAt.toISOString(),
            expiresAt: r.expiresAt ? r.expiresAt.toISOString() : undefined,
        };
    }
    async createWidget(dto) {
        const existing = await this.reportsRepository.findWidgetByCode(dto.widgetCode);
        if (existing) {
            throw new common_1.ConflictException(`Dashboard Widget with code '${dto.widgetCode}' already exists`);
        }
        const widget = await this.reportsRepository.createWidget(dto);
        return this.mapWidget(widget);
    }
    async getWidgets(isEnabledOnly = false) {
        const widgets = await this.reportsRepository.findWidgets(isEnabledOnly);
        return widgets.map((w) => this.mapWidget(w));
    }
    async updateWidget(id, dto) {
        const widget = await this.reportsRepository.findWidgetById(id);
        if (!widget)
            throw new common_1.NotFoundException('Dashboard Widget not found');
        const updated = await this.reportsRepository.updateWidget(id, dto);
        return this.mapWidget(updated);
    }
    async reorderWidgets(dto) {
        await this.reportsRepository.reorderWidgets(dto.widgetOrders);
        return { message: 'Widgets reordered successfully' };
    }
    mapWidget(w) {
        return {
            id: w.id,
            title: w.title,
            widgetCode: w.widgetCode,
            widgetType: w.widgetType,
            module: w.module,
            configuration: w.configuration ? JSON.parse(w.configuration) : undefined,
            displayOrder: w.displayOrder,
            isEnabled: w.isEnabled,
            createdAt: w.createdAt.toISOString(),
        };
    }
    async getExecutiveDashboard(startDate, endDate) {
        const sDate = startDate ? new Date(startDate) : undefined;
        const eDate = endDate ? new Date(endDate) : undefined;
        return this.reportsRepository.getExecutiveDashboardData(sDate, eDate);
    }
    async getModuleAnalytics(module, startDate, endDate) {
        const sDate = startDate ? new Date(startDate) : undefined;
        const eDate = endDate ? new Date(endDate) : undefined;
        return this.reportsRepository.getModuleAnalytics(module, sDate, eDate);
    }
    async createAnalyticsSnapshot(dto) {
        const snapshot = await this.reportsRepository.createSnapshot(dto);
        return {
            id: snapshot.id,
            module: snapshot.module,
            metric: snapshot.metric,
            metricValue: snapshot.metricValue,
            snapshotDate: snapshot.snapshotDate.toISOString().split('T')[0],
            metadata: snapshot.metadata ? JSON.parse(snapshot.metadata) : undefined,
            createdAt: snapshot.createdAt.toISOString(),
        };
    }
    async getAnalyticsSnapshots(module, metric, startDate, endDate) {
        const sDate = startDate ? new Date(startDate) : undefined;
        const eDate = endDate ? new Date(endDate) : undefined;
        const snapshots = await this.reportsRepository.findSnapshots(module, metric, sDate, eDate);
        return snapshots.map((s) => ({
            id: s.id,
            module: s.module,
            metric: s.metric,
            metricValue: s.metricValue,
            snapshotDate: s.snapshotDate.toISOString().split('T')[0],
            metadata: s.metadata ? JSON.parse(s.metadata) : undefined,
            createdAt: s.createdAt.toISOString(),
        }));
    }
};
exports.ReportingService = ReportingService;
exports.ReportingService = ReportingService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('IReportsRepository')),
    __metadata("design:paramtypes", [Object, nestjs_pino_1.Logger])
], ReportingService);
//# sourceMappingURL=reports.service.js.map
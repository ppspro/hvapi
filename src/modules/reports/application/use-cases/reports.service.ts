import { Injectable, NotFoundException, ConflictException, Inject } from '@nestjs/common';
import { IReportsRepository } from '../../domain/repositories/reports.repository.interface';
import {
  ReportDefinitionResponseDto, GeneratedReportResponseDto, DashboardWidgetResponseDto,
  AnalyticsSnapshotResponseDto, ExecutiveDashboardResponseDto,
} from '../../presentation/dto/reports-response.dto';
import {
  CreateReportDefinitionDto, GenerateReportDto, CreateDashboardWidgetDto,
  ReorderWidgetsDto, CreateAnalyticsSnapshotDto,
} from '../../presentation/dto/reports-enterprise.dto';
import { Logger } from 'nestjs-pino';

@Injectable()
export class ReportingService {
  constructor(
    @Inject('IReportsRepository')
    private readonly reportsRepository: IReportsRepository,
    private readonly logger: Logger,
  ) {}

  // ─── Report Definitions ──────────────────────────────────────────────────

  async createDefinition(userId: string, dto: CreateReportDefinitionDto): Promise<ReportDefinitionResponseDto> {
    const existing = await this.reportsRepository.findDefinitionByCode(dto.code);
    if (existing) {
      throw new ConflictException(`Report Definition with code '${dto.code}' already exists`);
    }

    const created = await this.reportsRepository.createDefinition({ ...dto, createdBy: userId });
    await this.reportsRepository.createAuditLog({
      action: 'DEFINITION_CREATED',
      performedBy: userId,
      details: `Created Report Definition: ${created.name} (${created.code})`,
    });

    return this.mapDefinition(created);
  }

  async getDefinitions(module?: string): Promise<ReportDefinitionResponseDto[]> {
    const defs = await this.reportsRepository.findDefinitions(module);
    return defs.map((d) => this.mapDefinition(d));
  }

  async getDefinitionById(id: string): Promise<ReportDefinitionResponseDto> {
    const def = await this.reportsRepository.findDefinitionById(id);
    if (!def) throw new NotFoundException('Report Definition not found');
    return this.mapDefinition(def);
  }

  async updateDefinition(id: string, dto: Partial<CreateReportDefinitionDto>, userId: string): Promise<ReportDefinitionResponseDto> {
    const def = await this.reportsRepository.findDefinitionById(id);
    if (!def) throw new NotFoundException('Report Definition not found');

    if (dto.code && dto.code !== def.code) {
      const existing = await this.reportsRepository.findDefinitionByCode(dto.code);
      if (existing) throw new ConflictException(`Report Definition with code '${dto.code}' already exists`);
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

  async softDeleteDefinition(id: string, userId: string): Promise<{ message: string }> {
    const def = await this.reportsRepository.findDefinitionById(id);
    if (!def) throw new NotFoundException('Report Definition not found');

    await this.reportsRepository.softDeleteDefinition(id);
    await this.reportsRepository.createAuditLog({
      reportId: id,
      action: 'DEFINITION_DELETED',
      performedBy: userId,
      details: `Soft-deleted Report Definition: ${def.name}`,
    });

    return { message: 'Report Definition soft-deleted successfully' };
  }

  private mapDefinition(d: any): ReportDefinitionResponseDto {
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

  // ─── Report Generation & Export ──────────────────────────────────────────

  async generateReport(userId: string, dto: GenerateReportDto): Promise<GeneratedReportResponseDto> {
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

  async getGeneratedReports(userId?: string): Promise<GeneratedReportResponseDto[]> {
    const reports = await this.reportsRepository.findGeneratedReports(userId);
    return reports.map((r) => this.mapGeneratedReport(r));
  }

  async getGeneratedReportById(id: string): Promise<GeneratedReportResponseDto> {
    const report = await this.reportsRepository.findGeneratedReportById(id);
    if (!report) throw new NotFoundException('Generated report not found');
    return this.mapGeneratedReport(report);
  }

  async exportReport(id: string, exportFormat: string, userId: string): Promise<GeneratedReportResponseDto> {
    const report = await this.reportsRepository.findGeneratedReportById(id);
    if (!report) throw new NotFoundException('Generated report not found');

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

  private mapGeneratedReport(r: any): GeneratedReportResponseDto {
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

  // ─── Dashboard Widgets ───────────────────────────────────────────────────

  async createWidget(dto: CreateDashboardWidgetDto): Promise<DashboardWidgetResponseDto> {
    const existing = await this.reportsRepository.findWidgetByCode(dto.widgetCode);
    if (existing) {
      throw new ConflictException(`Dashboard Widget with code '${dto.widgetCode}' already exists`);
    }

    const widget = await this.reportsRepository.createWidget(dto);
    return this.mapWidget(widget);
  }

  async getWidgets(isEnabledOnly = false): Promise<DashboardWidgetResponseDto[]> {
    const widgets = await this.reportsRepository.findWidgets(isEnabledOnly);
    return widgets.map((w) => this.mapWidget(w));
  }

  async updateWidget(id: string, dto: Partial<CreateDashboardWidgetDto>): Promise<DashboardWidgetResponseDto> {
    const widget = await this.reportsRepository.findWidgetById(id);
    if (!widget) throw new NotFoundException('Dashboard Widget not found');

    const updated = await this.reportsRepository.updateWidget(id, dto);
    return this.mapWidget(updated);
  }

  async reorderWidgets(dto: ReorderWidgetsDto): Promise<{ message: string }> {
    await this.reportsRepository.reorderWidgets(dto.widgetOrders);
    return { message: 'Widgets reordered successfully' };
  }

  private mapWidget(w: any): DashboardWidgetResponseDto {
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

  // ─── Executive Dashboard & Analytics ─────────────────────────────────────

  async getExecutiveDashboard(startDate?: string, endDate?: string): Promise<ExecutiveDashboardResponseDto> {
    const sDate = startDate ? new Date(startDate) : undefined;
    const eDate = endDate ? new Date(endDate) : undefined;
    return this.reportsRepository.getExecutiveDashboardData(sDate, eDate);
  }

  async getModuleAnalytics(module: string, startDate?: string, endDate?: string): Promise<any> {
    const sDate = startDate ? new Date(startDate) : undefined;
    const eDate = endDate ? new Date(endDate) : undefined;
    return this.reportsRepository.getModuleAnalytics(module, sDate, eDate);
  }

  async createAnalyticsSnapshot(dto: CreateAnalyticsSnapshotDto): Promise<AnalyticsSnapshotResponseDto> {
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

  async getAnalyticsSnapshots(module: string, metric: string, startDate?: string, endDate?: string): Promise<AnalyticsSnapshotResponseDto[]> {
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
}

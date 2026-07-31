import { ReportDefinitionEntity, GeneratedReportEntity, DashboardWidgetEntity, AnalyticsSnapshotEntity, ReportAuditLogEntity } from '../entities/reports.entity';
export interface IReportsRepository {
    createDefinition(data: any): Promise<ReportDefinitionEntity>;
    findDefinitions(module?: string): Promise<ReportDefinitionEntity[]>;
    findDefinitionByCode(code: string): Promise<ReportDefinitionEntity | null>;
    findDefinitionById(id: string): Promise<ReportDefinitionEntity | null>;
    updateDefinition(id: string, data: any): Promise<ReportDefinitionEntity>;
    softDeleteDefinition(id: string): Promise<void>;
    createGeneratedReport(data: any): Promise<GeneratedReportEntity>;
    findGeneratedReports(userId?: string): Promise<GeneratedReportEntity[]>;
    findGeneratedReportById(id: string): Promise<GeneratedReportEntity | null>;
    updateGeneratedReportStatus(id: string, status: string, filePath?: string): Promise<GeneratedReportEntity>;
    createWidget(data: any): Promise<DashboardWidgetEntity>;
    findWidgets(isEnabledOnly?: boolean): Promise<DashboardWidgetEntity[]>;
    findWidgetByCode(code: string): Promise<DashboardWidgetEntity | null>;
    findWidgetById(id: string): Promise<DashboardWidgetEntity | null>;
    updateWidget(id: string, data: any): Promise<DashboardWidgetEntity>;
    reorderWidgets(widgetOrders: {
        id: string;
        displayOrder: number;
    }[]): Promise<void>;
    createSnapshot(data: any): Promise<AnalyticsSnapshotEntity>;
    findSnapshots(module: string, metric: string, startDate?: Date, endDate?: Date): Promise<AnalyticsSnapshotEntity[]>;
    createAuditLog(data: {
        reportId?: string;
        action: string;
        performedBy?: string;
        details?: string;
    }): Promise<ReportAuditLogEntity>;
    getExecutiveDashboardData(startDate?: Date, endDate?: Date): Promise<any>;
    getModuleAnalytics(module: string, startDate?: Date, endDate?: Date): Promise<any>;
}

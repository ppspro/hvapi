import { ReportingService } from '../../application/use-cases/reports.service';
import { ReportDefinitionResponseDto, GeneratedReportResponseDto, DashboardWidgetResponseDto, AnalyticsSnapshotResponseDto, ExecutiveDashboardResponseDto } from '../dto/reports-response.dto';
import { CreateReportDefinitionDto, GenerateReportDto, CreateDashboardWidgetDto, ReorderWidgetsDto, CreateAnalyticsSnapshotDto } from '../dto/reports-enterprise.dto';
export declare class ReportsController {
    private readonly reportingService;
    constructor(reportingService: ReportingService);
    getExecutiveDashboard(startDate?: string, endDate?: string): Promise<ExecutiveDashboardResponseDto>;
    getModuleAnalytics(module: string, startDate?: string, endDate?: string): Promise<any>;
    createDefinition(req: any, dto: CreateReportDefinitionDto): Promise<ReportDefinitionResponseDto>;
    getDefinitions(module?: string): Promise<ReportDefinitionResponseDto[]>;
    getDefinitionById(id: string): Promise<ReportDefinitionResponseDto>;
    updateDefinition(req: any, id: string, dto: Partial<CreateReportDefinitionDto>): Promise<ReportDefinitionResponseDto>;
    softDeleteDefinition(req: any, id: string): Promise<any>;
    generateReport(req: any, dto: GenerateReportDto): Promise<GeneratedReportResponseDto>;
    getGeneratedReports(req: any): Promise<GeneratedReportResponseDto[]>;
    getGeneratedReportById(id: string): Promise<GeneratedReportResponseDto>;
    exportReport(req: any, id: string, format: string): Promise<GeneratedReportResponseDto>;
    createWidget(dto: CreateDashboardWidgetDto): Promise<DashboardWidgetResponseDto>;
    getWidgets(isEnabledOnly?: boolean): Promise<DashboardWidgetResponseDto[]>;
    updateWidget(id: string, dto: Partial<CreateDashboardWidgetDto>): Promise<DashboardWidgetResponseDto>;
    reorderWidgets(dto: ReorderWidgetsDto): Promise<any>;
    createAnalyticsSnapshot(dto: CreateAnalyticsSnapshotDto): Promise<AnalyticsSnapshotResponseDto>;
    getAnalyticsSnapshots(module: string, metric: string, startDate?: string, endDate?: string): Promise<AnalyticsSnapshotResponseDto[]>;
}

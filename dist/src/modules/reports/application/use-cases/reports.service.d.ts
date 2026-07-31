import { IReportsRepository } from '../../domain/repositories/reports.repository.interface';
import { ReportDefinitionResponseDto, GeneratedReportResponseDto, DashboardWidgetResponseDto, AnalyticsSnapshotResponseDto, ExecutiveDashboardResponseDto } from '../../presentation/dto/reports-response.dto';
import { CreateReportDefinitionDto, GenerateReportDto, CreateDashboardWidgetDto, ReorderWidgetsDto, CreateAnalyticsSnapshotDto } from '../../presentation/dto/reports-enterprise.dto';
import { Logger } from 'nestjs-pino';
export declare class ReportingService {
    private readonly reportsRepository;
    private readonly logger;
    constructor(reportsRepository: IReportsRepository, logger: Logger);
    createDefinition(userId: string, dto: CreateReportDefinitionDto): Promise<ReportDefinitionResponseDto>;
    getDefinitions(module?: string): Promise<ReportDefinitionResponseDto[]>;
    getDefinitionById(id: string): Promise<ReportDefinitionResponseDto>;
    updateDefinition(id: string, dto: Partial<CreateReportDefinitionDto>, userId: string): Promise<ReportDefinitionResponseDto>;
    softDeleteDefinition(id: string, userId: string): Promise<{
        message: string;
    }>;
    private mapDefinition;
    generateReport(userId: string, dto: GenerateReportDto): Promise<GeneratedReportResponseDto>;
    getGeneratedReports(userId?: string): Promise<GeneratedReportResponseDto[]>;
    getGeneratedReportById(id: string): Promise<GeneratedReportResponseDto>;
    exportReport(id: string, exportFormat: string, userId: string): Promise<GeneratedReportResponseDto>;
    private mapGeneratedReport;
    createWidget(dto: CreateDashboardWidgetDto): Promise<DashboardWidgetResponseDto>;
    getWidgets(isEnabledOnly?: boolean): Promise<DashboardWidgetResponseDto[]>;
    updateWidget(id: string, dto: Partial<CreateDashboardWidgetDto>): Promise<DashboardWidgetResponseDto>;
    reorderWidgets(dto: ReorderWidgetsDto): Promise<{
        message: string;
    }>;
    private mapWidget;
    getExecutiveDashboard(startDate?: string, endDate?: string): Promise<ExecutiveDashboardResponseDto>;
    getModuleAnalytics(module: string, startDate?: string, endDate?: string): Promise<any>;
    createAnalyticsSnapshot(dto: CreateAnalyticsSnapshotDto): Promise<AnalyticsSnapshotResponseDto>;
    getAnalyticsSnapshots(module: string, metric: string, startDate?: string, endDate?: string): Promise<AnalyticsSnapshotResponseDto[]>;
}

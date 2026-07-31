export declare class CreateReportDefinitionDto {
    name: string;
    code: string;
    description?: string;
    reportType?: string;
    module: string;
    configuration?: any;
    isSystem?: boolean;
}
export declare class GenerateReportDto {
    reportDefinitionId?: string;
    reportName: string;
    filters?: any;
    exportFormat?: string;
}
export declare class CreateDashboardWidgetDto {
    title: string;
    widgetCode: string;
    widgetType: string;
    module: string;
    configuration?: any;
    displayOrder?: number;
}
export declare class WidgetOrderInputDto {
    id: string;
    displayOrder: number;
}
export declare class ReorderWidgetsDto {
    widgetOrders: WidgetOrderInputDto[];
}
export declare class CreateAnalyticsSnapshotDto {
    module: string;
    metric: string;
    metricValue: number;
    snapshotDate?: string;
    metadata?: any;
}

export declare class ReportDefinitionResponseDto {
    id: string;
    name: string;
    code: string;
    description?: string;
    reportType: string;
    module: string;
    configuration?: any;
    isSystem: boolean;
    isActive: boolean;
    createdBy?: string;
    createdAt: string;
    updatedAt: string;
}
export declare class GeneratedReportResponseDto {
    id: string;
    reportDefinitionId?: string;
    generatedBy?: string;
    reportName: string;
    filters?: any;
    exportFormat: string;
    filePath?: string;
    status: string;
    generatedAt: string;
    expiresAt?: string;
}
export declare class DashboardWidgetResponseDto {
    id: string;
    title: string;
    widgetCode: string;
    widgetType: string;
    module: string;
    configuration?: any;
    displayOrder: number;
    isEnabled: boolean;
    createdAt: string;
}
export declare class AnalyticsSnapshotResponseDto {
    id: string;
    module: string;
    metric: string;
    metricValue: number;
    snapshotDate: string;
    metadata?: any;
    createdAt: string;
}
export declare class ExecutiveDashboardResponseDto {
    platformOverview: {
        totalPatients: number;
        totalDoctors: number;
        totalFacilities: number;
        totalStaff: number;
        totalHealthCards: number;
        totalInsurancePolicies: number;
        totalImmunisations: number;
        totalReports: number;
        totalAuditLogs: number;
    };
}

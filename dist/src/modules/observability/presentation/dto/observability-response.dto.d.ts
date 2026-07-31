export declare class SystemMetricResponseDto {
    id: string;
    metricCategory: string;
    metricName: string;
    metricValue: number;
    unit: string;
    recordedAt: string;
    metadata?: any;
}
export declare class ApplicationLogResponseDto {
    id: string;
    severity: string;
    service: string;
    module: string;
    requestId?: string;
    traceId?: string;
    userId?: string;
    message: string;
    context?: any;
    createdAt: string;
}
export declare class TraceExecutionResponseDto {
    id: string;
    traceId: string;
    service: string;
    operation: string;
    status: string;
    startedAt: string;
    completedAt?: string;
    durationMs?: number;
    metadata?: any;
}
export declare class BackgroundJobResponseDto {
    id: string;
    jobName: string;
    jobType: string;
    status: string;
    startedAt?: string;
    completedAt?: string;
    durationMs?: number;
    failureReason?: string;
    metadata?: any;
    createdAt: string;
}
export declare class SystemHealthCheckResponseDto {
    id: string;
    component: string;
    status: string;
    checkedAt: string;
    responseTimeMs: number;
    details?: any;
}
export declare class PerformanceSnapshotResponseDto {
    id: string;
    cpuUsage: number;
    memoryUsage: number;
    databaseLatency: number;
    cacheHitRate: number;
    queueDepth: number;
    activeUsers: number;
    requestRate: number;
    errorRate: number;
    createdAt: string;
}
export declare class ObservabilityDashboardResponseDto {
    overallStatus: string;
    totalRequests24h: number;
    avgResponseTimeMs: number;
    errorRatePercentage: number;
    cacheHitRatePercentage: number;
    queueDepth: number;
    activeUsers: number;
    unhealthyComponentsCount: number;
}

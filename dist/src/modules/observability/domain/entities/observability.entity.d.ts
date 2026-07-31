export declare class SystemMetricEntity {
    id: string;
    metricCategory: string;
    metricName: string;
    metricValue: number;
    unit: string;
    recordedAt: Date;
    metadata?: string | null;
    createdAt: Date;
    updatedAt: Date;
}
export declare class ApplicationLogEntity {
    id: string;
    severity: string;
    service: string;
    module: string;
    requestId?: string | null;
    traceId?: string | null;
    userId?: string | null;
    message: string;
    context?: string | null;
    createdAt: Date;
}
export declare class TraceExecutionEntity {
    id: string;
    traceId: string;
    service: string;
    operation: string;
    status: string;
    startedAt: Date;
    completedAt?: Date | null;
    durationMs?: number | null;
    metadata?: string | null;
    createdAt: Date;
    updatedAt: Date;
}
export declare class BackgroundJobEntity {
    id: string;
    jobName: string;
    jobType: string;
    status: string;
    startedAt?: Date | null;
    completedAt?: Date | null;
    durationMs?: number | null;
    failureReason?: string | null;
    metadata?: string | null;
    createdAt: Date;
    updatedAt: Date;
}
export declare class SystemHealthCheckEntity {
    id: string;
    component: string;
    status: string;
    checkedAt: Date;
    responseTimeMs: number;
    details?: string | null;
    createdAt: Date;
    updatedAt: Date;
}
export declare class PerformanceSnapshotEntity {
    id: string;
    cpuUsage: number;
    memoryUsage: number;
    databaseLatency: number;
    cacheHitRate: number;
    queueDepth: number;
    activeUsers: number;
    requestRate: number;
    errorRate: number;
    createdAt: Date;
}

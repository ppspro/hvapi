import { SystemMetricEntity, ApplicationLogEntity, TraceExecutionEntity, BackgroundJobEntity, SystemHealthCheckEntity, PerformanceSnapshotEntity } from '../entities/observability.entity';
export interface IObservabilityRepository {
    recordMetric(data: any): Promise<SystemMetricEntity>;
    findMetrics(category?: string, name?: string, limit?: number): Promise<SystemMetricEntity[]>;
    createLog(data: any): Promise<ApplicationLogEntity>;
    findLogs(severity?: string, requestId?: string, traceId?: string, limit?: number): Promise<ApplicationLogEntity[]>;
    createTrace(data: any): Promise<TraceExecutionEntity>;
    findTraces(traceId?: string, status?: string): Promise<TraceExecutionEntity[]>;
    updateTraceStatus(id: string, status: string, durationMs?: number): Promise<TraceExecutionEntity>;
    createBackgroundJob(data: any): Promise<BackgroundJobEntity>;
    findBackgroundJobs(status?: string): Promise<BackgroundJobEntity[]>;
    findBackgroundJobById(id: string): Promise<BackgroundJobEntity | null>;
    recordHealthCheck(data: any): Promise<SystemHealthCheckEntity>;
    getLatestHealthChecks(): Promise<SystemHealthCheckEntity[]>;
    recordPerformanceSnapshot(data: any): Promise<PerformanceSnapshotEntity>;
    getLatestPerformanceSnapshot(): Promise<PerformanceSnapshotEntity | null>;
    getDashboardStats(): Promise<{
        overallStatus: string;
        totalRequests24h: number;
        avgResponseTimeMs: number;
        errorRatePercentage: number;
        cacheHitRatePercentage: number;
        queueDepth: number;
        activeUsers: number;
        unhealthyComponentsCount: number;
    }>;
}

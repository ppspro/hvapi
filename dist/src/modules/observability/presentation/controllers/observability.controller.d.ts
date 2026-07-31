import { ObservabilityService } from '../../application/use-cases/observability.service';
import { SystemMetricResponseDto, ApplicationLogResponseDto, TraceExecutionResponseDto, BackgroundJobResponseDto, SystemHealthCheckResponseDto, PerformanceSnapshotResponseDto, ObservabilityDashboardResponseDto } from '../dto/observability-response.dto';
import { CreateMetricDto } from '../dto/observability-enterprise.dto';
export declare class ObservabilityController {
    private readonly observabilityService;
    constructor(observabilityService: ObservabilityService);
    getDashboard(): Promise<ObservabilityDashboardResponseDto>;
    getHealth(): Promise<{
        status: string;
        components: SystemHealthCheckResponseDto[];
    }>;
    getLiveness(): Promise<{
        status: string;
        timestamp: string;
    }>;
    getReadiness(): Promise<{
        status: string;
        database: string;
        timestamp: string;
    }>;
    recordMetric(dto: CreateMetricDto): Promise<SystemMetricResponseDto>;
    getMetrics(category?: string, name?: string): Promise<SystemMetricResponseDto[]>;
    getMetricsByCategory(category: string): Promise<SystemMetricResponseDto[]>;
    getLogs(severity?: string, requestId?: string, traceId?: string): Promise<ApplicationLogResponseDto[]>;
    getLogsByRequestId(requestId: string): Promise<ApplicationLogResponseDto[]>;
    getTraces(traceId?: string, status?: string): Promise<TraceExecutionResponseDto[]>;
    getTraceById(traceId: string): Promise<TraceExecutionResponseDto[]>;
    getBackgroundJobs(status?: string): Promise<BackgroundJobResponseDto[]>;
    getBackgroundJobById(id: string): Promise<BackgroundJobResponseDto>;
    getPerformanceSnapshot(): Promise<PerformanceSnapshotResponseDto>;
    getStatistics(): Promise<ObservabilityDashboardResponseDto>;
}

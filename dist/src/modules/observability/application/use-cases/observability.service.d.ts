import { IObservabilityRepository } from '../../domain/repositories/observability.repository.interface';
import { SystemMetricResponseDto, ApplicationLogResponseDto, TraceExecutionResponseDto, BackgroundJobResponseDto, SystemHealthCheckResponseDto, PerformanceSnapshotResponseDto, ObservabilityDashboardResponseDto } from '../../presentation/dto/observability-response.dto';
import { CreateMetricDto, CreateLogDto, CreateTraceDto, RecordHealthCheckDto } from '../../presentation/dto/observability-enterprise.dto';
import { Logger } from 'nestjs-pino';
export declare class ObservabilityService {
    private readonly observabilityRepository;
    private readonly logger;
    constructor(observabilityRepository: IObservabilityRepository, logger: Logger);
    getDashboardStats(): Promise<ObservabilityDashboardResponseDto>;
    recordMetric(dto: CreateMetricDto): Promise<SystemMetricResponseDto>;
    getMetrics(category?: string, name?: string): Promise<SystemMetricResponseDto[]>;
    createLog(userId: string | undefined, dto: CreateLogDto): Promise<ApplicationLogResponseDto>;
    getLogs(severity?: string, requestId?: string, traceId?: string): Promise<ApplicationLogResponseDto[]>;
    createTrace(dto: CreateTraceDto): Promise<TraceExecutionResponseDto>;
    getTraces(traceId?: string, status?: string): Promise<TraceExecutionResponseDto[]>;
    getBackgroundJobs(status?: string): Promise<BackgroundJobResponseDto[]>;
    getBackgroundJobById(id: string): Promise<BackgroundJobResponseDto>;
    recordHealthCheck(dto: RecordHealthCheckDto): Promise<SystemHealthCheckResponseDto>;
    getHealthStatus(): Promise<{
        status: string;
        components: SystemHealthCheckResponseDto[];
    }>;
    getPerformanceSnapshot(): Promise<PerformanceSnapshotResponseDto>;
}

import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { IObservabilityRepository } from '../../domain/repositories/observability.repository.interface';
import {
  SystemMetricResponseDto, ApplicationLogResponseDto, TraceExecutionResponseDto,
  BackgroundJobResponseDto, SystemHealthCheckResponseDto, PerformanceSnapshotResponseDto,
  ObservabilityDashboardResponseDto,
} from '../../presentation/dto/observability-response.dto';
import {
  CreateMetricDto, CreateLogDto, CreateTraceDto, RecordHealthCheckDto,
} from '../../presentation/dto/observability-enterprise.dto';
import { Logger } from 'nestjs-pino';

@Injectable()
export class ObservabilityService {
  constructor(
    @Inject('IObservabilityRepository')
    private readonly observabilityRepository: IObservabilityRepository,
    private readonly logger: Logger,
  ) {}

  // ─── Dashboard Stats ─────────────────────────────────────────────────────

  async getDashboardStats(): Promise<ObservabilityDashboardResponseDto> {
    return this.observabilityRepository.getDashboardStats();
  }

  // ─── Metrics ─────────────────────────────────────────────────────────────

  async recordMetric(dto: CreateMetricDto): Promise<SystemMetricResponseDto> {
    const metric = await this.observabilityRepository.recordMetric(dto);
    return {
      id: metric.id,
      metricCategory: metric.metricCategory,
      metricName: metric.metricName,
      metricValue: metric.metricValue,
      unit: metric.unit,
      recordedAt: metric.recordedAt.toISOString(),
      metadata: metric.metadata ? JSON.parse(metric.metadata) : undefined,
    };
  }

  async getMetrics(category?: string, name?: string): Promise<SystemMetricResponseDto[]> {
    const metrics = await this.observabilityRepository.findMetrics(category, name, 100);
    return metrics.map((m) => ({
      id: m.id,
      metricCategory: m.metricCategory,
      metricName: m.metricName,
      metricValue: m.metricValue,
      unit: m.unit,
      recordedAt: m.recordedAt.toISOString(),
      metadata: m.metadata ? JSON.parse(m.metadata) : undefined,
    }));
  }

  // ─── Logs ────────────────────────────────────────────────────────────────

  async createLog(userId: string | undefined, dto: CreateLogDto): Promise<ApplicationLogResponseDto> {
    const log = await this.observabilityRepository.createLog({ ...dto, userId });
    return {
      id: log.id,
      severity: log.severity,
      service: log.service,
      module: log.module,
      requestId: log.requestId || undefined,
      traceId: log.traceId || undefined,
      userId: log.userId || undefined,
      message: log.message,
      context: log.context ? JSON.parse(log.context) : undefined,
      createdAt: log.createdAt.toISOString(),
    };
  }

  async getLogs(severity?: string, requestId?: string, traceId?: string): Promise<ApplicationLogResponseDto[]> {
    const logs = await this.observabilityRepository.findLogs(severity, requestId, traceId, 100);
    return logs.map((l) => ({
      id: l.id,
      severity: l.severity,
      service: l.service,
      module: l.module,
      requestId: l.requestId || undefined,
      traceId: l.traceId || undefined,
      userId: l.userId || undefined,
      message: l.message,
      context: l.context ? JSON.parse(l.context) : undefined,
      createdAt: l.createdAt.toISOString(),
    }));
  }

  // ─── Traces ──────────────────────────────────────────────────────────────

  async createTrace(dto: CreateTraceDto): Promise<TraceExecutionResponseDto> {
    const trace = await this.observabilityRepository.createTrace(dto);
    return {
      id: trace.id,
      traceId: trace.traceId,
      service: trace.service,
      operation: trace.operation,
      status: trace.status,
      startedAt: trace.startedAt.toISOString(),
      completedAt: trace.completedAt ? trace.completedAt.toISOString() : undefined,
      durationMs: trace.durationMs || undefined,
      metadata: trace.metadata ? JSON.parse(trace.metadata) : undefined,
    };
  }

  async getTraces(traceId?: string, status?: string): Promise<TraceExecutionResponseDto[]> {
    const traces = await this.observabilityRepository.findTraces(traceId, status);
    return traces.map((t) => ({
      id: t.id,
      traceId: t.traceId,
      service: t.service,
      operation: t.operation,
      status: t.status,
      startedAt: t.startedAt.toISOString(),
      completedAt: t.completedAt ? t.completedAt.toISOString() : undefined,
      durationMs: t.durationMs || undefined,
      metadata: t.metadata ? JSON.parse(t.metadata) : undefined,
    }));
  }

  // ─── Background Jobs ─────────────────────────────────────────────────────

  async getBackgroundJobs(status?: string): Promise<BackgroundJobResponseDto[]> {
    const jobs = await this.observabilityRepository.findBackgroundJobs(status);
    return jobs.map((j) => ({
      id: j.id,
      jobName: j.jobName,
      jobType: j.jobType,
      status: j.status,
      startedAt: j.startedAt ? j.startedAt.toISOString() : undefined,
      completedAt: j.completedAt ? j.completedAt.toISOString() : undefined,
      durationMs: j.durationMs || undefined,
      failureReason: j.failureReason || undefined,
      metadata: j.metadata ? JSON.parse(j.metadata) : undefined,
      createdAt: j.createdAt.toISOString(),
    }));
  }

  async getBackgroundJobById(id: string): Promise<BackgroundJobResponseDto> {
    const job = await this.observabilityRepository.findBackgroundJobById(id);
    if (!job) throw new NotFoundException('Background job not found');
    return {
      id: job.id,
      jobName: job.jobName,
      jobType: job.jobType,
      status: job.status,
      startedAt: job.startedAt ? job.startedAt.toISOString() : undefined,
      completedAt: job.completedAt ? job.completedAt.toISOString() : undefined,
      durationMs: job.durationMs || undefined,
      failureReason: job.failureReason || undefined,
      metadata: job.metadata ? JSON.parse(job.metadata) : undefined,
      createdAt: job.createdAt.toISOString(),
    };
  }

  // ─── Health Checks ───────────────────────────────────────────────────────

  async recordHealthCheck(dto: RecordHealthCheckDto): Promise<SystemHealthCheckResponseDto> {
    const hc = await this.observabilityRepository.recordHealthCheck(dto);
    return {
      id: hc.id,
      component: hc.component,
      status: hc.status,
      checkedAt: hc.checkedAt.toISOString(),
      responseTimeMs: hc.responseTimeMs,
      details: hc.details ? JSON.parse(hc.details) : undefined,
    };
  }

  async getHealthStatus(): Promise<{ status: string; components: SystemHealthCheckResponseDto[] }> {
    const checks = await this.observabilityRepository.getLatestHealthChecks();
    const unhealthy = checks.some((c) => c.status !== 'HEALTHY');
    return {
      status: unhealthy ? 'DEGRADED' : 'HEALTHY',
      components: checks.map((c) => ({
        id: c.id,
        component: c.component,
        status: c.status,
        checkedAt: c.checkedAt.toISOString(),
        responseTimeMs: c.responseTimeMs,
        details: c.details ? JSON.parse(c.details) : undefined,
      })),
    };
  }

  // ─── Performance ─────────────────────────────────────────────────────────

  async getPerformanceSnapshot(): Promise<PerformanceSnapshotResponseDto> {
    let snap = await this.observabilityRepository.getLatestPerformanceSnapshot();
    if (!snap) {
      snap = await this.observabilityRepository.recordPerformanceSnapshot({});
    }
    return {
      id: snap.id,
      cpuUsage: snap.cpuUsage,
      memoryUsage: snap.memoryUsage,
      databaseLatency: snap.databaseLatency,
      cacheHitRate: snap.cacheHitRate,
      queueDepth: snap.queueDepth,
      activeUsers: snap.activeUsers,
      requestRate: snap.requestRate,
      errorRate: snap.errorRate,
      createdAt: snap.createdAt.toISOString(),
    };
  }
}

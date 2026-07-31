"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ObservabilityService = void 0;
const common_1 = require("@nestjs/common");
const nestjs_pino_1 = require("nestjs-pino");
let ObservabilityService = class ObservabilityService {
    constructor(observabilityRepository, logger) {
        this.observabilityRepository = observabilityRepository;
        this.logger = logger;
    }
    async getDashboardStats() {
        return this.observabilityRepository.getDashboardStats();
    }
    async recordMetric(dto) {
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
    async getMetrics(category, name) {
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
    async createLog(userId, dto) {
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
    async getLogs(severity, requestId, traceId) {
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
    async createTrace(dto) {
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
    async getTraces(traceId, status) {
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
    async getBackgroundJobs(status) {
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
    async getBackgroundJobById(id) {
        const job = await this.observabilityRepository.findBackgroundJobById(id);
        if (!job)
            throw new common_1.NotFoundException('Background job not found');
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
    async recordHealthCheck(dto) {
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
    async getHealthStatus() {
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
    async getPerformanceSnapshot() {
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
};
exports.ObservabilityService = ObservabilityService;
exports.ObservabilityService = ObservabilityService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('IObservabilityRepository')),
    __metadata("design:paramtypes", [Object, nestjs_pino_1.Logger])
], ObservabilityService);
//# sourceMappingURL=observability.service.js.map
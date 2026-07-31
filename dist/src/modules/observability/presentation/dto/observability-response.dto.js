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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ObservabilityDashboardResponseDto = exports.PerformanceSnapshotResponseDto = exports.SystemHealthCheckResponseDto = exports.BackgroundJobResponseDto = exports.TraceExecutionResponseDto = exports.ApplicationLogResponseDto = exports.SystemMetricResponseDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class SystemMetricResponseDto {
}
exports.SystemMetricResponseDto = SystemMetricResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], SystemMetricResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], SystemMetricResponseDto.prototype, "metricCategory", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], SystemMetricResponseDto.prototype, "metricName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], SystemMetricResponseDto.prototype, "metricValue", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], SystemMetricResponseDto.prototype, "unit", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], SystemMetricResponseDto.prototype, "recordedAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true }),
    __metadata("design:type", Object)
], SystemMetricResponseDto.prototype, "metadata", void 0);
class ApplicationLogResponseDto {
}
exports.ApplicationLogResponseDto = ApplicationLogResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], ApplicationLogResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], ApplicationLogResponseDto.prototype, "severity", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], ApplicationLogResponseDto.prototype, "service", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], ApplicationLogResponseDto.prototype, "module", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true }),
    __metadata("design:type", String)
], ApplicationLogResponseDto.prototype, "requestId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true }),
    __metadata("design:type", String)
], ApplicationLogResponseDto.prototype, "traceId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true }),
    __metadata("design:type", String)
], ApplicationLogResponseDto.prototype, "userId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], ApplicationLogResponseDto.prototype, "message", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true }),
    __metadata("design:type", Object)
], ApplicationLogResponseDto.prototype, "context", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], ApplicationLogResponseDto.prototype, "createdAt", void 0);
class TraceExecutionResponseDto {
}
exports.TraceExecutionResponseDto = TraceExecutionResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], TraceExecutionResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], TraceExecutionResponseDto.prototype, "traceId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], TraceExecutionResponseDto.prototype, "service", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], TraceExecutionResponseDto.prototype, "operation", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], TraceExecutionResponseDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], TraceExecutionResponseDto.prototype, "startedAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true }),
    __metadata("design:type", String)
], TraceExecutionResponseDto.prototype, "completedAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true }),
    __metadata("design:type", Number)
], TraceExecutionResponseDto.prototype, "durationMs", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true }),
    __metadata("design:type", Object)
], TraceExecutionResponseDto.prototype, "metadata", void 0);
class BackgroundJobResponseDto {
}
exports.BackgroundJobResponseDto = BackgroundJobResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], BackgroundJobResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], BackgroundJobResponseDto.prototype, "jobName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], BackgroundJobResponseDto.prototype, "jobType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], BackgroundJobResponseDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true }),
    __metadata("design:type", String)
], BackgroundJobResponseDto.prototype, "startedAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true }),
    __metadata("design:type", String)
], BackgroundJobResponseDto.prototype, "completedAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true }),
    __metadata("design:type", Number)
], BackgroundJobResponseDto.prototype, "durationMs", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true }),
    __metadata("design:type", String)
], BackgroundJobResponseDto.prototype, "failureReason", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true }),
    __metadata("design:type", Object)
], BackgroundJobResponseDto.prototype, "metadata", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], BackgroundJobResponseDto.prototype, "createdAt", void 0);
class SystemHealthCheckResponseDto {
}
exports.SystemHealthCheckResponseDto = SystemHealthCheckResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], SystemHealthCheckResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], SystemHealthCheckResponseDto.prototype, "component", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], SystemHealthCheckResponseDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], SystemHealthCheckResponseDto.prototype, "checkedAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], SystemHealthCheckResponseDto.prototype, "responseTimeMs", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true }),
    __metadata("design:type", Object)
], SystemHealthCheckResponseDto.prototype, "details", void 0);
class PerformanceSnapshotResponseDto {
}
exports.PerformanceSnapshotResponseDto = PerformanceSnapshotResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], PerformanceSnapshotResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], PerformanceSnapshotResponseDto.prototype, "cpuUsage", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], PerformanceSnapshotResponseDto.prototype, "memoryUsage", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], PerformanceSnapshotResponseDto.prototype, "databaseLatency", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], PerformanceSnapshotResponseDto.prototype, "cacheHitRate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], PerformanceSnapshotResponseDto.prototype, "queueDepth", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], PerformanceSnapshotResponseDto.prototype, "activeUsers", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], PerformanceSnapshotResponseDto.prototype, "requestRate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], PerformanceSnapshotResponseDto.prototype, "errorRate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], PerformanceSnapshotResponseDto.prototype, "createdAt", void 0);
class ObservabilityDashboardResponseDto {
}
exports.ObservabilityDashboardResponseDto = ObservabilityDashboardResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], ObservabilityDashboardResponseDto.prototype, "overallStatus", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], ObservabilityDashboardResponseDto.prototype, "totalRequests24h", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], ObservabilityDashboardResponseDto.prototype, "avgResponseTimeMs", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], ObservabilityDashboardResponseDto.prototype, "errorRatePercentage", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], ObservabilityDashboardResponseDto.prototype, "cacheHitRatePercentage", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], ObservabilityDashboardResponseDto.prototype, "queueDepth", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], ObservabilityDashboardResponseDto.prototype, "activeUsers", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], ObservabilityDashboardResponseDto.prototype, "unhealthyComponentsCount", void 0);
//# sourceMappingURL=observability-response.dto.js.map
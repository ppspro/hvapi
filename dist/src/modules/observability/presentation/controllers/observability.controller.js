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
exports.ObservabilityController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const passport_1 = require("@nestjs/passport");
const observability_service_1 = require("../../application/use-cases/observability.service");
const observability_response_dto_1 = require("../dto/observability-response.dto");
const observability_enterprise_dto_1 = require("../dto/observability-enterprise.dto");
let ObservabilityController = class ObservabilityController {
    constructor(observabilityService) {
        this.observabilityService = observabilityService;
    }
    async getDashboard() {
        return this.observabilityService.getDashboardStats();
    }
    async getHealth() {
        return this.observabilityService.getHealthStatus();
    }
    async getLiveness() {
        return { status: 'UP', timestamp: new Date().toISOString() };
    }
    async getReadiness() {
        const health = await this.observabilityService.getHealthStatus();
        return {
            status: health.status === 'HEALTHY' ? 'READY' : 'DEGRADED',
            database: 'CONNECTED',
            timestamp: new Date().toISOString(),
        };
    }
    async recordMetric(dto) {
        return this.observabilityService.recordMetric(dto);
    }
    async getMetrics(category, name) {
        return this.observabilityService.getMetrics(category, name);
    }
    async getMetricsByCategory(category) {
        return this.observabilityService.getMetrics(category);
    }
    async getLogs(severity, requestId, traceId) {
        return this.observabilityService.getLogs(severity, requestId, traceId);
    }
    async getLogsByRequestId(requestId) {
        return this.observabilityService.getLogs(undefined, requestId);
    }
    async getTraces(traceId, status) {
        return this.observabilityService.getTraces(traceId, status);
    }
    async getTraceById(traceId) {
        return this.observabilityService.getTraces(traceId);
    }
    async getBackgroundJobs(status) {
        return this.observabilityService.getBackgroundJobs(status);
    }
    async getBackgroundJobById(id) {
        return this.observabilityService.getBackgroundJobById(id);
    }
    async getPerformanceSnapshot() {
        return this.observabilityService.getPerformanceSnapshot();
    }
    async getStatistics() {
        return this.observabilityService.getDashboardStats();
    }
};
exports.ObservabilityController = ObservabilityController;
__decorate([
    (0, common_1.Get)('dashboard'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, swagger_1.ApiBearerAuth)('JWT-Auth'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Get Enterprise Observability Platform operational dashboard' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: observability_response_dto_1.ObservabilityDashboardResponseDto }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ObservabilityController.prototype, "getDashboard", null);
__decorate([
    (0, common_1.Get)('health'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Get full component health diagnostics status' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Component health map' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ObservabilityController.prototype, "getHealth", null);
__decorate([
    (0, common_1.Get)('health/live'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Liveness probe endpoint' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Service is live' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ObservabilityController.prototype, "getLiveness", null);
__decorate([
    (0, common_1.Get)('health/ready'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Readiness probe endpoint' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Service is ready to handle traffic' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ObservabilityController.prototype, "getReadiness", null);
__decorate([
    (0, common_1.Post)('metrics'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, swagger_1.ApiBearerAuth)('JWT-Auth'),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, swagger_1.ApiOperation)({ summary: 'Record custom system/application metric' }),
    (0, swagger_1.ApiResponse)({ status: 201, type: observability_response_dto_1.SystemMetricResponseDto }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [observability_enterprise_dto_1.CreateMetricDto]),
    __metadata("design:returntype", Promise)
], ObservabilityController.prototype, "recordMetric", null);
__decorate([
    (0, common_1.Get)('metrics'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, swagger_1.ApiBearerAuth)('JWT-Auth'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'List recorded metrics' }),
    (0, swagger_1.ApiQuery)({ name: 'category', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'name', required: false }),
    (0, swagger_1.ApiResponse)({ status: 200, type: [observability_response_dto_1.SystemMetricResponseDto] }),
    __param(0, (0, common_1.Query)('category')),
    __param(1, (0, common_1.Query)('name')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], ObservabilityController.prototype, "getMetrics", null);
__decorate([
    (0, common_1.Get)('metrics/:category'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, swagger_1.ApiBearerAuth)('JWT-Auth'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Get metrics by category' }),
    (0, swagger_1.ApiParam)({ name: 'category', description: 'Metric Category' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: [observability_response_dto_1.SystemMetricResponseDto] }),
    __param(0, (0, common_1.Param)('category')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ObservabilityController.prototype, "getMetricsByCategory", null);
__decorate([
    (0, common_1.Get)('logs'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, swagger_1.ApiBearerAuth)('JWT-Auth'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Query structured application logs' }),
    (0, swagger_1.ApiQuery)({ name: 'severity', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'requestId', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'traceId', required: false }),
    (0, swagger_1.ApiResponse)({ status: 200, type: [observability_response_dto_1.ApplicationLogResponseDto] }),
    __param(0, (0, common_1.Query)('severity')),
    __param(1, (0, common_1.Query)('requestId')),
    __param(2, (0, common_1.Query)('traceId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], ObservabilityController.prototype, "getLogs", null);
__decorate([
    (0, common_1.Get)('logs/:requestId'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, swagger_1.ApiBearerAuth)('JWT-Auth'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Get all logs for a specific Request ID' }),
    (0, swagger_1.ApiParam)({ name: 'requestId', description: 'Request ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: [observability_response_dto_1.ApplicationLogResponseDto] }),
    __param(0, (0, common_1.Param)('requestId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ObservabilityController.prototype, "getLogsByRequestId", null);
__decorate([
    (0, common_1.Get)('traces'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, swagger_1.ApiBearerAuth)('JWT-Auth'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'List distributed trace executions' }),
    (0, swagger_1.ApiQuery)({ name: 'traceId', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'status', required: false }),
    (0, swagger_1.ApiResponse)({ status: 200, type: [observability_response_dto_1.TraceExecutionResponseDto] }),
    __param(0, (0, common_1.Query)('traceId')),
    __param(1, (0, common_1.Query)('status')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], ObservabilityController.prototype, "getTraces", null);
__decorate([
    (0, common_1.Get)('traces/:traceId'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, swagger_1.ApiBearerAuth)('JWT-Auth'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Get distributed trace by Trace ID' }),
    (0, swagger_1.ApiParam)({ name: 'traceId', description: 'Trace ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: [observability_response_dto_1.TraceExecutionResponseDto] }),
    __param(0, (0, common_1.Param)('traceId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ObservabilityController.prototype, "getTraceById", null);
__decorate([
    (0, common_1.Get)('jobs'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, swagger_1.ApiBearerAuth)('JWT-Auth'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'List background job execution history' }),
    (0, swagger_1.ApiQuery)({ name: 'status', required: false }),
    (0, swagger_1.ApiResponse)({ status: 200, type: [observability_response_dto_1.BackgroundJobResponseDto] }),
    __param(0, (0, common_1.Query)('status')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ObservabilityController.prototype, "getBackgroundJobs", null);
__decorate([
    (0, common_1.Get)('jobs/:id'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, swagger_1.ApiBearerAuth)('JWT-Auth'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Get background job execution details by ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Job ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: observability_response_dto_1.BackgroundJobResponseDto }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ObservabilityController.prototype, "getBackgroundJobById", null);
__decorate([
    (0, common_1.Get)('performance'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, swagger_1.ApiBearerAuth)('JWT-Auth'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Get latest application performance snapshot' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: observability_response_dto_1.PerformanceSnapshotResponseDto }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ObservabilityController.prototype, "getPerformanceSnapshot", null);
__decorate([
    (0, common_1.Get)('statistics'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, swagger_1.ApiBearerAuth)('JWT-Auth'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Get platform operational throughput & latency statistics' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: observability_response_dto_1.ObservabilityDashboardResponseDto }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ObservabilityController.prototype, "getStatistics", null);
exports.ObservabilityController = ObservabilityController = __decorate([
    (0, swagger_1.ApiTags)('Observability & Performance'),
    (0, common_1.Controller)('observability'),
    __metadata("design:paramtypes", [observability_service_1.ObservabilityService])
], ObservabilityController);
//# sourceMappingURL=observability.controller.js.map
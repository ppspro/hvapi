import {
  Controller, Get, Post, Body, Param, Query, UseGuards, Req, HttpCode, HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse as SwaggerResponse, ApiBearerAuth, ApiParam, ApiQuery } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { ObservabilityService } from '../../application/use-cases/observability.service';
import {
  SystemMetricResponseDto, ApplicationLogResponseDto, TraceExecutionResponseDto,
  BackgroundJobResponseDto, SystemHealthCheckResponseDto, PerformanceSnapshotResponseDto,
  ObservabilityDashboardResponseDto,
} from '../dto/observability-response.dto';
import {
  CreateMetricDto, CreateLogDto, CreateTraceDto, RecordHealthCheckDto,
} from '../dto/observability-enterprise.dto';

@ApiTags('Observability & Performance')
@Controller('observability')
export class ObservabilityController {
  constructor(private readonly observabilityService: ObservabilityService) {}

  // ─── Dashboard ───────────────────────────────────────────────────────────

  @Get('dashboard')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('JWT-Auth')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get Enterprise Observability Platform operational dashboard' })
  @SwaggerResponse({ status: 200, type: ObservabilityDashboardResponseDto })
  async getDashboard(): Promise<ObservabilityDashboardResponseDto> {
    return this.observabilityService.getDashboardStats();
  }

  // ─── Health Monitoring (Public endpoints for Liveness/Readiness probes) ────

  @Get('health')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get full component health diagnostics status' })
  @SwaggerResponse({ status: 200, description: 'Component health map' })
  async getHealth(): Promise<{ status: string; components: SystemHealthCheckResponseDto[] }> {
    return this.observabilityService.getHealthStatus();
  }

  @Get('health/live')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Liveness probe endpoint' })
  @SwaggerResponse({ status: 200, description: 'Service is live' })
  async getLiveness(): Promise<{ status: string; timestamp: string }> {
    return { status: 'UP', timestamp: new Date().toISOString() };
  }

  @Get('health/ready')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Readiness probe endpoint' })
  @SwaggerResponse({ status: 200, description: 'Service is ready to handle traffic' })
  async getReadiness(): Promise<{ status: string; database: string; timestamp: string }> {
    const health = await this.observabilityService.getHealthStatus();
    return {
      status: health.status === 'HEALTHY' ? 'READY' : 'DEGRADED',
      database: 'CONNECTED',
      timestamp: new Date().toISOString(),
    };
  }

  // ─── Metrics ─────────────────────────────────────────────────────────────

  @Post('metrics')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('JWT-Auth')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Record custom system/application metric' })
  @SwaggerResponse({ status: 201, type: SystemMetricResponseDto })
  async recordMetric(@Body() dto: CreateMetricDto): Promise<SystemMetricResponseDto> {
    return this.observabilityService.recordMetric(dto);
  }

  @Get('metrics')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('JWT-Auth')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'List recorded metrics' })
  @ApiQuery({ name: 'category', required: false })
  @ApiQuery({ name: 'name', required: false })
  @SwaggerResponse({ status: 200, type: [SystemMetricResponseDto] })
  async getMetrics(
    @Query('category') category?: string,
    @Query('name') name?: string,
  ): Promise<SystemMetricResponseDto[]> {
    return this.observabilityService.getMetrics(category, name);
  }

  @Get('metrics/:category')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('JWT-Auth')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get metrics by category' })
  @ApiParam({ name: 'category', description: 'Metric Category' })
  @SwaggerResponse({ status: 200, type: [SystemMetricResponseDto] })
  async getMetricsByCategory(@Param('category') category: string): Promise<SystemMetricResponseDto[]> {
    return this.observabilityService.getMetrics(category);
  }

  // ─── Structured Logs ─────────────────────────────────────────────────────

  @Get('logs')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('JWT-Auth')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Query structured application logs' })
  @ApiQuery({ name: 'severity', required: false })
  @ApiQuery({ name: 'requestId', required: false })
  @ApiQuery({ name: 'traceId', required: false })
  @SwaggerResponse({ status: 200, type: [ApplicationLogResponseDto] })
  async getLogs(
    @Query('severity') severity?: string,
    @Query('requestId') requestId?: string,
    @Query('traceId') traceId?: string,
  ): Promise<ApplicationLogResponseDto[]> {
    return this.observabilityService.getLogs(severity, requestId, traceId);
  }

  @Get('logs/:requestId')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('JWT-Auth')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get all logs for a specific Request ID' })
  @ApiParam({ name: 'requestId', description: 'Request ID' })
  @SwaggerResponse({ status: 200, type: [ApplicationLogResponseDto] })
  async getLogsByRequestId(@Param('requestId') requestId: string): Promise<ApplicationLogResponseDto[]> {
    return this.observabilityService.getLogs(undefined, requestId);
  }

  // ─── Distributed Tracing ─────────────────────────────────────────────────

  @Get('traces')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('JWT-Auth')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'List distributed trace executions' })
  @ApiQuery({ name: 'traceId', required: false })
  @ApiQuery({ name: 'status', required: false })
  @SwaggerResponse({ status: 200, type: [TraceExecutionResponseDto] })
  async getTraces(
    @Query('traceId') traceId?: string,
    @Query('status') status?: string,
  ): Promise<TraceExecutionResponseDto[]> {
    return this.observabilityService.getTraces(traceId, status);
  }

  @Get('traces/:traceId')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('JWT-Auth')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get distributed trace by Trace ID' })
  @ApiParam({ name: 'traceId', description: 'Trace ID' })
  @SwaggerResponse({ status: 200, type: [TraceExecutionResponseDto] })
  async getTraceById(@Param('traceId') traceId: string): Promise<TraceExecutionResponseDto[]> {
    return this.observabilityService.getTraces(traceId);
  }

  // ─── Background Jobs ─────────────────────────────────────────────────────

  @Get('jobs')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('JWT-Auth')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'List background job execution history' })
  @ApiQuery({ name: 'status', required: false })
  @SwaggerResponse({ status: 200, type: [BackgroundJobResponseDto] })
  async getBackgroundJobs(@Query('status') status?: string): Promise<BackgroundJobResponseDto[]> {
    return this.observabilityService.getBackgroundJobs(status);
  }

  @Get('jobs/:id')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('JWT-Auth')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get background job execution details by ID' })
  @ApiParam({ name: 'id', description: 'Job ID' })
  @SwaggerResponse({ status: 200, type: BackgroundJobResponseDto })
  async getBackgroundJobById(@Param('id') id: string): Promise<BackgroundJobResponseDto> {
    return this.observabilityService.getBackgroundJobById(id);
  }

  // ─── Performance Monitoring ──────────────────────────────────────────────

  @Get('performance')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('JWT-Auth')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get latest application performance snapshot' })
  @SwaggerResponse({ status: 200, type: PerformanceSnapshotResponseDto })
  async getPerformanceSnapshot(): Promise<PerformanceSnapshotResponseDto> {
    return this.observabilityService.getPerformanceSnapshot();
  }

  @Get('statistics')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('JWT-Auth')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get platform operational throughput & latency statistics' })
  @SwaggerResponse({ status: 200, type: ObservabilityDashboardResponseDto })
  async getStatistics(): Promise<ObservabilityDashboardResponseDto> {
    return this.observabilityService.getDashboardStats();
  }
}

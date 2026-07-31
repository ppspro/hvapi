import { ApiProperty } from '@nestjs/swagger';

export class SystemMetricResponseDto {
  @ApiProperty() id!: string;
  @ApiProperty() metricCategory!: string;
  @ApiProperty() metricName!: string;
  @ApiProperty() metricValue!: number;
  @ApiProperty() unit!: string;
  @ApiProperty() recordedAt!: string;
  @ApiProperty({ nullable: true }) metadata?: any;
}

export class ApplicationLogResponseDto {
  @ApiProperty() id!: string;
  @ApiProperty() severity!: string;
  @ApiProperty() service!: string;
  @ApiProperty() module!: string;
  @ApiProperty({ nullable: true }) requestId?: string;
  @ApiProperty({ nullable: true }) traceId?: string;
  @ApiProperty({ nullable: true }) userId?: string;
  @ApiProperty() message!: string;
  @ApiProperty({ nullable: true }) context?: any;
  @ApiProperty() createdAt!: string;
}

export class TraceExecutionResponseDto {
  @ApiProperty() id!: string;
  @ApiProperty() traceId!: string;
  @ApiProperty() service!: string;
  @ApiProperty() operation!: string;
  @ApiProperty() status!: string;
  @ApiProperty() startedAt!: string;
  @ApiProperty({ nullable: true }) completedAt?: string;
  @ApiProperty({ nullable: true }) durationMs?: number;
  @ApiProperty({ nullable: true }) metadata?: any;
}

export class BackgroundJobResponseDto {
  @ApiProperty() id!: string;
  @ApiProperty() jobName!: string;
  @ApiProperty() jobType!: string;
  @ApiProperty() status!: string;
  @ApiProperty({ nullable: true }) startedAt?: string;
  @ApiProperty({ nullable: true }) completedAt?: string;
  @ApiProperty({ nullable: true }) durationMs?: number;
  @ApiProperty({ nullable: true }) failureReason?: string;
  @ApiProperty({ nullable: true }) metadata?: any;
  @ApiProperty() createdAt!: string;
}

export class SystemHealthCheckResponseDto {
  @ApiProperty() id!: string;
  @ApiProperty() component!: string;
  @ApiProperty() status!: string;
  @ApiProperty() checkedAt!: string;
  @ApiProperty() responseTimeMs!: number;
  @ApiProperty({ nullable: true }) details?: any;
}

export class PerformanceSnapshotResponseDto {
  @ApiProperty() id!: string;
  @ApiProperty() cpuUsage!: number;
  @ApiProperty() memoryUsage!: number;
  @ApiProperty() databaseLatency!: number;
  @ApiProperty() cacheHitRate!: number;
  @ApiProperty() queueDepth!: number;
  @ApiProperty() activeUsers!: number;
  @ApiProperty() requestRate!: number;
  @ApiProperty() errorRate!: number;
  @ApiProperty() createdAt!: string;
}

export class ObservabilityDashboardResponseDto {
  @ApiProperty() overallStatus!: string;
  @ApiProperty() totalRequests24h!: number;
  @ApiProperty() avgResponseTimeMs!: number;
  @ApiProperty() errorRatePercentage!: number;
  @ApiProperty() cacheHitRatePercentage!: number;
  @ApiProperty() queueDepth!: number;
  @ApiProperty() activeUsers!: number;
  @ApiProperty() unhealthyComponentsCount!: number;
}

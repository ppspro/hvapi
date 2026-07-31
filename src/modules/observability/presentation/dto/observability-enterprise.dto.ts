import { IsNotEmpty, IsString, IsOptional, IsInt, IsNumber, IsArray, IsEnum, IsObject } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateMetricDto {
  @ApiProperty({ example: 'API', enum: ['SYSTEM', 'APPLICATION', 'DATABASE', 'CACHE', 'QUEUE', 'API', 'SECURITY', 'OCR', 'NOTIFICATION'] })
  @IsNotEmpty()
  @IsString()
  metricCategory!: string;

  @ApiProperty({ example: 'http_request_duration_ms' })
  @IsNotEmpty()
  @IsString()
  metricName!: string;

  @ApiProperty({ example: 45.2 })
  @IsNotEmpty()
  @IsNumber()
  metricValue!: number;

  @ApiProperty({ example: 'ms', required: false })
  @IsOptional()
  @IsString()
  unit?: string;

  @ApiProperty({ example: { path: '/api/v1/patients', method: 'GET' }, required: false })
  @IsOptional()
  @IsObject()
  metadata?: any;
}

export class CreateLogDto {
  @ApiProperty({ example: 'INFO', enum: ['TRACE', 'DEBUG', 'INFO', 'WARN', 'ERROR', 'FATAL'], required: false })
  @IsOptional()
  @IsString()
  severity?: string;

  @ApiProperty({ example: 'patient-module', required: false })
  @IsOptional()
  @IsString()
  module?: string;

  @ApiProperty({ example: 'req-uuid-1', required: false })
  @IsOptional()
  @IsString()
  requestId?: string;

  @ApiProperty({ example: 'trace-uuid-1', required: false })
  @IsOptional()
  @IsString()
  traceId?: string;

  @ApiProperty({ example: 'Patient profile retrieved successfully' })
  @IsNotEmpty()
  @IsString()
  message!: string;

  @ApiProperty({ example: { patientId: 'patient-1' }, required: false })
  @IsOptional()
  @IsObject()
  context?: any;
}

export class CreateTraceDto {
  @ApiProperty({ example: 'trace-uuid-999' })
  @IsNotEmpty()
  @IsString()
  traceId!: string;

  @ApiProperty({ example: 'PatientService.getProfile' })
  @IsNotEmpty()
  @IsString()
  operation!: string;

  @ApiProperty({ example: { dbQueries: 2 }, required: false })
  @IsOptional()
  @IsObject()
  metadata?: any;
}

export class RecordHealthCheckDto {
  @ApiProperty({ example: 'postgresql' })
  @IsNotEmpty()
  @IsString()
  component!: string;

  @ApiProperty({ example: 'HEALTHY', enum: ['HEALTHY', 'DEGRADED', 'UNHEALTHY', 'OFFLINE'], required: false })
  @IsOptional()
  @IsString()
  status?: string;

  @ApiProperty({ example: 4, required: false })
  @IsOptional()
  @IsInt()
  responseTimeMs?: number;

  @ApiProperty({ example: { activeConnections: 12 }, required: false })
  @IsOptional()
  @IsObject()
  details?: any;
}

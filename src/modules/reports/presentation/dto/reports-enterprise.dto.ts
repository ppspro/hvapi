import { IsNotEmpty, IsString, IsOptional, IsInt, IsBoolean, IsObject, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CreateReportDefinitionDto {
  @ApiProperty({ example: 'Monthly Patient Registration Summary' })
  @IsNotEmpty()
  @IsString()
  name!: string;

  @ApiProperty({ example: 'RPT-PATIENT-MONTHLY-REG' })
  @IsNotEmpty()
  @IsString()
  code!: string;

  @ApiProperty({ example: 'Aggregated monthly patient onboarding statistics and growth metrics', required: false })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ example: 'SUMMARY', enum: ['SUMMARY', 'DETAILED', 'STATISTICAL', 'COMPLIANCE', 'AUDIT', 'CUSTOM'], required: false })
  @IsOptional()
  @IsString()
  reportType?: string;

  @ApiProperty({ example: 'patient' })
  @IsNotEmpty()
  @IsString()
  module!: string;

  @ApiProperty({ example: { groupBy: 'gender', includeGrowth: true }, required: false })
  @IsOptional()
  @IsObject()
  configuration?: any;

  @ApiProperty({ example: false, required: false })
  @IsOptional()
  @IsBoolean()
  isSystem?: boolean;
}

export class GenerateReportDto {
  @ApiProperty({ example: 'rpt-def-uuid-1', required: false })
  @IsOptional()
  @IsString()
  reportDefinitionId?: string;

  @ApiProperty({ example: 'Executive Monthly Summary Report' })
  @IsNotEmpty()
  @IsString()
  reportName!: string;

  @ApiProperty({ example: { startDate: '2025-01-01', endDate: '2025-01-31' }, required: false })
  @IsOptional()
  @IsObject()
  filters?: any;

  @ApiProperty({ example: 'JSON', enum: ['PDF', 'CSV', 'XLSX', 'JSON'], required: false })
  @IsOptional()
  @IsString()
  exportFormat?: string;
}

export class CreateDashboardWidgetDto {
  @ApiProperty({ example: 'Patient Growth Chart' })
  @IsNotEmpty()
  @IsString()
  title!: string;

  @ApiProperty({ example: 'WIDGET-PATIENT-GROWTH' })
  @IsNotEmpty()
  @IsString()
  widgetCode!: string;

  @ApiProperty({ example: 'BAR_CHART', enum: ['CARD_STAT', 'LINE_CHART', 'BAR_CHART', 'PIE_CHART', 'TABLE'] })
  @IsNotEmpty()
  @IsString()
  widgetType!: string;

  @ApiProperty({ example: 'patient' })
  @IsNotEmpty()
  @IsString()
  module!: string;

  @ApiProperty({ example: { refreshRateSeconds: 60 }, required: false })
  @IsOptional()
  @IsObject()
  configuration?: any;

  @ApiProperty({ example: 1, required: false })
  @IsOptional()
  @IsInt()
  displayOrder?: number;
}

export class WidgetOrderInputDto {
  @ApiProperty({ example: 'widget-uuid-1' })
  @IsNotEmpty()
  @IsString()
  id!: string;

  @ApiProperty({ example: 1 })
  @IsNotEmpty()
  @IsInt()
  displayOrder!: number;
}

export class ReorderWidgetsDto {
  @ApiProperty({ type: [WidgetOrderInputDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => WidgetOrderInputDto)
  widgetOrders!: WidgetOrderInputDto[];
}

export class CreateAnalyticsSnapshotDto {
  @ApiProperty({ example: 'patient' })
  @IsNotEmpty()
  @IsString()
  module!: string;

  @ApiProperty({ example: 'daily_registrations' })
  @IsNotEmpty()
  @IsString()
  metric!: string;

  @ApiProperty({ example: 45.0 })
  @IsNotEmpty()
  metricValue!: number;

  @ApiProperty({ example: '2025-08-01', required: false })
  @IsOptional()
  @IsString()
  snapshotDate?: string;

  @ApiProperty({ example: { source: 'automated_cron' }, required: false })
  @IsOptional()
  @IsObject()
  metadata?: any;
}

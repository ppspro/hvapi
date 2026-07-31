import { ApiProperty } from '@nestjs/swagger';

export class ReportDefinitionResponseDto {
  @ApiProperty() id!: string;
  @ApiProperty() name!: string;
  @ApiProperty() code!: string;
  @ApiProperty({ nullable: true }) description?: string;
  @ApiProperty() reportType!: string;
  @ApiProperty() module!: string;
  @ApiProperty({ nullable: true }) configuration?: any;
  @ApiProperty() isSystem!: boolean;
  @ApiProperty() isActive!: boolean;
  @ApiProperty({ nullable: true }) createdBy?: string;
  @ApiProperty() createdAt!: string;
  @ApiProperty() updatedAt!: string;
}

export class GeneratedReportResponseDto {
  @ApiProperty() id!: string;
  @ApiProperty({ nullable: true }) reportDefinitionId?: string;
  @ApiProperty({ nullable: true }) generatedBy?: string;
  @ApiProperty() reportName!: string;
  @ApiProperty({ nullable: true }) filters?: any;
  @ApiProperty() exportFormat!: string;
  @ApiProperty({ nullable: true }) filePath?: string;
  @ApiProperty() status!: string;
  @ApiProperty() generatedAt!: string;
  @ApiProperty({ nullable: true }) expiresAt?: string;
}

export class DashboardWidgetResponseDto {
  @ApiProperty() id!: string;
  @ApiProperty() title!: string;
  @ApiProperty() widgetCode!: string;
  @ApiProperty() widgetType!: string;
  @ApiProperty() module!: string;
  @ApiProperty({ nullable: true }) configuration?: any;
  @ApiProperty() displayOrder!: number;
  @ApiProperty() isEnabled!: boolean;
  @ApiProperty() createdAt!: string;
}

export class AnalyticsSnapshotResponseDto {
  @ApiProperty() id!: string;
  @ApiProperty() module!: string;
  @ApiProperty() metric!: string;
  @ApiProperty() metricValue!: number;
  @ApiProperty() snapshotDate!: string;
  @ApiProperty({ nullable: true }) metadata?: any;
  @ApiProperty() createdAt!: string;
}

export class ExecutiveDashboardResponseDto {
  @ApiProperty() platformOverview!: {
    totalPatients: number;
    totalDoctors: number;
    totalFacilities: number;
    totalStaff: number;
    totalHealthCards: number;
    totalInsurancePolicies: number;
    totalImmunisations: number;
    totalReports: number;
    totalAuditLogs: number;
  };
}

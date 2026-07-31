export class ReportDefinitionEntity {
  id!: string;
  name!: string;
  code!: string;
  description?: string | null;
  reportType!: string;
  module!: string;
  configuration?: string | null;
  isSystem!: boolean;
  isActive!: boolean;
  createdBy?: string | null;
  updatedBy?: string | null;
  isDeleted!: boolean;
  deletedAt?: Date | null;
  createdAt!: Date;
  updatedAt!: Date;
}

export class GeneratedReportEntity {
  id!: string;
  reportDefinitionId?: string | null;
  generatedBy?: string | null;
  reportName!: string;
  filters?: string | null;
  exportFormat!: string;
  filePath?: string | null;
  status!: string;
  generatedAt!: Date;
  expiresAt?: Date | null;
  createdAt!: Date;
  updatedAt!: Date;
}

export class DashboardWidgetEntity {
  id!: string;
  title!: string;
  widgetCode!: string;
  widgetType!: string;
  module!: string;
  configuration?: string | null;
  displayOrder!: number;
  isEnabled!: boolean;
  createdAt!: Date;
  updatedAt!: Date;
}

export class AnalyticsSnapshotEntity {
  id!: string;
  module!: string;
  metric!: string;
  metricValue!: number;
  snapshotDate!: Date;
  metadata?: string | null;
  createdAt!: Date;
}

export class ReportAuditLogEntity {
  id!: string;
  reportId?: string | null;
  action!: string;
  performedBy?: string | null;
  details?: string | null;
  createdAt!: Date;
}

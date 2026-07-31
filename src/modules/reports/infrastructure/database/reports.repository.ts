import { Injectable } from '@nestjs/common';
import { DatabaseService } from '@database/database.service';
import { IReportsRepository } from '../../domain/repositories/reports.repository.interface';
import {
  ReportDefinitionEntity, GeneratedReportEntity, DashboardWidgetEntity,
  AnalyticsSnapshotEntity, ReportAuditLogEntity,
} from '../../domain/entities/reports.entity';

@Injectable()
export class ReportsRepository implements IReportsRepository {
  constructor(private readonly db: DatabaseService) {}

  // ─── Report Definitions ──────────────────────────────────────────────────

  async createDefinition(data: any): Promise<ReportDefinitionEntity> {
    const code = data.code || `RPT-${data.module.toUpperCase()}-${Date.now().toString().slice(-4)}`;
    return (await this.db.reportDefinition.create({
      data: {
        name: data.name,
        code,
        description: data.description || null,
        reportType: (data.reportType as any) || 'SUMMARY',
        module: data.module,
        configuration: data.configuration ? JSON.stringify(data.configuration) : null,
        isSystem: data.isSystem ?? false,
        isActive: data.isActive ?? true,
        createdBy: data.createdBy || null,
      },
    })) as unknown as ReportDefinitionEntity;
  }

  async findDefinitions(module?: string): Promise<ReportDefinitionEntity[]> {
    return (await this.db.reportDefinition.findMany({
      where: {
        isDeleted: false,
        ...(module ? { module } : {}),
      },
      orderBy: { createdAt: 'desc' },
    })) as unknown as ReportDefinitionEntity[];
  }

  async findDefinitionByCode(code: string): Promise<ReportDefinitionEntity | null> {
    return (await this.db.reportDefinition.findFirst({
      where: { code, isDeleted: false },
    })) as unknown as ReportDefinitionEntity | null;
  }

  async findDefinitionById(id: string): Promise<ReportDefinitionEntity | null> {
    return (await this.db.reportDefinition.findFirst({
      where: { id, isDeleted: false },
    })) as unknown as ReportDefinitionEntity | null;
  }

  async updateDefinition(id: string, data: any): Promise<ReportDefinitionEntity> {
    return (await this.db.reportDefinition.update({
      where: { id },
      data: {
        name: data.name || undefined,
        description: data.description || undefined,
        reportType: data.reportType as any || undefined,
        module: data.module || undefined,
        configuration: data.configuration ? JSON.stringify(data.configuration) : undefined,
        isActive: data.isActive ?? undefined,
        updatedBy: data.updatedBy || undefined,
      },
    })) as unknown as ReportDefinitionEntity;
  }

  async softDeleteDefinition(id: string): Promise<void> {
    await this.db.reportDefinition.update({
      where: { id },
      data: { isDeleted: true, deletedAt: new Date() },
    });
  }

  // ─── Generated Reports ───────────────────────────────────────────────────

  async createGeneratedReport(data: any): Promise<GeneratedReportEntity> {
    return (await this.db.generatedReport.create({
      data: {
        reportDefinitionId: data.reportDefinitionId || null,
        generatedBy: data.generatedBy || null,
        reportName: data.reportName,
        filters: data.filters ? JSON.stringify(data.filters) : null,
        exportFormat: (data.exportFormat as any) || 'JSON',
        filePath: data.filePath || null,
        status: (data.status as any) || 'GENERATED',
        expiresAt: data.expiresAt ? new Date(data.expiresAt) : null,
      },
    })) as unknown as GeneratedReportEntity;
  }

  async findGeneratedReports(userId?: string): Promise<GeneratedReportEntity[]> {
    return (await this.db.generatedReport.findMany({
      where: userId ? { generatedBy: userId } : {},
      include: { reportDefinition: true },
      orderBy: { generatedAt: 'desc' },
    })) as unknown as GeneratedReportEntity[];
  }

  async findGeneratedReportById(id: string): Promise<GeneratedReportEntity | null> {
    return (await this.db.generatedReport.findUnique({
      where: { id },
      include: { reportDefinition: true },
    })) as unknown as GeneratedReportEntity | null;
  }

  async updateGeneratedReportStatus(id: string, status: string, filePath?: string): Promise<GeneratedReportEntity> {
    return (await this.db.generatedReport.update({
      where: { id },
      data: {
        status: status as any,
        filePath: filePath || undefined,
      },
    })) as unknown as GeneratedReportEntity;
  }

  // ─── Dashboard Widgets ───────────────────────────────────────────────────

  async createWidget(data: any): Promise<DashboardWidgetEntity> {
    return (await this.db.dashboardWidget.create({
      data: {
        title: data.title,
        widgetCode: data.widgetCode,
        widgetType: data.widgetType,
        module: data.module,
        configuration: data.configuration ? JSON.stringify(data.configuration) : null,
        displayOrder: data.displayOrder ?? 0,
        isEnabled: data.isEnabled ?? true,
      },
    })) as unknown as DashboardWidgetEntity;
  }

  async findWidgets(isEnabledOnly = false): Promise<DashboardWidgetEntity[]> {
    return (await this.db.dashboardWidget.findMany({
      where: isEnabledOnly ? { isEnabled: true } : {},
      orderBy: [{ displayOrder: 'asc' }, { createdAt: 'desc' }],
    })) as unknown as DashboardWidgetEntity[];
  }

  async findWidgetByCode(code: string): Promise<DashboardWidgetEntity | null> {
    return (await this.db.dashboardWidget.findUnique({
      where: { widgetCode: code },
    })) as unknown as DashboardWidgetEntity | null;
  }

  async findWidgetById(id: string): Promise<DashboardWidgetEntity | null> {
    return (await this.db.dashboardWidget.findUnique({
      where: { id },
    })) as unknown as DashboardWidgetEntity | null;
  }

  async updateWidget(id: string, data: any): Promise<DashboardWidgetEntity> {
    return (await this.db.dashboardWidget.update({
      where: { id },
      data: {
        title: data.title || undefined,
        widgetType: data.widgetType || undefined,
        module: data.module || undefined,
        configuration: data.configuration ? JSON.stringify(data.configuration) : undefined,
        displayOrder: data.displayOrder ?? undefined,
        isEnabled: data.isEnabled ?? undefined,
      },
    })) as unknown as DashboardWidgetEntity;
  }

  async reorderWidgets(widgetOrders: { id: string; displayOrder: number }[]): Promise<void> {
    for (const item of widgetOrders) {
      await this.db.dashboardWidget.update({
        where: { id: item.id },
        data: { displayOrder: item.displayOrder },
      });
    }
  }

  // ─── Analytics Snapshots ─────────────────────────────────────────────────

  async createSnapshot(data: any): Promise<AnalyticsSnapshotEntity> {
    return (await this.db.analyticsSnapshot.create({
      data: {
        module: data.module,
        metric: data.metric,
        metricValue: data.metricValue,
        snapshotDate: new Date(data.snapshotDate || Date.now()),
        metadata: data.metadata ? JSON.stringify(data.metadata) : null,
      },
    })) as unknown as AnalyticsSnapshotEntity;
  }

  async findSnapshots(module: string, metric: string, startDate?: Date, endDate?: Date): Promise<AnalyticsSnapshotEntity[]> {
    const where: any = { module, metric };
    if (startDate || endDate) {
      where.snapshotDate = {};
      if (startDate) where.snapshotDate.gte = startDate;
      if (endDate) where.snapshotDate.lte = endDate;
    }
    return (await this.db.analyticsSnapshot.findMany({
      where,
      orderBy: { snapshotDate: 'asc' },
    })) as unknown as AnalyticsSnapshotEntity[];
  }

  // ─── Audit ───────────────────────────────────────────────────────────────

  async createAuditLog(data: { reportId?: string; action: string; performedBy?: string; details?: string }): Promise<ReportAuditLogEntity> {
    return (await this.db.analyticsReportAuditLog.create({
      data: {
        reportId: data.reportId || null,
        action: data.action,
        performedBy: data.performedBy || null,
        details: data.details || null,
      },
    })) as unknown as ReportAuditLogEntity;
  }

  // ─── Aggregated Domain Analytics (Read-Only) ─────────────────────────────

  async getExecutiveDashboardData(startDate?: Date, endDate?: Date): Promise<any> {
    const dateFilter = startDate || endDate ? {
      createdAt: {
        ...(startDate ? { gte: startDate } : {}),
        ...(endDate ? { lte: endDate } : {}),
      },
    } : {};

    const [
      totalPatients,
      totalDoctors,
      totalFacilities,
      totalStaff,
      totalHealthCards,
      totalInsurancePolicies,
      totalImmunisations,
      totalReports,
      totalAuditLogs,
    ] = await Promise.all([
      this.db.patientProfile.count({ where: { ...dateFilter, isDeleted: false } }),
      this.db.doctorProfile.count({ where: { ...dateFilter, isDeleted: false } }),
      this.db.facility.count({ where: { ...dateFilter, isDeleted: false } }),
      this.db.staffMember.count({ where: { ...dateFilter, isDeleted: false } }),
      this.db.healthCard.count({ where: { ...dateFilter, isDeleted: false } }),
      this.db.insurancePolicy.count({ where: { ...dateFilter, isDeleted: false } }),
      this.db.vaccinationRecord.count({ where: dateFilter }),
      this.db.generatedReport.count({ where: dateFilter }),
      this.db.auditLog.count({ where: dateFilter }),
    ]);

    return {
      platformOverview: {
        totalPatients,
        totalDoctors,
        totalFacilities,
        totalStaff,
        totalHealthCards,
        totalInsurancePolicies,
        totalImmunisations,
        totalReports,
        totalAuditLogs,
      },
    };
  }

  async getModuleAnalytics(module: string, startDate?: Date, endDate?: Date): Promise<any> {
    const dateFilter = startDate || endDate ? {
      createdAt: {
        ...(startDate ? { gte: startDate } : {}),
        ...(endDate ? { lte: endDate } : {}),
      },
    } : {};

    const mod = module.toLowerCase();

    switch (mod) {
      case 'patient': {
        const total = await this.db.patientProfile.count({ where: { ...dateFilter, isDeleted: false } });
        const male = await this.db.patientProfile.count({ where: { ...dateFilter, gender: 'MALE', isDeleted: false } });
        const female = await this.db.patientProfile.count({ where: { ...dateFilter, gender: 'FEMALE', isDeleted: false } });
        return { module: 'patient', total, genderDistribution: { male, female, other: total - male - female } };
      }
      case 'doctor': {
        const total = await this.db.doctorProfile.count({ where: { ...dateFilter, isDeleted: false } });
        const verified = await this.db.doctorProfile.count({ where: { ...dateFilter, verificationStatus: 'VERIFIED', isDeleted: false } });
        const pending = await this.db.doctorProfile.count({ where: { ...dateFilter, verificationStatus: 'PENDING', isDeleted: false } });
        return { module: 'doctor', total, verificationStatus: { verified, pending, other: total - verified - pending } };
      }
      case 'facility': {
        const total = await this.db.facility.count({ where: { ...dateFilter, isDeleted: false } });
        const verified = await this.db.facility.count({ where: { ...dateFilter, verificationStatus: 'VERIFIED', isDeleted: false } });
        return { module: 'facility', total, verified };
      }
      case 'staff': {
        const total = await this.db.staffMember.count({ where: { ...dateFilter, isDeleted: false } });
        const active = await this.db.staffMember.count({ where: { ...dateFilter, employmentStatus: 'ACTIVE', isDeleted: false } });
        return { module: 'staff', total, active };
      }
      case 'insurance': {
        const policies = await this.db.insurancePolicy.count({ where: { ...dateFilter, isDeleted: false } });
        const active = await this.db.insurancePolicy.count({ where: { ...dateFilter, status: 'ACTIVE', isDeleted: false } });
        return { module: 'insurance', policies, activePolicies: active };
      }
      case 'immunisation': {
        const total = await this.db.vaccinationRecord.count({ where: dateFilter });
        const completed = await this.db.vaccinationRecord.count({ where: { ...dateFilter, status: 'COMPLETED' } });
        return { module: 'immunisation', totalRecords: total, completed };
      }
      default: {
        return { module, count: 0 };
      }
    }
  }
}

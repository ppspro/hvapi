import { Injectable } from '@nestjs/common';
import { DatabaseService } from '@database/database.service';
import { ISecurityRepository } from '../../domain/repositories/security.repository.interface';
import {
  SecurityConsentRecordEntity, EncryptionKeyEntity, RetentionPolicyEntity,
  SecurityIncidentEntity, SecurityPlatformAuditLogEntity, ComplianceReportEntity,
} from '../../domain/entities/security.entity';

@Injectable()
export class PrismaSecurityRepository implements ISecurityRepository {
  constructor(private readonly db: DatabaseService) {}

  // ─── Consents ─────────────────────────────────────────────────────────────

  async createConsent(data: any): Promise<SecurityConsentRecordEntity> {
    return (await this.db.securityConsentRecord.create({
      data: {
        patientId: data.patientId,
        consentType: (data.consentType as any) || 'TREATMENT',
        status: (data.status as any) || 'GRANTED',
        purpose: data.purpose,
        grantedAt: new Date(),
        expiresAt: data.expiresAt ? new Date(data.expiresAt) : null,
        capturedBy: data.capturedBy || null,
        evidenceReference: data.evidenceReference || null,
      },
    })) as unknown as SecurityConsentRecordEntity;
  }

  async findConsents(patientId?: string, status?: string): Promise<SecurityConsentRecordEntity[]> {
    return (await this.db.securityConsentRecord.findMany({
      where: {
        isDeleted: false,
        ...(patientId ? { patientId } : {}),
        ...(status ? { status: status as any } : {}),
      },
      orderBy: { createdAt: 'desc' },
    })) as unknown as SecurityConsentRecordEntity[];
  }

  async findConsentById(id: string): Promise<SecurityConsentRecordEntity | null> {
    return (await this.db.securityConsentRecord.findFirst({
      where: { id, isDeleted: false },
    })) as unknown as SecurityConsentRecordEntity | null;
  }

  async withdrawConsent(id: string): Promise<SecurityConsentRecordEntity> {
    return (await this.db.securityConsentRecord.update({
      where: { id },
      data: {
        status: 'WITHDRAWN',
        withdrawnAt: new Date(),
      },
    })) as unknown as SecurityConsentRecordEntity;
  }

  // ─── Retention Policies ──────────────────────────────────────────────────

  async createRetentionPolicy(data: any): Promise<RetentionPolicyEntity> {
    return (await this.db.retentionPolicy.create({
      data: {
        name: data.name,
        resourceType: data.resourceType,
        retentionPeriodDays: data.retentionPeriodDays ?? 2555,
        action: (data.action as any) || 'ARCHIVE',
        isActive: data.isActive ?? true,
      },
    })) as unknown as RetentionPolicyEntity;
  }

  async findRetentionPolicies(): Promise<RetentionPolicyEntity[]> {
    return (await this.db.retentionPolicy.findMany({
      where: { isDeleted: false },
      orderBy: { resourceType: 'asc' },
    })) as unknown as RetentionPolicyEntity[];
  }

  async findRetentionPolicyById(id: string): Promise<RetentionPolicyEntity | null> {
    return (await this.db.retentionPolicy.findFirst({
      where: { id, isDeleted: false },
    })) as unknown as RetentionPolicyEntity | null;
  }

  async updateRetentionPolicy(id: string, data: any): Promise<RetentionPolicyEntity> {
    return (await this.db.retentionPolicy.update({
      where: { id },
      data: {
        name: data.name || undefined,
        retentionPeriodDays: data.retentionPeriodDays ?? undefined,
        action: data.action ? (data.action as any) : undefined,
        isActive: data.isActive ?? undefined,
      },
    })) as unknown as RetentionPolicyEntity;
  }

  async softDeleteRetentionPolicy(id: string): Promise<void> {
    await this.db.retentionPolicy.update({
      where: { id },
      data: { isDeleted: true, deletedAt: new Date() },
    });
  }

  // ─── Security Incidents ──────────────────────────────────────────────────

  async createIncident(data: any): Promise<SecurityIncidentEntity> {
    return (await this.db.securityIncident.create({
      data: {
        title: data.title,
        description: data.description,
        severity: (data.severity as any) || 'MEDIUM',
        status: 'OPEN',
        reportedBy: data.reportedBy || null,
      },
    })) as unknown as SecurityIncidentEntity;
  }

  async findIncidents(severity?: string, status?: string): Promise<SecurityIncidentEntity[]> {
    return (await this.db.securityIncident.findMany({
      where: {
        isDeleted: false,
        ...(severity ? { severity: severity as any } : {}),
        ...(status ? { status } : {}),
      },
      orderBy: { createdAt: 'desc' },
    })) as unknown as SecurityIncidentEntity[];
  }

  async findIncidentById(id: string): Promise<SecurityIncidentEntity | null> {
    return (await this.db.securityIncident.findFirst({
      where: { id, isDeleted: false },
    })) as unknown as SecurityIncidentEntity | null;
  }

  async resolveIncident(id: string, resolvedBy: string): Promise<SecurityIncidentEntity> {
    return (await this.db.securityIncident.update({
      where: { id },
      data: {
        status: 'RESOLVED',
        resolvedBy,
        resolvedAt: new Date(),
      },
    })) as unknown as SecurityIncidentEntity;
  }

  // ─── Encryption Keys ─────────────────────────────────────────────────────

  async findActiveEncryptionKey(): Promise<EncryptionKeyEntity | null> {
    return (await this.db.encryptionKey.findFirst({
      where: { status: 'ACTIVE' },
      orderBy: { version: 'desc' },
    })) as unknown as EncryptionKeyEntity | null;
  }

  async createEncryptionKey(data: any): Promise<EncryptionKeyEntity> {
    return (await this.db.encryptionKey.create({
      data: {
        keyIdentifier: data.keyIdentifier,
        algorithm: data.algorithm || 'AES-256-GCM',
        version: data.version || 1,
        status: 'ACTIVE',
        activatedAt: new Date(),
      },
    })) as unknown as EncryptionKeyEntity;
  }

  async rotateEncryptionKey(keyIdentifier: string): Promise<EncryptionKeyEntity> {
    const active = await this.findActiveEncryptionKey();
    const newVersion = (active?.version || 1) + 1;

    if (active) {
      await this.db.encryptionKey.update({
        where: { id: active.id },
        data: { status: 'ROTATING', rotationDate: new Date() },
      });
    }

    return (await this.db.encryptionKey.create({
      data: {
        keyIdentifier,
        algorithm: 'AES-256-GCM',
        version: newVersion,
        status: 'ACTIVE',
        activatedAt: new Date(),
      },
    })) as unknown as EncryptionKeyEntity;
  }

  // ─── Compliance Reports ─────────────────────────────────────────────────

  async createComplianceReport(data: any): Promise<ComplianceReportEntity> {
    return (await this.db.complianceReport.create({
      data: {
        reportName: data.reportName,
        reportType: data.reportType,
        generatedBy: data.generatedBy || null,
        summary: data.summary || null,
        metadata: data.metadata ? JSON.stringify(data.metadata) : null,
      },
    })) as unknown as ComplianceReportEntity;
  }

  async findComplianceReports(): Promise<ComplianceReportEntity[]> {
    return (await this.db.complianceReport.findMany({
      orderBy: { createdAt: 'desc' },
    })) as unknown as ComplianceReportEntity[];
  }

  // ─── Audit Logs ──────────────────────────────────────────────────────────

  async createAuditLog(data: {
    userId?: string;
    action: string;
    resource: string;
    resourceId?: string;
    ipAddress?: string;
    userAgent?: string;
    result?: string;
    details?: string;
  }): Promise<SecurityPlatformAuditLogEntity> {
    return (await this.db.securityPlatformAuditLog.create({
      data: {
        userId: data.userId || null,
        action: data.action,
        resource: data.resource,
        resourceId: data.resourceId || null,
        ipAddress: data.ipAddress || null,
        userAgent: data.userAgent || null,
        result: data.result || 'SUCCESS',
        details: data.details || null,
      },
    })) as unknown as SecurityPlatformAuditLogEntity;
  }

  async findAuditLogs(userId?: string, resource?: string, limit = 100): Promise<SecurityPlatformAuditLogEntity[]> {
    return (await this.db.securityPlatformAuditLog.findMany({
      where: {
        ...(userId ? { userId } : {}),
        ...(resource ? { resource } : {}),
      },
      orderBy: { createdAt: 'desc' },
      take: limit,
    })) as unknown as SecurityPlatformAuditLogEntity[];
  }

  // ─── Security Stats Summary ──────────────────────────────────────────────

  async getSecurityDashboardStats() {
    const [
      activeConsentsCount,
      activeRetentionPoliciesCount,
      openIncidentsCount,
      criticalIncidentsCount,
      activeKey,
      complianceReportsCount,
      totalAuditLogsCount,
    ] = await Promise.all([
      this.db.securityConsentRecord.count({ where: { isDeleted: false, status: 'GRANTED' } }),
      this.db.retentionPolicy.count({ where: { isDeleted: false, isActive: true } }),
      this.db.securityIncident.count({ where: { isDeleted: false, status: 'OPEN' } }),
      this.db.securityIncident.count({ where: { isDeleted: false, severity: 'CRITICAL', status: 'OPEN' } }),
      this.findActiveEncryptionKey(),
      this.db.complianceReport.count(),
      this.db.securityPlatformAuditLog.count(),
    ]);

    return {
      activeConsentsCount,
      activeRetentionPoliciesCount,
      openIncidentsCount,
      criticalIncidentsCount,
      activeEncryptionKeyVersion: activeKey?.version || 1,
      complianceReportsCount,
      totalAuditLogsCount,
    };
  }
}

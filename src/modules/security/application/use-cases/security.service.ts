import { Injectable, NotFoundException, ConflictException, Inject } from '@nestjs/common';
import { ISecurityRepository } from '../../domain/repositories/security.repository.interface';
import {
  ConsentRecordResponseDto, RetentionPolicyResponseDto, SecurityIncidentResponseDto,
  EncryptionKeyResponseDto, ComplianceReportResponseDto, SecurityAuditLogResponseDto,
  SecurityDashboardResponseDto,
} from '../../presentation/dto/security-response.dto';
import {
  CreateConsentDto, CreateRetentionPolicyDto, UpdateRetentionPolicyDto,
  CreateSecurityIncidentDto, ResolveSecurityIncidentDto, GenerateComplianceReportDto,
} from '../../presentation/dto/security-enterprise.dto';
import { Logger } from 'nestjs-pino';

@Injectable()
export class SecurityService {
  constructor(
    @Inject('ISecurityRepository')
    private readonly securityRepository: ISecurityRepository,
    private readonly logger: Logger,
  ) {}

  // ─── Dashboard Stats ─────────────────────────────────────────────────────

  async getDashboardStats(): Promise<SecurityDashboardResponseDto> {
    return this.securityRepository.getSecurityDashboardStats();
  }

  // ─── Consents ─────────────────────────────────────────────────────────────

  async createConsent(userId: string, dto: CreateConsentDto): Promise<ConsentRecordResponseDto> {
    const consent = await this.securityRepository.createConsent({ ...dto, capturedBy: userId });
    await this.securityRepository.createAuditLog({
      userId,
      action: 'CONSENT_CREATED',
      resource: 'CONSENT',
      resourceId: consent.id,
      details: `Created ${dto.consentType} consent for patient ${dto.patientId}`,
    });
    return this.mapConsent(consent);
  }

  async getConsents(patientId?: string, status?: string): Promise<ConsentRecordResponseDto[]> {
    const consents = await this.securityRepository.findConsents(patientId, status);
    return consents.map((c) => this.mapConsent(c));
  }

  async getConsentById(id: string): Promise<ConsentRecordResponseDto> {
    const consent = await this.securityRepository.findConsentById(id);
    if (!consent) throw new NotFoundException('Consent record not found');
    return this.mapConsent(consent);
  }

  async withdrawConsent(id: string, userId: string): Promise<ConsentRecordResponseDto> {
    const consent = await this.securityRepository.findConsentById(id);
    if (!consent) throw new NotFoundException('Consent record not found');

    const updated = await this.securityRepository.withdrawConsent(id);
    await this.securityRepository.createAuditLog({
      userId,
      action: 'CONSENT_WITHDRAWN',
      resource: 'CONSENT',
      resourceId: id,
      details: `Withdrawn consent record ${id} for patient ${consent.patientId}`,
    });
    return this.mapConsent(updated);
  }

  private mapConsent(c: any): ConsentRecordResponseDto {
    return {
      id: c.id,
      patientId: c.patientId,
      consentType: c.consentType,
      status: c.status,
      purpose: c.purpose,
      grantedAt: c.grantedAt ? c.grantedAt.toISOString() : undefined,
      expiresAt: c.expiresAt ? c.expiresAt.toISOString() : undefined,
      withdrawnAt: c.withdrawnAt ? c.withdrawnAt.toISOString() : undefined,
      capturedBy: c.capturedBy || undefined,
      evidenceReference: c.evidenceReference || undefined,
      createdAt: c.createdAt.toISOString(),
      updatedAt: c.updatedAt.toISOString(),
    };
  }

  // ─── Retention Policies ──────────────────────────────────────────────────

  async createRetentionPolicy(userId: string, dto: CreateRetentionPolicyDto): Promise<RetentionPolicyResponseDto> {
    const policy = await this.securityRepository.createRetentionPolicy(dto);
    await this.securityRepository.createAuditLog({
      userId,
      action: 'RETENTION_POLICY_CREATED',
      resource: 'RETENTION_POLICY',
      resourceId: policy.id,
      details: `Created retention policy '${policy.name}' for resource ${policy.resourceType}`,
    });
    return this.mapRetentionPolicy(policy);
  }

  async getRetentionPolicies(): Promise<RetentionPolicyResponseDto[]> {
    const policies = await this.securityRepository.findRetentionPolicies();
    return policies.map((p) => this.mapRetentionPolicy(p));
  }

  async updateRetentionPolicy(id: string, dto: UpdateRetentionPolicyDto, userId: string): Promise<RetentionPolicyResponseDto> {
    const policy = await this.securityRepository.findRetentionPolicyById(id);
    if (!policy) throw new NotFoundException('Retention policy not found');

    const updated = await this.securityRepository.updateRetentionPolicy(id, dto);
    await this.securityRepository.createAuditLog({
      userId,
      action: 'RETENTION_POLICY_UPDATED',
      resource: 'RETENTION_POLICY',
      resourceId: id,
      details: `Updated retention policy '${updated.name}'`,
    });
    return this.mapRetentionPolicy(updated);
  }

  async softDeleteRetentionPolicy(id: string, userId: string): Promise<{ message: string }> {
    const policy = await this.securityRepository.findRetentionPolicyById(id);
    if (!policy) throw new NotFoundException('Retention policy not found');

    await this.securityRepository.softDeleteRetentionPolicy(id);
    await this.securityRepository.createAuditLog({
      userId,
      action: 'RETENTION_POLICY_DELETED',
      resource: 'RETENTION_POLICY',
      resourceId: id,
      details: `Soft-deleted retention policy '${policy.name}'`,
    });
    return { message: 'Retention policy soft-deleted successfully' };
  }

  private mapRetentionPolicy(p: any): RetentionPolicyResponseDto {
    return {
      id: p.id,
      name: p.name,
      resourceType: p.resourceType,
      retentionPeriodDays: p.retentionPeriodDays,
      action: p.action,
      isActive: p.isActive,
      createdAt: p.createdAt.toISOString(),
      updatedAt: p.updatedAt.toISOString(),
    };
  }

  // ─── Security Incidents ──────────────────────────────────────────────────

  async createIncident(userId: string, dto: CreateSecurityIncidentDto): Promise<SecurityIncidentResponseDto> {
    const incident = await this.securityRepository.createIncident({ ...dto, reportedBy: userId });
    await this.securityRepository.createAuditLog({
      userId,
      action: 'SECURITY_INCIDENT_REPORTED',
      resource: 'SECURITY_INCIDENT',
      resourceId: incident.id,
      details: `Reported incident '${incident.title}' with severity ${incident.severity}`,
    });
    return this.mapIncident(incident);
  }

  async getIncidents(severity?: string, status?: string): Promise<SecurityIncidentResponseDto[]> {
    const incidents = await this.securityRepository.findIncidents(severity, status);
    return incidents.map((i) => this.mapIncident(i));
  }

  async resolveIncident(id: string, userId: string, dto: ResolveSecurityIncidentDto): Promise<SecurityIncidentResponseDto> {
    const incident = await this.securityRepository.findIncidentById(id);
    if (!incident) throw new NotFoundException('Security incident not found');

    const resolved = await this.securityRepository.resolveIncident(id, userId);
    await this.securityRepository.createAuditLog({
      userId,
      action: 'SECURITY_INCIDENT_RESOLVED',
      resource: 'SECURITY_INCIDENT',
      resourceId: id,
      details: `Resolved incident ${id}: ${dto.resolutionNotes}`,
    });
    return this.mapIncident(resolved);
  }

  private mapIncident(i: any): SecurityIncidentResponseDto {
    return {
      id: i.id,
      title: i.title,
      description: i.description,
      severity: i.severity,
      status: i.status,
      reportedBy: i.reportedBy || undefined,
      resolvedBy: i.resolvedBy || undefined,
      resolvedAt: i.resolvedAt ? i.resolvedAt.toISOString() : undefined,
      createdAt: i.createdAt.toISOString(),
      updatedAt: i.updatedAt.toISOString(),
    };
  }

  // ─── Encryption Key Management ───────────────────────────────────────────

  async getActiveEncryptionKey(): Promise<EncryptionKeyResponseDto> {
    let key = await this.securityRepository.findActiveEncryptionKey();
    if (!key) {
      key = await this.securityRepository.createEncryptionKey({
        keyIdentifier: `HV360-KMS-KEY-v1`,
        algorithm: 'AES-256-GCM',
        version: 1,
      });
    }
    return {
      id: key.id,
      keyIdentifier: key.keyIdentifier,
      algorithm: key.algorithm,
      version: key.version,
      status: key.status,
      activatedAt: key.activatedAt ? key.activatedAt.toISOString() : undefined,
      expiresAt: key.expiresAt ? key.expiresAt.toISOString() : undefined,
      rotationDate: key.rotationDate ? key.rotationDate.toISOString() : undefined,
      createdAt: key.createdAt ? key.createdAt.toISOString() : new Date().toISOString(),
    };
  }

  async rotateEncryptionKey(userId: string): Promise<EncryptionKeyResponseDto> {
    const active = await this.getActiveEncryptionKey();
    const nextVer = active.version + 1;
    const newKeyId = `HV360-KMS-KEY-v${nextVer}`;

    const rotated = await this.securityRepository.rotateEncryptionKey(newKeyId);
    await this.securityRepository.createAuditLog({
      userId,
      action: 'ENCRYPTION_KEY_ROTATED',
      resource: 'KMS_KEY',
      resourceId: rotated.id,
      details: `Rotated KMS encryption key to version ${rotated.version} (${rotated.keyIdentifier})`,
    });

    return {
      id: rotated.id,
      keyIdentifier: rotated.keyIdentifier,
      algorithm: rotated.algorithm,
      version: rotated.version,
      status: rotated.status,
      activatedAt: rotated.activatedAt ? rotated.activatedAt.toISOString() : undefined,
      expiresAt: rotated.expiresAt ? rotated.expiresAt.toISOString() : undefined,
      rotationDate: rotated.rotationDate ? rotated.rotationDate.toISOString() : undefined,
      createdAt: rotated.createdAt ? rotated.createdAt.toISOString() : new Date().toISOString(),
    };
  }

  // ─── Compliance Reports ─────────────────────────────────────────────────

  async generateComplianceReport(userId: string, dto: GenerateComplianceReportDto): Promise<ComplianceReportResponseDto> {
    const stats = await this.getDashboardStats();
    const summary = `Health Vault 360 Compliance Assessment: Active Consents (${stats.activeConsentsCount}), Retention Policies (${stats.activeRetentionPoliciesCount}), Open Incidents (${stats.openIncidentsCount}), Critical Incidents (${stats.criticalIncidentsCount}), KMS Version (${stats.activeEncryptionKeyVersion}). Compliance Status: COMPLIANT`;

    const report = await this.securityRepository.createComplianceReport({
      reportName: dto.reportName,
      reportType: dto.reportType,
      generatedBy: userId,
      summary,
      metadata: dto.metadata,
    });

    await this.securityRepository.createAuditLog({
      userId,
      action: 'COMPLIANCE_REPORT_GENERATED',
      resource: 'COMPLIANCE_REPORT',
      resourceId: report.id,
      details: `Generated compliance report: ${dto.reportName}`,
    });

    return {
      id: report.id,
      reportName: report.reportName,
      reportType: report.reportType,
      generatedBy: report.generatedBy || undefined,
      generatedAt: report.generatedAt.toISOString(),
      summary: report.summary || undefined,
      metadata: report.metadata ? JSON.parse(report.metadata) : undefined,
      createdAt: report.createdAt.toISOString(),
    };
  }

  async getComplianceReports(): Promise<ComplianceReportResponseDto[]> {
    const reports = await this.securityRepository.findComplianceReports();
    return reports.map((r) => ({
      id: r.id,
      reportName: r.reportName,
      reportType: r.reportType,
      generatedBy: r.generatedBy || undefined,
      generatedAt: r.generatedAt.toISOString(),
      summary: r.summary || undefined,
      metadata: r.metadata ? JSON.parse(r.metadata) : undefined,
      createdAt: r.createdAt.toISOString(),
    }));
  }

  // ─── Security Audit Logs ─────────────────────────────────────────────────

  async getAuditLogs(userId?: string, resource?: string): Promise<SecurityAuditLogResponseDto[]> {
    const logs = await this.securityRepository.findAuditLogs(userId, resource, 100);
    return logs.map((l) => ({
      id: l.id,
      userId: l.userId || undefined,
      action: l.action,
      resource: l.resource,
      resourceId: l.resourceId || undefined,
      ipAddress: l.ipAddress || undefined,
      userAgent: l.userAgent || undefined,
      result: l.result,
      details: l.details || undefined,
      createdAt: l.createdAt.toISOString(),
    }));
  }
}

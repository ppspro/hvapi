import {
  SecurityConsentRecordEntity, EncryptionKeyEntity, RetentionPolicyEntity,
  SecurityIncidentEntity, SecurityPlatformAuditLogEntity, ComplianceReportEntity,
} from '../entities/security.entity';

export interface ISecurityRepository {
  // Consents
  createConsent(data: any): Promise<SecurityConsentRecordEntity>;
  findConsents(patientId?: string, status?: string): Promise<SecurityConsentRecordEntity[]>;
  findConsentById(id: string): Promise<SecurityConsentRecordEntity | null>;
  withdrawConsent(id: string): Promise<SecurityConsentRecordEntity>;

  // Retention Policies
  createRetentionPolicy(data: any): Promise<RetentionPolicyEntity>;
  findRetentionPolicies(): Promise<RetentionPolicyEntity[]>;
  findRetentionPolicyById(id: string): Promise<RetentionPolicyEntity | null>;
  updateRetentionPolicy(id: string, data: any): Promise<RetentionPolicyEntity>;
  softDeleteRetentionPolicy(id: string): Promise<void>;

  // Security Incidents
  createIncident(data: any): Promise<SecurityIncidentEntity>;
  findIncidents(severity?: string, status?: string): Promise<SecurityIncidentEntity[]>;
  findIncidentById(id: string): Promise<SecurityIncidentEntity | null>;
  resolveIncident(id: string, resolvedBy: string): Promise<SecurityIncidentEntity>;

  // Encryption Keys
  findActiveEncryptionKey(): Promise<EncryptionKeyEntity | null>;
  createEncryptionKey(data: any): Promise<EncryptionKeyEntity>;
  rotateEncryptionKey(keyIdentifier: string): Promise<EncryptionKeyEntity>;

  // Compliance Reports
  createComplianceReport(data: any): Promise<ComplianceReportEntity>;
  findComplianceReports(): Promise<ComplianceReportEntity[]>;

  // Audit Logs
  createAuditLog(data: {
    userId?: string;
    action: string;
    resource: string;
    resourceId?: string;
    ipAddress?: string;
    userAgent?: string;
    result?: string;
    details?: string;
  }): Promise<SecurityPlatformAuditLogEntity>;
  findAuditLogs(userId?: string, resource?: string, limit?: number): Promise<SecurityPlatformAuditLogEntity[]>;

  // Security Stats Summary
  getSecurityDashboardStats(): Promise<{
    activeConsentsCount: number;
    activeRetentionPoliciesCount: number;
    openIncidentsCount: number;
    criticalIncidentsCount: number;
    activeEncryptionKeyVersion: number;
    complianceReportsCount: number;
    totalAuditLogsCount: number;
  }>;
}

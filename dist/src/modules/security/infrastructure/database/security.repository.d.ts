import { DatabaseService } from "../../../../database/database.service";
import { ISecurityRepository } from '../../domain/repositories/security.repository.interface';
import { SecurityConsentRecordEntity, EncryptionKeyEntity, RetentionPolicyEntity, SecurityIncidentEntity, SecurityPlatformAuditLogEntity, ComplianceReportEntity } from '../../domain/entities/security.entity';
export declare class PrismaSecurityRepository implements ISecurityRepository {
    private readonly db;
    constructor(db: DatabaseService);
    createConsent(data: any): Promise<SecurityConsentRecordEntity>;
    findConsents(patientId?: string, status?: string): Promise<SecurityConsentRecordEntity[]>;
    findConsentById(id: string): Promise<SecurityConsentRecordEntity | null>;
    withdrawConsent(id: string): Promise<SecurityConsentRecordEntity>;
    createRetentionPolicy(data: any): Promise<RetentionPolicyEntity>;
    findRetentionPolicies(): Promise<RetentionPolicyEntity[]>;
    findRetentionPolicyById(id: string): Promise<RetentionPolicyEntity | null>;
    updateRetentionPolicy(id: string, data: any): Promise<RetentionPolicyEntity>;
    softDeleteRetentionPolicy(id: string): Promise<void>;
    createIncident(data: any): Promise<SecurityIncidentEntity>;
    findIncidents(severity?: string, status?: string): Promise<SecurityIncidentEntity[]>;
    findIncidentById(id: string): Promise<SecurityIncidentEntity | null>;
    resolveIncident(id: string, resolvedBy: string): Promise<SecurityIncidentEntity>;
    findActiveEncryptionKey(): Promise<EncryptionKeyEntity | null>;
    createEncryptionKey(data: any): Promise<EncryptionKeyEntity>;
    rotateEncryptionKey(keyIdentifier: string): Promise<EncryptionKeyEntity>;
    createComplianceReport(data: any): Promise<ComplianceReportEntity>;
    findComplianceReports(): Promise<ComplianceReportEntity[]>;
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

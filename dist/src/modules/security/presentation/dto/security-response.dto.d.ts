export declare class ConsentRecordResponseDto {
    id: string;
    patientId: string;
    consentType: string;
    status: string;
    purpose: string;
    grantedAt?: string;
    expiresAt?: string;
    withdrawnAt?: string;
    capturedBy?: string;
    evidenceReference?: string;
    createdAt: string;
    updatedAt: string;
}
export declare class RetentionPolicyResponseDto {
    id: string;
    name: string;
    resourceType: string;
    retentionPeriodDays: number;
    action: string;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
}
export declare class SecurityIncidentResponseDto {
    id: string;
    title: string;
    description: string;
    severity: string;
    status: string;
    reportedBy?: string;
    resolvedBy?: string;
    resolvedAt?: string;
    createdAt: string;
    updatedAt: string;
}
export declare class EncryptionKeyResponseDto {
    id: string;
    keyIdentifier: string;
    algorithm: string;
    version: number;
    status: string;
    activatedAt?: string;
    expiresAt?: string;
    rotationDate?: string;
    createdAt: string;
}
export declare class ComplianceReportResponseDto {
    id: string;
    reportName: string;
    reportType: string;
    generatedBy?: string;
    generatedAt: string;
    summary?: string;
    metadata?: any;
    createdAt: string;
}
export declare class SecurityAuditLogResponseDto {
    id: string;
    userId?: string;
    action: string;
    resource: string;
    resourceId?: string;
    ipAddress?: string;
    userAgent?: string;
    result: string;
    details?: string;
    createdAt: string;
}
export declare class SecurityDashboardResponseDto {
    activeConsentsCount: number;
    activeRetentionPoliciesCount: number;
    openIncidentsCount: number;
    criticalIncidentsCount: number;
    activeEncryptionKeyVersion: number;
    complianceReportsCount: number;
    totalAuditLogsCount: number;
}

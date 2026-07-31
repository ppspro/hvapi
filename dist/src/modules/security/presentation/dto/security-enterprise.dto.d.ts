export declare class CreateConsentDto {
    patientId: string;
    consentType?: string;
    purpose: string;
    expiresAt?: string;
    evidenceReference?: string;
}
export declare class UpdateConsentDto {
    status: string;
}
export declare class CreateRetentionPolicyDto {
    name: string;
    resourceType: string;
    retentionPeriodDays?: number;
    action?: string;
    isActive?: boolean;
}
export declare class UpdateRetentionPolicyDto {
    name?: string;
    retentionPeriodDays?: number;
    action?: string;
    isActive?: boolean;
}
export declare class CreateSecurityIncidentDto {
    title: string;
    description: string;
    severity?: string;
}
export declare class ResolveSecurityIncidentDto {
    resolutionNotes: string;
}
export declare class GenerateComplianceReportDto {
    reportName: string;
    reportType: string;
    metadata?: any;
}

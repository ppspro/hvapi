import { SecurityService } from '../../application/use-cases/security.service';
import { ConsentRecordResponseDto, RetentionPolicyResponseDto, SecurityIncidentResponseDto, EncryptionKeyResponseDto, ComplianceReportResponseDto, SecurityAuditLogResponseDto, SecurityDashboardResponseDto } from '../dto/security-response.dto';
import { CreateConsentDto, CreateRetentionPolicyDto, UpdateRetentionPolicyDto, CreateSecurityIncidentDto, ResolveSecurityIncidentDto, GenerateComplianceReportDto } from '../dto/security-enterprise.dto';
export declare class SecurityController {
    private readonly securityService;
    constructor(securityService: SecurityService);
    getDashboard(): Promise<SecurityDashboardResponseDto>;
    createConsent(req: any, dto: CreateConsentDto): Promise<ConsentRecordResponseDto>;
    getConsents(patientId?: string, status?: string): Promise<ConsentRecordResponseDto[]>;
    getConsentById(id: string): Promise<ConsentRecordResponseDto>;
    withdrawConsent(req: any, id: string): Promise<ConsentRecordResponseDto>;
    createRetentionPolicy(req: any, dto: CreateRetentionPolicyDto): Promise<RetentionPolicyResponseDto>;
    getRetentionPolicies(): Promise<RetentionPolicyResponseDto[]>;
    updateRetentionPolicy(req: any, id: string, dto: UpdateRetentionPolicyDto): Promise<RetentionPolicyResponseDto>;
    softDeleteRetentionPolicy(req: any, id: string): Promise<any>;
    createIncident(req: any, dto: CreateSecurityIncidentDto): Promise<SecurityIncidentResponseDto>;
    getIncidents(severity?: string, status?: string): Promise<SecurityIncidentResponseDto[]>;
    resolveIncident(req: any, id: string, dto: ResolveSecurityIncidentDto): Promise<SecurityIncidentResponseDto>;
    getActiveEncryptionKey(): Promise<EncryptionKeyResponseDto>;
    rotateEncryptionKey(req: any): Promise<EncryptionKeyResponseDto>;
    generateComplianceReport(req: any, dto: GenerateComplianceReportDto): Promise<ComplianceReportResponseDto>;
    getComplianceReports(): Promise<ComplianceReportResponseDto[]>;
    getAuditLogs(userId?: string, resource?: string): Promise<SecurityAuditLogResponseDto[]>;
}

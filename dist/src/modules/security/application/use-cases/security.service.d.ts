import { ISecurityRepository } from '../../domain/repositories/security.repository.interface';
import { ConsentRecordResponseDto, RetentionPolicyResponseDto, SecurityIncidentResponseDto, EncryptionKeyResponseDto, ComplianceReportResponseDto, SecurityAuditLogResponseDto, SecurityDashboardResponseDto } from '../../presentation/dto/security-response.dto';
import { CreateConsentDto, CreateRetentionPolicyDto, UpdateRetentionPolicyDto, CreateSecurityIncidentDto, ResolveSecurityIncidentDto, GenerateComplianceReportDto } from '../../presentation/dto/security-enterprise.dto';
import { Logger } from 'nestjs-pino';
export declare class SecurityService {
    private readonly securityRepository;
    private readonly logger;
    constructor(securityRepository: ISecurityRepository, logger: Logger);
    getDashboardStats(): Promise<SecurityDashboardResponseDto>;
    createConsent(userId: string, dto: CreateConsentDto): Promise<ConsentRecordResponseDto>;
    getConsents(patientId?: string, status?: string): Promise<ConsentRecordResponseDto[]>;
    getConsentById(id: string): Promise<ConsentRecordResponseDto>;
    withdrawConsent(id: string, userId: string): Promise<ConsentRecordResponseDto>;
    private mapConsent;
    createRetentionPolicy(userId: string, dto: CreateRetentionPolicyDto): Promise<RetentionPolicyResponseDto>;
    getRetentionPolicies(): Promise<RetentionPolicyResponseDto[]>;
    updateRetentionPolicy(id: string, dto: UpdateRetentionPolicyDto, userId: string): Promise<RetentionPolicyResponseDto>;
    softDeleteRetentionPolicy(id: string, userId: string): Promise<{
        message: string;
    }>;
    private mapRetentionPolicy;
    createIncident(userId: string, dto: CreateSecurityIncidentDto): Promise<SecurityIncidentResponseDto>;
    getIncidents(severity?: string, status?: string): Promise<SecurityIncidentResponseDto[]>;
    resolveIncident(id: string, userId: string, dto: ResolveSecurityIncidentDto): Promise<SecurityIncidentResponseDto>;
    private mapIncident;
    getActiveEncryptionKey(): Promise<EncryptionKeyResponseDto>;
    rotateEncryptionKey(userId: string): Promise<EncryptionKeyResponseDto>;
    generateComplianceReport(userId: string, dto: GenerateComplianceReportDto): Promise<ComplianceReportResponseDto>;
    getComplianceReports(): Promise<ComplianceReportResponseDto[]>;
    getAuditLogs(userId?: string, resource?: string): Promise<SecurityAuditLogResponseDto[]>;
}

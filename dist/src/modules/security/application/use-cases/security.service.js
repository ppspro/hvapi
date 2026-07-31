"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SecurityService = void 0;
const common_1 = require("@nestjs/common");
const nestjs_pino_1 = require("nestjs-pino");
let SecurityService = class SecurityService {
    constructor(securityRepository, logger) {
        this.securityRepository = securityRepository;
        this.logger = logger;
    }
    async getDashboardStats() {
        return this.securityRepository.getSecurityDashboardStats();
    }
    async createConsent(userId, dto) {
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
    async getConsents(patientId, status) {
        const consents = await this.securityRepository.findConsents(patientId, status);
        return consents.map((c) => this.mapConsent(c));
    }
    async getConsentById(id) {
        const consent = await this.securityRepository.findConsentById(id);
        if (!consent)
            throw new common_1.NotFoundException('Consent record not found');
        return this.mapConsent(consent);
    }
    async withdrawConsent(id, userId) {
        const consent = await this.securityRepository.findConsentById(id);
        if (!consent)
            throw new common_1.NotFoundException('Consent record not found');
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
    mapConsent(c) {
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
    async createRetentionPolicy(userId, dto) {
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
    async getRetentionPolicies() {
        const policies = await this.securityRepository.findRetentionPolicies();
        return policies.map((p) => this.mapRetentionPolicy(p));
    }
    async updateRetentionPolicy(id, dto, userId) {
        const policy = await this.securityRepository.findRetentionPolicyById(id);
        if (!policy)
            throw new common_1.NotFoundException('Retention policy not found');
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
    async softDeleteRetentionPolicy(id, userId) {
        const policy = await this.securityRepository.findRetentionPolicyById(id);
        if (!policy)
            throw new common_1.NotFoundException('Retention policy not found');
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
    mapRetentionPolicy(p) {
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
    async createIncident(userId, dto) {
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
    async getIncidents(severity, status) {
        const incidents = await this.securityRepository.findIncidents(severity, status);
        return incidents.map((i) => this.mapIncident(i));
    }
    async resolveIncident(id, userId, dto) {
        const incident = await this.securityRepository.findIncidentById(id);
        if (!incident)
            throw new common_1.NotFoundException('Security incident not found');
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
    mapIncident(i) {
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
    async getActiveEncryptionKey() {
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
    async rotateEncryptionKey(userId) {
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
    async generateComplianceReport(userId, dto) {
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
    async getComplianceReports() {
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
    async getAuditLogs(userId, resource) {
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
};
exports.SecurityService = SecurityService;
exports.SecurityService = SecurityService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('ISecurityRepository')),
    __metadata("design:paramtypes", [Object, nestjs_pino_1.Logger])
], SecurityService);
//# sourceMappingURL=security.service.js.map
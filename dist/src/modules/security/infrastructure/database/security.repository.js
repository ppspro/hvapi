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
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaSecurityRepository = void 0;
const common_1 = require("@nestjs/common");
const database_service_1 = require("../../../../database/database.service");
let PrismaSecurityRepository = class PrismaSecurityRepository {
    constructor(db) {
        this.db = db;
    }
    async createConsent(data) {
        return (await this.db.securityConsentRecord.create({
            data: {
                patientId: data.patientId,
                consentType: data.consentType || 'TREATMENT',
                status: data.status || 'GRANTED',
                purpose: data.purpose,
                grantedAt: new Date(),
                expiresAt: data.expiresAt ? new Date(data.expiresAt) : null,
                capturedBy: data.capturedBy || null,
                evidenceReference: data.evidenceReference || null,
            },
        }));
    }
    async findConsents(patientId, status) {
        return (await this.db.securityConsentRecord.findMany({
            where: {
                isDeleted: false,
                ...(patientId ? { patientId } : {}),
                ...(status ? { status: status } : {}),
            },
            orderBy: { createdAt: 'desc' },
        }));
    }
    async findConsentById(id) {
        return (await this.db.securityConsentRecord.findFirst({
            where: { id, isDeleted: false },
        }));
    }
    async withdrawConsent(id) {
        return (await this.db.securityConsentRecord.update({
            where: { id },
            data: {
                status: 'WITHDRAWN',
                withdrawnAt: new Date(),
            },
        }));
    }
    async createRetentionPolicy(data) {
        return (await this.db.retentionPolicy.create({
            data: {
                name: data.name,
                resourceType: data.resourceType,
                retentionPeriodDays: data.retentionPeriodDays ?? 2555,
                action: data.action || 'ARCHIVE',
                isActive: data.isActive ?? true,
            },
        }));
    }
    async findRetentionPolicies() {
        return (await this.db.retentionPolicy.findMany({
            where: { isDeleted: false },
            orderBy: { resourceType: 'asc' },
        }));
    }
    async findRetentionPolicyById(id) {
        return (await this.db.retentionPolicy.findFirst({
            where: { id, isDeleted: false },
        }));
    }
    async updateRetentionPolicy(id, data) {
        return (await this.db.retentionPolicy.update({
            where: { id },
            data: {
                name: data.name || undefined,
                retentionPeriodDays: data.retentionPeriodDays ?? undefined,
                action: data.action ? data.action : undefined,
                isActive: data.isActive ?? undefined,
            },
        }));
    }
    async softDeleteRetentionPolicy(id) {
        await this.db.retentionPolicy.update({
            where: { id },
            data: { isDeleted: true, deletedAt: new Date() },
        });
    }
    async createIncident(data) {
        return (await this.db.securityIncident.create({
            data: {
                title: data.title,
                description: data.description,
                severity: data.severity || 'MEDIUM',
                status: 'OPEN',
                reportedBy: data.reportedBy || null,
            },
        }));
    }
    async findIncidents(severity, status) {
        return (await this.db.securityIncident.findMany({
            where: {
                isDeleted: false,
                ...(severity ? { severity: severity } : {}),
                ...(status ? { status } : {}),
            },
            orderBy: { createdAt: 'desc' },
        }));
    }
    async findIncidentById(id) {
        return (await this.db.securityIncident.findFirst({
            where: { id, isDeleted: false },
        }));
    }
    async resolveIncident(id, resolvedBy) {
        return (await this.db.securityIncident.update({
            where: { id },
            data: {
                status: 'RESOLVED',
                resolvedBy,
                resolvedAt: new Date(),
            },
        }));
    }
    async findActiveEncryptionKey() {
        return (await this.db.encryptionKey.findFirst({
            where: { status: 'ACTIVE' },
            orderBy: { version: 'desc' },
        }));
    }
    async createEncryptionKey(data) {
        return (await this.db.encryptionKey.create({
            data: {
                keyIdentifier: data.keyIdentifier,
                algorithm: data.algorithm || 'AES-256-GCM',
                version: data.version || 1,
                status: 'ACTIVE',
                activatedAt: new Date(),
            },
        }));
    }
    async rotateEncryptionKey(keyIdentifier) {
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
        }));
    }
    async createComplianceReport(data) {
        return (await this.db.complianceReport.create({
            data: {
                reportName: data.reportName,
                reportType: data.reportType,
                generatedBy: data.generatedBy || null,
                summary: data.summary || null,
                metadata: data.metadata ? JSON.stringify(data.metadata) : null,
            },
        }));
    }
    async findComplianceReports() {
        return (await this.db.complianceReport.findMany({
            orderBy: { createdAt: 'desc' },
        }));
    }
    async createAuditLog(data) {
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
        }));
    }
    async findAuditLogs(userId, resource, limit = 100) {
        return (await this.db.securityPlatformAuditLog.findMany({
            where: {
                ...(userId ? { userId } : {}),
                ...(resource ? { resource } : {}),
            },
            orderBy: { createdAt: 'desc' },
            take: limit,
        }));
    }
    async getSecurityDashboardStats() {
        const [activeConsentsCount, activeRetentionPoliciesCount, openIncidentsCount, criticalIncidentsCount, activeKey, complianceReportsCount, totalAuditLogsCount,] = await Promise.all([
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
};
exports.PrismaSecurityRepository = PrismaSecurityRepository;
exports.PrismaSecurityRepository = PrismaSecurityRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [database_service_1.DatabaseService])
], PrismaSecurityRepository);
//# sourceMappingURL=security.repository.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const security_service_1 = require("../application/use-cases/security.service");
const nestjs_pino_1 = require("nestjs-pino");
const mockUserId = 'user-uuid-1';
const mockRepo = {
    createConsent: jest.fn(),
    findConsents: jest.fn(),
    findConsentById: jest.fn(),
    withdrawConsent: jest.fn(),
    createRetentionPolicy: jest.fn(),
    findRetentionPolicies: jest.fn(),
    findRetentionPolicyById: jest.fn(),
    updateRetentionPolicy: jest.fn(),
    softDeleteRetentionPolicy: jest.fn(),
    createIncident: jest.fn(),
    findIncidents: jest.fn(),
    findIncidentById: jest.fn(),
    resolveIncident: jest.fn(),
    findActiveEncryptionKey: jest.fn(),
    createEncryptionKey: jest.fn(),
    rotateEncryptionKey: jest.fn(),
    createComplianceReport: jest.fn(),
    findComplianceReports: jest.fn(),
    createAuditLog: jest.fn(),
    findAuditLogs: jest.fn(),
    getSecurityDashboardStats: jest.fn(),
};
const mockLogger = { log: jest.fn(), error: jest.fn(), warn: jest.fn() };
describe('SecurityService (Phase 23)', () => {
    let service;
    beforeEach(async () => {
        jest.clearAllMocks();
        const module = await testing_1.Test.createTestingModule({
            providers: [
                security_service_1.SecurityService,
                { provide: 'ISecurityRepository', useValue: mockRepo },
                { provide: nestjs_pino_1.Logger, useValue: mockLogger },
            ],
        }).compile();
        service = module.get(security_service_1.SecurityService);
    });
    describe('Consents', () => {
        it('should create patient consent record and log audit', async () => {
            const mockConsent = {
                id: 'consent-1',
                patientId: 'patient-1',
                consentType: 'TREATMENT',
                status: 'GRANTED',
                purpose: 'Medical treatment',
                createdAt: new Date(),
                updatedAt: new Date(),
            };
            mockRepo.createConsent.mockResolvedValue(mockConsent);
            mockRepo.createAuditLog.mockResolvedValue({});
            const res = await service.createConsent(mockUserId, {
                patientId: 'patient-1',
                purpose: 'Medical treatment',
            });
            expect(res.id).toBe('consent-1');
            expect(mockRepo.createAuditLog).toHaveBeenCalled();
        });
        it('should withdraw consent and update status to WITHDRAWN', async () => {
            mockRepo.findConsentById.mockResolvedValue({ id: 'consent-1', patientId: 'p-1', status: 'GRANTED' });
            mockRepo.withdrawConsent.mockResolvedValue({ id: 'consent-1', patientId: 'p-1', status: 'WITHDRAWN', withdrawnAt: new Date(), createdAt: new Date(), updatedAt: new Date() });
            mockRepo.createAuditLog.mockResolvedValue({});
            const res = await service.withdrawConsent('consent-1', mockUserId);
            expect(res.status).toBe('WITHDRAWN');
            expect(mockRepo.createAuditLog).toHaveBeenCalled();
        });
    });
    describe('Encryption Key Management & Rotation', () => {
        it('should rotate encryption key and increment version', async () => {
            mockRepo.findActiveEncryptionKey.mockResolvedValue({ id: 'key-1', version: 1, keyIdentifier: 'KMS-v1', createdAt: new Date() });
            mockRepo.rotateEncryptionKey.mockResolvedValue({
                id: 'key-2',
                keyIdentifier: 'HV360-KMS-KEY-v2',
                algorithm: 'AES-256-GCM',
                version: 2,
                status: 'ACTIVE',
                createdAt: new Date(),
            });
            mockRepo.createAuditLog.mockResolvedValue({});
            const res = await service.rotateEncryptionKey(mockUserId);
            expect(res.version).toBe(2);
            expect(mockRepo.createAuditLog).toHaveBeenCalled();
        });
    });
    describe('Compliance Reporting', () => {
        it('should generate automated compliance assessment report', async () => {
            mockRepo.getSecurityDashboardStats.mockResolvedValue({
                activeConsentsCount: 50,
                activeRetentionPoliciesCount: 5,
                openIncidentsCount: 1,
                criticalIncidentsCount: 0,
                activeEncryptionKeyVersion: 2,
                complianceReportsCount: 3,
                totalAuditLogsCount: 500,
            });
            const mockReport = {
                id: 'report-1',
                reportName: 'HIPAA Assessment',
                reportType: 'HIPAA_GDPR',
                generatedAt: new Date(),
                summary: 'Compliant summary',
                createdAt: new Date(),
            };
            mockRepo.createComplianceReport.mockResolvedValue(mockReport);
            mockRepo.createAuditLog.mockResolvedValue({});
            const res = await service.generateComplianceReport(mockUserId, {
                reportName: 'HIPAA Assessment',
                reportType: 'HIPAA_GDPR',
            });
            expect(res.id).toBe('report-1');
            expect(mockRepo.createAuditLog).toHaveBeenCalled();
        });
    });
    describe('Security Incidents', () => {
        it('should report and resolve security incident', async () => {
            const mockIncident = {
                id: 'inc-1',
                title: 'Spike in logins',
                description: 'Failed logins from IP',
                severity: 'HIGH',
                status: 'OPEN',
                createdAt: new Date(),
                updatedAt: new Date(),
            };
            mockRepo.createIncident.mockResolvedValue(mockIncident);
            mockRepo.findIncidentById.mockResolvedValue(mockIncident);
            mockRepo.resolveIncident.mockResolvedValue({ ...mockIncident, status: 'RESOLVED', resolvedBy: mockUserId, resolvedAt: new Date() });
            mockRepo.createAuditLog.mockResolvedValue({});
            const created = await service.createIncident(mockUserId, { title: 'Spike in logins', description: 'Failed logins from IP' });
            expect(created.id).toBe('inc-1');
            const resolved = await service.resolveIncident('inc-1', mockUserId, { resolutionNotes: 'IP blocked' });
            expect(resolved.status).toBe('RESOLVED');
        });
    });
});
//# sourceMappingURL=security.service.spec.js.map
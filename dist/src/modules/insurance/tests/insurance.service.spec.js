"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const insurance_service_1 = require("../application/use-cases/insurance.service");
const common_1 = require("@nestjs/common");
const nestjs_pino_1 = require("nestjs-pino");
const qr_service_1 = require("../../qr/application/use-cases/qr.service");
const mockProfileId = 'profile-uuid-1';
const mockUserId = 'user-uuid-1';
const mockPolicyId = 'policy-uuid-1';
const mockRepo = {
    findProfileByUserId: jest.fn(),
    createProvider: jest.fn(),
    findProviders: jest.fn(),
    createPlan: jest.fn(),
    findPlans: jest.fn(),
    createPolicy: jest.fn(),
    createFullPolicy: jest.fn(),
    findPolicyById: jest.fn(),
    findPolicyByProfileId: jest.fn(),
    findPoliciesByProfile: jest.fn(),
    updatePolicy: jest.fn(),
    updatePolicyDetails: jest.fn(),
    softDeletePolicy: jest.fn(),
    searchPolicies: jest.fn(),
    createClaimDraft: jest.fn(),
    findClaimDraftsByProfile: jest.fn(),
    createHistory: jest.fn(),
    createAuditLog: jest.fn(),
    saveOcrRecord: jest.fn(),
    findOcrRecordById: jest.fn(),
    getStatistics: jest.fn(),
};
const mockLogger = {
    log: jest.fn(),
    error: jest.fn(),
    warn: jest.fn(),
};
const mockQrService = {
    generateQr: jest.fn(),
    verifyQrPayload: jest.fn(),
    rotateQr: jest.fn(),
    revokeQr: jest.fn(),
};
describe('InsuranceService', () => {
    let service;
    beforeEach(async () => {
        jest.clearAllMocks();
        const module = await testing_1.Test.createTestingModule({
            providers: [
                insurance_service_1.InsuranceService,
                { provide: 'IInsuranceRepository', useValue: mockRepo },
                { provide: qr_service_1.QrService, useValue: mockQrService },
                { provide: nestjs_pino_1.Logger, useValue: mockLogger },
            ],
        }).compile();
        service = module.get(insurance_service_1.InsuranceService);
    });
    describe('createFullPolicy', () => {
        it('should throw if patient profile is not found', async () => {
            mockRepo.findProfileByUserId.mockResolvedValue(null);
            await expect(service.createFullPolicy(mockUserId, {
                providerName: 'State Life',
                policyNumber: 'POL-100',
            })).rejects.toThrow(common_1.NotFoundException);
        });
        it('should create policy and request QR token from QrService', async () => {
            mockRepo.findProfileByUserId.mockResolvedValue({ id: mockProfileId });
            const mockCreated = {
                id: mockPolicyId,
                patientProfileId: mockProfileId,
                providerName: 'State Life',
                policyNumber: 'POL-100',
                status: 'ACTIVE',
                verificationStatus: 'PENDING',
                isDeleted: false,
                beneficiaries: [],
                createdAt: new Date(),
                updatedAt: new Date(),
            };
            mockRepo.createFullPolicy.mockResolvedValue(mockCreated);
            mockQrService.generateQr.mockResolvedValue({ token: 'HVQR-INSURANCE123' });
            mockRepo.createAuditLog.mockResolvedValue({});
            const result = await service.createFullPolicy(mockUserId, {
                providerName: 'State Life',
                policyNumber: 'POL-100',
            });
            expect(result.id).toBe(mockPolicyId);
            expect(result.status).toBe('ACTIVE');
            expect(mockQrService.generateQr).toHaveBeenCalledWith(mockUserId, expect.objectContaining({
                entityId: mockPolicyId,
            }));
        });
    });
    describe('policy lifecycle (renew / suspend / verify)', () => {
        it('should extend expiry date on renew', async () => {
            mockRepo.findProfileByUserId.mockResolvedValue({ id: mockProfileId });
            mockRepo.findPolicyById.mockResolvedValue({
                id: mockPolicyId,
                patientProfileId: mockProfileId,
                status: 'ACTIVE',
                verificationStatus: 'PENDING',
                isDeleted: false,
                createdAt: new Date(),
                updatedAt: new Date(),
            });
            const mockRenewed = {
                id: mockPolicyId,
                patientProfileId: mockProfileId,
                providerName: 'State Life',
                policyNumber: 'POL-100',
                status: 'ACTIVE',
                expiryDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
                verificationStatus: 'PENDING',
                isDeleted: false,
                createdAt: new Date(),
                updatedAt: new Date(),
            };
            mockRepo.updatePolicyDetails.mockResolvedValue(mockRenewed);
            mockRepo.createHistory.mockResolvedValue({});
            const result = await service.renewPolicy(mockUserId, mockPolicyId, { reason: 'Annual renewal' });
            expect(result.status).toBe('ACTIVE');
            expect(mockRepo.createHistory).toHaveBeenCalledWith(mockPolicyId, expect.objectContaining({
                action: 'RENEWED',
            }));
        });
        it('should verify policy coverage status', async () => {
            mockRepo.findProfileByUserId.mockResolvedValue({ id: mockProfileId });
            mockRepo.findPolicyById.mockResolvedValue({
                id: mockPolicyId,
                patientProfileId: mockProfileId,
                status: 'ACTIVE',
                verificationStatus: 'PENDING',
                isDeleted: false,
                createdAt: new Date(),
                updatedAt: new Date(),
            });
            const mockVerified = {
                id: mockPolicyId,
                patientProfileId: mockProfileId,
                providerName: 'State Life',
                policyNumber: 'POL-100',
                status: 'ACTIVE',
                verificationStatus: 'VERIFIED',
                isDeleted: false,
                createdAt: new Date(),
                updatedAt: new Date(),
            };
            mockRepo.updatePolicyDetails.mockResolvedValue(mockVerified);
            mockRepo.createAuditLog.mockResolvedValue({});
            const result = await service.verifyPolicy(mockUserId, mockPolicyId);
            expect(result.verificationStatus).toBe('VERIFIED');
        });
    });
    describe('createClaimDraft', () => {
        it('should create claim draft linked to medical records & reports', async () => {
            mockRepo.findProfileByUserId.mockResolvedValue({ id: mockProfileId });
            mockRepo.findPolicyById.mockResolvedValue({
                id: mockPolicyId,
                patientProfileId: mockProfileId,
            });
            const mockClaim = {
                id: 'claim-1',
                policyId: mockPolicyId,
                patientProfileId: mockProfileId,
                claimNumber: 'CLM-100',
                status: 'DRAFT',
                totalAmount: 500,
                diagnosisCodes: ['ICD10-E11.9'],
                treatmentDate: new Date(),
                attachedRecordIds: ['rec-1'],
                attachedReportIds: ['rep-1'],
                createdAt: new Date(),
                updatedAt: new Date(),
            };
            mockRepo.createClaimDraft.mockResolvedValue(mockClaim);
            mockRepo.createAuditLog.mockResolvedValue({});
            const result = await service.createClaimDraft(mockUserId, {
                policyId: mockPolicyId,
                totalAmount: 500,
                attachedRecordIds: ['rec-1'],
                attachedReportIds: ['rep-1'],
            });
            expect(result.id).toBe('claim-1');
            expect(result.status).toBe('DRAFT');
            expect(result.attachedRecordIds).toContain('rec-1');
        });
    });
});
//# sourceMappingURL=insurance.service.spec.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const qr_service_1 = require("../application/use-cases/qr.service");
const common_1 = require("@nestjs/common");
const nestjs_pino_1 = require("nestjs-pino");
const mockProfileId = 'profile-uuid-1';
const mockUserId = 'user-uuid-1';
const mockQrId = 'qr-uuid-1';
const mockEntityId = 'health-card-uuid-1';
const mockRepo = {
    findProfileByUserId: jest.fn(),
    createQr: jest.fn(),
    findQrById: jest.fn(),
    findQrByToken: jest.fn(),
    findQrByEntity: jest.fn(),
    findQrsByOwner: jest.fn(),
    updateQr: jest.fn(),
    softDeleteQr: jest.fn(),
    searchQrs: jest.fn(),
    createHistory: jest.fn(),
    findHistoryByQrId: jest.fn(),
    createScanLog: jest.fn(),
    findScanLogsByQrId: jest.fn(),
    createAuditLog: jest.fn(),
    getAnalytics: jest.fn(),
};
const mockLogger = {
    log: jest.fn(),
    error: jest.fn(),
    warn: jest.fn(),
};
describe('QrService', () => {
    let service;
    beforeEach(async () => {
        jest.clearAllMocks();
        const module = await testing_1.Test.createTestingModule({
            providers: [
                qr_service_1.QrService,
                { provide: 'IQrRepository', useValue: mockRepo },
                { provide: nestjs_pino_1.Logger, useValue: mockLogger },
            ],
        }).compile();
        service = module.get(qr_service_1.QrService);
    });
    describe('generateQr', () => {
        it('should throw if patient profile is not found', async () => {
            mockRepo.findProfileByUserId.mockResolvedValue(null);
            await expect(service.generateQr(mockUserId, {
                entityId: mockEntityId,
                entityType: 'HEALTH_CARD',
            })).rejects.toThrow(common_1.NotFoundException);
        });
        it('should return existing active QR if already present', async () => {
            mockRepo.findProfileByUserId.mockResolvedValue({ id: mockProfileId });
            const mockExisting = {
                id: mockQrId,
                entityId: mockEntityId,
                entityType: 'HEALTH_CARD',
                ownerId: mockProfileId,
                token: 'HVQR-EXISTINGTOKEN',
                signature: 'sig',
                status: 'ACTIVE',
                version: 1,
                nonce: 'nonce',
                issuedAt: new Date(),
                expiresAt: new Date(),
                isDeleted: false,
                createdAt: new Date(),
                updatedAt: new Date(),
            };
            mockRepo.findQrByEntity.mockResolvedValue(mockExisting);
            const result = await service.generateQr(mockUserId, {
                entityId: mockEntityId,
                entityType: 'HEALTH_CARD',
            });
            expect(result.id).toBe(mockQrId);
            expect(result.token).toBe('HVQR-EXISTINGTOKEN');
        });
        it('should generate new QR code with HMAC signature and audit log', async () => {
            mockRepo.findProfileByUserId.mockResolvedValue({ id: mockProfileId });
            mockRepo.findQrByEntity.mockResolvedValue(null);
            const mockCreated = {
                id: mockQrId,
                entityId: mockEntityId,
                entityType: 'HEALTH_CARD',
                ownerId: mockProfileId,
                token: 'HVQR-1234567890ABCDEF',
                signature: 'hmac_sha256_sig',
                status: 'ACTIVE',
                version: 1,
                nonce: 'random_nonce',
                issuedAt: new Date(),
                expiresAt: new Date(),
                isDeleted: false,
                createdAt: new Date(),
                updatedAt: new Date(),
            };
            mockRepo.createQr.mockResolvedValue(mockCreated);
            mockRepo.createAuditLog.mockResolvedValue({});
            const result = await service.generateQr(mockUserId, {
                entityId: mockEntityId,
                entityType: 'HEALTH_CARD',
            });
            expect(result.id).toBe(mockQrId);
            expect(result.status).toBe('ACTIVE');
            expect(mockRepo.createAuditLog).toHaveBeenCalledWith(expect.objectContaining({
                action: 'GENERATED',
                qrCodeId: mockQrId,
            }));
        });
    });
    describe('verifyQrPayload', () => {
        it('should return INVALID for non-existing QR token', async () => {
            mockRepo.findQrByToken.mockResolvedValue(null);
            mockRepo.createScanLog.mockResolvedValue({});
            const result = await service.verifyQrPayload({ token: 'HVQR-INVALID' }, 'verifier-1');
            expect(result.isValid).toBe(false);
            expect(result.status).toBe('INVALID');
            expect(mockRepo.createScanLog).toHaveBeenCalledWith(expect.objectContaining({
                validationResult: 'INVALID',
            }));
        });
        it('should return VALID for active valid token and log successful scan', async () => {
            const mockQr = {
                id: mockQrId,
                entityId: mockEntityId,
                entityType: 'HEALTH_CARD',
                ownerId: mockProfileId,
                token: 'HVQR-VALIDTOKEN',
                status: 'ACTIVE',
                expiresAt: new Date(Date.now() + 1000000),
            };
            mockRepo.findQrByToken.mockResolvedValue(mockQr);
            mockRepo.createScanLog.mockResolvedValue({});
            const result = await service.verifyQrPayload({ token: 'HVQR-VALIDTOKEN' }, 'verifier-1');
            expect(result.isValid).toBe(true);
            expect(result.status).toBe('VALID');
            expect(result.entityId).toBe(mockEntityId);
        });
        it('should return REVOKED for revoked token', async () => {
            const mockQr = {
                id: mockQrId,
                entityId: mockEntityId,
                entityType: 'HEALTH_CARD',
                ownerId: mockProfileId,
                token: 'HVQR-REVOKEDTOKEN',
                status: 'REVOKED',
                revocationReason: 'Stolen card',
                expiresAt: new Date(Date.now() + 1000000),
            };
            mockRepo.findQrByToken.mockResolvedValue(mockQr);
            mockRepo.createScanLog.mockResolvedValue({});
            const result = await service.verifyQrPayload({ token: 'HVQR-REVOKEDTOKEN' }, 'verifier-1');
            expect(result.isValid).toBe(false);
            expect(result.status).toBe('REVOKED');
        });
    });
    describe('rotateQr and revokeQr', () => {
        it('should rotate QR token, bump version, and log history', async () => {
            mockRepo.findProfileByUserId.mockResolvedValue({ id: mockProfileId });
            mockRepo.findQrById.mockResolvedValue({
                id: mockQrId,
                entityId: mockEntityId,
                entityType: 'HEALTH_CARD',
                ownerId: mockProfileId,
                token: 'HVQR-OLDTOKEN',
                status: 'ACTIVE',
                version: 1,
            });
            const mockRotated = {
                id: mockQrId,
                entityId: mockEntityId,
                entityType: 'HEALTH_CARD',
                ownerId: mockProfileId,
                token: 'HVQR-NEWTOKEN',
                signature: 'newsig',
                status: 'ACTIVE',
                version: 2,
                nonce: 'newnonce',
                issuedAt: new Date(),
                expiresAt: new Date(),
                isDeleted: false,
                createdAt: new Date(),
                updatedAt: new Date(),
            };
            mockRepo.updateQr.mockResolvedValue(mockRotated);
            mockRepo.createHistory.mockResolvedValue({});
            mockRepo.createAuditLog.mockResolvedValue({});
            const result = await service.rotateQr(mockUserId, mockQrId, { reason: 'Scheduled rotation' });
            expect(result.version).toBe(2);
            expect(mockRepo.createHistory).toHaveBeenCalledWith(expect.objectContaining({
                action: 'ROTATED',
                previousToken: 'HVQR-OLDTOKEN',
            }));
        });
        it('should revoke QR token and set status to REVOKED', async () => {
            mockRepo.findProfileByUserId.mockResolvedValue({ id: mockProfileId });
            mockRepo.findQrById.mockResolvedValue({
                id: mockQrId,
                ownerId: mockProfileId,
                status: 'ACTIVE',
            });
            const mockRevoked = {
                id: mockQrId,
                entityId: mockEntityId,
                entityType: 'HEALTH_CARD',
                ownerId: mockProfileId,
                token: 'HVQR-REVOKEDTOKEN',
                signature: 'sig',
                status: 'REVOKED',
                version: 1,
                nonce: 'nonce',
                issuedAt: new Date(),
                expiresAt: new Date(),
                isDeleted: false,
                createdAt: new Date(),
                updatedAt: new Date(),
            };
            mockRepo.updateQr.mockResolvedValue(mockRevoked);
            mockRepo.createHistory.mockResolvedValue({});
            mockRepo.createAuditLog.mockResolvedValue({});
            const result = await service.revokeQr(mockUserId, mockQrId, { reason: 'Compromised' });
            expect(result.status).toBe('REVOKED');
        });
    });
});
//# sourceMappingURL=qr.service.spec.js.map
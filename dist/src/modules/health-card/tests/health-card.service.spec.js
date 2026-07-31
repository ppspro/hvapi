"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const health_card_service_1 = require("../application/use-cases/health-card.service");
const common_1 = require("@nestjs/common");
const nestjs_pino_1 = require("nestjs-pino");
const mockProfileId = 'profile-uuid-1';
const mockUserId = 'user-uuid-1';
const mockCardId = 'card-uuid-1';
const mockRepo = {
    findProfileByUserId: jest.fn(),
    createCard: jest.fn(),
    findCardById: jest.fn(),
    findCardByProfileId: jest.fn(),
    findCardByNumber: jest.fn(),
    updateCard: jest.fn(),
    searchCards: jest.fn(),
    createQr: jest.fn(),
    findQrByCardId: jest.fn(),
    updateQrPayload: jest.fn(),
    createHistory: jest.fn(),
    findHistoryByCardId: jest.fn(),
    createAuditLog: jest.fn(),
    recordQrScanLog: jest.fn(),
};
const mockLogger = {
    log: jest.fn(),
    error: jest.fn(),
    warn: jest.fn(),
};
const qr_service_1 = require("../../qr/application/use-cases/qr.service");
const mockQrService = {
    generateQr: jest.fn(),
    verifyQrPayload: jest.fn(),
    rotateQr: jest.fn(),
    revokeQr: jest.fn(),
};
describe('HealthCardService', () => {
    let service;
    beforeEach(async () => {
        jest.clearAllMocks();
        const module = await testing_1.Test.createTestingModule({
            providers: [
                health_card_service_1.HealthCardService,
                { provide: 'IHealthCardRepository', useValue: mockRepo },
                { provide: qr_service_1.QrService, useValue: mockQrService },
                { provide: nestjs_pino_1.Logger, useValue: mockLogger },
            ],
        }).compile();
        service = module.get(health_card_service_1.HealthCardService);
    });
    describe('issueCard', () => {
        it('should throw if patient profile is not found', async () => {
            mockRepo.findProfileByUserId.mockResolvedValue(null);
            await expect(service.issueCard(mockUserId, {})).rejects.toThrow(common_1.NotFoundException);
        });
        it('should throw if patient already has an active card', async () => {
            mockRepo.findProfileByUserId.mockResolvedValue({ id: mockProfileId });
            mockRepo.findCardByProfileId.mockResolvedValue({
                id: mockCardId,
                status: 'ACTIVE',
                cardNumber: 'HV360-1234-5678-9012',
            });
            await expect(service.issueCard(mockUserId, {})).rejects.toThrow(common_1.BadRequestException);
        });
        it('should issue new card and create QR record', async () => {
            mockRepo.findProfileByUserId.mockResolvedValue({ id: mockProfileId });
            mockRepo.findCardByProfileId.mockResolvedValue(null);
            const mockCard = {
                id: mockCardId,
                patientProfileId: mockProfileId,
                cardNumber: 'HV360-9999-8888-7777',
                status: 'ISSUED',
                version: 1,
                emergencyFlag: false,
                issuedAt: new Date(),
                expiresAt: new Date(),
                isDeleted: false,
                createdAt: new Date(),
                updatedAt: new Date(),
            };
            mockRepo.createCard.mockResolvedValue(mockCard);
            mockRepo.createQr.mockResolvedValue({});
            mockRepo.createAuditLog.mockResolvedValue({});
            const result = await service.issueCard(mockUserId, {});
            expect(result.id).toBe(mockCardId);
            expect(result.status).toBe('ISSUED');
            expect(mockRepo.createQr).toHaveBeenCalled();
        });
    });
    describe('status transitions (suspend / block / replace / renew)', () => {
        it('should suspend an active card', async () => {
            mockRepo.findProfileByUserId.mockResolvedValue({ id: mockProfileId });
            mockRepo.findCardById.mockResolvedValue({
                id: mockCardId,
                patientProfileId: mockProfileId,
                status: 'ACTIVE',
                version: 1,
                emergencyFlag: false,
                issuedAt: new Date(),
                expiresAt: new Date(),
                isDeleted: false,
                createdAt: new Date(),
                updatedAt: new Date(),
            });
            mockRepo.updateCard.mockResolvedValue({
                id: mockCardId,
                patientProfileId: mockProfileId,
                cardNumber: 'HV360-1234',
                status: 'SUSPENDED',
                version: 1,
                emergencyFlag: false,
                issuedAt: new Date(),
                expiresAt: new Date(),
                isDeleted: false,
                createdAt: new Date(),
                updatedAt: new Date(),
            });
            const result = await service.suspendCard(mockUserId, mockCardId, { reason: 'Lost temporarily' });
            expect(result.status).toBe('SUSPENDED');
            expect(mockRepo.createHistory).toHaveBeenCalledWith(mockCardId, expect.objectContaining({
                action: 'SUSPENDED',
                newStatus: 'SUSPENDED',
            }));
        });
        it('should replace a card and bump version', async () => {
            mockRepo.findProfileByUserId.mockResolvedValue({ id: mockProfileId });
            mockRepo.findCardById.mockResolvedValue({
                id: mockCardId,
                patientProfileId: mockProfileId,
                cardNumber: 'HV360-OLD-CARD',
                status: 'ACTIVE',
                version: 1,
                emergencyFlag: false,
                issuedAt: new Date(),
                expiresAt: new Date(),
                isDeleted: false,
                createdAt: new Date(),
                updatedAt: new Date(),
            });
            mockRepo.updateCard.mockResolvedValue({
                id: mockCardId,
                patientProfileId: mockProfileId,
                cardNumber: 'HV360-NEW-CARD',
                status: 'ACTIVE',
                version: 2,
                emergencyFlag: false,
                issuedAt: new Date(),
                expiresAt: new Date(),
                isDeleted: false,
                createdAt: new Date(),
                updatedAt: new Date(),
            });
            mockRepo.createQr.mockResolvedValue({});
            const result = await service.replaceCard(mockUserId, mockCardId, { reason: 'Damaged card' });
            expect(result.version).toBe(2);
            expect(mockRepo.createHistory).toHaveBeenCalledWith(mockCardId, expect.objectContaining({
                action: 'REPLACED',
                newStatus: 'ACTIVE',
            }));
        });
    });
    describe('verifyQr', () => {
        it('should return isValid = false for non-existing or inactive card', async () => {
            mockRepo.findCardByNumber.mockResolvedValue(null);
            const result = await service.verifyQr({ qrPayload: 'INVALID' }, 'verifier-1');
            expect(result.isValid).toBe(false);
        });
        it('should return isValid = true for active valid card', async () => {
            const mockCard = {
                id: mockCardId,
                cardNumber: 'HV360-VALID-CARD',
                status: 'ACTIVE',
                expiresAt: new Date(Date.now() + 1000000),
                patientProfile: {
                    patientNumber: 'PT-100',
                    firstName: 'John',
                    lastName: 'Doe',
                    dateOfBirth: new Date('1992-05-15'),
                    bloodGroup: 'O+',
                },
            };
            mockRepo.findCardByNumber.mockResolvedValue(mockCard);
            mockRepo.recordQrScanLog.mockResolvedValue({});
            const result = await service.verifyQr({ qrPayload: 'HV360-VALID-CARD' }, 'verifier-1');
            expect(result.isValid).toBe(true);
            expect(result.status).toBe('VERIFIED');
            expect(result.patientDetails?.firstName).toBe('John');
        });
    });
});
//# sourceMappingURL=health-card.service.spec.js.map
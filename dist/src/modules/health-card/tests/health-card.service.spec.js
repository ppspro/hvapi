"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const health_card_service_1 = require("../application/use-cases/health-card.service");
describe('HealthCardService', () => {
    let service;
    let mockHealthCardRepository;
    let mockLogger;
    beforeEach(() => {
        mockHealthCardRepository = {
            findProfileByUserId: jest.fn(),
            findCardByProfileId: jest.fn(),
            createCard: jest.fn(),
            createQr: jest.fn(),
            findQrByPayload: jest.fn(),
            updateQrPayload: jest.fn(),
            createVerificationLog: jest.fn(),
        };
        mockLogger = {
            log: jest.fn(),
        };
        service = new health_card_service_1.HealthCardService(mockHealthCardRepository, mockLogger);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
    describe('onboardHealthCard', () => {
        it('should generate a new digital health card and active QR code record', async () => {
            mockHealthCardRepository.findProfileByUserId.mockResolvedValue({ id: 'profile-123' });
            mockHealthCardRepository.findCardByProfileId.mockResolvedValue(null);
            mockHealthCardRepository.createCard.mockResolvedValue({
                id: 'card-123',
                cardNumber: 'HV360-E2E1-F2D2-A3B3',
            });
            const result = await service.onboardHealthCard('user-123');
            expect(mockHealthCardRepository.createCard).toHaveBeenCalled();
            expect(mockHealthCardRepository.createQr).toHaveBeenCalled();
            expect(result.cardNumber).toBe('HV360-E2E1-F2D2-A3B3');
            expect(result.nextStep).toBe(6);
        });
    });
    describe('verifyQr', () => {
        it('should verify scanned QR payloads and log success', async () => {
            mockHealthCardRepository.findQrByPayload.mockResolvedValue({
                id: 'qr-123',
                expiresAt: new Date(Date.now() + 100000),
                healthCard: { cardNumber: 'HV360-E2E1-F2D2-A3B3' },
            });
            const result = await service.verifyQr('verifier-456', {
                qrPayload: 'valid.payload.hash',
            });
            expect(mockHealthCardRepository.createVerificationLog).toHaveBeenCalledWith('qr-123', 'verifier-456', 'SUCCESS');
            expect(result.isValid).toBe(true);
            expect(result.cardNumber).toBe('HV360-E2E1-F2D2-A3B3');
        });
    });
});
//# sourceMappingURL=health-card.service.spec.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const insurance_service_1 = require("../application/use-cases/insurance.service");
describe('InsuranceService', () => {
    let service;
    let mockInsuranceRepository;
    let mockLogger;
    beforeEach(() => {
        mockInsuranceRepository = {
            findProfileByUserId: jest.fn(),
            findPolicyByProfileId: jest.fn(),
            createPolicy: jest.fn(),
            updatePolicy: jest.fn(),
            createOcrRecord: jest.fn(),
            findOcrRecordById: jest.fn(),
            confirmOcrRecord: jest.fn(),
        };
        mockLogger = {
            log: jest.fn(),
        };
        service = new insurance_service_1.InsuranceService(mockInsuranceRepository, mockLogger);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
    describe('onboardInsurance', () => {
        it('should save a new policy if profile exists and no previous policy found', async () => {
            mockInsuranceRepository.findProfileByUserId.mockResolvedValue({ id: 'profile-123' });
            mockInsuranceRepository.findPolicyByProfileId.mockResolvedValue(null);
            mockInsuranceRepository.createPolicy.mockResolvedValue({ id: 'policy-123' });
            const result = await service.onboardInsurance('user-123', {
                providerName: 'Blue Shield',
                policyNumber: 'POL987654321',
            });
            expect(mockInsuranceRepository.createPolicy).toHaveBeenCalledWith('profile-123', 'Blue Shield', 'POL987654321', undefined);
            expect(result.policyId).toBe('policy-123');
            expect(result.nextStep).toBe(5);
        });
    });
    describe('scanInsuranceCard', () => {
        it('should generate a pending OCR record and return candidate text fields', async () => {
            mockInsuranceRepository.findProfileByUserId.mockResolvedValue({ id: 'profile-123' });
            mockInsuranceRepository.createOcrRecord.mockResolvedValue({ id: 'ocr-123' });
            const result = await service.scanInsuranceCard('user-123', {
                imageUrl: 'https://storage.healthvault360.com/cards/ins-123.jpg',
            });
            expect(mockInsuranceRepository.createOcrRecord).toHaveBeenCalled();
            expect(result.ocrId).toBe('ocr-123');
            expect(result.extractedData.providerName).toContain('OCR Candidate');
        });
    });
});
//# sourceMappingURL=insurance.service.spec.js.map
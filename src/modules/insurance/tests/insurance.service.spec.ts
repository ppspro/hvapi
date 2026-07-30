import { InsuranceService } from '../application/use-cases/insurance.service';
import { Logger } from 'nestjs-pino';

describe('InsuranceService', () => {
  let service: InsuranceService;
  let mockInsuranceRepository: any;
  let mockLogger: any;

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
    } as unknown as Logger;

    service = new InsuranceService(mockInsuranceRepository, mockLogger);
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

      expect(mockInsuranceRepository.createPolicy).toHaveBeenCalledWith(
        'profile-123',
        'Blue Shield',
        'POL987654321',
        undefined,
      );
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

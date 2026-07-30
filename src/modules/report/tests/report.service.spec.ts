import { ReportService } from '../application/use-cases/report.service';
import { Logger } from 'nestjs-pino';

describe('ReportService', () => {
  let service: ReportService;
  let mockReportRepository: any;
  let mockLogger: any;

  beforeEach(() => {
    mockReportRepository = {
      findProfileByUserId: jest.fn(),
      findReportsByProfileId: jest.fn(),
      findReportById: jest.fn(),
      createReport: jest.fn(),
      createAttachment: jest.fn(),
    };

    mockLogger = {
      log: jest.fn(),
      warn: jest.fn(),
    } as unknown as Logger;

    service = new ReportService(mockReportRepository, mockLogger);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createReport', () => {
    it('should successfully upload a report and save details', async () => {
      mockReportRepository.findProfileByUserId.mockResolvedValue({ id: 'profile-123' });
      mockReportRepository.createReport.mockResolvedValue({ id: 'report-123' });
      mockReportRepository.createAttachment.mockResolvedValue({ id: 'attach-123' });

      const result = await service.createReport('user-123', {
        title: 'Blood Panel',
        category: 'Diagnostic',
        fileName: 'blood.pdf',
        fileSize: 2048,
        mimeType: 'application/pdf',
        storageUrl: 'https://storage.healthvault360.com/reports/blood.pdf',
      });

      expect(mockReportRepository.createReport).toHaveBeenCalledWith('profile-123', 'Blood Panel', 'Diagnostic', undefined);
      expect(mockReportRepository.createAttachment).toHaveBeenCalled();
      expect(result.reportId).toBe('report-123');
    });
  });

  describe('generateDownloadUrl', () => {
    it('should generate secure S3 presigned url if profile match authenticates', async () => {
      mockReportRepository.findProfileByUserId.mockResolvedValue({ id: 'profile-123' });
      mockReportRepository.findReportById.mockResolvedValue({
        id: 'report-123',
        patientProfileId: 'profile-123',
        attachments: [{ storageUrl: 'https://storage.healthvault360.com/reports/blood.pdf' }],
      });

      const result = await service.generateDownloadUrl('user-123', 'report-123');

      expect(result.downloadUrl).toContain('presigned-signature-token-expiry=3600');
      expect(result.expiresInSeconds).toBe(3600);
    });

    it('should reject link generation if user does not own target medical report profile', async () => {
      mockReportRepository.findProfileByUserId.mockResolvedValue({ id: 'profile-123' });
      mockReportRepository.findReportById.mockResolvedValue({
        id: 'report-123',
        patientProfileId: 'profile-unauthorized',
      });

      await expect(service.generateDownloadUrl('user-123', 'report-123')).rejects.toThrow();
    });
  });
});

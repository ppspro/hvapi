import { Test, TestingModule } from '@nestjs/testing';
import { ReportService } from '../application/use-cases/report.service';
import { NotFoundException, BadRequestException, ForbiddenException } from '@nestjs/common';
import { Logger } from 'nestjs-pino';

const mockProfileId = 'profile-uuid-1';
const mockUserId = 'user-uuid-1';
const mockReportId = 'report-uuid-1';

const mockRepo = {
  findProfileByUserId: jest.fn(),
  createReport: jest.fn(),
  findReportById: jest.fn(),
  findReportsByProfile: jest.fn(),
  updateReport: jest.fn(),
  softDeleteReport: jest.fn(),
  restoreReport: jest.fn(),
  searchReports: jest.fn(),
  getCategoriesCount: jest.fn(),
  getTimeline: jest.fn(),
  createAttachment: jest.fn(),
  createReportVersion: jest.fn(),
  findReportVersions: jest.fn(),
  createAuditLog: jest.fn(),
};

const mockLogger = {
  log: jest.fn(),
  error: jest.fn(),
  warn: jest.fn(),
};

import { QrService } from '@modules/qr/application/use-cases/qr.service';

const mockQrService = {
  generateQr: jest.fn(),
  verifyQrPayload: jest.fn(),
  rotateQr: jest.fn(),
  revokeQr: jest.fn(),
};

describe('ReportService', () => {
  let service: ReportService;

  beforeEach(async () => {
    jest.clearAllMocks();
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ReportService,
        { provide: 'IReportRepository', useValue: mockRepo },
        { provide: QrService, useValue: mockQrService },
        { provide: Logger, useValue: mockLogger },
      ],
    }).compile();
    service = module.get<ReportService>(ReportService);
  });


  describe('uploadReport', () => {
    it('should throw if patient profile is not found', async () => {
      mockRepo.findProfileByUserId.mockResolvedValue(null);
      await expect(service.uploadReport(mockUserId, {
        title: 'CBC Report',
        fileName: 'cbc.pdf',
        fileSize: 500000,
        mimeType: 'application/pdf',
        storageUrl: 'https://cdn.hvapi.com/cbc.pdf',
      })).rejects.toThrow(NotFoundException);
    });

    it('should throw if MIME type is not allowed', async () => {
      mockRepo.findProfileByUserId.mockResolvedValue({ id: mockProfileId });
      await expect(service.uploadReport(mockUserId, {
        title: 'Executable',
        fileName: 'malware.exe',
        fileSize: 500000,
        mimeType: 'application/x-msdownload',
        storageUrl: 'https://cdn.hvapi.com/malware.exe',
      })).rejects.toThrow(BadRequestException);
    });

    it('should successfully upload report and log audit event', async () => {
      mockRepo.findProfileByUserId.mockResolvedValue({ id: mockProfileId });
      const mockCreated = {
        id: mockReportId,
        patientProfileId: mockProfileId,
        title: 'CBC Report',
        category: 'LAB',
        status: 'UPLOADED',
        pageCount: 1,
        language: 'en',
        tags: [],
        verificationStatus: 'UNVERIFIED',
        currentVersion: 1,
        isDeleted: false,
        attachments: [{
          id: 'att-1',
          fileName: 'cbc.pdf',
          fileSize: 500000,
          mimeType: 'application/pdf',
          storageUrl: 'https://cdn.hvapi.com/cbc.pdf',
          createdAt: new Date(),
        }],
        versions: [],
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      mockRepo.createReport.mockResolvedValue(mockCreated);
      mockRepo.createAuditLog.mockResolvedValue({});

      const result = await service.uploadReport(mockUserId, {
        title: 'CBC Report',
        fileName: 'cbc.pdf',
        fileSize: 500000,
        mimeType: 'application/pdf',
        storageUrl: 'https://cdn.hvapi.com/cbc.pdf',
      });

      expect(result.id).toBe(mockReportId);
      expect(result.category).toBe('LAB');
      expect(mockRepo.createAuditLog).toHaveBeenCalledWith(expect.objectContaining({
        action: 'UPLOADED',
        medicalReportId: mockReportId,
      }));
    });
  });

  describe('replaceReportFile', () => {
    it('should create new version and update currentVersion', async () => {
      mockRepo.findProfileByUserId.mockResolvedValue({ id: mockProfileId });
      mockRepo.findReportById.mockResolvedValue({
        id: mockReportId,
        patientProfileId: mockProfileId,
        status: 'UPLOADED',
        currentVersion: 1,
      });

      const mockUpdated = {
        id: mockReportId,
        patientProfileId: mockProfileId,
        title: 'CBC Report',
        category: 'LAB',
        status: 'UPLOADED',
        pageCount: 1,
        language: 'en',
        tags: [],
        verificationStatus: 'UNVERIFIED',
        currentVersion: 2,
        isDeleted: false,
        attachments: [],
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      mockRepo.createAttachment.mockResolvedValue({});
      mockRepo.createReportVersion.mockResolvedValue({});
      mockRepo.updateReport.mockResolvedValue(mockUpdated);
      mockRepo.createAuditLog.mockResolvedValue({});

      const result = await service.replaceReportFile(mockUserId, mockReportId, {
        fileName: 'cbc_v2.pdf',
        fileSize: 600000,
        mimeType: 'application/pdf',
        storageUrl: 'https://cdn.hvapi.com/cbc_v2.pdf',
      });

      expect(result.currentVersion).toBe(2);
      expect(mockRepo.createReportVersion).toHaveBeenCalledWith(expect.objectContaining({
        version: 2,
        fileName: 'cbc_v2.pdf',
      }));
    });

    it('should throw if report is archived', async () => {
      mockRepo.findProfileByUserId.mockResolvedValue({ id: mockProfileId });
      mockRepo.findReportById.mockResolvedValue({
        id: mockReportId,
        patientProfileId: mockProfileId,
        status: 'ARCHIVED',
        currentVersion: 1,
      });

      await expect(service.replaceReportFile(mockUserId, mockReportId, {
        fileName: 'cbc_v2.pdf',
        fileSize: 600000,
        mimeType: 'application/pdf',
        storageUrl: 'https://cdn.hvapi.com/cbc_v2.pdf',
      })).rejects.toThrow(BadRequestException);
    });
  });

  describe('verifyReport', () => {
    it('should update verificationStatus to VERIFIED', async () => {
      mockRepo.findProfileByUserId.mockResolvedValue({ id: mockProfileId });
      mockRepo.findReportById.mockResolvedValue({
        id: mockReportId,
        patientProfileId: mockProfileId,
        status: 'UPLOADED',
        verificationStatus: 'UNVERIFIED',
      });

      const mockVerified = {
        id: mockReportId,
        patientProfileId: mockProfileId,
        title: 'CBC Report',
        category: 'LAB',
        status: 'VERIFIED',
        pageCount: 1,
        language: 'en',
        tags: [],
        verificationStatus: 'VERIFIED',
        currentVersion: 1,
        isDeleted: false,
        attachments: [],
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      mockRepo.updateReport.mockResolvedValue(mockVerified);
      mockRepo.createAuditLog.mockResolvedValue({});

      const result = await service.verifyReport(mockUserId, mockReportId, { notes: 'All values checked' });
      expect(result.verificationStatus).toBe('VERIFIED');
      expect(result.status).toBe('VERIFIED');
    });
  });

  describe('getDownloadToken', () => {
    it('should generate secure download link with expiry token', async () => {
      mockRepo.findProfileByUserId.mockResolvedValue({ id: mockProfileId });
      mockRepo.findReportById.mockResolvedValue({
        id: mockReportId,
        patientProfileId: mockProfileId,
        attachments: [{ storageUrl: 'https://cdn.hvapi.com/cbc.pdf' }],
      });

      const result = await service.getDownloadToken(mockUserId, mockReportId);
      expect(result.downloadUrl).toContain('token=');
      expect(result.token).toBeDefined();
      expect(result.expiresAt).toBeDefined();
    });
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { OCRJobService } from '../application/use-cases/ocr.service';
import { NotFoundException, ConflictException } from '@nestjs/common';
import { Logger } from 'nestjs-pino';

const mockUserId = 'user-uuid-1';

const mockRepo = {
  createJob: jest.fn(),
  findJobs: jest.fn(),
  findJobById: jest.fn(),
  updateJobStatus: jest.fn(),
  softDeleteJob: jest.fn(),
  createPage: jest.fn(),
  createExtractedField: jest.fn(),
  findExtractedFieldsByJobId: jest.fn(),
  findPagesByJobId: jest.fn(),
  createTemplate: jest.fn(),
  findTemplates: jest.fn(),
  findTemplateByCode: jest.fn(),
  findTemplateById: jest.fn(),
  updateTemplate: jest.fn(),
  softDeleteTemplate: jest.fn(),
  findJobsRequiringReview: jest.fn(),
  createVerification: jest.fn(),
  createAuditLog: jest.fn(),
  findAuditLogs: jest.fn(),
  getDashboardStats: jest.fn(),
};

const mockLogger = { log: jest.fn(), error: jest.fn(), warn: jest.fn() };

describe('OCRJobService (Phase 22)', () => {
  let service: OCRJobService;

  beforeEach(async () => {
    jest.clearAllMocks();
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OCRJobService,
        { provide: 'IOcrRepository', useValue: mockRepo },
        { provide: Logger, useValue: mockLogger },
      ],
    }).compile();

    service = module.get<OCRJobService>(OCRJobService);
  });

  describe('OCR Job Submission & CPU Pipeline', () => {
    it('should submit job, run local OCR pipeline, and calculate overall confidence', async () => {
      const mockInitialJob = {
        id: 'job-1',
        medicalAttachmentId: 'attachment-1',
        documentType: 'LAB_REPORT',
        status: 'QUEUED',
        submittedBy: mockUserId,
        confidenceLevel: 'MEDIUM',
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      mockRepo.createJob.mockResolvedValue(mockInitialJob);
      mockRepo.updateJobStatus.mockResolvedValue(mockInitialJob);
      mockRepo.createPage.mockResolvedValue({});
      mockRepo.createExtractedField.mockResolvedValue({});
      mockRepo.createAuditLog.mockResolvedValue({});
      mockRepo.findJobById.mockResolvedValue({
        ...mockInitialJob,
        status: 'COMPLETED',
        overallConfidence: 0.93,
        confidenceLevel: 'HIGH',
      });

      const res = await service.submitJob(mockUserId, {
        medicalAttachmentId: 'attachment-1',
        documentType: 'LAB_REPORT',
      });

      expect(res.id).toBe('job-1');
      expect(mockRepo.createPage).toHaveBeenCalled();
      expect(mockRepo.createExtractedField).toHaveBeenCalled();
      expect(mockRepo.createAuditLog).toHaveBeenCalled();
    });
  });

  describe('OCR Results Extraction', () => {
    it('should return raw OCR text combined from pages', async () => {
      mockRepo.findJobById.mockResolvedValue({ id: 'job-1' });
      mockRepo.findPagesByJobId.mockResolvedValue([
        { pageNumber: 1, rawText: 'Header info' },
        { pageNumber: 2, rawText: 'Lab values' },
      ]);

      const res = await service.getJobText('job-1');
      expect(res.text).toContain('Header info');
      expect(res.text).toContain('Lab values');
    });

    it('should return structured JSON object of extracted fields', async () => {
      mockRepo.findJobById.mockResolvedValue({ id: 'job-1', medicalAttachmentId: 'att-1', documentType: 'LAB_REPORT', overallConfidence: 0.94, confidenceLevel: 'HIGH', status: 'COMPLETED' });
      mockRepo.findExtractedFieldsByJobId.mockResolvedValue([
        { fieldName: 'patient_name', fieldValue: 'John Doe', confidence: 0.96, validationStatus: 'VALIDATED' },
      ]);

      const res = await service.getJobJson('job-1');
      expect(res.fields.patient_name.value).toBe('John Doe');
      expect(res.fields.patient_name.confidence).toBe(0.96);
    });
  });

  describe('Human Verification Workflow', () => {
    it('should submit human verification for review required job', async () => {
      mockRepo.findJobById.mockResolvedValue({ id: 'job-1', status: 'REVIEW_REQUIRED' });
      mockRepo.createVerification.mockResolvedValue({
        id: 'ver-1',
        ocrJobId: 'job-1',
        reviewedBy: mockUserId,
        reviewStatus: 'APPROVED',
        completedAt: new Date(),
        createdAt: new Date(),
      });
      mockRepo.createAuditLog.mockResolvedValue({});

      const res = await service.submitVerification('job-1', mockUserId, {
        reviewStatus: 'APPROVED',
        reviewNotes: 'Verified manually',
      });

      expect(res.reviewStatus).toBe('APPROVED');
      expect(mockRepo.createAuditLog).toHaveBeenCalled();
    });
  });

  describe('OCR Dashboard Stats', () => {
    it('should return dashboard stats', async () => {
      mockRepo.getDashboardStats.mockResolvedValue({
        totalJobs: 150,
        completedJobs: 130,
        reviewRequiredJobs: 15,
        failedJobs: 5,
        averageConfidence: 0.92,
        activeTemplatesCount: 10,
      });

      const res = await service.getDashboardStats();
      expect(res.totalJobs).toBe(150);
      expect(res.averageConfidence).toBe(0.92);
    });
  });
});

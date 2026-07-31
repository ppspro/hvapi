import { Test, TestingModule } from '@nestjs/testing';
import { ReportingService } from '../application/use-cases/reports.service';
import { NotFoundException, ConflictException } from '@nestjs/common';
import { Logger } from 'nestjs-pino';

const mockUserId = 'user-uuid-1';

const mockRepo = {
  createDefinition: jest.fn(),
  findDefinitions: jest.fn(),
  findDefinitionByCode: jest.fn(),
  findDefinitionById: jest.fn(),
  updateDefinition: jest.fn(),
  softDeleteDefinition: jest.fn(),
  createGeneratedReport: jest.fn(),
  findGeneratedReports: jest.fn(),
  findGeneratedReportById: jest.fn(),
  updateGeneratedReportStatus: jest.fn(),
  createWidget: jest.fn(),
  findWidgets: jest.fn(),
  findWidgetByCode: jest.fn(),
  findWidgetById: jest.fn(),
  updateWidget: jest.fn(),
  reorderWidgets: jest.fn(),
  createSnapshot: jest.fn(),
  findSnapshots: jest.fn(),
  createAuditLog: jest.fn(),
  getExecutiveDashboardData: jest.fn(),
  getModuleAnalytics: jest.fn(),
};

const mockLogger = { log: jest.fn(), error: jest.fn(), warn: jest.fn() };

describe('ReportingService (Phase 19)', () => {
  let service: ReportingService;

  beforeEach(async () => {
    jest.clearAllMocks();
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ReportingService,
        { provide: 'IReportsRepository', useValue: mockRepo },
        { provide: Logger, useValue: mockLogger },
      ],
    }).compile();

    service = module.get<ReportingService>(ReportingService);
  });

  describe('ReportDefinition', () => {
    it('should throw ConflictException if definition code already exists', async () => {
      mockRepo.findDefinitionByCode.mockResolvedValue({ id: 'def-1', code: 'RPT-PATIENT-MONTHLY' });

      await expect(service.createDefinition(mockUserId, {
        name: 'Patient Monthly',
        code: 'RPT-PATIENT-MONTHLY',
        module: 'patient',
      })).rejects.toThrow(ConflictException);
    });

    it('should create definition and log audit entry', async () => {
      mockRepo.findDefinitionByCode.mockResolvedValue(null);
      const mockCreated = {
        id: 'def-1',
        name: 'Patient Monthly',
        code: 'RPT-PATIENT-MONTHLY',
        reportType: 'SUMMARY',
        module: 'patient',
        isSystem: false,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      mockRepo.createDefinition.mockResolvedValue(mockCreated);
      mockRepo.createAuditLog.mockResolvedValue({});

      const res = await service.createDefinition(mockUserId, {
        name: 'Patient Monthly',
        code: 'RPT-PATIENT-MONTHLY',
        module: 'patient',
      });

      expect(res.id).toBe('def-1');
      expect(res.code).toBe('RPT-PATIENT-MONTHLY');
      expect(mockRepo.createAuditLog).toHaveBeenCalled();
    });
  });

  describe('Report Generation & Export', () => {
    it('should generate report and record audit log', async () => {
      const mockGenerated = {
        id: 'gen-1',
        reportName: 'Monthly Executive Summary',
        exportFormat: 'PDF',
        status: 'GENERATED',
        filePath: '/exports/reports/RPT_100.pdf',
        generatedAt: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      mockRepo.createGeneratedReport.mockResolvedValue(mockGenerated);
      mockRepo.createAuditLog.mockResolvedValue({});

      const res = await service.generateReport(mockUserId, {
        reportName: 'Monthly Executive Summary',
        exportFormat: 'PDF',
      });

      expect(res.id).toBe('gen-1');
      expect(res.exportFormat).toBe('PDF');
      expect(mockRepo.createAuditLog).toHaveBeenCalled();
    });

    it('should export generated report to requested format', async () => {
      const mockReport = { id: 'gen-1', reportName: 'Summary', status: 'GENERATED', exportFormat: 'JSON', generatedAt: new Date() };
      mockRepo.findGeneratedReportById.mockResolvedValue(mockReport);
      mockRepo.updateGeneratedReportStatus.mockResolvedValue({ ...mockReport, status: 'EXPORTED', exportFormat: 'CSV', filePath: '/exports/CSV' });
      mockRepo.createAuditLog.mockResolvedValue({});

      const res = await service.exportReport('gen-1', 'CSV', mockUserId);
      expect(res.status).toBe('EXPORTED');
      expect(mockRepo.createAuditLog).toHaveBeenCalled();
    });
  });

  describe('Executive Dashboard', () => {
    it('should return executive dashboard overview', async () => {
      mockRepo.getExecutiveDashboardData.mockResolvedValue({
        platformOverview: {
          totalPatients: 100,
          totalDoctors: 20,
          totalFacilities: 5,
          totalStaff: 30,
          totalHealthCards: 80,
          totalInsurancePolicies: 50,
          totalImmunisations: 120,
          totalReports: 15,
          totalAuditLogs: 200,
        },
      });

      const res = await service.getExecutiveDashboard();
      expect(res.platformOverview.totalPatients).toBe(100);
      expect(res.platformOverview.totalHealthCards).toBe(80);
    });
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { ImmunisationService } from '../application/use-cases/immunisation.service';
import { NotFoundException, BadRequestException, ForbiddenException } from '@nestjs/common';
import { Logger } from 'nestjs-pino';
import { QrService } from '@modules/qr/application/use-cases/qr.service';

const mockProfileId = 'profile-uuid-1';
const mockUserId = 'user-uuid-1';
const mockRecordId = 'record-uuid-1';
const mockVaccineId = 'vaccine-uuid-1';

const mockRepo = {
  findProfileByUserId: jest.fn(),
  createVaccine: jest.fn(),
  findVaccines: jest.fn(),
  findVaccineById: jest.fn(),
  createSchedule: jest.fn(),
  findSchedules: jest.fn(),
  createRecord: jest.fn(),
  findRecordById: jest.fn(),
  findRecordsByProfile: jest.fn(),
  updateRecord: jest.fn(),
  softDeleteRecord: jest.fn(),
  searchRecords: jest.fn(),
  createCertificate: jest.fn(),
  findCertificatesByProfile: jest.fn(),
  upsertReminderConfig: jest.fn(),
  createHistory: jest.fn(),
  createAuditLog: jest.fn(),
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

describe('ImmunisationService', () => {
  let service: ImmunisationService;

  beforeEach(async () => {
    jest.clearAllMocks();
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ImmunisationService,
        { provide: 'IImmunisationRepository', useValue: mockRepo },
        { provide: QrService, useValue: mockQrService },
        { provide: Logger, useValue: mockLogger },
      ],
    }).compile();
    service = module.get<ImmunisationService>(ImmunisationService);
  });

  describe('createRecord', () => {
    it('should throw if patient profile is not found', async () => {
      mockRepo.findProfileByUserId.mockResolvedValue(null);
      await expect(service.createRecord(mockUserId, {
        vaccineId: mockVaccineId,
      })).rejects.toThrow(NotFoundException);
    });

    it('should create scheduled vaccination record and log audit', async () => {
      mockRepo.findProfileByUserId.mockResolvedValue({ id: mockProfileId });
      mockRepo.findVaccineById.mockResolvedValue({ id: mockVaccineId, name: 'COVID-19' });
      const mockCreated = {
        id: mockRecordId,
        patientProfileId: mockProfileId,
        vaccineId: mockVaccineId,
        doseNumber: 1,
        status: 'SCHEDULED',
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      mockRepo.createRecord.mockResolvedValue(mockCreated);
      mockRepo.createAuditLog.mockResolvedValue({});

      const result = await service.createRecord(mockUserId, { vaccineId: mockVaccineId });
      expect(result.id).toBe(mockRecordId);
      expect(result.status).toBe('SCHEDULED');
      expect(mockRepo.createAuditLog).toHaveBeenCalledWith(expect.objectContaining({
        recordId: mockRecordId,
        action: 'SCHEDULED',
      }));
    });
  });

  describe('administerDose & generateCertificate', () => {
    it('should update status to ADMINISTERED and log batch details', async () => {
      mockRepo.findProfileByUserId.mockResolvedValue({ id: mockProfileId });
      mockRepo.findRecordById.mockResolvedValue({
        id: mockRecordId,
        patientProfileId: mockProfileId,
        status: 'SCHEDULED',
      });

      const mockAdministered = {
        id: mockRecordId,
        patientProfileId: mockProfileId,
        vaccineId: mockVaccineId,
        doseNumber: 1,
        status: 'ADMINISTERED',
        administeredBy: 'Dr. Smith',
        facilityName: 'Central Clinic',
        batchNumber: 'BATCH-100',
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      mockRepo.updateRecord.mockResolvedValue(mockAdministered);
      mockRepo.createHistory.mockResolvedValue({});
      mockRepo.createAuditLog.mockResolvedValue({});

      const result = await service.administerDose(mockUserId, mockRecordId, {
        administeredBy: 'Dr. Smith',
        facilityName: 'Central Clinic',
        batchNumber: 'BATCH-100',
      });

      expect(result.status).toBe('ADMINISTERED');
      expect(result.batchNumber).toBe('BATCH-100');
    });

    it('should generate digital certificate with QR token from QrService', async () => {
      mockRepo.findProfileByUserId.mockResolvedValue({ id: mockProfileId });
      mockRepo.findRecordById.mockResolvedValue({
        id: mockRecordId,
        patientProfileId: mockProfileId,
        status: 'ADMINISTERED',
      });
      mockQrService.generateQr.mockResolvedValue({ token: 'HVQR-IMMUNISATION999' });

      const mockCert = {
        id: 'cert-1',
        patientProfileId: mockProfileId,
        recordId: mockRecordId,
        certificateNumber: 'VAC-CERT-100',
        issueDate: new Date(),
        verificationStatus: 'VERIFIED',
        qrToken: 'HVQR-IMMUNISATION999',
        version: 1,
        createdAt: new Date(),
      };
      mockRepo.createCertificate.mockResolvedValue(mockCert);
      mockRepo.createAuditLog.mockResolvedValue({});

      const result = await service.generateCertificate(mockUserId, { recordId: mockRecordId });
      expect(result.id).toBe('cert-1');
      expect(result.verificationStatus).toBe('VERIFIED');
      expect(mockQrService.generateQr).toHaveBeenCalledWith(mockUserId, expect.objectContaining({
        entityId: mockRecordId,
      }));
    });
  });
});

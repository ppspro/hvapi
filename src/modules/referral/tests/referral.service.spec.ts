import { Test, TestingModule } from '@nestjs/testing';
import { ReferralService } from '../application/use-cases/referral.service';
import { NotFoundException } from '@nestjs/common';
import { Logger } from 'nestjs-pino';

const mockUserId = 'doctor-uuid-1';

const mockRepo = {
  createReferral: jest.fn(),
  findReferrals: jest.fn(),
  findReferralById: jest.fn(),
  findReferralByNumber: jest.fn(),
  updateReferralStatus: jest.fn(),
  triageReferral: jest.fn(),
  addNote: jest.fn(),
  findNotes: jest.fn(),
  addAttachment: jest.fn(),
  findAttachments: jest.fn(),
  findStatusHistory: jest.fn(),
  getDashboardStats: jest.fn(),
  softDeleteReferral: jest.fn(),
};

const mockLogger = { log: jest.fn(), error: jest.fn(), warn: jest.fn() };

describe('ReferralService (Milestone 6)', () => {
  let service: ReferralService;

  beforeEach(async () => {
    jest.clearAllMocks();
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ReferralService,
        { provide: 'IReferralRepository', useValue: mockRepo },
        { provide: Logger, useValue: mockLogger },
      ],
    }).compile();

    service = module.get<ReferralService>(ReferralService);
  });

  describe('Referral Lifecycle', () => {
    it('should create patient referral', async () => {
      const mockRef = {
        id: 'ref-1',
        referralNumber: 'REF-2026-00001',
        patientId: 'patient-1',
        referringDoctorId: mockUserId,
        referringFacilityId: 'facility-1',
        receivingFacilityId: 'facility-2',
        referralType: 'SPECIALIST_CONSULTATION',
        priority: 'URGENT',
        status: 'SUBMITTED',
        reasonForReferral: 'Cardiology evaluation',
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      mockRepo.createReferral.mockResolvedValue(mockRef);

      const res = await service.createReferral(mockUserId, {
        patientId: 'patient-1',
        receivingFacilityId: 'facility-2',
        reasonForReferral: 'Cardiology evaluation',
        priority: 'URGENT',
      });

      expect(res.id).toBe('ref-1');
      expect(res.referralNumber).toBe('REF-2026-00001');
    });

    it('should triage referral to ACCEPTED status', async () => {
      const mockRef = {
        id: 'ref-1',
        status: 'ACCEPTED',
        acceptedAt: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      mockRepo.triageReferral.mockResolvedValue(mockRef);

      const res = await service.triageReferral('ref-1', mockUserId, {
        outcome: 'APPROVED',
        reason: 'Accepted by cardiology specialist',
      });

      expect(res.status).toBe('ACCEPTED');
    });
  });

  describe('Clinical Coordination Notes & Attachments', () => {
    it('should add clinical note to referral', async () => {
      mockRepo.findReferralById.mockResolvedValue({ id: 'ref-1' });
      mockRepo.addNote.mockResolvedValue({
        id: 'note-1',
        referralId: 'ref-1',
        authorId: mockUserId,
        authorRole: 'DOCTOR',
        noteText: 'Reviewed ECG prior to intake',
        isPrivate: false,
        createdAt: new Date(),
      });

      const res = await service.addNote('ref-1', mockUserId, 'DOCTOR', {
        noteText: 'Reviewed ECG prior to intake',
      });

      expect(res.id).toBe('note-1');
      expect(res.noteText).toBe('Reviewed ECG prior to intake');
    });
  });
});

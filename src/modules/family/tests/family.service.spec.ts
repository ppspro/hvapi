import { Test, TestingModule } from '@nestjs/testing';
import { FamilyService } from '../application/use-cases/family.service';
import { NotFoundException, BadRequestException, ForbiddenException } from '@nestjs/common';

const mockProfileId = 'profile-uuid-1';
const mockUserId = 'user-uuid-1';
const mockMemberId = 'member-uuid-1';
const mockConsentId = 'consent-uuid-1';
const mockInvitationId = 'inv-uuid-1';

const mockRepo = {
  findProfileByUserId: jest.fn(),
  createInvitation: jest.fn(),
  findInvitationById: jest.fn(),
  findInvitationByToken: jest.fn(),
  findInvitationsByProfile: jest.fn(),
  updateInvitation: jest.fn(),
  deleteInvitation: jest.fn(),
  createFamilyMember: jest.fn(),
  findFamilyMemberById: jest.fn(),
  findFamilyMembersByProfile: jest.fn(),
  findGuardiansByProfile: jest.fn(),
  findDependentsByProfile: jest.fn(),
  updateFamilyMember: jest.fn(),
  deleteFamilyMember: jest.fn(),
  createConsentRecord: jest.fn(),
  findConsentRecordById: jest.fn(),
  findConsentsByProfile: jest.fn(),
  findConsentsByMember: jest.fn(),
  updateConsentRecord: jest.fn(),
  createConsentHistory: jest.fn(),
  findConsentHistory: jest.fn(),
  findAllConsentHistoryByProfile: jest.fn(),
};

describe('FamilyService', () => {
  let service: FamilyService;

  beforeEach(async () => {
    jest.clearAllMocks();
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FamilyService,
        { provide: 'IFamilyRepository', useValue: mockRepo },
      ],
    }).compile();
    service = module.get<FamilyService>(FamilyService);
  });

  describe('createInvitation', () => {
    it('should throw if profile not found', async () => {
      mockRepo.findProfileByUserId.mockResolvedValue(null);
      await expect(service.createInvitation(mockUserId, {
        inviteePhone: '+923001234567',
        relationship: 'Spouse',
      })).rejects.toThrow(NotFoundException);
    });

    it('should throw if duplicate pending invitation exists', async () => {
      mockRepo.findProfileByUserId.mockResolvedValue({ id: mockProfileId });
      mockRepo.findInvitationsByProfile.mockResolvedValue([{
        inviteePhone: '+923001234567',
        status: 'PENDING',
        id: 'existing-inv',
      }]);
      await expect(service.createInvitation(mockUserId, {
        inviteePhone: '+923001234567',
        relationship: 'Spouse',
      })).rejects.toThrow(BadRequestException);
    });

    it('should create invitation successfully', async () => {
      mockRepo.findProfileByUserId.mockResolvedValue({ id: mockProfileId });
      mockRepo.findInvitationsByProfile.mockResolvedValue([]);
      const mockInv = {
        id: mockInvitationId,
        inviteePhone: '+923001234567',
        inviteeName: null,
        relationship: 'Spouse',
        relationshipType: 'SPOUSE',
        status: 'PENDING',
        invitationToken: 'token-uuid',
        resendCount: 0,
        expiresAt: new Date(),
        acceptedAt: null,
        rejectedAt: null,
        cancelledAt: null,
        createdAt: new Date(),
      };
      mockRepo.createInvitation.mockResolvedValue(mockInv);
      const result = await service.createInvitation(mockUserId, {
        inviteePhone: '+923001234567',
        relationship: 'Spouse',
      });
      expect(result.id).toBe(mockInvitationId);
      expect(result.status).toBe('PENDING');
    });
  });

  describe('resendInvitation', () => {
    it('should throw if invitation not found', async () => {
      mockRepo.findProfileByUserId.mockResolvedValue({ id: mockProfileId });
      mockRepo.findInvitationById.mockResolvedValue(null);
      await expect(service.resendInvitation(mockUserId, mockInvitationId)).rejects.toThrow(NotFoundException);
    });

    it('should throw if invitation not owned by patient', async () => {
      mockRepo.findProfileByUserId.mockResolvedValue({ id: mockProfileId });
      mockRepo.findInvitationById.mockResolvedValue({
        id: mockInvitationId, patientProfileId: 'other-profile', status: 'PENDING', resendCount: 0,
      });
      await expect(service.resendInvitation(mockUserId, mockInvitationId)).rejects.toThrow(ForbiddenException);
    });

    it('should throw if max resend count reached', async () => {
      mockRepo.findProfileByUserId.mockResolvedValue({ id: mockProfileId });
      mockRepo.findInvitationById.mockResolvedValue({
        id: mockInvitationId, patientProfileId: mockProfileId, status: 'PENDING', resendCount: 5,
      });
      await expect(service.resendInvitation(mockUserId, mockInvitationId)).rejects.toThrow(BadRequestException);
    });
  });

  describe('grantConsent', () => {
    it('should throw if family member not found', async () => {
      mockRepo.findProfileByUserId.mockResolvedValue({ id: mockProfileId });
      mockRepo.findFamilyMemberById.mockResolvedValue(null);
      await expect(service.grantConsent(mockUserId, {
        familyMemberId: mockMemberId,
        category: 'MEDICAL_RECORDS' as any,
      })).rejects.toThrow(NotFoundException);
    });

    it('should throw if member belongs to another patient', async () => {
      mockRepo.findProfileByUserId.mockResolvedValue({ id: mockProfileId });
      mockRepo.findFamilyMemberById.mockResolvedValue({ id: mockMemberId, patientProfileId: 'other-profile' });
      await expect(service.grantConsent(mockUserId, {
        familyMemberId: mockMemberId,
        category: 'MEDICAL_RECORDS' as any,
      })).rejects.toThrow(ForbiddenException);
    });

    it('should throw on duplicate active consent for same category', async () => {
      mockRepo.findProfileByUserId.mockResolvedValue({ id: mockProfileId });
      mockRepo.findFamilyMemberById.mockResolvedValue({ id: mockMemberId, patientProfileId: mockProfileId });
      mockRepo.findConsentsByMember.mockResolvedValue([{ category: 'MEDICAL_RECORDS', isActive: true }]);
      await expect(service.grantConsent(mockUserId, {
        familyMemberId: mockMemberId,
        category: 'MEDICAL_RECORDS' as any,
      })).rejects.toThrow(BadRequestException);
    });

    it('should grant consent and log history', async () => {
      mockRepo.findProfileByUserId.mockResolvedValue({ id: mockProfileId });
      mockRepo.findFamilyMemberById.mockResolvedValue({ id: mockMemberId, patientProfileId: mockProfileId });
      mockRepo.findConsentsByMember.mockResolvedValue([]);
      const mockRecord = {
        id: mockConsentId, patientProfileId: mockProfileId, familyMemberId: mockMemberId,
        category: 'MEDICAL_RECORDS', isActive: true,
        grantedAt: new Date(), revokedAt: null, expiresAt: null, notes: null, createdAt: new Date(), updatedAt: new Date(),
      };
      mockRepo.createConsentRecord.mockResolvedValue(mockRecord);
      mockRepo.createConsentHistory.mockResolvedValue({});
      const result = await service.grantConsent(mockUserId, {
        familyMemberId: mockMemberId,
        category: 'MEDICAL_RECORDS' as any,
      });
      expect(result.isActive).toBe(true);
      expect(result.category).toBe('MEDICAL_RECORDS');
      expect(mockRepo.createConsentHistory).toHaveBeenCalledWith(mockConsentId, 'GRANTED', mockUserId);
    });
  });

  describe('revokeConsent', () => {
    it('should throw if consent already revoked', async () => {
      mockRepo.findProfileByUserId.mockResolvedValue({ id: mockProfileId });
      mockRepo.findConsentRecordById.mockResolvedValue({
        id: mockConsentId, patientProfileId: mockProfileId, isActive: false,
      });
      await expect(service.revokeConsent(mockUserId, mockConsentId)).rejects.toThrow(BadRequestException);
    });

    it('should revoke consent and log history', async () => {
      mockRepo.findProfileByUserId.mockResolvedValue({ id: mockProfileId });
      mockRepo.findConsentRecordById.mockResolvedValue({
        id: mockConsentId, patientProfileId: mockProfileId, isActive: true,
      });
      mockRepo.updateConsentRecord.mockResolvedValue({});
      mockRepo.createConsentHistory.mockResolvedValue({});
      const result = await service.revokeConsent(mockUserId, mockConsentId);
      expect(result.message).toContain('revoked');
      expect(mockRepo.createConsentHistory).toHaveBeenCalledWith(mockConsentId, 'REVOKED', mockUserId, expect.any(String));
    });
  });

  describe('createGuardian', () => {
    it('should create guardian with isGuardian flag set to true', async () => {
      mockRepo.findProfileByUserId.mockResolvedValue({ id: mockProfileId });
      const mockMember = {
        id: mockMemberId, fullName: 'Ahmed Ali', relationship: 'Father', relationshipType: 'GUARDIAN',
        phone: '+923001234567', status: 'ACTIVE', isPrimary: false, isGuardian: true,
        isDependent: false, isCaregiver: false, verificationStatus: 'UNVERIFIED',
        notes: null, createdAt: new Date(), updatedAt: new Date(),
      };
      mockRepo.createFamilyMember.mockResolvedValue(mockMember);
      const result = await service.createGuardian(mockUserId, {
        fullName: 'Ahmed Ali', phone: '+923001234567',
        relationshipType: 'GUARDIAN' as any, relationship: 'Father',
      });
      expect(result.isGuardian).toBe(true);
    });
  });

  describe('createDependent', () => {
    it('should create dependent with isDependent flag set to true', async () => {
      mockRepo.findProfileByUserId.mockResolvedValue({ id: mockProfileId });
      const mockMember = {
        id: mockMemberId, fullName: 'Sara Ali', relationship: 'Daughter', relationshipType: 'CHILD',
        phone: '+923001234568', status: 'ACTIVE', isPrimary: false, isGuardian: false,
        isDependent: true, isCaregiver: false, verificationStatus: 'UNVERIFIED',
        notes: null, createdAt: new Date(), updatedAt: new Date(),
      };
      mockRepo.createFamilyMember.mockResolvedValue(mockMember);
      const result = await service.createDependent(mockUserId, {
        fullName: 'Sara Ali', phone: '+923001234568',
        relationshipType: 'CHILD' as any, relationship: 'Daughter',
      });
      expect(result.isDependent).toBe(true);
    });
  });
});

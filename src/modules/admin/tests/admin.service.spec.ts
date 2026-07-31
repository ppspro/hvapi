import { Test, TestingModule } from '@nestjs/testing';
import { AdminService } from '../application/use-cases/admin.service';
import { NotFoundException } from '@nestjs/common';
import { Logger } from 'nestjs-pino';

const mockAdminUserId = 'admin-user-uuid-1';

const mockRepo = {
  getDashboardSummary: jest.fn(),
  findUsers: jest.fn(),
  findUserById: jest.fn(),
  updateUserStatus: jest.fn(),
  assignUserRoles: jest.fn(),
  softDeleteUser: jest.fn(),
  restoreUser: jest.fn(),
  findRoles: jest.fn(),
  findPermissions: jest.fn(),
  findPermissionGroups: jest.fn(),
  createPermissionGroup: jest.fn(),
  createPermission: jest.fn(),
  assignPermissionsToRole: jest.fn(),
  getPermissionMatrix: jest.fn(),
  createOrganization: jest.fn(),
  findOrganizations: jest.fn(),
  findOrganizationById: jest.fn(),
  updateOrganization: jest.fn(),
  softDeleteOrganization: jest.fn(),
  getSettings: jest.fn(),
  upsertSetting: jest.fn(),
  findAuditLogs: jest.fn(),
  createAuditLog: jest.fn(),
};

const mockLogger = { log: jest.fn(), error: jest.fn(), warn: jest.fn() };

describe('AdminService (Phase 17)', () => {
  let service: AdminService;

  beforeEach(async () => {
    jest.clearAllMocks();
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AdminService,
        { provide: 'IAdminRepository', useValue: mockRepo },
        { provide: Logger, useValue: mockLogger },
      ],
    }).compile();

    service = module.get<AdminService>(AdminService);
  });

  describe('getDashboardSummary', () => {
    it('should return aggregated platform metrics', async () => {
      mockRepo.getDashboardSummary.mockResolvedValue({
        totalPatients: 150,
        totalDoctors: 25,
        totalFacilities: 10,
        totalStaff: 40,
        totalHealthCards: 120,
        totalInsurancePolicies: 80,
        totalImmunisationRecords: 200,
        totalActiveSchedules: 15,
        recentActivities: [],
        growthMetrics: { newPatientsThisMonth: 12, newDoctorsThisMonth: 3, newFacilitiesThisMonth: 1 },
      });

      const summary = await service.getDashboardSummary();
      expect(summary.totalPatients).toBe(150);
      expect(summary.totalFacilities).toBe(10);
      expect(summary.growthMetrics.newPatientsThisMonth).toBe(12);
    });
  });

  describe('user administration', () => {
    it('should lock user status to BLOCKED and record audit log', async () => {
      mockRepo.findUserById.mockResolvedValue({ id: 'user-1', status: 'ACTIVE', roles: ['PATIENT'], createdAt: new Date(), updatedAt: new Date() });
      mockRepo.updateUserStatus.mockResolvedValue({ id: 'user-1', status: 'BLOCKED', roles: ['PATIENT'], createdAt: new Date(), updatedAt: new Date() });
      mockRepo.createAuditLog.mockResolvedValue({});

      const updated = await service.updateUserStatus('user-1', { status: 'BLOCKED' }, mockAdminUserId);
      expect(updated.status).toBe('BLOCKED');
      expect(mockRepo.createAuditLog).toHaveBeenCalled();
    });

    it('should throw NotFoundException for invalid user ID', async () => {
      mockRepo.findUserById.mockResolvedValue(null);
      await expect(service.getUserById('non-existent')).rejects.toThrow(NotFoundException);
    });
  });

  describe('organization management', () => {
    it('should create an organization profile', async () => {
      const mockOrg = {
        id: 'org-1',
        name: 'Health Vault Network',
        code: 'ORG-360-100',
        country: 'Pakistan',
        timezone: 'Asia/Karachi',
        language: 'en',
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      mockRepo.createOrganization.mockResolvedValue(mockOrg);
      mockRepo.createAuditLog.mockResolvedValue({});

      const res = await service.createOrganization({ name: 'Health Vault Network' }, mockAdminUserId);
      expect(res.id).toBe('org-1');
      expect(res.code).toBe('ORG-360-100');
    });
  });

  describe('platform configuration', () => {
    it('should upsert platform settings and log action', async () => {
      const mockSetting = {
        id: 'setting-1',
        category: 'SECURITY',
        key: 'JWT_EXPIRATION',
        value: '86400',
        valueType: 'NUMBER',
        isPublic: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      mockRepo.upsertSetting.mockResolvedValue(mockSetting);
      mockRepo.createAuditLog.mockResolvedValue({});

      const res = await service.upsertSetting({ key: 'JWT_EXPIRATION', value: '86400', category: 'SECURITY' }, mockAdminUserId);
      expect(res.key).toBe('JWT_EXPIRATION');
      expect(res.value).toBe('86400');
    });
  });
});

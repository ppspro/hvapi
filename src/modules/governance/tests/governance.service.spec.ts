import { Test, TestingModule } from '@nestjs/testing';
import { GovernanceService } from '../application/use-cases/governance.service';
import { NotFoundException, ConflictException } from '@nestjs/common';
import { Logger } from 'nestjs-pino';

const mockUserId = 'user-uuid-1';

const mockRepo = {
  createConfiguration: jest.fn(),
  findConfigurations: jest.fn(),
  findConfigurationByKey: jest.fn(),
  findConfigurationById: jest.fn(),
  updateConfiguration: jest.fn(),
  softDeleteConfiguration: jest.fn(),
  bulkUpsertConfigurations: jest.fn(),
  createFeatureFlag: jest.fn(),
  findFeatureFlags: jest.fn(),
  findFeatureFlagByCode: jest.fn(),
  findFeatureFlagById: jest.fn(),
  updateFeatureFlag: jest.fn(),
  softDeleteFeatureFlag: jest.fn(),
  createMasterCategory: jest.fn(),
  findMasterCategories: jest.fn(),
  findMasterCategoryByCode: jest.fn(),
  findMasterCategoryById: jest.fn(),
  createMasterItem: jest.fn(),
  findMasterItems: jest.fn(),
  findMasterItemById: jest.fn(),
  updateMasterItem: jest.fn(),
  softDeleteMasterItem: jest.fn(),
  countActiveItemsInCategory: jest.fn(),
  createPolicy: jest.fn(),
  findPolicies: jest.fn(),
  findPolicyByCode: jest.fn(),
  findPolicyById: jest.fn(),
  updatePolicy: jest.fn(),
  softDeletePolicy: jest.fn(),
  getMaintenanceConfig: jest.fn(),
  updateMaintenanceConfig: jest.fn(),
  createAuditLog: jest.fn(),
  findAuditLogs: jest.fn(),
  findAuditLogById: jest.fn(),
  getGovernanceDashboardData: jest.fn(),
};

const mockLogger = { log: jest.fn(), error: jest.fn(), warn: jest.fn() };

describe('GovernanceService (Phase 20)', () => {
  let service: GovernanceService;

  beforeEach(async () => {
    jest.clearAllMocks();
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GovernanceService,
        { provide: 'IGovernanceRepository', useValue: mockRepo },
        { provide: Logger, useValue: mockLogger },
      ],
    }).compile();

    service = module.get<GovernanceService>(GovernanceService);
  });

  describe('System Configurations', () => {
    it('should throw ConflictException if key already exists', async () => {
      mockRepo.findConfigurationByKey.mockResolvedValue({ id: 'cfg-1', key: 'SYS_KEY' });

      await expect(service.createConfiguration(mockUserId, {
        key: 'SYS_KEY',
        value: 'val',
      })).rejects.toThrow(ConflictException);
    });

    it('should mask encrypted configuration value', async () => {
      mockRepo.findConfigurationByKey.mockResolvedValue(null);
      const mockCreated = {
        id: 'cfg-1',
        category: 'SECURITY',
        key: 'DB_SECRET',
        value: 'super-secret',
        valueType: 'STRING',
        isEncrypted: true,
        isEditable: true,
        version: 1,
        status: 'ACTIVE',
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      mockRepo.createConfiguration.mockResolvedValue(mockCreated);
      mockRepo.createAuditLog.mockResolvedValue({});

      const res = await service.createConfiguration(mockUserId, {
        key: 'DB_SECRET',
        value: 'super-secret',
        isEncrypted: true,
      });

      expect(res.value).toBe('********');
      expect(mockRepo.createAuditLog).toHaveBeenCalled();
    });
  });

  describe('Feature Flags', () => {
    it('should create feature flag and log audit', async () => {
      mockRepo.findFeatureFlagByCode.mockResolvedValue(null);
      const mockFlag = {
        id: 'flag-1',
        code: 'FF_OCR',
        name: 'OCR Flag',
        status: 'BETA',
        enabledForRoles: ['ADMIN'],
        enabledForModules: ['ai-ocr'],
        rolloutPercentage: 50,
        version: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      mockRepo.createFeatureFlag.mockResolvedValue(mockFlag);
      mockRepo.createAuditLog.mockResolvedValue({});

      const res = await service.createFeatureFlag(mockUserId, {
        code: 'FF_OCR',
        name: 'OCR Flag',
        status: 'BETA',
      });

      expect(res.id).toBe('flag-1');
      expect(res.rolloutPercentage).toBe(50);
      expect(mockRepo.createAuditLog).toHaveBeenCalled();
    });
  });

  describe('Maintenance Mode', () => {
    it('should update maintenance configuration', async () => {
      const mockMaint = {
        id: 'maint-1',
        mode: 'FULL',
        message: 'Upgrade in progress',
        allowAdminAccess: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      mockRepo.updateMaintenanceConfig.mockResolvedValue(mockMaint);
      mockRepo.createAuditLog.mockResolvedValue({});

      const res = await service.updateMaintenanceConfig({ mode: 'FULL', message: 'Upgrade in progress' }, mockUserId);
      expect(res.mode).toBe('FULL');
      expect(mockRepo.createAuditLog).toHaveBeenCalled();
    });
  });

  describe('Governance Dashboard', () => {
    it('should return dashboard summary data', async () => {
      mockRepo.getGovernanceDashboardData.mockResolvedValue({
        totalConfigurations: 25,
        activeFeatureFlags: 8,
        masterDataCategoriesCount: 12,
        masterDataItemsCount: 85,
        activePoliciesCount: 5,
        maintenanceMode: 'OFF',
        recentAuditLogsCount: 120,
      });

      const res = await service.getDashboardSummary();
      expect(res.totalConfigurations).toBe(25);
      expect(res.activeFeatureFlags).toBe(8);
    });
  });
});

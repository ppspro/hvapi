import { Injectable } from '@nestjs/common';
import { DatabaseService } from '@database/database.service';
import { IGovernanceRepository } from '../../domain/repositories/governance.repository.interface';
import {
  SystemConfigurationEntity, FeatureFlagEntity, MasterDataCategoryEntity,
  MasterDataItemEntity, PlatformGovernancePolicyEntity, MaintenanceConfigurationEntity,
  GovernanceAuditLogEntity,
} from '../../domain/entities/governance.entity';

@Injectable()
export class GovernanceRepository implements IGovernanceRepository {
  constructor(private readonly db: DatabaseService) {}

  // ─── System Configurations ───────────────────────────────────────────────

  async createConfiguration(data: any): Promise<SystemConfigurationEntity> {
    const created = await this.db.systemConfiguration.create({
      data: {
        category: (data.category as any) || 'GENERAL',
        key: data.key,
        value: data.value,
        valueType: data.valueType || 'STRING',
        description: data.description || null,
        isEncrypted: data.isEncrypted ?? false,
        isEditable: data.isEditable ?? true,
        createdBy: data.createdBy || null,
      },
      include: { versions: true },
    });

    // Record initial version
    await this.db.configurationVersion.create({
      data: {
        configurationId: created.id,
        version: 1,
        previousValue: null,
        newValue: data.isEncrypted ? '********' : data.value,
        changedBy: data.createdBy || null,
        changeReason: 'Initial Configuration Creation',
      },
    });

    return created as unknown as SystemConfigurationEntity;
  }

  async findConfigurations(category?: string): Promise<SystemConfigurationEntity[]> {
    return (await this.db.systemConfiguration.findMany({
      where: {
        isDeleted: false,
        ...(category ? { category: category as any } : {}),
      },
      include: { versions: { orderBy: { version: 'desc' } } },
      orderBy: { key: 'asc' },
    })) as unknown as SystemConfigurationEntity[];
  }

  async findConfigurationByKey(key: string): Promise<SystemConfigurationEntity | null> {
    return (await this.db.systemConfiguration.findFirst({
      where: { key, isDeleted: false },
      include: { versions: { orderBy: { version: 'desc' } } },
    })) as unknown as SystemConfigurationEntity | null;
  }

  async findConfigurationById(id: string): Promise<SystemConfigurationEntity | null> {
    return (await this.db.systemConfiguration.findFirst({
      where: { id, isDeleted: false },
      include: { versions: { orderBy: { version: 'desc' } } },
    })) as unknown as SystemConfigurationEntity | null;
  }

  async updateConfiguration(id: string, data: any, changeReason?: string): Promise<SystemConfigurationEntity> {
    const existing = await this.db.systemConfiguration.findUnique({ where: { id } });
    const newVersionNumber = (existing?.version || 1) + 1;

    const updated = await this.db.systemConfiguration.update({
      where: { id },
      data: {
        value: data.value !== undefined ? data.value : undefined,
        category: data.category as any || undefined,
        valueType: data.valueType || undefined,
        description: data.description || undefined,
        isEncrypted: data.isEncrypted ?? undefined,
        version: newVersionNumber,
        updatedBy: data.updatedBy || undefined,
      },
      include: { versions: { orderBy: { version: 'desc' } } },
    });

    if (data.value !== undefined && data.value !== existing?.value) {
      await this.db.configurationVersion.create({
        data: {
          configurationId: id,
          version: newVersionNumber,
          previousValue: existing?.isEncrypted ? '********' : existing?.value,
          newValue: data.isEncrypted || existing?.isEncrypted ? '********' : data.value,
          changedBy: data.updatedBy || null,
          changeReason: changeReason || 'Configuration Value Updated',
        },
      });
    }

    return updated as unknown as SystemConfigurationEntity;
  }

  async softDeleteConfiguration(id: string): Promise<void> {
    await this.db.systemConfiguration.update({
      where: { id },
      data: { isDeleted: true, deletedAt: new Date() },
    });
  }

  async bulkUpsertConfigurations(configs: any[], userId?: string): Promise<number> {
    let count = 0;
    for (const c of configs) {
      const existing = await this.findConfigurationByKey(c.key);
      if (existing) {
        await this.updateConfiguration(existing.id, { ...c, updatedBy: userId }, 'Bulk Import Update');
      } else {
        await this.createConfiguration({ ...c, createdBy: userId });
      }
      count++;
    }
    return count;
  }

  // ─── Feature Flags ───────────────────────────────────────────────────────

  async createFeatureFlag(data: any): Promise<FeatureFlagEntity> {
    return (await this.db.featureFlag.create({
      data: {
        code: data.code,
        name: data.name,
        description: data.description || null,
        status: (data.status as any) || 'DISABLED',
        enabledForRoles: data.enabledForRoles || [],
        enabledForModules: data.enabledForModules || [],
        rolloutPercentage: data.rolloutPercentage ?? 100,
      },
    })) as unknown as FeatureFlagEntity;
  }

  async findFeatureFlags(): Promise<FeatureFlagEntity[]> {
    return (await this.db.featureFlag.findMany({
      where: { isDeleted: false },
      orderBy: { code: 'asc' },
    })) as unknown as FeatureFlagEntity[];
  }

  async findFeatureFlagByCode(code: string): Promise<FeatureFlagEntity | null> {
    return (await this.db.featureFlag.findFirst({
      where: { code, isDeleted: false },
    })) as unknown as FeatureFlagEntity | null;
  }

  async findFeatureFlagById(id: string): Promise<FeatureFlagEntity | null> {
    return (await this.db.featureFlag.findFirst({
      where: { id, isDeleted: false },
    })) as unknown as FeatureFlagEntity | null;
  }

  async updateFeatureFlag(id: string, data: any): Promise<FeatureFlagEntity> {
    const existing = await this.db.featureFlag.findUnique({ where: { id } });
    return (await this.db.featureFlag.update({
      where: { id },
      data: {
        name: data.name || undefined,
        description: data.description || undefined,
        status: data.status as any || undefined,
        enabledForRoles: data.enabledForRoles || undefined,
        enabledForModules: data.enabledForModules || undefined,
        rolloutPercentage: data.rolloutPercentage ?? undefined,
        version: (existing?.version || 1) + 1,
      },
    })) as unknown as FeatureFlagEntity;
  }

  async softDeleteFeatureFlag(id: string): Promise<void> {
    await this.db.featureFlag.update({
      where: { id },
      data: { isDeleted: true, deletedAt: new Date() },
    });
  }

  // ─── Master Data ─────────────────────────────────────────────────────────

  async createMasterCategory(data: any): Promise<MasterDataCategoryEntity> {
    return (await this.db.masterDataCategory.create({
      data: {
        code: data.code,
        name: data.name,
        description: data.description || null,
        status: (data.status as any) || 'ACTIVE',
      },
      include: { items: true },
    })) as unknown as MasterDataCategoryEntity;
  }

  async findMasterCategories(): Promise<MasterDataCategoryEntity[]> {
    return (await this.db.masterDataCategory.findMany({
      where: { isDeleted: false },
      include: { items: { where: { isDeleted: false }, orderBy: { sortOrder: 'asc' } } },
      orderBy: { name: 'asc' },
    })) as unknown as MasterDataCategoryEntity[];
  }

  async findMasterCategoryByCode(code: string): Promise<MasterDataCategoryEntity | null> {
    return (await this.db.masterDataCategory.findFirst({
      where: { code, isDeleted: false },
      include: { items: { where: { isDeleted: false }, orderBy: { sortOrder: 'asc' } } },
    })) as unknown as MasterDataCategoryEntity | null;
  }

  async findMasterCategoryById(id: string): Promise<MasterDataCategoryEntity | null> {
    return (await this.db.masterDataCategory.findFirst({
      where: { id, isDeleted: false },
      include: { items: { where: { isDeleted: false }, orderBy: { sortOrder: 'asc' } } },
    })) as unknown as MasterDataCategoryEntity | null;
  }

  async createMasterItem(data: any): Promise<MasterDataItemEntity> {
    return (await this.db.masterDataItem.create({
      data: {
        categoryId: data.categoryId,
        code: data.code,
        name: data.name,
        description: data.description || null,
        sortOrder: data.sortOrder ?? 0,
        isDefault: data.isDefault ?? false,
        status: (data.status as any) || 'ACTIVE',
      },
    })) as unknown as MasterDataItemEntity;
  }

  async findMasterItems(categoryId?: string): Promise<MasterDataItemEntity[]> {
    return (await this.db.masterDataItem.findMany({
      where: {
        isDeleted: false,
        ...(categoryId ? { categoryId } : {}),
      },
      orderBy: [{ sortOrder: 'asc' }, { name: 'asc' }],
    })) as unknown as MasterDataItemEntity[];
  }

  async findMasterItemById(id: string): Promise<MasterDataItemEntity | null> {
    return (await this.db.masterDataItem.findFirst({
      where: { id, isDeleted: false },
    })) as unknown as MasterDataItemEntity | null;
  }

  async updateMasterItem(id: string, data: any): Promise<MasterDataItemEntity> {
    return (await this.db.masterDataItem.update({
      where: { id },
      data: {
        name: data.name || undefined,
        description: data.description || undefined,
        sortOrder: data.sortOrder ?? undefined,
        isDefault: data.isDefault ?? undefined,
        status: data.status as any || undefined,
      },
    })) as unknown as MasterDataItemEntity;
  }

  async softDeleteMasterItem(id: string): Promise<void> {
    await this.db.masterDataItem.update({
      where: { id },
      data: { isDeleted: true, deletedAt: new Date() },
    });
  }

  async countActiveItemsInCategory(categoryId: string): Promise<number> {
    return this.db.masterDataItem.count({
      where: { categoryId, isDeleted: false, status: 'ACTIVE' },
    });
  }

  // ─── Platform Governance Policies ────────────────────────────────────────

  async createPolicy(data: any): Promise<PlatformGovernancePolicyEntity> {
    return (await this.db.platformGovernancePolicy.create({
      data: {
        code: data.code,
        title: data.title,
        description: data.description || null,
        content: data.content,
        version: data.version || '1.0',
        effectiveDate: data.effectiveDate ? new Date(data.effectiveDate) : null,
        status: (data.status as any) || 'ACTIVE',
      },
    })) as unknown as PlatformGovernancePolicyEntity;
  }

  async findPolicies(): Promise<PlatformGovernancePolicyEntity[]> {
    return (await this.db.platformGovernancePolicy.findMany({
      where: { isDeleted: false },
      orderBy: { createdAt: 'desc' },
    })) as unknown as PlatformGovernancePolicyEntity[];
  }

  async findPolicyByCode(code: string): Promise<PlatformGovernancePolicyEntity | null> {
    return (await this.db.platformGovernancePolicy.findFirst({
      where: { code, isDeleted: false },
    })) as unknown as PlatformGovernancePolicyEntity | null;
  }

  async findPolicyById(id: string): Promise<PlatformGovernancePolicyEntity | null> {
    return (await this.db.platformGovernancePolicy.findFirst({
      where: { id, isDeleted: false },
    })) as unknown as PlatformGovernancePolicyEntity | null;
  }

  async updatePolicy(id: string, data: any): Promise<PlatformGovernancePolicyEntity> {
    return (await this.db.platformGovernancePolicy.update({
      where: { id },
      data: {
        title: data.title || undefined,
        description: data.description || undefined,
        content: data.content || undefined,
        version: data.version || undefined,
        effectiveDate: data.effectiveDate ? new Date(data.effectiveDate) : undefined,
        status: data.status as any || undefined,
      },
    })) as unknown as PlatformGovernancePolicyEntity;
  }

  async softDeletePolicy(id: string): Promise<void> {
    await this.db.platformGovernancePolicy.update({
      where: { id },
      data: { isDeleted: true, deletedAt: new Date() },
    });
  }

  // ─── Maintenance Configuration ──────────────────────────────────────────

  async getMaintenanceConfig(): Promise<MaintenanceConfigurationEntity | null> {
    return (await this.db.maintenanceConfiguration.findFirst({
      orderBy: { createdAt: 'desc' },
    })) as unknown as MaintenanceConfigurationEntity | null;
  }

  async updateMaintenanceConfig(data: any): Promise<MaintenanceConfigurationEntity> {
    const existing = await this.getMaintenanceConfig();
    if (existing) {
      return (await this.db.maintenanceConfiguration.update({
        where: { id: existing.id },
        data: {
          mode: (data.mode as any) || undefined,
          message: data.message || undefined,
          startsAt: data.startsAt ? new Date(data.startsAt) : undefined,
          endsAt: data.endsAt ? new Date(data.endsAt) : undefined,
          allowAdminAccess: data.allowAdminAccess ?? undefined,
        },
      })) as unknown as MaintenanceConfigurationEntity;
    }

    return (await this.db.maintenanceConfiguration.create({
      data: {
        mode: (data.mode as any) || 'OFF',
        message: data.message || null,
        startsAt: data.startsAt ? new Date(data.startsAt) : null,
        endsAt: data.endsAt ? new Date(data.endsAt) : null,
        allowAdminAccess: data.allowAdminAccess ?? true,
      },
    })) as unknown as MaintenanceConfigurationEntity;
  }

  // ─── Audit Logs ──────────────────────────────────────────────────────────

  async createAuditLog(data: {
    entityType: string;
    entityId: string;
    action: string;
    performedBy?: string;
    oldValue?: string;
    newValue?: string;
    metadata?: any;
  }): Promise<GovernanceAuditLogEntity> {
    return (await this.db.governanceAuditLog.create({
      data: {
        entityType: data.entityType,
        entityId: data.entityId,
        action: data.action,
        performedBy: data.performedBy || null,
        oldValue: data.oldValue || null,
        newValue: data.newValue || null,
        metadata: data.metadata ? JSON.stringify(data.metadata) : null,
      },
    })) as unknown as GovernanceAuditLogEntity;
  }

  async findAuditLogs(entityType?: string, limit = 100): Promise<GovernanceAuditLogEntity[]> {
    return (await this.db.governanceAuditLog.findMany({
      where: entityType ? { entityType } : {},
      orderBy: { createdAt: 'desc' },
      take: limit,
    })) as unknown as GovernanceAuditLogEntity[];
  }

  async findAuditLogById(id: string): Promise<GovernanceAuditLogEntity | null> {
    return (await this.db.governanceAuditLog.findUnique({
      where: { id },
    })) as unknown as GovernanceAuditLogEntity | null;
  }

  // ─── Governance Dashboard Summary ────────────────────────────────────────

  async getGovernanceDashboardData() {
    const [
      totalConfigurations,
      activeFeatureFlags,
      masterDataCategoriesCount,
      masterDataItemsCount,
      activePoliciesCount,
      maintenanceConfig,
      recentAuditLogsCount,
    ] = await Promise.all([
      this.db.systemConfiguration.count({ where: { isDeleted: false } }),
      this.db.featureFlag.count({ where: { isDeleted: false, status: 'ENABLED' } }),
      this.db.masterDataCategory.count({ where: { isDeleted: false } }),
      this.db.masterDataItem.count({ where: { isDeleted: false } }),
      this.db.platformGovernancePolicy.count({ where: { isDeleted: false, status: 'ACTIVE' } }),
      this.getMaintenanceConfig(),
      this.db.governanceAuditLog.count(),
    ]);

    return {
      totalConfigurations,
      activeFeatureFlags,
      masterDataCategoriesCount,
      masterDataItemsCount,
      activePoliciesCount,
      maintenanceMode: maintenanceConfig?.mode || 'OFF',
      recentAuditLogsCount,
    };
  }
}

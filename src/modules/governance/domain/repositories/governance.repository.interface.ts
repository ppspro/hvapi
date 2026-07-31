import {
  SystemConfigurationEntity, FeatureFlagEntity, MasterDataCategoryEntity,
  MasterDataItemEntity, ConfigurationVersionEntity, PlatformGovernancePolicyEntity,
  MaintenanceConfigurationEntity, GovernanceAuditLogEntity,
} from '../entities/governance.entity';

export interface IGovernanceRepository {
  // System Configurations
  createConfiguration(data: any): Promise<SystemConfigurationEntity>;
  findConfigurations(category?: string): Promise<SystemConfigurationEntity[]>;
  findConfigurationByKey(key: string): Promise<SystemConfigurationEntity | null>;
  findConfigurationById(id: string): Promise<SystemConfigurationEntity | null>;
  updateConfiguration(id: string, data: any, changeReason?: string): Promise<SystemConfigurationEntity>;
  softDeleteConfiguration(id: string): Promise<void>;
  bulkUpsertConfigurations(configs: any[], userId?: string): Promise<number>;

  // Feature Flags
  createFeatureFlag(data: any): Promise<FeatureFlagEntity>;
  findFeatureFlags(): Promise<FeatureFlagEntity[]>;
  findFeatureFlagByCode(code: string): Promise<FeatureFlagEntity | null>;
  findFeatureFlagById(id: string): Promise<FeatureFlagEntity | null>;
  updateFeatureFlag(id: string, data: any): Promise<FeatureFlagEntity>;
  softDeleteFeatureFlag(id: string): Promise<void>;

  // Master Data
  createMasterCategory(data: any): Promise<MasterDataCategoryEntity>;
  findMasterCategories(): Promise<MasterDataCategoryEntity[]>;
  findMasterCategoryByCode(code: string): Promise<MasterDataCategoryEntity | null>;
  findMasterCategoryById(id: string): Promise<MasterDataCategoryEntity | null>;
  createMasterItem(data: any): Promise<MasterDataItemEntity>;
  findMasterItems(categoryId?: string): Promise<MasterDataItemEntity[]>;
  findMasterItemById(id: string): Promise<MasterDataItemEntity | null>;
  updateMasterItem(id: string, data: any): Promise<MasterDataItemEntity>;
  softDeleteMasterItem(id: string): Promise<void>;
  countActiveItemsInCategory(categoryId: string): Promise<number>;

  // Platform Governance Policies
  createPolicy(data: any): Promise<PlatformGovernancePolicyEntity>;
  findPolicies(): Promise<PlatformGovernancePolicyEntity[]>;
  findPolicyByCode(code: string): Promise<PlatformGovernancePolicyEntity | null>;
  findPolicyById(id: string): Promise<PlatformGovernancePolicyEntity | null>;
  updatePolicy(id: string, data: any): Promise<PlatformGovernancePolicyEntity>;
  softDeletePolicy(id: string): Promise<void>;

  // Maintenance Configuration
  getMaintenanceConfig(): Promise<MaintenanceConfigurationEntity | null>;
  updateMaintenanceConfig(data: any): Promise<MaintenanceConfigurationEntity>;

  // Audit Logs
  createAuditLog(data: {
    entityType: string;
    entityId: string;
    action: string;
    performedBy?: string;
    oldValue?: string;
    newValue?: string;
    metadata?: any;
  }): Promise<GovernanceAuditLogEntity>;
  findAuditLogs(entityType?: string, limit?: number): Promise<GovernanceAuditLogEntity[]>;
  findAuditLogById(id: string): Promise<GovernanceAuditLogEntity | null>;

  // Governance Dashboard Summary
  getGovernanceDashboardData(): Promise<{
    totalConfigurations: number;
    activeFeatureFlags: number;
    masterDataCategoriesCount: number;
    masterDataItemsCount: number;
    activePoliciesCount: number;
    maintenanceMode: string;
    recentAuditLogsCount: number;
  }>;
}

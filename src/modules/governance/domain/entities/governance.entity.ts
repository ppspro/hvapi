export class SystemConfigurationEntity {
  id!: string;
  category!: string;
  key!: string;
  value!: string;
  valueType!: string;
  description?: string | null;
  isEncrypted!: boolean;
  isEditable!: boolean;
  version!: number;
  createdBy?: string | null;
  updatedBy?: string | null;
  status!: string;
  isDeleted!: boolean;
  deletedAt?: Date | null;
  createdAt!: Date;
  updatedAt!: Date;
  versions?: ConfigurationVersionEntity[];
}

export class FeatureFlagEntity {
  id!: string;
  code!: string;
  name!: string;
  description?: string | null;
  status!: string;
  enabledForRoles!: string[];
  enabledForModules!: string[];
  rolloutPercentage!: number;
  version!: number;
  isDeleted!: boolean;
  deletedAt?: Date | null;
  createdAt!: Date;
  updatedAt!: Date;
}

export class MasterDataCategoryEntity {
  id!: string;
  code!: string;
  name!: string;
  description?: string | null;
  status!: string;
  isDeleted!: boolean;
  deletedAt?: Date | null;
  createdAt!: Date;
  updatedAt!: Date;
  items?: MasterDataItemEntity[];
}

export class MasterDataItemEntity {
  id!: string;
  categoryId!: string;
  code!: string;
  name!: string;
  description?: string | null;
  sortOrder!: number;
  isDefault!: boolean;
  status!: string;
  isDeleted!: boolean;
  deletedAt?: Date | null;
  createdAt!: Date;
  updatedAt!: Date;
  category?: MasterDataCategoryEntity;
}

export class ConfigurationVersionEntity {
  id!: string;
  configurationId!: string;
  version!: number;
  previousValue?: string | null;
  newValue!: string;
  changedBy?: string | null;
  changeReason?: string | null;
  createdAt!: Date;
}

export class PlatformGovernancePolicyEntity {
  id!: string;
  code!: string;
  title!: string;
  description?: string | null;
  content!: string;
  version!: string;
  effectiveDate?: Date | null;
  status!: string;
  isDeleted!: boolean;
  deletedAt?: Date | null;
  createdAt!: Date;
  updatedAt!: Date;
}

export class MaintenanceConfigurationEntity {
  id!: string;
  mode!: string;
  message?: string | null;
  startsAt?: Date | null;
  endsAt?: Date | null;
  allowAdminAccess!: boolean;
  createdAt!: Date;
  updatedAt!: Date;
}

export class GovernanceAuditLogEntity {
  id!: string;
  entityType!: string;
  entityId!: string;
  action!: string;
  performedBy?: string | null;
  oldValue?: string | null;
  newValue?: string | null;
  metadata?: string | null;
  createdAt!: Date;
}

export declare class ConfigurationVersionResponseDto {
    id: string;
    version: number;
    previousValue?: string;
    newValue: string;
    changedBy?: string;
    changeReason?: string;
    createdAt: string;
}
export declare class SystemConfigurationResponseDto {
    id: string;
    category: string;
    key: string;
    value: string;
    valueType: string;
    description?: string;
    isEncrypted: boolean;
    isEditable: boolean;
    version: number;
    createdBy?: string;
    updatedBy?: string;
    status: string;
    versions: ConfigurationVersionResponseDto[];
    createdAt: string;
    updatedAt: string;
}
export declare class FeatureFlagResponseDto {
    id: string;
    code: string;
    name: string;
    description?: string;
    status: string;
    enabledForRoles: string[];
    enabledForModules: string[];
    rolloutPercentage: number;
    version: number;
    createdAt: string;
    updatedAt: string;
}
export declare class MasterDataItemResponseDto {
    id: string;
    categoryId: string;
    code: string;
    name: string;
    description?: string;
    sortOrder: number;
    isDefault: boolean;
    status: string;
    createdAt: string;
}
export declare class MasterDataCategoryResponseDto {
    id: string;
    code: string;
    name: string;
    description?: string;
    status: string;
    items: MasterDataItemResponseDto[];
    createdAt: string;
}
export declare class PlatformGovernancePolicyResponseDto {
    id: string;
    code: string;
    title: string;
    description?: string;
    content: string;
    version: string;
    effectiveDate?: string;
    status: string;
    createdAt: string;
    updatedAt: string;
}
export declare class MaintenanceConfigurationResponseDto {
    id: string;
    mode: string;
    message?: string;
    startsAt?: string;
    endsAt?: string;
    allowAdminAccess: boolean;
    createdAt: string;
    updatedAt: string;
}
export declare class GovernanceAuditLogResponseDto {
    id: string;
    entityType: string;
    entityId: string;
    action: string;
    performedBy?: string;
    oldValue?: string;
    newValue?: string;
    metadata?: any;
    createdAt: string;
}
export declare class GovernanceDashboardResponseDto {
    totalConfigurations: number;
    activeFeatureFlags: number;
    masterDataCategoriesCount: number;
    masterDataItemsCount: number;
    activePoliciesCount: number;
    maintenanceMode: string;
    recentAuditLogsCount: number;
}

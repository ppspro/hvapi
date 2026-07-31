export declare class CreateConfigurationDto {
    key: string;
    value: string;
    category?: string;
    valueType?: string;
    description?: string;
    isEncrypted?: boolean;
    isEditable?: boolean;
}
export declare class UpdateConfigurationDto {
    value: string;
    changeReason?: string;
}
export declare class ImportConfigurationsDto {
    configurations: CreateConfigurationDto[];
}
export declare class CreateFeatureFlagDto {
    code: string;
    name: string;
    description?: string;
    status?: string;
    enabledForRoles?: string[];
    enabledForModules?: string[];
    rolloutPercentage?: number;
}
export declare class CreateMasterCategoryDto {
    code: string;
    name: string;
    description?: string;
}
export declare class CreateMasterItemDto {
    categoryId: string;
    code: string;
    name: string;
    description?: string;
    sortOrder?: number;
    isDefault?: boolean;
}
export declare class CreatePlatformPolicyDto {
    code: string;
    title: string;
    description?: string;
    content: string;
    version?: string;
    effectiveDate?: string;
}
export declare class UpdateMaintenanceModeDto {
    mode: string;
    message?: string;
    startsAt?: string;
    endsAt?: string;
    allowAdminAccess?: boolean;
}

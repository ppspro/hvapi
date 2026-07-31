export declare class UpdateUserStatusDto {
    status: string;
}
export declare class AssignUserRolesDto {
    roles: string[];
}
export declare class CreatePermissionGroupDto {
    name: string;
    description?: string;
}
export declare class CreatePermissionDto {
    code: string;
    name: string;
    description?: string;
    groupId?: string;
}
export declare class AssignRolePermissionsDto {
    permissionIds: string[];
}
export declare class CreateOrganizationDto {
    name: string;
    code?: string;
    logoUrl?: string;
    primaryColor?: string;
    secondaryColor?: string;
    phone?: string;
    email?: string;
    website?: string;
    streetAddress?: string;
    city?: string;
    state?: string;
    country?: string;
    timezone?: string;
    language?: string;
}
export declare class UpsertPlatformSettingDto {
    key: string;
    value: string;
    category: string;
    valueType?: string;
    description?: string;
}

import {
  AdminDashboardSummaryEntity, PermissionGroupEntity, PermissionEntity,
  RolePermissionEntity, OrganizationEntity, PlatformSettingEntity, ManagedUserEntity,
} from '../entities/admin.entity';

export interface IAdminRepository {
  // Dashboard Summary
  getDashboardSummary(): Promise<AdminDashboardSummaryEntity>;

  // User Administration
  findUsers(query?: string, status?: string): Promise<ManagedUserEntity[]>;
  findUserById(id: string): Promise<ManagedUserEntity | null>;
  updateUserStatus(id: string, status: string): Promise<ManagedUserEntity>;
  assignUserRoles(userId: string, roleNames: string[]): Promise<ManagedUserEntity>;
  softDeleteUser(id: string): Promise<void>;
  restoreUser(id: string): Promise<ManagedUserEntity>;

  // RBAC & Permission Management
  findRoles(): Promise<any[]>;
  findPermissions(): Promise<PermissionEntity[]>;
  findPermissionGroups(): Promise<PermissionGroupEntity[]>;
  createPermissionGroup(name: string, description?: string): Promise<PermissionGroupEntity>;
  createPermission(code: string, name: string, description?: string, groupId?: string): Promise<PermissionEntity>;
  assignPermissionsToRole(roleId: string, permissionIds: string[]): Promise<any>;
  getPermissionMatrix(): Promise<any>;

  // Organization Management
  createOrganization(data: any): Promise<OrganizationEntity>;
  findOrganizations(): Promise<OrganizationEntity[]>;
  findOrganizationById(id: string): Promise<OrganizationEntity | null>;
  updateOrganization(id: string, data: any): Promise<OrganizationEntity>;
  softDeleteOrganization(id: string): Promise<void>;

  // Platform Configuration
  getSettings(category?: string): Promise<PlatformSettingEntity[]>;
  upsertSetting(key: string, value: string, category: string, valueType?: string, description?: string, updatedBy?: string): Promise<PlatformSettingEntity>;

  // Audit
  findAuditLogs(limit?: number): Promise<any[]>;
  createAuditLog(userId: string, action: string, details?: string, ipAddress?: string): Promise<any>;
}

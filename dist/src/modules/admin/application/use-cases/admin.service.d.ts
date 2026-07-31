import { IAdminRepository } from '../../domain/repositories/admin.repository.interface';
import { AdminDashboardStatsDto, AdminDashboardSummaryResponseDto, ManagedUserResponseDto, OrganizationResponseDto, PlatformSettingResponseDto, AuditLogResponseDto, PermissionGroupResponseDto, PermissionResponseDto } from '../../presentation/dto/admin.dto';
import { UpdateUserStatusDto, AssignUserRolesDto, CreatePermissionGroupDto, CreatePermissionDto, AssignRolePermissionsDto, CreateOrganizationDto, UpsertPlatformSettingDto } from '../../presentation/dto/admin-enterprise.dto';
import { Logger } from 'nestjs-pino';
export declare class AdminService {
    private readonly adminRepository;
    private readonly logger;
    constructor(adminRepository: IAdminRepository, logger: Logger);
    getDashboardStats(): Promise<AdminDashboardStatsDto>;
    getDashboardSummary(): Promise<AdminDashboardSummaryResponseDto>;
    getUsers(query?: string, status?: string): Promise<ManagedUserResponseDto[]>;
    getUserById(id: string): Promise<ManagedUserResponseDto>;
    updateUserStatus(id: string, dto: UpdateUserStatusDto, adminUserId: string): Promise<ManagedUserResponseDto>;
    assignUserRoles(id: string, dto: AssignUserRolesDto, adminUserId: string): Promise<ManagedUserResponseDto>;
    softDeleteUser(id: string, adminUserId: string): Promise<{
        message: string;
    }>;
    restoreUser(id: string, adminUserId: string): Promise<ManagedUserResponseDto>;
    getRoles(): Promise<any[]>;
    getPermissions(): Promise<PermissionResponseDto[]>;
    getPermissionGroups(): Promise<PermissionGroupResponseDto[]>;
    createPermissionGroup(dto: CreatePermissionGroupDto, adminUserId: string): Promise<PermissionGroupResponseDto>;
    createPermission(dto: CreatePermissionDto, adminUserId: string): Promise<PermissionResponseDto>;
    assignRolePermissions(roleId: string, dto: AssignRolePermissionsDto, adminUserId: string): Promise<any>;
    getPermissionMatrix(): Promise<any>;
    createOrganization(dto: CreateOrganizationDto, adminUserId: string): Promise<OrganizationResponseDto>;
    getOrganizations(): Promise<OrganizationResponseDto[]>;
    getOrganizationById(id: string): Promise<OrganizationResponseDto>;
    updateOrganization(id: string, dto: Partial<CreateOrganizationDto>, adminUserId: string): Promise<OrganizationResponseDto>;
    softDeleteOrganization(id: string, adminUserId: string): Promise<{
        message: string;
    }>;
    private mapOrganization;
    getSettings(category?: string): Promise<PlatformSettingResponseDto[]>;
    upsertSetting(dto: UpsertPlatformSettingDto, adminUserId: string): Promise<PlatformSettingResponseDto>;
    getAuditLogs(): Promise<AuditLogResponseDto[]>;
    logAction(userId: string, action: string, details?: string, ipAddress?: string): Promise<void>;
}

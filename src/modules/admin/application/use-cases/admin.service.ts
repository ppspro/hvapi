import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { IAdminRepository } from '../../domain/repositories/admin.repository.interface';
import {
  AdminDashboardStatsDto, AdminDashboardSummaryResponseDto, ManagedUserResponseDto,
  OrganizationResponseDto, PlatformSettingResponseDto, AuditLogResponseDto,
  PermissionGroupResponseDto, PermissionResponseDto,
} from '../../presentation/dto/admin.dto';
import {
  UpdateUserStatusDto, AssignUserRolesDto, CreatePermissionGroupDto, CreatePermissionDto,
  AssignRolePermissionsDto, CreateOrganizationDto, UpsertPlatformSettingDto,
} from '../../presentation/dto/admin-enterprise.dto';
import { Logger } from 'nestjs-pino';

@Injectable()
export class AdminService {
  constructor(
    @Inject('IAdminRepository')
    private readonly adminRepository: IAdminRepository,
    private readonly logger: Logger,
  ) {}

  // ─── Dashboard ─────────────────────────────────────────────────────────

  async getDashboardStats(): Promise<AdminDashboardStatsDto> {
    const summary = await this.adminRepository.getDashboardSummary();
    return {
      totalPatients: summary.totalPatients,
      totalDoctors: summary.totalDoctors,
      pendingOcrReviews: 0,
      systemLogsCount: summary.recentActivities.length,
    };
  }

  async getDashboardSummary(): Promise<AdminDashboardSummaryResponseDto> {
    this.logger.log({ msg: 'Enterprise admin dashboard summary requested' });
    const summary = await this.adminRepository.getDashboardSummary();
    return {
      totalPatients: summary.totalPatients,
      totalDoctors: summary.totalDoctors,
      totalFacilities: summary.totalFacilities,
      totalStaff: summary.totalStaff,
      totalHealthCards: summary.totalHealthCards,
      totalInsurancePolicies: summary.totalInsurancePolicies,
      totalImmunisationRecords: summary.totalImmunisationRecords,
      totalActiveSchedules: summary.totalActiveSchedules,
      recentActivities: summary.recentActivities,
      growthMetrics: summary.growthMetrics,
    };
  }

  // ─── User Administration ───────────────────────────────────────────────

  async getUsers(query?: string, status?: string): Promise<ManagedUserResponseDto[]> {
    const users = await this.adminRepository.findUsers(query, status);
    return users.map((u) => ({
      id: u.id,
      phone: u.phone,
      status: u.status,
      roles: u.roles,
      patientProfileId: u.patientProfileId || undefined,
      doctorProfileId: u.doctorProfileId || undefined,
      staffMemberId: u.staffMemberId || undefined,
      createdAt: u.createdAt.toISOString(),
      updatedAt: u.updatedAt.toISOString(),
    }));
  }

  async getUserById(id: string): Promise<ManagedUserResponseDto> {
    const u = await this.adminRepository.findUserById(id);
    if (!u) throw new NotFoundException('User not found');
    return {
      id: u.id,
      phone: u.phone,
      status: u.status,
      roles: u.roles,
      patientProfileId: u.patientProfileId || undefined,
      doctorProfileId: u.doctorProfileId || undefined,
      staffMemberId: u.staffMemberId || undefined,
      createdAt: u.createdAt.toISOString(),
      updatedAt: u.updatedAt.toISOString(),
    };
  }

  async updateUserStatus(id: string, dto: UpdateUserStatusDto, adminUserId: string): Promise<ManagedUserResponseDto> {
    const user = await this.adminRepository.findUserById(id);
    if (!user) throw new NotFoundException('User not found');

    const updated = await this.adminRepository.updateUserStatus(id, dto.status);
    await this.logAction(adminUserId, `USER_STATUS_UPDATE_${dto.status}`, `Changed status of user ${id} to ${dto.status}`);

    return {
      id: updated.id,
      phone: updated.phone,
      status: updated.status,
      roles: updated.roles,
      patientProfileId: updated.patientProfileId || undefined,
      doctorProfileId: updated.doctorProfileId || undefined,
      staffMemberId: updated.staffMemberId || undefined,
      createdAt: updated.createdAt.toISOString(),
      updatedAt: updated.updatedAt.toISOString(),
    };
  }

  async assignUserRoles(id: string, dto: AssignUserRolesDto, adminUserId: string): Promise<ManagedUserResponseDto> {
    const user = await this.adminRepository.findUserById(id);
    if (!user) throw new NotFoundException('User not found');

    const updated = await this.adminRepository.assignUserRoles(id, dto.roles);
    await this.logAction(adminUserId, 'USER_ROLES_ASSIGNED', `Assigned roles [${dto.roles.join(', ')}] to user ${id}`);

    return {
      id: updated.id,
      phone: updated.phone,
      status: updated.status,
      roles: updated.roles,
      patientProfileId: updated.patientProfileId || undefined,
      doctorProfileId: updated.doctorProfileId || undefined,
      staffMemberId: updated.staffMemberId || undefined,
      createdAt: updated.createdAt.toISOString(),
      updatedAt: updated.updatedAt.toISOString(),
    };
  }

  async softDeleteUser(id: string, adminUserId: string): Promise<{ message: string }> {
    const user = await this.adminRepository.findUserById(id);
    if (!user) throw new NotFoundException('User not found');

    await this.adminRepository.softDeleteUser(id);
    await this.logAction(adminUserId, 'USER_BLOCKED', `Blocked/Soft-deleted user ${id}`);
    return { message: 'User blocked successfully' };
  }

  async restoreUser(id: string, adminUserId: string): Promise<ManagedUserResponseDto> {
    const user = await this.adminRepository.findUserById(id);
    if (!user) throw new NotFoundException('User not found');

    const restored = await this.adminRepository.restoreUser(id);
    await this.logAction(adminUserId, 'USER_RESTORED', `Restored user ${id}`);

    return {
      id: restored.id,
      phone: restored.phone,
      status: restored.status,
      roles: restored.roles,
      patientProfileId: restored.patientProfileId || undefined,
      doctorProfileId: restored.doctorProfileId || undefined,
      staffMemberId: restored.staffMemberId || undefined,
      createdAt: restored.createdAt.toISOString(),
      updatedAt: restored.updatedAt.toISOString(),
    };
  }

  // ─── RBAC & Permission Management ─────────────────────────────────────

  async getRoles(): Promise<any[]> {
    return this.adminRepository.findRoles();
  }

  async getPermissions(): Promise<PermissionResponseDto[]> {
    const perms = await this.adminRepository.findPermissions();
    return perms.map((p) => ({
      id: p.id,
      groupId: p.groupId || undefined,
      code: p.code,
      name: p.name,
      description: p.description || undefined,
      createdAt: p.createdAt.toISOString(),
    }));
  }

  async getPermissionGroups(): Promise<PermissionGroupResponseDto[]> {
    const groups = await this.adminRepository.findPermissionGroups();
    return groups.map((g) => ({
      id: g.id,
      name: g.name,
      description: g.description || undefined,
      permissions: g.permissions?.map((p: any) => ({
        id: p.id,
        code: p.code,
        name: p.name,
        description: p.description || undefined,
        createdAt: p.createdAt.toISOString(),
      })) || [],
      createdAt: g.createdAt.toISOString(),
    }));
  }

  async createPermissionGroup(dto: CreatePermissionGroupDto, adminUserId: string): Promise<PermissionGroupResponseDto> {
    const g = await this.adminRepository.createPermissionGroup(dto.name, dto.description);
    await this.logAction(adminUserId, 'PERMISSION_GROUP_CREATED', `Created group ${dto.name}`);
    return {
      id: g.id,
      name: g.name,
      description: g.description || undefined,
      permissions: [],
      createdAt: g.createdAt.toISOString(),
    };
  }

  async createPermission(dto: CreatePermissionDto, adminUserId: string): Promise<PermissionResponseDto> {
    const p = await this.adminRepository.createPermission(dto.code, dto.name, dto.description, dto.groupId);
    await this.logAction(adminUserId, 'PERMISSION_CREATED', `Created permission ${dto.code}`);
    return {
      id: p.id,
      groupId: p.groupId || undefined,
      code: p.code,
      name: p.name,
      description: p.description || undefined,
      createdAt: p.createdAt.toISOString(),
    };
  }

  async assignRolePermissions(roleId: string, dto: AssignRolePermissionsDto, adminUserId: string): Promise<any> {
    const result = await this.adminRepository.assignPermissionsToRole(roleId, dto.permissionIds);
    await this.logAction(adminUserId, 'ROLE_PERMISSIONS_ASSIGNED', `Assigned ${dto.permissionIds.length} permissions to role ${roleId}`);
    return result;
  }

  async getPermissionMatrix(): Promise<any> {
    return this.adminRepository.getPermissionMatrix();
  }

  // ─── Organization Management ──────────────────────────────────────────

  async createOrganization(dto: CreateOrganizationDto, adminUserId: string): Promise<OrganizationResponseDto> {
    const org = await this.adminRepository.createOrganization(dto);
    await this.logAction(adminUserId, 'ORGANIZATION_CREATED', `Created organization ${org.name} (${org.code})`);
    return this.mapOrganization(org);
  }

  async getOrganizations(): Promise<OrganizationResponseDto[]> {
    const orgs = await this.adminRepository.findOrganizations();
    return orgs.map((o) => this.mapOrganization(o));
  }

  async getOrganizationById(id: string): Promise<OrganizationResponseDto> {
    const org = await this.adminRepository.findOrganizationById(id);
    if (!org) throw new NotFoundException('Organization not found');
    return this.mapOrganization(org);
  }

  async updateOrganization(id: string, dto: Partial<CreateOrganizationDto>, adminUserId: string): Promise<OrganizationResponseDto> {
    const org = await this.adminRepository.findOrganizationById(id);
    if (!org) throw new NotFoundException('Organization not found');

    const updated = await this.adminRepository.updateOrganization(id, dto);
    await this.logAction(adminUserId, 'ORGANIZATION_UPDATED', `Updated organization ${id}`);
    return this.mapOrganization(updated);
  }

  async softDeleteOrganization(id: string, adminUserId: string): Promise<{ message: string }> {
    const org = await this.adminRepository.findOrganizationById(id);
    if (!org) throw new NotFoundException('Organization not found');

    await this.adminRepository.softDeleteOrganization(id);
    await this.logAction(adminUserId, 'ORGANIZATION_DELETED', `Soft-deleted organization ${id}`);
    return { message: 'Organization soft-deleted successfully' };
  }

  private mapOrganization(o: any): OrganizationResponseDto {
    return {
      id: o.id,
      name: o.name,
      code: o.code,
      logoUrl: o.logoUrl || undefined,
      primaryColor: o.primaryColor || undefined,
      secondaryColor: o.secondaryColor || undefined,
      phone: o.phone || undefined,
      email: o.email || undefined,
      website: o.website || undefined,
      streetAddress: o.streetAddress || undefined,
      city: o.city || undefined,
      district: o.district || undefined,
      state: o.state || undefined,
      country: o.country,
      timezone: o.timezone,
      language: o.language,
      isDeleted: o.isDeleted,
      createdAt: o.createdAt.toISOString(),
      updatedAt: o.updatedAt.toISOString(),
    };
  }

  // ─── Platform Configuration ─────────────────────────────────────────────

  async getSettings(category?: string): Promise<PlatformSettingResponseDto[]> {
    const settings = await this.adminRepository.getSettings(category);
    return settings.map((s) => ({
      id: s.id,
      category: s.category,
      key: s.key,
      value: s.value,
      valueType: s.valueType,
      description: s.description || undefined,
      isPublic: s.isPublic,
      updatedBy: s.updatedBy || undefined,
      createdAt: s.createdAt.toISOString(),
      updatedAt: s.updatedAt.toISOString(),
    }));
  }

  async upsertSetting(dto: UpsertPlatformSettingDto, adminUserId: string): Promise<PlatformSettingResponseDto> {
    const s = await this.adminRepository.upsertSetting(
      dto.key,
      dto.value,
      dto.category,
      dto.valueType,
      dto.description,
      adminUserId,
    );
    await this.logAction(adminUserId, 'SETTING_UPDATED', `Updated setting ${dto.key}=${dto.value}`);
    return {
      id: s.id,
      category: s.category,
      key: s.key,
      value: s.value,
      valueType: s.valueType,
      description: s.description || undefined,
      isPublic: s.isPublic,
      updatedBy: s.updatedBy || undefined,
      createdAt: s.createdAt.toISOString(),
      updatedAt: s.updatedAt.toISOString(),
    };
  }

  // ─── Audit ─────────────────────────────────────────────────────────────

  async getAuditLogs(): Promise<AuditLogResponseDto[]> {
    this.logger.log({ msg: 'System audit logs requested' });
    const logs = await this.adminRepository.findAuditLogs();
    return logs.map((l) => ({
      id: l.id,
      userId: l.userId,
      action: l.action,
      details: l.details || undefined,
      ipAddress: l.ipAddress || undefined,
      createdAt: l.createdAt,
    }));
  }

  async logAction(userId: string, action: string, details?: string, ipAddress?: string): Promise<void> {
    await this.adminRepository.createAuditLog(userId, action, details, ipAddress);
  }
}

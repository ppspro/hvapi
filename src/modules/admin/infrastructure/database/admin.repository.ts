import { Injectable } from '@nestjs/common';
import { DatabaseService } from '@database/database.service';
import { IAdminRepository } from '../../domain/repositories/admin.repository.interface';
import {
  AdminDashboardSummaryEntity, PermissionGroupEntity, PermissionEntity,
  OrganizationEntity, PlatformSettingEntity, ManagedUserEntity,
} from '../../domain/entities/admin.entity';

@Injectable()
export class AdminRepository implements IAdminRepository {
  constructor(private readonly db: DatabaseService) {}

  // ─── Dashboard Summary ──────────────────────────────────────────────────

  async getDashboardSummary(): Promise<AdminDashboardSummaryEntity> {
    const [
      totalPatients,
      totalDoctors,
      totalFacilities,
      totalStaff,
      totalHealthCards,
      totalInsurancePolicies,
      totalImmunisationRecords,
      totalActiveSchedules,
      recentActivities,
    ] = await Promise.all([
      this.db.patientProfile.count(),
      this.db.doctorProfile.count({ where: { isDeleted: false } }),
      this.db.facility.count({ where: { isDeleted: false } }),
      this.db.staffMember.count({ where: { isDeleted: false } }),
      this.db.healthCard.count({ where: { isDeleted: false } }),
      this.db.insurancePolicy.count({ where: { isDeleted: false } }),
      this.db.vaccinationRecord.count(),
      this.db.schedule.count({ where: { isDeleted: false, isActive: true } }),
      this.db.auditLog.findMany({ orderBy: { createdAt: 'desc' }, take: 10 }),
    ]);

    const startOfMonth = new Date();
    startOfMonth.setDate(1);
    startOfMonth.setHours(0, 0, 0, 0);

    const [newPatientsThisMonth, newDoctorsThisMonth, newFacilitiesThisMonth] = await Promise.all([
      this.db.patientProfile.count({ where: { createdAt: { gte: startOfMonth } } }),
      this.db.doctorProfile.count({ where: { createdAt: { gte: startOfMonth }, isDeleted: false } }),
      this.db.facility.count({ where: { createdAt: { gte: startOfMonth }, isDeleted: false } }),
    ]);

    return {
      totalPatients,
      totalDoctors,
      totalFacilities,
      totalStaff,
      totalHealthCards,
      totalInsurancePolicies,
      totalImmunisationRecords,
      totalActiveSchedules,
      recentActivities,
      growthMetrics: {
        newPatientsThisMonth,
        newDoctorsThisMonth,
        newFacilitiesThisMonth,
      },
    };
  }

  // ─── User Administration ────────────────────────────────────────────────

  async findUsers(query?: string, status?: string): Promise<ManagedUserEntity[]> {
    const where: any = {};
    if (status) {
      where.status = status;
    }
    if (query) {
      where.OR = [
        { phone: { contains: query, mode: 'insensitive' } },
        { id: { contains: query, mode: 'insensitive' } },
      ];
    }

    const users = await this.db.user.findMany({
      where,
      include: {
        userRoles: { include: { role: true } },
        patientProfile: { select: { id: true } },
        doctorProfile: { select: { id: true } },
        staffMember: { select: { id: true } },
      },
      orderBy: { createdAt: 'desc' },
    });

    return users.map((u) => ({
      id: u.id,
      phone: u.phone,
      status: u.status,
      createdAt: u.createdAt,
      updatedAt: u.updatedAt,
      roles: u.userRoles.map((ur) => ur.role.name),
      patientProfileId: u.patientProfile?.id || null,
      doctorProfileId: u.doctorProfile?.id || null,
      staffMemberId: u.staffMember?.id || null,
    }));
  }

  async findUserById(id: string): Promise<ManagedUserEntity | null> {
    const u = await this.db.user.findUnique({
      where: { id },
      include: {
        userRoles: { include: { role: true } },
        patientProfile: { select: { id: true } },
        doctorProfile: { select: { id: true } },
        staffMember: { select: { id: true } },
      },
    });

    if (!u) return null;

    return {
      id: u.id,
      phone: u.phone,
      status: u.status,
      createdAt: u.createdAt,
      updatedAt: u.updatedAt,
      roles: u.userRoles.map((ur) => ur.role.name),
      patientProfileId: u.patientProfile?.id || null,
      doctorProfileId: u.doctorProfile?.id || null,
      staffMemberId: u.staffMember?.id || null,
    };
  }

  async updateUserStatus(id: string, status: string): Promise<ManagedUserEntity> {
    await this.db.user.update({
      where: { id },
      data: { status: status as any },
    });
    return (await this.findUserById(id))!;
  }

  async assignUserRoles(userId: string, roleNames: string[]): Promise<ManagedUserEntity> {
    await this.db.userRole.deleteMany({ where: { userId } });

    for (const roleName of roleNames) {
      let role = await this.db.role.findUnique({ where: { name: roleName as any } });
      if (!role) {
        role = await this.db.role.create({ data: { name: roleName as any } });
      }
      await this.db.userRole.create({
        data: {
          userId,
          roleId: role.id,
        },
      });
    }

    return (await this.findUserById(userId))!;
  }

  async softDeleteUser(id: string): Promise<void> {
    await this.db.user.update({
      where: { id },
      data: { status: 'BLOCKED' },
    });
  }

  async restoreUser(id: string): Promise<ManagedUserEntity> {
    await this.db.user.update({
      where: { id },
      data: { status: 'ACTIVE' },
    });
    return (await this.findUserById(id))!;
  }

  // ─── RBAC & Permission Management ─────────────────────────────────────

  async findRoles(): Promise<any[]> {
    return this.db.role.findMany({
      include: {
        rolePermissions: {
          include: { permission: true },
        },
      },
    });
  }

  async findPermissions(): Promise<PermissionEntity[]> {
    return (await this.db.permission.findMany({
      include: { group: true },
      orderBy: { code: 'asc' },
    })) as unknown as PermissionEntity[];
  }

  async findPermissionGroups(): Promise<PermissionGroupEntity[]> {
    return (await this.db.permissionGroup.findMany({
      include: { permissions: true },
      orderBy: { name: 'asc' },
    })) as unknown as PermissionGroupEntity[];
  }

  async createPermissionGroup(name: string, description?: string): Promise<PermissionGroupEntity> {
    return (await this.db.permissionGroup.create({
      data: { name, description: description || null },
    })) as unknown as PermissionGroupEntity;
  }

  async createPermission(code: string, name: string, description?: string, groupId?: string): Promise<PermissionEntity> {
    return (await this.db.permission.create({
      data: {
        code,
        name,
        description: description || null,
        groupId: groupId || null,
      },
    })) as unknown as PermissionEntity;
  }

  async assignPermissionsToRole(roleId: string, permissionIds: string[]): Promise<any> {
    await this.db.rolePermission.deleteMany({ where: { roleId } });
    await this.db.rolePermission.createMany({
      data: permissionIds.map((pId) => ({ roleId, permissionId: pId })),
    });
    return this.db.role.findUnique({
      where: { id: roleId },
      include: { rolePermissions: { include: { permission: true } } },
    });
  }

  async getPermissionMatrix(): Promise<any> {
    const roles = await this.findRoles();
    const permissions = await this.findPermissions();

    return {
      roles: roles.map((r) => ({
        id: r.id,
        name: r.name,
        assignedPermissions: r.rolePermissions.map((rp: any) => rp.permission.code),
      })),
      permissions: permissions.map((p) => ({
        id: p.id,
        code: p.code,
        name: p.name,
      })),
    };
  }

  // ─── Organization Management ──────────────────────────────────────────

  async createOrganization(data: any): Promise<OrganizationEntity> {
    const code = data.code || `ORG-360-${Date.now().toString().slice(-4)}`;
    return (await this.db.organization.create({
      data: {
        name: data.name,
        code,
        logoUrl: data.logoUrl || null,
        primaryColor: data.primaryColor || null,
        secondaryColor: data.secondaryColor || null,
        phone: data.phone || null,
        email: data.email || null,
        website: data.website || null,
        streetAddress: data.streetAddress || null,
        city: data.city || null,
        district: data.district || null,
        state: data.state || null,
        country: data.country || 'Pakistan',
        timezone: data.timezone || 'Asia/Karachi',
        language: data.language || 'en',
      },
    })) as unknown as OrganizationEntity;
  }

  async findOrganizations(): Promise<OrganizationEntity[]> {
    return (await this.db.organization.findMany({
      where: { isDeleted: false },
      orderBy: { createdAt: 'desc' },
    })) as unknown as OrganizationEntity[];
  }

  async findOrganizationById(id: string): Promise<OrganizationEntity | null> {
    return (await this.db.organization.findFirst({
      where: { id, isDeleted: false },
    })) as unknown as OrganizationEntity | null;
  }

  async updateOrganization(id: string, data: any): Promise<OrganizationEntity> {
    return (await this.db.organization.update({
      where: { id },
      data: {
        name: data.name || undefined,
        logoUrl: data.logoUrl || undefined,
        primaryColor: data.primaryColor || undefined,
        secondaryColor: data.secondaryColor || undefined,
        phone: data.phone || undefined,
        email: data.email || undefined,
        website: data.website || undefined,
        streetAddress: data.streetAddress || undefined,
        city: data.city || undefined,
        district: data.district || undefined,
        state: data.state || undefined,
        country: data.country || undefined,
        timezone: data.timezone || undefined,
        language: data.language || undefined,
      },
    })) as unknown as OrganizationEntity;
  }

  async softDeleteOrganization(id: string): Promise<void> {
    await this.db.organization.update({
      where: { id },
      data: { isDeleted: true, deletedAt: new Date() },
    });
  }

  // ─── Platform Configuration ─────────────────────────────────────────────

  async getSettings(category?: string): Promise<PlatformSettingEntity[]> {
    return (await this.db.platformSetting.findMany({
      where: category ? { category } : {},
      orderBy: { category: 'asc' },
    })) as unknown as PlatformSettingEntity[];
  }

  async upsertSetting(
    key: string,
    value: string,
    category: string,
    valueType = 'STRING',
    description?: string,
    updatedBy?: string,
  ): Promise<PlatformSettingEntity> {
    return (await this.db.platformSetting.upsert({
      where: { key },
      update: {
        value,
        category,
        valueType,
        description: description || undefined,
        updatedBy: updatedBy || undefined,
      },
      create: {
        key,
        value,
        category,
        valueType,
        description: description || null,
        updatedBy: updatedBy || null,
      },
    })) as unknown as PlatformSettingEntity;
  }

  // ─── Audit ─────────────────────────────────────────────────────────────

  async findAuditLogs(limit = 100): Promise<any[]> {
    return this.db.auditLog.findMany({
      orderBy: { createdAt: 'desc' },
      take: limit,
      include: { user: true },
    });
  }

  async createAuditLog(userId: string, action: string, details?: string, ipAddress?: string): Promise<any> {
    return this.db.auditLog.create({
      data: {
        userId,
        action,
        details: details || null,
        ipAddress: ipAddress || null,
      },
    });
  }
}

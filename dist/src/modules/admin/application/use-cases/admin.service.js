"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminService = void 0;
const common_1 = require("@nestjs/common");
const nestjs_pino_1 = require("nestjs-pino");
let AdminService = class AdminService {
    constructor(adminRepository, logger) {
        this.adminRepository = adminRepository;
        this.logger = logger;
    }
    async getDashboardStats() {
        const summary = await this.adminRepository.getDashboardSummary();
        return {
            totalPatients: summary.totalPatients,
            totalDoctors: summary.totalDoctors,
            pendingOcrReviews: 0,
            systemLogsCount: summary.recentActivities.length,
        };
    }
    async getDashboardSummary() {
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
    async getUsers(query, status) {
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
    async getUserById(id) {
        const u = await this.adminRepository.findUserById(id);
        if (!u)
            throw new common_1.NotFoundException('User not found');
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
    async updateUserStatus(id, dto, adminUserId) {
        const user = await this.adminRepository.findUserById(id);
        if (!user)
            throw new common_1.NotFoundException('User not found');
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
    async assignUserRoles(id, dto, adminUserId) {
        const user = await this.adminRepository.findUserById(id);
        if (!user)
            throw new common_1.NotFoundException('User not found');
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
    async softDeleteUser(id, adminUserId) {
        const user = await this.adminRepository.findUserById(id);
        if (!user)
            throw new common_1.NotFoundException('User not found');
        await this.adminRepository.softDeleteUser(id);
        await this.logAction(adminUserId, 'USER_BLOCKED', `Blocked/Soft-deleted user ${id}`);
        return { message: 'User blocked successfully' };
    }
    async restoreUser(id, adminUserId) {
        const user = await this.adminRepository.findUserById(id);
        if (!user)
            throw new common_1.NotFoundException('User not found');
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
    async getRoles() {
        return this.adminRepository.findRoles();
    }
    async getPermissions() {
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
    async getPermissionGroups() {
        const groups = await this.adminRepository.findPermissionGroups();
        return groups.map((g) => ({
            id: g.id,
            name: g.name,
            description: g.description || undefined,
            permissions: g.permissions?.map((p) => ({
                id: p.id,
                code: p.code,
                name: p.name,
                description: p.description || undefined,
                createdAt: p.createdAt.toISOString(),
            })) || [],
            createdAt: g.createdAt.toISOString(),
        }));
    }
    async createPermissionGroup(dto, adminUserId) {
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
    async createPermission(dto, adminUserId) {
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
    async assignRolePermissions(roleId, dto, adminUserId) {
        const result = await this.adminRepository.assignPermissionsToRole(roleId, dto.permissionIds);
        await this.logAction(adminUserId, 'ROLE_PERMISSIONS_ASSIGNED', `Assigned ${dto.permissionIds.length} permissions to role ${roleId}`);
        return result;
    }
    async getPermissionMatrix() {
        return this.adminRepository.getPermissionMatrix();
    }
    async createOrganization(dto, adminUserId) {
        const org = await this.adminRepository.createOrganization(dto);
        await this.logAction(adminUserId, 'ORGANIZATION_CREATED', `Created organization ${org.name} (${org.code})`);
        return this.mapOrganization(org);
    }
    async getOrganizations() {
        const orgs = await this.adminRepository.findOrganizations();
        return orgs.map((o) => this.mapOrganization(o));
    }
    async getOrganizationById(id) {
        const org = await this.adminRepository.findOrganizationById(id);
        if (!org)
            throw new common_1.NotFoundException('Organization not found');
        return this.mapOrganization(org);
    }
    async updateOrganization(id, dto, adminUserId) {
        const org = await this.adminRepository.findOrganizationById(id);
        if (!org)
            throw new common_1.NotFoundException('Organization not found');
        const updated = await this.adminRepository.updateOrganization(id, dto);
        await this.logAction(adminUserId, 'ORGANIZATION_UPDATED', `Updated organization ${id}`);
        return this.mapOrganization(updated);
    }
    async softDeleteOrganization(id, adminUserId) {
        const org = await this.adminRepository.findOrganizationById(id);
        if (!org)
            throw new common_1.NotFoundException('Organization not found');
        await this.adminRepository.softDeleteOrganization(id);
        await this.logAction(adminUserId, 'ORGANIZATION_DELETED', `Soft-deleted organization ${id}`);
        return { message: 'Organization soft-deleted successfully' };
    }
    mapOrganization(o) {
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
    async getSettings(category) {
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
    async upsertSetting(dto, adminUserId) {
        const s = await this.adminRepository.upsertSetting(dto.key, dto.value, dto.category, dto.valueType, dto.description, adminUserId);
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
    async getAuditLogs() {
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
    async logAction(userId, action, details, ipAddress) {
        await this.adminRepository.createAuditLog(userId, action, details, ipAddress);
    }
};
exports.AdminService = AdminService;
exports.AdminService = AdminService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('IAdminRepository')),
    __metadata("design:paramtypes", [Object, nestjs_pino_1.Logger])
], AdminService);
//# sourceMappingURL=admin.service.js.map
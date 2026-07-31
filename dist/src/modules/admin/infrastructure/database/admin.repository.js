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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminRepository = void 0;
const common_1 = require("@nestjs/common");
const database_service_1 = require("../../../../database/database.service");
let AdminRepository = class AdminRepository {
    constructor(db) {
        this.db = db;
    }
    async getDashboardSummary() {
        const [totalPatients, totalDoctors, totalFacilities, totalStaff, totalHealthCards, totalInsurancePolicies, totalImmunisationRecords, totalActiveSchedules, recentActivities,] = await Promise.all([
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
    async findUsers(query, status) {
        const where = {};
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
    async findUserById(id) {
        const u = await this.db.user.findUnique({
            where: { id },
            include: {
                userRoles: { include: { role: true } },
                patientProfile: { select: { id: true } },
                doctorProfile: { select: { id: true } },
                staffMember: { select: { id: true } },
            },
        });
        if (!u)
            return null;
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
    async updateUserStatus(id, status) {
        await this.db.user.update({
            where: { id },
            data: { status: status },
        });
        return (await this.findUserById(id));
    }
    async assignUserRoles(userId, roleNames) {
        await this.db.userRole.deleteMany({ where: { userId } });
        for (const roleName of roleNames) {
            let role = await this.db.role.findUnique({ where: { name: roleName } });
            if (!role) {
                role = await this.db.role.create({ data: { name: roleName } });
            }
            await this.db.userRole.create({
                data: {
                    userId,
                    roleId: role.id,
                },
            });
        }
        return (await this.findUserById(userId));
    }
    async softDeleteUser(id) {
        await this.db.user.update({
            where: { id },
            data: { status: 'BLOCKED' },
        });
    }
    async restoreUser(id) {
        await this.db.user.update({
            where: { id },
            data: { status: 'ACTIVE' },
        });
        return (await this.findUserById(id));
    }
    async findRoles() {
        return this.db.role.findMany({
            include: {
                rolePermissions: {
                    include: { permission: true },
                },
            },
        });
    }
    async findPermissions() {
        return (await this.db.permission.findMany({
            include: { group: true },
            orderBy: { code: 'asc' },
        }));
    }
    async findPermissionGroups() {
        return (await this.db.permissionGroup.findMany({
            include: { permissions: true },
            orderBy: { name: 'asc' },
        }));
    }
    async createPermissionGroup(name, description) {
        return (await this.db.permissionGroup.create({
            data: { name, description: description || null },
        }));
    }
    async createPermission(code, name, description, groupId) {
        return (await this.db.permission.create({
            data: {
                code,
                name,
                description: description || null,
                groupId: groupId || null,
            },
        }));
    }
    async assignPermissionsToRole(roleId, permissionIds) {
        await this.db.rolePermission.deleteMany({ where: { roleId } });
        await this.db.rolePermission.createMany({
            data: permissionIds.map((pId) => ({ roleId, permissionId: pId })),
        });
        return this.db.role.findUnique({
            where: { id: roleId },
            include: { rolePermissions: { include: { permission: true } } },
        });
    }
    async getPermissionMatrix() {
        const roles = await this.findRoles();
        const permissions = await this.findPermissions();
        return {
            roles: roles.map((r) => ({
                id: r.id,
                name: r.name,
                assignedPermissions: r.rolePermissions.map((rp) => rp.permission.code),
            })),
            permissions: permissions.map((p) => ({
                id: p.id,
                code: p.code,
                name: p.name,
            })),
        };
    }
    async createOrganization(data) {
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
        }));
    }
    async findOrganizations() {
        return (await this.db.organization.findMany({
            where: { isDeleted: false },
            orderBy: { createdAt: 'desc' },
        }));
    }
    async findOrganizationById(id) {
        return (await this.db.organization.findFirst({
            where: { id, isDeleted: false },
        }));
    }
    async updateOrganization(id, data) {
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
        }));
    }
    async softDeleteOrganization(id) {
        await this.db.organization.update({
            where: { id },
            data: { isDeleted: true, deletedAt: new Date() },
        });
    }
    async getSettings(category) {
        return (await this.db.platformSetting.findMany({
            where: category ? { category } : {},
            orderBy: { category: 'asc' },
        }));
    }
    async upsertSetting(key, value, category, valueType = 'STRING', description, updatedBy) {
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
        }));
    }
    async findAuditLogs(limit = 100) {
        return this.db.auditLog.findMany({
            orderBy: { createdAt: 'desc' },
            take: limit,
            include: { user: true },
        });
    }
    async createAuditLog(userId, action, details, ipAddress) {
        return this.db.auditLog.create({
            data: {
                userId,
                action,
                details: details || null,
                ipAddress: ipAddress || null,
            },
        });
    }
};
exports.AdminRepository = AdminRepository;
exports.AdminRepository = AdminRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [database_service_1.DatabaseService])
], AdminRepository);
//# sourceMappingURL=admin.repository.js.map
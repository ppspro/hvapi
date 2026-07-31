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
exports.AdminController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const passport_1 = require("@nestjs/passport");
const admin_service_1 = require("../../application/use-cases/admin.service");
const admin_dto_1 = require("../dto/admin.dto");
const admin_enterprise_dto_1 = require("../dto/admin-enterprise.dto");
let AdminController = class AdminController {
    constructor(adminService) {
        this.adminService = adminService;
    }
    async getDashboardStats() {
        return this.adminService.getDashboardStats();
    }
    async getDashboardSummary() {
        return this.adminService.getDashboardSummary();
    }
    async getUsers(query, status) {
        return this.adminService.getUsers(query, status);
    }
    async getUserById(id) {
        return this.adminService.getUserById(id);
    }
    async updateUserStatus(req, id, dto) {
        return this.adminService.updateUserStatus(id, dto, req.user.userId);
    }
    async assignUserRoles(req, id, dto) {
        return this.adminService.assignUserRoles(id, dto, req.user.userId);
    }
    async softDeleteUser(req, id) {
        return this.adminService.softDeleteUser(id, req.user.userId);
    }
    async restoreUser(req, id) {
        return this.adminService.restoreUser(id, req.user.userId);
    }
    async getRoles() {
        return this.adminService.getRoles();
    }
    async getPermissions() {
        return this.adminService.getPermissions();
    }
    async getPermissionGroups() {
        return this.adminService.getPermissionGroups();
    }
    async createPermissionGroup(req, dto) {
        return this.adminService.createPermissionGroup(dto, req.user.userId);
    }
    async createPermission(req, dto) {
        return this.adminService.createPermission(dto, req.user.userId);
    }
    async assignRolePermissions(req, id, dto) {
        return this.adminService.assignRolePermissions(id, dto, req.user.userId);
    }
    async getPermissionMatrix() {
        return this.adminService.getPermissionMatrix();
    }
    async createOrganization(req, dto) {
        return this.adminService.createOrganization(dto, req.user.userId);
    }
    async getOrganizations() {
        return this.adminService.getOrganizations();
    }
    async getOrganizationById(id) {
        return this.adminService.getOrganizationById(id);
    }
    async updateOrganization(req, id, dto) {
        return this.adminService.updateOrganization(id, dto, req.user.userId);
    }
    async softDeleteOrganization(req, id) {
        return this.adminService.softDeleteOrganization(id, req.user.userId);
    }
    async getSettings(category) {
        return this.adminService.getSettings(category);
    }
    async upsertSetting(req, dto) {
        return this.adminService.upsertSetting(dto, req.user.userId);
    }
    async getAuditLogs() {
        return this.adminService.getAuditLogs();
    }
};
exports.AdminController = AdminController;
__decorate([
    (0, common_1.Get)('dashboard/stats'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Get quick legacy dashboard statistics' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: admin_dto_1.AdminDashboardStatsDto }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "getDashboardStats", null);
__decorate([
    (0, common_1.Get)('dashboard/summary'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Get platform-wide aggregated summary & growth metrics' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: admin_dto_1.AdminDashboardSummaryResponseDto }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "getDashboardSummary", null);
__decorate([
    (0, common_1.Get)('users'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Search and list platform users with filter & roles' }),
    (0, swagger_1.ApiQuery)({ name: 'q', required: false, description: 'Search by phone or user ID' }),
    (0, swagger_1.ApiQuery)({ name: 'status', required: false, enum: ['ACTIVE', 'INACTIVE', 'BLOCKED'] }),
    (0, swagger_1.ApiResponse)({ status: 200, type: [admin_dto_1.ManagedUserResponseDto] }),
    __param(0, (0, common_1.Query)('q')),
    __param(1, (0, common_1.Query)('status')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "getUsers", null);
__decorate([
    (0, common_1.Get)('users/:id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Get user details by ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'User ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: admin_dto_1.ManagedUserResponseDto }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "getUserById", null);
__decorate([
    (0, common_1.Put)('users/:id/status'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Activate, deactivate, or lock/block user account' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'User ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: admin_dto_1.ManagedUserResponseDto }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, admin_enterprise_dto_1.UpdateUserStatusDto]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "updateUserStatus", null);
__decorate([
    (0, common_1.Put)('users/:id/roles'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Assign RBAC roles to user' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'User ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: admin_dto_1.ManagedUserResponseDto }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, admin_enterprise_dto_1.AssignUserRolesDto]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "assignUserRoles", null);
__decorate([
    (0, common_1.Delete)('users/:id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Soft-delete / block a user account' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'User ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'User blocked' }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "softDeleteUser", null);
__decorate([
    (0, common_1.Post)('users/:id/restore'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Restore a blocked/soft-deleted user account' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'User ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: admin_dto_1.ManagedUserResponseDto }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "restoreUser", null);
__decorate([
    (0, common_1.Get)('roles'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'List all RBAC roles with assigned permissions' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'List of roles' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "getRoles", null);
__decorate([
    (0, common_1.Get)('permissions'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'List all system permissions' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: [admin_dto_1.PermissionResponseDto] }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "getPermissions", null);
__decorate([
    (0, common_1.Get)('permission-groups'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'List permission groups with permissions' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: [admin_dto_1.PermissionGroupResponseDto] }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "getPermissionGroups", null);
__decorate([
    (0, common_1.Post)('permission-groups'),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new permission group' }),
    (0, swagger_1.ApiResponse)({ status: 201, type: admin_dto_1.PermissionGroupResponseDto }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, admin_enterprise_dto_1.CreatePermissionGroupDto]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "createPermissionGroup", null);
__decorate([
    (0, common_1.Post)('permissions'),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new granular permission' }),
    (0, swagger_1.ApiResponse)({ status: 201, type: admin_dto_1.PermissionResponseDto }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, admin_enterprise_dto_1.CreatePermissionDto]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "createPermission", null);
__decorate([
    (0, common_1.Put)('roles/:id/permissions'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Assign permissions to a role' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Role ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Role updated with permissions' }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, admin_enterprise_dto_1.AssignRolePermissionsDto]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "assignRolePermissions", null);
__decorate([
    (0, common_1.Get)('permission-matrix'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Get complete Role-Permission matrix' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Matrix of roles and assigned permission codes' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "getPermissionMatrix", null);
__decorate([
    (0, common_1.Post)('organizations'),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, swagger_1.ApiOperation)({ summary: 'Create an organization profile' }),
    (0, swagger_1.ApiResponse)({ status: 201, type: admin_dto_1.OrganizationResponseDto }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, admin_enterprise_dto_1.CreateOrganizationDto]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "createOrganization", null);
__decorate([
    (0, common_1.Get)('organizations'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'List all registered organizations' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: [admin_dto_1.OrganizationResponseDto] }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "getOrganizations", null);
__decorate([
    (0, common_1.Get)('organizations/:id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Get organization details' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Organization ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: admin_dto_1.OrganizationResponseDto }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "getOrganizationById", null);
__decorate([
    (0, common_1.Put)('organizations/:id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Update organization details and settings' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Organization ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: admin_dto_1.OrganizationResponseDto }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "updateOrganization", null);
__decorate([
    (0, common_1.Delete)('organizations/:id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Soft-delete an organization' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Organization ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Organization soft-deleted' }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "softDeleteOrganization", null);
__decorate([
    (0, common_1.Get)('settings'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Get system settings by category or all' }),
    (0, swagger_1.ApiQuery)({ name: 'category', required: false, enum: ['GENERAL', 'SECURITY', 'STORAGE', 'API_LIMITS', 'MAINTENANCE', 'FEATURE_TOGGLES'] }),
    (0, swagger_1.ApiResponse)({ status: 200, type: [admin_dto_1.PlatformSettingResponseDto] }),
    __param(0, (0, common_1.Query)('category')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "getSettings", null);
__decorate([
    (0, common_1.Put)('settings'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Upsert platform configuration setting' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: admin_dto_1.PlatformSettingResponseDto }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, admin_enterprise_dto_1.UpsertPlatformSettingDto]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "upsertSetting", null);
__decorate([
    (0, common_1.Get)('audit-logs'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Get global system audit trail' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: [admin_dto_1.AuditLogResponseDto] }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "getAuditLogs", null);
exports.AdminController = AdminController = __decorate([
    (0, swagger_1.ApiTags)('Admin'),
    (0, common_1.Controller)('admin'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, swagger_1.ApiBearerAuth)('JWT-Auth'),
    __metadata("design:paramtypes", [admin_service_1.AdminService])
], AdminController);
//# sourceMappingURL=admin.controller.js.map
import {
  Controller, Get, Post, Put, Delete, Body, Param, Query, UseGuards, Req, HttpCode, HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse as SwaggerResponse, ApiBearerAuth, ApiParam, ApiQuery } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { AdminService } from '../../application/use-cases/admin.service';
import {
  AdminDashboardStatsDto, AdminDashboardSummaryResponseDto, ManagedUserResponseDto,
  OrganizationResponseDto, PlatformSettingResponseDto, AuditLogResponseDto,
  PermissionGroupResponseDto, PermissionResponseDto,
} from '../dto/admin.dto';
import {
  UpdateUserStatusDto, AssignUserRolesDto, CreatePermissionGroupDto, CreatePermissionDto,
  AssignRolePermissionsDto, CreateOrganizationDto, UpsertPlatformSettingDto,
} from '../dto/admin-enterprise.dto';

@ApiTags('Admin')
@Controller('admin')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth('JWT-Auth')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  // ─── Dashboard ─────────────────────────────────────────────────────────

  @Get('dashboard/stats')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get quick legacy dashboard statistics' })
  @SwaggerResponse({ status: 200, type: AdminDashboardStatsDto })
  async getDashboardStats(): Promise<AdminDashboardStatsDto> {
    return this.adminService.getDashboardStats();
  }

  @Get('dashboard/summary')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get platform-wide aggregated summary & growth metrics' })
  @SwaggerResponse({ status: 200, type: AdminDashboardSummaryResponseDto })
  async getDashboardSummary(): Promise<AdminDashboardSummaryResponseDto> {
    return this.adminService.getDashboardSummary();
  }

  // ─── User Administration ───────────────────────────────────────────────

  @Get('users')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Search and list platform users with filter & roles' })
  @ApiQuery({ name: 'q', required: false, description: 'Search by phone or user ID' })
  @ApiQuery({ name: 'status', required: false, enum: ['ACTIVE', 'INACTIVE', 'BLOCKED'] })
  @SwaggerResponse({ status: 200, type: [ManagedUserResponseDto] })
  async getUsers(
    @Query('q') query?: string,
    @Query('status') status?: string,
  ): Promise<ManagedUserResponseDto[]> {
    return this.adminService.getUsers(query, status);
  }

  @Get('users/:id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get user details by ID' })
  @ApiParam({ name: 'id', description: 'User ID' })
  @SwaggerResponse({ status: 200, type: ManagedUserResponseDto })
  async getUserById(@Param('id') id: string): Promise<ManagedUserResponseDto> {
    return this.adminService.getUserById(id);
  }

  @Put('users/:id/status')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Activate, deactivate, or lock/block user account' })
  @ApiParam({ name: 'id', description: 'User ID' })
  @SwaggerResponse({ status: 200, type: ManagedUserResponseDto })
  async updateUserStatus(
    @Req() req: any,
    @Param('id') id: string,
    @Body() dto: UpdateUserStatusDto,
  ): Promise<ManagedUserResponseDto> {
    return this.adminService.updateUserStatus(id, dto, req.user.userId);
  }

  @Put('users/:id/roles')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Assign RBAC roles to user' })
  @ApiParam({ name: 'id', description: 'User ID' })
  @SwaggerResponse({ status: 200, type: ManagedUserResponseDto })
  async assignUserRoles(
    @Req() req: any,
    @Param('id') id: string,
    @Body() dto: AssignUserRolesDto,
  ): Promise<ManagedUserResponseDto> {
    return this.adminService.assignUserRoles(id, dto, req.user.userId);
  }

  @Delete('users/:id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Soft-delete / block a user account' })
  @ApiParam({ name: 'id', description: 'User ID' })
  @SwaggerResponse({ status: 200, description: 'User blocked' })
  async softDeleteUser(@Req() req: any, @Param('id') id: string): Promise<any> {
    return this.adminService.softDeleteUser(id, req.user.userId);
  }

  @Post('users/:id/restore')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Restore a blocked/soft-deleted user account' })
  @ApiParam({ name: 'id', description: 'User ID' })
  @SwaggerResponse({ status: 200, type: ManagedUserResponseDto })
  async restoreUser(@Req() req: any, @Param('id') id: string): Promise<ManagedUserResponseDto> {
    return this.adminService.restoreUser(id, req.user.userId);
  }

  // ─── Role & Permission Management ────────────────────────────────────

  @Get('roles')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'List all RBAC roles with assigned permissions' })
  @SwaggerResponse({ status: 200, description: 'List of roles' })
  async getRoles(): Promise<any[]> {
    return this.adminService.getRoles();
  }

  @Get('permissions')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'List all system permissions' })
  @SwaggerResponse({ status: 200, type: [PermissionResponseDto] })
  async getPermissions(): Promise<PermissionResponseDto[]> {
    return this.adminService.getPermissions();
  }

  @Get('permission-groups')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'List permission groups with permissions' })
  @SwaggerResponse({ status: 200, type: [PermissionGroupResponseDto] })
  async getPermissionGroups(): Promise<PermissionGroupResponseDto[]> {
    return this.adminService.getPermissionGroups();
  }

  @Post('permission-groups')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new permission group' })
  @SwaggerResponse({ status: 201, type: PermissionGroupResponseDto })
  async createPermissionGroup(
    @Req() req: any,
    @Body() dto: CreatePermissionGroupDto,
  ): Promise<PermissionGroupResponseDto> {
    return this.adminService.createPermissionGroup(dto, req.user.userId);
  }

  @Post('permissions')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new granular permission' })
  @SwaggerResponse({ status: 201, type: PermissionResponseDto })
  async createPermission(
    @Req() req: any,
    @Body() dto: CreatePermissionDto,
  ): Promise<PermissionResponseDto> {
    return this.adminService.createPermission(dto, req.user.userId);
  }

  @Put('roles/:id/permissions')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Assign permissions to a role' })
  @ApiParam({ name: 'id', description: 'Role ID' })
  @SwaggerResponse({ status: 200, description: 'Role updated with permissions' })
  async assignRolePermissions(
    @Req() req: any,
    @Param('id') id: string,
    @Body() dto: AssignRolePermissionsDto,
  ): Promise<any> {
    return this.adminService.assignRolePermissions(id, dto, req.user.userId);
  }

  @Get('permission-matrix')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get complete Role-Permission matrix' })
  @SwaggerResponse({ status: 200, description: 'Matrix of roles and assigned permission codes' })
  async getPermissionMatrix(): Promise<any> {
    return this.adminService.getPermissionMatrix();
  }

  // ─── Organization Management ──────────────────────────────────────────

  @Post('organizations')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create an organization profile' })
  @SwaggerResponse({ status: 201, type: OrganizationResponseDto })
  async createOrganization(
    @Req() req: any,
    @Body() dto: CreateOrganizationDto,
  ): Promise<OrganizationResponseDto> {
    return this.adminService.createOrganization(dto, req.user.userId);
  }

  @Get('organizations')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'List all registered organizations' })
  @SwaggerResponse({ status: 200, type: [OrganizationResponseDto] })
  async getOrganizations(): Promise<OrganizationResponseDto[]> {
    return this.adminService.getOrganizations();
  }

  @Get('organizations/:id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get organization details' })
  @ApiParam({ name: 'id', description: 'Organization ID' })
  @SwaggerResponse({ status: 200, type: OrganizationResponseDto })
  async getOrganizationById(@Param('id') id: string): Promise<OrganizationResponseDto> {
    return this.adminService.getOrganizationById(id);
  }

  @Put('organizations/:id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Update organization details and settings' })
  @ApiParam({ name: 'id', description: 'Organization ID' })
  @SwaggerResponse({ status: 200, type: OrganizationResponseDto })
  async updateOrganization(
    @Req() req: any,
    @Param('id') id: string,
    @Body() dto: Partial<CreateOrganizationDto>,
  ): Promise<OrganizationResponseDto> {
    return this.adminService.updateOrganization(id, dto, req.user.userId);
  }

  @Delete('organizations/:id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Soft-delete an organization' })
  @ApiParam({ name: 'id', description: 'Organization ID' })
  @SwaggerResponse({ status: 200, description: 'Organization soft-deleted' })
  async softDeleteOrganization(@Req() req: any, @Param('id') id: string): Promise<any> {
    return this.adminService.softDeleteOrganization(id, req.user.userId);
  }

  // ─── Platform Configuration ─────────────────────────────────────────────

  @Get('settings')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get system settings by category or all' })
  @ApiQuery({ name: 'category', required: false, enum: ['GENERAL', 'SECURITY', 'STORAGE', 'API_LIMITS', 'MAINTENANCE', 'FEATURE_TOGGLES'] })
  @SwaggerResponse({ status: 200, type: [PlatformSettingResponseDto] })
  async getSettings(@Query('category') category?: string): Promise<PlatformSettingResponseDto[]> {
    return this.adminService.getSettings(category);
  }

  @Put('settings')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Upsert platform configuration setting' })
  @SwaggerResponse({ status: 200, type: PlatformSettingResponseDto })
  async upsertSetting(
    @Req() req: any,
    @Body() dto: UpsertPlatformSettingDto,
  ): Promise<PlatformSettingResponseDto> {
    return this.adminService.upsertSetting(dto, req.user.userId);
  }

  // ─── Audit Logs ────────────────────────────────────────────────────────

  @Get('audit-logs')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get global system audit trail' })
  @SwaggerResponse({ status: 200, type: [AuditLogResponseDto] })
  async getAuditLogs(): Promise<AuditLogResponseDto[]> {
    return this.adminService.getAuditLogs();
  }
}

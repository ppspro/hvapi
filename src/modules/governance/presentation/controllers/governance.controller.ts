import {
  Controller, Get, Post, Put, Delete, Body, Param, Query, UseGuards, Req, HttpCode, HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse as SwaggerResponse, ApiBearerAuth, ApiParam, ApiQuery } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { GovernanceService } from '../../application/use-cases/governance.service';
import {
  SystemConfigurationResponseDto, FeatureFlagResponseDto, MasterDataCategoryResponseDto,
  MasterDataItemResponseDto, PlatformGovernancePolicyResponseDto, MaintenanceConfigurationResponseDto,
  GovernanceAuditLogResponseDto, GovernanceDashboardResponseDto,
} from '../dto/governance-response.dto';
import {
  CreateConfigurationDto, UpdateConfigurationDto, ImportConfigurationsDto,
  CreateFeatureFlagDto, CreateMasterCategoryDto, CreateMasterItemDto,
  CreatePlatformPolicyDto, UpdateMaintenanceModeDto,
} from '../dto/governance-enterprise.dto';

@ApiTags('Governance')
@Controller('governance')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth('JWT-Auth')
export class GovernanceController {
  constructor(private readonly governanceService: GovernanceService) {}

  // ─── Dashboard ─────────────────────────────────────────────────────────

  @Get('dashboard')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get Enterprise Governance Dashboard summary' })
  @SwaggerResponse({ status: 200, type: GovernanceDashboardResponseDto })
  async getDashboard(): Promise<GovernanceDashboardResponseDto> {
    return this.governanceService.getDashboardSummary();
  }

  // ─── System Configurations ───────────────────────────────────────────────

  @Post('configurations')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new system configuration key-value entry' })
  @SwaggerResponse({ status: 201, type: SystemConfigurationResponseDto })
  async createConfiguration(
    @Req() req: any,
    @Body() dto: CreateConfigurationDto,
  ): Promise<SystemConfigurationResponseDto> {
    return this.governanceService.createConfiguration(req.user.userId, dto);
  }

  @Get('configurations')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'List all system configurations, optionally filtered by category' })
  @ApiQuery({ name: 'category', required: false })
  @SwaggerResponse({ status: 200, type: [SystemConfigurationResponseDto] })
  async getConfigurations(@Query('category') category?: string): Promise<SystemConfigurationResponseDto[]> {
    return this.governanceService.getConfigurations(category);
  }

  @Get('configurations/export')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Export system configurations in JSON format' })
  @ApiQuery({ name: 'category', required: false })
  @SwaggerResponse({ status: 200, type: [SystemConfigurationResponseDto] })
  async exportConfigurations(@Query('category') category?: string): Promise<SystemConfigurationResponseDto[]> {
    return this.governanceService.exportConfigurations(category);
  }

  @Post('configurations/import')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Bulk import system configurations' })
  @SwaggerResponse({ status: 200, description: 'Import summary' })
  async importConfigurations(
    @Req() req: any,
    @Body() dto: ImportConfigurationsDto,
  ): Promise<{ imported: number }> {
    return this.governanceService.importConfigurations(dto, req.user.userId);
  }

  @Get('configurations/:id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get system configuration by ID' })
  @ApiParam({ name: 'id', description: 'Configuration ID' })
  @SwaggerResponse({ status: 200, type: SystemConfigurationResponseDto })
  async getConfigurationById(@Param('id') id: string): Promise<SystemConfigurationResponseDto> {
    return this.governanceService.getConfigurationById(id);
  }

  @Put('configurations/:id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Update system configuration value and increment version' })
  @ApiParam({ name: 'id', description: 'Configuration ID' })
  @SwaggerResponse({ status: 200, type: SystemConfigurationResponseDto })
  async updateConfiguration(
    @Req() req: any,
    @Param('id') id: string,
    @Body() dto: UpdateConfigurationDto,
  ): Promise<SystemConfigurationResponseDto> {
    return this.governanceService.updateConfiguration(id, dto, req.user.userId);
  }

  @Delete('configurations/:id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Soft-delete system configuration entry' })
  @ApiParam({ name: 'id', description: 'Configuration ID' })
  @SwaggerResponse({ status: 200, description: 'Configuration soft-deleted' })
  async softDeleteConfiguration(@Req() req: any, @Param('id') id: string): Promise<any> {
    return this.governanceService.softDeleteConfiguration(id, req.user.userId);
  }

  // ─── Feature Flags ───────────────────────────────────────────────────────

  @Post('features')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new feature flag with rollout rules' })
  @SwaggerResponse({ status: 201, type: FeatureFlagResponseDto })
  async createFeatureFlag(@Req() req: any, @Body() dto: CreateFeatureFlagDto): Promise<FeatureFlagResponseDto> {
    return this.governanceService.createFeatureFlag(req.user.userId, dto);
  }

  @Get('features')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'List all feature flags' })
  @SwaggerResponse({ status: 200, type: [FeatureFlagResponseDto] })
  async getFeatureFlags(): Promise<FeatureFlagResponseDto[]> {
    return this.governanceService.getFeatureFlags();
  }

  @Get('features/:id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get feature flag details by ID' })
  @ApiParam({ name: 'id', description: 'Feature Flag ID' })
  @SwaggerResponse({ status: 200, type: FeatureFlagResponseDto })
  async getFeatureFlagById(@Param('id') id: string): Promise<FeatureFlagResponseDto> {
    return this.governanceService.getFeatureFlagById(id);
  }

  @Put('features/:id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Update feature flag status, roles, or rollout percentage' })
  @ApiParam({ name: 'id', description: 'Feature Flag ID' })
  @SwaggerResponse({ status: 200, type: FeatureFlagResponseDto })
  async updateFeatureFlag(
    @Req() req: any,
    @Param('id') id: string,
    @Body() dto: Partial<CreateFeatureFlagDto>,
  ): Promise<FeatureFlagResponseDto> {
    return this.governanceService.updateFeatureFlag(id, dto, req.user.userId);
  }

  @Delete('features/:id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Soft-delete a feature flag' })
  @ApiParam({ name: 'id', description: 'Feature Flag ID' })
  @SwaggerResponse({ status: 200, description: 'Feature Flag soft-deleted' })
  async softDeleteFeatureFlag(@Req() req: any, @Param('id') id: string): Promise<any> {
    return this.governanceService.softDeleteFeatureFlag(id, req.user.userId);
  }

  // ─── Master Data ─────────────────────────────────────────────────────────

  @Post('master-data/categories')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a master data category' })
  @SwaggerResponse({ status: 201, type: MasterDataCategoryResponseDto })
  async createMasterCategory(
    @Req() req: any,
    @Body() dto: CreateMasterCategoryDto,
  ): Promise<MasterDataCategoryResponseDto> {
    return this.governanceService.createMasterCategory(req.user.userId, dto);
  }

  @Get('master-data/categories')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'List all master data categories with items' })
  @SwaggerResponse({ status: 200, type: [MasterDataCategoryResponseDto] })
  async getMasterCategories(): Promise<MasterDataCategoryResponseDto[]> {
    return this.governanceService.getMasterCategories();
  }

  @Post('master-data/items')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a master data item under a category' })
  @SwaggerResponse({ status: 201, type: MasterDataItemResponseDto })
  async createMasterItem(
    @Req() req: any,
    @Body() dto: CreateMasterItemDto,
  ): Promise<MasterDataItemResponseDto> {
    return this.governanceService.createMasterItem(req.user.userId, dto);
  }

  @Get('master-data/items')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'List master data items, optionally filtered by category' })
  @ApiQuery({ name: 'categoryId', required: false })
  @SwaggerResponse({ status: 200, type: [MasterDataItemResponseDto] })
  async getMasterItems(@Query('categoryId') categoryId?: string): Promise<MasterDataItemResponseDto[]> {
    return this.governanceService.getMasterItems(categoryId);
  }

  @Put('master-data/items/:id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Update master data item' })
  @ApiParam({ name: 'id', description: 'Item ID' })
  @SwaggerResponse({ status: 200, type: MasterDataItemResponseDto })
  async updateMasterItem(
    @Req() req: any,
    @Param('id') id: string,
    @Body() dto: Partial<CreateMasterItemDto>,
  ): Promise<MasterDataItemResponseDto> {
    return this.governanceService.updateMasterItem(id, dto, req.user.userId);
  }

  @Delete('master-data/items/:id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Soft-delete a master data item' })
  @ApiParam({ name: 'id', description: 'Item ID' })
  @SwaggerResponse({ status: 200, description: 'Master data item soft-deleted' })
  async softDeleteMasterItem(@Req() req: any, @Param('id') id: string): Promise<any> {
    return this.governanceService.softDeleteMasterItem(id, req.user.userId);
  }

  // ─── Platform Governance Policies ────────────────────────────────────────

  @Post('policies')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new platform governance policy' })
  @SwaggerResponse({ status: 201, type: PlatformGovernancePolicyResponseDto })
  async createPolicy(
    @Req() req: any,
    @Body() dto: CreatePlatformPolicyDto,
  ): Promise<PlatformGovernancePolicyResponseDto> {
    return this.governanceService.createPolicy(req.user.userId, dto);
  }

  @Get('policies')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'List all platform governance policies' })
  @SwaggerResponse({ status: 200, type: [PlatformGovernancePolicyResponseDto] })
  async getPolicies(): Promise<PlatformGovernancePolicyResponseDto[]> {
    return this.governanceService.getPolicies();
  }

  @Get('policies/:id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get policy details by ID' })
  @ApiParam({ name: 'id', description: 'Policy ID' })
  @SwaggerResponse({ status: 200, type: PlatformGovernancePolicyResponseDto })
  async getPolicyById(@Param('id') id: string): Promise<PlatformGovernancePolicyResponseDto> {
    return this.governanceService.getPolicyById(id);
  }

  @Put('policies/:id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Update policy title, content, or version' })
  @ApiParam({ name: 'id', description: 'Policy ID' })
  @SwaggerResponse({ status: 200, type: PlatformGovernancePolicyResponseDto })
  async updatePolicy(
    @Req() req: any,
    @Param('id') id: string,
    @Body() dto: Partial<CreatePlatformPolicyDto>,
  ): Promise<PlatformGovernancePolicyResponseDto> {
    return this.governanceService.updatePolicy(id, dto, req.user.userId);
  }

  @Delete('policies/:id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Soft-delete a platform policy' })
  @ApiParam({ name: 'id', description: 'Policy ID' })
  @SwaggerResponse({ status: 200, description: 'Policy soft-deleted' })
  async softDeletePolicy(@Req() req: any, @Param('id') id: string): Promise<any> {
    return this.governanceService.softDeletePolicy(id, req.user.userId);
  }

  // ─── Maintenance Mode ────────────────────────────────────────────────────

  @Get('maintenance')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get active platform maintenance configuration' })
  @SwaggerResponse({ status: 200, type: MaintenanceConfigurationResponseDto })
  async getMaintenanceConfig(): Promise<MaintenanceConfigurationResponseDto> {
    return this.governanceService.getMaintenanceConfig();
  }

  @Put('maintenance')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Set or update platform maintenance mode (OFF / READ_ONLY / FULL)' })
  @SwaggerResponse({ status: 200, type: MaintenanceConfigurationResponseDto })
  async updateMaintenanceConfig(
    @Req() req: any,
    @Body() dto: UpdateMaintenanceModeDto,
  ): Promise<MaintenanceConfigurationResponseDto> {
    return this.governanceService.updateMaintenanceConfig(dto, req.user.userId);
  }

  // ─── Governance Audit Logs ───────────────────────────────────────────────

  @Get('audit')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'List governance audit logs' })
  @ApiQuery({ name: 'entityType', required: false })
  @SwaggerResponse({ status: 200, type: [GovernanceAuditLogResponseDto] })
  async getAuditLogs(@Query('entityType') entityType?: string): Promise<GovernanceAuditLogResponseDto[]> {
    return this.governanceService.getAuditLogs(entityType);
  }

  @Get('audit/:id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get governance audit log detail by ID' })
  @ApiParam({ name: 'id', description: 'Audit Log ID' })
  @SwaggerResponse({ status: 200, type: GovernanceAuditLogResponseDto })
  async getAuditLogById(@Param('id') id: string): Promise<GovernanceAuditLogResponseDto> {
    return this.governanceService.getAuditLogById(id);
  }
}

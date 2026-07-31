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
exports.GovernanceController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const passport_1 = require("@nestjs/passport");
const governance_service_1 = require("../../application/use-cases/governance.service");
const governance_response_dto_1 = require("../dto/governance-response.dto");
const governance_enterprise_dto_1 = require("../dto/governance-enterprise.dto");
let GovernanceController = class GovernanceController {
    constructor(governanceService) {
        this.governanceService = governanceService;
    }
    async getDashboard() {
        return this.governanceService.getDashboardSummary();
    }
    async createConfiguration(req, dto) {
        return this.governanceService.createConfiguration(req.user.userId, dto);
    }
    async getConfigurations(category) {
        return this.governanceService.getConfigurations(category);
    }
    async exportConfigurations(category) {
        return this.governanceService.exportConfigurations(category);
    }
    async importConfigurations(req, dto) {
        return this.governanceService.importConfigurations(dto, req.user.userId);
    }
    async getConfigurationById(id) {
        return this.governanceService.getConfigurationById(id);
    }
    async updateConfiguration(req, id, dto) {
        return this.governanceService.updateConfiguration(id, dto, req.user.userId);
    }
    async softDeleteConfiguration(req, id) {
        return this.governanceService.softDeleteConfiguration(id, req.user.userId);
    }
    async createFeatureFlag(req, dto) {
        return this.governanceService.createFeatureFlag(req.user.userId, dto);
    }
    async getFeatureFlags() {
        return this.governanceService.getFeatureFlags();
    }
    async getFeatureFlagById(id) {
        return this.governanceService.getFeatureFlagById(id);
    }
    async updateFeatureFlag(req, id, dto) {
        return this.governanceService.updateFeatureFlag(id, dto, req.user.userId);
    }
    async softDeleteFeatureFlag(req, id) {
        return this.governanceService.softDeleteFeatureFlag(id, req.user.userId);
    }
    async createMasterCategory(req, dto) {
        return this.governanceService.createMasterCategory(req.user.userId, dto);
    }
    async getMasterCategories() {
        return this.governanceService.getMasterCategories();
    }
    async createMasterItem(req, dto) {
        return this.governanceService.createMasterItem(req.user.userId, dto);
    }
    async getMasterItems(categoryId) {
        return this.governanceService.getMasterItems(categoryId);
    }
    async updateMasterItem(req, id, dto) {
        return this.governanceService.updateMasterItem(id, dto, req.user.userId);
    }
    async softDeleteMasterItem(req, id) {
        return this.governanceService.softDeleteMasterItem(id, req.user.userId);
    }
    async createPolicy(req, dto) {
        return this.governanceService.createPolicy(req.user.userId, dto);
    }
    async getPolicies() {
        return this.governanceService.getPolicies();
    }
    async getPolicyById(id) {
        return this.governanceService.getPolicyById(id);
    }
    async updatePolicy(req, id, dto) {
        return this.governanceService.updatePolicy(id, dto, req.user.userId);
    }
    async softDeletePolicy(req, id) {
        return this.governanceService.softDeletePolicy(id, req.user.userId);
    }
    async getMaintenanceConfig() {
        return this.governanceService.getMaintenanceConfig();
    }
    async updateMaintenanceConfig(req, dto) {
        return this.governanceService.updateMaintenanceConfig(dto, req.user.userId);
    }
    async getAuditLogs(entityType) {
        return this.governanceService.getAuditLogs(entityType);
    }
    async getAuditLogById(id) {
        return this.governanceService.getAuditLogById(id);
    }
};
exports.GovernanceController = GovernanceController;
__decorate([
    (0, common_1.Get)('dashboard'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Get Enterprise Governance Dashboard summary' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: governance_response_dto_1.GovernanceDashboardResponseDto }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], GovernanceController.prototype, "getDashboard", null);
__decorate([
    (0, common_1.Post)('configurations'),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new system configuration key-value entry' }),
    (0, swagger_1.ApiResponse)({ status: 201, type: governance_response_dto_1.SystemConfigurationResponseDto }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, governance_enterprise_dto_1.CreateConfigurationDto]),
    __metadata("design:returntype", Promise)
], GovernanceController.prototype, "createConfiguration", null);
__decorate([
    (0, common_1.Get)('configurations'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'List all system configurations, optionally filtered by category' }),
    (0, swagger_1.ApiQuery)({ name: 'category', required: false }),
    (0, swagger_1.ApiResponse)({ status: 200, type: [governance_response_dto_1.SystemConfigurationResponseDto] }),
    __param(0, (0, common_1.Query)('category')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], GovernanceController.prototype, "getConfigurations", null);
__decorate([
    (0, common_1.Get)('configurations/export'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Export system configurations in JSON format' }),
    (0, swagger_1.ApiQuery)({ name: 'category', required: false }),
    (0, swagger_1.ApiResponse)({ status: 200, type: [governance_response_dto_1.SystemConfigurationResponseDto] }),
    __param(0, (0, common_1.Query)('category')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], GovernanceController.prototype, "exportConfigurations", null);
__decorate([
    (0, common_1.Post)('configurations/import'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Bulk import system configurations' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Import summary' }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, governance_enterprise_dto_1.ImportConfigurationsDto]),
    __metadata("design:returntype", Promise)
], GovernanceController.prototype, "importConfigurations", null);
__decorate([
    (0, common_1.Get)('configurations/:id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Get system configuration by ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Configuration ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: governance_response_dto_1.SystemConfigurationResponseDto }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], GovernanceController.prototype, "getConfigurationById", null);
__decorate([
    (0, common_1.Put)('configurations/:id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Update system configuration value and increment version' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Configuration ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: governance_response_dto_1.SystemConfigurationResponseDto }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, governance_enterprise_dto_1.UpdateConfigurationDto]),
    __metadata("design:returntype", Promise)
], GovernanceController.prototype, "updateConfiguration", null);
__decorate([
    (0, common_1.Delete)('configurations/:id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Soft-delete system configuration entry' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Configuration ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Configuration soft-deleted' }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], GovernanceController.prototype, "softDeleteConfiguration", null);
__decorate([
    (0, common_1.Post)('features'),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new feature flag with rollout rules' }),
    (0, swagger_1.ApiResponse)({ status: 201, type: governance_response_dto_1.FeatureFlagResponseDto }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, governance_enterprise_dto_1.CreateFeatureFlagDto]),
    __metadata("design:returntype", Promise)
], GovernanceController.prototype, "createFeatureFlag", null);
__decorate([
    (0, common_1.Get)('features'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'List all feature flags' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: [governance_response_dto_1.FeatureFlagResponseDto] }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], GovernanceController.prototype, "getFeatureFlags", null);
__decorate([
    (0, common_1.Get)('features/:id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Get feature flag details by ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Feature Flag ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: governance_response_dto_1.FeatureFlagResponseDto }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], GovernanceController.prototype, "getFeatureFlagById", null);
__decorate([
    (0, common_1.Put)('features/:id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Update feature flag status, roles, or rollout percentage' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Feature Flag ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: governance_response_dto_1.FeatureFlagResponseDto }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", Promise)
], GovernanceController.prototype, "updateFeatureFlag", null);
__decorate([
    (0, common_1.Delete)('features/:id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Soft-delete a feature flag' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Feature Flag ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Feature Flag soft-deleted' }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], GovernanceController.prototype, "softDeleteFeatureFlag", null);
__decorate([
    (0, common_1.Post)('master-data/categories'),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, swagger_1.ApiOperation)({ summary: 'Create a master data category' }),
    (0, swagger_1.ApiResponse)({ status: 201, type: governance_response_dto_1.MasterDataCategoryResponseDto }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, governance_enterprise_dto_1.CreateMasterCategoryDto]),
    __metadata("design:returntype", Promise)
], GovernanceController.prototype, "createMasterCategory", null);
__decorate([
    (0, common_1.Get)('master-data/categories'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'List all master data categories with items' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: [governance_response_dto_1.MasterDataCategoryResponseDto] }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], GovernanceController.prototype, "getMasterCategories", null);
__decorate([
    (0, common_1.Post)('master-data/items'),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, swagger_1.ApiOperation)({ summary: 'Create a master data item under a category' }),
    (0, swagger_1.ApiResponse)({ status: 201, type: governance_response_dto_1.MasterDataItemResponseDto }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, governance_enterprise_dto_1.CreateMasterItemDto]),
    __metadata("design:returntype", Promise)
], GovernanceController.prototype, "createMasterItem", null);
__decorate([
    (0, common_1.Get)('master-data/items'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'List master data items, optionally filtered by category' }),
    (0, swagger_1.ApiQuery)({ name: 'categoryId', required: false }),
    (0, swagger_1.ApiResponse)({ status: 200, type: [governance_response_dto_1.MasterDataItemResponseDto] }),
    __param(0, (0, common_1.Query)('categoryId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], GovernanceController.prototype, "getMasterItems", null);
__decorate([
    (0, common_1.Put)('master-data/items/:id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Update master data item' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Item ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: governance_response_dto_1.MasterDataItemResponseDto }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", Promise)
], GovernanceController.prototype, "updateMasterItem", null);
__decorate([
    (0, common_1.Delete)('master-data/items/:id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Soft-delete a master data item' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Item ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Master data item soft-deleted' }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], GovernanceController.prototype, "softDeleteMasterItem", null);
__decorate([
    (0, common_1.Post)('policies'),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new platform governance policy' }),
    (0, swagger_1.ApiResponse)({ status: 201, type: governance_response_dto_1.PlatformGovernancePolicyResponseDto }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, governance_enterprise_dto_1.CreatePlatformPolicyDto]),
    __metadata("design:returntype", Promise)
], GovernanceController.prototype, "createPolicy", null);
__decorate([
    (0, common_1.Get)('policies'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'List all platform governance policies' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: [governance_response_dto_1.PlatformGovernancePolicyResponseDto] }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], GovernanceController.prototype, "getPolicies", null);
__decorate([
    (0, common_1.Get)('policies/:id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Get policy details by ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Policy ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: governance_response_dto_1.PlatformGovernancePolicyResponseDto }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], GovernanceController.prototype, "getPolicyById", null);
__decorate([
    (0, common_1.Put)('policies/:id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Update policy title, content, or version' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Policy ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: governance_response_dto_1.PlatformGovernancePolicyResponseDto }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", Promise)
], GovernanceController.prototype, "updatePolicy", null);
__decorate([
    (0, common_1.Delete)('policies/:id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Soft-delete a platform policy' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Policy ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Policy soft-deleted' }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], GovernanceController.prototype, "softDeletePolicy", null);
__decorate([
    (0, common_1.Get)('maintenance'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Get active platform maintenance configuration' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: governance_response_dto_1.MaintenanceConfigurationResponseDto }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], GovernanceController.prototype, "getMaintenanceConfig", null);
__decorate([
    (0, common_1.Put)('maintenance'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Set or update platform maintenance mode (OFF / READ_ONLY / FULL)' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: governance_response_dto_1.MaintenanceConfigurationResponseDto }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, governance_enterprise_dto_1.UpdateMaintenanceModeDto]),
    __metadata("design:returntype", Promise)
], GovernanceController.prototype, "updateMaintenanceConfig", null);
__decorate([
    (0, common_1.Get)('audit'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'List governance audit logs' }),
    (0, swagger_1.ApiQuery)({ name: 'entityType', required: false }),
    (0, swagger_1.ApiResponse)({ status: 200, type: [governance_response_dto_1.GovernanceAuditLogResponseDto] }),
    __param(0, (0, common_1.Query)('entityType')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], GovernanceController.prototype, "getAuditLogs", null);
__decorate([
    (0, common_1.Get)('audit/:id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Get governance audit log detail by ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Audit Log ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: governance_response_dto_1.GovernanceAuditLogResponseDto }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], GovernanceController.prototype, "getAuditLogById", null);
exports.GovernanceController = GovernanceController = __decorate([
    (0, swagger_1.ApiTags)('Governance'),
    (0, common_1.Controller)('governance'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, swagger_1.ApiBearerAuth)('JWT-Auth'),
    __metadata("design:paramtypes", [governance_service_1.GovernanceService])
], GovernanceController);
//# sourceMappingURL=governance.controller.js.map
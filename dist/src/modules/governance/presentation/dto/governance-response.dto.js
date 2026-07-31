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
exports.GovernanceDashboardResponseDto = exports.GovernanceAuditLogResponseDto = exports.MaintenanceConfigurationResponseDto = exports.PlatformGovernancePolicyResponseDto = exports.MasterDataCategoryResponseDto = exports.MasterDataItemResponseDto = exports.FeatureFlagResponseDto = exports.SystemConfigurationResponseDto = exports.ConfigurationVersionResponseDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class ConfigurationVersionResponseDto {
}
exports.ConfigurationVersionResponseDto = ConfigurationVersionResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], ConfigurationVersionResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], ConfigurationVersionResponseDto.prototype, "version", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true }),
    __metadata("design:type", String)
], ConfigurationVersionResponseDto.prototype, "previousValue", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], ConfigurationVersionResponseDto.prototype, "newValue", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true }),
    __metadata("design:type", String)
], ConfigurationVersionResponseDto.prototype, "changedBy", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true }),
    __metadata("design:type", String)
], ConfigurationVersionResponseDto.prototype, "changeReason", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], ConfigurationVersionResponseDto.prototype, "createdAt", void 0);
class SystemConfigurationResponseDto {
}
exports.SystemConfigurationResponseDto = SystemConfigurationResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], SystemConfigurationResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], SystemConfigurationResponseDto.prototype, "category", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], SystemConfigurationResponseDto.prototype, "key", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], SystemConfigurationResponseDto.prototype, "value", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], SystemConfigurationResponseDto.prototype, "valueType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true }),
    __metadata("design:type", String)
], SystemConfigurationResponseDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Boolean)
], SystemConfigurationResponseDto.prototype, "isEncrypted", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Boolean)
], SystemConfigurationResponseDto.prototype, "isEditable", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], SystemConfigurationResponseDto.prototype, "version", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true }),
    __metadata("design:type", String)
], SystemConfigurationResponseDto.prototype, "createdBy", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true }),
    __metadata("design:type", String)
], SystemConfigurationResponseDto.prototype, "updatedBy", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], SystemConfigurationResponseDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [ConfigurationVersionResponseDto] }),
    __metadata("design:type", Array)
], SystemConfigurationResponseDto.prototype, "versions", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], SystemConfigurationResponseDto.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], SystemConfigurationResponseDto.prototype, "updatedAt", void 0);
class FeatureFlagResponseDto {
}
exports.FeatureFlagResponseDto = FeatureFlagResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], FeatureFlagResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], FeatureFlagResponseDto.prototype, "code", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], FeatureFlagResponseDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true }),
    __metadata("design:type", String)
], FeatureFlagResponseDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], FeatureFlagResponseDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [String] }),
    __metadata("design:type", Array)
], FeatureFlagResponseDto.prototype, "enabledForRoles", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [String] }),
    __metadata("design:type", Array)
], FeatureFlagResponseDto.prototype, "enabledForModules", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], FeatureFlagResponseDto.prototype, "rolloutPercentage", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], FeatureFlagResponseDto.prototype, "version", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], FeatureFlagResponseDto.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], FeatureFlagResponseDto.prototype, "updatedAt", void 0);
class MasterDataItemResponseDto {
}
exports.MasterDataItemResponseDto = MasterDataItemResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], MasterDataItemResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], MasterDataItemResponseDto.prototype, "categoryId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], MasterDataItemResponseDto.prototype, "code", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], MasterDataItemResponseDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true }),
    __metadata("design:type", String)
], MasterDataItemResponseDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], MasterDataItemResponseDto.prototype, "sortOrder", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Boolean)
], MasterDataItemResponseDto.prototype, "isDefault", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], MasterDataItemResponseDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], MasterDataItemResponseDto.prototype, "createdAt", void 0);
class MasterDataCategoryResponseDto {
}
exports.MasterDataCategoryResponseDto = MasterDataCategoryResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], MasterDataCategoryResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], MasterDataCategoryResponseDto.prototype, "code", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], MasterDataCategoryResponseDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true }),
    __metadata("design:type", String)
], MasterDataCategoryResponseDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], MasterDataCategoryResponseDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [MasterDataItemResponseDto] }),
    __metadata("design:type", Array)
], MasterDataCategoryResponseDto.prototype, "items", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], MasterDataCategoryResponseDto.prototype, "createdAt", void 0);
class PlatformGovernancePolicyResponseDto {
}
exports.PlatformGovernancePolicyResponseDto = PlatformGovernancePolicyResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], PlatformGovernancePolicyResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], PlatformGovernancePolicyResponseDto.prototype, "code", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], PlatformGovernancePolicyResponseDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true }),
    __metadata("design:type", String)
], PlatformGovernancePolicyResponseDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], PlatformGovernancePolicyResponseDto.prototype, "content", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], PlatformGovernancePolicyResponseDto.prototype, "version", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true }),
    __metadata("design:type", String)
], PlatformGovernancePolicyResponseDto.prototype, "effectiveDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], PlatformGovernancePolicyResponseDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], PlatformGovernancePolicyResponseDto.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], PlatformGovernancePolicyResponseDto.prototype, "updatedAt", void 0);
class MaintenanceConfigurationResponseDto {
}
exports.MaintenanceConfigurationResponseDto = MaintenanceConfigurationResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], MaintenanceConfigurationResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], MaintenanceConfigurationResponseDto.prototype, "mode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true }),
    __metadata("design:type", String)
], MaintenanceConfigurationResponseDto.prototype, "message", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true }),
    __metadata("design:type", String)
], MaintenanceConfigurationResponseDto.prototype, "startsAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true }),
    __metadata("design:type", String)
], MaintenanceConfigurationResponseDto.prototype, "endsAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Boolean)
], MaintenanceConfigurationResponseDto.prototype, "allowAdminAccess", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], MaintenanceConfigurationResponseDto.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], MaintenanceConfigurationResponseDto.prototype, "updatedAt", void 0);
class GovernanceAuditLogResponseDto {
}
exports.GovernanceAuditLogResponseDto = GovernanceAuditLogResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], GovernanceAuditLogResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], GovernanceAuditLogResponseDto.prototype, "entityType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], GovernanceAuditLogResponseDto.prototype, "entityId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], GovernanceAuditLogResponseDto.prototype, "action", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true }),
    __metadata("design:type", String)
], GovernanceAuditLogResponseDto.prototype, "performedBy", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true }),
    __metadata("design:type", String)
], GovernanceAuditLogResponseDto.prototype, "oldValue", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true }),
    __metadata("design:type", String)
], GovernanceAuditLogResponseDto.prototype, "newValue", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true }),
    __metadata("design:type", Object)
], GovernanceAuditLogResponseDto.prototype, "metadata", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], GovernanceAuditLogResponseDto.prototype, "createdAt", void 0);
class GovernanceDashboardResponseDto {
}
exports.GovernanceDashboardResponseDto = GovernanceDashboardResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], GovernanceDashboardResponseDto.prototype, "totalConfigurations", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], GovernanceDashboardResponseDto.prototype, "activeFeatureFlags", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], GovernanceDashboardResponseDto.prototype, "masterDataCategoriesCount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], GovernanceDashboardResponseDto.prototype, "masterDataItemsCount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], GovernanceDashboardResponseDto.prototype, "activePoliciesCount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], GovernanceDashboardResponseDto.prototype, "maintenanceMode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], GovernanceDashboardResponseDto.prototype, "recentAuditLogsCount", void 0);
//# sourceMappingURL=governance-response.dto.js.map
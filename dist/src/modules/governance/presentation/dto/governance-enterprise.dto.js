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
exports.UpdateMaintenanceModeDto = exports.CreatePlatformPolicyDto = exports.CreateMasterItemDto = exports.CreateMasterCategoryDto = exports.CreateFeatureFlagDto = exports.ImportConfigurationsDto = exports.UpdateConfigurationDto = exports.CreateConfigurationDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
class CreateConfigurationDto {
}
exports.CreateConfigurationDto = CreateConfigurationDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'SYSTEM_NAME' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateConfigurationDto.prototype, "key", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Health Vault 360 Enterprise' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateConfigurationDto.prototype, "value", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'GENERAL', enum: ['SYSTEM', 'SECURITY', 'EMAIL', 'STORAGE', 'API', 'AUTH', 'FEATURE', 'UI', 'GENERAL'], required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateConfigurationDto.prototype, "category", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'STRING', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateConfigurationDto.prototype, "valueType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Primary application title', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateConfigurationDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: false, required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CreateConfigurationDto.prototype, "isEncrypted", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: true, required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CreateConfigurationDto.prototype, "isEditable", void 0);
class UpdateConfigurationDto {
}
exports.UpdateConfigurationDto = UpdateConfigurationDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Health Vault 360 Enterprise v2' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateConfigurationDto.prototype, "value", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Annual system update', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateConfigurationDto.prototype, "changeReason", void 0);
class ImportConfigurationsDto {
}
exports.ImportConfigurationsDto = ImportConfigurationsDto;
__decorate([
    (0, swagger_1.ApiProperty)({ type: [CreateConfigurationDto] }),
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], ImportConfigurationsDto.prototype, "configurations", void 0);
class CreateFeatureFlagDto {
}
exports.CreateFeatureFlagDto = CreateFeatureFlagDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'FEATURE_AI_OCR_PROCESSING' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateFeatureFlagDto.prototype, "code", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'AI Document OCR Processing Engine' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateFeatureFlagDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Enables automated extraction of clinical reports via OCR', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateFeatureFlagDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'BETA', enum: ['ENABLED', 'DISABLED', 'BETA', 'DEPRECATED'], required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateFeatureFlagDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: ['ADMIN', 'DOCTOR'], type: [String], required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], CreateFeatureFlagDto.prototype, "enabledForRoles", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: ['ai-ocr', 'medical-record'], type: [String], required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], CreateFeatureFlagDto.prototype, "enabledForModules", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 50, required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], CreateFeatureFlagDto.prototype, "rolloutPercentage", void 0);
class CreateMasterCategoryDto {
}
exports.CreateMasterCategoryDto = CreateMasterCategoryDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'BLOOD_GROUP' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateMasterCategoryDto.prototype, "code", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Blood Group Classification' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateMasterCategoryDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Standard human blood types', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateMasterCategoryDto.prototype, "description", void 0);
class CreateMasterItemDto {
}
exports.CreateMasterItemDto = CreateMasterItemDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'cat-uuid-1' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateMasterItemDto.prototype, "categoryId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'A_POSITIVE' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateMasterItemDto.prototype, "code", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'A Positive (A+)' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateMasterItemDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'A+ Blood Type', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateMasterItemDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1, required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], CreateMasterItemDto.prototype, "sortOrder", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: true, required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CreateMasterItemDto.prototype, "isDefault", void 0);
class CreatePlatformPolicyDto {
}
exports.CreatePlatformPolicyDto = CreatePlatformPolicyDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'POL-GOV-DATA-RETENTION' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreatePlatformPolicyDto.prototype, "code", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Platform Data Retention & Archival Policy' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreatePlatformPolicyDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Mandates 7-year retention for medical records', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreatePlatformPolicyDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'All clinical documents must be persisted for a minimum of 7 years...' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreatePlatformPolicyDto.prototype, "content", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '1.0', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreatePlatformPolicyDto.prototype, "version", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2025-01-01', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreatePlatformPolicyDto.prototype, "effectiveDate", void 0);
class UpdateMaintenanceModeDto {
}
exports.UpdateMaintenanceModeDto = UpdateMaintenanceModeDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'FULL', enum: ['OFF', 'READ_ONLY', 'FULL'] }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateMaintenanceModeDto.prototype, "mode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Scheduled enterprise core upgrade in progress.', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateMaintenanceModeDto.prototype, "message", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2025-08-15T02:00:00.000Z', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateMaintenanceModeDto.prototype, "startsAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2025-08-15T04:00:00.000Z', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateMaintenanceModeDto.prototype, "endsAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: true, required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], UpdateMaintenanceModeDto.prototype, "allowAdminAccess", void 0);
//# sourceMappingURL=governance-enterprise.dto.js.map
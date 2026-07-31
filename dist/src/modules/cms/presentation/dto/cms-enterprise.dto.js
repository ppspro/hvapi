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
exports.CreateContentBlockDto = exports.CreateMediaLibraryDto = exports.CreateCmsBannerDto = exports.CreateCmsPolicyDto = exports.CreateCmsAnnouncementDto = exports.CreateCmsFaqDto = exports.CreateCmsPageDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
class CreateCmsPageDto {
}
exports.CreateCmsPageDto = CreateCmsPageDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Terms of Service' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateCmsPageDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'terms-of-service' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateCmsPageDto.prototype, "slug", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '<h1>Terms of Service</h1><p>Welcome to Health Vault 360...</p>' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateCmsPageDto.prototype, "content", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Official Terms of Service for Health Vault 360', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateCmsPageDto.prototype, "summary", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Terms of Service - Health Vault 360', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateCmsPageDto.prototype, "seoTitle", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Read the terms of service and legal agreement for Health Vault 360 users.', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateCmsPageDto.prototype, "seoDescription", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'terms, service, legal, health vault', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateCmsPageDto.prototype, "seoKeywords", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'DRAFT', enum: ['DRAFT', 'REVIEW', 'PUBLISHED', 'ARCHIVED'], required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateCmsPageDto.prototype, "status", void 0);
class CreateCmsFaqDto {
}
exports.CreateCmsFaqDto = CreateCmsFaqDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'How do I request emergency consent for family records?' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateCmsFaqDto.prototype, "question", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Navigate to Family & Consent platform, select family member, and initiate OTP authorization.' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateCmsFaqDto.prototype, "answer", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'CONSENT', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateCmsFaqDto.prototype, "category", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1, required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], CreateCmsFaqDto.prototype, "displayOrder", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'PUBLISHED', enum: ['DRAFT', 'REVIEW', 'PUBLISHED', 'ARCHIVED'], required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateCmsFaqDto.prototype, "status", void 0);
class CreateCmsAnnouncementDto {
}
exports.CreateCmsAnnouncementDto = CreateCmsAnnouncementDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'System Maintenance Scheduled for August 15' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateCmsAnnouncementDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Health Vault 360 platform will undergo routine database maintenance from 02:00 to 04:00 PKT.' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateCmsAnnouncementDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2025-08-10T00:00:00.000Z', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], CreateCmsAnnouncementDto.prototype, "startDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2025-08-15T04:00:00.000Z', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], CreateCmsAnnouncementDto.prototype, "endDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'HIGH', enum: ['LOW', 'NORMAL', 'HIGH', 'URGENT'], required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateCmsAnnouncementDto.prototype, "priority", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'PUBLISHED', enum: ['DRAFT', 'REVIEW', 'PUBLISHED', 'ARCHIVED'], required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateCmsAnnouncementDto.prototype, "status", void 0);
class CreateCmsPolicyDto {
}
exports.CreateCmsPolicyDto = CreateCmsPolicyDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'HIPAA & Data Privacy Compliance Policy' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateCmsPolicyDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'PRIVACY' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateCmsPolicyDto.prototype, "policyType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2.1', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateCmsPolicyDto.prototype, "version", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'All personal health information (PHI) is encrypted at rest and in transit...' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateCmsPolicyDto.prototype, "content", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2025-01-01', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], CreateCmsPolicyDto.prototype, "effectiveDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'PUBLISHED', enum: ['DRAFT', 'REVIEW', 'PUBLISHED', 'ARCHIVED'], required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateCmsPolicyDto.prototype, "status", void 0);
class CreateCmsBannerDto {
}
exports.CreateCmsBannerDto = CreateCmsBannerDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'National Immunisation Campaign 2025' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateCmsBannerDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'https://storage.healthvault360.com/banners/vaccine-desktop.jpg' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateCmsBannerDto.prototype, "imageUrl", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'https://storage.healthvault360.com/banners/vaccine-mobile.jpg', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateCmsBannerDto.prototype, "mobileImageUrl", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'https://healthvault360.com/immunisation', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateCmsBannerDto.prototype, "redirectUrl", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1, required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], CreateCmsBannerDto.prototype, "displayOrder", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2025-08-01T00:00:00.000Z', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], CreateCmsBannerDto.prototype, "startDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2025-08-31T23:59:59.000Z', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], CreateCmsBannerDto.prototype, "endDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'PUBLISHED', enum: ['DRAFT', 'REVIEW', 'PUBLISHED', 'ARCHIVED'], required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateCmsBannerDto.prototype, "status", void 0);
class CreateMediaLibraryDto {
}
exports.CreateMediaLibraryDto = CreateMediaLibraryDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'hospital_hero.png' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateMediaLibraryDto.prototype, "fileName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Hospital Main Building High Res.png' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateMediaLibraryDto.prototype, "originalName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '/uploads/media/2025/hospital_hero.png' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateMediaLibraryDto.prototype, "filePath", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'image/png' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateMediaLibraryDto.prototype, "mimeType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 2048000 }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], CreateMediaLibraryDto.prototype, "fileSize", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'IMAGE', enum: ['IMAGE', 'VIDEO', 'PDF', 'DOCUMENT', 'AUDIO', 'OTHER'], required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateMediaLibraryDto.prototype, "mediaType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: { width: 1920, height: 1080 }, required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsObject)(),
    __metadata("design:type", Object)
], CreateMediaLibraryDto.prototype, "metadata", void 0);
class CreateContentBlockDto {
}
exports.CreateContentBlockDto = CreateContentBlockDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Footer Help Desk Contact' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateContentBlockDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'FOOTER_HELP_DESK' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateContentBlockDto.prototype, "code", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'For support call 111-HV-360 or email support@healthvault360.com' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateContentBlockDto.prototype, "content", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'PUBLISHED', enum: ['DRAFT', 'REVIEW', 'PUBLISHED', 'ARCHIVED'], required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateContentBlockDto.prototype, "status", void 0);
//# sourceMappingURL=cms-enterprise.dto.js.map
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
exports.GenerateComplianceReportDto = exports.ResolveSecurityIncidentDto = exports.CreateSecurityIncidentDto = exports.UpdateRetentionPolicyDto = exports.CreateRetentionPolicyDto = exports.UpdateConsentDto = exports.CreateConsentDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
class CreateConsentDto {
}
exports.CreateConsentDto = CreateConsentDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'patient-uuid-1' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateConsentDto.prototype, "patientId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'TREATMENT', enum: ['TREATMENT', 'DATA_COLLECTION', 'DATA_SHARING', 'RESEARCH', 'MARKETING', 'DOCUMENT_PROCESSING', 'OTHER'], required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateConsentDto.prototype, "consentType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Authorization for clinical data processing and treatment history sharing' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateConsentDto.prototype, "purpose", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2026-12-31T23:59:59.000Z', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateConsentDto.prototype, "expiresAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'DOC_REF_SIGNED_CONSENT_FORM_123', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateConsentDto.prototype, "evidenceReference", void 0);
class UpdateConsentDto {
}
exports.UpdateConsentDto = UpdateConsentDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'GRANTED', enum: ['PENDING', 'GRANTED', 'DENIED', 'WITHDRAWN', 'EXPIRED'] }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateConsentDto.prototype, "status", void 0);
class CreateRetentionPolicyDto {
}
exports.CreateRetentionPolicyDto = CreateRetentionPolicyDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Patient Medical Records Retention' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateRetentionPolicyDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'MEDICAL_RECORDS' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateRetentionPolicyDto.prototype, "resourceType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 2555, description: 'Retention period in days (e.g. 2555 days = 7 years)', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], CreateRetentionPolicyDto.prototype, "retentionPeriodDays", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'ARCHIVE', enum: ['ARCHIVE', 'DELETE', 'ANONYMIZE'], required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateRetentionPolicyDto.prototype, "action", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: true, required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CreateRetentionPolicyDto.prototype, "isActive", void 0);
class UpdateRetentionPolicyDto {
}
exports.UpdateRetentionPolicyDto = UpdateRetentionPolicyDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Updated Policy Name', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateRetentionPolicyDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 3650, required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], UpdateRetentionPolicyDto.prototype, "retentionPeriodDays", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'ARCHIVE', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateRetentionPolicyDto.prototype, "action", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: true, required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], UpdateRetentionPolicyDto.prototype, "isActive", void 0);
class CreateSecurityIncidentDto {
}
exports.CreateSecurityIncidentDto = CreateSecurityIncidentDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Unusual Login Attempt Spikes Detected' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateSecurityIncidentDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Multiple failed authentication attempts detected from IP 192.168.1.100' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateSecurityIncidentDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'HIGH', enum: ['LOW', 'MEDIUM', 'HIGH', 'CRITICAL'], required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateSecurityIncidentDto.prototype, "severity", void 0);
class ResolveSecurityIncidentDto {
}
exports.ResolveSecurityIncidentDto = ResolveSecurityIncidentDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'IP address blocked; user password reset enforced.' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ResolveSecurityIncidentDto.prototype, "resolutionNotes", void 0);
class GenerateComplianceReportDto {
}
exports.GenerateComplianceReportDto = GenerateComplianceReportDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'HIPAA & GDPR Data Protection Audit Report Q3 2026' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], GenerateComplianceReportDto.prototype, "reportName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'HIPAA_GDPR_COMPLIANCE' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], GenerateComplianceReportDto.prototype, "reportType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: { period: 'Q3-2026', scope: 'Enterprise Health Vault 360' }, required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsObject)(),
    __metadata("design:type", Object)
], GenerateComplianceReportDto.prototype, "metadata", void 0);
//# sourceMappingURL=security-enterprise.dto.js.map
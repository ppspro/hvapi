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
exports.VerifyOCRDto = exports.UpdateOCRTemplateDto = exports.CreateOCRTemplateDto = exports.CreateOCRJobDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
class CreateOCRJobDto {
}
exports.CreateOCRJobDto = CreateOCRJobDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'attachment-uuid-1' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateOCRJobDto.prototype, "medicalAttachmentId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'LAB_REPORT', enum: ['UNKNOWN', 'HEALTH_CARD', 'PASSPORT', 'DRIVERS_LICENSE', 'INSURANCE_DOCUMENT', 'LAB_REPORT', 'DIAGNOSTIC_REPORT', 'MEDICAL_REPORT', 'PRESCRIPTION', 'REFERRAL', 'DISCHARGE_SUMMARY', 'CONSENT_FORM', 'REGISTRATION_FORM', 'VACCINATION_RECORD', 'MEDICAL_CERTIFICATE', 'OTHER'], required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateOCRJobDto.prototype, "documentType", void 0);
class CreateOCRTemplateDto {
}
exports.CreateOCRTemplateDto = CreateOCRTemplateDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'TPL_LAB_CBC' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateOCRTemplateDto.prototype, "code", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Complete Blood Count (CBC) Lab Report Template' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateOCRTemplateDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'LAB_REPORT' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateOCRTemplateDto.prototype, "documentType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: { patientName: { type: 'string', required: true }, hemoglobin: { type: 'number', min: 5, max: 20 } }, required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsObject)(),
    __metadata("design:type", Object)
], CreateOCRTemplateDto.prototype, "fieldDefinitions", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: { requireDoctorSignature: true }, required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsObject)(),
    __metadata("design:type", Object)
], CreateOCRTemplateDto.prototype, "validationRules", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: true, required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CreateOCRTemplateDto.prototype, "isActive", void 0);
class UpdateOCRTemplateDto {
}
exports.UpdateOCRTemplateDto = UpdateOCRTemplateDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Updated CBC Template Name', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateOCRTemplateDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'LAB_REPORT', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateOCRTemplateDto.prototype, "documentType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: true, required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], UpdateOCRTemplateDto.prototype, "isActive", void 0);
class VerifyOCRDto {
}
exports.VerifyOCRDto = VerifyOCRDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'APPROVED', enum: ['APPROVED', 'REJECTED', 'CORRECTED'] }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], VerifyOCRDto.prototype, "reviewStatus", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'All extracted fields verified against original scan.', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], VerifyOCRDto.prototype, "reviewNotes", void 0);
//# sourceMappingURL=ocr-enterprise.dto.js.map
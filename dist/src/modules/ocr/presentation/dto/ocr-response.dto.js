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
exports.OCRDashboardResponseDto = exports.OCRJobResponseDto = exports.OCRVerificationResponseDto = exports.OCRTemplateResponseDto = exports.ExtractedFieldResponseDto = exports.OCRPageResponseDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class OCRPageResponseDto {
}
exports.OCRPageResponseDto = OCRPageResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], OCRPageResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], OCRPageResponseDto.prototype, "ocrJobId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], OCRPageResponseDto.prototype, "pageNumber", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true }),
    __metadata("design:type", String)
], OCRPageResponseDto.prototype, "imagePath", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true }),
    __metadata("design:type", String)
], OCRPageResponseDto.prototype, "rawText", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], OCRPageResponseDto.prototype, "confidence", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], OCRPageResponseDto.prototype, "rotationAngle", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true }),
    __metadata("design:type", Object)
], OCRPageResponseDto.prototype, "processingMetadata", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], OCRPageResponseDto.prototype, "createdAt", void 0);
class ExtractedFieldResponseDto {
}
exports.ExtractedFieldResponseDto = ExtractedFieldResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], ExtractedFieldResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], ExtractedFieldResponseDto.prototype, "ocrJobId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], ExtractedFieldResponseDto.prototype, "fieldName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], ExtractedFieldResponseDto.prototype, "fieldValue", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], ExtractedFieldResponseDto.prototype, "confidence", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true }),
    __metadata("design:type", Object)
], ExtractedFieldResponseDto.prototype, "boundingBox", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], ExtractedFieldResponseDto.prototype, "validationStatus", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Boolean)
], ExtractedFieldResponseDto.prototype, "requiresReview", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], ExtractedFieldResponseDto.prototype, "createdAt", void 0);
class OCRTemplateResponseDto {
}
exports.OCRTemplateResponseDto = OCRTemplateResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], OCRTemplateResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], OCRTemplateResponseDto.prototype, "code", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], OCRTemplateResponseDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], OCRTemplateResponseDto.prototype, "documentType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true }),
    __metadata("design:type", Object)
], OCRTemplateResponseDto.prototype, "fieldDefinitions", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true }),
    __metadata("design:type", Object)
], OCRTemplateResponseDto.prototype, "validationRules", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], OCRTemplateResponseDto.prototype, "version", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Boolean)
], OCRTemplateResponseDto.prototype, "isActive", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], OCRTemplateResponseDto.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], OCRTemplateResponseDto.prototype, "updatedAt", void 0);
class OCRVerificationResponseDto {
}
exports.OCRVerificationResponseDto = OCRVerificationResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], OCRVerificationResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], OCRVerificationResponseDto.prototype, "ocrJobId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], OCRVerificationResponseDto.prototype, "reviewedBy", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], OCRVerificationResponseDto.prototype, "reviewStatus", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true }),
    __metadata("design:type", String)
], OCRVerificationResponseDto.prototype, "reviewNotes", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true }),
    __metadata("design:type", String)
], OCRVerificationResponseDto.prototype, "completedAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], OCRVerificationResponseDto.prototype, "createdAt", void 0);
class OCRJobResponseDto {
}
exports.OCRJobResponseDto = OCRJobResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], OCRJobResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], OCRJobResponseDto.prototype, "medicalAttachmentId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], OCRJobResponseDto.prototype, "documentType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], OCRJobResponseDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true }),
    __metadata("design:type", String)
], OCRJobResponseDto.prototype, "submittedBy", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true }),
    __metadata("design:type", String)
], OCRJobResponseDto.prototype, "startedAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true }),
    __metadata("design:type", String)
], OCRJobResponseDto.prototype, "completedAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true }),
    __metadata("design:type", Number)
], OCRJobResponseDto.prototype, "processingTimeMs", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true }),
    __metadata("design:type", Number)
], OCRJobResponseDto.prototype, "overallConfidence", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], OCRJobResponseDto.prototype, "confidenceLevel", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true }),
    __metadata("design:type", String)
], OCRJobResponseDto.prototype, "failureReason", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [OCRPageResponseDto] }),
    __metadata("design:type", Array)
], OCRJobResponseDto.prototype, "pages", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [ExtractedFieldResponseDto] }),
    __metadata("design:type", Array)
], OCRJobResponseDto.prototype, "extractedFields", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [OCRVerificationResponseDto] }),
    __metadata("design:type", Array)
], OCRJobResponseDto.prototype, "verifications", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], OCRJobResponseDto.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], OCRJobResponseDto.prototype, "updatedAt", void 0);
class OCRDashboardResponseDto {
}
exports.OCRDashboardResponseDto = OCRDashboardResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], OCRDashboardResponseDto.prototype, "totalJobs", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], OCRDashboardResponseDto.prototype, "completedJobs", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], OCRDashboardResponseDto.prototype, "reviewRequiredJobs", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], OCRDashboardResponseDto.prototype, "failedJobs", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], OCRDashboardResponseDto.prototype, "averageConfidence", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], OCRDashboardResponseDto.prototype, "activeTemplatesCount", void 0);
//# sourceMappingURL=ocr-response.dto.js.map
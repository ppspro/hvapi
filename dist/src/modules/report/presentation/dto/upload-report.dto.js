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
exports.VerifyReportDto = exports.ReplaceReportFileDto = exports.UpdateReportDto = exports.UploadReportDto = exports.ReportCategory = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
var ReportCategory;
(function (ReportCategory) {
    ReportCategory["LAB"] = "LAB";
    ReportCategory["RADIOLOGY"] = "RADIOLOGY";
    ReportCategory["PRESCRIPTION"] = "PRESCRIPTION";
    ReportCategory["REFERRAL"] = "REFERRAL";
    ReportCategory["DISCHARGE"] = "DISCHARGE";
    ReportCategory["VACCINATION"] = "VACCINATION";
    ReportCategory["CLINICAL_NOTES"] = "CLINICAL_NOTES";
    ReportCategory["INSURANCE"] = "INSURANCE";
    ReportCategory["CUSTOM"] = "CUSTOM";
})(ReportCategory || (exports.ReportCategory = ReportCategory = {}));
class UploadReportDto {
}
exports.UploadReportDto = UploadReportDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Complete Blood Count (CBC) Lab Report' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UploadReportDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Routine blood panel covering WBC, RBC, hemoglobin, and platelets', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UploadReportDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: ReportCategory, example: 'LAB', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(ReportCategory),
    __metadata("design:type", String)
], UploadReportDto.prototype, "category", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2026-07-30', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], UploadReportDto.prototype, "reportDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Dr. House', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UploadReportDto.prototype, "prescribedBy", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Chugtai Labs', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UploadReportDto.prototype, "providerName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Main Branch Clinic', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UploadReportDto.prototype, "facilityName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Dr. John Watson', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UploadReportDto.prototype, "doctorName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 2, required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], UploadReportDto.prototype, "pageCount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'en', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UploadReportDto.prototype, "language", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: ['blood', 'cbc', 'hematology'], type: [String], required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], UploadReportDto.prototype, "tags", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Patient felt slightly dizzy prior to sample collection', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UploadReportDto.prototype, "notes", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'cbc_report_2026.pdf' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UploadReportDto.prototype, "fileName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 524288 }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], UploadReportDto.prototype, "fileSize", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'application/pdf' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UploadReportDto.prototype, "mimeType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'https://cdn.hvapi.com/reports/2026/07/cbc_report_2026.pdf' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UploadReportDto.prototype, "storageUrl", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'reports/2026/07/cbc_report_2026.pdf', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UploadReportDto.prototype, "storageKey", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'a1b2c3d4e5f6...', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UploadReportDto.prototype, "checksum", void 0);
class UpdateReportDto {
}
exports.UpdateReportDto = UpdateReportDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Updated Report Title', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateReportDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateReportDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: ReportCategory, required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(ReportCategory),
    __metadata("design:type", String)
], UpdateReportDto.prototype, "category", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], UpdateReportDto.prototype, "reportDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateReportDto.prototype, "providerName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateReportDto.prototype, "doctorName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, type: [String] }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], UpdateReportDto.prototype, "tags", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateReportDto.prototype, "notes", void 0);
class ReplaceReportFileDto {
}
exports.ReplaceReportFileDto = ReplaceReportFileDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'cbc_report_2026_v2.pdf' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ReplaceReportFileDto.prototype, "fileName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 600000 }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], ReplaceReportFileDto.prototype, "fileSize", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'application/pdf' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ReplaceReportFileDto.prototype, "mimeType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'https://cdn.hvapi.com/reports/2026/07/cbc_report_2026_v2.pdf' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ReplaceReportFileDto.prototype, "storageUrl", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'reports/2026/07/cbc_report_2026_v2.pdf', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ReplaceReportFileDto.prototype, "storageKey", void 0);
class VerifyReportDto {
}
exports.VerifyReportDto = VerifyReportDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Verified by Lab Technician #402', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], VerifyReportDto.prototype, "notes", void 0);
//# sourceMappingURL=upload-report.dto.js.map
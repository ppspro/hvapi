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
exports.CreateReportResponseDto = exports.CreateReportDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
class CreateReportDto {
}
exports.CreateReportDto = CreateReportDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'CBC Blood Test', description: 'Title of the medical report' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateReportDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Laboratory', description: 'Category classification of the report' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateReportDto.prototype, "category", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Dr. Robert Chen', description: 'Prescribing clinician name', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateReportDto.prototype, "prescribedBy", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'cbc-report.pdf', description: 'Attachment file name' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateReportDto.prototype, "fileName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1048576, description: 'Attachment file size in bytes' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], CreateReportDto.prototype, "fileSize", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'application/pdf', description: 'Attachment MIME format type' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateReportDto.prototype, "mimeType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'https://storage.healthvault360.com/reports/cbc.pdf', description: 'Uploaded attachment S3 storage URL' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsUrl)(),
    __metadata("design:type", String)
], CreateReportDto.prototype, "storageUrl", void 0);
class CreateReportResponseDto {
}
exports.CreateReportResponseDto = CreateReportResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'report-uuid-v4', description: 'Created medical report identifier' }),
    __metadata("design:type", String)
], CreateReportResponseDto.prototype, "reportId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Medical report uploaded successfully', description: 'Success status message' }),
    __metadata("design:type", String)
], CreateReportResponseDto.prototype, "message", void 0);
//# sourceMappingURL=create-report.dto.js.map
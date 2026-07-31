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
exports.UpdateAttachmentDto = exports.CreateAttachmentDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
const create_medical_record_dto_1 = require("./create-medical-record.dto");
class CreateAttachmentDto {
}
exports.CreateAttachmentDto = CreateAttachmentDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'blood_report_2026.pdf', description: 'Target filename' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateAttachmentDto.prototype, "fileName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Blood_Test_Report_Final.pdf', description: 'Original uploaded filename' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateAttachmentDto.prototype, "originalName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1048576, description: 'File size in bytes (max 15MB)' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], CreateAttachmentDto.prototype, "fileSize", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'application/pdf', description: 'MIME content type' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateAttachmentDto.prototype, "mimeType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: create_medical_record_dto_1.AttachmentCategory, example: 'LAB_RESULT', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(create_medical_record_dto_1.AttachmentCategory),
    __metadata("design:type", String)
], CreateAttachmentDto.prototype, "category", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'attachments/2026/07/blood_report_2026.pdf', description: 'Storage key/path' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateAttachmentDto.prototype, "storageKey", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'https://cdn.hvapi.com/attachments/2026/07/blood_report_2026.pdf', description: 'CDN or direct retrieval URL' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateAttachmentDto.prototype, "storageUrl", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateAttachmentDto.prototype, "checksum", void 0);
class UpdateAttachmentDto {
}
exports.UpdateAttachmentDto = UpdateAttachmentDto;
__decorate([
    (0, swagger_1.ApiProperty)({ enum: create_medical_record_dto_1.AttachmentCategory, required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(create_medical_record_dto_1.AttachmentCategory),
    __metadata("design:type", String)
], UpdateAttachmentDto.prototype, "category", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'updated_file_name.pdf', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateAttachmentDto.prototype, "fileName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'attachments/2026/07/new_version.pdf', required: false, description: 'New storage key if uploading new version' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateAttachmentDto.prototype, "storageKey", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'https://cdn.hvapi.com/attachments/2026/07/new_version.pdf', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateAttachmentDto.prototype, "storageUrl", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 2048576, required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], UpdateAttachmentDto.prototype, "fileSize", void 0);
//# sourceMappingURL=create-attachment.dto.js.map
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
exports.MedicalTimelineItemDto = exports.MedicalRecordResponseDto = exports.AttachmentVersionResponseDto = exports.MedicalAttachmentResponseDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class MedicalAttachmentResponseDto {
}
exports.MedicalAttachmentResponseDto = MedicalAttachmentResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], MedicalAttachmentResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true }),
    __metadata("design:type", String)
], MedicalAttachmentResponseDto.prototype, "medicalRecordId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], MedicalAttachmentResponseDto.prototype, "patientProfileId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], MedicalAttachmentResponseDto.prototype, "fileName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], MedicalAttachmentResponseDto.prototype, "originalName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], MedicalAttachmentResponseDto.prototype, "fileSize", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], MedicalAttachmentResponseDto.prototype, "mimeType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], MedicalAttachmentResponseDto.prototype, "category", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], MedicalAttachmentResponseDto.prototype, "storageKey", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], MedicalAttachmentResponseDto.prototype, "storageUrl", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true }),
    __metadata("design:type", String)
], MedicalAttachmentResponseDto.prototype, "checksum", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], MedicalAttachmentResponseDto.prototype, "version", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Boolean)
], MedicalAttachmentResponseDto.prototype, "isDeleted", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], MedicalAttachmentResponseDto.prototype, "virusScanStatus", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], MedicalAttachmentResponseDto.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], MedicalAttachmentResponseDto.prototype, "updatedAt", void 0);
class AttachmentVersionResponseDto {
}
exports.AttachmentVersionResponseDto = AttachmentVersionResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], AttachmentVersionResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], AttachmentVersionResponseDto.prototype, "attachmentId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], AttachmentVersionResponseDto.prototype, "version", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], AttachmentVersionResponseDto.prototype, "storageKey", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], AttachmentVersionResponseDto.prototype, "storageUrl", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], AttachmentVersionResponseDto.prototype, "fileSize", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true }),
    __metadata("design:type", String)
], AttachmentVersionResponseDto.prototype, "createdById", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], AttachmentVersionResponseDto.prototype, "createdAt", void 0);
class MedicalRecordResponseDto {
}
exports.MedicalRecordResponseDto = MedicalRecordResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], MedicalRecordResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], MedicalRecordResponseDto.prototype, "patientProfileId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], MedicalRecordResponseDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true }),
    __metadata("design:type", String)
], MedicalRecordResponseDto.prototype, "chiefComplaint", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true }),
    __metadata("design:type", String)
], MedicalRecordResponseDto.prototype, "clinicalNotes", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true }),
    __metadata("design:type", String)
], MedicalRecordResponseDto.prototype, "treatmentPlan", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true }),
    __metadata("design:type", String)
], MedicalRecordResponseDto.prototype, "followUpInstructions", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], MedicalRecordResponseDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Boolean)
], MedicalRecordResponseDto.prototype, "isDeleted", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true }),
    __metadata("design:type", String)
], MedicalRecordResponseDto.prototype, "deletedAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [Object], required: false }),
    __metadata("design:type", Array)
], MedicalRecordResponseDto.prototype, "encounters", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [Object], required: false }),
    __metadata("design:type", Array)
], MedicalRecordResponseDto.prototype, "diagnoses", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [Object], required: false }),
    __metadata("design:type", Array)
], MedicalRecordResponseDto.prototype, "vitalSigns", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [Object], required: false }),
    __metadata("design:type", Array)
], MedicalRecordResponseDto.prototype, "procedures", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [MedicalAttachmentResponseDto], required: false }),
    __metadata("design:type", Array)
], MedicalRecordResponseDto.prototype, "attachments", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], MedicalRecordResponseDto.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], MedicalRecordResponseDto.prototype, "updatedAt", void 0);
class MedicalTimelineItemDto {
}
exports.MedicalTimelineItemDto = MedicalTimelineItemDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], MedicalTimelineItemDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'MEDICAL_RECORD' }),
    __metadata("design:type", String)
], MedicalTimelineItemDto.prototype, "eventType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], MedicalTimelineItemDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true }),
    __metadata("design:type", String)
], MedicalTimelineItemDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true }),
    __metadata("design:type", String)
], MedicalTimelineItemDto.prototype, "category", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], MedicalTimelineItemDto.prototype, "date", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: Object }),
    __metadata("design:type", Object)
], MedicalTimelineItemDto.prototype, "details", void 0);
//# sourceMappingURL=medical-record-response.dto.js.map
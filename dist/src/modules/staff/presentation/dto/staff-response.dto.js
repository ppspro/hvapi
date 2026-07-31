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
exports.StaffStatsResponseDto = exports.StaffHistoryItemDto = exports.StaffFullResponseDto = exports.StaffDocumentResponseDto = exports.StaffQualificationResponseDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class StaffQualificationResponseDto {
}
exports.StaffQualificationResponseDto = StaffQualificationResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], StaffQualificationResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], StaffQualificationResponseDto.prototype, "degreeName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], StaffQualificationResponseDto.prototype, "instituteName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], StaffQualificationResponseDto.prototype, "passingYear", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true }),
    __metadata("design:type", String)
], StaffQualificationResponseDto.prototype, "fieldOfStudy", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], StaffQualificationResponseDto.prototype, "createdAt", void 0);
class StaffDocumentResponseDto {
}
exports.StaffDocumentResponseDto = StaffDocumentResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], StaffDocumentResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], StaffDocumentResponseDto.prototype, "documentType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true }),
    __metadata("design:type", String)
], StaffDocumentResponseDto.prototype, "medicalAttachmentId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], StaffDocumentResponseDto.prototype, "verificationStatus", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], StaffDocumentResponseDto.prototype, "createdAt", void 0);
class StaffFullResponseDto {
}
exports.StaffFullResponseDto = StaffFullResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], StaffFullResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true }),
    __metadata("design:type", String)
], StaffFullResponseDto.prototype, "userId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], StaffFullResponseDto.prototype, "employeeCode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], StaffFullResponseDto.prototype, "fullName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true }),
    __metadata("design:type", String)
], StaffFullResponseDto.prototype, "gender", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true }),
    __metadata("design:type", String)
], StaffFullResponseDto.prototype, "dateOfBirth", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], StaffFullResponseDto.prototype, "phone", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true }),
    __metadata("design:type", String)
], StaffFullResponseDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true }),
    __metadata("design:type", String)
], StaffFullResponseDto.prototype, "emergencyContact", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true }),
    __metadata("design:type", String)
], StaffFullResponseDto.prototype, "profilePhotoUrl", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], StaffFullResponseDto.prototype, "staffType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], StaffFullResponseDto.prototype, "designation", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], StaffFullResponseDto.prototype, "primaryFacilityId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true }),
    __metadata("design:type", String)
], StaffFullResponseDto.prototype, "secondaryFacilityId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true }),
    __metadata("design:type", String)
], StaffFullResponseDto.prototype, "primaryDepartmentId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true }),
    __metadata("design:type", String)
], StaffFullResponseDto.prototype, "secondaryDepartmentId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true }),
    __metadata("design:type", String)
], StaffFullResponseDto.prototype, "reportingManagerId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], StaffFullResponseDto.prototype, "employmentType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], StaffFullResponseDto.prototype, "employmentStatus", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], StaffFullResponseDto.prototype, "joiningDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true }),
    __metadata("design:type", String)
], StaffFullResponseDto.prototype, "terminationDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], StaffFullResponseDto.prototype, "noticePeriodDays", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true }),
    __metadata("design:type", String)
], StaffFullResponseDto.prototype, "biography", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [String] }),
    __metadata("design:type", Array)
], StaffFullResponseDto.prototype, "languagesSpoken", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], StaffFullResponseDto.prototype, "verificationStatus", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true }),
    __metadata("design:type", String)
], StaffFullResponseDto.prototype, "verificationNotes", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true }),
    __metadata("design:type", String)
], StaffFullResponseDto.prototype, "verifiedBy", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true }),
    __metadata("design:type", String)
], StaffFullResponseDto.prototype, "verifiedAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Boolean)
], StaffFullResponseDto.prototype, "isDeleted", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [StaffQualificationResponseDto] }),
    __metadata("design:type", Array)
], StaffFullResponseDto.prototype, "qualifications", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [StaffDocumentResponseDto] }),
    __metadata("design:type", Array)
], StaffFullResponseDto.prototype, "documents", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true }),
    __metadata("design:type", String)
], StaffFullResponseDto.prototype, "qrToken", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], StaffFullResponseDto.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], StaffFullResponseDto.prototype, "updatedAt", void 0);
class StaffHistoryItemDto {
}
exports.StaffHistoryItemDto = StaffHistoryItemDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], StaffHistoryItemDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], StaffHistoryItemDto.prototype, "staffId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], StaffHistoryItemDto.prototype, "action", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true }),
    __metadata("design:type", String)
], StaffHistoryItemDto.prototype, "previousStatus", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], StaffHistoryItemDto.prototype, "newStatus", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true }),
    __metadata("design:type", String)
], StaffHistoryItemDto.prototype, "reason", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true }),
    __metadata("design:type", String)
], StaffHistoryItemDto.prototype, "performedBy", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], StaffHistoryItemDto.prototype, "createdAt", void 0);
class StaffStatsResponseDto {
}
exports.StaffStatsResponseDto = StaffStatsResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], StaffStatsResponseDto.prototype, "totalStaff", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], StaffStatsResponseDto.prototype, "verifiedStaff", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], StaffStatsResponseDto.prototype, "pendingStaff", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], StaffStatsResponseDto.prototype, "suspendedStaff", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], StaffStatsResponseDto.prototype, "activeStaff", void 0);
//# sourceMappingURL=staff-response.dto.js.map
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
exports.DoctorStatsResponseDto = exports.DoctorHistoryItemDto = exports.DoctorProfileFullResponseDto = exports.DoctorDocumentResponseDto = exports.ExperienceResponseDto = exports.CertificationResponseDto = exports.QualificationResponseDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class QualificationResponseDto {
}
exports.QualificationResponseDto = QualificationResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], QualificationResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], QualificationResponseDto.prototype, "degreeName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], QualificationResponseDto.prototype, "instituteName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], QualificationResponseDto.prototype, "passingYear", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true }),
    __metadata("design:type", String)
], QualificationResponseDto.prototype, "specialization", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], QualificationResponseDto.prototype, "createdAt", void 0);
class CertificationResponseDto {
}
exports.CertificationResponseDto = CertificationResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], CertificationResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], CertificationResponseDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], CertificationResponseDto.prototype, "issuingAuthority", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true }),
    __metadata("design:type", String)
], CertificationResponseDto.prototype, "issueDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true }),
    __metadata("design:type", String)
], CertificationResponseDto.prototype, "expiryDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], CertificationResponseDto.prototype, "createdAt", void 0);
class ExperienceResponseDto {
}
exports.ExperienceResponseDto = ExperienceResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], ExperienceResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], ExperienceResponseDto.prototype, "designation", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], ExperienceResponseDto.prototype, "hospitalName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], ExperienceResponseDto.prototype, "startDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true }),
    __metadata("design:type", String)
], ExperienceResponseDto.prototype, "endDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Boolean)
], ExperienceResponseDto.prototype, "isCurrent", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], ExperienceResponseDto.prototype, "createdAt", void 0);
class DoctorDocumentResponseDto {
}
exports.DoctorDocumentResponseDto = DoctorDocumentResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], DoctorDocumentResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], DoctorDocumentResponseDto.prototype, "documentType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true }),
    __metadata("design:type", String)
], DoctorDocumentResponseDto.prototype, "medicalAttachmentId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], DoctorDocumentResponseDto.prototype, "verificationStatus", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], DoctorDocumentResponseDto.prototype, "createdAt", void 0);
class DoctorProfileFullResponseDto {
}
exports.DoctorProfileFullResponseDto = DoctorProfileFullResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], DoctorProfileFullResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], DoctorProfileFullResponseDto.prototype, "userId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], DoctorProfileFullResponseDto.prototype, "fullName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true }),
    __metadata("design:type", String)
], DoctorProfileFullResponseDto.prototype, "gender", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true }),
    __metadata("design:type", String)
], DoctorProfileFullResponseDto.prototype, "dateOfBirth", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true }),
    __metadata("design:type", String)
], DoctorProfileFullResponseDto.prototype, "profilePhotoUrl", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true }),
    __metadata("design:type", String)
], DoctorProfileFullResponseDto.prototype, "digitalSignatureUrl", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true }),
    __metadata("design:type", String)
], DoctorProfileFullResponseDto.prototype, "biography", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true }),
    __metadata("design:type", String)
], DoctorProfileFullResponseDto.prototype, "professionalSummary", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], DoctorProfileFullResponseDto.prototype, "yearsOfExperience", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], DoctorProfileFullResponseDto.prototype, "primarySpecialization", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [String] }),
    __metadata("design:type", Array)
], DoctorProfileFullResponseDto.prototype, "secondarySpecializations", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], DoctorProfileFullResponseDto.prototype, "medicalCouncil", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], DoctorProfileFullResponseDto.prototype, "registrationNumber", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], DoctorProfileFullResponseDto.prototype, "licenseNumber", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], DoctorProfileFullResponseDto.prototype, "providerIdentifier", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true }),
    __metadata("design:type", String)
], DoctorProfileFullResponseDto.prototype, "registrationState", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true }),
    __metadata("design:type", String)
], DoctorProfileFullResponseDto.prototype, "registrationCountry", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true }),
    __metadata("design:type", String)
], DoctorProfileFullResponseDto.prototype, "registrationIssueDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true }),
    __metadata("design:type", String)
], DoctorProfileFullResponseDto.prototype, "registrationExpiryDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], DoctorProfileFullResponseDto.prototype, "verificationStatus", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true }),
    __metadata("design:type", String)
], DoctorProfileFullResponseDto.prototype, "verificationNotes", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true }),
    __metadata("design:type", String)
], DoctorProfileFullResponseDto.prototype, "verifiedBy", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true }),
    __metadata("design:type", String)
], DoctorProfileFullResponseDto.prototype, "verifiedAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true }),
    __metadata("design:type", String)
], DoctorProfileFullResponseDto.prototype, "department", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [String] }),
    __metadata("design:type", Array)
], DoctorProfileFullResponseDto.prototype, "subSpecializations", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [String] }),
    __metadata("design:type", Array)
], DoctorProfileFullResponseDto.prototype, "clinicalInterests", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [String] }),
    __metadata("design:type", Array)
], DoctorProfileFullResponseDto.prototype, "servicesOffered", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [String] }),
    __metadata("design:type", Array)
], DoctorProfileFullResponseDto.prototype, "languagesSpoken", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true }),
    __metadata("design:type", String)
], DoctorProfileFullResponseDto.prototype, "emergencyPhone", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Boolean)
], DoctorProfileFullResponseDto.prototype, "isDeleted", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [QualificationResponseDto] }),
    __metadata("design:type", Array)
], DoctorProfileFullResponseDto.prototype, "qualifications", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [CertificationResponseDto] }),
    __metadata("design:type", Array)
], DoctorProfileFullResponseDto.prototype, "certifications", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [ExperienceResponseDto] }),
    __metadata("design:type", Array)
], DoctorProfileFullResponseDto.prototype, "experiences", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [DoctorDocumentResponseDto] }),
    __metadata("design:type", Array)
], DoctorProfileFullResponseDto.prototype, "documents", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true }),
    __metadata("design:type", String)
], DoctorProfileFullResponseDto.prototype, "qrToken", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], DoctorProfileFullResponseDto.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], DoctorProfileFullResponseDto.prototype, "updatedAt", void 0);
class DoctorHistoryItemDto {
}
exports.DoctorHistoryItemDto = DoctorHistoryItemDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], DoctorHistoryItemDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], DoctorHistoryItemDto.prototype, "doctorProfileId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], DoctorHistoryItemDto.prototype, "action", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true }),
    __metadata("design:type", String)
], DoctorHistoryItemDto.prototype, "previousStatus", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], DoctorHistoryItemDto.prototype, "newStatus", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true }),
    __metadata("design:type", String)
], DoctorHistoryItemDto.prototype, "reason", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true }),
    __metadata("design:type", String)
], DoctorHistoryItemDto.prototype, "performedBy", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], DoctorHistoryItemDto.prototype, "createdAt", void 0);
class DoctorStatsResponseDto {
}
exports.DoctorStatsResponseDto = DoctorStatsResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], DoctorStatsResponseDto.prototype, "totalDoctors", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], DoctorStatsResponseDto.prototype, "verifiedDoctors", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], DoctorStatsResponseDto.prototype, "pendingDoctors", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], DoctorStatsResponseDto.prototype, "suspendedDoctors", void 0);
//# sourceMappingURL=doctor-response.dto.js.map
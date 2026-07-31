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
exports.RenewLicenseDto = exports.DoctorActionDto = exports.AttachDoctorDocumentDto = exports.AddExperienceDto = exports.AddCertificationDto = exports.AddQualificationDto = exports.RegisterDoctorDto = exports.DoctorVerificationStatus = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
var DoctorVerificationStatus;
(function (DoctorVerificationStatus) {
    DoctorVerificationStatus["PENDING"] = "PENDING";
    DoctorVerificationStatus["UNDER_REVIEW"] = "UNDER_REVIEW";
    DoctorVerificationStatus["VERIFIED"] = "VERIFIED";
    DoctorVerificationStatus["REJECTED"] = "REJECTED";
    DoctorVerificationStatus["SUSPENDED"] = "SUSPENDED";
    DoctorVerificationStatus["REVOKED"] = "REVOKED";
})(DoctorVerificationStatus || (exports.DoctorVerificationStatus = DoctorVerificationStatus = {}));
class RegisterDoctorDto {
}
exports.RegisterDoctorDto = RegisterDoctorDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Dr. Alexander Fleming, MD' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], RegisterDoctorDto.prototype, "fullName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'MALE', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], RegisterDoctorDto.prototype, "gender", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '1980-05-15', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], RegisterDoctorDto.prototype, "dateOfBirth", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'https://storage.healthvault360.com/doctors/photo-100.jpg', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], RegisterDoctorDto.prototype, "profilePhotoUrl", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'https://storage.healthvault360.com/doctors/sig-100.png', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], RegisterDoctorDto.prototype, "digitalSignatureUrl", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Consultant Cardiologist with 15+ years experience in interventional cardiology.', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], RegisterDoctorDto.prototype, "biography", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Expert in adult cardiology, echocardiography, and cardiac catheterization.', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], RegisterDoctorDto.prototype, "professionalSummary", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 15, required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], RegisterDoctorDto.prototype, "yearsOfExperience", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Cardiology' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], RegisterDoctorDto.prototype, "primarySpecialization", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: ['Interventional Cardiology', 'Echocardiography'], type: [String], required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], RegisterDoctorDto.prototype, "secondarySpecializations", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Pakistan Medical & Dental Council (PMDC)' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], RegisterDoctorDto.prototype, "medicalCouncil", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'PMC-REG-998877', description: 'Unique medical registration number' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], RegisterDoctorDto.prototype, "registrationNumber", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'LIC-2026-CARDIO-1', description: 'Unique medical license number' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], RegisterDoctorDto.prototype, "licenseNumber", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Federal / Punjab', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], RegisterDoctorDto.prototype, "registrationState", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Pakistan', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], RegisterDoctorDto.prototype, "registrationCountry", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2020-01-01', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], RegisterDoctorDto.prototype, "registrationIssueDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2027-12-31', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], RegisterDoctorDto.prototype, "registrationExpiryDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Department of Cardiology', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], RegisterDoctorDto.prototype, "department", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: ['Coronary Angioplasty', 'Heart Failure Management'], type: [String], required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], RegisterDoctorDto.prototype, "subSpecializations", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: ['Valvular Heart Disease', 'Hypertension'], type: [String], required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], RegisterDoctorDto.prototype, "clinicalInterests", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: ['ECG', 'ECHO', 'Angiography Consultation'], type: [String], required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], RegisterDoctorDto.prototype, "servicesOffered", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: ['English', 'Urdu'], type: [String], required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], RegisterDoctorDto.prototype, "languagesSpoken", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '+92-300-1234567', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], RegisterDoctorDto.prototype, "emergencyPhone", void 0);
class AddQualificationDto {
}
exports.AddQualificationDto = AddQualificationDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'MBBS' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AddQualificationDto.prototype, "degreeName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'King Edward Medical University' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AddQualificationDto.prototype, "instituteName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 2008 }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], AddQualificationDto.prototype, "passingYear", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'General Medicine & Surgery', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AddQualificationDto.prototype, "specialization", void 0);
class AddCertificationDto {
}
exports.AddCertificationDto = AddCertificationDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'FCPS (Cardiology)' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AddCertificationDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'College of Physicians and Surgeons Pakistan' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AddCertificationDto.prototype, "issuingAuthority", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2014-06-15', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], AddCertificationDto.prototype, "issueDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2029-06-15', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], AddCertificationDto.prototype, "expiryDate", void 0);
class AddExperienceDto {
}
exports.AddExperienceDto = AddExperienceDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Senior Registrar - Cardiology' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AddExperienceDto.prototype, "designation", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Mayo Hospital Lahore' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AddExperienceDto.prototype, "hospitalName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2015-01-01' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], AddExperienceDto.prototype, "startDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2020-12-31', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], AddExperienceDto.prototype, "endDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: false, required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], AddExperienceDto.prototype, "isCurrent", void 0);
class AttachDoctorDocumentDto {
}
exports.AttachDoctorDocumentDto = AttachDoctorDocumentDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'MEDICAL_LICENSE', enum: ['MEDICAL_LICENSE', 'DEGREE_CERTIFICATE', 'GOVERNMENT_ID', 'BOARD_CERTIFICATE'] }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AttachDoctorDocumentDto.prototype, "documentType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'attachment-uuid-1', description: 'Reused MedicalAttachment ID' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AttachDoctorDocumentDto.prototype, "medicalAttachmentId", void 0);
class DoctorActionDto {
}
exports.DoctorActionDto = DoctorActionDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Verified credentials against council database / Administrative decision', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], DoctorActionDto.prototype, "reason", void 0);
class RenewLicenseDto {
}
exports.RenewLicenseDto = RenewLicenseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2029-12-31', description: 'New license expiry date' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], RenewLicenseDto.prototype, "newExpiryDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'License renewed with state medical board', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], RenewLicenseDto.prototype, "reason", void 0);
//# sourceMappingURL=register-doctor.dto.js.map
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
exports.FacilityActionDto = exports.AssignDoctorToFacilityDto = exports.AttachFacilityDocumentDto = exports.AddFacilityAccreditationDto = exports.AddFacilityLicenseDto = exports.CreateRoomDto = exports.CreateDepartmentDto = exports.RegisterFacilityDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
class RegisterFacilityDto {
}
exports.RegisterFacilityDto = RegisterFacilityDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Shaukat Khanum Memorial Hospital' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], RegisterFacilityDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Shaukat Khanum Memorial Cancer Hospital & Research Centre', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], RegisterFacilityDto.prototype, "legalName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'REG-HOSP-778899', description: 'Unique government health registration number' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], RegisterFacilityDto.prototype, "registrationNumber", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'HOSPITAL', enum: ['HOSPITAL', 'CLINIC', 'DIAGNOSTIC_CENTER', 'LABORATORY', 'PHARMACY', 'MEDICAL_COLLEGE', 'REHABILITATION_CENTER', 'SPECIALITY_CENTRE'], required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], RegisterFacilityDto.prototype, "facilityType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'PRIVATE', enum: ['GOVERNMENT', 'PRIVATE', 'TRUST', 'NGO'], required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], RegisterFacilityDto.prototype, "ownershipType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Main Clinical Tower', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], RegisterFacilityDto.prototype, "buildingName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '7A Block R-3 Johar Town' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], RegisterFacilityDto.prototype, "streetAddress", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Lahore' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], RegisterFacilityDto.prototype, "city", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Lahore District', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], RegisterFacilityDto.prototype, "district", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Punjab' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], RegisterFacilityDto.prototype, "state", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Pakistan', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], RegisterFacilityDto.prototype, "country", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '54000', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], RegisterFacilityDto.prototype, "pinCode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 31.472, required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], RegisterFacilityDto.prototype, "latitude", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 74.283, required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], RegisterFacilityDto.prototype, "longitude", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Asia/Karachi', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], RegisterFacilityDto.prototype, "timezone", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '+92-42-35905000' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], RegisterFacilityDto.prototype, "phone", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '+92-42-111155555', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], RegisterFacilityDto.prototype, "emergencyPhone", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'info@shaukatkhanum.org.pk', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], RegisterFacilityDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'https://shaukatkhanum.org.pk', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], RegisterFacilityDto.prototype, "website", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'https://storage.healthvault360.com/facilities/logo-100.png', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], RegisterFacilityDto.prototype, "profilePhotoUrl", void 0);
class CreateDepartmentDto {
}
exports.CreateDepartmentDto = CreateDepartmentDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Department of Medical Oncology' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateDepartmentDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'ONCO-MED', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateDepartmentDto.prototype, "code", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Comprehensive medical oncology and chemotherapy care', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateDepartmentDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Dr. Aasim Yusuf', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateDepartmentDto.prototype, "departmentHead", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '24/7 OPD & Inpatient Care', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateDepartmentDto.prototype, "operatingHours", void 0);
class CreateRoomDto {
}
exports.CreateRoomDto = CreateRoomDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'RM-304' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateRoomDto.prototype, "roomNumber", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'department-uuid-1', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateRoomDto.prototype, "departmentId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Chemotherapy Suite 4', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateRoomDto.prototype, "roomName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Tower A', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateRoomDto.prototype, "building", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Block 2', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateRoomDto.prototype, "block", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '3rd Floor', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateRoomDto.prototype, "floor", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'East Wing', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateRoomDto.prototype, "wing", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'ICU', enum: ['GENERAL_WARD', 'SEMI_PRIVATE', 'PRIVATE_SUITE', 'ICU', 'OT', 'EMERGENCY', 'CONSULTATION_ROOM', 'LAB_ROOM', 'RADIOLOGY_ROOM'], required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateRoomDto.prototype, "roomCategory", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 4, required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], CreateRoomDto.prototype, "capacity", void 0);
class AddFacilityLicenseDto {
}
exports.AddFacilityLicenseDto = AddFacilityLicenseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'GOVERNMENT_REGISTRATION', enum: ['GOVERNMENT_REGISTRATION', 'DRUG_LICENSE', 'FIRE_SAFETY', 'BIO_MEDICAL_WASTE', 'RADIATION_SAFETY'] }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AddFacilityLicenseDto.prototype, "licenseType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'PHC-LIC-2026-99' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AddFacilityLicenseDto.prototype, "licenseNumber", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Punjab Healthcare Commission' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AddFacilityLicenseDto.prototype, "issuingAuthority", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2024-01-01', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], AddFacilityLicenseDto.prototype, "issueDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2028-12-31', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], AddFacilityLicenseDto.prototype, "expiryDate", void 0);
class AddFacilityAccreditationDto {
}
exports.AddFacilityAccreditationDto = AddFacilityAccreditationDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'JCI', enum: ['NABH', 'NABL', 'JCI', 'ISO', 'OTHER'] }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AddFacilityAccreditationDto.prototype, "accreditationBody", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'JCI-GOLD-2025-001' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AddFacilityAccreditationDto.prototype, "certificateNumber", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2025-01-01', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], AddFacilityAccreditationDto.prototype, "validFrom", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2028-01-01', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], AddFacilityAccreditationDto.prototype, "validTo", void 0);
class AttachFacilityDocumentDto {
}
exports.AttachFacilityDocumentDto = AttachFacilityDocumentDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'REGISTRATION_LICENSE', enum: ['REGISTRATION_LICENSE', 'ACCREDITATION_CERTIFICATE', 'TAX_DOCUMENT', 'OWNERSHIP_PROOF', 'INSPECTION_REPORT'] }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AttachFacilityDocumentDto.prototype, "documentType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'attachment-uuid-1', description: 'Reused MedicalAttachment ID' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AttachFacilityDocumentDto.prototype, "medicalAttachmentId", void 0);
class AssignDoctorToFacilityDto {
}
exports.AssignDoctorToFacilityDto = AssignDoctorToFacilityDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'doctor-profile-uuid-1' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AssignDoctorToFacilityDto.prototype, "doctorId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'department-uuid-1', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AssignDoctorToFacilityDto.prototype, "departmentId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'PRIMARY', enum: ['PRIMARY', 'SECONDARY', 'VISITING', 'RESIDENT'], required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AssignDoctorToFacilityDto.prototype, "assignmentType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: ['OPD_CONSULTATION', 'INPATIENT_ADMISSION', 'SURGERY'], type: [String], required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], AssignDoctorToFacilityDto.prototype, "privileges", void 0);
class FacilityActionDto {
}
exports.FacilityActionDto = FacilityActionDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Verified Healthcare Commission license / Administrative review', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], FacilityActionDto.prototype, "reason", void 0);
//# sourceMappingURL=register-facility.dto.js.map
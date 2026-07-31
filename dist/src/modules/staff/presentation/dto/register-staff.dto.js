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
exports.StaffActionDto = exports.AssignStaffDepartmentDto = exports.AssignStaffFacilityDto = exports.AttachStaffDocumentDto = exports.AddStaffQualificationDto = exports.RegisterStaffDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
class RegisterStaffDto {
}
exports.RegisterStaffDto = RegisterStaffDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Sister Mary Joseph' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], RegisterStaffDto.prototype, "fullName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'FEMALE', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], RegisterStaffDto.prototype, "gender", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '1990-08-20', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], RegisterStaffDto.prototype, "dateOfBirth", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '+92-300-9876543' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], RegisterStaffDto.prototype, "phone", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'mary.joseph@shaukatkhanum.org.pk', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], RegisterStaffDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '+92-300-1122334', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], RegisterStaffDto.prototype, "emergencyContact", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'https://storage.healthvault360.com/staff/photo-300.jpg', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], RegisterStaffDto.prototype, "profilePhotoUrl", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'NURSE', enum: ['NURSE', 'RECEPTIONIST', 'PHARMACIST', 'LAB_TECHNICIAN', 'RADIOLOGY_TECHNICIAN', 'OT_STAFF', 'ICU_STAFF', 'EMERGENCY_STAFF', 'BILLING_EXECUTIVE', 'ADMINISTRATOR', 'FRONT_OFFICE', 'SUPPORT_STAFF', 'CUSTOM'] }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], RegisterStaffDto.prototype, "staffType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Head ICU Staff Nurse' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], RegisterStaffDto.prototype, "designation", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'facility-uuid-1', description: 'Primary hospital/clinic ID' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], RegisterStaffDto.prototype, "primaryFacilityId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'facility-uuid-2', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], RegisterStaffDto.prototype, "secondaryFacilityId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'department-uuid-icu', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], RegisterStaffDto.prototype, "primaryDepartmentId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'department-uuid-er', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], RegisterStaffDto.prototype, "secondaryDepartmentId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'reporting-manager-uuid-1', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], RegisterStaffDto.prototype, "reportingManagerId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'PERMANENT', enum: ['PERMANENT', 'CONTRACT', 'TEMPORARY', 'PART_TIME', 'INTERN', 'VOLUNTEER'], required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], RegisterStaffDto.prototype, "employmentType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'ACTIVE', enum: ['ACTIVE', 'INACTIVE', 'TERMINATED', 'RESIGNED', 'RETIRED', 'TRANSFERRED'], required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], RegisterStaffDto.prototype, "employmentStatus", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2021-06-01', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], RegisterStaffDto.prototype, "joiningDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 30, required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], RegisterStaffDto.prototype, "noticePeriodDays", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Certified Critical Care Nurse with 8 years ICU experience.', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], RegisterStaffDto.prototype, "biography", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: ['English', 'Urdu'], type: [String], required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], RegisterStaffDto.prototype, "languagesSpoken", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'STF-NURSE-0099', required: false, description: 'Optional custom employee code; auto-generated if omitted' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], RegisterStaffDto.prototype, "employeeCode", void 0);
class AddStaffQualificationDto {
}
exports.AddStaffQualificationDto = AddStaffQualificationDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'B.Sc. Nursing' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AddStaffQualificationDto.prototype, "degreeName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'University of Health Sciences Lahore' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AddStaffQualificationDto.prototype, "instituteName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 2016 }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], AddStaffQualificationDto.prototype, "passingYear", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Critical Care Nursing', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AddStaffQualificationDto.prototype, "fieldOfStudy", void 0);
class AttachStaffDocumentDto {
}
exports.AttachStaffDocumentDto = AttachStaffDocumentDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'GOVERNMENT_ID', enum: ['GOVERNMENT_ID', 'EMPLOYMENT_CONTRACT', 'QUALIFICATION_CERTIFICATE', 'PROFESSIONAL_CERTIFICATION', 'JOINING_LETTER', 'EXPERIENCE_LETTER', 'BACKGROUND_VERIFICATION'] }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AttachStaffDocumentDto.prototype, "documentType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'attachment-uuid-1', description: 'Reused MedicalAttachment ID' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AttachStaffDocumentDto.prototype, "medicalAttachmentId", void 0);
class AssignStaffFacilityDto {
}
exports.AssignStaffFacilityDto = AssignStaffFacilityDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'facility-uuid-1' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AssignStaffFacilityDto.prototype, "primaryFacilityId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'facility-uuid-2', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AssignStaffFacilityDto.prototype, "secondaryFacilityId", void 0);
class AssignStaffDepartmentDto {
}
exports.AssignStaffDepartmentDto = AssignStaffDepartmentDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'department-uuid-1', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AssignStaffDepartmentDto.prototype, "primaryDepartmentId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'department-uuid-2', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AssignStaffDepartmentDto.prototype, "secondaryDepartmentId", void 0);
class StaffActionDto {
}
exports.StaffActionDto = StaffActionDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Verified credentials with Pakistan Nursing Council / HR decision', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], StaffActionDto.prototype, "reason", void 0);
//# sourceMappingURL=register-staff.dto.js.map
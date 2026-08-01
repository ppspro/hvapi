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
exports.AddReferralAttachmentDto = exports.AddReferralNoteDto = exports.UpdateReferralStatusDto = exports.TriageReferralDto = exports.CreateReferralDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
class CreateReferralDto {
}
exports.CreateReferralDto = CreateReferralDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'patient-uuid-1' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateReferralDto.prototype, "patientId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'facility-uuid-2' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateReferralDto.prototype, "receivingFacilityId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'doctor-uuid-2', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateReferralDto.prototype, "receivingDoctorId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'medrec-uuid-1', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateReferralDto.prototype, "medicalRecordId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'SPECIALIST_CONSULTATION', enum: ['SPECIALIST_CONSULTATION', 'DIAGNOSTIC_IMAGING', 'LABORATORY_TEST', 'PHYSICAL_THERAPY', 'INPATIENT_TRANSFER', 'OUTPATIENT_CARE', 'SECOND_OPINION'], required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateReferralDto.prototype, "referralType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'URGENT', enum: ['ROUTINE', 'URGENT', 'EMERGENCY', 'STAT'], required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateReferralDto.prototype, "priority", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Patient presents with unresolved cardiology symptoms' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateReferralDto.prototype, "reasonForReferral", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'High blood pressure, ECG abnormal', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateReferralDto.prototype, "clinicalSummary", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Cardiology', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateReferralDto.prototype, "specialtyRequired", void 0);
class TriageReferralDto {
}
exports.TriageReferralDto = TriageReferralDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'APPROVED', enum: ['APPROVED', 'MORE_INFO_REQUESTED', 'DECLINED', 'REDIRECTED'] }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], TriageReferralDto.prototype, "outcome", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'doctor-uuid-2', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], TriageReferralDto.prototype, "receivingDoctorId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Accepted for cardiology evaluation', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], TriageReferralDto.prototype, "reason", void 0);
class UpdateReferralStatusDto {
}
exports.UpdateReferralStatusDto = UpdateReferralStatusDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'IN_PROGRESS', enum: ['IN_PROGRESS', 'COMPLETED', 'CANCELLED'] }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateReferralStatusDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Referral consultation completed', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateReferralStatusDto.prototype, "reason", void 0);
class AddReferralNoteDto {
}
exports.AddReferralNoteDto = AddReferralNoteDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Reviewed medical history prior to consultation' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AddReferralNoteDto.prototype, "noteText", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: false, required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], AddReferralNoteDto.prototype, "isPrivate", void 0);
class AddReferralAttachmentDto {
}
exports.AddReferralAttachmentDto = AddReferralAttachmentDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'attachment-uuid-1' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AddReferralAttachmentDto.prototype, "attachmentId", void 0);
//# sourceMappingURL=referral-enterprise.dto.js.map
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
exports.UpdateMedicalRecordDto = exports.CreateMedicalRecordDto = exports.ProcedureDto = exports.VitalSignsDto = exports.ClinicalDiagnosisDto = exports.EncounterDto = exports.AttachmentCategory = exports.MedicalRecordStatus = void 0;
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const swagger_1 = require("@nestjs/swagger");
var MedicalRecordStatus;
(function (MedicalRecordStatus) {
    MedicalRecordStatus["DRAFT"] = "DRAFT";
    MedicalRecordStatus["FINAL"] = "FINAL";
    MedicalRecordStatus["ARCHIVED"] = "ARCHIVED";
})(MedicalRecordStatus || (exports.MedicalRecordStatus = MedicalRecordStatus = {}));
var AttachmentCategory;
(function (AttachmentCategory) {
    AttachmentCategory["IMAGE"] = "IMAGE";
    AttachmentCategory["PDF"] = "PDF";
    AttachmentCategory["DICOM"] = "DICOM";
    AttachmentCategory["SCANNED_DOC"] = "SCANNED_DOC";
    AttachmentCategory["PRESCRIPTION"] = "PRESCRIPTION";
    AttachmentCategory["REFERRAL_LETTER"] = "REFERRAL_LETTER";
    AttachmentCategory["LAB_RESULT"] = "LAB_RESULT";
    AttachmentCategory["RADIOLOGY"] = "RADIOLOGY";
    AttachmentCategory["CLINICAL_NOTE"] = "CLINICAL_NOTE";
    AttachmentCategory["OTHER"] = "OTHER";
})(AttachmentCategory || (exports.AttachmentCategory = AttachmentCategory = {}));
class EncounterDto {
}
exports.EncounterDto = EncounterDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Dr. Sarah Connor', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], EncounterDto.prototype, "providerName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'City General Hospital', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], EncounterDto.prototype, "facilityName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'CONSULTATION', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], EncounterDto.prototype, "encounterType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2026-07-31T10:00:00Z', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], EncounterDto.prototype, "encounterDate", void 0);
class ClinicalDiagnosisDto {
}
exports.ClinicalDiagnosisDto = ClinicalDiagnosisDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'E11.9', required: false, description: 'ICD-10 Code' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ClinicalDiagnosisDto.prototype, "code", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Type 2 Diabetes Mellitus without complications' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ClinicalDiagnosisDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'PRIMARY', enum: ['PRIMARY', 'SECONDARY', 'DIFFERENTIAL'], required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ClinicalDiagnosisDto.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'ACTIVE', enum: ['ACTIVE', 'RESOLVED'], required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ClinicalDiagnosisDto.prototype, "status", void 0);
class VitalSignsDto {
}
exports.VitalSignsDto = VitalSignsDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 175.5, required: false, description: 'Height in cm' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(30),
    (0, class_validator_1.Max)(300),
    __metadata("design:type", Number)
], VitalSignsDto.prototype, "heightCm", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 70.0, required: false, description: 'Weight in kg' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.Max)(500),
    __metadata("design:type", Number)
], VitalSignsDto.prototype, "weightKg", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 120, required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], VitalSignsDto.prototype, "systolicBp", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 80, required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], VitalSignsDto.prototype, "diastolicBp", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 72, required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], VitalSignsDto.prototype, "pulseBpm", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 16, required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], VitalSignsDto.prototype, "respirationRate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 36.6, required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], VitalSignsDto.prototype, "temperatureC", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 95.0, required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], VitalSignsDto.prototype, "bloodSugarMgDl", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 98.0, required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], VitalSignsDto.prototype, "oxygenSaturation", void 0);
class ProcedureDto {
}
exports.ProcedureDto = ProcedureDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Routine Blood Panel' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ProcedureDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'CPT-80053', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ProcedureDto.prototype, "code", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2026-07-31', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], ProcedureDto.prototype, "performedAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Patient fasted for 12 hours prior', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ProcedureDto.prototype, "notes", void 0);
class CreateMedicalRecordDto {
}
exports.CreateMedicalRecordDto = CreateMedicalRecordDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Annual Routine Health Checkup' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateMedicalRecordDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Mild fatigue and occasional headache', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateMedicalRecordDto.prototype, "chiefComplaint", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Patient appears well nourished. No acute distress.', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateMedicalRecordDto.prototype, "clinicalNotes", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Increase fluid intake, maintain low glycemic diet', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateMedicalRecordDto.prototype, "treatmentPlan", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Follow up in 4 weeks for repeat blood panel', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateMedicalRecordDto.prototype, "followUpInstructions", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: MedicalRecordStatus, example: 'FINAL', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(MedicalRecordStatus),
    __metadata("design:type", String)
], CreateMedicalRecordDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: EncounterDto, required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => EncounterDto),
    __metadata("design:type", EncounterDto)
], CreateMedicalRecordDto.prototype, "encounter", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [ClinicalDiagnosisDto], required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => ClinicalDiagnosisDto),
    __metadata("design:type", Array)
], CreateMedicalRecordDto.prototype, "diagnoses", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: VitalSignsDto, required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => VitalSignsDto),
    __metadata("design:type", VitalSignsDto)
], CreateMedicalRecordDto.prototype, "vitalSigns", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [ProcedureDto], required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => ProcedureDto),
    __metadata("design:type", Array)
], CreateMedicalRecordDto.prototype, "procedures", void 0);
class UpdateMedicalRecordDto {
}
exports.UpdateMedicalRecordDto = UpdateMedicalRecordDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Updated Health Checkup Record', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateMedicalRecordDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateMedicalRecordDto.prototype, "chiefComplaint", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateMedicalRecordDto.prototype, "clinicalNotes", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateMedicalRecordDto.prototype, "treatmentPlan", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateMedicalRecordDto.prototype, "followUpInstructions", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: MedicalRecordStatus, required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(MedicalRecordStatus),
    __metadata("design:type", String)
], UpdateMedicalRecordDto.prototype, "status", void 0);
//# sourceMappingURL=create-medical-record.dto.js.map
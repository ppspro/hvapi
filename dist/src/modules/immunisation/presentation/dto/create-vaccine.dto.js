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
exports.RecordActionDto = exports.ReminderConfigDto = exports.CreateCertificateDto = exports.DeferDoseDto = exports.AdministerDoseDto = exports.CreateVaccinationRecordDto = exports.CreateVaccinationScheduleDto = exports.CreateVaccineDto = exports.VaccinationStatus = exports.VaccineTargetGroup = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
var VaccineTargetGroup;
(function (VaccineTargetGroup) {
    VaccineTargetGroup["ALL"] = "ALL";
    VaccineTargetGroup["INFANT"] = "INFANT";
    VaccineTargetGroup["CHILD"] = "CHILD";
    VaccineTargetGroup["ADOLESCENT"] = "ADOLESCENT";
    VaccineTargetGroup["ADULT"] = "ADULT";
    VaccineTargetGroup["ELDERLY"] = "ELDERLY";
    VaccineTargetGroup["PREGNANT"] = "PREGNANT";
    VaccineTargetGroup["HIGH_RISK"] = "HIGH_RISK";
})(VaccineTargetGroup || (exports.VaccineTargetGroup = VaccineTargetGroup = {}));
var VaccinationStatus;
(function (VaccinationStatus) {
    VaccinationStatus["SCHEDULED"] = "SCHEDULED";
    VaccinationStatus["DUE"] = "DUE";
    VaccinationStatus["ADMINISTERED"] = "ADMINISTERED";
    VaccinationStatus["COMPLETED"] = "COMPLETED";
    VaccinationStatus["MISSED"] = "MISSED";
    VaccinationStatus["DEFERRED"] = "DEFERRED";
    VaccinationStatus["CANCELLED"] = "CANCELLED";
    VaccinationStatus["ARCHIVED"] = "ARCHIVED";
})(VaccinationStatus || (exports.VaccinationStatus = VaccinationStatus = {}));
class CreateVaccineDto {
}
exports.CreateVaccineDto = CreateVaccineDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'COVID-19 mRNA Vaccine' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateVaccineDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'COVID19-MRNA', description: 'Unique vaccine code' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateVaccineDto.prototype, "code", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Pfizer-BioNTech', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateVaccineDto.prototype, "manufacturer", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: VaccineTargetGroup, example: 'ALL', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(VaccineTargetGroup),
    __metadata("design:type", String)
], CreateVaccineDto.prototype, "targetGroup", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 6, description: 'Minimum age in months', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], CreateVaccineDto.prototype, "minAgeMonths", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1200, description: 'Maximum age in months', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateVaccineDto.prototype, "maxAgeMonths", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 2, description: 'Total doses required in standard series', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], CreateVaccineDto.prototype, "totalDosesRequired", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 21, description: 'Minimum interval days between doses', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateVaccineDto.prototype, "minIntervalDays", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'mRNA vaccine against SARS-CoV-2 Spike protein', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateVaccineDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: ['Anaphylaxis to PEG', 'Severe allergic reaction to prior dose'], type: [String], required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], CreateVaccineDto.prototype, "contraindications", void 0);
class CreateVaccinationScheduleDto {
}
exports.CreateVaccinationScheduleDto = CreateVaccinationScheduleDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'vaccine-uuid-1' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateVaccinationScheduleDto.prototype, "vaccineId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Primary Dose 1 Schedule' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateVaccinationScheduleDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1 }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], CreateVaccinationScheduleDto.prototype, "doseNumber", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 6, description: 'Recommended age in months' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], CreateVaccinationScheduleDto.prototype, "recommendedAgeMonths", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: false, required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CreateVaccinationScheduleDto.prototype, "isBooster", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 180, description: 'Booster interval days after primary series', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateVaccinationScheduleDto.prototype, "boosterIntervalDays", void 0);
class CreateVaccinationRecordDto {
}
exports.CreateVaccinationRecordDto = CreateVaccinationRecordDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'vaccine-uuid-1' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateVaccinationRecordDto.prototype, "vaccineId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'schedule-uuid-1', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateVaccinationRecordDto.prototype, "scheduleId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1, required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateVaccinationRecordDto.prototype, "doseNumber", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2026-08-15', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], CreateVaccinationRecordDto.prototype, "dueDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Standard dose schedule notes', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateVaccinationRecordDto.prototype, "notes", void 0);
class AdministerDoseDto {
}
exports.AdministerDoseDto = AdministerDoseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Dr. Sarah Connor, RN' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AdministerDoseDto.prototype, "administeredBy", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'City Central Immunisation Clinic' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AdministerDoseDto.prototype, "facilityName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'BATCH-2026-X99' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AdministerDoseDto.prototype, "batchNumber", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'LOT-778899', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AdministerDoseDto.prototype, "lotNumber", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2027-12-31', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], AdministerDoseDto.prototype, "expirationDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Left Deltoid', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AdministerDoseDto.prototype, "siteOfInjection", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Intramuscular (IM)', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AdministerDoseDto.prototype, "routeOfAdmin", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Patient tolerated dose well. No immediate reaction.', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AdministerDoseDto.prototype, "notes", void 0);
class DeferDoseDto {
}
exports.DeferDoseDto = DeferDoseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Acute febrile illness / high fever', description: 'Clinical reason for deferring dose' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], DeferDoseDto.prototype, "reason", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2026-09-01', description: 'Rescheduled due date', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], DeferDoseDto.prototype, "rescheduledDueDate", void 0);
class CreateCertificateDto {
}
exports.CreateCertificateDto = CreateCertificateDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'record-uuid-1', description: 'Vaccination record ID' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateCertificateDto.prototype, "recordId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'report-attachment-uuid-1', required: false, description: 'Optional link to PDF report attachment' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateCertificateDto.prototype, "reportAttachmentId", void 0);
class ReminderConfigDto {
}
exports.ReminderConfigDto = ReminderConfigDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'vaccine-uuid-1' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ReminderConfigDto.prototype, "vaccineId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 7, description: 'Days before due date to trigger reminder' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], ReminderConfigDto.prototype, "reminderDaysBefore", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: true, required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], ReminderConfigDto.prototype, "enableEmail", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: false, required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], ReminderConfigDto.prototype, "enableSms", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: true, required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], ReminderConfigDto.prototype, "enablePush", void 0);
class RecordActionDto {
}
exports.RecordActionDto = RecordActionDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Administrative action', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], RecordActionDto.prototype, "reason", void 0);
//# sourceMappingURL=create-vaccine.dto.js.map
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
exports.ImmunisationStatsResponseDto = exports.ReminderConfigResponseDto = exports.VaccinationCertificateResponseDto = exports.VaccinationRecordResponseDto = exports.VaccinationScheduleResponseDto = exports.VaccineResponseDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class VaccineResponseDto {
}
exports.VaccineResponseDto = VaccineResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], VaccineResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], VaccineResponseDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], VaccineResponseDto.prototype, "code", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true }),
    __metadata("design:type", String)
], VaccineResponseDto.prototype, "manufacturer", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], VaccineResponseDto.prototype, "targetGroup", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], VaccineResponseDto.prototype, "minAgeMonths", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true }),
    __metadata("design:type", Number)
], VaccineResponseDto.prototype, "maxAgeMonths", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], VaccineResponseDto.prototype, "totalDosesRequired", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], VaccineResponseDto.prototype, "minIntervalDays", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true }),
    __metadata("design:type", String)
], VaccineResponseDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [String] }),
    __metadata("design:type", Array)
], VaccineResponseDto.prototype, "contraindications", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Boolean)
], VaccineResponseDto.prototype, "isActive", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], VaccineResponseDto.prototype, "createdAt", void 0);
class VaccinationScheduleResponseDto {
}
exports.VaccinationScheduleResponseDto = VaccinationScheduleResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], VaccinationScheduleResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], VaccinationScheduleResponseDto.prototype, "vaccineId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], VaccinationScheduleResponseDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], VaccinationScheduleResponseDto.prototype, "doseNumber", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], VaccinationScheduleResponseDto.prototype, "recommendedAgeMonths", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Boolean)
], VaccinationScheduleResponseDto.prototype, "isBooster", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true }),
    __metadata("design:type", Number)
], VaccinationScheduleResponseDto.prototype, "boosterIntervalDays", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], VaccinationScheduleResponseDto.prototype, "createdAt", void 0);
class VaccinationRecordResponseDto {
}
exports.VaccinationRecordResponseDto = VaccinationRecordResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], VaccinationRecordResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], VaccinationRecordResponseDto.prototype, "patientProfileId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], VaccinationRecordResponseDto.prototype, "vaccineId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true }),
    __metadata("design:type", String)
], VaccinationRecordResponseDto.prototype, "scheduleId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], VaccinationRecordResponseDto.prototype, "doseNumber", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], VaccinationRecordResponseDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true }),
    __metadata("design:type", String)
], VaccinationRecordResponseDto.prototype, "dueDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true }),
    __metadata("design:type", String)
], VaccinationRecordResponseDto.prototype, "administeredDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true }),
    __metadata("design:type", String)
], VaccinationRecordResponseDto.prototype, "administeredBy", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true }),
    __metadata("design:type", String)
], VaccinationRecordResponseDto.prototype, "facilityName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true }),
    __metadata("design:type", String)
], VaccinationRecordResponseDto.prototype, "batchNumber", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true }),
    __metadata("design:type", String)
], VaccinationRecordResponseDto.prototype, "lotNumber", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true }),
    __metadata("design:type", String)
], VaccinationRecordResponseDto.prototype, "expirationDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true }),
    __metadata("design:type", String)
], VaccinationRecordResponseDto.prototype, "siteOfInjection", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true }),
    __metadata("design:type", String)
], VaccinationRecordResponseDto.prototype, "routeOfAdmin", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true }),
    __metadata("design:type", String)
], VaccinationRecordResponseDto.prototype, "notes", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Boolean)
], VaccinationRecordResponseDto.prototype, "isDeleted", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: VaccineResponseDto, required: false }),
    __metadata("design:type", VaccineResponseDto)
], VaccinationRecordResponseDto.prototype, "vaccine", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: VaccinationScheduleResponseDto, required: false }),
    __metadata("design:type", VaccinationScheduleResponseDto)
], VaccinationRecordResponseDto.prototype, "schedule", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], VaccinationRecordResponseDto.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], VaccinationRecordResponseDto.prototype, "updatedAt", void 0);
class VaccinationCertificateResponseDto {
}
exports.VaccinationCertificateResponseDto = VaccinationCertificateResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], VaccinationCertificateResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], VaccinationCertificateResponseDto.prototype, "patientProfileId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], VaccinationCertificateResponseDto.prototype, "recordId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], VaccinationCertificateResponseDto.prototype, "certificateNumber", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], VaccinationCertificateResponseDto.prototype, "issueDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], VaccinationCertificateResponseDto.prototype, "verificationStatus", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true }),
    __metadata("design:type", String)
], VaccinationCertificateResponseDto.prototype, "qrToken", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true }),
    __metadata("design:type", String)
], VaccinationCertificateResponseDto.prototype, "reportAttachmentId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], VaccinationCertificateResponseDto.prototype, "version", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], VaccinationCertificateResponseDto.prototype, "createdAt", void 0);
class ReminderConfigResponseDto {
}
exports.ReminderConfigResponseDto = ReminderConfigResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], ReminderConfigResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], ReminderConfigResponseDto.prototype, "patientProfileId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], ReminderConfigResponseDto.prototype, "vaccineId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], ReminderConfigResponseDto.prototype, "reminderDaysBefore", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Boolean)
], ReminderConfigResponseDto.prototype, "enableEmail", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Boolean)
], ReminderConfigResponseDto.prototype, "enableSms", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Boolean)
], ReminderConfigResponseDto.prototype, "enablePush", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], ReminderConfigResponseDto.prototype, "createdAt", void 0);
class ImmunisationStatsResponseDto {
}
exports.ImmunisationStatsResponseDto = ImmunisationStatsResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], ImmunisationStatsResponseDto.prototype, "totalVaccines", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], ImmunisationStatsResponseDto.prototype, "totalRecords", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], ImmunisationStatsResponseDto.prototype, "administeredDoses", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], ImmunisationStatsResponseDto.prototype, "totalCertificates", void 0);
//# sourceMappingURL=immunisation-response.dto.js.map
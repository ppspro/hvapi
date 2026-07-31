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
exports.ConsentHistoryResponseDto = exports.ConsentRecordResponseDto = exports.UpdateConsentDto = exports.CreateConsentDto = exports.ConsentCategory = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
var ConsentCategory;
(function (ConsentCategory) {
    ConsentCategory["MEDICAL_RECORDS"] = "MEDICAL_RECORDS";
    ConsentCategory["HEALTH_CARD"] = "HEALTH_CARD";
    ConsentCategory["INSURANCE"] = "INSURANCE";
    ConsentCategory["EMERGENCY_ACCESS"] = "EMERGENCY_ACCESS";
    ConsentCategory["DOCTOR_ACCESS"] = "DOCTOR_ACCESS";
    ConsentCategory["FACILITY_ACCESS"] = "FACILITY_ACCESS";
})(ConsentCategory || (exports.ConsentCategory = ConsentCategory = {}));
class CreateConsentDto {
}
exports.CreateConsentDto = CreateConsentDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'member-uuid', description: 'Family member ID to grant consent to' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateConsentDto.prototype, "familyMemberId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: ConsentCategory, example: 'MEDICAL_RECORDS', description: 'Category of consent being granted' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsEnum)(ConsentCategory),
    __metadata("design:type", String)
], CreateConsentDto.prototype, "category", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2027-12-31', description: 'Optional expiry date for consent', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], CreateConsentDto.prototype, "expiresAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Temporary access for treatment', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateConsentDto.prototype, "notes", void 0);
class UpdateConsentDto {
}
exports.UpdateConsentDto = UpdateConsentDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2028-06-01', description: 'Update expiry date', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], UpdateConsentDto.prototype, "expiresAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Extended for ongoing treatment', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateConsentDto.prototype, "notes", void 0);
class ConsentRecordResponseDto {
}
exports.ConsentRecordResponseDto = ConsentRecordResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], ConsentRecordResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], ConsentRecordResponseDto.prototype, "patientProfileId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], ConsentRecordResponseDto.prototype, "familyMemberId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], ConsentRecordResponseDto.prototype, "category", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Boolean)
], ConsentRecordResponseDto.prototype, "isActive", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], ConsentRecordResponseDto.prototype, "grantedAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true }),
    __metadata("design:type", String)
], ConsentRecordResponseDto.prototype, "revokedAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true }),
    __metadata("design:type", String)
], ConsentRecordResponseDto.prototype, "expiresAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true }),
    __metadata("design:type", String)
], ConsentRecordResponseDto.prototype, "notes", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], ConsentRecordResponseDto.prototype, "createdAt", void 0);
class ConsentHistoryResponseDto {
}
exports.ConsentHistoryResponseDto = ConsentHistoryResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], ConsentHistoryResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], ConsentHistoryResponseDto.prototype, "consentRecordId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], ConsentHistoryResponseDto.prototype, "action", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true }),
    __metadata("design:type", String)
], ConsentHistoryResponseDto.prototype, "performedBy", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true }),
    __metadata("design:type", String)
], ConsentHistoryResponseDto.prototype, "reason", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], ConsentHistoryResponseDto.prototype, "createdAt", void 0);
//# sourceMappingURL=consent.dto.js.map
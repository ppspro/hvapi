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
exports.FullPatientProfileResponseDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class FullPatientProfileResponseDto {
}
exports.FullPatientProfileResponseDto = FullPatientProfileResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'profile-uuid-v4' }),
    __metadata("design:type", String)
], FullPatientProfileResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'PT-1234567890', nullable: true }),
    __metadata("design:type", String)
], FullPatientProfileResponseDto.prototype, "patientNumber", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'John', nullable: true }),
    __metadata("design:type", String)
], FullPatientProfileResponseDto.prototype, "firstName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Doe', nullable: true }),
    __metadata("design:type", String)
], FullPatientProfileResponseDto.prototype, "lastName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '1990-01-01', nullable: true }),
    __metadata("design:type", String)
], FullPatientProfileResponseDto.prototype, "dateOfBirth", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'MALE', nullable: true }),
    __metadata("design:type", String)
], FullPatientProfileResponseDto.prototype, "gender", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'O+', nullable: true }),
    __metadata("design:type", String)
], FullPatientProfileResponseDto.prototype, "bloodGroup", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Pakistani', nullable: true }),
    __metadata("design:type", String)
], FullPatientProfileResponseDto.prototype, "nationality", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Software Engineer', nullable: true }),
    __metadata("design:type", String)
], FullPatientProfileResponseDto.prototype, "occupation", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'MARRIED', nullable: true }),
    __metadata("design:type", String)
], FullPatientProfileResponseDto.prototype, "maritalStatus", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: ['English', 'Urdu'], type: [String] }),
    __metadata("design:type", Array)
], FullPatientProfileResponseDto.prototype, "languages", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Current address details', nullable: true }),
    __metadata("design:type", Object)
], FullPatientProfileResponseDto.prototype, "currentAddress", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Permanent address details', nullable: true }),
    __metadata("design:type", Object)
], FullPatientProfileResponseDto.prototype, "permanentAddress", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'https://cdn.hvapi.com/photos/profile.jpg', nullable: true }),
    __metadata("design:type", String)
], FullPatientProfileResponseDto.prototype, "photoUrl", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: ['Penicillin'], type: [String] }),
    __metadata("design:type", Array)
], FullPatientProfileResponseDto.prototype, "knownAllergies", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: ['Diabetes Type 2'], type: [String] }),
    __metadata("design:type", Array)
], FullPatientProfileResponseDto.prototype, "chronicConditions", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: [], type: [String] }),
    __metadata("design:type", Array)
], FullPatientProfileResponseDto.prototype, "disabilities", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'PHONE', nullable: true }),
    __metadata("design:type", String)
], FullPatientProfileResponseDto.prototype, "prefContactMethod", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: true }),
    __metadata("design:type", Boolean)
], FullPatientProfileResponseDto.prototype, "emailNotifications", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: true }),
    __metadata("design:type", Boolean)
], FullPatientProfileResponseDto.prototype, "smsNotifications", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: true }),
    __metadata("design:type", Boolean)
], FullPatientProfileResponseDto.prototype, "pushNotifications", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'PRIVATE' }),
    __metadata("design:type", String)
], FullPatientProfileResponseDto.prototype, "profileVisibility", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 6 }),
    __metadata("design:type", Number)
], FullPatientProfileResponseDto.prototype, "onboardingStep", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'COMPLETED' }),
    __metadata("design:type", String)
], FullPatientProfileResponseDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2026-07-31T06:00:00.000Z' }),
    __metadata("design:type", String)
], FullPatientProfileResponseDto.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2026-07-31T08:00:00.000Z' }),
    __metadata("design:type", String)
], FullPatientProfileResponseDto.prototype, "updatedAt", void 0);
//# sourceMappingURL=full-patient-profile.dto.js.map
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
exports.RegisterPatientResponseDto = exports.RegisterPatientDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class RegisterPatientDto {
}
exports.RegisterPatientDto = RegisterPatientDto;
class RegisterPatientResponseDto {
}
exports.RegisterPatientResponseDto = RegisterPatientResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'patient-uuid-v4', description: 'Patient Profile ID' }),
    __metadata("design:type", String)
], RegisterPatientResponseDto.prototype, "profileId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'PT-2026-00001', description: 'Unique patient business number' }),
    __metadata("design:type", String)
], RegisterPatientResponseDto.prototype, "patientNumber", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'DRAFT', description: 'Registration status' }),
    __metadata("design:type", String)
], RegisterPatientResponseDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1, description: 'Current active step' }),
    __metadata("design:type", Number)
], RegisterPatientResponseDto.prototype, "onboardingStep", void 0);
//# sourceMappingURL=register-patient.dto.js.map
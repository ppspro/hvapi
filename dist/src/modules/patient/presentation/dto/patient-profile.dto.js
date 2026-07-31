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
exports.PatientProfileResponseDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class PatientProfileResponseDto {
}
exports.PatientProfileResponseDto = PatientProfileResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'profile-uuid' }),
    __metadata("design:type", String)
], PatientProfileResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'John', nullable: true }),
    __metadata("design:type", String)
], PatientProfileResponseDto.prototype, "firstName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Doe', nullable: true }),
    __metadata("design:type", String)
], PatientProfileResponseDto.prototype, "lastName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '1990-01-01', nullable: true }),
    __metadata("design:type", String)
], PatientProfileResponseDto.prototype, "dateOfBirth", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Male', nullable: true }),
    __metadata("design:type", String)
], PatientProfileResponseDto.prototype, "gender", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'O+', nullable: true }),
    __metadata("design:type", String)
], PatientProfileResponseDto.prototype, "bloodGroup", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '123 St', nullable: true }),
    __metadata("design:type", String)
], PatientProfileResponseDto.prototype, "address", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 6 }),
    __metadata("design:type", Number)
], PatientProfileResponseDto.prototype, "onboardingStep", void 0);
//# sourceMappingURL=patient-profile.dto.js.map
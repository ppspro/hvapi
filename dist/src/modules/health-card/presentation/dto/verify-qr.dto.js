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
exports.VerifyQrResponseDto = exports.PatientDetailsDto = exports.VerifyQrDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
class VerifyQrDto {
}
exports.VerifyQrDto = VerifyQrDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'HV360-1234-5678-9012', description: 'QR payload or card number string' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], VerifyQrDto.prototype, "qrPayload", void 0);
class PatientDetailsDto {
}
exports.PatientDetailsDto = PatientDetailsDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'PT-12345' }),
    __metadata("design:type", String)
], PatientDetailsDto.prototype, "patientNumber", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'John' }),
    __metadata("design:type", String)
], PatientDetailsDto.prototype, "firstName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Doe' }),
    __metadata("design:type", String)
], PatientDetailsDto.prototype, "lastName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '1990-01-01' }),
    __metadata("design:type", String)
], PatientDetailsDto.prototype, "dateOfBirth", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'O+' }),
    __metadata("design:type", String)
], PatientDetailsDto.prototype, "bloodGroup", void 0);
class VerifyQrResponseDto {
}
exports.VerifyQrResponseDto = VerifyQrResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: true }),
    __metadata("design:type", Boolean)
], VerifyQrResponseDto.prototype, "isValid", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'VERIFIED', required: false }),
    __metadata("design:type", String)
], VerifyQrResponseDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'John Doe', required: false }),
    __metadata("design:type", String)
], VerifyQrResponseDto.prototype, "patientName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'HV360-1234-5678-9012', required: false }),
    __metadata("design:type", String)
], VerifyQrResponseDto.prototype, "cardNumber", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'QR verification completed successfully', required: false }),
    __metadata("design:type", String)
], VerifyQrResponseDto.prototype, "message", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: PatientDetailsDto, required: false }),
    __metadata("design:type", PatientDetailsDto)
], VerifyQrResponseDto.prototype, "patientDetails", void 0);
//# sourceMappingURL=verify-qr.dto.js.map
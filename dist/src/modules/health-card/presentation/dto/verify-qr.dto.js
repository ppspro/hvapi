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
exports.VerifyQrResponseDto = exports.VerifyQrDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
class VerifyQrDto {
}
exports.VerifyQrDto = VerifyQrDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'encrypted.payload.hash', description: 'Encrypted QR string to verify' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], VerifyQrDto.prototype, "qrPayload", void 0);
class VerifyQrResponseDto {
}
exports.VerifyQrResponseDto = VerifyQrResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: true, description: 'Verification validity status' }),
    __metadata("design:type", Boolean)
], VerifyQrResponseDto.prototype, "isValid", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'John Doe', description: 'Patient name if valid' }),
    __metadata("design:type", String)
], VerifyQrResponseDto.prototype, "patientName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'HV360-1234-5678-9012', description: 'Card identification number if valid' }),
    __metadata("design:type", String)
], VerifyQrResponseDto.prototype, "cardNumber", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'QR verification completed successfully', description: 'Status message' }),
    __metadata("design:type", String)
], VerifyQrResponseDto.prototype, "message", void 0);
//# sourceMappingURL=verify-qr.dto.js.map
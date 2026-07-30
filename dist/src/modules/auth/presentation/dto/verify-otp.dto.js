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
exports.VerifyOtpResponseDto = exports.VerifyOtpDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
class VerifyOtpDto {
}
exports.VerifyOtpDto = VerifyOtpDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', description: 'OTP challenge session UUID' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsUUID)('4', { message: 'challengeId must be a valid UUIDv4' }),
    __metadata("design:type", String)
], VerifyOtpDto.prototype, "challengeId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '123456', description: '6-digit numeric OTP code' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Matches)(/^\d{6}$/, { message: 'otpCode must be a 6-digit numeric code' }),
    __metadata("design:type", String)
], VerifyOtpDto.prototype, "otpCode", void 0);
class VerifyOtpResponseDto {
}
exports.VerifyOtpResponseDto = VerifyOtpResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'jwt.access.token', description: 'Short-lived JWT access token' }),
    __metadata("design:type", String)
], VerifyOtpResponseDto.prototype, "accessToken", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'jwt.refresh.token', description: 'Long-lived refresh token' }),
    __metadata("design:type", String)
], VerifyOtpResponseDto.prototype, "refreshToken", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '15m', description: 'Access token expiration period' }),
    __metadata("design:type", String)
], VerifyOtpResponseDto.prototype, "expiresIn", void 0);
//# sourceMappingURL=verify-otp.dto.js.map
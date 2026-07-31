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
exports.ResendOtpResponseDto = exports.ResendOtpDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
class ResendOtpDto {
}
exports.ResendOtpDto = ResendOtpDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'challenge-uuid-v4', description: 'Existing OTP challenge session identifier' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Challenge ID is required' }),
    (0, class_validator_1.IsString)({ message: 'Challenge ID must be a string' }),
    __metadata("design:type", String)
], ResendOtpDto.prototype, "challengeId", void 0);
class ResendOtpResponseDto {
}
exports.ResendOtpResponseDto = ResendOtpResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'challenge-uuid-v4', description: 'New or existing OTP challenge session identifier' }),
    __metadata("design:type", String)
], ResendOtpResponseDto.prototype, "challengeId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'OTP resent successfully', description: 'Status message' }),
    __metadata("design:type", String)
], ResendOtpResponseDto.prototype, "message", void 0);
//# sourceMappingURL=resend-otp.dto.js.map
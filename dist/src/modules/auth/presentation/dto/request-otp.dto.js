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
exports.RequestOtpResponseDto = exports.RequestOtpDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
class RequestOtpDto {
}
exports.RequestOtpDto = RequestOtpDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '+14155552671',
        description: 'User phone number in E.164 international format',
    }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Phone number is required' }),
    (0, class_validator_1.IsString)({ message: 'Phone number must be a string' }),
    (0, class_validator_1.Matches)(/^\+[1-9]\d{1,14}$/, {
        message: 'Phone number must follow E.164 format (e.g. +14155552671)',
    }),
    __metadata("design:type", String)
], RequestOtpDto.prototype, "phone", void 0);
class RequestOtpResponseDto {
}
exports.RequestOtpResponseDto = RequestOtpResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'challenge-uuid-v4', description: 'OTP challenge session identifier' }),
    __metadata("design:type", String)
], RequestOtpResponseDto.prototype, "challengeId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'OTP sent successfully', description: 'Status message' }),
    __metadata("design:type", String)
], RequestOtpResponseDto.prototype, "message", void 0);
//# sourceMappingURL=request-otp.dto.js.map
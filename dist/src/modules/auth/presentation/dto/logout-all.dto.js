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
exports.LogoutAllResponseDto = exports.LogoutAllDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
class LogoutAllDto {
}
exports.LogoutAllDto = LogoutAllDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'refresh-token-jwt-string', description: 'Refresh token to identify user and clear all sessions' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Refresh token is required' }),
    (0, class_validator_1.IsString)({ message: 'Refresh token must be a string' }),
    __metadata("design:type", String)
], LogoutAllDto.prototype, "refreshToken", void 0);
class LogoutAllResponseDto {
}
exports.LogoutAllResponseDto = LogoutAllResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: true, description: 'Indicating execution success status' }),
    __metadata("design:type", Boolean)
], LogoutAllResponseDto.prototype, "success", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'All active sessions and tokens terminated successfully', description: 'Status message' }),
    __metadata("design:type", String)
], LogoutAllResponseDto.prototype, "message", void 0);
//# sourceMappingURL=logout-all.dto.js.map
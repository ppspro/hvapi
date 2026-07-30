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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const auth_service_1 = require("../../application/use-cases/auth.service");
const request_otp_dto_1 = require("../dto/request-otp.dto");
const verify_otp_dto_1 = require("../dto/verify-otp.dto");
const refresh_token_dto_1 = require("../dto/refresh-token.dto");
const logout_dto_1 = require("../dto/logout.dto");
let AuthController = class AuthController {
    constructor(authService) {
        this.authService = authService;
    }
    async requestOtp(dto) {
        return this.authService.requestOtp(dto);
    }
    async verifyOtp(dto) {
        return this.authService.verifyOtp(dto);
    }
    async refreshToken(dto) {
        return this.authService.refreshToken(dto);
    }
    async logout(dto) {
        return this.authService.logout(dto);
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, common_1.Post)('otp/request'),
    (0, swagger_1.ApiOperation)({ summary: 'Request Phone OTP' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'OTP challenge generated', type: request_otp_dto_1.RequestOtpResponseDto }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [request_otp_dto_1.RequestOtpDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "requestOtp", null);
__decorate([
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, common_1.Post)('otp/verify'),
    (0, swagger_1.ApiOperation)({ summary: 'Verify Phone OTP & Login' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'OTP verified, JWT pair issued', type: verify_otp_dto_1.VerifyOtpResponseDto }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [verify_otp_dto_1.VerifyOtpDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "verifyOtp", null);
__decorate([
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, common_1.Post)('token/refresh'),
    (0, swagger_1.ApiOperation)({ summary: 'Refresh JWT Access Token' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Token rotated successfully', type: refresh_token_dto_1.RefreshTokenResponseDto }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [refresh_token_dto_1.RefreshTokenDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "refreshToken", null);
__decorate([
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, common_1.Post)('logout'),
    (0, swagger_1.ApiOperation)({ summary: 'User Session Logout' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Session terminated', type: logout_dto_1.LogoutResponseDto }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [logout_dto_1.LogoutDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "logout", null);
exports.AuthController = AuthController = __decorate([
    (0, swagger_1.ApiTags)('Authentication & Identity'),
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map
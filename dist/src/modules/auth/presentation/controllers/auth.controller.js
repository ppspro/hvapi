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
const passport_1 = require("@nestjs/passport");
const auth_service_1 = require("../../application/use-cases/auth.service");
const request_otp_dto_1 = require("../dto/request-otp.dto");
const verify_otp_dto_1 = require("../dto/verify-otp.dto");
const resend_otp_dto_1 = require("../dto/resend-otp.dto");
const refresh_token_dto_1 = require("../dto/refresh-token.dto");
const logout_dto_1 = require("../dto/logout.dto");
const logout_all_dto_1 = require("../dto/logout-all.dto");
const session_response_dto_1 = require("../dto/session-response.dto");
const user_me_response_dto_1 = require("../dto/user-me-response.dto");
let AuthController = class AuthController {
    constructor(authService) {
        this.authService = authService;
    }
    async requestOtp(req, dto) {
        const ipAddress = req.ip || req.headers['x-forwarded-for'] || '';
        return this.authService.requestOtp(dto, String(ipAddress));
    }
    async verifyOtp(req, dto) {
        const ipAddress = req.ip || req.headers['x-forwarded-for'] || '';
        const userAgent = req.headers['user-agent'] || '';
        return this.authService.verifyOtp(dto, String(ipAddress), String(userAgent));
    }
    async resendOtp(req, dto) {
        const ipAddress = req.ip || req.headers['x-forwarded-for'] || '';
        return this.authService.resendOtp(dto, String(ipAddress));
    }
    async refreshToken(req, dto) {
        const ipAddress = req.ip || req.headers['x-forwarded-for'] || '';
        return this.authService.refreshToken(dto, String(ipAddress));
    }
    async logout(req, dto) {
        const ipAddress = req.ip || req.headers['x-forwarded-for'] || '';
        return this.authService.logout(dto, String(ipAddress));
    }
    async logoutAll(req, dto) {
        const ipAddress = req.ip || req.headers['x-forwarded-for'] || '';
        return this.authService.logoutAll(dto, String(ipAddress));
    }
    async getMe(req) {
        const ipAddress = req.ip || req.headers['x-forwarded-for'] || '';
        return this.authService.getMe(req.user.userId, String(ipAddress));
    }
    async getSessions(req) {
        const ipAddress = req.ip || req.headers['x-forwarded-for'] || '';
        return this.authService.getActiveSessions(req.user.userId, String(ipAddress));
    }
    async revokeSession(req, sessionId) {
        const ipAddress = req.ip || req.headers['x-forwarded-for'] || '';
        await this.authService.revokeSession(sessionId, req.user.userId, String(ipAddress));
    }
    async revokeOtherSessions(req) {
        const ipAddress = req.ip || req.headers['x-forwarded-for'] || '';
        await this.authService.revokeOtherSessions(req.user.userId, req.user.sessionId, String(ipAddress));
    }
    async getRoles(req) {
        return { roles: req.user.roles || [] };
    }
    async getPermissions(req) {
        return { permissions: req.user.permissions || [] };
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, common_1.Post)('otp/request'),
    (0, swagger_1.ApiOperation)({ summary: 'Request Phone OTP' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'OTP challenge generated', type: request_otp_dto_1.RequestOtpResponseDto }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, request_otp_dto_1.RequestOtpDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "requestOtp", null);
__decorate([
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, common_1.Post)('otp/verify'),
    (0, swagger_1.ApiOperation)({ summary: 'Verify Phone OTP & Login' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'OTP verified, JWT pair issued', type: verify_otp_dto_1.VerifyOtpResponseDto }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, verify_otp_dto_1.VerifyOtpDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "verifyOtp", null);
__decorate([
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, common_1.Post)('otp/resend'),
    (0, swagger_1.ApiOperation)({ summary: 'Resend OTP to registered phone number' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'OTP challenge updated and resent', type: resend_otp_dto_1.ResendOtpResponseDto }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, resend_otp_dto_1.ResendOtpDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "resendOtp", null);
__decorate([
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, common_1.Post)('token/refresh'),
    (0, swagger_1.ApiOperation)({ summary: 'Refresh JWT Access Token' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Token rotated successfully', type: refresh_token_dto_1.RefreshTokenResponseDto }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, refresh_token_dto_1.RefreshTokenDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "refreshToken", null);
__decorate([
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, common_1.Post)('logout'),
    (0, swagger_1.ApiOperation)({ summary: 'User Session Logout' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Session terminated', type: logout_dto_1.LogoutResponseDto }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, logout_dto_1.LogoutDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "logout", null);
__decorate([
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, common_1.Post)('logout-all'),
    (0, swagger_1.ApiOperation)({ summary: 'Logout all devices and revoke all tokens' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'All active sessions and tokens terminated', type: logout_all_dto_1.LogoutAllResponseDto }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, logout_all_dto_1.LogoutAllDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "logoutAll", null);
__decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, swagger_1.ApiBearerAuth)('JWT-Auth'),
    (0, common_1.Get)('me'),
    (0, swagger_1.ApiOperation)({ summary: 'Get current user profile and claims' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Active profile details returned', type: user_me_response_dto_1.UserMeResponseDto }),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "getMe", null);
__decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, swagger_1.ApiBearerAuth)('JWT-Auth'),
    (0, common_1.Get)('sessions'),
    (0, swagger_1.ApiOperation)({ summary: 'List active sessions for authenticated user' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'List of active sessions', type: [session_response_dto_1.SessionResponseDto] }),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "getSessions", null);
__decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, swagger_1.ApiBearerAuth)('JWT-Auth'),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    (0, common_1.Delete)('sessions/:sessionId'),
    (0, swagger_1.ApiOperation)({ summary: 'Terminate a specific active session' }),
    (0, swagger_1.ApiResponse)({ status: 204, description: 'Session terminated' }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('sessionId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "revokeSession", null);
__decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, swagger_1.ApiBearerAuth)('JWT-Auth'),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    (0, common_1.Delete)('sessions'),
    (0, swagger_1.ApiOperation)({ summary: 'Terminate all other active sessions' }),
    (0, swagger_1.ApiResponse)({ status: 204, description: 'Other sessions terminated' }),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "revokeOtherSessions", null);
__decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, swagger_1.ApiBearerAuth)('JWT-Auth'),
    (0, common_1.Get)('roles'),
    (0, swagger_1.ApiOperation)({ summary: 'Get current user assigned roles' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'User roles list' }),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "getRoles", null);
__decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, swagger_1.ApiBearerAuth)('JWT-Auth'),
    (0, common_1.Get)('permissions'),
    (0, swagger_1.ApiOperation)({ summary: 'Get current user assigned permissions' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'User permissions list' }),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "getPermissions", null);
exports.AuthController = AuthController = __decorate([
    (0, swagger_1.ApiTags)('Authentication & Identity'),
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map
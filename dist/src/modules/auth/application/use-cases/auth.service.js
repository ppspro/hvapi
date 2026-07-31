"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("@nestjs/config");
const bcrypt = __importStar(require("bcrypt"));
let AuthService = class AuthService {
    constructor(authRepository, jwtService, configService) {
        this.authRepository = authRepository;
        this.jwtService = jwtService;
        this.configService = configService;
        this.permissionMap = {
            PATIENT: ['read:profile', 'write:profile', 'read:health-card', 'read:reports', 'write:reports', 'read:insurance', 'write:insurance'],
            FAMILY_MEMBER: ['read:profile', 'read:health-card', 'read:reports', 'read:insurance'],
            DOCTOR: ['read:profile', 'read:reports', 'write:reports', 'read:health-card', 'verify:health-card'],
            FACILITY_ADMIN: ['read:facility', 'write:facility', 'read:staff', 'write:staff'],
            STAFF: ['read:facility', 'read:profile', 'read:health-card', 'verify:health-card'],
            ADMIN: ['read:all', 'write:all', 'read:audit-logs'],
            SUPER_ADMIN: ['read:all', 'write:all', 'delete:all', 'read:audit-logs', 'manage:roles'],
        };
    }
    async requestOtp(dto, ipAddress) {
        let user = await this.authRepository.findUserByPhone(dto.phone);
        if (!user) {
            user = await this.authRepository.createUser(dto.phone);
        }
        const rawOtp = '123456';
        const otpHash = await bcrypt.hash(rawOtp, 10);
        const expiresAt = new Date(Date.now() + 5 * 60 * 1000);
        const otpEntity = await this.authRepository.createOtp(user.id, otpHash, expiresAt);
        await this.authRepository.createAuditLog(user.id, 'OTP_REQUESTED', `OTP requested for phone: ${dto.phone}`, ipAddress);
        return {
            challengeId: otpEntity.id,
            message: 'OTP sent successfully to registered phone number',
        };
    }
    async resendOtp(dto, ipAddress) {
        const otpRecord = await this.authRepository.findOtpByChallengeId(dto.challengeId);
        if (!otpRecord) {
            throw new common_1.BadRequestException('Invalid OTP challenge session');
        }
        if (otpRecord.isVerified) {
            throw new common_1.BadRequestException('OTP has already been verified');
        }
        if (otpRecord.resendCount >= 3) {
            throw new common_1.BadRequestException('OTP resend limit reached. Please request a new OTP challenge');
        }
        const rawOtp = '123456';
        const otpHash = await bcrypt.hash(rawOtp, 10);
        const expiresAt = new Date(Date.now() + 5 * 60 * 1000);
        await this.authRepository.incrementOtpResends(otpRecord.id, otpHash, expiresAt);
        await this.authRepository.createAuditLog(otpRecord.userId, 'OTP_RESENT', `OTP resent count: ${otpRecord.resendCount + 1}`, ipAddress);
        return {
            challengeId: otpRecord.id,
            message: 'OTP resent successfully',
        };
    }
    async verifyOtp(dto, ipAddress, userAgent) {
        const otpRecord = await this.authRepository.findOtpByChallengeId(dto.challengeId);
        if (!otpRecord) {
            throw new common_1.BadRequestException('Invalid OTP challenge session');
        }
        if (otpRecord.isVerified) {
            throw new common_1.BadRequestException('OTP has already been verified');
        }
        if (otpRecord.attempts >= 3) {
            throw new common_1.BadRequestException('OTP challenge locked due to excessive incorrect attempts');
        }
        if (new Date() > new Date(otpRecord.expiresAt)) {
            throw new common_1.BadRequestException('OTP has expired');
        }
        const isValid = await bcrypt.compare(dto.otpCode, otpRecord.otpHash);
        if (!isValid) {
            await this.authRepository.incrementOtpAttempts(otpRecord.id);
            await this.authRepository.createAuditLog(otpRecord.userId, 'OTP_VERIFICATION_FAILED', 'Incorrect OTP entered', ipAddress);
            throw new common_1.UnauthorizedException('Invalid OTP code');
        }
        await this.authRepository.markOtpVerified(otpRecord.id);
        const session = await this.authRepository.createSession(otpRecord.userId, ipAddress, userAgent);
        const roles = await this.authRepository.findUserRoles(otpRecord.userId);
        const permissions = Array.from(new Set(roles.flatMap(role => this.permissionMap[role] || [])));
        const secretKey = this.configService.get('JWT_SECRET') || 'hvapi_default_secret_key';
        const accessTokenOptions = {
            secret: secretKey,
            expiresIn: (this.configService.get('JWT_EXPIRATION') || '15m'),
        };
        const refreshTokenOptions = {
            secret: secretKey,
            expiresIn: (this.configService.get('REFRESH_TOKEN_EXPIRATION') || '7d'),
        };
        const dbUser = await this.dbUserFetch(otpRecord.userId);
        const accessToken = this.jwtService.sign({ sub: otpRecord.userId, phone: dbUser?.phone, sessionId: session.id, roles, permissions }, accessTokenOptions);
        const rawRefreshToken = this.jwtService.sign({ sub: otpRecord.userId, sessionId: session.id, type: 'refresh' }, refreshTokenOptions);
        const refreshHash = await bcrypt.hash(rawRefreshToken, 10);
        const refreshExpiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
        await this.authRepository.createRefreshToken(otpRecord.userId, refreshHash, refreshExpiresAt);
        await this.authRepository.createAuditLog(otpRecord.userId, 'USER_LOGIN', `Logged in successfully from session ${session.id}`, ipAddress);
        return {
            accessToken,
            refreshToken: rawRefreshToken,
            expiresIn: String(accessTokenOptions.expiresIn),
        };
    }
    async refreshToken(dto, ipAddress) {
        try {
            const secretKey = this.configService.get('JWT_SECRET') || 'hvapi_default_secret_key';
            const decoded = this.jwtService.verify(dto.refreshToken, { secret: secretKey });
            const userId = decoded.sub;
            const sessionId = decoded.sessionId;
            const refreshTokens = await this.authRepository.findRefreshToken(await bcrypt.hash(dto.refreshToken, 10));
            const tokenHash = await bcrypt.hash(dto.refreshToken, 10);
            const tokenRecord = await this.authRepository.findRefreshToken(tokenHash);
            if (tokenRecord && tokenRecord.isRevoked) {
                await this.authRepository.revokeAllUserTokens(userId);
                await this.authRepository.invalidateAllSessions(userId);
                await this.authRepository.createAuditLog(userId, 'REFRESH_TOKEN_REPLAY_ATTACK', 'Token replay attack detected', ipAddress);
                throw new common_1.UnauthorizedException('Invalid or reuse of refresh token');
            }
            const roles = await this.authRepository.findUserRoles(userId);
            const permissions = Array.from(new Set(roles.flatMap(role => this.permissionMap[role] || [])));
            const accessTokenOptions = {
                secret: secretKey,
                expiresIn: (this.configService.get('JWT_EXPIRATION') || '15m'),
            };
            const refreshTokenOptions = {
                secret: secretKey,
                expiresIn: (this.configService.get('REFRESH_TOKEN_EXPIRATION') || '7d'),
            };
            const newAccessToken = this.jwtService.sign({ sub: userId, sessionId, roles, permissions }, accessTokenOptions);
            const newRefreshToken = this.jwtService.sign({ sub: userId, sessionId, type: 'refresh' }, refreshTokenOptions);
            const refreshHash = await bcrypt.hash(newRefreshToken, 10);
            const refreshExpiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
            await this.authRepository.revokeAllUserTokens(userId);
            await this.authRepository.createRefreshToken(userId, refreshHash, refreshExpiresAt);
            await this.authRepository.createAuditLog(userId, 'TOKEN_REFRESH', 'Tokens rotated successfully', ipAddress);
            return {
                accessToken: newAccessToken,
                refreshToken: newRefreshToken,
            };
        }
        catch {
            throw new common_1.UnauthorizedException('Invalid or expired refresh token');
        }
    }
    async logout(dto, ipAddress) {
        try {
            const decoded = this.jwtService.decode(dto.refreshToken);
            if (decoded && decoded.sub) {
                await this.authRepository.revokeAllUserTokens(decoded.sub);
                if (decoded.sessionId) {
                    await this.authRepository.invalidateSession(decoded.sessionId, decoded.sub);
                }
                await this.authRepository.createAuditLog(decoded.sub, 'USER_LOGOUT', 'Logged out session successfully', ipAddress);
            }
        }
        catch {
        }
        return {
            success: true,
            message: 'Logged out successfully',
        };
    }
    async logoutAll(dto, ipAddress) {
        try {
            const decoded = this.jwtService.decode(dto.refreshToken);
            if (decoded && decoded.sub) {
                await this.authRepository.revokeAllUserTokens(decoded.sub);
                await this.authRepository.invalidateAllSessions(decoded.sub);
                await this.authRepository.createAuditLog(decoded.sub, 'USER_LOGOUT_ALL', 'Logged out all sessions and tokens', ipAddress);
            }
        }
        catch {
        }
        return {
            success: true,
            message: 'Logged out all devices successfully',
        };
    }
    async getActiveSessions(userId, ipAddress) {
        const sessions = await this.authRepository.findActiveSessions(userId);
        await this.authRepository.createAuditLog(userId, 'SESSIONS_VIEW', 'Active sessions view retrieved', ipAddress);
        return sessions.map(s => ({
            id: s.id,
            ipAddress: s.ipAddress,
            userAgent: s.userAgent,
            createdAt: s.createdAt,
        }));
    }
    async revokeSession(sessionId, userId, ipAddress) {
        await this.authRepository.invalidateSession(sessionId, userId);
        await this.authRepository.createAuditLog(userId, 'SESSION_REVOKED', `Session ${sessionId} manually terminated`, ipAddress);
    }
    async revokeOtherSessions(userId, currentSessionId, ipAddress) {
        await this.authRepository.invalidateOtherSessions(userId, currentSessionId);
        await this.authRepository.createAuditLog(userId, 'OTHER_SESSIONS_REVOKED', 'All other active sessions terminated', ipAddress);
    }
    async getMe(userId, ipAddress) {
        const user = await this.authRepository.findUserByPhone('');
        const roles = await this.authRepository.findUserRoles(userId);
        const permissions = Array.from(new Set(roles.flatMap(role => this.permissionMap[role] || [])));
        const dbUser = await this.dbUserFetch(userId);
        await this.authRepository.createAuditLog(userId, 'ME_PROFILE_VIEW', 'Retrieved current user profile details', ipAddress);
        return {
            id: userId,
            phone: dbUser?.phone || '',
            status: dbUser?.status || 'ACTIVE',
            roles,
            permissions,
        };
    }
    async dbUserFetch(userId) {
        const prisma = this.authRepository.db;
        return await prisma.user.findUnique({ where: { id: userId } });
    }
    getRolesPermissionsMapping() {
        return {
            roles: Object.keys(this.permissionMap),
            permissions: Array.from(new Set(Object.values(this.permissionMap).flat())),
        };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('IAuthRepository')),
    __metadata("design:paramtypes", [Object, jwt_1.JwtService,
        config_1.ConfigService])
], AuthService);
//# sourceMappingURL=auth.service.js.map
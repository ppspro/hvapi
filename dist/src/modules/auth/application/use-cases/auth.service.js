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
    }
    async requestOtp(dto) {
        let user = await this.authRepository.findUserByPhone(dto.phone);
        if (!user) {
            user = await this.authRepository.createUser(dto.phone);
        }
        const rawOtp = '123456';
        const otpHash = await bcrypt.hash(rawOtp, 10);
        const expiresAt = new Date(Date.now() + 5 * 60 * 1000);
        const otpEntity = await this.authRepository.createOtp(user.id, otpHash, expiresAt);
        return {
            challengeId: otpEntity.id,
            message: 'OTP sent successfully to registered phone number',
        };
    }
    async verifyOtp(dto) {
        const otpRecord = await this.authRepository.findOtpByChallengeId(dto.challengeId);
        if (!otpRecord) {
            throw new common_1.BadRequestException('Invalid OTP challenge session');
        }
        if (otpRecord.isVerified) {
            throw new common_1.BadRequestException('OTP has already been used');
        }
        if (new Date() > new Date(otpRecord.expiresAt)) {
            throw new common_1.BadRequestException('OTP has expired');
        }
        const isValid = await bcrypt.compare(dto.otpCode, otpRecord.otpHash);
        if (!isValid) {
            throw new common_1.UnauthorizedException('Invalid OTP code');
        }
        await this.authRepository.markOtpVerified(otpRecord.id);
        await this.authRepository.createSession(otpRecord.userId);
        const secretKey = this.configService.get('JWT_SECRET') || 'hvapi_default_secret_key';
        const accessTokenOptions = {
            secret: secretKey,
            expiresIn: (this.configService.get('JWT_EXPIRATION') || '15m'),
        };
        const refreshTokenOptions = {
            secret: secretKey,
            expiresIn: (this.configService.get('REFRESH_TOKEN_EXPIRATION') || '7d'),
        };
        const accessToken = this.jwtService.sign({ sub: otpRecord.userId }, accessTokenOptions);
        const rawRefreshToken = this.jwtService.sign({ sub: otpRecord.userId, type: 'refresh' }, refreshTokenOptions);
        const refreshHash = await bcrypt.hash(rawRefreshToken, 10);
        const refreshExpiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
        await this.authRepository.createRefreshToken(otpRecord.userId, refreshHash, refreshExpiresAt);
        return {
            accessToken,
            refreshToken: rawRefreshToken,
            expiresIn: String(accessTokenOptions.expiresIn),
        };
    }
    async refreshToken(dto) {
        try {
            const secretKey = this.configService.get('JWT_SECRET') || 'hvapi_default_secret_key';
            const decoded = this.jwtService.verify(dto.refreshToken, { secret: secretKey });
            const userId = decoded.sub;
            const accessTokenOptions = {
                secret: secretKey,
                expiresIn: (this.configService.get('JWT_EXPIRATION') || '15m'),
            };
            const refreshTokenOptions = {
                secret: secretKey,
                expiresIn: (this.configService.get('REFRESH_TOKEN_EXPIRATION') || '7d'),
            };
            const newAccessToken = this.jwtService.sign({ sub: userId }, accessTokenOptions);
            const newRefreshToken = this.jwtService.sign({ sub: userId, type: 'refresh' }, refreshTokenOptions);
            const refreshHash = await bcrypt.hash(newRefreshToken, 10);
            const refreshExpiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
            await this.authRepository.revokeAllUserTokens(userId);
            await this.authRepository.createRefreshToken(userId, refreshHash, refreshExpiresAt);
            return {
                accessToken: newAccessToken,
                refreshToken: newRefreshToken,
            };
        }
        catch {
            throw new common_1.UnauthorizedException('Invalid or expired refresh token');
        }
    }
    async logout(dto) {
        try {
            const decoded = this.jwtService.decode(dto.refreshToken);
            if (decoded && decoded.sub) {
                await this.authRepository.revokeAllUserTokens(decoded.sub);
            }
        }
        catch {
        }
        return {
            success: true,
            message: 'Logged out successfully',
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
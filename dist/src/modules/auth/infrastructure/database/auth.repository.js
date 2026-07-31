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
exports.AuthRepository = void 0;
const common_1 = require("@nestjs/common");
const database_service_1 = require("../../../../database/database.service");
let AuthRepository = class AuthRepository {
    constructor(db) {
        this.db = db;
    }
    async findUserByPhone(phone) {
        return (await this.db.user.findUnique({ where: { phone } }));
    }
    async createUser(phone) {
        const user = await this.db.user.create({ data: { phone } });
        let role = await this.db.role.findUnique({ where: { name: 'PATIENT' } });
        if (!role) {
            role = await this.db.role.create({
                data: { name: 'PATIENT', description: 'Default Patient Role' },
            });
        }
        await this.db.userRole.create({
            data: {
                userId: user.id,
                roleId: role.id,
            },
        });
        return user;
    }
    async createOtp(userId, otpHash, expiresAt) {
        return (await this.db.authOtp.create({
            data: { userId, otpHash, expiresAt },
        }));
    }
    async findOtpByChallengeId(challengeId) {
        return (await this.db.authOtp.findUnique({ where: { id: challengeId } }));
    }
    async markOtpVerified(otpId) {
        await this.db.authOtp.update({
            where: { id: otpId },
            data: { isVerified: true },
        });
    }
    async incrementOtpAttempts(otpId) {
        await this.db.authOtp.update({
            where: { id: otpId },
            data: { attempts: { increment: 1 } },
        });
    }
    async incrementOtpResends(otpId, newHash, newExpiresAt) {
        await this.db.authOtp.update({
            where: { id: otpId },
            data: {
                otpHash: newHash,
                expiresAt: newExpiresAt,
                resendCount: { increment: 1 },
            },
        });
    }
    async createSession(userId, ipAddress, userAgent) {
        return await this.db.userSession.create({
            data: { userId, ipAddress, userAgent, isActive: true },
        });
    }
    async findActiveSessions(userId) {
        return await this.db.userSession.findMany({
            where: { userId, isActive: true },
            orderBy: { createdAt: 'desc' },
        });
    }
    async invalidateSession(sessionId, userId) {
        await this.db.userSession.update({
            where: { id: sessionId, userId },
            data: { isActive: false },
        });
    }
    async invalidateAllSessions(userId) {
        await this.db.userSession.updateMany({
            where: { userId, isActive: true },
            data: { isActive: false },
        });
    }
    async invalidateOtherSessions(userId, currentSessionId) {
        await this.db.userSession.updateMany({
            where: { userId, id: { not: currentSessionId }, isActive: true },
            data: { isActive: false },
        });
    }
    async createRefreshToken(userId, tokenHash, expiresAt) {
        return (await this.db.refreshToken.create({
            data: { userId, tokenHash, expiresAt },
        }));
    }
    async findRefreshToken(tokenHash) {
        return (await this.db.refreshToken.findFirst({ where: { tokenHash } }));
    }
    async revokeRefreshToken(tokenId) {
        await this.db.refreshToken.update({
            where: { id: tokenId },
            data: { isRevoked: true },
        });
    }
    async revokeAllUserTokens(userId) {
        await this.db.refreshToken.updateMany({
            where: { userId, isRevoked: false },
            data: { isRevoked: true },
        });
    }
    async createAuditLog(userId, action, details, ipAddress) {
        await this.db.auditLog.create({
            data: { userId, action, details, ipAddress },
        });
    }
    async findUserRoles(userId) {
        const userRoles = await this.db.userRole.findMany({
            where: { userId },
            include: { role: true },
        });
        return userRoles.map(ur => ur.role.name);
    }
};
exports.AuthRepository = AuthRepository;
exports.AuthRepository = AuthRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [database_service_1.DatabaseService])
], AuthRepository);
//# sourceMappingURL=auth.repository.js.map
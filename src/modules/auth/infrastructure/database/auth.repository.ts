import { Injectable } from '@nestjs/common';
import { DatabaseService } from '@database/database.service';
import { IAuthRepository } from '../../domain/repositories/auth.repository.interface';
import { UserEntity, AuthOtpEntity, RefreshTokenEntity } from '../../domain/entities/auth.entity';

@Injectable()
export class AuthRepository implements IAuthRepository {
  constructor(private readonly db: DatabaseService) {}

  async findUserByPhone(phone: string): Promise<UserEntity | null> {
    return (await this.db.user.findUnique({ where: { phone } })) as UserEntity | null;
  }

  async createUser(phone: string): Promise<UserEntity> {
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
    return user as UserEntity;
  }

  async createOtp(userId: string, otpHash: string, expiresAt: Date): Promise<AuthOtpEntity> {
    return (await this.db.authOtp.create({
      data: { userId, otpHash, expiresAt },
    })) as AuthOtpEntity;
  }

  async findOtpByChallengeId(challengeId: string): Promise<AuthOtpEntity | null> {
    return (await this.db.authOtp.findUnique({ where: { id: challengeId } })) as AuthOtpEntity | null;
  }

  async markOtpVerified(otpId: string): Promise<void> {
    await this.db.authOtp.update({
      where: { id: otpId },
      data: { isVerified: true },
    });
  }

  async incrementOtpAttempts(otpId: string): Promise<void> {
    await this.db.authOtp.update({
      where: { id: otpId },
      data: { attempts: { increment: 1 } },
    });
  }

  async incrementOtpResends(otpId: string, newHash: string, newExpiresAt: Date): Promise<void> {
    await this.db.authOtp.update({
      where: { id: otpId },
      data: {
        otpHash: newHash,
        expiresAt: newExpiresAt,
        resendCount: { increment: 1 },
      },
    });
  }

  async createSession(userId: string, ipAddress?: string, userAgent?: string): Promise<any> {
    return await this.db.userSession.create({
      data: { userId, ipAddress, userAgent, isActive: true },
    });
  }

  async findActiveSessions(userId: string): Promise<any[]> {
    return await this.db.userSession.findMany({
      where: { userId, isActive: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  async invalidateSession(sessionId: string, userId: string): Promise<void> {
    await this.db.userSession.update({
      where: { id: sessionId, userId },
      data: { isActive: false },
    });
  }

  async invalidateAllSessions(userId: string): Promise<void> {
    await this.db.userSession.updateMany({
      where: { userId, isActive: true },
      data: { isActive: false },
    });
  }

  async invalidateOtherSessions(userId: string, currentSessionId: string): Promise<void> {
    await this.db.userSession.updateMany({
      where: { userId, id: { not: currentSessionId }, isActive: true },
      data: { isActive: false },
    });
  }

  async createRefreshToken(userId: string, tokenHash: string, expiresAt: Date): Promise<RefreshTokenEntity> {
    return (await this.db.refreshToken.create({
      data: { userId, tokenHash, expiresAt },
    })) as RefreshTokenEntity;
  }

  async findRefreshToken(tokenHash: string): Promise<RefreshTokenEntity | null> {
    return (await this.db.refreshToken.findFirst({ where: { tokenHash } })) as RefreshTokenEntity | null;
  }

  async revokeRefreshToken(tokenId: string): Promise<void> {
    await this.db.refreshToken.update({
      where: { id: tokenId },
      data: { isRevoked: true },
    });
  }

  async revokeAllUserTokens(userId: string): Promise<void> {
    await this.db.refreshToken.updateMany({
      where: { userId, isRevoked: false },
      data: { isRevoked: true },
    });
  }

  async createAuditLog(userId: string, action: string, details?: string, ipAddress?: string): Promise<void> {
    await this.db.auditLog.create({
      data: { userId, action, details, ipAddress },
    });
  }

  async findUserRoles(userId: string): Promise<string[]> {
    const userRoles = await this.db.userRole.findMany({
      where: { userId },
      include: { role: true },
    });
    return userRoles.map(ur => ur.role.name);
  }
}

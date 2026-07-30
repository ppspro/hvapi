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
    return (await this.db.user.create({ data: { phone } })) as UserEntity;
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

  async createSession(userId: string, ipAddress?: string, userAgent?: string): Promise<void> {
    await this.db.userSession.create({
      data: { userId, ipAddress, userAgent },
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
}

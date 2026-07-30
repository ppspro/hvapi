import { DatabaseService } from "../../../../database/database.service";
import { IAuthRepository } from '../../domain/repositories/auth.repository.interface';
import { UserEntity, AuthOtpEntity, RefreshTokenEntity } from '../../domain/entities/auth.entity';
export declare class AuthRepository implements IAuthRepository {
    private readonly db;
    constructor(db: DatabaseService);
    findUserByPhone(phone: string): Promise<UserEntity | null>;
    createUser(phone: string): Promise<UserEntity>;
    createOtp(userId: string, otpHash: string, expiresAt: Date): Promise<AuthOtpEntity>;
    findOtpByChallengeId(challengeId: string): Promise<AuthOtpEntity | null>;
    markOtpVerified(otpId: string): Promise<void>;
    createSession(userId: string, ipAddress?: string, userAgent?: string): Promise<void>;
    createRefreshToken(userId: string, tokenHash: string, expiresAt: Date): Promise<RefreshTokenEntity>;
    findRefreshToken(tokenHash: string): Promise<RefreshTokenEntity | null>;
    revokeRefreshToken(tokenId: string): Promise<void>;
    revokeAllUserTokens(userId: string): Promise<void>;
}

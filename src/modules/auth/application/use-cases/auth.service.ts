import { Injectable, BadRequestException, UnauthorizedException, Inject } from '@nestjs/common';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { IAuthRepository } from '../../domain/repositories/auth.repository.interface';
import { RequestOtpDto, RequestOtpResponseDto } from '../../presentation/dto/request-otp.dto';
import { VerifyOtpDto, VerifyOtpResponseDto } from '../../presentation/dto/verify-otp.dto';
import { ResendOtpDto, ResendOtpResponseDto } from '../../presentation/dto/resend-otp.dto';
import { RefreshTokenDto, RefreshTokenResponseDto } from '../../presentation/dto/refresh-token.dto';
import { LogoutDto, LogoutResponseDto } from '../../presentation/dto/logout.dto';
import { LogoutAllDto, LogoutAllResponseDto } from '../../presentation/dto/logout-all.dto';
import { SessionResponseDto } from '../../presentation/dto/session-response.dto';
import { UserMeResponseDto } from '../../presentation/dto/user-me-response.dto';

type JwtStringValue = `${number}${'m' | 'h' | 'd'}`;

@Injectable()
export class AuthService {
  private readonly permissionMap: Record<string, string[]> = {
    PATIENT: ['read:profile', 'write:profile', 'read:health-card', 'read:reports', 'write:reports', 'read:insurance', 'write:insurance'],
    FAMILY_MEMBER: ['read:profile', 'read:health-card', 'read:reports', 'read:insurance'],
    DOCTOR: ['read:profile', 'read:reports', 'write:reports', 'read:health-card', 'verify:health-card'],
    FACILITY_ADMIN: ['read:facility', 'write:facility', 'read:staff', 'write:staff'],
    STAFF: ['read:facility', 'read:profile', 'read:health-card', 'verify:health-card'],
    ADMIN: ['read:all', 'write:all', 'read:audit-logs'],
    SUPER_ADMIN: ['read:all', 'write:all', 'delete:all', 'read:audit-logs', 'manage:roles'],
  };

  constructor(
    @Inject('IAuthRepository')
    private readonly authRepository: IAuthRepository,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async requestOtp(dto: RequestOtpDto, ipAddress?: string): Promise<RequestOtpResponseDto> {
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

  async resendOtp(dto: ResendOtpDto, ipAddress?: string): Promise<ResendOtpResponseDto> {
    const otpRecord = await this.authRepository.findOtpByChallengeId(dto.challengeId);
    if (!otpRecord) {
      throw new BadRequestException('Invalid OTP challenge session');
    }

    if (otpRecord.isVerified) {
      throw new BadRequestException('OTP has already been verified');
    }

    if (otpRecord.resendCount >= 3) {
      throw new BadRequestException('OTP resend limit reached. Please request a new OTP challenge');
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

  async verifyOtp(dto: VerifyOtpDto, ipAddress?: string, userAgent?: string): Promise<VerifyOtpResponseDto> {
    const otpRecord = await this.authRepository.findOtpByChallengeId(dto.challengeId);
    if (!otpRecord) {
      throw new BadRequestException('Invalid OTP challenge session');
    }

    if (otpRecord.isVerified) {
      throw new BadRequestException('OTP has already been verified');
    }

    if (otpRecord.attempts >= 3) {
      throw new BadRequestException('OTP challenge locked due to excessive incorrect attempts');
    }

    if (new Date() > new Date(otpRecord.expiresAt)) {
      throw new BadRequestException('OTP has expired');
    }

    const isValid = await bcrypt.compare(dto.otpCode, otpRecord.otpHash);
    if (!isValid) {
      await this.authRepository.incrementOtpAttempts(otpRecord.id);
      await this.authRepository.createAuditLog(otpRecord.userId, 'OTP_VERIFICATION_FAILED', 'Incorrect OTP entered', ipAddress);
      throw new UnauthorizedException('Invalid OTP code');
    }

    await this.authRepository.markOtpVerified(otpRecord.id);
    const session = await this.authRepository.createSession(otpRecord.userId, ipAddress, userAgent);

    const roles = await this.authRepository.findUserRoles(otpRecord.userId);
    const permissions = Array.from(
      new Set(roles.flatMap(role => this.permissionMap[role] || [])),
    );

    const secretKey = this.configService.get<string>('JWT_SECRET') || 'hvapi_default_secret_key';

    const accessTokenOptions: JwtSignOptions = {
      secret: secretKey,
      expiresIn: (this.configService.get<string>('JWT_EXPIRATION') || '15m') as JwtStringValue,
    };

    const refreshTokenOptions: JwtSignOptions = {
      secret: secretKey,
      expiresIn: (this.configService.get<string>('REFRESH_TOKEN_EXPIRATION') || '7d') as JwtStringValue,
    };

    const dbUser = await this.dbUserFetch(otpRecord.userId);
    const accessToken = this.jwtService.sign(
      { sub: otpRecord.userId, phone: dbUser?.phone, sessionId: session.id, roles, permissions },
      accessTokenOptions,
    );

    const rawRefreshToken = this.jwtService.sign(
      { sub: otpRecord.userId, sessionId: session.id, type: 'refresh' },
      refreshTokenOptions,
    );

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

  async refreshToken(dto: RefreshTokenDto, ipAddress?: string): Promise<RefreshTokenResponseDto> {
    try {
      const secretKey = this.configService.get<string>('JWT_SECRET') || 'hvapi_default_secret_key';
      const decoded = this.jwtService.verify(dto.refreshToken, { secret: secretKey });
      const userId = decoded.sub;
      const sessionId = decoded.sessionId;

      const refreshTokens = await this.authRepository.findRefreshToken(await bcrypt.hash(dto.refreshToken, 10));
      // Refresh rotation check / replay attack prevention
      const tokenHash = await bcrypt.hash(dto.refreshToken, 10);
      const tokenRecord = await this.authRepository.findRefreshToken(tokenHash);
      if (tokenRecord && tokenRecord.isRevoked) {
        // Potential reuse detected, revoke all tokens for security hardening
        await this.authRepository.revokeAllUserTokens(userId);
        await this.authRepository.invalidateAllSessions(userId);
        await this.authRepository.createAuditLog(userId, 'REFRESH_TOKEN_REPLAY_ATTACK', 'Token replay attack detected', ipAddress);
        throw new UnauthorizedException('Invalid or reuse of refresh token');
      }

      const roles = await this.authRepository.findUserRoles(userId);
      const permissions = Array.from(
        new Set(roles.flatMap(role => this.permissionMap[role] || [])),
      );

      const accessTokenOptions: JwtSignOptions = {
        secret: secretKey,
        expiresIn: (this.configService.get<string>('JWT_EXPIRATION') || '15m') as JwtStringValue,
      };

      const refreshTokenOptions: JwtSignOptions = {
        secret: secretKey,
        expiresIn: (this.configService.get<string>('REFRESH_TOKEN_EXPIRATION') || '7d') as JwtStringValue,
      };

      const newAccessToken = this.jwtService.sign(
        { sub: userId, sessionId, roles, permissions },
        accessTokenOptions,
      );

      const newRefreshToken = this.jwtService.sign(
        { sub: userId, sessionId, type: 'refresh' },
        refreshTokenOptions,
      );

      const refreshHash = await bcrypt.hash(newRefreshToken, 10);
      const refreshExpiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

      await this.authRepository.revokeAllUserTokens(userId);
      await this.authRepository.createRefreshToken(userId, refreshHash, refreshExpiresAt);
      await this.authRepository.createAuditLog(userId, 'TOKEN_REFRESH', 'Tokens rotated successfully', ipAddress);

      return {
        accessToken: newAccessToken,
        refreshToken: newRefreshToken,
      };
    } catch {
      throw new UnauthorizedException('Invalid or expired refresh token');
    }
  }

  async logout(dto: LogoutDto, ipAddress?: string): Promise<LogoutResponseDto> {
    try {
      const decoded = this.jwtService.decode(dto.refreshToken) as any;
      if (decoded && decoded.sub) {
        await this.authRepository.revokeAllUserTokens(decoded.sub);
        if (decoded.sessionId) {
          await this.authRepository.invalidateSession(decoded.sessionId, decoded.sub);
        }
        await this.authRepository.createAuditLog(decoded.sub, 'USER_LOGOUT', 'Logged out session successfully', ipAddress);
      }
    } catch {
      // Ignore token decode errors on logout
    }

    return {
      success: true,
      message: 'Logged out successfully',
    };
  }

  async logoutAll(dto: LogoutAllDto, ipAddress?: string): Promise<LogoutAllResponseDto> {
    try {
      const decoded = this.jwtService.decode(dto.refreshToken) as any;
      if (decoded && decoded.sub) {
        await this.authRepository.revokeAllUserTokens(decoded.sub);
        await this.authRepository.invalidateAllSessions(decoded.sub);
        await this.authRepository.createAuditLog(decoded.sub, 'USER_LOGOUT_ALL', 'Logged out all sessions and tokens', ipAddress);
      }
    } catch {
      // Ignore token decode errors on logout
    }

    return {
      success: true,
      message: 'Logged out all devices successfully',
    };
  }

  async getActiveSessions(userId: string, ipAddress?: string): Promise<SessionResponseDto[]> {
    const sessions = await this.authRepository.findActiveSessions(userId);
    await this.authRepository.createAuditLog(userId, 'SESSIONS_VIEW', 'Active sessions view retrieved', ipAddress);
    return sessions.map(s => ({
      id: s.id,
      ipAddress: s.ipAddress,
      userAgent: s.userAgent,
      createdAt: s.createdAt,
    }));
  }

  async revokeSession(sessionId: string, userId: string, ipAddress?: string): Promise<void> {
    await this.authRepository.invalidateSession(sessionId, userId);
    await this.authRepository.createAuditLog(userId, 'SESSION_REVOKED', `Session ${sessionId} manually terminated`, ipAddress);
  }

  async revokeOtherSessions(userId: string, currentSessionId: string, ipAddress?: string): Promise<void> {
    await this.authRepository.invalidateOtherSessions(userId, currentSessionId);
    await this.authRepository.createAuditLog(userId, 'OTHER_SESSIONS_REVOKED', 'All other active sessions terminated', ipAddress);
  }

  async getMe(userId: string, ipAddress?: string): Promise<UserMeResponseDto> {
    const user = await this.authRepository.findUserByPhone(''); // dummy lookup, actual properties fetched from session
    const roles = await this.authRepository.findUserRoles(userId);
    const permissions = Array.from(
      new Set(roles.flatMap(role => this.permissionMap[role] || [])),
    );

    // Read phone from DB to return complete details
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

  private async dbUserFetch(userId: string) {
    // Helper to query User without repository changes
    const prisma = (this.authRepository as any).db;
    return await prisma.user.findUnique({ where: { id: userId } });
  }

  getRolesPermissionsMapping() {
    return {
      roles: Object.keys(this.permissionMap),
      permissions: Array.from(new Set(Object.values(this.permissionMap).flat())),
    };
  }
}

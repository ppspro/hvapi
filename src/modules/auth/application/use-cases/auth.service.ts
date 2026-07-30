import { Injectable, BadRequestException, UnauthorizedException, Inject } from '@nestjs/common';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { IAuthRepository } from '../../domain/repositories/auth.repository.interface';
import { RequestOtpDto, RequestOtpResponseDto } from '../../presentation/dto/request-otp.dto';
import { VerifyOtpDto, VerifyOtpResponseDto } from '../../presentation/dto/verify-otp.dto';
import { RefreshTokenDto, RefreshTokenResponseDto } from '../../presentation/dto/refresh-token.dto';
import { LogoutDto, LogoutResponseDto } from '../../presentation/dto/logout.dto';

type JwtStringValue = `${number}${'m' | 'h' | 'd'}`;

@Injectable()
export class AuthService {
  constructor(
    @Inject('IAuthRepository')
    private readonly authRepository: IAuthRepository,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async requestOtp(dto: RequestOtpDto): Promise<RequestOtpResponseDto> {
    let user = await this.authRepository.findUserByPhone(dto.phone);
    if (!user) {
      user = await this.authRepository.createUser(dto.phone);
    }

    // Static OTP for dev/test environment per PRD spec (e.g. 123456)
    const rawOtp = '123456';
    const otpHash = await bcrypt.hash(rawOtp, 10);
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes expiration

    const otpEntity = await this.authRepository.createOtp(user.id, otpHash, expiresAt);

    return {
      challengeId: otpEntity.id,
      message: 'OTP sent successfully to registered phone number',
    };
  }

  async verifyOtp(dto: VerifyOtpDto): Promise<VerifyOtpResponseDto> {
    const otpRecord = await this.authRepository.findOtpByChallengeId(dto.challengeId);
    if (!otpRecord) {
      throw new BadRequestException('Invalid OTP challenge session');
    }

    if (otpRecord.isVerified) {
      throw new BadRequestException('OTP has already been used');
    }

    if (new Date() > new Date(otpRecord.expiresAt)) {
      throw new BadRequestException('OTP has expired');
    }

    const isValid = await bcrypt.compare(dto.otpCode, otpRecord.otpHash);
    if (!isValid) {
      throw new UnauthorizedException('Invalid OTP code');
    }

    await this.authRepository.markOtpVerified(otpRecord.id);
    await this.authRepository.createSession(otpRecord.userId);

    const secretKey = this.configService.get<string>('JWT_SECRET') || 'hvapi_default_secret_key';

    const accessTokenOptions: JwtSignOptions = {
      secret: secretKey,
      expiresIn: (this.configService.get<string>('JWT_EXPIRATION') || '15m') as JwtStringValue,
    };

    const refreshTokenOptions: JwtSignOptions = {
      secret: secretKey,
      expiresIn: (this.configService.get<string>('REFRESH_TOKEN_EXPIRATION') || '7d') as JwtStringValue,
    };

    const accessToken = this.jwtService.sign(
      { sub: otpRecord.userId },
      accessTokenOptions,
    );

    const rawRefreshToken = this.jwtService.sign(
      { sub: otpRecord.userId, type: 'refresh' },
      refreshTokenOptions,
    );

    const refreshHash = await bcrypt.hash(rawRefreshToken, 10);
    const refreshExpiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

    await this.authRepository.createRefreshToken(otpRecord.userId, refreshHash, refreshExpiresAt);

    return {
      accessToken,
      refreshToken: rawRefreshToken,
      expiresIn: String(accessTokenOptions.expiresIn),
    };
  }

  async refreshToken(dto: RefreshTokenDto): Promise<RefreshTokenResponseDto> {
    try {
      const secretKey = this.configService.get<string>('JWT_SECRET') || 'hvapi_default_secret_key';
      const decoded = this.jwtService.verify(dto.refreshToken, { secret: secretKey });
      const userId = decoded.sub;

      const accessTokenOptions: JwtSignOptions = {
        secret: secretKey,
        expiresIn: (this.configService.get<string>('JWT_EXPIRATION') || '15m') as JwtStringValue,
      };

      const refreshTokenOptions: JwtSignOptions = {
        secret: secretKey,
        expiresIn: (this.configService.get<string>('REFRESH_TOKEN_EXPIRATION') || '7d') as JwtStringValue,
      };

      const newAccessToken = this.jwtService.sign(
        { sub: userId },
        accessTokenOptions,
      );

      const newRefreshToken = this.jwtService.sign(
        { sub: userId, type: 'refresh' },
        refreshTokenOptions,
      );

      const refreshHash = await bcrypt.hash(newRefreshToken, 10);
      const refreshExpiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

      await this.authRepository.revokeAllUserTokens(userId);
      await this.authRepository.createRefreshToken(userId, refreshHash, refreshExpiresAt);

      return {
        accessToken: newAccessToken,
        refreshToken: newRefreshToken,
      };
    } catch {
      throw new UnauthorizedException('Invalid or expired refresh token');
    }
  }

  async logout(dto: LogoutDto): Promise<LogoutResponseDto> {
    try {
      const decoded = this.jwtService.decode(dto.refreshToken) as any;
      if (decoded && decoded.sub) {
        await this.authRepository.revokeAllUserTokens(decoded.sub);
      }
    } catch {
      // Ignore token decode errors on logout
    }

    return {
      success: true,
      message: 'Logged out successfully',
    };
  }
}

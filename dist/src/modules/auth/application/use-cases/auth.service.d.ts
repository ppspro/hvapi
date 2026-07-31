import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { IAuthRepository } from '../../domain/repositories/auth.repository.interface';
import { RequestOtpDto, RequestOtpResponseDto } from '../../presentation/dto/request-otp.dto';
import { VerifyOtpDto, VerifyOtpResponseDto } from '../../presentation/dto/verify-otp.dto';
import { ResendOtpDto, ResendOtpResponseDto } from '../../presentation/dto/resend-otp.dto';
import { RefreshTokenDto, RefreshTokenResponseDto } from '../../presentation/dto/refresh-token.dto';
import { LogoutDto, LogoutResponseDto } from '../../presentation/dto/logout.dto';
import { LogoutAllDto, LogoutAllResponseDto } from '../../presentation/dto/logout-all.dto';
import { SessionResponseDto } from '../../presentation/dto/session-response.dto';
import { UserMeResponseDto } from '../../presentation/dto/user-me-response.dto';
export declare class AuthService {
    private readonly authRepository;
    private readonly jwtService;
    private readonly configService;
    private readonly permissionMap;
    constructor(authRepository: IAuthRepository, jwtService: JwtService, configService: ConfigService);
    requestOtp(dto: RequestOtpDto, ipAddress?: string): Promise<RequestOtpResponseDto>;
    resendOtp(dto: ResendOtpDto, ipAddress?: string): Promise<ResendOtpResponseDto>;
    verifyOtp(dto: VerifyOtpDto, ipAddress?: string, userAgent?: string): Promise<VerifyOtpResponseDto>;
    refreshToken(dto: RefreshTokenDto, ipAddress?: string): Promise<RefreshTokenResponseDto>;
    logout(dto: LogoutDto, ipAddress?: string): Promise<LogoutResponseDto>;
    logoutAll(dto: LogoutAllDto, ipAddress?: string): Promise<LogoutAllResponseDto>;
    getActiveSessions(userId: string, ipAddress?: string): Promise<SessionResponseDto[]>;
    revokeSession(sessionId: string, userId: string, ipAddress?: string): Promise<void>;
    revokeOtherSessions(userId: string, currentSessionId: string, ipAddress?: string): Promise<void>;
    getMe(userId: string, ipAddress?: string): Promise<UserMeResponseDto>;
    private dbUserFetch;
    getRolesPermissionsMapping(): {
        roles: string[];
        permissions: string[];
    };
}

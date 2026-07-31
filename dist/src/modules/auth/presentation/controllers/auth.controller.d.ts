import { AuthService } from '../../application/use-cases/auth.service';
import { RequestOtpDto, RequestOtpResponseDto } from '../dto/request-otp.dto';
import { VerifyOtpDto, VerifyOtpResponseDto } from '../dto/verify-otp.dto';
import { ResendOtpDto, ResendOtpResponseDto } from '../dto/resend-otp.dto';
import { RefreshTokenDto, RefreshTokenResponseDto } from '../dto/refresh-token.dto';
import { LogoutDto, LogoutResponseDto } from '../dto/logout.dto';
import { LogoutAllDto, LogoutAllResponseDto } from '../dto/logout-all.dto';
import { SessionResponseDto } from '../dto/session-response.dto';
import { UserMeResponseDto } from '../dto/user-me-response.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    requestOtp(req: any, dto: RequestOtpDto): Promise<RequestOtpResponseDto>;
    verifyOtp(req: any, dto: VerifyOtpDto): Promise<VerifyOtpResponseDto>;
    resendOtp(req: any, dto: ResendOtpDto): Promise<ResendOtpResponseDto>;
    refreshToken(req: any, dto: RefreshTokenDto): Promise<RefreshTokenResponseDto>;
    logout(req: any, dto: LogoutDto): Promise<LogoutResponseDto>;
    logoutAll(req: any, dto: LogoutAllDto): Promise<LogoutAllResponseDto>;
    getMe(req: any): Promise<UserMeResponseDto>;
    getSessions(req: any): Promise<SessionResponseDto[]>;
    revokeSession(req: any, sessionId: string): Promise<void>;
    revokeOtherSessions(req: any): Promise<void>;
    getRoles(req: any): Promise<{
        roles: string[];
    }>;
    getPermissions(req: any): Promise<{
        permissions: string[];
    }>;
}

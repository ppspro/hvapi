import { AuthService } from '../../application/use-cases/auth.service';
import { RequestOtpDto, RequestOtpResponseDto } from '../dto/request-otp.dto';
import { VerifyOtpDto, VerifyOtpResponseDto } from '../dto/verify-otp.dto';
import { RefreshTokenDto, RefreshTokenResponseDto } from '../dto/refresh-token.dto';
import { LogoutDto, LogoutResponseDto } from '../dto/logout.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    requestOtp(dto: RequestOtpDto): Promise<RequestOtpResponseDto>;
    verifyOtp(dto: VerifyOtpDto): Promise<VerifyOtpResponseDto>;
    refreshToken(dto: RefreshTokenDto): Promise<RefreshTokenResponseDto>;
    logout(dto: LogoutDto): Promise<LogoutResponseDto>;
}

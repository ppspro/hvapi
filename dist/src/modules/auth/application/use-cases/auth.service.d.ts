import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { IAuthRepository } from '../../domain/repositories/auth.repository.interface';
import { RequestOtpDto, RequestOtpResponseDto } from '../../presentation/dto/request-otp.dto';
import { VerifyOtpDto, VerifyOtpResponseDto } from '../../presentation/dto/verify-otp.dto';
import { RefreshTokenDto, RefreshTokenResponseDto } from '../../presentation/dto/refresh-token.dto';
import { LogoutDto, LogoutResponseDto } from '../../presentation/dto/logout.dto';
export declare class AuthService {
    private readonly authRepository;
    private readonly jwtService;
    private readonly configService;
    constructor(authRepository: IAuthRepository, jwtService: JwtService, configService: ConfigService);
    requestOtp(dto: RequestOtpDto): Promise<RequestOtpResponseDto>;
    verifyOtp(dto: VerifyOtpDto): Promise<VerifyOtpResponseDto>;
    refreshToken(dto: RefreshTokenDto): Promise<RefreshTokenResponseDto>;
    logout(dto: LogoutDto): Promise<LogoutResponseDto>;
}

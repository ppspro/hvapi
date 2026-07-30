import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse as SwaggerResponse } from '@nestjs/swagger';
import { AuthService } from '../../application/use-cases/auth.service';
import { RequestOtpDto, RequestOtpResponseDto } from '../dto/request-otp.dto';
import { VerifyOtpDto, VerifyOtpResponseDto } from '../dto/verify-otp.dto';
import { RefreshTokenDto, RefreshTokenResponseDto } from '../dto/refresh-token.dto';
import { LogoutDto, LogoutResponseDto } from '../dto/logout.dto';

@ApiTags('Authentication & Identity')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('otp/request')
  @ApiOperation({ summary: 'Request Phone OTP' })
  @SwaggerResponse({ status: 200, description: 'OTP challenge generated', type: RequestOtpResponseDto })
  async requestOtp(@Body() dto: RequestOtpDto): Promise<RequestOtpResponseDto> {
    return this.authService.requestOtp(dto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('otp/verify')
  @ApiOperation({ summary: 'Verify Phone OTP & Login' })
  @SwaggerResponse({ status: 200, description: 'OTP verified, JWT pair issued', type: VerifyOtpResponseDto })
  async verifyOtp(@Body() dto: VerifyOtpDto): Promise<VerifyOtpResponseDto> {
    return this.authService.verifyOtp(dto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('token/refresh')
  @ApiOperation({ summary: 'Refresh JWT Access Token' })
  @SwaggerResponse({ status: 200, description: 'Token rotated successfully', type: RefreshTokenResponseDto })
  async refreshToken(@Body() dto: RefreshTokenDto): Promise<RefreshTokenResponseDto> {
    return this.authService.refreshToken(dto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('logout')
  @ApiOperation({ summary: 'User Session Logout' })
  @SwaggerResponse({ status: 200, description: 'Session terminated', type: LogoutResponseDto })
  async logout(@Body() dto: LogoutDto): Promise<LogoutResponseDto> {
    return this.authService.logout(dto);
  }
}

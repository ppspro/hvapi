import { Controller, Post, Get, Body, UseGuards, Req, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { HealthCardService } from '../../application/use-cases/health-card.service';
import { OnboardHealthCardResponseDto } from '../dto/onboard-health-card.dto';
import { VerifyQrDto, VerifyQrResponseDto } from '../dto/verify-qr.dto';
import { HealthCardDetailsResponseDto } from '../dto/health-card-details.dto';
import { WalletPassResponseDto } from '../dto/wallet-pass.dto';

@ApiTags('HealthCard')
@Controller()
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth('JWT-Auth')
export class HealthCardController {
  constructor(private readonly healthCardService: HealthCardService) {}

  @Post('patients/onboarding/health-card')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Step 5: Digital Health Card Generation' })
  @ApiResponse({ status: 200, type: OnboardHealthCardResponseDto })
  async onboardHealthCard(@Req() req: any): Promise<OnboardHealthCardResponseDto> {
    return this.healthCardService.onboardHealthCard(req.user.userId);
  }

  @Get('health-card/me')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get Patient Digital Health Card Details' })
  @ApiResponse({ status: 200, type: HealthCardDetailsResponseDto })
  async getCardDetails(@Req() req: any): Promise<HealthCardDetailsResponseDto> {
    return this.healthCardService.getCardDetails(req.user.userId);
  }

  @Post('health-card/verify-qr')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Secure Doctor QR Scanner Verification' })
  @ApiResponse({ status: 200, type: VerifyQrResponseDto })
  async verifyQr(@Req() req: any, @Body() dto: VerifyQrDto): Promise<VerifyQrResponseDto> {
    return this.healthCardService.verifyQr(req.user.userId, dto);
  }

  @Post('health-card/monthly-refresh')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Monthly Card Token Renewal Refresh' })
  @ApiResponse({ status: 200, type: HealthCardDetailsResponseDto })
  async refreshCardQr(@Req() req: any): Promise<HealthCardDetailsResponseDto> {
    return this.healthCardService.refreshCardQr(req.user.userId);
  }

  @Get('health-card/wallet-pass')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Google / Apple Wallet Pass Export' })
  @ApiResponse({ status: 200, type: WalletPassResponseDto })
  async generateWalletPass(@Req() req: any): Promise<WalletPassResponseDto> {
    return this.healthCardService.generateWalletPass(req.user.userId);
  }
}

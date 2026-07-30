import { Controller, Post, Body, UseGuards, Req, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { InsuranceService } from '../../application/use-cases/insurance.service';
import { OnboardInsuranceDto, OnboardInsuranceResponseDto } from '../dto/onboard-insurance.dto';
import { InsuranceOcrScanDto, InsuranceOcrScanResponseDto } from '../dto/insurance-ocr-scan.dto';
import { InsuranceOcrConfirmDto, InsuranceOcrConfirmResponseDto } from '../dto/insurance-ocr-confirm.dto';

@ApiTags('Insurance')
@Controller()
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth('JWT-Auth')
export class InsuranceController {
  constructor(private readonly insuranceService: InsuranceService) {}

  @Post('patients/onboarding/insurance')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Step 4: Primary Insurance Onboarding Link' })
  @ApiResponse({ status: 200, type: OnboardInsuranceResponseDto })
  async onboardInsurance(@Req() req: any, @Body() dto: OnboardInsuranceDto): Promise<OnboardInsuranceResponseDto> {
    return this.insuranceService.onboardInsurance(req.user.userId, dto);
  }

  @Post('insurance/ocr/scan')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Insurance Card OCR Image Scanner' })
  @ApiResponse({ status: 200, type: InsuranceOcrScanResponseDto })
  async scanInsuranceCard(@Req() req: any, @Body() dto: InsuranceOcrScanDto): Promise<InsuranceOcrScanResponseDto> {
    return this.insuranceService.scanInsuranceCard(req.user.userId, dto);
  }

  @Post('insurance/ocr/confirm')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'OCR Candidate Field Review & Manual Correction Confirmation' })
  @ApiResponse({ status: 200, type: InsuranceOcrConfirmResponseDto })
  async confirmOcrData(@Req() req: any, @Body() dto: InsuranceOcrConfirmDto): Promise<InsuranceOcrConfirmResponseDto> {
    return this.insuranceService.confirmOcrData(req.user.userId, dto);
  }
}

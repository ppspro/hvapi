import { Controller, Post, Body, UseGuards, Req, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { AiOcrService } from '../../application/use-cases/ai-ocr.service';
import { AiOcrExtractDto, AiOcrExtractResponseDto, AiOcrConfirmDto, AiOcrConfirmResponseDto } from '../dto/ai-ocr.dto';

@ApiTags('AI OCR')
@Controller('ai/ocr')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth('JWT-Auth')
export class AiOcrController {
  constructor(private readonly aiOcrService: AiOcrService) {}

  @Post('extract')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Image Scan & Candidate Metadata Extraction' })
  @ApiResponse({ status: 200, type: AiOcrExtractResponseDto })
  async extractDocument(@Req() req: any, @Body() dto: AiOcrExtractDto): Promise<AiOcrExtractResponseDto> {
    return this.aiOcrService.extractDocument(req.user.userId, dto);
  }

  @Post('confirm')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'OCR Candidate Field Review & Manual Confirmation' })
  @ApiResponse({ status: 200, type: AiOcrConfirmResponseDto })
  async confirmOcr(@Req() req: any, @Body() dto: AiOcrConfirmDto): Promise<AiOcrConfirmResponseDto> {
    return this.aiOcrService.confirmOcr(req.user.userId, dto);
  }
}

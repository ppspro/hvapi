import {
  Controller, Get, Post, Put, Delete, Body, Param, Query, UseGuards, Req, HttpCode, HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse as SwaggerResponse, ApiBearerAuth, ApiParam, ApiQuery } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { OCRJobService } from '../../application/use-cases/ocr.service';
import {
  OCRJobResponseDto, ExtractedFieldResponseDto, OCRTemplateResponseDto,
  OCRVerificationResponseDto, OCRDashboardResponseDto,
} from '../dto/ocr-response.dto';
import {
  CreateOCRJobDto, CreateOCRTemplateDto, UpdateOCRTemplateDto, VerifyOCRDto,
} from '../dto/ocr-enterprise.dto';

@ApiTags('OCR & Document Processing')
@Controller('ocr')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth('JWT-Auth')
export class OCRController {
  constructor(private readonly ocrJobService: OCRJobService) {}

  // ─── Analytics & Dashboard ───────────────────────────────────────────────

  @Get('dashboard')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get Enterprise OCR Platform analytics dashboard summary' })
  @SwaggerResponse({ status: 200, type: OCRDashboardResponseDto })
  async getDashboard(): Promise<OCRDashboardResponseDto> {
    return this.ocrJobService.getDashboardStats();
  }

  @Get('statistics')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get Enterprise OCR accuracy & throughput statistics' })
  @SwaggerResponse({ status: 200, type: OCRDashboardResponseDto })
  async getStatistics(): Promise<OCRDashboardResponseDto> {
    return this.ocrJobService.getDashboardStats();
  }

  // ─── OCR Jobs ─────────────────────────────────────────────────────────────

  @Post('jobs')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Submit medical attachment for local CPU OCR processing' })
  @SwaggerResponse({ status: 201, type: OCRJobResponseDto })
  async submitJob(@Req() req: any, @Body() dto: CreateOCRJobDto): Promise<OCRJobResponseDto> {
    return this.ocrJobService.submitJob(req.user.userId, dto);
  }

  @Get('jobs')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'List all OCR jobs with optional status and document type filters' })
  @ApiQuery({ name: 'status', required: false })
  @ApiQuery({ name: 'documentType', required: false })
  @SwaggerResponse({ status: 200, type: [OCRJobResponseDto] })
  async getJobs(
    @Query('status') status?: string,
    @Query('documentType') documentType?: string,
  ): Promise<OCRJobResponseDto[]> {
    return this.ocrJobService.getJobs(status, documentType);
  }

  @Get('jobs/:id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get OCR job status and details by ID' })
  @ApiParam({ name: 'id', description: 'OCR Job ID' })
  @SwaggerResponse({ status: 200, type: OCRJobResponseDto })
  async getJobById(@Param('id') id: string): Promise<OCRJobResponseDto> {
    return this.ocrJobService.getJobById(id);
  }

  // ─── OCR Results ─────────────────────────────────────────────────────────

  @Get('jobs/:id/text')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get extracted raw OCR text for job' })
  @ApiParam({ name: 'id', description: 'OCR Job ID' })
  @SwaggerResponse({ status: 200, description: 'Raw text result' })
  async getJobText(@Param('id') id: string): Promise<{ text: string }> {
    return this.ocrJobService.getJobText(id);
  }

  @Get('jobs/:id/fields')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get extracted structured fields with confidence scores' })
  @ApiParam({ name: 'id', description: 'OCR Job ID' })
  @SwaggerResponse({ status: 200, type: [ExtractedFieldResponseDto] })
  async getJobFields(@Param('id') id: string): Promise<ExtractedFieldResponseDto[]> {
    return this.ocrJobService.getJobFields(id);
  }

  @Get('jobs/:id/json')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get formatted structured JSON output of OCR job' })
  @ApiParam({ name: 'id', description: 'OCR Job ID' })
  @SwaggerResponse({ status: 200, description: 'Structured JSON object' })
  async getJobJson(@Param('id') id: string): Promise<any> {
    return this.ocrJobService.getJobJson(id);
  }

  // ─── Templates ───────────────────────────────────────────────────────────

  @Post('templates')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create an OCR Document Template with field definitions' })
  @SwaggerResponse({ status: 201, type: OCRTemplateResponseDto })
  async createTemplate(@Req() req: any, @Body() dto: CreateOCRTemplateDto): Promise<OCRTemplateResponseDto> {
    return this.ocrJobService.createTemplate(req.user.userId, dto);
  }

  @Get('templates')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'List all OCR Document Templates' })
  @SwaggerResponse({ status: 200, type: [OCRTemplateResponseDto] })
  async getTemplates(): Promise<OCRTemplateResponseDto[]> {
    return this.ocrJobService.getTemplates();
  }

  @Put('templates/:id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Update OCR Document Template and increment version' })
  @ApiParam({ name: 'id', description: 'Template ID' })
  @SwaggerResponse({ status: 200, type: OCRTemplateResponseDto })
  async updateTemplate(
    @Req() req: any,
    @Param('id') id: string,
    @Body() dto: UpdateOCRTemplateDto,
  ): Promise<OCRTemplateResponseDto> {
    return this.ocrJobService.updateTemplate(id, dto, req.user.userId);
  }

  @Delete('templates/:id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Soft-delete an OCR Document Template' })
  @ApiParam({ name: 'id', description: 'Template ID' })
  @SwaggerResponse({ status: 200, description: 'Template soft-deleted' })
  async softDeleteTemplate(@Req() req: any, @Param('id') id: string): Promise<any> {
    return this.ocrJobService.softDeleteTemplate(id, req.user.userId);
  }

  // ─── Human Verification Workflow ─────────────────────────────────────────

  @Get('review')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'List OCR jobs requiring manual human verification' })
  @SwaggerResponse({ status: 200, type: [OCRJobResponseDto] })
  async getJobsRequiringReview(): Promise<OCRJobResponseDto[]> {
    return this.ocrJobService.getJobsRequiringReview();
  }

  @Post('review/:jobId')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Submit human verification review for low-confidence OCR job' })
  @ApiParam({ name: 'jobId', description: 'OCR Job ID' })
  @SwaggerResponse({ status: 200, type: OCRVerificationResponseDto })
  async submitVerification(
    @Req() req: any,
    @Param('jobId') jobId: string,
    @Body() dto: VerifyOCRDto,
  ): Promise<OCRVerificationResponseDto> {
    return this.ocrJobService.submitVerification(jobId, req.user.userId, dto);
  }
}

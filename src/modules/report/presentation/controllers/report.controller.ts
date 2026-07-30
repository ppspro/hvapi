import { Controller, Post, Get, Body, Param, UseGuards, Req, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { ReportService } from '../../application/use-cases/report.service';
import { CreateReportDto, CreateReportResponseDto } from '../dto/create-report.dto';
import { ReportResponseDto } from '../dto/report-response.dto';
import { DownloadReportResponseDto } from '../dto/download-report.dto';

@ApiTags('Reports')
@Controller('reports')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth('JWT-Auth')
export class ReportController {
  constructor(private readonly reportService: ReportService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Diagnostic Lab Report Upload & Link' })
  @ApiResponse({ status: 201, type: CreateReportResponseDto })
  async createReport(@Req() req: any, @Body() dto: CreateReportDto): Promise<CreateReportResponseDto> {
    return this.reportService.createReport(req.user.userId, dto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'List Patient Diagnostic Medical Reports' })
  @ApiResponse({ status: 200, type: [ReportResponseDto] })
  async getReportsList(@Req() req: any): Promise<ReportResponseDto[]> {
    return this.reportService.getReportsList(req.user.userId);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get Medical Report Detailed Metadata' })
  @ApiResponse({ status: 200, type: ReportResponseDto })
  async getReportDetails(@Req() req: any, @Param('id') reportId: string): Promise<ReportResponseDto> {
    return this.reportService.getReportDetails(req.user.userId, reportId);
  }

  @Get(':id/download')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Request Secure Short-Lived Presigned Download Link' })
  @ApiResponse({ status: 200, type: DownloadReportResponseDto })
  async generateDownloadUrl(@Req() req: any, @Param('id') reportId: string): Promise<DownloadReportResponseDto> {
    return this.reportService.generateDownloadUrl(req.user.userId, reportId);
  }
}

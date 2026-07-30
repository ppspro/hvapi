import { Injectable, NotFoundException, UnauthorizedException, Inject } from '@nestjs/common';
import { IReportRepository } from '../../domain/repositories/report.repository.interface';
import { CreateReportDto, CreateReportResponseDto } from '../../presentation/dto/create-report.dto';
import { ReportResponseDto } from '../../presentation/dto/report-response.dto';
import { DownloadReportResponseDto } from '../../presentation/dto/download-report.dto';
import { Logger } from 'nestjs-pino';

@Injectable()
export class ReportService {
  constructor(
    @Inject('IReportRepository')
    private readonly reportRepository: IReportRepository,
    private readonly logger: Logger,
  ) {}

  async createReport(userId: string, dto: CreateReportDto): Promise<CreateReportResponseDto> {
    const profile = await this.reportRepository.findProfileByUserId(userId);
    if (!profile) {
      throw new NotFoundException('Patient profile not found');
    }

    const report = await this.reportRepository.createReport(profile.id, dto.title, dto.category, dto.prescribedBy);
    await this.reportRepository.createAttachment(report.id, dto.fileName, dto.fileSize, dto.mimeType, dto.storageUrl);

    this.logger.log({ msg: 'Diagnostic report uploaded successfully', reportId: report.id });

    return {
      reportId: report.id,
      message: 'Medical report uploaded successfully',
    };
  }

  async getReportsList(userId: string): Promise<ReportResponseDto[]> {
    const profile = await this.reportRepository.findProfileByUserId(userId);
    if (!profile) {
      throw new NotFoundException('Patient profile not found');
    }

    const reports = await this.reportRepository.findReportsByProfileId(profile.id);

    return reports.map(r => ({
      id: r.id,
      title: r.title,
      category: r.category,
      prescribedBy: r.prescribedBy || undefined,
      createdAt: r.createdAt,
      attachments: r.attachments.map(a => ({
        id: a.id,
        fileName: a.fileName,
        fileSize: a.fileSize,
        mimeType: a.mimeType,
        storageUrl: a.storageUrl,
      })),
    }));
  }

  async getReportDetails(userId: string, reportId: string): Promise<ReportResponseDto> {
    const profile = await this.reportRepository.findProfileByUserId(userId);
    if (!profile) {
      throw new NotFoundException('Patient profile not found');
    }

    const report = await this.reportRepository.findReportById(reportId);
    if (!report) {
      throw new NotFoundException('Medical report not found');
    }

    // Secure context authentication match validation
    if (report.patientProfileId !== profile.id) {
      this.logger.warn({ msg: 'Unauthorized report access attempt', userId, reportId });
      throw new UnauthorizedException('Access denied to requested medical report');
    }

    this.logger.log({ msg: 'Report viewed successfully', reportId });

    return {
      id: report.id,
      title: report.title,
      category: report.category,
      prescribedBy: report.prescribedBy || undefined,
      createdAt: report.createdAt,
      attachments: report.attachments.map(a => ({
        id: a.id,
        fileName: a.fileName,
        fileSize: a.fileSize,
        mimeType: a.mimeType,
        storageUrl: a.storageUrl,
      })),
    };
  }

  async generateDownloadUrl(userId: string, reportId: string): Promise<DownloadReportResponseDto> {
    const profile = await this.reportRepository.findProfileByUserId(userId);
    if (!profile) {
      throw new NotFoundException('Patient profile not found');
    }

    const report = await this.reportRepository.findReportById(reportId);
    if (!report) {
      throw new NotFoundException('Medical report not found');
    }

    if (report.patientProfileId !== profile.id) {
      this.logger.warn({ msg: 'Unauthorized report download attempt', userId, reportId });
      throw new UnauthorizedException('Access denied to download requested medical report');
    }

    const attachment = report.attachments[0];
    if (!attachment) {
      throw new NotFoundException('No attachment file found for the requested report');
    }

    // Mock secure presigned S3 url generation containing expiration signature hashes
    const secureUrl = `${attachment.storageUrl}?presigned-signature-token-expiry=3600`;
    this.logger.log({ msg: 'Report downloaded, secure presigned link generated', reportId });

    return {
      downloadUrl: secureUrl,
      expiresInSeconds: 3600,
    };
  }
}

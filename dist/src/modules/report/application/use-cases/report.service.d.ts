import { IReportRepository } from '../../domain/repositories/report.repository.interface';
import { UploadReportDto, UpdateReportDto, ReplaceReportFileDto, VerifyReportDto } from '../../presentation/dto/upload-report.dto';
import { FullReportResponseDto, DownloadTokenResponseDto, PreviewMetadataResponseDto, ReportVersionResponseDto } from '../../presentation/dto/report-detail-response.dto';
import { Logger } from 'nestjs-pino';
import { QrService } from "../../../qr/application/use-cases/qr.service";
export declare class ReportService {
    private readonly repository;
    private readonly qrService;
    private readonly logger;
    constructor(repository: IReportRepository, qrService: QrService, logger: Logger);
    private resolveProfile;
    private mapReport;
    private mapVersion;
    uploadReport(userId: string, dto: UploadReportDto): Promise<FullReportResponseDto>;
    getReportsList(userId: string, category?: string): Promise<FullReportResponseDto[]>;
    getReportDetails(userId: string, reportId: string): Promise<FullReportResponseDto>;
    updateReport(userId: string, reportId: string, dto: UpdateReportDto): Promise<FullReportResponseDto>;
    softDeleteReport(userId: string, reportId: string): Promise<{
        message: string;
    }>;
    archiveReport(userId: string, reportId: string): Promise<FullReportResponseDto>;
    restoreReport(userId: string, reportId: string): Promise<FullReportResponseDto>;
    replaceReportFile(userId: string, reportId: string, dto: ReplaceReportFileDto): Promise<FullReportResponseDto>;
    getReportVersions(userId: string, reportId: string): Promise<ReportVersionResponseDto[]>;
    verifyReport(userId: string, reportId: string, dto: VerifyReportDto): Promise<FullReportResponseDto>;
    searchReports(userId: string, query: string): Promise<FullReportResponseDto[]>;
    getCategories(userId: string): Promise<{
        categories: Record<string, number>;
    }>;
    getTimeline(userId: string): Promise<any[]>;
    getDownloadToken(userId: string, reportId: string): Promise<DownloadTokenResponseDto>;
    getPreviewMetadata(userId: string, reportId: string): Promise<PreviewMetadataResponseDto>;
}

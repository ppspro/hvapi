import { ReportService } from '../../application/use-cases/report.service';
import { UploadReportDto, UpdateReportDto, ReplaceReportFileDto, VerifyReportDto } from '../dto/upload-report.dto';
import { FullReportResponseDto, DownloadTokenResponseDto, PreviewMetadataResponseDto, ReportVersionResponseDto } from '../dto/report-detail-response.dto';
export declare class ReportController {
    private readonly reportService;
    constructor(reportService: ReportService);
    uploadReport(req: any, dto: UploadReportDto): Promise<FullReportResponseDto>;
    getReportsList(req: any, category?: string): Promise<FullReportResponseDto[]>;
    getCategories(req: any): Promise<any>;
    searchReports(req: any, query: string): Promise<FullReportResponseDto[]>;
    getTimeline(req: any): Promise<any[]>;
    getReportDetails(req: any, id: string): Promise<FullReportResponseDto>;
    updateReport(req: any, id: string, dto: UpdateReportDto): Promise<FullReportResponseDto>;
    softDeleteReport(req: any, id: string): Promise<any>;
    archiveReport(req: any, id: string): Promise<FullReportResponseDto>;
    restoreReport(req: any, id: string): Promise<FullReportResponseDto>;
    replaceReportFile(req: any, id: string, dto: ReplaceReportFileDto): Promise<FullReportResponseDto>;
    getReportVersions(req: any, id: string): Promise<ReportVersionResponseDto[]>;
    verifyReport(req: any, id: string, dto: VerifyReportDto): Promise<FullReportResponseDto>;
    getDownloadToken(req: any, id: string): Promise<DownloadTokenResponseDto>;
    getPreviewMetadata(req: any, id: string): Promise<PreviewMetadataResponseDto>;
}

import { ReportService } from '../../application/use-cases/report.service';
import { CreateReportDto, CreateReportResponseDto } from '../dto/create-report.dto';
import { ReportResponseDto } from '../dto/report-response.dto';
import { DownloadReportResponseDto } from '../dto/download-report.dto';
export declare class ReportController {
    private readonly reportService;
    constructor(reportService: ReportService);
    createReport(req: any, dto: CreateReportDto): Promise<CreateReportResponseDto>;
    getReportsList(req: any): Promise<ReportResponseDto[]>;
    getReportDetails(req: any, reportId: string): Promise<ReportResponseDto>;
    generateDownloadUrl(req: any, reportId: string): Promise<DownloadReportResponseDto>;
}

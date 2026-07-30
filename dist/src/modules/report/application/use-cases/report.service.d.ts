import { IReportRepository } from '../../domain/repositories/report.repository.interface';
import { CreateReportDto, CreateReportResponseDto } from '../../presentation/dto/create-report.dto';
import { ReportResponseDto } from '../../presentation/dto/report-response.dto';
import { DownloadReportResponseDto } from '../../presentation/dto/download-report.dto';
import { Logger } from 'nestjs-pino';
export declare class ReportService {
    private readonly reportRepository;
    private readonly logger;
    constructor(reportRepository: IReportRepository, logger: Logger);
    createReport(userId: string, dto: CreateReportDto): Promise<CreateReportResponseDto>;
    getReportsList(userId: string): Promise<ReportResponseDto[]>;
    getReportDetails(userId: string, reportId: string): Promise<ReportResponseDto>;
    generateDownloadUrl(userId: string, reportId: string): Promise<DownloadReportResponseDto>;
}

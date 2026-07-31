import { IOcrRepository } from '../../domain/repositories/ocr.repository.interface';
import { OCRJobResponseDto, ExtractedFieldResponseDto, OCRTemplateResponseDto, OCRVerificationResponseDto, OCRDashboardResponseDto } from '../../presentation/dto/ocr-response.dto';
import { CreateOCRJobDto, CreateOCRTemplateDto, UpdateOCRTemplateDto, VerifyOCRDto } from '../../presentation/dto/ocr-enterprise.dto';
import { Logger } from 'nestjs-pino';
export declare class OCRJobService {
    private readonly ocrRepository;
    private readonly logger;
    constructor(ocrRepository: IOcrRepository, logger: Logger);
    getDashboardStats(): Promise<OCRDashboardResponseDto>;
    submitJob(userId: string, dto: CreateOCRJobDto): Promise<OCRJobResponseDto>;
    getJobs(status?: string, documentType?: string): Promise<OCRJobResponseDto[]>;
    getJobById(id: string): Promise<OCRJobResponseDto>;
    getJobText(id: string): Promise<{
        text: string;
    }>;
    getJobFields(id: string): Promise<ExtractedFieldResponseDto[]>;
    getJobJson(id: string): Promise<any>;
    createTemplate(userId: string, dto: CreateOCRTemplateDto): Promise<OCRTemplateResponseDto>;
    getTemplates(): Promise<OCRTemplateResponseDto[]>;
    updateTemplate(id: string, dto: UpdateOCRTemplateDto, userId: string): Promise<OCRTemplateResponseDto>;
    softDeleteTemplate(id: string, userId: string): Promise<{
        message: string;
    }>;
    private mapTemplate;
    getJobsRequiringReview(): Promise<OCRJobResponseDto[]>;
    submitVerification(jobId: string, userId: string, dto: VerifyOCRDto): Promise<OCRVerificationResponseDto>;
    private processJobLocalPipeline;
    private mapJob;
}

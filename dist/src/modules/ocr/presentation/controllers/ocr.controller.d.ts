import { OCRJobService } from '../../application/use-cases/ocr.service';
import { OCRJobResponseDto, ExtractedFieldResponseDto, OCRTemplateResponseDto, OCRVerificationResponseDto, OCRDashboardResponseDto } from '../dto/ocr-response.dto';
import { CreateOCRJobDto, CreateOCRTemplateDto, UpdateOCRTemplateDto, VerifyOCRDto } from '../dto/ocr-enterprise.dto';
export declare class OCRController {
    private readonly ocrJobService;
    constructor(ocrJobService: OCRJobService);
    getDashboard(): Promise<OCRDashboardResponseDto>;
    getStatistics(): Promise<OCRDashboardResponseDto>;
    submitJob(req: any, dto: CreateOCRJobDto): Promise<OCRJobResponseDto>;
    getJobs(status?: string, documentType?: string): Promise<OCRJobResponseDto[]>;
    getJobById(id: string): Promise<OCRJobResponseDto>;
    getJobText(id: string): Promise<{
        text: string;
    }>;
    getJobFields(id: string): Promise<ExtractedFieldResponseDto[]>;
    getJobJson(id: string): Promise<any>;
    createTemplate(req: any, dto: CreateOCRTemplateDto): Promise<OCRTemplateResponseDto>;
    getTemplates(): Promise<OCRTemplateResponseDto[]>;
    updateTemplate(req: any, id: string, dto: UpdateOCRTemplateDto): Promise<OCRTemplateResponseDto>;
    softDeleteTemplate(req: any, id: string): Promise<any>;
    getJobsRequiringReview(): Promise<OCRJobResponseDto[]>;
    submitVerification(req: any, jobId: string, dto: VerifyOCRDto): Promise<OCRVerificationResponseDto>;
}

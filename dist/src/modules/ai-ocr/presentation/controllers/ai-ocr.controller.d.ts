import { AiOcrService } from '../../application/use-cases/ai-ocr.service';
import { AiOcrExtractDto, AiOcrExtractResponseDto, AiOcrConfirmDto, AiOcrConfirmResponseDto } from '../dto/ai-ocr.dto';
export declare class AiOcrController {
    private readonly aiOcrService;
    constructor(aiOcrService: AiOcrService);
    extractDocument(req: any, dto: AiOcrExtractDto): Promise<AiOcrExtractResponseDto>;
    confirmOcr(req: any, dto: AiOcrConfirmDto): Promise<AiOcrConfirmResponseDto>;
}

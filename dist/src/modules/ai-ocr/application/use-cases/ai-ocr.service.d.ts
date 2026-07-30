import { IAiOcrRepository } from '../../domain/repositories/ai-ocr.repository.interface';
import { AiOcrExtractDto, AiOcrExtractResponseDto, AiOcrConfirmDto, AiOcrConfirmResponseDto } from '../../presentation/dto/ai-ocr.dto';
import { Logger } from 'nestjs-pino';
export declare class AiOcrService {
    private readonly aiOcrRepository;
    private readonly logger;
    constructor(aiOcrRepository: IAiOcrRepository, logger: Logger);
    extractDocument(userId: string, dto: AiOcrExtractDto): Promise<AiOcrExtractResponseDto>;
    confirmOcr(userId: string, dto: AiOcrConfirmDto): Promise<AiOcrConfirmResponseDto>;
}

import { DatabaseService } from "../../../../database/database.service";
import { IAiOcrRepository } from '../../domain/repositories/ai-ocr.repository.interface';
import { OcrDocumentEntity, OcrExtractionEntity, OcrReviewEntity } from '../../domain/entities/ai-ocr.entity';
export declare class AiOcrRepository implements IAiOcrRepository {
    private readonly db;
    constructor(db: DatabaseService);
    findProfileByUserId(userId: string): Promise<{
        id: string;
    } | null>;
    createDocument(profileId: string, imageUrl: string): Promise<OcrDocumentEntity>;
    createExtraction(documentId: string, extractedData: string, confidence: number): Promise<OcrExtractionEntity>;
    findDocumentById(documentId: string): Promise<OcrDocumentEntity | null>;
    createReview(documentId: string, correctedData: string): Promise<OcrReviewEntity>;
    updateDocumentStatus(documentId: string, status: string): Promise<void>;
}

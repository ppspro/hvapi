import { OcrDocumentEntity, OcrExtractionEntity, OcrReviewEntity } from '../entities/ai-ocr.entity';

export interface IAiOcrRepository {
  findProfileByUserId(userId: string): Promise<{ id: string } | null>;
  createDocument(profileId: string, imageUrl: string): Promise<OcrDocumentEntity>;
  createExtraction(documentId: string, extractedData: string, confidence: number): Promise<OcrExtractionEntity>;
  findDocumentById(documentId: string): Promise<OcrDocumentEntity | null>;
  createReview(documentId: string, correctedData: string): Promise<OcrReviewEntity>;
  updateDocumentStatus(documentId: string, status: string): Promise<void>;
}

import { Injectable } from '@nestjs/common';
import { DatabaseService } from '@database/database.service';
import { IAiOcrRepository } from '../../domain/repositories/ai-ocr.repository.interface';
import { OcrDocumentEntity, OcrExtractionEntity, OcrReviewEntity } from '../../domain/entities/ai-ocr.entity';

@Injectable()
export class AiOcrRepository implements IAiOcrRepository {
  constructor(private readonly db: DatabaseService) {}

  async findProfileByUserId(userId: string): Promise<{ id: string } | null> {
    return this.db.patientProfile.findUnique({
      where: { userId },
      select: { id: true },
    });
  }

  async createDocument(profileId: string, imageUrl: string): Promise<OcrDocumentEntity> {
    return (await this.db.ocrDocument.create({
      data: {
        patientProfileId: profileId,
        imageUrl,
        status: 'PENDING',
      },
    })) as OcrDocumentEntity;
  }

  async createExtraction(documentId: string, extractedData: string, confidence: number): Promise<OcrExtractionEntity> {
    return (await this.db.ocrExtraction.create({
      data: {
        documentId,
        extractedData,
        confidence,
      },
    })) as OcrExtractionEntity;
  }

  async findDocumentById(documentId: string): Promise<OcrDocumentEntity | null> {
    return (await this.db.ocrDocument.findUnique({
      where: { id: documentId },
    })) as OcrDocumentEntity | null;
  }

  async createReview(documentId: string, correctedData: string): Promise<OcrReviewEntity> {
    return (await this.db.ocrReview.create({
      data: {
        documentId,
        correctedData,
      },
    })) as OcrReviewEntity;
  }

  async updateDocumentStatus(documentId: string, status: string): Promise<void> {
    await this.db.ocrDocument.update({
      where: { id: documentId },
      data: { status },
    });
  }
}

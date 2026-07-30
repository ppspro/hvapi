import { Injectable, NotFoundException, BadRequestException, Inject } from '@nestjs/common';
import { IAiOcrRepository } from '../../domain/repositories/ai-ocr.repository.interface';
import { AiOcrExtractDto, AiOcrExtractResponseDto, AiOcrConfirmDto, AiOcrConfirmResponseDto } from '../../presentation/dto/ai-ocr.dto';
import { Logger } from 'nestjs-pino';

@Injectable()
export class AiOcrService {
  constructor(
    @Inject('IAiOcrRepository')
    private readonly aiOcrRepository: IAiOcrRepository,
    private readonly logger: Logger,
  ) {}

  async extractDocument(userId: string, dto: AiOcrExtractDto): Promise<AiOcrExtractResponseDto> {
    const profile = await this.aiOcrRepository.findProfileByUserId(userId);
    if (!profile) {
      throw new NotFoundException('Patient profile not found');
    }

    this.logger.log({ msg: 'OCR upload started' });

    const doc = await this.aiOcrRepository.createDocument(profile.id, dto.imageUrl);

    // Mock AI OCR extraction results mapped from image scan values
    const mockExtracted = {
      title: 'Blood Count Report OCR',
      category: 'Laboratory',
      prescribedBy: 'Dr. John Watson',
    };

    await this.aiOcrRepository.createExtraction(doc.id, JSON.stringify(mockExtracted), 0.92);
    this.logger.log({ msg: 'OCR extraction completed', documentId: doc.id });

    return {
      documentId: doc.id,
      extractedData: mockExtracted,
      confidence: 0.92,
    };
  }

  async confirmOcr(userId: string, dto: AiOcrConfirmDto): Promise<AiOcrConfirmResponseDto> {
    const profile = await this.aiOcrRepository.findProfileByUserId(userId);
    if (!profile) {
      throw new NotFoundException('Patient profile not found');
    }

    const doc = await this.aiOcrRepository.findDocumentById(dto.documentId);
    if (!doc) {
      throw new NotFoundException('OCR Document not found');
    }

    if (doc.status === 'CONFIRMED') {
      throw new BadRequestException('OCR Document has already been confirmed');
    }

    await this.aiOcrRepository.createReview(dto.documentId, dto.confirmedData);
    await this.aiOcrRepository.updateDocumentStatus(dto.documentId, 'CONFIRMED');

    this.logger.log({ msg: 'OCR confirmation completed', documentId: dto.documentId });

    return {
      success: true,
      message: 'OCR extraction verified and saved successfully',
    };
  }
}

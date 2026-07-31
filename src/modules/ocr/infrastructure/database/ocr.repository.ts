import { Injectable } from '@nestjs/common';
import { DatabaseService } from '@database/database.service';
import { IOcrRepository } from '../../domain/repositories/ocr.repository.interface';
import {
  OCRJobEntity, OCRPageEntity, ExtractedFieldEntity,
  OCRTemplateEntity, OCRVerificationEntity, OCRAuditLogEntity,
} from '../../domain/entities/ocr.entity';

@Injectable()
export class PrismaOcrRepository implements IOcrRepository {
  constructor(private readonly db: DatabaseService) {}

  // ─── OCR Jobs ─────────────────────────────────────────────────────────────

  async createJob(data: any): Promise<OCRJobEntity> {
    return (await this.db.oCRJob.create({
      data: {
        medicalAttachmentId: data.medicalAttachmentId,
        documentType: (data.documentType as any) || 'UNKNOWN',
        status: (data.status as any) || 'QUEUED',
        submittedBy: data.submittedBy || null,
      },
      include: { pages: true, extractedFields: true, verifications: true },
    })) as unknown as OCRJobEntity;
  }

  async findJobs(status?: string, documentType?: string): Promise<OCRJobEntity[]> {
    return (await this.db.oCRJob.findMany({
      where: {
        isDeleted: false,
        ...(status ? { status: status as any } : {}),
        ...(documentType ? { documentType: documentType as any } : {}),
      },
      include: { pages: true, extractedFields: true, verifications: true },
      orderBy: { createdAt: 'desc' },
    })) as unknown as OCRJobEntity[];
  }

  async findJobById(id: string): Promise<OCRJobEntity | null> {
    return (await this.db.oCRJob.findFirst({
      where: { id, isDeleted: false },
      include: { pages: true, extractedFields: true, verifications: true },
    })) as unknown as OCRJobEntity | null;
  }

  async updateJobStatus(
    id: string,
    status: string,
    overallConfidence?: number,
    confidenceLevel?: string,
    processingTimeMs?: number,
    failureReason?: string,
  ): Promise<OCRJobEntity> {
    const isFinished = status === 'COMPLETED' || status === 'REVIEW_REQUIRED' || status === 'FAILED';
    return (await this.db.oCRJob.update({
      where: { id },
      data: {
        status: status as any,
        overallConfidence: overallConfidence !== undefined ? overallConfidence : undefined,
        confidenceLevel: confidenceLevel ? (confidenceLevel as any) : undefined,
        processingTimeMs: processingTimeMs !== undefined ? processingTimeMs : undefined,
        failureReason: failureReason || undefined,
        startedAt: status === 'PREPROCESSING' || status === 'OCR_RUNNING' ? new Date() : undefined,
        completedAt: isFinished ? new Date() : undefined,
      },
      include: { pages: true, extractedFields: true, verifications: true },
    })) as unknown as OCRJobEntity;
  }

  async softDeleteJob(id: string): Promise<void> {
    await this.db.oCRJob.update({
      where: { id },
      data: { isDeleted: true, deletedAt: new Date() },
    });
  }

  // ─── Pages & Fields ───────────────────────────────────────────────────────

  async createPage(data: any): Promise<OCRPageEntity> {
    return (await this.db.oCRPage.create({
      data: {
        ocrJobId: data.ocrJobId,
        pageNumber: data.pageNumber,
        imagePath: data.imagePath || null,
        rawText: data.rawText || null,
        confidence: data.confidence ?? 0.0,
        rotationAngle: data.rotationAngle ?? 0.0,
        processingMetadata: data.processingMetadata ? JSON.stringify(data.processingMetadata) : null,
      },
    })) as unknown as OCRPageEntity;
  }

  async createExtractedField(data: any): Promise<ExtractedFieldEntity> {
    return (await this.db.extractedField.create({
      data: {
        ocrJobId: data.ocrJobId,
        fieldName: data.fieldName,
        fieldValue: data.fieldValue,
        confidence: data.confidence ?? 0.0,
        boundingBox: data.boundingBox ? JSON.stringify(data.boundingBox) : null,
        validationStatus: data.validationStatus || 'VALIDATED',
        requiresReview: data.requiresReview ?? false,
      },
    })) as unknown as ExtractedFieldEntity;
  }

  async findExtractedFieldsByJobId(ocrJobId: string): Promise<ExtractedFieldEntity[]> {
    return (await this.db.extractedField.findMany({
      where: { ocrJobId },
      orderBy: { createdAt: 'asc' },
    })) as unknown as ExtractedFieldEntity[];
  }

  async findPagesByJobId(ocrJobId: string): Promise<OCRPageEntity[]> {
    return (await this.db.oCRPage.findMany({
      where: { ocrJobId },
      orderBy: { pageNumber: 'asc' },
    })) as unknown as OCRPageEntity[];
  }

  // ─── Templates ───────────────────────────────────────────────────────────

  async createTemplate(data: any): Promise<OCRTemplateEntity> {
    return (await this.db.oCRTemplate.create({
      data: {
        code: data.code,
        name: data.name,
        documentType: (data.documentType as any) || 'MEDICAL_REPORT',
        fieldDefinitions: data.fieldDefinitions ? JSON.stringify(data.fieldDefinitions) : null,
        validationRules: data.validationRules ? JSON.stringify(data.validationRules) : null,
        isActive: data.isActive ?? true,
      },
    })) as unknown as OCRTemplateEntity;
  }

  async findTemplates(): Promise<OCRTemplateEntity[]> {
    return (await this.db.oCRTemplate.findMany({
      where: { isDeleted: false },
      orderBy: { createdAt: 'desc' },
    })) as unknown as OCRTemplateEntity[];
  }

  async findTemplateByCode(code: string): Promise<OCRTemplateEntity | null> {
    return (await this.db.oCRTemplate.findFirst({
      where: { code, isDeleted: false },
    })) as unknown as OCRTemplateEntity | null;
  }

  async findTemplateById(id: string): Promise<OCRTemplateEntity | null> {
    return (await this.db.oCRTemplate.findFirst({
      where: { id, isDeleted: false },
    })) as unknown as OCRTemplateEntity | null;
  }

  async updateTemplate(id: string, data: any): Promise<OCRTemplateEntity> {
    const existing = await this.db.oCRTemplate.findUnique({ where: { id } });
    return (await this.db.oCRTemplate.update({
      where: { id },
      data: {
        name: data.name || undefined,
        documentType: data.documentType ? (data.documentType as any) : undefined,
        fieldDefinitions: data.fieldDefinitions ? JSON.stringify(data.fieldDefinitions) : undefined,
        validationRules: data.validationRules ? JSON.stringify(data.validationRules) : undefined,
        isActive: data.isActive ?? undefined,
        version: (existing?.version || 1) + 1,
      },
    })) as unknown as OCRTemplateEntity;
  }

  async softDeleteTemplate(id: string): Promise<void> {
    await this.db.oCRTemplate.update({
      where: { id },
      data: { isDeleted: true, deletedAt: new Date() },
    });
  }

  // ─── Verification ────────────────────────────────────────────────────────

  async findJobsRequiringReview(): Promise<OCRJobEntity[]> {
    return (await this.db.oCRJob.findMany({
      where: { isDeleted: false, status: 'REVIEW_REQUIRED' },
      include: { pages: true, extractedFields: true, verifications: true },
      orderBy: { createdAt: 'asc' },
    })) as unknown as OCRJobEntity[];
  }

  async createVerification(data: any): Promise<OCRVerificationEntity> {
    const ver = await this.db.oCRVerification.create({
      data: {
        ocrJobId: data.ocrJobId,
        reviewedBy: data.reviewedBy,
        reviewStatus: data.reviewStatus || 'APPROVED',
        reviewNotes: data.reviewNotes || null,
        completedAt: new Date(),
      },
    });

    // Update job status to COMPLETED
    await this.db.oCRJob.update({
      where: { id: data.ocrJobId },
      data: { status: 'COMPLETED', completedAt: new Date() },
    });

    return ver as unknown as OCRVerificationEntity;
  }

  // ─── Audit Logs ──────────────────────────────────────────────────────────

  async createAuditLog(data: { ocrJobId?: string; action: string; performedBy?: string; details?: string }): Promise<OCRAuditLogEntity> {
    return (await this.db.oCRAuditLog.create({
      data: {
        ocrJobId: data.ocrJobId || null,
        action: data.action,
        performedBy: data.performedBy || null,
        details: data.details || null,
      },
    })) as unknown as OCRAuditLogEntity;
  }

  async findAuditLogs(limit = 100): Promise<OCRAuditLogEntity[]> {
    return (await this.db.oCRAuditLog.findMany({
      orderBy: { createdAt: 'desc' },
      take: limit,
    })) as unknown as OCRAuditLogEntity[];
  }

  // ─── Dashboard Stats ─────────────────────────────────────────────────────

  async getDashboardStats() {
    const [
      totalJobs,
      completedJobs,
      reviewRequiredJobs,
      failedJobs,
      activeTemplatesCount,
      avgConfidenceResult,
    ] = await Promise.all([
      this.db.oCRJob.count({ where: { isDeleted: false } }),
      this.db.oCRJob.count({ where: { isDeleted: false, status: 'COMPLETED' } }),
      this.db.oCRJob.count({ where: { isDeleted: false, status: 'REVIEW_REQUIRED' } }),
      this.db.oCRJob.count({ where: { isDeleted: false, status: 'FAILED' } }),
      this.db.oCRTemplate.count({ where: { isDeleted: false, isActive: true } }),
      this.db.oCRJob.aggregate({
        where: { isDeleted: false, overallConfidence: { not: null } },
        _avg: { overallConfidence: true },
      }),
    ]);

    return {
      totalJobs,
      completedJobs,
      reviewRequiredJobs,
      failedJobs,
      averageConfidence: avgConfidenceResult._avg.overallConfidence || 0.0,
      activeTemplatesCount,
    };
  }
}

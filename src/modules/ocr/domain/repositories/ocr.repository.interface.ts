import {
  OCRJobEntity, OCRPageEntity, ExtractedFieldEntity,
  OCRTemplateEntity, OCRVerificationEntity, OCRAuditLogEntity,
} from '../entities/ocr.entity';

export interface IOcrRepository {
  // OCR Jobs
  createJob(data: any): Promise<OCRJobEntity>;
  findJobs(status?: string, documentType?: string): Promise<OCRJobEntity[]>;
  findJobById(id: string): Promise<OCRJobEntity | null>;
  updateJobStatus(id: string, status: string, overallConfidence?: number, confidenceLevel?: string, processingTimeMs?: number, failureReason?: string): Promise<OCRJobEntity>;
  softDeleteJob(id: string): Promise<void>;

  // Pages & Fields
  createPage(data: any): Promise<OCRPageEntity>;
  createExtractedField(data: any): Promise<ExtractedFieldEntity>;
  findExtractedFieldsByJobId(ocrJobId: string): Promise<ExtractedFieldEntity[]>;
  findPagesByJobId(ocrJobId: string): Promise<OCRPageEntity[]>;

  // Templates
  createTemplate(data: any): Promise<OCRTemplateEntity>;
  findTemplates(): Promise<OCRTemplateEntity[]>;
  findTemplateByCode(code: string): Promise<OCRTemplateEntity | null>;
  findTemplateById(id: string): Promise<OCRTemplateEntity | null>;
  updateTemplate(id: string, data: any): Promise<OCRTemplateEntity>;
  softDeleteTemplate(id: string): Promise<void>;

  // Verification
  findJobsRequiringReview(): Promise<OCRJobEntity[]>;
  createVerification(data: any): Promise<OCRVerificationEntity>;

  // Audit Logs
  createAuditLog(data: { ocrJobId?: string; action: string; performedBy?: string; details?: string }): Promise<OCRAuditLogEntity>;
  findAuditLogs(limit?: number): Promise<OCRAuditLogEntity[]>;

  // Analytics Dashboard Stats
  getDashboardStats(): Promise<{
    totalJobs: number;
    completedJobs: number;
    reviewRequiredJobs: number;
    failedJobs: number;
    averageConfidence: number;
    activeTemplatesCount: number;
  }>;
}

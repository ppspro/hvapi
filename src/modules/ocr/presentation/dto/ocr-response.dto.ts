import { ApiProperty } from '@nestjs/swagger';

export class OCRPageResponseDto {
  @ApiProperty() id!: string;
  @ApiProperty() ocrJobId!: string;
  @ApiProperty() pageNumber!: number;
  @ApiProperty({ nullable: true }) imagePath?: string;
  @ApiProperty({ nullable: true }) rawText?: string;
  @ApiProperty() confidence!: number;
  @ApiProperty() rotationAngle!: number;
  @ApiProperty({ nullable: true }) processingMetadata?: any;
  @ApiProperty() createdAt!: string;
}

export class ExtractedFieldResponseDto {
  @ApiProperty() id!: string;
  @ApiProperty() ocrJobId!: string;
  @ApiProperty() fieldName!: string;
  @ApiProperty() fieldValue!: string;
  @ApiProperty() confidence!: number;
  @ApiProperty({ nullable: true }) boundingBox?: any;
  @ApiProperty() validationStatus!: string;
  @ApiProperty() requiresReview!: boolean;
  @ApiProperty() createdAt!: string;
}

export class OCRTemplateResponseDto {
  @ApiProperty() id!: string;
  @ApiProperty() code!: string;
  @ApiProperty() name!: string;
  @ApiProperty() documentType!: string;
  @ApiProperty({ nullable: true }) fieldDefinitions?: any;
  @ApiProperty({ nullable: true }) validationRules?: any;
  @ApiProperty() version!: number;
  @ApiProperty() isActive!: boolean;
  @ApiProperty() createdAt!: string;
  @ApiProperty() updatedAt!: string;
}

export class OCRVerificationResponseDto {
  @ApiProperty() id!: string;
  @ApiProperty() ocrJobId!: string;
  @ApiProperty() reviewedBy!: string;
  @ApiProperty() reviewStatus!: string;
  @ApiProperty({ nullable: true }) reviewNotes?: string;
  @ApiProperty({ nullable: true }) completedAt?: string;
  @ApiProperty() createdAt!: string;
}

export class OCRJobResponseDto {
  @ApiProperty() id!: string;
  @ApiProperty() medicalAttachmentId!: string;
  @ApiProperty() documentType!: string;
  @ApiProperty() status!: string;
  @ApiProperty({ nullable: true }) submittedBy?: string;
  @ApiProperty({ nullable: true }) startedAt?: string;
  @ApiProperty({ nullable: true }) completedAt?: string;
  @ApiProperty({ nullable: true }) processingTimeMs?: number;
  @ApiProperty({ nullable: true }) overallConfidence?: number;
  @ApiProperty() confidenceLevel!: string;
  @ApiProperty({ nullable: true }) failureReason?: string;
  @ApiProperty({ type: [OCRPageResponseDto] }) pages!: OCRPageResponseDto[];
  @ApiProperty({ type: [ExtractedFieldResponseDto] }) extractedFields!: ExtractedFieldResponseDto[];
  @ApiProperty({ type: [OCRVerificationResponseDto] }) verifications!: OCRVerificationResponseDto[];
  @ApiProperty() createdAt!: string;
  @ApiProperty() updatedAt!: string;
}

export class OCRDashboardResponseDto {
  @ApiProperty() totalJobs!: number;
  @ApiProperty() completedJobs!: number;
  @ApiProperty() reviewRequiredJobs!: number;
  @ApiProperty() failedJobs!: number;
  @ApiProperty() averageConfidence!: number;
  @ApiProperty() activeTemplatesCount!: number;
}

import { IsNotEmpty, IsString, IsOptional, IsInt, IsBoolean, IsArray, IsEnum, IsObject } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateOCRJobDto {
  @ApiProperty({ example: 'attachment-uuid-1' })
  @IsNotEmpty()
  @IsString()
  medicalAttachmentId!: string;

  @ApiProperty({ example: 'LAB_REPORT', enum: ['UNKNOWN', 'HEALTH_CARD', 'PASSPORT', 'DRIVERS_LICENSE', 'INSURANCE_DOCUMENT', 'LAB_REPORT', 'DIAGNOSTIC_REPORT', 'MEDICAL_REPORT', 'PRESCRIPTION', 'REFERRAL', 'DISCHARGE_SUMMARY', 'CONSENT_FORM', 'REGISTRATION_FORM', 'VACCINATION_RECORD', 'MEDICAL_CERTIFICATE', 'OTHER'], required: false })
  @IsOptional()
  @IsString()
  documentType?: string;
}

export class CreateOCRTemplateDto {
  @ApiProperty({ example: 'TPL_LAB_CBC' })
  @IsNotEmpty()
  @IsString()
  code!: string;

  @ApiProperty({ example: 'Complete Blood Count (CBC) Lab Report Template' })
  @IsNotEmpty()
  @IsString()
  name!: string;

  @ApiProperty({ example: 'LAB_REPORT' })
  @IsNotEmpty()
  @IsString()
  documentType!: string;

  @ApiProperty({ example: { patientName: { type: 'string', required: true }, hemoglobin: { type: 'number', min: 5, max: 20 } }, required: false })
  @IsOptional()
  @IsObject()
  fieldDefinitions?: any;

  @ApiProperty({ example: { requireDoctorSignature: true }, required: false })
  @IsOptional()
  @IsObject()
  validationRules?: any;

  @ApiProperty({ example: true, required: false })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}

export class UpdateOCRTemplateDto {
  @ApiProperty({ example: 'Updated CBC Template Name', required: false })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({ example: 'LAB_REPORT', required: false })
  @IsOptional()
  @IsString()
  documentType?: string;

  @ApiProperty({ example: true, required: false })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}

export class VerifyOCRDto {
  @ApiProperty({ example: 'APPROVED', enum: ['APPROVED', 'REJECTED', 'CORRECTED'] })
  @IsNotEmpty()
  @IsString()
  reviewStatus!: string;

  @ApiProperty({ example: 'All extracted fields verified against original scan.', required: false })
  @IsOptional()
  @IsString()
  reviewNotes?: string;
}

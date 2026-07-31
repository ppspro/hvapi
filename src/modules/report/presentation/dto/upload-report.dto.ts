import { IsNotEmpty, IsString, IsOptional, IsEnum, IsNumber, IsArray, IsDateString, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export enum ReportCategory {
  LAB = 'LAB',
  RADIOLOGY = 'RADIOLOGY',
  PRESCRIPTION = 'PRESCRIPTION',
  REFERRAL = 'REFERRAL',
  DISCHARGE = 'DISCHARGE',
  VACCINATION = 'VACCINATION',
  CLINICAL_NOTES = 'CLINICAL_NOTES',
  INSURANCE = 'INSURANCE',
  CUSTOM = 'CUSTOM',
}

export class UploadReportDto {
  @ApiProperty({ example: 'Complete Blood Count (CBC) Lab Report' })
  @IsNotEmpty()
  @IsString()
  title!: string;

  @ApiProperty({ example: 'Routine blood panel covering WBC, RBC, hemoglobin, and platelets', required: false })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ enum: ReportCategory, example: 'LAB', required: false })
  @IsOptional()
  @IsEnum(ReportCategory)
  category?: ReportCategory;

  @ApiProperty({ example: '2026-07-30', required: false })
  @IsOptional()
  @IsDateString()
  reportDate?: string;

  @ApiProperty({ example: 'Dr. House', required: false })
  @IsOptional()
  @IsString()
  prescribedBy?: string;

  @ApiProperty({ example: 'Chugtai Labs', required: false })
  @IsOptional()
  @IsString()
  providerName?: string;

  @ApiProperty({ example: 'Main Branch Clinic', required: false })
  @IsOptional()
  @IsString()
  facilityName?: string;

  @ApiProperty({ example: 'Dr. John Watson', required: false })
  @IsOptional()
  @IsString()
  doctorName?: string;

  @ApiProperty({ example: 2, required: false })
  @IsOptional()
  @IsNumber()
  @Min(1)
  pageCount?: number;

  @ApiProperty({ example: 'en', required: false })
  @IsOptional()
  @IsString()
  language?: string;

  @ApiProperty({ example: ['blood', 'cbc', 'hematology'], type: [String], required: false })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags?: string[];

  @ApiProperty({ example: 'Patient felt slightly dizzy prior to sample collection', required: false })
  @IsOptional()
  @IsString()
  notes?: string;

  @ApiProperty({ example: 'cbc_report_2026.pdf' })
  @IsNotEmpty()
  @IsString()
  fileName!: string;

  @ApiProperty({ example: 524288 })
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  fileSize!: number;

  @ApiProperty({ example: 'application/pdf' })
  @IsNotEmpty()
  @IsString()
  mimeType!: string;

  @ApiProperty({ example: 'https://cdn.hvapi.com/reports/2026/07/cbc_report_2026.pdf' })
  @IsNotEmpty()
  @IsString()
  storageUrl!: string;

  @ApiProperty({ example: 'reports/2026/07/cbc_report_2026.pdf', required: false })
  @IsOptional()
  @IsString()
  storageKey?: string;

  @ApiProperty({ example: 'a1b2c3d4e5f6...', required: false })
  @IsOptional()
  @IsString()
  checksum?: string;
}

export class UpdateReportDto {
  @ApiProperty({ example: 'Updated Report Title', required: false })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ enum: ReportCategory, required: false })
  @IsOptional()
  @IsEnum(ReportCategory)
  category?: ReportCategory;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsDateString()
  reportDate?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  providerName?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  doctorName?: string;

  @ApiProperty({ required: false, type: [String] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags?: string[];

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  notes?: string;
}

export class ReplaceReportFileDto {
  @ApiProperty({ example: 'cbc_report_2026_v2.pdf' })
  @IsNotEmpty()
  @IsString()
  fileName!: string;

  @ApiProperty({ example: 600000 })
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  fileSize!: number;

  @ApiProperty({ example: 'application/pdf' })
  @IsNotEmpty()
  @IsString()
  mimeType!: string;

  @ApiProperty({ example: 'https://cdn.hvapi.com/reports/2026/07/cbc_report_2026_v2.pdf' })
  @IsNotEmpty()
  @IsString()
  storageUrl!: string;

  @ApiProperty({ example: 'reports/2026/07/cbc_report_2026_v2.pdf', required: false })
  @IsOptional()
  @IsString()
  storageKey?: string;
}

export class VerifyReportDto {
  @ApiProperty({ example: 'Verified by Lab Technician #402', required: false })
  @IsOptional()
  @IsString()
  notes?: string;
}

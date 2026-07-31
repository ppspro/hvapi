import { IsNotEmpty, IsString, IsOptional, IsInt, IsBoolean, IsArray, IsEnum, IsObject } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateConsentDto {
  @ApiProperty({ example: 'patient-uuid-1' })
  @IsNotEmpty()
  @IsString()
  patientId!: string;

  @ApiProperty({ example: 'TREATMENT', enum: ['TREATMENT', 'DATA_COLLECTION', 'DATA_SHARING', 'RESEARCH', 'MARKETING', 'DOCUMENT_PROCESSING', 'OTHER'], required: false })
  @IsOptional()
  @IsString()
  consentType?: string;

  @ApiProperty({ example: 'Authorization for clinical data processing and treatment history sharing' })
  @IsNotEmpty()
  @IsString()
  purpose!: string;

  @ApiProperty({ example: '2026-12-31T23:59:59.000Z', required: false })
  @IsOptional()
  @IsString()
  expiresAt?: string;

  @ApiProperty({ example: 'DOC_REF_SIGNED_CONSENT_FORM_123', required: false })
  @IsOptional()
  @IsString()
  evidenceReference?: string;
}

export class UpdateConsentDto {
  @ApiProperty({ example: 'GRANTED', enum: ['PENDING', 'GRANTED', 'DENIED', 'WITHDRAWN', 'EXPIRED'] })
  @IsNotEmpty()
  @IsString()
  status!: string;
}

export class CreateRetentionPolicyDto {
  @ApiProperty({ example: 'Patient Medical Records Retention' })
  @IsNotEmpty()
  @IsString()
  name!: string;

  @ApiProperty({ example: 'MEDICAL_RECORDS' })
  @IsNotEmpty()
  @IsString()
  resourceType!: string;

  @ApiProperty({ example: 2555, description: 'Retention period in days (e.g. 2555 days = 7 years)', required: false })
  @IsOptional()
  @IsInt()
  retentionPeriodDays?: number;

  @ApiProperty({ example: 'ARCHIVE', enum: ['ARCHIVE', 'DELETE', 'ANONYMIZE'], required: false })
  @IsOptional()
  @IsString()
  action?: string;

  @ApiProperty({ example: true, required: false })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}

export class UpdateRetentionPolicyDto {
  @ApiProperty({ example: 'Updated Policy Name', required: false })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({ example: 3650, required: false })
  @IsOptional()
  @IsInt()
  retentionPeriodDays?: number;

  @ApiProperty({ example: 'ARCHIVE', required: false })
  @IsOptional()
  @IsString()
  action?: string;

  @ApiProperty({ example: true, required: false })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}

export class CreateSecurityIncidentDto {
  @ApiProperty({ example: 'Unusual Login Attempt Spikes Detected' })
  @IsNotEmpty()
  @IsString()
  title!: string;

  @ApiProperty({ example: 'Multiple failed authentication attempts detected from IP 192.168.1.100' })
  @IsNotEmpty()
  @IsString()
  description!: string;

  @ApiProperty({ example: 'HIGH', enum: ['LOW', 'MEDIUM', 'HIGH', 'CRITICAL'], required: false })
  @IsOptional()
  @IsString()
  severity?: string;
}

export class ResolveSecurityIncidentDto {
  @ApiProperty({ example: 'IP address blocked; user password reset enforced.' })
  @IsNotEmpty()
  @IsString()
  resolutionNotes!: string;
}

export class GenerateComplianceReportDto {
  @ApiProperty({ example: 'HIPAA & GDPR Data Protection Audit Report Q3 2026' })
  @IsNotEmpty()
  @IsString()
  reportName!: string;

  @ApiProperty({ example: 'HIPAA_GDPR_COMPLIANCE' })
  @IsNotEmpty()
  @IsString()
  reportType!: string;

  @ApiProperty({ example: { period: 'Q3-2026', scope: 'Enterprise Health Vault 360' }, required: false })
  @IsOptional()
  @IsObject()
  metadata?: any;
}

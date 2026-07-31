import { IsNotEmpty, IsString, IsOptional, IsInt, IsEnum, IsDateString, IsObject } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCmsPageDto {
  @ApiProperty({ example: 'Terms of Service' })
  @IsNotEmpty()
  @IsString()
  title!: string;

  @ApiProperty({ example: 'terms-of-service' })
  @IsNotEmpty()
  @IsString()
  slug!: string;

  @ApiProperty({ example: '<h1>Terms of Service</h1><p>Welcome to Health Vault 360...</p>' })
  @IsNotEmpty()
  @IsString()
  content!: string;

  @ApiProperty({ example: 'Official Terms of Service for Health Vault 360', required: false })
  @IsOptional()
  @IsString()
  summary?: string;

  @ApiProperty({ example: 'Terms of Service - Health Vault 360', required: false })
  @IsOptional()
  @IsString()
  seoTitle?: string;

  @ApiProperty({ example: 'Read the terms of service and legal agreement for Health Vault 360 users.', required: false })
  @IsOptional()
  @IsString()
  seoDescription?: string;

  @ApiProperty({ example: 'terms, service, legal, health vault', required: false })
  @IsOptional()
  @IsString()
  seoKeywords?: string;

  @ApiProperty({ example: 'DRAFT', enum: ['DRAFT', 'REVIEW', 'PUBLISHED', 'ARCHIVED'], required: false })
  @IsOptional()
  @IsString()
  status?: string;
}

export class CreateCmsFaqDto {
  @ApiProperty({ example: 'How do I request emergency consent for family records?' })
  @IsNotEmpty()
  @IsString()
  question!: string;

  @ApiProperty({ example: 'Navigate to Family & Consent platform, select family member, and initiate OTP authorization.' })
  @IsNotEmpty()
  @IsString()
  answer!: string;

  @ApiProperty({ example: 'CONSENT', required: false })
  @IsOptional()
  @IsString()
  category?: string;

  @ApiProperty({ example: 1, required: false })
  @IsOptional()
  @IsInt()
  displayOrder?: number;

  @ApiProperty({ example: 'PUBLISHED', enum: ['DRAFT', 'REVIEW', 'PUBLISHED', 'ARCHIVED'], required: false })
  @IsOptional()
  @IsString()
  status?: string;
}

export class CreateCmsAnnouncementDto {
  @ApiProperty({ example: 'System Maintenance Scheduled for August 15' })
  @IsNotEmpty()
  @IsString()
  title!: string;

  @ApiProperty({ example: 'Health Vault 360 platform will undergo routine database maintenance from 02:00 to 04:00 PKT.' })
  @IsNotEmpty()
  @IsString()
  description!: string;

  @ApiProperty({ example: '2025-08-10T00:00:00.000Z', required: false })
  @IsOptional()
  @IsDateString()
  startDate?: string;

  @ApiProperty({ example: '2025-08-15T04:00:00.000Z', required: false })
  @IsOptional()
  @IsDateString()
  endDate?: string;

  @ApiProperty({ example: 'HIGH', enum: ['LOW', 'NORMAL', 'HIGH', 'URGENT'], required: false })
  @IsOptional()
  @IsString()
  priority?: string;

  @ApiProperty({ example: 'PUBLISHED', enum: ['DRAFT', 'REVIEW', 'PUBLISHED', 'ARCHIVED'], required: false })
  @IsOptional()
  @IsString()
  status?: string;
}

export class CreateCmsPolicyDto {
  @ApiProperty({ example: 'HIPAA & Data Privacy Compliance Policy' })
  @IsNotEmpty()
  @IsString()
  title!: string;

  @ApiProperty({ example: 'PRIVACY' })
  @IsNotEmpty()
  @IsString()
  policyType!: string;

  @ApiProperty({ example: '2.1', required: false })
  @IsOptional()
  @IsString()
  version?: string;

  @ApiProperty({ example: 'All personal health information (PHI) is encrypted at rest and in transit...' })
  @IsNotEmpty()
  @IsString()
  content!: string;

  @ApiProperty({ example: '2025-01-01', required: false })
  @IsOptional()
  @IsDateString()
  effectiveDate?: string;

  @ApiProperty({ example: 'PUBLISHED', enum: ['DRAFT', 'REVIEW', 'PUBLISHED', 'ARCHIVED'], required: false })
  @IsOptional()
  @IsString()
  status?: string;
}

export class CreateCmsBannerDto {
  @ApiProperty({ example: 'National Immunisation Campaign 2025' })
  @IsNotEmpty()
  @IsString()
  title!: string;

  @ApiProperty({ example: 'https://storage.healthvault360.com/banners/vaccine-desktop.jpg' })
  @IsNotEmpty()
  @IsString()
  imageUrl!: string;

  @ApiProperty({ example: 'https://storage.healthvault360.com/banners/vaccine-mobile.jpg', required: false })
  @IsOptional()
  @IsString()
  mobileImageUrl?: string;

  @ApiProperty({ example: 'https://healthvault360.com/immunisation', required: false })
  @IsOptional()
  @IsString()
  redirectUrl?: string;

  @ApiProperty({ example: 1, required: false })
  @IsOptional()
  @IsInt()
  displayOrder?: number;

  @ApiProperty({ example: '2025-08-01T00:00:00.000Z', required: false })
  @IsOptional()
  @IsDateString()
  startDate?: string;

  @ApiProperty({ example: '2025-08-31T23:59:59.000Z', required: false })
  @IsOptional()
  @IsDateString()
  endDate?: string;

  @ApiProperty({ example: 'PUBLISHED', enum: ['DRAFT', 'REVIEW', 'PUBLISHED', 'ARCHIVED'], required: false })
  @IsOptional()
  @IsString()
  status?: string;
}

export class CreateMediaLibraryDto {
  @ApiProperty({ example: 'hospital_hero.png' })
  @IsNotEmpty()
  @IsString()
  fileName!: string;

  @ApiProperty({ example: 'Hospital Main Building High Res.png' })
  @IsNotEmpty()
  @IsString()
  originalName!: string;

  @ApiProperty({ example: '/uploads/media/2025/hospital_hero.png' })
  @IsNotEmpty()
  @IsString()
  filePath!: string;

  @ApiProperty({ example: 'image/png' })
  @IsNotEmpty()
  @IsString()
  mimeType!: string;

  @ApiProperty({ example: 2048000 })
  @IsNotEmpty()
  @IsInt()
  fileSize!: number;

  @ApiProperty({ example: 'IMAGE', enum: ['IMAGE', 'VIDEO', 'PDF', 'DOCUMENT', 'AUDIO', 'OTHER'], required: false })
  @IsOptional()
  @IsString()
  mediaType?: string;

  @ApiProperty({ example: { width: 1920, height: 1080 }, required: false })
  @IsOptional()
  @IsObject()
  metadata?: any;
}

export class CreateContentBlockDto {
  @ApiProperty({ example: 'Footer Help Desk Contact' })
  @IsNotEmpty()
  @IsString()
  name!: string;

  @ApiProperty({ example: 'FOOTER_HELP_DESK' })
  @IsNotEmpty()
  @IsString()
  code!: string;

  @ApiProperty({ example: 'For support call 111-HV-360 or email support@healthvault360.com' })
  @IsNotEmpty()
  @IsString()
  content!: string;

  @ApiProperty({ example: 'PUBLISHED', enum: ['DRAFT', 'REVIEW', 'PUBLISHED', 'ARCHIVED'], required: false })
  @IsOptional()
  @IsString()
  status?: string;
}

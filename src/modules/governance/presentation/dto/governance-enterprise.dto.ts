import { IsNotEmpty, IsString, IsOptional, IsInt, IsBoolean, IsArray, IsEnum, IsObject } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateConfigurationDto {
  @ApiProperty({ example: 'SYSTEM_NAME' })
  @IsNotEmpty()
  @IsString()
  key!: string;

  @ApiProperty({ example: 'Health Vault 360 Enterprise' })
  @IsNotEmpty()
  @IsString()
  value!: string;

  @ApiProperty({ example: 'GENERAL', enum: ['SYSTEM', 'SECURITY', 'EMAIL', 'STORAGE', 'API', 'AUTH', 'FEATURE', 'UI', 'GENERAL'], required: false })
  @IsOptional()
  @IsString()
  category?: string;

  @ApiProperty({ example: 'STRING', required: false })
  @IsOptional()
  @IsString()
  valueType?: string;

  @ApiProperty({ example: 'Primary application title', required: false })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ example: false, required: false })
  @IsOptional()
  @IsBoolean()
  isEncrypted?: boolean;

  @ApiProperty({ example: true, required: false })
  @IsOptional()
  @IsBoolean()
  isEditable?: boolean;
}

export class UpdateConfigurationDto {
  @ApiProperty({ example: 'Health Vault 360 Enterprise v2' })
  @IsNotEmpty()
  @IsString()
  value!: string;

  @ApiProperty({ example: 'Annual system update', required: false })
  @IsOptional()
  @IsString()
  changeReason?: string;
}

export class ImportConfigurationsDto {
  @ApiProperty({ type: [CreateConfigurationDto] })
  @IsArray()
  configurations!: CreateConfigurationDto[];
}

export class CreateFeatureFlagDto {
  @ApiProperty({ example: 'FEATURE_AI_OCR_PROCESSING' })
  @IsNotEmpty()
  @IsString()
  code!: string;

  @ApiProperty({ example: 'AI Document OCR Processing Engine' })
  @IsNotEmpty()
  @IsString()
  name!: string;

  @ApiProperty({ example: 'Enables automated extraction of clinical reports via OCR', required: false })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ example: 'BETA', enum: ['ENABLED', 'DISABLED', 'BETA', 'DEPRECATED'], required: false })
  @IsOptional()
  @IsString()
  status?: string;

  @ApiProperty({ example: ['ADMIN', 'DOCTOR'], type: [String], required: false })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  enabledForRoles?: string[];

  @ApiProperty({ example: ['ai-ocr', 'medical-record'], type: [String], required: false })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  enabledForModules?: string[];

  @ApiProperty({ example: 50, required: false })
  @IsOptional()
  @IsInt()
  rolloutPercentage?: number;
}

export class CreateMasterCategoryDto {
  @ApiProperty({ example: 'BLOOD_GROUP' })
  @IsNotEmpty()
  @IsString()
  code!: string;

  @ApiProperty({ example: 'Blood Group Classification' })
  @IsNotEmpty()
  @IsString()
  name!: string;

  @ApiProperty({ example: 'Standard human blood types', required: false })
  @IsOptional()
  @IsString()
  description?: string;
}

export class CreateMasterItemDto {
  @ApiProperty({ example: 'cat-uuid-1' })
  @IsNotEmpty()
  @IsString()
  categoryId!: string;

  @ApiProperty({ example: 'A_POSITIVE' })
  @IsNotEmpty()
  @IsString()
  code!: string;

  @ApiProperty({ example: 'A Positive (A+)' })
  @IsNotEmpty()
  @IsString()
  name!: string;

  @ApiProperty({ example: 'A+ Blood Type', required: false })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ example: 1, required: false })
  @IsOptional()
  @IsInt()
  sortOrder?: number;

  @ApiProperty({ example: true, required: false })
  @IsOptional()
  @IsBoolean()
  isDefault?: boolean;
}

export class CreatePlatformPolicyDto {
  @ApiProperty({ example: 'POL-GOV-DATA-RETENTION' })
  @IsNotEmpty()
  @IsString()
  code!: string;

  @ApiProperty({ example: 'Platform Data Retention & Archival Policy' })
  @IsNotEmpty()
  @IsString()
  title!: string;

  @ApiProperty({ example: 'Mandates 7-year retention for medical records', required: false })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ example: 'All clinical documents must be persisted for a minimum of 7 years...' })
  @IsNotEmpty()
  @IsString()
  content!: string;

  @ApiProperty({ example: '1.0', required: false })
  @IsOptional()
  @IsString()
  version?: string;

  @ApiProperty({ example: '2025-01-01', required: false })
  @IsOptional()
  @IsString()
  effectiveDate?: string;
}

export class UpdateMaintenanceModeDto {
  @ApiProperty({ example: 'FULL', enum: ['OFF', 'READ_ONLY', 'FULL'] })
  @IsNotEmpty()
  @IsString()
  mode!: string;

  @ApiProperty({ example: 'Scheduled enterprise core upgrade in progress.', required: false })
  @IsOptional()
  @IsString()
  message?: string;

  @ApiProperty({ example: '2025-08-15T02:00:00.000Z', required: false })
  @IsOptional()
  @IsString()
  startsAt?: string;

  @ApiProperty({ example: '2025-08-15T04:00:00.000Z', required: false })
  @IsOptional()
  @IsString()
  endsAt?: string;

  @ApiProperty({ example: true, required: false })
  @IsOptional()
  @IsBoolean()
  allowAdminAccess?: boolean;
}

import { IsNotEmpty, IsString, IsOptional, IsEnum, IsNumber, IsArray, ValidateNested, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export enum QrEntityType {
  HEALTH_CARD = 'HEALTH_CARD',
  MEDICAL_RECORD = 'MEDICAL_RECORD',
  MEDICAL_REPORT = 'MEDICAL_REPORT',
  INSURANCE = 'INSURANCE',
  IMMUNISATION = 'IMMUNISATION',
  DOCTOR_ID = 'DOCTOR_ID',
  FACILITY_ID = 'FACILITY_ID',
  EMERGENCY_CARD = 'EMERGENCY_CARD',
  CUSTOM = 'CUSTOM',
}

export class GenerateQrDto {
  @ApiProperty({ example: 'entity-uuid-12345', description: 'ID of the business entity (Health Card ID, Record ID, Report ID, etc.)' })
  @IsNotEmpty()
  @IsString()
  entityId!: string;

  @ApiProperty({ enum: QrEntityType, example: 'HEALTH_CARD' })
  @IsNotEmpty()
  @IsEnum(QrEntityType)
  entityType!: QrEntityType;

  @ApiProperty({ example: 365, required: false, description: 'Validity duration in days' })
  @IsOptional()
  @IsNumber()
  @Min(1)
  validityDays?: number;
}

export class VerifyQrPayloadDto {
  @ApiProperty({ example: 'qr_token_string_or_signed_hash', description: 'QR Token string to verify' })
  @IsNotEmpty()
  @IsString()
  token!: string;

  @ApiProperty({ example: 'iOS / Chrome 120', required: false })
  @IsOptional()
  @IsString()
  deviceInfo?: string;

  @ApiProperty({ example: '37.7749,-122.4194', required: false })
  @IsOptional()
  @IsString()
  location?: string;
}

export class RotateQrDto {
  @ApiProperty({ example: 'Token compromised or scheduled rotation', required: false })
  @IsOptional()
  @IsString()
  reason?: string;
}

export class RevokeQrDto {
  @ApiProperty({ example: 'Security compromise / lost card', required: false })
  @IsOptional()
  @IsString()
  reason?: string;
}

export class BulkGenerateQrDto {
  @ApiProperty({ type: [GenerateQrDto] })
  @IsNotEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => GenerateQrDto)
  items!: GenerateQrDto[];
}

export class BulkQrActionDto {
  @ApiProperty({ example: ['qr-uuid-1', 'qr-uuid-2'], type: [String] })
  @IsNotEmpty()
  @IsArray()
  @IsString({ each: true })
  qrIds!: string[];

  @ApiProperty({ example: 'Bulk administrative operation', required: false })
  @IsOptional()
  @IsString()
  reason?: string;
}

export class UpdateQrDto {
  @ApiProperty({ example: 180, required: false, description: 'Extend or set expiry days' })
  @IsOptional()
  @IsNumber()
  validityDays?: number;
}

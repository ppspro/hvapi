import { IsNotEmpty, IsString, IsOptional, IsInt, IsBoolean, IsArray, IsEnum, IsObject } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTemplateDto {
  @ApiProperty({ example: 'TPL_PATIENT_ONBOARDING_WELCOME' })
  @IsNotEmpty()
  @IsString()
  code!: string;

  @ApiProperty({ example: 'Patient Onboarding Welcome Message' })
  @IsNotEmpty()
  @IsString()
  name!: string;

  @ApiProperty({ example: 'Welcome to Health Vault 360, {{patientName}}!' })
  @IsNotEmpty()
  @IsString()
  subject!: string;

  @ApiProperty({ example: 'Dear {{patientName}}, your account has been successfully activated with MRN: {{mrn}}.' })
  @IsNotEmpty()
  @IsString()
  body!: string;

  @ApiProperty({ example: 'IN_APP', enum: ['IN_APP', 'EMAIL', 'SMS', 'PUSH', 'WEBHOOK'], required: false })
  @IsOptional()
  @IsString()
  channel?: string;

  @ApiProperty({ example: { patientName: 'string', mrn: 'string' }, required: false })
  @IsOptional()
  @IsObject()
  variables?: any;

  @ApiProperty({ example: true, required: false })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}

export class UpdateTemplateDto {
  @ApiProperty({ example: 'Updated Subject Title', required: false })
  @IsOptional()
  @IsString()
  subject?: string;

  @ApiProperty({ example: 'Updated body with {{patientName}}...', required: false })
  @IsOptional()
  @IsString()
  body?: string;

  @ApiProperty({ example: 'EMAIL', enum: ['IN_APP', 'EMAIL', 'SMS', 'PUSH', 'WEBHOOK'], required: false })
  @IsOptional()
  @IsString()
  channel?: string;

  @ApiProperty({ example: true, required: false })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}

export class CreateNotificationDto {
  @ApiProperty({ example: 'user-uuid-1', required: false })
  @IsOptional()
  @IsString()
  recipientUserId?: string;

  @ApiProperty({ example: 'patient@example.com', required: false })
  @IsOptional()
  @IsString()
  recipientEmail?: string;

  @ApiProperty({ example: '+923001234567', required: false })
  @IsOptional()
  @IsString()
  recipientPhone?: string;

  @ApiProperty({ example: 'Security Alert: Password Changed' })
  @IsNotEmpty()
  @IsString()
  title!: string;

  @ApiProperty({ example: 'Your password was changed successfully on July 31, 2026.' })
  @IsNotEmpty()
  @IsString()
  message!: string;

  @ApiProperty({ example: 'SECURITY', enum: ['SYSTEM', 'SECURITY', 'PATIENT', 'DOCTOR', 'STAFF', 'CMS', 'REPORT', 'GOVERNANCE', 'GENERAL'], required: false })
  @IsOptional()
  @IsString()
  notificationType?: string;

  @ApiProperty({ example: 'NORMAL', enum: ['LOW', 'NORMAL', 'HIGH', 'CRITICAL'], required: false })
  @IsOptional()
  @IsString()
  priority?: string;

  @ApiProperty({ example: 'IN_APP', enum: ['IN_APP', 'EMAIL', 'SMS', 'PUSH', 'WEBHOOK'], required: false })
  @IsOptional()
  @IsString()
  channel?: string;

  @ApiProperty({ example: { actionBy: 'user-uuid-1', ip: '127.0.0.1' }, required: false })
  @IsOptional()
  @IsObject()
  metadata?: any;

  @ApiProperty({ example: '2025-08-01T00:00:00.000Z', required: false })
  @IsOptional()
  @IsString()
  scheduledAt?: string;
}

export class UpdateNotificationPreferenceDto {
  @ApiProperty({ example: true, required: false })
  @IsOptional()
  @IsBoolean()
  emailEnabled?: boolean;

  @ApiProperty({ example: true, required: false })
  @IsOptional()
  @IsBoolean()
  smsEnabled?: boolean;

  @ApiProperty({ example: true, required: false })
  @IsOptional()
  @IsBoolean()
  pushEnabled?: boolean;

  @ApiProperty({ example: true, required: false })
  @IsOptional()
  @IsBoolean()
  inAppEnabled?: boolean;

  @ApiProperty({ example: false, required: false })
  @IsOptional()
  @IsBoolean()
  webhookEnabled?: boolean;
}

export class RetryQueueDto {
  @ApiProperty({ example: 'queue-item-uuid-1', required: false })
  @IsOptional()
  @IsString()
  queueItemId?: string;
}

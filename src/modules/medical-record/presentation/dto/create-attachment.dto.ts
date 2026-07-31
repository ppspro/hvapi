import { IsNotEmpty, IsString, IsNumber, IsOptional, IsEnum, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { AttachmentCategory } from './create-medical-record.dto';

export class CreateAttachmentDto {
  @ApiProperty({ example: 'blood_report_2026.pdf', description: 'Target filename' })
  @IsNotEmpty()
  @IsString()
  fileName!: string;

  @ApiProperty({ example: 'Blood_Test_Report_Final.pdf', description: 'Original uploaded filename' })
  @IsNotEmpty()
  @IsString()
  originalName!: string;

  @ApiProperty({ example: 1048576, description: 'File size in bytes (max 15MB)' })
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  fileSize!: number;

  @ApiProperty({ example: 'application/pdf', description: 'MIME content type' })
  @IsNotEmpty()
  @IsString()
  mimeType!: string;

  @ApiProperty({ enum: AttachmentCategory, example: 'LAB_RESULT', required: false })
  @IsOptional()
  @IsEnum(AttachmentCategory)
  category?: AttachmentCategory;

  @ApiProperty({ example: 'attachments/2026/07/blood_report_2026.pdf', description: 'Storage key/path' })
  @IsNotEmpty()
  @IsString()
  storageKey!: string;

  @ApiProperty({ example: 'https://cdn.hvapi.com/attachments/2026/07/blood_report_2026.pdf', description: 'CDN or direct retrieval URL' })
  @IsNotEmpty()
  @IsString()
  storageUrl!: string;

  @ApiProperty({ example: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855', required: false })
  @IsOptional()
  @IsString()
  checksum?: string;
}

export class UpdateAttachmentDto {
  @ApiProperty({ enum: AttachmentCategory, required: false })
  @IsOptional()
  @IsEnum(AttachmentCategory)
  category?: AttachmentCategory;

  @ApiProperty({ example: 'updated_file_name.pdf', required: false })
  @IsOptional()
  @IsString()
  fileName?: string;

  @ApiProperty({ example: 'attachments/2026/07/new_version.pdf', required: false, description: 'New storage key if uploading new version' })
  @IsOptional()
  @IsString()
  storageKey?: string;

  @ApiProperty({ example: 'https://cdn.hvapi.com/attachments/2026/07/new_version.pdf', required: false })
  @IsOptional()
  @IsString()
  storageUrl?: string;

  @ApiProperty({ example: 2048576, required: false })
  @IsOptional()
  @IsNumber()
  fileSize?: number;
}

import { IsNotEmpty, IsString, IsOptional, IsInt, IsUrl } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateReportDto {
  @ApiProperty({ example: 'CBC Blood Test', description: 'Title of the medical report' })
  @IsNotEmpty()
  @IsString()
  title!: string;

  @ApiProperty({ example: 'Laboratory', description: 'Category classification of the report' })
  @IsNotEmpty()
  @IsString()
  category!: string;

  @ApiProperty({ example: 'Dr. Robert Chen', description: 'Prescribing clinician name', required: false })
  @IsOptional()
  @IsString()
  prescribedBy?: string;

  @ApiProperty({ example: 'cbc-report.pdf', description: 'Attachment file name' })
  @IsNotEmpty()
  @IsString()
  fileName!: string;

  @ApiProperty({ example: 1048576, description: 'Attachment file size in bytes' })
  @IsNotEmpty()
  @IsInt()
  fileSize!: number;

  @ApiProperty({ example: 'application/pdf', description: 'Attachment MIME format type' })
  @IsNotEmpty()
  @IsString()
  mimeType!: string;

  @ApiProperty({ example: 'https://storage.healthvault360.com/reports/cbc.pdf', description: 'Uploaded attachment S3 storage URL' })
  @IsNotEmpty()
  @IsUrl()
  storageUrl!: string;
}

export class CreateReportResponseDto {
  @ApiProperty({ example: 'report-uuid-v4', description: 'Created medical report identifier' })
  reportId!: string;

  @ApiProperty({ example: 'Medical report uploaded successfully', description: 'Success status message' })
  message!: string;
}

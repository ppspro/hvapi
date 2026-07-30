import { ApiProperty } from '@nestjs/swagger';

export class ReportAttachmentDto {
  @ApiProperty({ example: 'attachment-uuid-v4' })
  id!: string;

  @ApiProperty({ example: 'cbc-report.pdf' })
  fileName!: string;

  @ApiProperty({ example: 1048576 })
  fileSize!: number;

  @ApiProperty({ example: 'application/pdf' })
  mimeType!: string;

  @ApiProperty({ example: 'https://storage.healthvault360.com/reports/cbc.pdf' })
  storageUrl!: string;
}

export class ReportResponseDto {
  @ApiProperty({ example: 'report-uuid-v4' })
  id!: string;

  @ApiProperty({ example: 'CBC Blood Test' })
  title!: string;

  @ApiProperty({ example: 'Laboratory' })
  category!: string;

  @ApiProperty({ example: 'Dr. Robert Chen', required: false })
  prescribedBy?: string;

  @ApiProperty({ example: '2026-07-30T17:25:54.000Z' })
  createdAt!: Date;

  @ApiProperty({ type: [ReportAttachmentDto], description: 'Attachments linked to the report' })
  attachments!: ReportAttachmentDto[];
}

import { ApiProperty } from '@nestjs/swagger';

export class DownloadReportResponseDto {
  @ApiProperty({ example: 'https://storage.healthvault360.com/reports/cbc.pdf?expiry-signature-auth', description: 'Secure presigned temporary file download link' })
  downloadUrl!: string;

  @ApiProperty({ example: '3600', description: 'Link validity duration in seconds' })
  expiresInSeconds!: number;
}

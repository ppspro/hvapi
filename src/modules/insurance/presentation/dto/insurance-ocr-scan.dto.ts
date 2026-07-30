import { IsNotEmpty, IsUrl } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class InsuranceOcrScanDto {
  @ApiProperty({ example: 'https://storage.healthvault360.com/cards/ins-123.jpg', description: 'URL of the uploaded insurance card image' })
  @IsNotEmpty()
  @IsUrl()
  imageUrl!: string;
}

export class InsuranceOcrScanResponseDto {
  @ApiProperty({ example: 'ocr-uuid', description: 'Identifier of the created OCR task' })
  ocrId!: string;

  @ApiProperty({
    example: { providerName: 'Blue Shield', policyNumber: 'POL987654321', coverageDetails: 'OCR Extracted Details' },
    description: 'Extracted candidate policy values',
  })
  extractedData!: {
    providerName: string;
    policyNumber: string;
    coverageDetails?: string;
  };

  @ApiProperty({ example: 0.95, description: 'OCR extraction confidence score (0.0 to 1.0)' })
  confidence!: number;
}

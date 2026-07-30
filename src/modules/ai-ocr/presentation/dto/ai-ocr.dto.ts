import { IsNotEmpty, IsUrl, IsUUID, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AiOcrExtractDto {
  @ApiProperty({ example: 'https://storage.healthvault360.com/reports/lab-123.jpg', description: 'URL of the uploaded medical report file image' })
  @IsNotEmpty()
  @IsUrl()
  imageUrl!: string;
}

export class AiOcrExtractResponseDto {
  @ApiProperty({ example: 'ocr-doc-uuid-v4', description: 'Identifier of the created OCR document entry' })
  documentId!: string;

  @ApiProperty({
    example: { title: 'Blood Panel', category: 'Laboratory', prescribedBy: 'Dr. Robert Watson' },
    description: 'AI candidate extracted fields payload structure',
  })
  extractedData!: {
    title: string;
    category: string;
    prescribedBy?: string;
  };

  @ApiProperty({ example: 0.92, description: 'AI extraction confidence score (0.0 to 1.0)' })
  confidence!: number;
}

export class AiOcrConfirmDto {
  @ApiProperty({ example: 'ocr-doc-uuid-v4', description: 'OCR document identifier' })
  @IsNotEmpty()
  @IsUUID('4')
  documentId!: string;

  @ApiProperty({ example: '{"title":"Blood Panel","category":"Laboratory","prescribedBy":"Dr. Watson"}', description: 'Corrected JSON string values confirmed by manual review' })
  @IsNotEmpty()
  @IsString()
  confirmedData!: string;
}

export class AiOcrConfirmResponseDto {
  @ApiProperty({ example: true })
  success!: boolean;

  @ApiProperty({ example: 'OCR extraction verified and saved successfully' })
  message!: string;
}

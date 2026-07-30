import { IsNotEmpty, IsUUID, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { OnboardInsuranceDto } from './onboard-insurance.dto';

export class InsuranceOcrConfirmDto {
  @ApiProperty({ example: 'ocr-uuid-v4', description: 'OCR task identifier' })
  @IsNotEmpty()
  @IsUUID('4')
  ocrId!: string;

  @ApiProperty({ type: OnboardInsuranceDto, description: 'Reviewed and corrected policy data' })
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => OnboardInsuranceDto)
  confirmedData!: OnboardInsuranceDto;
}

export class InsuranceOcrConfirmResponseDto {
  @ApiProperty({ example: 'policy-uuid-v4', description: 'Created policy identifier' })
  policyId!: string;

  @ApiProperty({ example: 'Insurance OCR data confirmed and policy saved', description: 'Success status message' })
  message!: string;
}

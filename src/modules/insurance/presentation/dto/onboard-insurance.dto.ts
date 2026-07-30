import { IsNotEmpty, IsString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class OnboardInsuranceDto {
  @ApiProperty({ example: 'Blue Shield', description: 'Insurance provider name' })
  @IsNotEmpty()
  @IsString()
  providerName!: string;

  @ApiProperty({ example: 'POL987654321', description: 'Insurance policy number' })
  @IsNotEmpty()
  @IsString()
  policyNumber!: string;

  @ApiProperty({ example: 'Co-pay $20, Deductible $500', description: 'Coverage details', required: false })
  @IsOptional()
  @IsString()
  coverageDetails?: string;
}

export class OnboardInsuranceResponseDto {
  @ApiProperty({ example: 'policy-uuid', description: 'Created policy identifier' })
  policyId!: string;

  @ApiProperty({ example: 'Insurance onboarding completed successfully', description: 'Success status message' })
  message!: string;

  @ApiProperty({ example: 5, description: 'Next onboarding step flow' })
  nextStep!: number;
}

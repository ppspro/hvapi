import { IsNotEmpty, IsString, IsOptional, IsDateString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class OnboardInsuranceDto {
  @ApiProperty({ example: 'MetLife Healthcare', description: 'Primary insurance provider' })
  @IsNotEmpty({ message: 'Primary insurance provider is required' })
  @IsString()
  providerName!: string;

  @ApiProperty({ example: 'POL-10029302', description: 'Primary policy identifier number' })
  @IsNotEmpty({ message: 'Primary policy number is required' })
  @IsString()
  policyNumber!: string;

  @ApiProperty({ example: 'Standard Medical Plan A', description: 'Primary coverage description details' })
  @IsOptional()
  @IsString()
  coverageDetails?: string;

  @ApiProperty({ example: '2028-12-31', description: 'Primary policy expiration date' })
  @IsNotEmpty({ message: 'Primary policy expiration date is required' })
  @IsDateString()
  expiryDate!: string;

  @ApiProperty({ example: 'Aetna Life', description: 'Secondary insurance provider' })
  @IsOptional()
  @IsString()
  secondaryProvider?: string;

  @ApiProperty({ example: 'POL-20038491', description: 'Secondary policy identifier number' })
  @IsOptional()
  @IsString()
  secondaryPolicyNumber?: string;

  @ApiProperty({ example: 'Dental and Vision Supplement', description: 'Secondary coverage details' })
  @IsOptional()
  @IsString()
  secondaryCoverage?: string;
}

export class OnboardInsuranceResponseDto {
  @ApiProperty({ example: 'policy-uuid-v4', description: 'Insurance policy record ID' })
  policyId!: string;

  @ApiProperty({ example: 'Primary and optional secondary insurance linked successfully', description: 'Status message' })
  message!: string;

  @ApiProperty({ example: 5, description: 'Next step to execute' })
  nextStep!: number;
}

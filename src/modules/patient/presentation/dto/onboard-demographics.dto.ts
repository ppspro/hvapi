import { IsNotEmpty, IsString, IsDateString, IsOptional, IsIn } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class OnboardDemographicsDto {
  @ApiProperty({ example: 'John', description: 'First name of the patient' })
  @IsNotEmpty()
  @IsString()
  firstName!: string;

  @ApiProperty({ example: 'Doe', description: 'Last name of the patient' })
  @IsNotEmpty()
  @IsString()
  lastName!: string;

  @ApiProperty({ example: '1990-01-01', description: 'Date of birth of the patient' })
  @IsNotEmpty()
  @IsDateString()
  dateOfBirth!: string;

  @ApiProperty({ example: 'Male', description: 'Gender of the patient' })
  @IsNotEmpty()
  @IsString()
  @IsIn(['Male', 'Female', 'Other'])
  gender!: string;

  @ApiProperty({ example: 'O+', description: 'Blood group', required: false })
  @IsOptional()
  @IsString()
  bloodGroup?: string;

  @ApiProperty({ example: '123 Main St, New York, NY', description: 'Primary address', required: false })
  @IsOptional()
  @IsString()
  address?: string;
}

export class OnboardDemographicsResponseDto {
  @ApiProperty({ example: 'profile-uuid', description: 'Created patient profile identifier' })
  profileId!: string;

  @ApiProperty({ example: 'Demographics onboarding completed successfully', description: 'Status message' })
  message!: string;

  @ApiProperty({ example: 3, description: 'Next onboarding step flow' })
  nextStep!: number;
}

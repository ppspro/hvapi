import { IsNotEmpty, IsString, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class OnboardEmergencyInfoDto {
  @ApiProperty({ example: 'Jane Doe', description: 'Name of the emergency contact' })
  @IsNotEmpty()
  @IsString()
  name!: string;

  @ApiProperty({ example: 'Spouse', description: 'Relationship to the patient' })
  @IsNotEmpty()
  @IsString()
  relationship!: string;

  @ApiProperty({ example: '+14155552671', description: 'Emergency contact phone number in E.164 format' })
  @IsNotEmpty()
  @IsString()
  @Matches(/^\+[1-9]\d{1,14}$/, {
    message: 'Emergency phone number must follow E.164 international format (e.g. +14155552671)',
  })
  phone!: string;
}

export class OnboardEmergencyInfoResponseDto {
  @ApiProperty({ example: 'emergency-contact-uuid', description: 'Created emergency contact identifier' })
  contactId!: string;

  @ApiProperty({ example: 'Emergency information onboarding completed successfully', description: 'Status message' })
  message!: string;

  @ApiProperty({ example: 4, description: 'Next onboarding step flow' })
  nextStep!: number;
}

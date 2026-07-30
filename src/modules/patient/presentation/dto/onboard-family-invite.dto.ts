import { IsNotEmpty, IsString, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class OnboardFamilyInviteDto {
  @ApiProperty({ example: '+14155559876', description: 'Family member phone number in E.164 format' })
  @IsNotEmpty()
  @IsString()
  @Matches(/^\+[1-9]\d{1,14}$/, {
    message: 'Family invite phone number must follow E.164 international format (e.g. +14155559876)',
  })
  inviteePhone!: string;

  @ApiProperty({ example: 'Child', description: 'Relationship to the patient' })
  @IsNotEmpty()
  @IsString()
  relationship!: string;
}

export class OnboardFamilyInviteResponseDto {
  @ApiProperty({ example: 'consent-uuid', description: 'Created family consent invitation identifier' })
  consentId!: string;

  @ApiProperty({ example: 'Family invitation sent successfully', description: 'Status message' })
  message!: string;

  @ApiProperty({ example: 7, description: 'Next onboarding step flow' })
  nextStep!: number;
}

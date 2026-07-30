import { ApiProperty } from '@nestjs/swagger';

export class OnboardHealthCardResponseDto {
  @ApiProperty({ example: 'card-uuid', description: 'Generated Health Card identifier' })
  cardId!: string;

  @ApiProperty({ example: 'HV360-1234-5678-9012', description: 'Public card identification number' })
  cardNumber!: string;

  @ApiProperty({ example: 'Health Card generated successfully during onboarding', description: 'Status message' })
  message!: string;

  @ApiProperty({ example: 6, description: 'Next onboarding step flow' })
  nextStep!: number;
}

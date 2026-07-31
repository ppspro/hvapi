import { ApiProperty } from '@nestjs/swagger';

export class OnboardHealthCardDto {
  // Triggers card record initialization during onboarding Step 5
}

export class OnboardHealthCardResponseDto {
  @ApiProperty({ example: 'card-uuid-v4', description: 'Generated health card record ID' })
  cardId!: string;

  @ApiProperty({ example: 'HC-2026-00001', description: 'Unique digital health card number' })
  cardNumber!: string;

  @ApiProperty({ example: 'Digital Health Card initialized successfully', description: 'Status message' })
  message!: string;

  @ApiProperty({ example: 6, description: 'Next step to execute' })
  nextStep!: number;
}

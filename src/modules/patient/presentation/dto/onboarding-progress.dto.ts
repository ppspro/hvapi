import { ApiProperty } from '@nestjs/swagger';

export class StepProgressDto {
  @ApiProperty({ example: 1, description: 'Step index number' })
  step!: number;

  @ApiProperty({ example: 'Identity Verification', description: 'Step name' })
  name!: string;

  @ApiProperty({ example: true, description: 'Indicating step completion status' })
  completed!: boolean;
}

export class OnboardingProgressResponseDto {
  @ApiProperty({ example: 83, description: 'Overall onboarding completion percentage (0-100)' })
  completionPercentage!: number;

  @ApiProperty({ example: 'DRAFT', description: 'Overall registration status' })
  status!: string;

  @ApiProperty({ type: [StepProgressDto], description: 'Detailed checklist parameters per step' })
  steps!: StepProgressDto[];
}

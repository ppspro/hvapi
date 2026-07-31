import { ApiProperty } from '@nestjs/swagger';

export class ProfileCompletionSectionDto {
  @ApiProperty({ example: 'Basic Information' })
  section!: string;

  @ApiProperty({ example: true })
  completed!: boolean;

  @ApiProperty({ example: ['firstName', 'lastName'], type: [String], nullable: true })
  missingFields?: string[];
}

export class ProfileCompletionResponseDto {
  @ApiProperty({ example: 72, description: 'Overall completion percentage (0-100)' })
  completionPercentage!: number;

  @ApiProperty({ example: 'DRAFT', description: 'Profile status' })
  status!: string;

  @ApiProperty({ type: [ProfileCompletionSectionDto], description: 'Section-level completion breakdown' })
  sections!: ProfileCompletionSectionDto[];
}

export class ProfileTimelineEventDto {
  @ApiProperty({ example: 'profile_updated' })
  action!: string;

  @ApiProperty({ example: 'firstName', nullable: true })
  fieldChanged?: string;

  @ApiProperty({ example: '2026-07-31T06:00:00.000Z' })
  timestamp!: string;
}

export class ProfileTimelineResponseDto {
  @ApiProperty({ type: [ProfileTimelineEventDto] })
  events!: ProfileTimelineEventDto[];
}

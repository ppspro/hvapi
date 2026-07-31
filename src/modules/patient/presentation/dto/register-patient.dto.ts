import { ApiProperty } from '@nestjs/swagger';

export class RegisterPatientDto {
  // Empty or initial registration draft triggers. No mandatory fields on first step
}

export class RegisterPatientResponseDto {
  @ApiProperty({ example: 'patient-uuid-v4', description: 'Patient Profile ID' })
  profileId!: string;

  @ApiProperty({ example: 'PT-2026-00001', description: 'Unique patient business number' })
  patientNumber!: string;

  @ApiProperty({ example: 'DRAFT', description: 'Registration status' })
  status!: string;

  @ApiProperty({ example: 1, description: 'Current active step' })
  onboardingStep!: number;
}

import { ApiProperty } from '@nestjs/swagger';

export class PatientProfileResponseDto {
  @ApiProperty({ example: 'profile-uuid' })
  id!: string;

  @ApiProperty({ example: 'John', nullable: true })
  firstName?: string;

  @ApiProperty({ example: 'Doe', nullable: true })
  lastName?: string;

  @ApiProperty({ example: '1990-01-01', nullable: true })
  dateOfBirth?: string;

  @ApiProperty({ example: 'Male', nullable: true })
  gender?: string;

  @ApiProperty({ example: 'O+', nullable: true })
  bloodGroup?: string;

  @ApiProperty({ example: '123 St', nullable: true })
  address?: string;

  @ApiProperty({ example: 6 })
  onboardingStep!: number;
}

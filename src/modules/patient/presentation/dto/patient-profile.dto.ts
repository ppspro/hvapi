import { ApiProperty } from '@nestjs/swagger';

export class PatientProfileResponseDto {
  @ApiProperty({ example: 'profile-uuid' })
  id!: string;

  @ApiProperty({ example: 'John' })
  firstName!: string;

  @ApiProperty({ example: 'Doe' })
  lastName!: string;

  @ApiProperty({ example: '1990-01-01' })
  dateOfBirth!: string;

  @ApiProperty({ example: 'Male' })
  gender!: string;

  @ApiProperty({ example: 'O+' })
  bloodGroup?: string;

  @ApiProperty({ example: '123 St' })
  address?: string;

  @ApiProperty({ example: 6 })
  onboardingStep!: number;
}

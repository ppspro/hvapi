import { ApiProperty } from '@nestjs/swagger';

export class FullPatientProfileResponseDto {
  @ApiProperty({ example: 'profile-uuid-v4' })
  id!: string;

  @ApiProperty({ example: 'PT-1234567890', nullable: true })
  patientNumber?: string;

  @ApiProperty({ example: 'John', nullable: true })
  firstName?: string;

  @ApiProperty({ example: 'Doe', nullable: true })
  lastName?: string;

  @ApiProperty({ example: '1990-01-01', nullable: true })
  dateOfBirth?: string;

  @ApiProperty({ example: 'MALE', nullable: true })
  gender?: string;

  @ApiProperty({ example: 'O+', nullable: true })
  bloodGroup?: string;

  @ApiProperty({ example: 'Pakistani', nullable: true })
  nationality?: string;

  @ApiProperty({ example: 'Software Engineer', nullable: true })
  occupation?: string;

  @ApiProperty({ example: 'MARRIED', nullable: true })
  maritalStatus?: string;

  @ApiProperty({ example: ['English', 'Urdu'], type: [String] })
  languages!: string[];

  @ApiProperty({ description: 'Current address details', nullable: true })
  currentAddress?: {
    line1?: string;
    line2?: string;
    city?: string;
    state?: string;
    district?: string;
    postalCode?: string;
    country?: string;
  };

  @ApiProperty({ description: 'Permanent address details', nullable: true })
  permanentAddress?: {
    line1?: string;
    line2?: string;
    city?: string;
    state?: string;
    postalCode?: string;
    country?: string;
  };

  @ApiProperty({ example: 'https://cdn.hvapi.com/photos/profile.jpg', nullable: true })
  photoUrl?: string;

  @ApiProperty({ example: ['Penicillin'], type: [String] })
  knownAllergies!: string[];

  @ApiProperty({ example: ['Diabetes Type 2'], type: [String] })
  chronicConditions!: string[];

  @ApiProperty({ example: [], type: [String] })
  disabilities!: string[];

  @ApiProperty({ example: 'PHONE', nullable: true })
  prefContactMethod?: string;

  @ApiProperty({ example: true })
  emailNotifications!: boolean;

  @ApiProperty({ example: true })
  smsNotifications!: boolean;

  @ApiProperty({ example: true })
  pushNotifications!: boolean;

  @ApiProperty({ example: 'PRIVATE' })
  profileVisibility!: string;

  @ApiProperty({ example: 6 })
  onboardingStep!: number;

  @ApiProperty({ example: 'COMPLETED' })
  status!: string;

  @ApiProperty({ example: '2026-07-31T06:00:00.000Z' })
  createdAt!: string;

  @ApiProperty({ example: '2026-07-31T08:00:00.000Z' })
  updatedAt!: string;
}

import { IsNotEmpty, IsString, IsOptional, IsDateString, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export enum ConsentCategory {
  MEDICAL_RECORDS = 'MEDICAL_RECORDS',
  HEALTH_CARD = 'HEALTH_CARD',
  INSURANCE = 'INSURANCE',
  EMERGENCY_ACCESS = 'EMERGENCY_ACCESS',
  DOCTOR_ACCESS = 'DOCTOR_ACCESS',
  FACILITY_ACCESS = 'FACILITY_ACCESS',
}

export class CreateConsentDto {
  @ApiProperty({ example: 'member-uuid', description: 'Family member ID to grant consent to' })
  @IsNotEmpty()
  @IsString()
  familyMemberId!: string;

  @ApiProperty({ enum: ConsentCategory, example: 'MEDICAL_RECORDS', description: 'Category of consent being granted' })
  @IsNotEmpty()
  @IsEnum(ConsentCategory)
  category!: ConsentCategory;

  @ApiProperty({ example: '2027-12-31', description: 'Optional expiry date for consent', required: false })
  @IsOptional()
  @IsDateString()
  expiresAt?: string;

  @ApiProperty({ example: 'Temporary access for treatment', required: false })
  @IsOptional()
  @IsString()
  notes?: string;
}

export class UpdateConsentDto {
  @ApiProperty({ example: '2028-06-01', description: 'Update expiry date', required: false })
  @IsOptional()
  @IsDateString()
  expiresAt?: string;

  @ApiProperty({ example: 'Extended for ongoing treatment', required: false })
  @IsOptional()
  @IsString()
  notes?: string;
}

export class ConsentRecordResponseDto {
  @ApiProperty() id!: string;
  @ApiProperty() patientProfileId!: string;
  @ApiProperty() familyMemberId!: string;
  @ApiProperty() category!: string;
  @ApiProperty() isActive!: boolean;
  @ApiProperty() grantedAt!: string;
  @ApiProperty({ nullable: true }) revokedAt?: string;
  @ApiProperty({ nullable: true }) expiresAt?: string;
  @ApiProperty({ nullable: true }) notes?: string;
  @ApiProperty() createdAt!: string;
}

export class ConsentHistoryResponseDto {
  @ApiProperty() id!: string;
  @ApiProperty() consentRecordId!: string;
  @ApiProperty() action!: string;
  @ApiProperty({ nullable: true }) performedBy?: string;
  @ApiProperty({ nullable: true }) reason?: string;
  @ApiProperty() createdAt!: string;
}

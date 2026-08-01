import { IsNotEmpty, IsString, IsOptional, IsInt, IsBoolean, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateReferralDto {
  @ApiProperty({ example: 'patient-uuid-1' })
  @IsNotEmpty()
  @IsString()
  patientId!: string;

  @ApiProperty({ example: 'facility-uuid-2' })
  @IsNotEmpty()
  @IsString()
  receivingFacilityId!: string;

  @ApiProperty({ example: 'doctor-uuid-2', required: false })
  @IsOptional()
  @IsString()
  receivingDoctorId?: string;

  @ApiProperty({ example: 'medrec-uuid-1', required: false })
  @IsOptional()
  @IsString()
  medicalRecordId?: string;

  @ApiProperty({ example: 'SPECIALIST_CONSULTATION', enum: ['SPECIALIST_CONSULTATION', 'DIAGNOSTIC_IMAGING', 'LABORATORY_TEST', 'PHYSICAL_THERAPY', 'INPATIENT_TRANSFER', 'OUTPATIENT_CARE', 'SECOND_OPINION'], required: false })
  @IsOptional()
  @IsString()
  referralType?: string;

  @ApiProperty({ example: 'URGENT', enum: ['ROUTINE', 'URGENT', 'EMERGENCY', 'STAT'], required: false })
  @IsOptional()
  @IsString()
  priority?: string;

  @ApiProperty({ example: 'Patient presents with unresolved cardiology symptoms' })
  @IsNotEmpty()
  @IsString()
  reasonForReferral!: string;

  @ApiProperty({ example: 'High blood pressure, ECG abnormal', required: false })
  @IsOptional()
  @IsString()
  clinicalSummary?: string;

  @ApiProperty({ example: 'Cardiology', required: false })
  @IsOptional()
  @IsString()
  specialtyRequired?: string;
}

export class TriageReferralDto {
  @ApiProperty({ example: 'APPROVED', enum: ['APPROVED', 'MORE_INFO_REQUESTED', 'DECLINED', 'REDIRECTED'] })
  @IsNotEmpty()
  @IsString()
  outcome!: string;

  @ApiProperty({ example: 'doctor-uuid-2', required: false })
  @IsOptional()
  @IsString()
  receivingDoctorId?: string;

  @ApiProperty({ example: 'Accepted for cardiology evaluation', required: false })
  @IsOptional()
  @IsString()
  reason?: string;
}

export class UpdateReferralStatusDto {
  @ApiProperty({ example: 'IN_PROGRESS', enum: ['IN_PROGRESS', 'COMPLETED', 'CANCELLED'] })
  @IsNotEmpty()
  @IsString()
  status!: string;

  @ApiProperty({ example: 'Referral consultation completed', required: false })
  @IsOptional()
  @IsString()
  reason?: string;
}

export class AddReferralNoteDto {
  @ApiProperty({ example: 'Reviewed medical history prior to consultation' })
  @IsNotEmpty()
  @IsString()
  noteText!: string;

  @ApiProperty({ example: false, required: false })
  @IsOptional()
  @IsBoolean()
  isPrivate?: boolean;
}

export class AddReferralAttachmentDto {
  @ApiProperty({ example: 'attachment-uuid-1' })
  @IsNotEmpty()
  @IsString()
  attachmentId!: string;
}

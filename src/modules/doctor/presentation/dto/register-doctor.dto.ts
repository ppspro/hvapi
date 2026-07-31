import { IsNotEmpty, IsString, IsOptional, IsEnum, IsNumber, IsBoolean, IsArray, IsDateString, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export enum DoctorVerificationStatus {
  PENDING = 'PENDING',
  UNDER_REVIEW = 'UNDER_REVIEW',
  VERIFIED = 'VERIFIED',
  REJECTED = 'REJECTED',
  SUSPENDED = 'SUSPENDED',
  REVOKED = 'REVOKED',
}

export class RegisterDoctorDto {
  @ApiProperty({ example: 'Dr. Alexander Fleming, MD' })
  @IsNotEmpty()
  @IsString()
  fullName!: string;

  @ApiProperty({ example: 'MALE', required: false })
  @IsOptional()
  @IsString()
  gender?: string;

  @ApiProperty({ example: '1980-05-15', required: false })
  @IsOptional()
  @IsDateString()
  dateOfBirth?: string;

  @ApiProperty({ example: 'https://storage.healthvault360.com/doctors/photo-100.jpg', required: false })
  @IsOptional()
  @IsString()
  profilePhotoUrl?: string;

  @ApiProperty({ example: 'https://storage.healthvault360.com/doctors/sig-100.png', required: false })
  @IsOptional()
  @IsString()
  digitalSignatureUrl?: string;

  @ApiProperty({ example: 'Consultant Cardiologist with 15+ years experience in interventional cardiology.', required: false })
  @IsOptional()
  @IsString()
  biography?: string;

  @ApiProperty({ example: 'Expert in adult cardiology, echocardiography, and cardiac catheterization.', required: false })
  @IsOptional()
  @IsString()
  professionalSummary?: string;

  @ApiProperty({ example: 15, required: false })
  @IsOptional()
  @IsNumber()
  @Min(0)
  yearsOfExperience?: number;

  @ApiProperty({ example: 'Cardiology' })
  @IsNotEmpty()
  @IsString()
  primarySpecialization!: string;

  @ApiProperty({ example: ['Interventional Cardiology', 'Echocardiography'], type: [String], required: false })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  secondarySpecializations?: string[];

  @ApiProperty({ example: 'Pakistan Medical & Dental Council (PMDC)' })
  @IsNotEmpty()
  @IsString()
  medicalCouncil!: string;

  @ApiProperty({ example: 'PMC-REG-998877', description: 'Unique medical registration number' })
  @IsNotEmpty()
  @IsString()
  registrationNumber!: string;

  @ApiProperty({ example: 'LIC-2026-CARDIO-1', description: 'Unique medical license number' })
  @IsNotEmpty()
  @IsString()
  licenseNumber!: string;

  @ApiProperty({ example: 'Federal / Punjab', required: false })
  @IsOptional()
  @IsString()
  registrationState?: string;

  @ApiProperty({ example: 'Pakistan', required: false })
  @IsOptional()
  @IsString()
  registrationCountry?: string;

  @ApiProperty({ example: '2020-01-01', required: false })
  @IsOptional()
  @IsDateString()
  registrationIssueDate?: string;

  @ApiProperty({ example: '2027-12-31', required: false })
  @IsOptional()
  @IsDateString()
  registrationExpiryDate?: string;

  @ApiProperty({ example: 'Department of Cardiology', required: false })
  @IsOptional()
  @IsString()
  department?: string;

  @ApiProperty({ example: ['Coronary Angioplasty', 'Heart Failure Management'], type: [String], required: false })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  subSpecializations?: string[];

  @ApiProperty({ example: ['Valvular Heart Disease', 'Hypertension'], type: [String], required: false })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  clinicalInterests?: string[];

  @ApiProperty({ example: ['ECG', 'ECHO', 'Angiography Consultation'], type: [String], required: false })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  servicesOffered?: string[];

  @ApiProperty({ example: ['English', 'Urdu'], type: [String], required: false })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  languagesSpoken?: string[];

  @ApiProperty({ example: '+92-300-1234567', required: false })
  @IsOptional()
  @IsString()
  emergencyPhone?: string;
}

export class AddQualificationDto {
  @ApiProperty({ example: 'MBBS' })
  @IsNotEmpty()
  @IsString()
  degreeName!: string;

  @ApiProperty({ example: 'King Edward Medical University' })
  @IsNotEmpty()
  @IsString()
  instituteName!: string;

  @ApiProperty({ example: 2008 })
  @IsNotEmpty()
  @IsNumber()
  passingYear!: number;

  @ApiProperty({ example: 'General Medicine & Surgery', required: false })
  @IsOptional()
  @IsString()
  specialization?: string;
}

export class AddCertificationDto {
  @ApiProperty({ example: 'FCPS (Cardiology)' })
  @IsNotEmpty()
  @IsString()
  title!: string;

  @ApiProperty({ example: 'College of Physicians and Surgeons Pakistan' })
  @IsNotEmpty()
  @IsString()
  issuingAuthority!: string;

  @ApiProperty({ example: '2014-06-15', required: false })
  @IsOptional()
  @IsDateString()
  issueDate?: string;

  @ApiProperty({ example: '2029-06-15', required: false })
  @IsOptional()
  @IsDateString()
  expiryDate?: string;
}

export class AddExperienceDto {
  @ApiProperty({ example: 'Senior Registrar - Cardiology' })
  @IsNotEmpty()
  @IsString()
  designation!: string;

  @ApiProperty({ example: 'Mayo Hospital Lahore' })
  @IsNotEmpty()
  @IsString()
  hospitalName!: string;

  @ApiProperty({ example: '2015-01-01' })
  @IsNotEmpty()
  @IsDateString()
  startDate!: string;

  @ApiProperty({ example: '2020-12-31', required: false })
  @IsOptional()
  @IsDateString()
  endDate?: string;

  @ApiProperty({ example: false, required: false })
  @IsOptional()
  @IsBoolean()
  isCurrent?: boolean;
}

export class AttachDoctorDocumentDto {
  @ApiProperty({ example: 'MEDICAL_LICENSE', enum: ['MEDICAL_LICENSE', 'DEGREE_CERTIFICATE', 'GOVERNMENT_ID', 'BOARD_CERTIFICATE'] })
  @IsNotEmpty()
  @IsString()
  documentType!: string;

  @ApiProperty({ example: 'attachment-uuid-1', description: 'Reused MedicalAttachment ID' })
  @IsNotEmpty()
  @IsString()
  medicalAttachmentId!: string;
}

export class DoctorActionDto {
  @ApiProperty({ example: 'Verified credentials against council database / Administrative decision', required: false })
  @IsOptional()
  @IsString()
  reason?: string;
}

export class RenewLicenseDto {
  @ApiProperty({ example: '2029-12-31', description: 'New license expiry date' })
  @IsNotEmpty()
  @IsDateString()
  newExpiryDate!: string;

  @ApiProperty({ example: 'License renewed with state medical board', required: false })
  @IsOptional()
  @IsString()
  reason?: string;
}

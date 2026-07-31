import { IsNotEmpty, IsString, IsOptional, IsNumber, IsBoolean, IsArray, IsDateString, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterFacilityDto {
  @ApiProperty({ example: 'Shaukat Khanum Memorial Hospital' })
  @IsNotEmpty()
  @IsString()
  name!: string;

  @ApiProperty({ example: 'Shaukat Khanum Memorial Cancer Hospital & Research Centre', required: false })
  @IsOptional()
  @IsString()
  legalName?: string;

  @ApiProperty({ example: 'REG-HOSP-778899', description: 'Unique government health registration number' })
  @IsNotEmpty()
  @IsString()
  registrationNumber!: string;

  @ApiProperty({ example: 'HOSPITAL', enum: ['HOSPITAL', 'CLINIC', 'DIAGNOSTIC_CENTER', 'LABORATORY', 'PHARMACY', 'MEDICAL_COLLEGE', 'REHABILITATION_CENTER', 'SPECIALITY_CENTRE'], required: false })
  @IsOptional()
  @IsString()
  facilityType?: string;

  @ApiProperty({ example: 'PRIVATE', enum: ['GOVERNMENT', 'PRIVATE', 'TRUST', 'NGO'], required: false })
  @IsOptional()
  @IsString()
  ownershipType?: string;

  @ApiProperty({ example: 'Main Clinical Tower', required: false })
  @IsOptional()
  @IsString()
  buildingName?: string;

  @ApiProperty({ example: '7A Block R-3 Johar Town' })
  @IsNotEmpty()
  @IsString()
  streetAddress!: string;

  @ApiProperty({ example: 'Lahore' })
  @IsNotEmpty()
  @IsString()
  city!: string;

  @ApiProperty({ example: 'Lahore District', required: false })
  @IsOptional()
  @IsString()
  district?: string;

  @ApiProperty({ example: 'Punjab' })
  @IsNotEmpty()
  @IsString()
  state!: string;

  @ApiProperty({ example: 'Pakistan', required: false })
  @IsOptional()
  @IsString()
  country?: string;

  @ApiProperty({ example: '54000', required: false })
  @IsOptional()
  @IsString()
  pinCode?: string;

  @ApiProperty({ example: 31.472, required: false })
  @IsOptional()
  @IsNumber()
  latitude?: number;

  @ApiProperty({ example: 74.283, required: false })
  @IsOptional()
  @IsNumber()
  longitude?: number;

  @ApiProperty({ example: 'Asia/Karachi', required: false })
  @IsOptional()
  @IsString()
  timezone?: string;

  @ApiProperty({ example: '+92-42-35905000' })
  @IsNotEmpty()
  @IsString()
  phone!: string;

  @ApiProperty({ example: '+92-42-111155555', required: false })
  @IsOptional()
  @IsString()
  emergencyPhone?: string;

  @ApiProperty({ example: 'info@shaukatkhanum.org.pk', required: false })
  @IsOptional()
  @IsString()
  email?: string;

  @ApiProperty({ example: 'https://shaukatkhanum.org.pk', required: false })
  @IsOptional()
  @IsString()
  website?: string;

  @ApiProperty({ example: 'https://storage.healthvault360.com/facilities/logo-100.png', required: false })
  @IsOptional()
  @IsString()
  profilePhotoUrl?: string;
}

export class CreateDepartmentDto {
  @ApiProperty({ example: 'Department of Medical Oncology' })
  @IsNotEmpty()
  @IsString()
  name!: string;

  @ApiProperty({ example: 'ONCO-MED', required: false })
  @IsOptional()
  @IsString()
  code?: string;

  @ApiProperty({ example: 'Comprehensive medical oncology and chemotherapy care', required: false })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ example: 'Dr. Aasim Yusuf', required: false })
  @IsOptional()
  @IsString()
  departmentHead?: string;

  @ApiProperty({ example: '24/7 OPD & Inpatient Care', required: false })
  @IsOptional()
  @IsString()
  operatingHours?: string;
}

export class CreateRoomDto {
  @ApiProperty({ example: 'RM-304' })
  @IsNotEmpty()
  @IsString()
  roomNumber!: string;

  @ApiProperty({ example: 'department-uuid-1', required: false })
  @IsOptional()
  @IsString()
  departmentId?: string;

  @ApiProperty({ example: 'Chemotherapy Suite 4', required: false })
  @IsOptional()
  @IsString()
  roomName?: string;

  @ApiProperty({ example: 'Tower A', required: false })
  @IsOptional()
  @IsString()
  building?: string;

  @ApiProperty({ example: 'Block 2', required: false })
  @IsOptional()
  @IsString()
  block?: string;

  @ApiProperty({ example: '3rd Floor', required: false })
  @IsOptional()
  @IsString()
  floor?: string;

  @ApiProperty({ example: 'East Wing', required: false })
  @IsOptional()
  @IsString()
  wing?: string;

  @ApiProperty({ example: 'ICU', enum: ['GENERAL_WARD', 'SEMI_PRIVATE', 'PRIVATE_SUITE', 'ICU', 'OT', 'EMERGENCY', 'CONSULTATION_ROOM', 'LAB_ROOM', 'RADIOLOGY_ROOM'], required: false })
  @IsOptional()
  @IsString()
  roomCategory?: string;

  @ApiProperty({ example: 4, required: false })
  @IsOptional()
  @IsNumber()
  @Min(1)
  capacity?: number;
}

export class AddFacilityLicenseDto {
  @ApiProperty({ example: 'GOVERNMENT_REGISTRATION', enum: ['GOVERNMENT_REGISTRATION', 'DRUG_LICENSE', 'FIRE_SAFETY', 'BIO_MEDICAL_WASTE', 'RADIATION_SAFETY'] })
  @IsNotEmpty()
  @IsString()
  licenseType!: string;

  @ApiProperty({ example: 'PHC-LIC-2026-99' })
  @IsNotEmpty()
  @IsString()
  licenseNumber!: string;

  @ApiProperty({ example: 'Punjab Healthcare Commission' })
  @IsNotEmpty()
  @IsString()
  issuingAuthority!: string;

  @ApiProperty({ example: '2024-01-01', required: false })
  @IsOptional()
  @IsDateString()
  issueDate?: string;

  @ApiProperty({ example: '2028-12-31', required: false })
  @IsOptional()
  @IsDateString()
  expiryDate?: string;
}

export class AddFacilityAccreditationDto {
  @ApiProperty({ example: 'JCI', enum: ['NABH', 'NABL', 'JCI', 'ISO', 'OTHER'] })
  @IsNotEmpty()
  @IsString()
  accreditationBody!: string;

  @ApiProperty({ example: 'JCI-GOLD-2025-001' })
  @IsNotEmpty()
  @IsString()
  certificateNumber!: string;

  @ApiProperty({ example: '2025-01-01', required: false })
  @IsOptional()
  @IsDateString()
  validFrom?: string;

  @ApiProperty({ example: '2028-01-01', required: false })
  @IsOptional()
  @IsDateString()
  validTo?: string;
}

export class AttachFacilityDocumentDto {
  @ApiProperty({ example: 'REGISTRATION_LICENSE', enum: ['REGISTRATION_LICENSE', 'ACCREDITATION_CERTIFICATE', 'TAX_DOCUMENT', 'OWNERSHIP_PROOF', 'INSPECTION_REPORT'] })
  @IsNotEmpty()
  @IsString()
  documentType!: string;

  @ApiProperty({ example: 'attachment-uuid-1', description: 'Reused MedicalAttachment ID' })
  @IsNotEmpty()
  @IsString()
  medicalAttachmentId!: string;
}

export class AssignDoctorToFacilityDto {
  @ApiProperty({ example: 'doctor-profile-uuid-1' })
  @IsNotEmpty()
  @IsString()
  doctorId!: string;

  @ApiProperty({ example: 'department-uuid-1', required: false })
  @IsOptional()
  @IsString()
  departmentId?: string;

  @ApiProperty({ example: 'PRIMARY', enum: ['PRIMARY', 'SECONDARY', 'VISITING', 'RESIDENT'], required: false })
  @IsOptional()
  @IsString()
  assignmentType?: string;

  @ApiProperty({ example: ['OPD_CONSULTATION', 'INPATIENT_ADMISSION', 'SURGERY'], type: [String], required: false })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  privileges?: string[];
}

export class FacilityActionDto {
  @ApiProperty({ example: 'Verified Healthcare Commission license / Administrative review', required: false })
  @IsOptional()
  @IsString()
  reason?: string;
}

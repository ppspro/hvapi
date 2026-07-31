import { IsNotEmpty, IsString, IsOptional, IsNumber, IsBoolean, IsArray, IsDateString, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterStaffDto {
  @ApiProperty({ example: 'Sister Mary Joseph' })
  @IsNotEmpty()
  @IsString()
  fullName!: string;

  @ApiProperty({ example: 'FEMALE', required: false })
  @IsOptional()
  @IsString()
  gender?: string;

  @ApiProperty({ example: '1990-08-20', required: false })
  @IsOptional()
  @IsDateString()
  dateOfBirth?: string;

  @ApiProperty({ example: '+92-300-9876543' })
  @IsNotEmpty()
  @IsString()
  phone!: string;

  @ApiProperty({ example: 'mary.joseph@shaukatkhanum.org.pk', required: false })
  @IsOptional()
  @IsString()
  email?: string;

  @ApiProperty({ example: '+92-300-1122334', required: false })
  @IsOptional()
  @IsString()
  emergencyContact?: string;

  @ApiProperty({ example: 'https://storage.healthvault360.com/staff/photo-300.jpg', required: false })
  @IsOptional()
  @IsString()
  profilePhotoUrl?: string;

  @ApiProperty({ example: 'NURSE', enum: ['NURSE', 'RECEPTIONIST', 'PHARMACIST', 'LAB_TECHNICIAN', 'RADIOLOGY_TECHNICIAN', 'OT_STAFF', 'ICU_STAFF', 'EMERGENCY_STAFF', 'BILLING_EXECUTIVE', 'ADMINISTRATOR', 'FRONT_OFFICE', 'SUPPORT_STAFF', 'CUSTOM'] })
  @IsNotEmpty()
  @IsString()
  staffType!: string;

  @ApiProperty({ example: 'Head ICU Staff Nurse' })
  @IsNotEmpty()
  @IsString()
  designation!: string;

  @ApiProperty({ example: 'facility-uuid-1', description: 'Primary hospital/clinic ID' })
  @IsNotEmpty()
  @IsString()
  primaryFacilityId!: string;

  @ApiProperty({ example: 'facility-uuid-2', required: false })
  @IsOptional()
  @IsString()
  secondaryFacilityId?: string;

  @ApiProperty({ example: 'department-uuid-icu', required: false })
  @IsOptional()
  @IsString()
  primaryDepartmentId?: string;

  @ApiProperty({ example: 'department-uuid-er', required: false })
  @IsOptional()
  @IsString()
  secondaryDepartmentId?: string;

  @ApiProperty({ example: 'reporting-manager-uuid-1', required: false })
  @IsOptional()
  @IsString()
  reportingManagerId?: string;

  @ApiProperty({ example: 'PERMANENT', enum: ['PERMANENT', 'CONTRACT', 'TEMPORARY', 'PART_TIME', 'INTERN', 'VOLUNTEER'], required: false })
  @IsOptional()
  @IsString()
  employmentType?: string;

  @ApiProperty({ example: 'ACTIVE', enum: ['ACTIVE', 'INACTIVE', 'TERMINATED', 'RESIGNED', 'RETIRED', 'TRANSFERRED'], required: false })
  @IsOptional()
  @IsString()
  employmentStatus?: string;

  @ApiProperty({ example: '2021-06-01', required: false })
  @IsOptional()
  @IsDateString()
  joiningDate?: string;

  @ApiProperty({ example: 30, required: false })
  @IsOptional()
  @IsNumber()
  @Min(0)
  noticePeriodDays?: number;

  @ApiProperty({ example: 'Certified Critical Care Nurse with 8 years ICU experience.', required: false })
  @IsOptional()
  @IsString()
  biography?: string;

  @ApiProperty({ example: ['English', 'Urdu'], type: [String], required: false })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  languagesSpoken?: string[];

  @ApiProperty({ example: 'STF-NURSE-0099', required: false, description: 'Optional custom employee code; auto-generated if omitted' })
  @IsOptional()
  @IsString()
  employeeCode?: string;
}

export class AddStaffQualificationDto {
  @ApiProperty({ example: 'B.Sc. Nursing' })
  @IsNotEmpty()
  @IsString()
  degreeName!: string;

  @ApiProperty({ example: 'University of Health Sciences Lahore' })
  @IsNotEmpty()
  @IsString()
  instituteName!: string;

  @ApiProperty({ example: 2016 })
  @IsNotEmpty()
  @IsNumber()
  passingYear!: number;

  @ApiProperty({ example: 'Critical Care Nursing', required: false })
  @IsOptional()
  @IsString()
  fieldOfStudy?: string;
}

export class AttachStaffDocumentDto {
  @ApiProperty({ example: 'GOVERNMENT_ID', enum: ['GOVERNMENT_ID', 'EMPLOYMENT_CONTRACT', 'QUALIFICATION_CERTIFICATE', 'PROFESSIONAL_CERTIFICATION', 'JOINING_LETTER', 'EXPERIENCE_LETTER', 'BACKGROUND_VERIFICATION'] })
  @IsNotEmpty()
  @IsString()
  documentType!: string;

  @ApiProperty({ example: 'attachment-uuid-1', description: 'Reused MedicalAttachment ID' })
  @IsNotEmpty()
  @IsString()
  medicalAttachmentId!: string;
}

export class AssignStaffFacilityDto {
  @ApiProperty({ example: 'facility-uuid-1' })
  @IsNotEmpty()
  @IsString()
  primaryFacilityId!: string;

  @ApiProperty({ example: 'facility-uuid-2', required: false })
  @IsOptional()
  @IsString()
  secondaryFacilityId?: string;
}

export class AssignStaffDepartmentDto {
  @ApiProperty({ example: 'department-uuid-1', required: false })
  @IsOptional()
  @IsString()
  primaryDepartmentId?: string;

  @ApiProperty({ example: 'department-uuid-2', required: false })
  @IsOptional()
  @IsString()
  secondaryDepartmentId?: string;
}

export class StaffActionDto {
  @ApiProperty({ example: 'Verified credentials with Pakistan Nursing Council / HR decision', required: false })
  @IsOptional()
  @IsString()
  reason?: string;
}

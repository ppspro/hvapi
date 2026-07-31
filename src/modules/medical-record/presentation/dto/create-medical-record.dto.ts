import {
  IsNotEmpty, IsString, IsOptional, IsEnum, IsNumber, IsArray, ValidateNested, IsDateString, Min, Max,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export enum MedicalRecordStatus {
  DRAFT = 'DRAFT',
  FINAL = 'FINAL',
  ARCHIVED = 'ARCHIVED',
}

export enum AttachmentCategory {
  IMAGE = 'IMAGE',
  PDF = 'PDF',
  DICOM = 'DICOM',
  SCANNED_DOC = 'SCANNED_DOC',
  PRESCRIPTION = 'PRESCRIPTION',
  REFERRAL_LETTER = 'REFERRAL_LETTER',
  LAB_RESULT = 'LAB_RESULT',
  RADIOLOGY = 'RADIOLOGY',
  CLINICAL_NOTE = 'CLINICAL_NOTE',
  OTHER = 'OTHER',
}

export class EncounterDto {
  @ApiProperty({ example: 'Dr. Sarah Connor', required: false })
  @IsOptional()
  @IsString()
  providerName?: string;

  @ApiProperty({ example: 'City General Hospital', required: false })
  @IsOptional()
  @IsString()
  facilityName?: string;

  @ApiProperty({ example: 'CONSULTATION', required: false })
  @IsOptional()
  @IsString()
  encounterType?: string;

  @ApiProperty({ example: '2026-07-31T10:00:00Z', required: false })
  @IsOptional()
  @IsDateString()
  encounterDate?: string;
}

export class ClinicalDiagnosisDto {
  @ApiProperty({ example: 'E11.9', required: false, description: 'ICD-10 Code' })
  @IsOptional()
  @IsString()
  code?: string;

  @ApiProperty({ example: 'Type 2 Diabetes Mellitus without complications' })
  @IsNotEmpty()
  @IsString()
  description!: string;

  @ApiProperty({ example: 'PRIMARY', enum: ['PRIMARY', 'SECONDARY', 'DIFFERENTIAL'], required: false })
  @IsOptional()
  @IsString()
  type?: string;

  @ApiProperty({ example: 'ACTIVE', enum: ['ACTIVE', 'RESOLVED'], required: false })
  @IsOptional()
  @IsString()
  status?: string;
}

export class VitalSignsDto {
  @ApiProperty({ example: 175.5, required: false, description: 'Height in cm' })
  @IsOptional()
  @IsNumber()
  @Min(30)
  @Max(300)
  heightCm?: number;

  @ApiProperty({ example: 70.0, required: false, description: 'Weight in kg' })
  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(500)
  weightKg?: number;

  @ApiProperty({ example: 120, required: false })
  @IsOptional()
  @IsNumber()
  systolicBp?: number;

  @ApiProperty({ example: 80, required: false })
  @IsOptional()
  @IsNumber()
  diastolicBp?: number;

  @ApiProperty({ example: 72, required: false })
  @IsOptional()
  @IsNumber()
  pulseBpm?: number;

  @ApiProperty({ example: 16, required: false })
  @IsOptional()
  @IsNumber()
  respirationRate?: number;

  @ApiProperty({ example: 36.6, required: false })
  @IsOptional()
  @IsNumber()
  temperatureC?: number;

  @ApiProperty({ example: 95.0, required: false })
  @IsOptional()
  @IsNumber()
  bloodSugarMgDl?: number;

  @ApiProperty({ example: 98.0, required: false })
  @IsOptional()
  @IsNumber()
  oxygenSaturation?: number;
}

export class ProcedureDto {
  @ApiProperty({ example: 'Routine Blood Panel' })
  @IsNotEmpty()
  @IsString()
  name!: string;

  @ApiProperty({ example: 'CPT-80053', required: false })
  @IsOptional()
  @IsString()
  code?: string;

  @ApiProperty({ example: '2026-07-31', required: false })
  @IsOptional()
  @IsDateString()
  performedAt?: string;

  @ApiProperty({ example: 'Patient fasted for 12 hours prior', required: false })
  @IsOptional()
  @IsString()
  notes?: string;
}

export class CreateMedicalRecordDto {
  @ApiProperty({ example: 'Annual Routine Health Checkup' })
  @IsNotEmpty()
  @IsString()
  title!: string;

  @ApiProperty({ example: 'Mild fatigue and occasional headache', required: false })
  @IsOptional()
  @IsString()
  chiefComplaint?: string;

  @ApiProperty({ example: 'Patient appears well nourished. No acute distress.', required: false })
  @IsOptional()
  @IsString()
  clinicalNotes?: string;

  @ApiProperty({ example: 'Increase fluid intake, maintain low glycemic diet', required: false })
  @IsOptional()
  @IsString()
  treatmentPlan?: string;

  @ApiProperty({ example: 'Follow up in 4 weeks for repeat blood panel', required: false })
  @IsOptional()
  @IsString()
  followUpInstructions?: string;

  @ApiProperty({ enum: MedicalRecordStatus, example: 'FINAL', required: false })
  @IsOptional()
  @IsEnum(MedicalRecordStatus)
  status?: MedicalRecordStatus;

  @ApiProperty({ type: EncounterDto, required: false })
  @IsOptional()
  @ValidateNested()
  @Type(() => EncounterDto)
  encounter?: EncounterDto;

  @ApiProperty({ type: [ClinicalDiagnosisDto], required: false })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ClinicalDiagnosisDto)
  diagnoses?: ClinicalDiagnosisDto[];

  @ApiProperty({ type: VitalSignsDto, required: false })
  @IsOptional()
  @ValidateNested()
  @Type(() => VitalSignsDto)
  vitalSigns?: VitalSignsDto;

  @ApiProperty({ type: [ProcedureDto], required: false })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProcedureDto)
  procedures?: ProcedureDto[];
}

export class UpdateMedicalRecordDto {
  @ApiProperty({ example: 'Updated Health Checkup Record', required: false })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  chiefComplaint?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  clinicalNotes?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  treatmentPlan?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  followUpInstructions?: string;

  @ApiProperty({ enum: MedicalRecordStatus, required: false })
  @IsOptional()
  @IsEnum(MedicalRecordStatus)
  status?: MedicalRecordStatus;
}

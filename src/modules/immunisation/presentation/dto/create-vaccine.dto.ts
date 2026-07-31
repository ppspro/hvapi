import { IsNotEmpty, IsString, IsOptional, IsEnum, IsNumber, IsBoolean, IsArray, IsDateString, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export enum VaccineTargetGroup {
  ALL = 'ALL',
  INFANT = 'INFANT',
  CHILD = 'CHILD',
  ADOLESCENT = 'ADOLESCENT',
  ADULT = 'ADULT',
  ELDERLY = 'ELDERLY',
  PREGNANT = 'PREGNANT',
  HIGH_RISK = 'HIGH_RISK',
}

export enum VaccinationStatus {
  SCHEDULED = 'SCHEDULED',
  DUE = 'DUE',
  ADMINISTERED = 'ADMINISTERED',
  COMPLETED = 'COMPLETED',
  MISSED = 'MISSED',
  DEFERRED = 'DEFERRED',
  CANCELLED = 'CANCELLED',
  ARCHIVED = 'ARCHIVED',
}

export class CreateVaccineDto {
  @ApiProperty({ example: 'COVID-19 mRNA Vaccine' })
  @IsNotEmpty()
  @IsString()
  name!: string;

  @ApiProperty({ example: 'COVID19-MRNA', description: 'Unique vaccine code' })
  @IsNotEmpty()
  @IsString()
  code!: string;

  @ApiProperty({ example: 'Pfizer-BioNTech', required: false })
  @IsOptional()
  @IsString()
  manufacturer?: string;

  @ApiProperty({ enum: VaccineTargetGroup, example: 'ALL', required: false })
  @IsOptional()
  @IsEnum(VaccineTargetGroup)
  targetGroup?: VaccineTargetGroup;

  @ApiProperty({ example: 6, description: 'Minimum age in months', required: false })
  @IsOptional()
  @IsNumber()
  @Min(0)
  minAgeMonths?: number;

  @ApiProperty({ example: 1200, description: 'Maximum age in months', required: false })
  @IsOptional()
  @IsNumber()
  maxAgeMonths?: number;

  @ApiProperty({ example: 2, description: 'Total doses required in standard series', required: false })
  @IsOptional()
  @IsNumber()
  @Min(1)
  totalDosesRequired?: number;

  @ApiProperty({ example: 21, description: 'Minimum interval days between doses', required: false })
  @IsOptional()
  @IsNumber()
  minIntervalDays?: number;

  @ApiProperty({ example: 'mRNA vaccine against SARS-CoV-2 Spike protein', required: false })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ example: ['Anaphylaxis to PEG', 'Severe allergic reaction to prior dose'], type: [String], required: false })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  contraindications?: string[];
}

export class CreateVaccinationScheduleDto {
  @ApiProperty({ example: 'vaccine-uuid-1' })
  @IsNotEmpty()
  @IsString()
  vaccineId!: string;

  @ApiProperty({ example: 'Primary Dose 1 Schedule' })
  @IsNotEmpty()
  @IsString()
  name!: string;

  @ApiProperty({ example: 1 })
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  doseNumber!: number;

  @ApiProperty({ example: 6, description: 'Recommended age in months' })
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  recommendedAgeMonths!: number;

  @ApiProperty({ example: false, required: false })
  @IsOptional()
  @IsBoolean()
  isBooster?: boolean;

  @ApiProperty({ example: 180, description: 'Booster interval days after primary series', required: false })
  @IsOptional()
  @IsNumber()
  boosterIntervalDays?: number;
}

export class CreateVaccinationRecordDto {
  @ApiProperty({ example: 'vaccine-uuid-1' })
  @IsNotEmpty()
  @IsString()
  vaccineId!: string;

  @ApiProperty({ example: 'schedule-uuid-1', required: false })
  @IsOptional()
  @IsString()
  scheduleId?: string;

  @ApiProperty({ example: 1, required: false })
  @IsOptional()
  @IsNumber()
  doseNumber?: number;

  @ApiProperty({ example: '2026-08-15', required: false })
  @IsOptional()
  @IsDateString()
  dueDate?: string;

  @ApiProperty({ example: 'Standard dose schedule notes', required: false })
  @IsOptional()
  @IsString()
  notes?: string;
}

export class AdministerDoseDto {
  @ApiProperty({ example: 'Dr. Sarah Connor, RN' })
  @IsNotEmpty()
  @IsString()
  administeredBy!: string;

  @ApiProperty({ example: 'City Central Immunisation Clinic' })
  @IsNotEmpty()
  @IsString()
  facilityName!: string;

  @ApiProperty({ example: 'BATCH-2026-X99' })
  @IsNotEmpty()
  @IsString()
  batchNumber!: string;

  @ApiProperty({ example: 'LOT-778899', required: false })
  @IsOptional()
  @IsString()
  lotNumber?: string;

  @ApiProperty({ example: '2027-12-31', required: false })
  @IsOptional()
  @IsDateString()
  expirationDate?: string;

  @ApiProperty({ example: 'Left Deltoid', required: false })
  @IsOptional()
  @IsString()
  siteOfInjection?: string;

  @ApiProperty({ example: 'Intramuscular (IM)', required: false })
  @IsOptional()
  @IsString()
  routeOfAdmin?: string;

  @ApiProperty({ example: 'Patient tolerated dose well. No immediate reaction.', required: false })
  @IsOptional()
  @IsString()
  notes?: string;
}

export class DeferDoseDto {
  @ApiProperty({ example: 'Acute febrile illness / high fever', description: 'Clinical reason for deferring dose' })
  @IsNotEmpty()
  @IsString()
  reason!: string;

  @ApiProperty({ example: '2026-09-01', description: 'Rescheduled due date', required: false })
  @IsOptional()
  @IsDateString()
  rescheduledDueDate?: string;
}

export class CreateCertificateDto {
  @ApiProperty({ example: 'record-uuid-1', description: 'Vaccination record ID' })
  @IsNotEmpty()
  @IsString()
  recordId!: string;

  @ApiProperty({ example: 'report-attachment-uuid-1', required: false, description: 'Optional link to PDF report attachment' })
  @IsOptional()
  @IsString()
  reportAttachmentId?: string;
}

export class ReminderConfigDto {
  @ApiProperty({ example: 'vaccine-uuid-1' })
  @IsNotEmpty()
  @IsString()
  vaccineId!: string;

  @ApiProperty({ example: 7, description: 'Days before due date to trigger reminder' })
  @IsNotEmpty()
  @IsNumber()
  reminderDaysBefore!: number;

  @ApiProperty({ example: true, required: false })
  @IsOptional()
  @IsBoolean()
  enableEmail?: boolean;

  @ApiProperty({ example: false, required: false })
  @IsOptional()
  @IsBoolean()
  enableSms?: boolean;

  @ApiProperty({ example: true, required: false })
  @IsOptional()
  @IsBoolean()
  enablePush?: boolean;
}

export class RecordActionDto {
  @ApiProperty({ example: 'Administrative action', required: false })
  @IsOptional()
  @IsString()
  reason?: string;
}

import { ApiProperty } from '@nestjs/swagger';

export class VaccineResponseDto {
  @ApiProperty() id!: string;
  @ApiProperty() name!: string;
  @ApiProperty() code!: string;
  @ApiProperty({ nullable: true }) manufacturer?: string;
  @ApiProperty() targetGroup!: string;
  @ApiProperty() minAgeMonths!: number;
  @ApiProperty({ nullable: true }) maxAgeMonths?: number;
  @ApiProperty() totalDosesRequired!: number;
  @ApiProperty() minIntervalDays!: number;
  @ApiProperty({ nullable: true }) description?: string;
  @ApiProperty({ type: [String] }) contraindications!: string[];
  @ApiProperty() isActive!: boolean;
  @ApiProperty() createdAt!: string;
}

export class VaccinationScheduleResponseDto {
  @ApiProperty() id!: string;
  @ApiProperty() vaccineId!: string;
  @ApiProperty() name!: string;
  @ApiProperty() doseNumber!: number;
  @ApiProperty() recommendedAgeMonths!: number;
  @ApiProperty() isBooster!: boolean;
  @ApiProperty({ nullable: true }) boosterIntervalDays?: number;
  @ApiProperty() createdAt!: string;
}

export class VaccinationRecordResponseDto {
  @ApiProperty() id!: string;
  @ApiProperty() patientProfileId!: string;
  @ApiProperty() vaccineId!: string;
  @ApiProperty({ nullable: true }) scheduleId?: string;
  @ApiProperty() doseNumber!: number;
  @ApiProperty() status!: string;
  @ApiProperty({ nullable: true }) dueDate?: string;
  @ApiProperty({ nullable: true }) administeredDate?: string;
  @ApiProperty({ nullable: true }) administeredBy?: string;
  @ApiProperty({ nullable: true }) facilityName?: string;
  @ApiProperty({ nullable: true }) batchNumber?: string;
  @ApiProperty({ nullable: true }) lotNumber?: string;
  @ApiProperty({ nullable: true }) expirationDate?: string;
  @ApiProperty({ nullable: true }) siteOfInjection?: string;
  @ApiProperty({ nullable: true }) routeOfAdmin?: string;
  @ApiProperty({ nullable: true }) notes?: string;
  @ApiProperty() isDeleted!: boolean;
  @ApiProperty({ type: VaccineResponseDto, required: false }) vaccine?: VaccineResponseDto;
  @ApiProperty({ type: VaccinationScheduleResponseDto, required: false }) schedule?: VaccinationScheduleResponseDto;
  @ApiProperty() createdAt!: string;
  @ApiProperty() updatedAt!: string;
}

export class VaccinationCertificateResponseDto {
  @ApiProperty() id!: string;
  @ApiProperty() patientProfileId!: string;
  @ApiProperty() recordId!: string;
  @ApiProperty() certificateNumber!: string;
  @ApiProperty() issueDate!: string;
  @ApiProperty() verificationStatus!: string;
  @ApiProperty({ nullable: true }) qrToken?: string;
  @ApiProperty({ nullable: true }) reportAttachmentId?: string;
  @ApiProperty() version!: number;
  @ApiProperty() createdAt!: string;
}

export class ReminderConfigResponseDto {
  @ApiProperty() id!: string;
  @ApiProperty() patientProfileId!: string;
  @ApiProperty() vaccineId!: string;
  @ApiProperty() reminderDaysBefore!: number;
  @ApiProperty() enableEmail!: boolean;
  @ApiProperty() enableSms!: boolean;
  @ApiProperty() enablePush!: boolean;
  @ApiProperty() createdAt!: string;
}

export class ImmunisationStatsResponseDto {
  @ApiProperty() totalVaccines!: number;
  @ApiProperty() totalRecords!: number;
  @ApiProperty() administeredDoses!: number;
  @ApiProperty() totalCertificates!: number;
}

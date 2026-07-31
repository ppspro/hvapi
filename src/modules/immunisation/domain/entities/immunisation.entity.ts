export class VaccineEntity {
  id!: string;
  name!: string;
  code!: string;
  manufacturer?: string | null;
  targetGroup!: string;
  minAgeMonths!: number;
  maxAgeMonths?: number | null;
  totalDosesRequired!: number;
  minIntervalDays!: number;
  description?: string | null;
  contraindications!: string[];
  isActive!: boolean;
  createdAt!: Date;
  updatedAt!: Date;
}

export class VaccinationScheduleEntity {
  id!: string;
  vaccineId!: string;
  name!: string;
  doseNumber!: number;
  recommendedAgeMonths!: number;
  isBooster!: boolean;
  boosterIntervalDays?: number | null;
  createdAt!: Date;
  updatedAt!: Date;
}

export class VaccinationRecordEntity {
  id!: string;
  patientProfileId!: string;
  vaccineId!: string;
  scheduleId?: string | null;
  doseNumber!: number;
  status!: string;
  dueDate?: Date | null;
  administeredDate?: Date | null;
  administeredBy?: string | null;
  facilityName?: string | null;
  batchNumber?: string | null;
  lotNumber?: string | null;
  expirationDate?: Date | null;
  siteOfInjection?: string | null;
  routeOfAdmin?: string | null;
  notes?: string | null;
  isDeleted!: boolean;
  deletedAt?: Date | null;
  createdAt!: Date;
  updatedAt!: Date;
  vaccine?: VaccineEntity;
  schedule?: VaccinationScheduleEntity;
}

export class VaccinationCertificateEntity {
  id!: string;
  patientProfileId!: string;
  recordId!: string;
  certificateNumber!: string;
  issueDate!: Date;
  verificationStatus!: string;
  qrToken?: string | null;
  reportAttachmentId?: string | null;
  version!: number;
  createdAt!: Date;
}

export class VaccinationReminderConfigEntity {
  id!: string;
  patientProfileId!: string;
  vaccineId!: string;
  reminderDaysBefore!: number;
  enableEmail!: boolean;
  enableSms!: boolean;
  enablePush!: boolean;
  createdAt!: Date;
}

export class VaccinationHistoryEntity {
  id!: string;
  recordId!: string;
  action!: string;
  previousStatus?: string | null;
  newStatus!: string;
  reason?: string | null;
  performedBy?: string | null;
  createdAt!: Date;
}

export class VaccinationAuditLogEntity {
  id!: string;
  recordId!: string;
  action!: string;
  performedBy?: string | null;
  details?: string | null;
  ipAddress?: string | null;
  createdAt!: Date;
}

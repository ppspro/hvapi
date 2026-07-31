export class MedicalRecordEntity {
  id!: string;
  patientProfileId!: string;
  title!: string;
  chiefComplaint?: string | null;
  clinicalNotes?: string | null;
  treatmentPlan?: string | null;
  followUpInstructions?: string | null;
  status!: string;
  isDeleted!: boolean;
  deletedAt?: Date | null;
  createdById?: string | null;
  createdAt!: Date;
  updatedAt!: Date;
  encounters?: MedicalEncounterEntity[];
  diagnoses?: ClinicalDiagnosisEntity[];
  vitalSigns?: VitalSignsEntity[];
  procedures?: MedicalProcedureEntity[];
  attachments?: MedicalAttachmentEntity[];
}

export class MedicalEncounterEntity {
  id!: string;
  medicalRecordId!: string;
  encounterDate!: Date;
  providerName?: string | null;
  facilityName?: string | null;
  encounterType!: string;
  createdAt!: Date;
  updatedAt!: Date;
}

export class ClinicalDiagnosisEntity {
  id!: string;
  medicalRecordId!: string;
  code?: string | null;
  description!: string;
  type!: string;
  status!: string;
  createdAt!: Date;
}

export class VitalSignsEntity {
  id!: string;
  medicalRecordId!: string;
  heightCm?: number | null;
  weightKg?: number | null;
  bmi?: number | null;
  systolicBp?: number | null;
  diastolicBp?: number | null;
  pulseBpm?: number | null;
  respirationRate?: number | null;
  temperatureC?: number | null;
  bloodSugarMgDl?: number | null;
  oxygenSaturation?: number | null;
  recordedAt!: Date;
}

export class MedicalProcedureEntity {
  id!: string;
  medicalRecordId!: string;
  name!: string;
  code?: string | null;
  performedAt?: Date | null;
  notes?: string | null;
  createdAt!: Date;
}

export class MedicalAttachmentEntity {
  id!: string;
  medicalRecordId?: string | null;
  patientProfileId!: string;
  fileName!: string;
  originalName!: string;
  fileSize!: number;
  mimeType!: string;
  category!: string;
  storageKey!: string;
  storageUrl!: string;
  checksum?: string | null;
  version!: number;
  isDeleted!: boolean;
  deletedAt?: Date | null;
  virusScanStatus!: string;
  createdAt!: Date;
  updatedAt!: Date;
}

export class AttachmentVersionEntity {
  id!: string;
  attachmentId!: string;
  version!: number;
  storageKey!: string;
  storageUrl!: string;
  fileSize!: number;
  createdById?: string | null;
  createdAt!: Date;
}

export class MedicalRecordAuditLogEntity {
  id!: string;
  medicalRecordId?: string | null;
  attachmentId?: string | null;
  action!: string;
  performedBy?: string | null;
  details?: string | null;
  ipAddress?: string | null;
  createdAt!: Date;
}

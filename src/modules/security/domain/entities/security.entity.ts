export class SecurityConsentRecordEntity {
  id!: string;
  patientId!: string;
  consentType!: string;
  status!: string;
  purpose!: string;
  grantedAt?: Date | null;
  expiresAt?: Date | null;
  withdrawnAt?: Date | null;
  capturedBy?: string | null;
  evidenceReference?: string | null;
  isDeleted!: boolean;
  deletedAt?: Date | null;
  createdAt!: Date;
  updatedAt!: Date;
}

export class EncryptionKeyEntity {
  id!: string;
  keyIdentifier!: string;
  algorithm!: string;
  version!: number;
  status!: string;
  activatedAt?: Date | null;
  expiresAt?: Date | null;
  rotationDate?: Date | null;
  createdAt!: Date;
  updatedAt!: Date;
}

export class RetentionPolicyEntity {
  id!: string;
  name!: string;
  resourceType!: string;
  retentionPeriodDays!: number;
  action!: string;
  isActive!: boolean;
  isDeleted!: boolean;
  deletedAt?: Date | null;
  createdAt!: Date;
  updatedAt!: Date;
}

export class SecurityIncidentEntity {
  id!: string;
  title!: string;
  description!: string;
  severity!: string;
  status!: string;
  reportedBy?: string | null;
  resolvedBy?: string | null;
  resolvedAt?: Date | null;
  isDeleted!: boolean;
  deletedAt?: Date | null;
  createdAt!: Date;
  updatedAt!: Date;
}

export class SecurityPlatformAuditLogEntity {
  id!: string;
  userId?: string | null;
  action!: string;
  resource!: string;
  resourceId?: string | null;
  ipAddress?: string | null;
  userAgent?: string | null;
  result!: string;
  details?: string | null;
  createdAt!: Date;
}

export class ComplianceReportEntity {
  id!: string;
  reportName!: string;
  reportType!: string;
  generatedBy?: string | null;
  generatedAt!: Date;
  summary?: string | null;
  metadata?: string | null;
  createdAt!: Date;
}

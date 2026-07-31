export class QrCodeEntity {
  id!: string;
  entityId!: string;
  entityType!: string;
  ownerId!: string;
  token!: string;
  signature!: string;
  status!: string;
  version!: number;
  nonce!: string;
  checksum?: string | null;
  issuedAt!: Date;
  expiresAt!: Date;
  rotatedAt?: Date | null;
  revokedAt?: Date | null;
  revocationReason?: string | null;
  isDeleted!: boolean;
  deletedAt?: Date | null;
  createdAt!: Date;
  updatedAt!: Date;
}

export class QrHistoryEntity {
  id!: string;
  qrCodeId!: string;
  action!: string;
  previousToken?: string | null;
  newToken?: string | null;
  previousStatus?: string | null;
  newStatus!: string;
  reason?: string | null;
  performedBy?: string | null;
  createdAt!: Date;
}

export class QrScanLogEntity {
  id!: string;
  qrCodeId?: string | null;
  entityId!: string;
  entityType!: string;
  verifierUserId?: string | null;
  validationResult!: string;
  failureReason?: string | null;
  deviceInfo?: string | null;
  ipAddress?: string | null;
  location?: string | null;
  platform?: string | null;
  scannedAt!: Date;
}

export class QrAuditLogEntity {
  id!: string;
  qrCodeId?: string | null;
  action!: string;
  performedBy?: string | null;
  details?: string | null;
  ipAddress?: string | null;
  createdAt!: Date;
}

export class QrConfigurationEntity {
  id!: string;
  entityType!: string;
  defaultValidityDays!: number;
  allowRotation!: boolean;
  requireOneTimeScan!: boolean;
  secretKeyHash?: string | null;
  updatedAt!: Date;
}

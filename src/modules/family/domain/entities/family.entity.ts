export class FamilyMemberEntity {
  id!: string;
  patientProfileId!: string;
  fullName!: string;
  relationship!: string;
  relationshipType!: string;
  phone!: string;
  status!: string;
  isPrimary!: boolean;
  isGuardian!: boolean;
  isDependent!: boolean;
  isCaregiver!: boolean;
  verificationStatus!: string;
  notes?: string | null;
  archivedAt?: Date | null;
  createdAt!: Date;
  updatedAt!: Date;
}

export class FamilyConsentEntity {
  id!: string;
  patientProfileId!: string;
  inviteePhone!: string;
  inviteeName?: string | null;
  relationship!: string;
  relationshipType!: string;
  status!: string;
  invitationToken!: string;
  resendCount!: number;
  expiresAt?: Date | null;
  acceptedAt?: Date | null;
  rejectedAt?: Date | null;
  cancelledAt?: Date | null;
  createdAt!: Date;
  updatedAt!: Date;
}

export class ConsentRecordEntity {
  id!: string;
  patientProfileId!: string;
  familyMemberId!: string;
  category!: string;
  isActive!: boolean;
  grantedAt!: Date;
  revokedAt?: Date | null;
  expiresAt?: Date | null;
  notes?: string | null;
  createdAt!: Date;
  updatedAt!: Date;
}

export class ConsentHistoryEntity {
  id!: string;
  consentRecordId!: string;
  action!: string;
  performedBy?: string | null;
  reason?: string | null;
  createdAt!: Date;
}

export class InsuranceProviderEntity {
  id!: string;
  name!: string;
  code!: string;
  contactEmail?: string | null;
  contactPhone?: string | null;
  address?: string | null;
  networkType!: string;
  isActive!: boolean;
  createdAt!: Date;
  updatedAt!: Date;
}

export class InsurancePlanEntity {
  id!: string;
  providerId!: string;
  name!: string;
  planCode!: string;
  planType!: string;
  deductibleAmount!: number;
  copayAmount!: number;
  maxCoverageLimit!: number;
  preAuthRequired!: boolean;
  waitingPeriodDays!: number;
  createdAt!: Date;
  updatedAt!: Date;
}

export class InsurancePolicyEntity {
  id!: string;
  patientProfileId!: string;
  providerId?: string | null;
  planId?: string | null;
  providerName!: string;
  policyNumber!: string;
  groupNumber?: string | null;
  status!: string;
  coverageDetails?: string | null;
  startDate?: Date | null;
  expiryDate?: Date | null;
  verificationStatus!: string;
  verifiedBy?: string | null;
  verifiedAt?: Date | null;
  copayAmount?: number | null;
  deductibleAmount?: number | null;
  maxLimit?: number | null;
  preAuthRequired!: boolean;
  secondaryProvider?: string | null;
  secondaryPolicyNumber?: string | null;
  secondaryCoverage?: string | null;
  isDeleted!: boolean;
  deletedAt?: Date | null;
  createdAt!: Date;
  updatedAt!: Date;
  beneficiaries?: InsuranceBeneficiaryEntity[];
  claimDrafts?: InsuranceClaimDraftEntity[];
}

export class InsuranceBeneficiaryEntity {
  id!: string;
  policyId!: string;
  fullName!: string;
  relationship!: string;
  dateOfBirth?: Date | null;
  isPrimary!: boolean;
  createdAt!: Date;
}

export class InsuranceClaimDraftEntity {
  id!: string;
  policyId!: string;
  patientProfileId!: string;
  claimNumber!: string;
  status!: string;
  totalAmount!: number;
  diagnosisCodes!: string[];
  treatmentDate?: Date | null;
  notes?: string | null;
  attachedRecordIds!: string[];
  attachedReportIds!: string[];
  createdById?: string | null;
  createdAt!: Date;
  updatedAt!: Date;
}

export class InsuranceHistoryEntity {
  id!: string;
  policyId!: string;
  action!: string;
  previousStatus?: string | null;
  newStatus!: string;
  reason?: string | null;
  performedBy?: string | null;
  createdAt!: Date;
}

export class InsuranceAuditLogEntity {
  id!: string;
  policyId!: string;
  action!: string;
  performedBy?: string | null;
  details?: string | null;
  ipAddress?: string | null;
  createdAt!: Date;
}

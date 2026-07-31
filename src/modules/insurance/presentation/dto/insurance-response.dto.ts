import { ApiProperty } from '@nestjs/swagger';

export class InsuranceProviderResponseDto {
  @ApiProperty() id!: string;
  @ApiProperty() name!: string;
  @ApiProperty() code!: string;
  @ApiProperty({ nullable: true }) contactEmail?: string;
  @ApiProperty({ nullable: true }) contactPhone?: string;
  @ApiProperty({ nullable: true }) address?: string;
  @ApiProperty() networkType!: string;
  @ApiProperty() isActive!: boolean;
  @ApiProperty() createdAt!: string;
}

export class InsurancePlanResponseDto {
  @ApiProperty() id!: string;
  @ApiProperty() providerId!: string;
  @ApiProperty() name!: string;
  @ApiProperty() planCode!: string;
  @ApiProperty() planType!: string;
  @ApiProperty() deductibleAmount!: number;
  @ApiProperty() copayAmount!: number;
  @ApiProperty() maxCoverageLimit!: number;
  @ApiProperty() preAuthRequired!: boolean;
  @ApiProperty() waitingPeriodDays!: number;
  @ApiProperty() createdAt!: string;
}

export class InsuranceBeneficiaryResponseDto {
  @ApiProperty() id!: string;
  @ApiProperty() policyId!: string;
  @ApiProperty() fullName!: string;
  @ApiProperty() relationship!: string;
  @ApiProperty({ nullable: true }) dateOfBirth?: string;
  @ApiProperty() isPrimary!: boolean;
  @ApiProperty() createdAt!: string;
}

export class InsurancePolicyResponseDto {
  @ApiProperty() id!: string;
  @ApiProperty() patientProfileId!: string;
  @ApiProperty({ nullable: true }) providerId?: string;
  @ApiProperty({ nullable: true }) planId?: string;
  @ApiProperty() providerName!: string;
  @ApiProperty() policyNumber!: string;
  @ApiProperty({ nullable: true }) groupNumber?: string;
  @ApiProperty() status!: string;
  @ApiProperty({ nullable: true }) coverageDetails?: string;
  @ApiProperty({ nullable: true }) startDate?: string;
  @ApiProperty({ nullable: true }) expiryDate?: string;
  @ApiProperty() verificationStatus!: string;
  @ApiProperty({ nullable: true }) verifiedBy?: string;
  @ApiProperty({ nullable: true }) verifiedAt?: string;
  @ApiProperty({ nullable: true }) copayAmount?: number;
  @ApiProperty({ nullable: true }) deductibleAmount?: number;
  @ApiProperty({ nullable: true }) maxLimit?: number;
  @ApiProperty() preAuthRequired!: boolean;
  @ApiProperty({ nullable: true }) secondaryProvider?: string;
  @ApiProperty({ nullable: true }) secondaryPolicyNumber?: string;
  @ApiProperty({ nullable: true }) secondaryCoverage?: string;
  @ApiProperty() isDeleted!: boolean;
  @ApiProperty({ type: [InsuranceBeneficiaryResponseDto], required: false }) beneficiaries?: InsuranceBeneficiaryResponseDto[];
  @ApiProperty({ nullable: true }) qrToken?: string;
  @ApiProperty() createdAt!: string;
  @ApiProperty() updatedAt!: string;
}

export class InsuranceClaimDraftResponseDto {
  @ApiProperty() id!: string;
  @ApiProperty() policyId!: string;
  @ApiProperty() patientProfileId!: string;
  @ApiProperty() claimNumber!: string;
  @ApiProperty() status!: string;
  @ApiProperty() totalAmount!: number;
  @ApiProperty({ type: [String] }) diagnosisCodes!: string[];
  @ApiProperty({ nullable: true }) treatmentDate?: string;
  @ApiProperty({ nullable: true }) notes?: string;
  @ApiProperty({ type: [String] }) attachedRecordIds!: string[];
  @ApiProperty({ type: [String] }) attachedReportIds!: string[];
  @ApiProperty() createdAt!: string;
}

export class InsuranceStatsResponseDto {
  @ApiProperty() totalPolicies!: number;
  @ApiProperty() activePolicies!: number;
  @ApiProperty() verifiedPolicies!: number;
  @ApiProperty() totalClaimDrafts!: number;
  @ApiProperty() totalProviders!: number;
}

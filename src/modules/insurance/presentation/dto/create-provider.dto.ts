import { IsNotEmpty, IsString, IsOptional, IsNumber, IsBoolean, IsArray, ValidateNested, IsDateString, IsEnum, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export enum InsurancePolicyStatus {
  DRAFT = 'DRAFT',
  ACTIVE = 'ACTIVE',
  SUSPENDED = 'SUSPENDED',
  EXPIRED = 'EXPIRED',
  CANCELLED = 'CANCELLED',
  ARCHIVED = 'ARCHIVED',
}

export class CreateProviderDto {
  @ApiProperty({ example: 'State Life Health Insurance' })
  @IsNotEmpty()
  @IsString()
  name!: string;

  @ApiProperty({ example: 'SLIC-HEALTH', description: 'Unique provider code' })
  @IsNotEmpty()
  @IsString()
  code!: string;

  @ApiProperty({ example: 'support@statelife.com', required: false })
  @IsOptional()
  @IsString()
  contactEmail?: string;

  @ApiProperty({ example: '+92-51-111-111-222', required: false })
  @IsOptional()
  @IsString()
  contactPhone?: string;

  @ApiProperty({ example: 'Plot 14, Blue Area, Islamabad', required: false })
  @IsOptional()
  @IsString()
  address?: string;

  @ApiProperty({ example: 'PPO', enum: ['PPO', 'HMO', 'EPO', 'POS'], required: false })
  @IsOptional()
  @IsString()
  networkType?: string;
}

export class CreatePlanDto {
  @ApiProperty({ example: 'provider-uuid-1' })
  @IsNotEmpty()
  @IsString()
  providerId!: string;

  @ApiProperty({ example: 'Gold Comprehensive Health Plan' })
  @IsNotEmpty()
  @IsString()
  name!: string;

  @ApiProperty({ example: 'GOLD-360-COMP' })
  @IsNotEmpty()
  @IsString()
  planCode!: string;

  @ApiProperty({ example: 'COMPREHENSIVE', required: false })
  @IsOptional()
  @IsString()
  planType?: string;

  @ApiProperty({ example: 500, required: false })
  @IsOptional()
  @IsNumber()
  deductibleAmount?: number;

  @ApiProperty({ example: 25, required: false })
  @IsOptional()
  @IsNumber()
  copayAmount?: number;

  @ApiProperty({ example: 500000, required: false })
  @IsOptional()
  @IsNumber()
  maxCoverageLimit?: number;

  @ApiProperty({ example: true, required: false })
  @IsOptional()
  @IsBoolean()
  preAuthRequired?: boolean;

  @ApiProperty({ example: 30, required: false })
  @IsOptional()
  @IsNumber()
  waitingPeriodDays?: number;
}

export class CreateBeneficiaryDto {
  @ApiProperty({ example: 'Jane Doe' })
  @IsNotEmpty()
  @IsString()
  fullName!: string;

  @ApiProperty({ example: 'SPOUSE' })
  @IsNotEmpty()
  @IsString()
  relationship!: string;

  @ApiProperty({ example: '1992-08-20', required: false })
  @IsOptional()
  @IsDateString()
  dateOfBirth?: string;

  @ApiProperty({ example: false, required: false })
  @IsOptional()
  @IsBoolean()
  isPrimary?: boolean;
}

export class CreateFullPolicyDto {
  @ApiProperty({ example: 'State Life Health Insurance' })
  @IsNotEmpty()
  @IsString()
  providerName!: string;

  @ApiProperty({ example: 'provider-uuid-1', required: false })
  @IsOptional()
  @IsString()
  providerId?: string;

  @ApiProperty({ example: 'plan-uuid-1', required: false })
  @IsOptional()
  @IsString()
  planId?: string;

  @ApiProperty({ example: 'POL-9988776655' })
  @IsNotEmpty()
  @IsString()
  policyNumber!: string;

  @ApiProperty({ example: 'GRP-100200', required: false })
  @IsOptional()
  @IsString()
  groupNumber?: string;

  @ApiProperty({ enum: InsurancePolicyStatus, example: 'ACTIVE', required: false })
  @IsOptional()
  @IsEnum(InsurancePolicyStatus)
  status?: InsurancePolicyStatus;

  @ApiProperty({ example: 'Inpatient & Outpatient 80/20 coverage up to $500,000', required: false })
  @IsOptional()
  @IsString()
  coverageDetails?: string;

  @ApiProperty({ example: '2026-01-01', required: false })
  @IsOptional()
  @IsDateString()
  startDate?: string;

  @ApiProperty({ example: '2026-12-31', required: false })
  @IsOptional()
  @IsDateString()
  expiryDate?: string;

  @ApiProperty({ example: 25, required: false })
  @IsOptional()
  @IsNumber()
  copayAmount?: number;

  @ApiProperty({ example: 500, required: false })
  @IsOptional()
  @IsNumber()
  deductibleAmount?: number;

  @ApiProperty({ example: 500000, required: false })
  @IsOptional()
  @IsNumber()
  maxLimit?: number;

  @ApiProperty({ example: true, required: false })
  @IsOptional()
  @IsBoolean()
  preAuthRequired?: boolean;

  @ApiProperty({ type: [CreateBeneficiaryDto], required: false })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateBeneficiaryDto)
  beneficiaries?: CreateBeneficiaryDto[];
}

export class PolicyActionDto {
  @ApiProperty({ example: 'Action requested by policy holder/admin', required: false })
  @IsOptional()
  @IsString()
  reason?: string;
}

export class CreateClaimDraftDto {
  @ApiProperty({ example: 'policy-uuid-1' })
  @IsNotEmpty()
  @IsString()
  policyId!: string;

  @ApiProperty({ example: 1250.50, description: 'Total claimed amount in USD' })
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  totalAmount!: number;

  @ApiProperty({ example: ['ICD10-E11.9', 'ICD10-I10'], type: [String], required: false })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  diagnosisCodes?: string[];

  @ApiProperty({ example: '2026-07-28', required: false })
  @IsOptional()
  @IsDateString()
  treatmentDate?: string;

  @ApiProperty({ example: 'Inpatient consultation and lab test reimbursement claim', required: false })
  @IsOptional()
  @IsString()
  notes?: string;

  @ApiProperty({ example: ['medical-record-uuid-1'], type: [String], required: false })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  attachedRecordIds?: string[];

  @ApiProperty({ example: ['report-uuid-1'], type: [String], required: false })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  attachedReportIds?: string[];
}

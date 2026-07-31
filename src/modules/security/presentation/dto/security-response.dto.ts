import { ApiProperty } from '@nestjs/swagger';

export class ConsentRecordResponseDto {
  @ApiProperty() id!: string;
  @ApiProperty() patientId!: string;
  @ApiProperty() consentType!: string;
  @ApiProperty() status!: string;
  @ApiProperty() purpose!: string;
  @ApiProperty({ nullable: true }) grantedAt?: string;
  @ApiProperty({ nullable: true }) expiresAt?: string;
  @ApiProperty({ nullable: true }) withdrawnAt?: string;
  @ApiProperty({ nullable: true }) capturedBy?: string;
  @ApiProperty({ nullable: true }) evidenceReference?: string;
  @ApiProperty() createdAt!: string;
  @ApiProperty() updatedAt!: string;
}

export class RetentionPolicyResponseDto {
  @ApiProperty() id!: string;
  @ApiProperty() name!: string;
  @ApiProperty() resourceType!: string;
  @ApiProperty() retentionPeriodDays!: number;
  @ApiProperty() action!: string;
  @ApiProperty() isActive!: boolean;
  @ApiProperty() createdAt!: string;
  @ApiProperty() updatedAt!: string;
}

export class SecurityIncidentResponseDto {
  @ApiProperty() id!: string;
  @ApiProperty() title!: string;
  @ApiProperty() description!: string;
  @ApiProperty() severity!: string;
  @ApiProperty() status!: string;
  @ApiProperty({ nullable: true }) reportedBy?: string;
  @ApiProperty({ nullable: true }) resolvedBy?: string;
  @ApiProperty({ nullable: true }) resolvedAt?: string;
  @ApiProperty() createdAt!: string;
  @ApiProperty() updatedAt!: string;
}

export class EncryptionKeyResponseDto {
  @ApiProperty() id!: string;
  @ApiProperty() keyIdentifier!: string;
  @ApiProperty() algorithm!: string;
  @ApiProperty() version!: number;
  @ApiProperty() status!: string;
  @ApiProperty({ nullable: true }) activatedAt?: string;
  @ApiProperty({ nullable: true }) expiresAt?: string;
  @ApiProperty({ nullable: true }) rotationDate?: string;
  @ApiProperty() createdAt!: string;
}

export class ComplianceReportResponseDto {
  @ApiProperty() id!: string;
  @ApiProperty() reportName!: string;
  @ApiProperty() reportType!: string;
  @ApiProperty({ nullable: true }) generatedBy?: string;
  @ApiProperty() generatedAt!: string;
  @ApiProperty({ nullable: true }) summary?: string;
  @ApiProperty({ nullable: true }) metadata?: any;
  @ApiProperty() createdAt!: string;
}

export class SecurityAuditLogResponseDto {
  @ApiProperty() id!: string;
  @ApiProperty({ nullable: true }) userId?: string;
  @ApiProperty() action!: string;
  @ApiProperty() resource!: string;
  @ApiProperty({ nullable: true }) resourceId?: string;
  @ApiProperty({ nullable: true }) ipAddress?: string;
  @ApiProperty({ nullable: true }) userAgent?: string;
  @ApiProperty() result!: string;
  @ApiProperty({ nullable: true }) details?: string;
  @ApiProperty() createdAt!: string;
}

export class SecurityDashboardResponseDto {
  @ApiProperty() activeConsentsCount!: number;
  @ApiProperty() activeRetentionPoliciesCount!: number;
  @ApiProperty() openIncidentsCount!: number;
  @ApiProperty() criticalIncidentsCount!: number;
  @ApiProperty() activeEncryptionKeyVersion!: number;
  @ApiProperty() complianceReportsCount!: number;
  @ApiProperty() totalAuditLogsCount!: number;
}

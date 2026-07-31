import { ApiProperty } from '@nestjs/swagger';

export class AdminDashboardStatsDto {
  @ApiProperty() totalPatients!: number;
  @ApiProperty() totalDoctors!: number;
  @ApiProperty() pendingOcrReviews!: number;
  @ApiProperty() systemLogsCount!: number;
}

export class AdminDashboardSummaryResponseDto {
  @ApiProperty() totalPatients!: number;
  @ApiProperty() totalDoctors!: number;
  @ApiProperty() totalFacilities!: number;
  @ApiProperty() totalStaff!: number;
  @ApiProperty() totalHealthCards!: number;
  @ApiProperty() totalInsurancePolicies!: number;
  @ApiProperty() totalImmunisationRecords!: number;
  @ApiProperty() totalActiveSchedules!: number;
  @ApiProperty({ type: [Object] }) recentActivities!: any[];
  @ApiProperty() growthMetrics!: {
    newPatientsThisMonth: number;
    newDoctorsThisMonth: number;
    newFacilitiesThisMonth: number;
  };
}

export class ManagedUserResponseDto {
  @ApiProperty() id!: string;
  @ApiProperty() phone!: string;
  @ApiProperty() status!: string;
  @ApiProperty({ type: [String] }) roles!: string[];
  @ApiProperty({ nullable: true }) patientProfileId?: string;
  @ApiProperty({ nullable: true }) doctorProfileId?: string;
  @ApiProperty({ nullable: true }) staffMemberId?: string;
  @ApiProperty() createdAt!: string;
  @ApiProperty() updatedAt!: string;
}

export class PermissionResponseDto {
  @ApiProperty() id!: string;
  @ApiProperty({ nullable: true }) groupId?: string;
  @ApiProperty() code!: string;
  @ApiProperty() name!: string;
  @ApiProperty({ nullable: true }) description?: string;
  @ApiProperty() createdAt!: string;
}

export class PermissionGroupResponseDto {
  @ApiProperty() id!: string;
  @ApiProperty() name!: string;
  @ApiProperty({ nullable: true }) description?: string;
  @ApiProperty({ type: [PermissionResponseDto] }) permissions!: PermissionResponseDto[];
  @ApiProperty() createdAt!: string;
}

export class OrganizationResponseDto {
  @ApiProperty() id!: string;
  @ApiProperty() name!: string;
  @ApiProperty() code!: string;
  @ApiProperty({ nullable: true }) logoUrl?: string;
  @ApiProperty({ nullable: true }) primaryColor?: string;
  @ApiProperty({ nullable: true }) secondaryColor?: string;
  @ApiProperty({ nullable: true }) phone?: string;
  @ApiProperty({ nullable: true }) email?: string;
  @ApiProperty({ nullable: true }) website?: string;
  @ApiProperty({ nullable: true }) streetAddress?: string;
  @ApiProperty({ nullable: true }) city?: string;
  @ApiProperty({ nullable: true }) district?: string;
  @ApiProperty({ nullable: true }) state?: string;
  @ApiProperty() country!: string;
  @ApiProperty() timezone!: string;
  @ApiProperty() language!: string;
  @ApiProperty() isDeleted!: boolean;
  @ApiProperty() createdAt!: string;
  @ApiProperty() updatedAt!: string;
}

export class PlatformSettingResponseDto {
  @ApiProperty() id!: string;
  @ApiProperty() category!: string;
  @ApiProperty() key!: string;
  @ApiProperty() value!: string;
  @ApiProperty() valueType!: string;
  @ApiProperty({ nullable: true }) description?: string;
  @ApiProperty() isPublic!: boolean;
  @ApiProperty({ nullable: true }) updatedBy?: string;
  @ApiProperty() createdAt!: string;
  @ApiProperty() updatedAt!: string;
}

export class AuditLogResponseDto {
  @ApiProperty() id!: string;
  @ApiProperty({ nullable: true }) userId?: string;
  @ApiProperty() action!: string;
  @ApiProperty({ nullable: true }) details?: string;
  @ApiProperty({ nullable: true }) ipAddress?: string;
  @ApiProperty() createdAt!: Date;
}

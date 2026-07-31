import { ApiProperty } from '@nestjs/swagger';

export class StaffQualificationResponseDto {
  @ApiProperty() id!: string;
  @ApiProperty() degreeName!: string;
  @ApiProperty() instituteName!: string;
  @ApiProperty() passingYear!: number;
  @ApiProperty({ nullable: true }) fieldOfStudy?: string;
  @ApiProperty() createdAt!: string;
}

export class StaffDocumentResponseDto {
  @ApiProperty() id!: string;
  @ApiProperty() documentType!: string;
  @ApiProperty({ nullable: true }) medicalAttachmentId?: string;
  @ApiProperty() verificationStatus!: string;
  @ApiProperty() createdAt!: string;
}

export class StaffFullResponseDto {
  @ApiProperty() id!: string;
  @ApiProperty({ nullable: true }) userId?: string;
  @ApiProperty() employeeCode!: string;
  @ApiProperty() fullName!: string;
  @ApiProperty({ nullable: true }) gender?: string;
  @ApiProperty({ nullable: true }) dateOfBirth?: string;
  @ApiProperty() phone!: string;
  @ApiProperty({ nullable: true }) email?: string;
  @ApiProperty({ nullable: true }) emergencyContact?: string;
  @ApiProperty({ nullable: true }) profilePhotoUrl?: string;
  @ApiProperty() staffType!: string;
  @ApiProperty() designation!: string;
  @ApiProperty() primaryFacilityId!: string;
  @ApiProperty({ nullable: true }) secondaryFacilityId?: string;
  @ApiProperty({ nullable: true }) primaryDepartmentId?: string;
  @ApiProperty({ nullable: true }) secondaryDepartmentId?: string;
  @ApiProperty({ nullable: true }) reportingManagerId?: string;
  @ApiProperty() employmentType!: string;
  @ApiProperty() employmentStatus!: string;
  @ApiProperty() joiningDate!: string;
  @ApiProperty({ nullable: true }) terminationDate?: string;
  @ApiProperty() noticePeriodDays!: number;
  @ApiProperty({ nullable: true }) biography?: string;
  @ApiProperty({ type: [String] }) languagesSpoken!: string[];
  @ApiProperty() verificationStatus!: string;
  @ApiProperty({ nullable: true }) verificationNotes?: string;
  @ApiProperty({ nullable: true }) verifiedBy?: string;
  @ApiProperty({ nullable: true }) verifiedAt?: string;
  @ApiProperty() isDeleted!: boolean;
  @ApiProperty({ type: [StaffQualificationResponseDto] }) qualifications!: StaffQualificationResponseDto[];
  @ApiProperty({ type: [StaffDocumentResponseDto] }) documents!: StaffDocumentResponseDto[];
  @ApiProperty({ nullable: true }) qrToken?: string;
  @ApiProperty() createdAt!: string;
  @ApiProperty() updatedAt!: string;
}

export class StaffHistoryItemDto {
  @ApiProperty() id!: string;
  @ApiProperty() staffId!: string;
  @ApiProperty() action!: string;
  @ApiProperty({ nullable: true }) previousStatus?: string;
  @ApiProperty() newStatus!: string;
  @ApiProperty({ nullable: true }) reason?: string;
  @ApiProperty({ nullable: true }) performedBy?: string;
  @ApiProperty() createdAt!: string;
}

export class StaffStatsResponseDto {
  @ApiProperty() totalStaff!: number;
  @ApiProperty() verifiedStaff!: number;
  @ApiProperty() pendingStaff!: number;
  @ApiProperty() suspendedStaff!: number;
  @ApiProperty() activeStaff!: number;
}

import { ApiProperty } from '@nestjs/swagger';

export class BranchResponseDto {
  @ApiProperty() id!: string;
  @ApiProperty() branchName!: string;
  @ApiProperty({ nullable: true }) branchCode?: string;
  @ApiProperty() address!: string;
  @ApiProperty() city!: string;
  @ApiProperty() state!: string;
  @ApiProperty({ nullable: true }) phone?: string;
}

export class FullDepartmentResponseDto {
  @ApiProperty() id!: string;
  @ApiProperty() facilityId!: string;
  @ApiProperty() name!: string;
  @ApiProperty({ nullable: true }) code?: string;
  @ApiProperty({ nullable: true }) description?: string;
  @ApiProperty({ nullable: true }) departmentHead?: string;
  @ApiProperty({ nullable: true }) operatingHours?: string;
  @ApiProperty() createdAt!: string;
}

export class RoomResponseDto {
  @ApiProperty() id!: string;
  @ApiProperty() facilityId!: string;
  @ApiProperty({ nullable: true }) departmentId?: string;
  @ApiProperty() roomNumber!: string;
  @ApiProperty({ nullable: true }) roomName?: string;
  @ApiProperty({ nullable: true }) building?: string;
  @ApiProperty({ nullable: true }) block?: string;
  @ApiProperty({ nullable: true }) floor?: string;
  @ApiProperty({ nullable: true }) wing?: string;
  @ApiProperty() roomCategory!: string;
  @ApiProperty() capacity!: number;
  @ApiProperty() isOperational!: boolean;
  @ApiProperty() createdAt!: string;
}

export class LicenseResponseDto {
  @ApiProperty() id!: string;
  @ApiProperty() licenseType!: string;
  @ApiProperty() licenseNumber!: string;
  @ApiProperty() issuingAuthority!: string;
  @ApiProperty({ nullable: true }) issueDate?: string;
  @ApiProperty({ nullable: true }) expiryDate?: string;
  @ApiProperty({ nullable: true }) renewalDate?: string;
  @ApiProperty() verificationStatus!: string;
}

export class AccreditationResponseDto {
  @ApiProperty() id!: string;
  @ApiProperty() accreditationBody!: string;
  @ApiProperty() certificateNumber!: string;
  @ApiProperty({ nullable: true }) validFrom?: string;
  @ApiProperty({ nullable: true }) validTo?: string;
  @ApiProperty() status!: string;
}

export class FacilityDocumentResponseDto {
  @ApiProperty() id!: string;
  @ApiProperty() documentType!: string;
  @ApiProperty({ nullable: true }) medicalAttachmentId?: string;
  @ApiProperty() verificationStatus!: string;
  @ApiProperty() createdAt!: string;
}

export class FacilityFullResponseDto {
  @ApiProperty() id!: string;
  @ApiProperty() name!: string;
  @ApiProperty({ nullable: true }) legalName?: string;
  @ApiProperty() facilityCode!: string;
  @ApiProperty() registrationNumber!: string;
  @ApiProperty() facilityType!: string;
  @ApiProperty() ownershipType!: string;
  @ApiProperty({ nullable: true }) buildingName?: string;
  @ApiProperty() streetAddress!: string;
  @ApiProperty() city!: string;
  @ApiProperty({ nullable: true }) district?: string;
  @ApiProperty() state!: string;
  @ApiProperty() country!: string;
  @ApiProperty({ nullable: true }) pinCode?: string;
  @ApiProperty({ nullable: true }) latitude?: number;
  @ApiProperty({ nullable: true }) longitude?: number;
  @ApiProperty() timezone!: string;
  @ApiProperty() phone!: string;
  @ApiProperty({ nullable: true }) emergencyPhone?: string;
  @ApiProperty({ nullable: true }) email?: string;
  @ApiProperty({ nullable: true }) website?: string;
  @ApiProperty({ nullable: true }) profilePhotoUrl?: string;
  @ApiProperty() verificationStatus!: string;
  @ApiProperty({ nullable: true }) verificationNotes?: string;
  @ApiProperty({ nullable: true }) verifiedBy?: string;
  @ApiProperty({ nullable: true }) verifiedAt?: string;
  @ApiProperty() isDeleted!: boolean;
  @ApiProperty({ type: [BranchResponseDto] }) branches!: BranchResponseDto[];
  @ApiProperty({ type: [FullDepartmentResponseDto] }) departments!: FullDepartmentResponseDto[];
  @ApiProperty({ type: [RoomResponseDto] }) rooms!: RoomResponseDto[];
  @ApiProperty({ type: [LicenseResponseDto] }) licenses!: LicenseResponseDto[];
  @ApiProperty({ type: [AccreditationResponseDto] }) accreditations!: AccreditationResponseDto[];
  @ApiProperty({ type: [FacilityDocumentResponseDto] }) documents!: FacilityDocumentResponseDto[];
  @ApiProperty({ nullable: true }) qrToken?: string;
  @ApiProperty() createdAt!: string;
  @ApiProperty() updatedAt!: string;
}

export class FacilityHistoryItemDto {
  @ApiProperty() id!: string;
  @ApiProperty() facilityId!: string;
  @ApiProperty() action!: string;
  @ApiProperty({ nullable: true }) previousStatus?: string;
  @ApiProperty() newStatus!: string;
  @ApiProperty({ nullable: true }) reason?: string;
  @ApiProperty({ nullable: true }) performedBy?: string;
  @ApiProperty() createdAt!: string;
}

export class FacilityStatsResponseDto {
  @ApiProperty() totalFacilities!: number;
  @ApiProperty() verifiedFacilities!: number;
  @ApiProperty() pendingFacilities!: number;
  @ApiProperty() suspendedFacilities!: number;
  @ApiProperty() totalDepartments!: number;
  @ApiProperty() totalRooms!: number;
}

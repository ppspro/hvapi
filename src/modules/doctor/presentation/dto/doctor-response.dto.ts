import { ApiProperty } from '@nestjs/swagger';

export class QualificationResponseDto {
  @ApiProperty() id!: string;
  @ApiProperty() degreeName!: string;
  @ApiProperty() instituteName!: string;
  @ApiProperty() passingYear!: number;
  @ApiProperty({ nullable: true }) specialization?: string;
  @ApiProperty() createdAt!: string;
}

export class CertificationResponseDto {
  @ApiProperty() id!: string;
  @ApiProperty() title!: string;
  @ApiProperty() issuingAuthority!: string;
  @ApiProperty({ nullable: true }) issueDate?: string;
  @ApiProperty({ nullable: true }) expiryDate?: string;
  @ApiProperty() createdAt!: string;
}

export class ExperienceResponseDto {
  @ApiProperty() id!: string;
  @ApiProperty() designation!: string;
  @ApiProperty() hospitalName!: string;
  @ApiProperty() startDate!: string;
  @ApiProperty({ nullable: true }) endDate?: string;
  @ApiProperty() isCurrent!: boolean;
  @ApiProperty() createdAt!: string;
}

export class DoctorDocumentResponseDto {
  @ApiProperty() id!: string;
  @ApiProperty() documentType!: string;
  @ApiProperty({ nullable: true }) medicalAttachmentId?: string;
  @ApiProperty() verificationStatus!: string;
  @ApiProperty() createdAt!: string;
}

export class DoctorProfileFullResponseDto {
  @ApiProperty() id!: string;
  @ApiProperty() userId!: string;
  @ApiProperty() fullName!: string;
  @ApiProperty({ nullable: true }) gender?: string;
  @ApiProperty({ nullable: true }) dateOfBirth?: string;
  @ApiProperty({ nullable: true }) profilePhotoUrl?: string;
  @ApiProperty({ nullable: true }) digitalSignatureUrl?: string;
  @ApiProperty({ nullable: true }) biography?: string;
  @ApiProperty({ nullable: true }) professionalSummary?: string;
  @ApiProperty() yearsOfExperience!: number;
  @ApiProperty() primarySpecialization!: string;
  @ApiProperty({ type: [String] }) secondarySpecializations!: string[];
  @ApiProperty() medicalCouncil!: string;
  @ApiProperty() registrationNumber!: string;
  @ApiProperty() licenseNumber!: string;
  @ApiProperty() providerIdentifier!: string;
  @ApiProperty({ nullable: true }) registrationState?: string;
  @ApiProperty({ nullable: true }) registrationCountry?: string;
  @ApiProperty({ nullable: true }) registrationIssueDate?: string;
  @ApiProperty({ nullable: true }) registrationExpiryDate?: string;
  @ApiProperty() verificationStatus!: string;
  @ApiProperty({ nullable: true }) verificationNotes?: string;
  @ApiProperty({ nullable: true }) verifiedBy?: string;
  @ApiProperty({ nullable: true }) verifiedAt?: string;
  @ApiProperty({ nullable: true }) department?: string;
  @ApiProperty({ type: [String] }) subSpecializations!: string[];
  @ApiProperty({ type: [String] }) clinicalInterests!: string[];
  @ApiProperty({ type: [String] }) servicesOffered!: string[];
  @ApiProperty({ type: [String] }) languagesSpoken!: string[];
  @ApiProperty({ nullable: true }) emergencyPhone?: string;
  @ApiProperty() isDeleted!: boolean;
  @ApiProperty({ type: [QualificationResponseDto] }) qualifications!: QualificationResponseDto[];
  @ApiProperty({ type: [CertificationResponseDto] }) certifications!: CertificationResponseDto[];
  @ApiProperty({ type: [ExperienceResponseDto] }) experiences!: ExperienceResponseDto[];
  @ApiProperty({ type: [DoctorDocumentResponseDto] }) documents!: DoctorDocumentResponseDto[];
  @ApiProperty({ nullable: true }) qrToken?: string;
  @ApiProperty() createdAt!: string;
  @ApiProperty() updatedAt!: string;
}

export class DoctorHistoryItemDto {
  @ApiProperty() id!: string;
  @ApiProperty() doctorProfileId!: string;
  @ApiProperty() action!: string;
  @ApiProperty({ nullable: true }) previousStatus?: string;
  @ApiProperty() newStatus!: string;
  @ApiProperty({ nullable: true }) reason?: string;
  @ApiProperty({ nullable: true }) performedBy?: string;
  @ApiProperty() createdAt!: string;
}

export class DoctorStatsResponseDto {
  @ApiProperty() totalDoctors!: number;
  @ApiProperty() verifiedDoctors!: number;
  @ApiProperty() pendingDoctors!: number;
  @ApiProperty() suspendedDoctors!: number;
}

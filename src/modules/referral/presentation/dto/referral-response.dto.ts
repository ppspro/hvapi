import { ApiProperty } from '@nestjs/swagger';

export class ReferralNoteResponseDto {
  @ApiProperty() id!: string;
  @ApiProperty() referralId!: string;
  @ApiProperty() authorId!: string;
  @ApiProperty() authorRole!: string;
  @ApiProperty() noteText!: string;
  @ApiProperty() isPrivate!: boolean;
  @ApiProperty() createdAt!: string;
}

export class ReferralAttachmentResponseDto {
  @ApiProperty() id!: string;
  @ApiProperty() referralId!: string;
  @ApiProperty() attachmentId!: string;
  @ApiProperty() attachedBy!: string;
  @ApiProperty() createdAt!: string;
}

export class ReferralStatusHistoryResponseDto {
  @ApiProperty() id!: string;
  @ApiProperty() referralId!: string;
  @ApiProperty({ nullable: true }) fromStatus?: string;
  @ApiProperty() toStatus!: string;
  @ApiProperty() changedBy!: string;
  @ApiProperty({ nullable: true }) reason?: string;
  @ApiProperty() createdAt!: string;
}

export class ReferralResponseDto {
  @ApiProperty() id!: string;
  @ApiProperty() referralNumber!: string;
  @ApiProperty() patientId!: string;
  @ApiProperty() referringDoctorId!: string;
  @ApiProperty() referringFacilityId!: string;
  @ApiProperty({ nullable: true }) receivingDoctorId?: string;
  @ApiProperty() receivingFacilityId!: string;
  @ApiProperty({ nullable: true }) medicalRecordId?: string;
  @ApiProperty() referralType!: string;
  @ApiProperty() priority!: string;
  @ApiProperty() status!: string;
  @ApiProperty() reasonForReferral!: string;
  @ApiProperty({ nullable: true }) clinicalSummary?: string;
  @ApiProperty({ nullable: true }) specialtyRequired?: string;
  @ApiProperty({ nullable: true }) expiresAt?: string;
  @ApiProperty({ nullable: true }) acceptedAt?: string;
  @ApiProperty({ nullable: true }) completedAt?: string;
  @ApiProperty({ nullable: true }) rejectedAt?: string;
  @ApiProperty({ nullable: true }) rejectionReason?: string;
  @ApiProperty() createdAt!: string;
  @ApiProperty() updatedAt!: string;
  @ApiProperty({ type: [ReferralNoteResponseDto], required: false }) notes?: ReferralNoteResponseDto[];
  @ApiProperty({ type: [ReferralAttachmentResponseDto], required: false }) attachments?: ReferralAttachmentResponseDto[];
  @ApiProperty({ type: [ReferralStatusHistoryResponseDto], required: false }) statusHistory?: ReferralStatusHistoryResponseDto[];
}

export class ReferralDashboardStatsResponseDto {
  @ApiProperty() totalReferrals!: number;
  @ApiProperty() pendingTriageCount!: number;
  @ApiProperty() acceptedCount!: number;
  @ApiProperty() completedCount!: number;
  @ApiProperty() avgCompletionTimeHours!: number;
}

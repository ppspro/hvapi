import { ApiProperty } from '@nestjs/swagger';

export class MedicalAttachmentResponseDto {
  @ApiProperty() id!: string;
  @ApiProperty({ nullable: true }) medicalRecordId?: string;
  @ApiProperty() patientProfileId!: string;
  @ApiProperty() fileName!: string;
  @ApiProperty() originalName!: string;
  @ApiProperty() fileSize!: number;
  @ApiProperty() mimeType!: string;
  @ApiProperty() category!: string;
  @ApiProperty() storageKey!: string;
  @ApiProperty() storageUrl!: string;
  @ApiProperty({ nullable: true }) checksum?: string;
  @ApiProperty() version!: number;
  @ApiProperty() isDeleted!: boolean;
  @ApiProperty() virusScanStatus!: string;
  @ApiProperty() createdAt!: string;
  @ApiProperty() updatedAt!: string;
}

export class AttachmentVersionResponseDto {
  @ApiProperty() id!: string;
  @ApiProperty() attachmentId!: string;
  @ApiProperty() version!: number;
  @ApiProperty() storageKey!: string;
  @ApiProperty() storageUrl!: string;
  @ApiProperty() fileSize!: number;
  @ApiProperty({ nullable: true }) createdById?: string;
  @ApiProperty() createdAt!: string;
}

export class MedicalRecordResponseDto {
  @ApiProperty() id!: string;
  @ApiProperty() patientProfileId!: string;
  @ApiProperty() title!: string;
  @ApiProperty({ nullable: true }) chiefComplaint?: string;
  @ApiProperty({ nullable: true }) clinicalNotes?: string;
  @ApiProperty({ nullable: true }) treatmentPlan?: string;
  @ApiProperty({ nullable: true }) followUpInstructions?: string;
  @ApiProperty() status!: string;
  @ApiProperty() isDeleted!: boolean;
  @ApiProperty({ nullable: true }) deletedAt?: string;
  @ApiProperty({ type: [Object], required: false }) encounters?: any[];
  @ApiProperty({ type: [Object], required: false }) diagnoses?: any[];
  @ApiProperty({ type: [Object], required: false }) vitalSigns?: any[];
  @ApiProperty({ type: [Object], required: false }) procedures?: any[];
  @ApiProperty({ type: [MedicalAttachmentResponseDto], required: false }) attachments?: MedicalAttachmentResponseDto[];
  @ApiProperty() createdAt!: string;
  @ApiProperty() updatedAt!: string;
}

export class MedicalTimelineItemDto {
  @ApiProperty() id!: string;
  @ApiProperty({ example: 'MEDICAL_RECORD' }) eventType!: string;
  @ApiProperty() title!: string;
  @ApiProperty({ nullable: true }) status?: string;
  @ApiProperty({ nullable: true }) category?: string;
  @ApiProperty() date!: string;
  @ApiProperty({ type: Object }) details!: any;
}

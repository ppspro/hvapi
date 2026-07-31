import { ApiProperty } from '@nestjs/swagger';

export class ReportAttachmentDto {
  @ApiProperty() id!: string;
  @ApiProperty() fileName!: string;
  @ApiProperty({ nullable: true }) originalName?: string;
  @ApiProperty() fileSize!: number;
  @ApiProperty() mimeType!: string;
  @ApiProperty({ nullable: true }) storageKey?: string;
  @ApiProperty() storageUrl!: string;
  @ApiProperty({ nullable: true }) checksum?: string;
  @ApiProperty() createdAt!: string;
}

export class ReportVersionResponseDto {
  @ApiProperty() id!: string;
  @ApiProperty() medicalReportId!: string;
  @ApiProperty() version!: number;
  @ApiProperty() fileName!: string;
  @ApiProperty({ nullable: true }) storageKey?: string;
  @ApiProperty() storageUrl!: string;
  @ApiProperty() fileSize!: number;
  @ApiProperty() mimeType!: string;
  @ApiProperty({ nullable: true }) createdById?: string;
  @ApiProperty() createdAt!: string;
}

export class FullReportResponseDto {
  @ApiProperty() id!: string;
  @ApiProperty() patientProfileId!: string;
  @ApiProperty() title!: string;
  @ApiProperty({ nullable: true }) description?: string;
  @ApiProperty() category!: string;
  @ApiProperty() status!: string;
  @ApiProperty({ nullable: true }) reportDate?: string;
  @ApiProperty({ nullable: true }) prescribedBy?: string;
  @ApiProperty({ nullable: true }) providerName?: string;
  @ApiProperty({ nullable: true }) facilityName?: string;
  @ApiProperty({ nullable: true }) doctorName?: string;
  @ApiProperty() pageCount!: number;
  @ApiProperty() language!: string;
  @ApiProperty({ type: [String] }) tags!: string[];
  @ApiProperty({ nullable: true }) notes?: string;
  @ApiProperty() verificationStatus!: string;
  @ApiProperty({ nullable: true }) verifiedBy?: string;
  @ApiProperty({ nullable: true }) verifiedAt?: string;
  @ApiProperty() currentVersion!: number;
  @ApiProperty() isDeleted!: boolean;
  @ApiProperty({ type: [ReportAttachmentDto] }) attachments!: ReportAttachmentDto[];
  @ApiProperty({ type: [ReportVersionResponseDto], required: false }) versions?: ReportVersionResponseDto[];
  @ApiProperty() createdAt!: string;
  @ApiProperty() updatedAt!: string;
}

export class DownloadTokenResponseDto {
  @ApiProperty({ example: 'http://localhost:3000/api/v1/reports/download/file-uuid?token=sec_jwt_token' })
  downloadUrl!: string;

  @ApiProperty({ example: 'sec_jwt_token' })
  token!: string;

  @ApiProperty({ example: '2026-07-31T11:00:00.000Z' })
  expiresAt!: string;
}

export class PreviewMetadataResponseDto {
  @ApiProperty() id!: string;
  @ApiProperty() title!: string;
  @ApiProperty() fileName!: string;
  @ApiProperty() fileSize!: number;
  @ApiProperty() mimeType!: string;
  @ApiProperty() pageCount!: number;
  @ApiProperty() language!: string;
  @ApiProperty() storageUrl!: string;
  @ApiProperty() isPdf!: boolean;
  @ApiProperty() verificationStatus!: string;
}

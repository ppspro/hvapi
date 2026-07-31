import { ApiProperty } from '@nestjs/swagger';

export class QrHistoryItemDto {
  @ApiProperty() id!: string;
  @ApiProperty() qrCodeId!: string;
  @ApiProperty() action!: string;
  @ApiProperty({ nullable: true }) previousToken?: string;
  @ApiProperty({ nullable: true }) newToken?: string;
  @ApiProperty({ nullable: true }) previousStatus?: string;
  @ApiProperty() newStatus!: string;
  @ApiProperty({ nullable: true }) reason?: string;
  @ApiProperty({ nullable: true }) performedBy?: string;
  @ApiProperty() createdAt!: string;
}

export class QrScanLogItemDto {
  @ApiProperty() id!: string;
  @ApiProperty({ nullable: true }) qrCodeId?: string;
  @ApiProperty() entityId!: string;
  @ApiProperty() entityType!: string;
  @ApiProperty({ nullable: true }) verifierUserId?: string;
  @ApiProperty() validationResult!: string;
  @ApiProperty({ nullable: true }) failureReason?: string;
  @ApiProperty({ nullable: true }) deviceInfo?: string;
  @ApiProperty({ nullable: true }) ipAddress?: string;
  @ApiProperty({ nullable: true }) location?: string;
  @ApiProperty({ nullable: true }) platform?: string;
  @ApiProperty() scannedAt!: string;
}

export class QrResponseDto {
  @ApiProperty() id!: string;
  @ApiProperty() entityId!: string;
  @ApiProperty() entityType!: string;
  @ApiProperty() ownerId!: string;
  @ApiProperty() token!: string;
  @ApiProperty() signature!: string;
  @ApiProperty() status!: string;
  @ApiProperty() version!: number;
  @ApiProperty() nonce!: string;
  @ApiProperty({ nullable: true }) checksum?: string;
  @ApiProperty() issuedAt!: string;
  @ApiProperty() expiresAt!: string;
  @ApiProperty({ nullable: true }) rotatedAt?: string;
  @ApiProperty({ nullable: true }) revokedAt?: string;
  @ApiProperty({ nullable: true }) revocationReason?: string;
  @ApiProperty() isDeleted!: boolean;
  @ApiProperty() createdAt!: string;
  @ApiProperty() updatedAt!: string;
}

export class QrVerificationResultDto {
  @ApiProperty({ example: true }) isValid!: boolean;
  @ApiProperty({ example: 'VALID' }) status!: string;
  @ApiProperty({ example: 'HEALTH_CARD' }) entityType!: string;
  @ApiProperty({ example: 'entity-uuid-123' }) entityId!: string;
  @ApiProperty({ example: 'owner-uuid-456' }) ownerId!: string;
  @ApiProperty({ nullable: true }) failureReason?: string;
  @ApiProperty() scannedAt!: string;
}

export class QrAnalyticsResponseDto {
  @ApiProperty() totalQrs!: number;
  @ApiProperty() activeQrs!: number;
  @ApiProperty() revokedQrs!: number;
  @ApiProperty() totalScans!: number;
  @ApiProperty() successfulScans!: number;
  @ApiProperty() failedScans!: number;
  @ApiProperty({ type: Object }) scansByEntity!: Record<string, number>;
}

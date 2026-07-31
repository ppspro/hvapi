import { ApiProperty } from '@nestjs/swagger';

export class HealthCardHistoryItemDto {
  @ApiProperty() id!: string;
  @ApiProperty() healthCardId!: string;
  @ApiProperty() action!: string;
  @ApiProperty({ nullable: true }) previousStatus?: string;
  @ApiProperty() newStatus!: string;
  @ApiProperty({ nullable: true }) reason?: string;
  @ApiProperty({ nullable: true }) performedBy?: string;
  @ApiProperty() createdAt!: string;
}

export class FullHealthCardResponseDto {
  @ApiProperty() id!: string;
  @ApiProperty() patientProfileId!: string;
  @ApiProperty() cardNumber!: string;
  @ApiProperty() status!: string;
  @ApiProperty() version!: number;
  @ApiProperty() emergencyFlag!: boolean;
  @ApiProperty({ nullable: true }) metadata?: string;
  @ApiProperty() issuedAt!: string;
  @ApiProperty() expiresAt!: string;
  @ApiProperty({ nullable: true }) suspendedAt?: string;
  @ApiProperty({ nullable: true }) blockedAt?: string;
  @ApiProperty({ nullable: true }) archivedAt?: string;
  @ApiProperty({ nullable: true }) replacedAt?: string;
  @ApiProperty({ nullable: true }) previousCardNumber?: string;
  @ApiProperty() isDeleted!: boolean;
  @ApiProperty({ nullable: true }) qrPayload?: string;
  @ApiProperty({ type: [HealthCardHistoryItemDto], required: false }) history?: HealthCardHistoryItemDto[];
  @ApiProperty() createdAt!: string;
  @ApiProperty() updatedAt!: string;
}

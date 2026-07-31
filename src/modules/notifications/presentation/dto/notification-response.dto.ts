import { ApiProperty } from '@nestjs/swagger';

export class NotificationTemplateResponseDto {
  @ApiProperty() id!: string;
  @ApiProperty() code!: string;
  @ApiProperty() name!: string;
  @ApiProperty() subject!: string;
  @ApiProperty() body!: string;
  @ApiProperty() channel!: string;
  @ApiProperty({ nullable: true }) variables?: any;
  @ApiProperty() isActive!: boolean;
  @ApiProperty() version!: number;
  @ApiProperty() createdAt!: string;
  @ApiProperty() updatedAt!: string;
}

export class NotificationResponseDto {
  @ApiProperty() id!: string;
  @ApiProperty({ nullable: true }) recipientUserId?: string;
  @ApiProperty({ nullable: true }) recipientEmail?: string;
  @ApiProperty({ nullable: true }) recipientPhone?: string;
  @ApiProperty() title!: string;
  @ApiProperty() message!: string;
  @ApiProperty() notificationType!: string;
  @ApiProperty() priority!: string;
  @ApiProperty() channel!: string;
  @ApiProperty() status!: string;
  @ApiProperty({ nullable: true }) metadata?: any;
  @ApiProperty({ nullable: true }) scheduledAt?: string;
  @ApiProperty({ nullable: true }) sentAt?: string;
  @ApiProperty({ nullable: true }) readAt?: string;
  @ApiProperty() createdAt!: string;
  @ApiProperty() updatedAt!: string;
}

export class NotificationPreferenceResponseDto {
  @ApiProperty() id!: string;
  @ApiProperty() userId!: string;
  @ApiProperty() emailEnabled!: boolean;
  @ApiProperty() smsEnabled!: boolean;
  @ApiProperty() pushEnabled!: boolean;
  @ApiProperty() inAppEnabled!: boolean;
  @ApiProperty() webhookEnabled!: boolean;
  @ApiProperty() createdAt!: string;
  @ApiProperty() updatedAt!: string;
}

export class NotificationQueueResponseDto {
  @ApiProperty() id!: string;
  @ApiProperty() notificationId!: string;
  @ApiProperty() attempt!: number;
  @ApiProperty() status!: string;
  @ApiProperty({ nullable: true }) nextRetryAt?: string;
  @ApiProperty({ nullable: true }) lastError?: string;
  @ApiProperty({ type: NotificationResponseDto, nullable: true }) notification?: NotificationResponseDto;
  @ApiProperty() createdAt!: string;
}

export class NotificationAuditLogResponseDto {
  @ApiProperty() id!: string;
  @ApiProperty({ nullable: true }) notificationId?: string;
  @ApiProperty() action!: string;
  @ApiProperty({ nullable: true }) performedBy?: string;
  @ApiProperty({ nullable: true }) details?: string;
  @ApiProperty() createdAt!: string;
}

export class NotificationDashboardResponseDto {
  @ApiProperty() totalNotifications!: number;
  @ApiProperty() pendingCount!: number;
  @ApiProperty() sentCount!: number;
  @ApiProperty() deliveredCount!: number;
  @ApiProperty() failedCount!: number;
  @ApiProperty() readCount!: number;
  @ApiProperty() activeTemplatesCount!: number;
  @ApiProperty() queuePendingCount!: number;
}

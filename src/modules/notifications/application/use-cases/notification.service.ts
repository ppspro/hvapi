import { Injectable, NotFoundException, ConflictException, Inject } from '@nestjs/common';
import { INotificationRepository } from '../../domain/repositories/notification.repository.interface';
import {
  NotificationTemplateResponseDto, NotificationResponseDto, NotificationPreferenceResponseDto,
  NotificationQueueResponseDto, NotificationAuditLogResponseDto, NotificationDashboardResponseDto,
} from '../../presentation/dto/notification-response.dto';
import {
  CreateTemplateDto, UpdateTemplateDto, CreateNotificationDto,
  UpdateNotificationPreferenceDto, RetryQueueDto,
} from '../../presentation/dto/notification-enterprise.dto';
import { Logger } from 'nestjs-pino';

@Injectable()
export class NotificationService {
  constructor(
    @Inject('INotificationRepository')
    private readonly notificationRepository: INotificationRepository,
    private readonly logger: Logger,
  ) {}

  // ─── Dashboard ─────────────────────────────────────────────────────────

  async getDashboardStats(): Promise<NotificationDashboardResponseDto> {
    return this.notificationRepository.getDashboardStats();
  }

  // ─── Templates ───────────────────────────────────────────────────────────

  async createTemplate(userId: string, dto: CreateTemplateDto): Promise<NotificationTemplateResponseDto> {
    const existing = await this.notificationRepository.findTemplateByCode(dto.code);
    if (existing) {
      throw new ConflictException(`Notification template code '${dto.code}' already exists`);
    }

    const template = await this.notificationRepository.createTemplate(dto);
    await this.notificationRepository.createAuditLog({
      action: 'TEMPLATE_CREATED',
      performedBy: userId,
      details: `Created notification template: ${template.name} (${template.code})`,
    });

    return this.mapTemplate(template);
  }

  async getTemplates(): Promise<NotificationTemplateResponseDto[]> {
    const templates = await this.notificationRepository.findTemplates();
    return templates.map((t) => this.mapTemplate(t));
  }

  async getTemplateById(id: string): Promise<NotificationTemplateResponseDto> {
    const template = await this.notificationRepository.findTemplateById(id);
    if (!template) throw new NotFoundException('Notification template not found');
    return this.mapTemplate(template);
  }

  async updateTemplate(id: string, dto: UpdateTemplateDto, userId: string): Promise<NotificationTemplateResponseDto> {
    const template = await this.notificationRepository.findTemplateById(id);
    if (!template) throw new NotFoundException('Notification template not found');

    const updated = await this.notificationRepository.updateTemplate(id, dto);
    await this.notificationRepository.createAuditLog({
      action: 'TEMPLATE_UPDATED',
      performedBy: userId,
      details: `Updated template ${id} to version ${updated.version}`,
    });

    return this.mapTemplate(updated);
  }

  async softDeleteTemplate(id: string, userId: string): Promise<{ message: string }> {
    const template = await this.notificationRepository.findTemplateById(id);
    if (!template) throw new NotFoundException('Notification template not found');

    await this.notificationRepository.softDeleteTemplate(id);
    await this.notificationRepository.createAuditLog({
      action: 'TEMPLATE_DELETED',
      performedBy: userId,
      details: `Soft-deleted template: ${template.name}`,
    });

    return { message: 'Notification template soft-deleted successfully' };
  }

  private mapTemplate(t: any): NotificationTemplateResponseDto {
    return {
      id: t.id,
      code: t.code,
      name: t.name,
      subject: t.subject,
      body: t.body,
      channel: t.channel,
      variables: t.variables ? JSON.parse(t.variables) : undefined,
      isActive: t.isActive,
      version: t.version,
      createdAt: t.createdAt.toISOString(),
      updatedAt: t.updatedAt.toISOString(),
    };
  }

  // ─── Notifications ───────────────────────────────────────────────────────

  async createNotification(userId: string, dto: CreateNotificationDto): Promise<NotificationResponseDto> {
    // Check recipient preferences if recipientUserId provided
    if (dto.recipientUserId) {
      const pref = await this.notificationRepository.getPreferenceByUserId(dto.recipientUserId);
      if (pref) {
        const channel = (dto.channel || 'IN_APP').toUpperCase();
        if (channel === 'EMAIL' && !pref.emailEnabled) {
          this.logger.warn({ msg: 'Email notifications disabled for recipient', recipientUserId: dto.recipientUserId });
        }
      }
    }

    const notification = await this.notificationRepository.createNotification(dto);

    // Queue for delivery
    await this.notificationRepository.createQueueItem(notification.id, 1);
    await this.notificationRepository.updateNotificationStatus(notification.id, 'QUEUED');

    await this.notificationRepository.createAuditLog({
      notificationId: notification.id,
      action: 'NOTIFICATION_QUEUED',
      performedBy: userId,
      details: `Created & queued notification '${notification.title}' for channel ${notification.channel}`,
    });

    return this.mapNotification(notification);
  }

  async getNotifications(userId?: string, status?: string): Promise<NotificationResponseDto[]> {
    const notifications = await this.notificationRepository.findNotifications(userId, status);
    return notifications.map((n) => this.mapNotification(n));
  }

  async getNotificationById(id: string): Promise<NotificationResponseDto> {
    const notification = await this.notificationRepository.findNotificationById(id);
    if (!notification) throw new NotFoundException('Notification not found');
    return this.mapNotification(notification);
  }

  async markAsRead(id: string, userId: string): Promise<NotificationResponseDto> {
    const notification = await this.notificationRepository.findNotificationById(id);
    if (!notification) throw new NotFoundException('Notification not found');

    const updated = await this.notificationRepository.markAsRead(id);
    await this.notificationRepository.createAuditLog({
      notificationId: id,
      action: 'NOTIFICATION_READ',
      performedBy: userId,
      details: `Marked notification ${id} as READ`,
    });

    return this.mapNotification(updated);
  }

  async softDeleteNotification(id: string, userId: string): Promise<{ message: string }> {
    const notification = await this.notificationRepository.findNotificationById(id);
    if (!notification) throw new NotFoundException('Notification not found');

    await this.notificationRepository.softDeleteNotification(id);
    await this.notificationRepository.createAuditLog({
      notificationId: id,
      action: 'NOTIFICATION_DELETED',
      performedBy: userId,
      details: `Soft-deleted notification ${id}`,
    });

    return { message: 'Notification soft-deleted successfully' };
  }

  private mapNotification(n: any): NotificationResponseDto {
    return {
      id: n.id,
      recipientUserId: n.recipientUserId || undefined,
      recipientEmail: n.recipientEmail || undefined,
      recipientPhone: n.recipientPhone || undefined,
      title: n.title,
      message: n.message,
      notificationType: n.notificationType,
      priority: n.priority,
      channel: n.channel,
      status: n.status,
      metadata: n.metadata ? JSON.parse(n.metadata) : undefined,
      scheduledAt: n.scheduledAt ? n.scheduledAt.toISOString() : undefined,
      sentAt: n.sentAt ? n.sentAt.toISOString() : undefined,
      readAt: n.readAt ? n.readAt.toISOString() : undefined,
      createdAt: n.createdAt.toISOString(),
      updatedAt: n.updatedAt.toISOString(),
    };
  }

  // ─── Preferences ─────────────────────────────────────────────────────────

  async getPreferences(userId: string): Promise<NotificationPreferenceResponseDto> {
    let pref = await this.notificationRepository.getPreferenceByUserId(userId);
    if (!pref) {
      pref = await this.notificationRepository.upsertPreference(userId, {});
    }
    return {
      id: pref.id,
      userId: pref.userId,
      emailEnabled: pref.emailEnabled,
      smsEnabled: pref.smsEnabled,
      pushEnabled: pref.pushEnabled,
      inAppEnabled: pref.inAppEnabled,
      webhookEnabled: pref.webhookEnabled,
      createdAt: pref.createdAt.toISOString(),
      updatedAt: pref.updatedAt.toISOString(),
    };
  }

  async updatePreferences(userId: string, dto: UpdateNotificationPreferenceDto): Promise<NotificationPreferenceResponseDto> {
    const updated = await this.notificationRepository.upsertPreference(userId, dto);
    await this.notificationRepository.createAuditLog({
      action: 'PREFERENCES_UPDATED',
      performedBy: userId,
      details: `Updated notification preferences for user ${userId}`,
    });
    return {
      id: updated.id,
      userId: updated.userId,
      emailEnabled: updated.emailEnabled,
      smsEnabled: updated.smsEnabled,
      pushEnabled: updated.pushEnabled,
      inAppEnabled: updated.inAppEnabled,
      webhookEnabled: updated.webhookEnabled,
      createdAt: updated.createdAt.toISOString(),
      updatedAt: updated.updatedAt.toISOString(),
    };
  }

  // ─── Queue Operations ───────────────────────────────────────────────────

  async getPendingQueueItems(): Promise<NotificationQueueResponseDto[]> {
    const items = await this.notificationRepository.findPendingQueueItems(50);
    return items.map((q) => ({
      id: q.id,
      notificationId: q.notificationId,
      attempt: q.attempt,
      status: q.status,
      nextRetryAt: q.nextRetryAt ? q.nextRetryAt.toISOString() : undefined,
      lastError: q.lastError || undefined,
      notification: q.notification ? this.mapNotification(q.notification) : undefined,
      createdAt: q.createdAt.toISOString(),
    }));
  }

  async retryQueue(dto: RetryQueueDto, userId: string): Promise<{ retried: number }> {
    const pending = await this.notificationRepository.findPendingQueueItems(20);
    let retried = 0;

    for (const item of pending) {
      if (dto.queueItemId && item.id !== dto.queueItemId) continue;

      const nextAttempt = item.attempt + 1;
      await this.notificationRepository.updateQueueItem(item.id, 'QUEUED', nextAttempt, undefined, new Date(Date.now() + 60000));
      await this.notificationRepository.updateNotificationStatus(item.notificationId, 'SENT', new Date());
      retried++;

      await this.notificationRepository.createAuditLog({
        notificationId: item.notificationId,
        action: 'QUEUE_RETRY',
        performedBy: userId,
        details: `Retried delivery attempt ${nextAttempt} for queue item ${item.id}`,
      });
    }

    return { retried };
  }

  // ─── Audit ───────────────────────────────────────────────────────────────

  async getAuditLogs(): Promise<NotificationAuditLogResponseDto[]> {
    const logs = await this.notificationRepository.findAuditLogs(100);
    return logs.map((l) => ({
      id: l.id,
      notificationId: l.notificationId || undefined,
      action: l.action,
      performedBy: l.performedBy || undefined,
      details: l.details || undefined,
      createdAt: l.createdAt.toISOString(),
    }));
  }
}

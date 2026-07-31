import { Injectable } from '@nestjs/common';
import { DatabaseService } from '@database/database.service';
import { INotificationRepository } from '../../domain/repositories/notification.repository.interface';
import {
  NotificationTemplateEntity, NotificationEntity, NotificationPreferenceEntity,
  NotificationQueueEntity, NotificationAuditLogEntity,
} from '../../domain/entities/notification.entity';

@Injectable()
export class NotificationRepository implements INotificationRepository {
  constructor(private readonly db: DatabaseService) {}

  // ─── Templates ───────────────────────────────────────────────────────────

  async createTemplate(data: any): Promise<NotificationTemplateEntity> {
    return (await this.db.notificationTemplate.create({
      data: {
        code: data.code,
        name: data.name,
        subject: data.subject,
        body: data.body,
        channel: (data.channel as any) || 'IN_APP',
        variables: data.variables ? JSON.stringify(data.variables) : null,
        isActive: data.isActive ?? true,
      },
    })) as unknown as NotificationTemplateEntity;
  }

  async findTemplates(): Promise<NotificationTemplateEntity[]> {
    return (await this.db.notificationTemplate.findMany({
      where: { isDeleted: false },
      orderBy: { createdAt: 'desc' },
    })) as unknown as NotificationTemplateEntity[];
  }

  async findTemplateByCode(code: string): Promise<NotificationTemplateEntity | null> {
    return (await this.db.notificationTemplate.findFirst({
      where: { code, isDeleted: false },
    })) as unknown as NotificationTemplateEntity | null;
  }

  async findTemplateById(id: string): Promise<NotificationTemplateEntity | null> {
    return (await this.db.notificationTemplate.findFirst({
      where: { id, isDeleted: false },
    })) as unknown as NotificationTemplateEntity | null;
  }

  async updateTemplate(id: string, data: any): Promise<NotificationTemplateEntity> {
    const existing = await this.db.notificationTemplate.findUnique({ where: { id } });
    return (await this.db.notificationTemplate.update({
      where: { id },
      data: {
        name: data.name || undefined,
        subject: data.subject || undefined,
        body: data.body || undefined,
        channel: data.channel as any || undefined,
        variables: data.variables ? JSON.stringify(data.variables) : undefined,
        isActive: data.isActive ?? undefined,
        version: (existing?.version || 1) + 1,
      },
    })) as unknown as NotificationTemplateEntity;
  }

  async softDeleteTemplate(id: string): Promise<void> {
    await this.db.notificationTemplate.update({
      where: { id },
      data: { isDeleted: true, deletedAt: new Date() },
    });
  }

  // ─── Notifications ───────────────────────────────────────────────────────

  async createNotification(data: any): Promise<NotificationEntity> {
    return (await this.db.notification.create({
      data: {
        recipientUserId: data.recipientUserId || null,
        recipientEmail: data.recipientEmail || null,
        recipientPhone: data.recipientPhone || null,
        title: data.title,
        message: data.message,
        notificationType: (data.notificationType as any) || 'GENERAL',
        priority: (data.priority as any) || 'NORMAL',
        channel: (data.channel as any) || 'IN_APP',
        status: (data.status as any) || 'PENDING',
        metadata: data.metadata ? JSON.stringify(data.metadata) : null,
        scheduledAt: data.scheduledAt ? new Date(data.scheduledAt) : null,
      },
    })) as unknown as NotificationEntity;
  }

  async findNotifications(recipientUserId?: string, status?: string): Promise<NotificationEntity[]> {
    return (await this.db.notification.findMany({
      where: {
        isDeleted: false,
        ...(recipientUserId ? { recipientUserId } : {}),
        ...(status ? { status: status as any } : {}),
      },
      orderBy: { createdAt: 'desc' },
    })) as unknown as NotificationEntity[];
  }

  async findNotificationById(id: string): Promise<NotificationEntity | null> {
    return (await this.db.notification.findFirst({
      where: { id, isDeleted: false },
    })) as unknown as NotificationEntity | null;
  }

  async markAsRead(id: string): Promise<NotificationEntity> {
    return (await this.db.notification.update({
      where: { id },
      data: {
        status: 'READ',
        readAt: new Date(),
      },
    })) as unknown as NotificationEntity;
  }

  async softDeleteNotification(id: string): Promise<void> {
    await this.db.notification.update({
      where: { id },
      data: { isDeleted: true, deletedAt: new Date() },
    });
  }

  async updateNotificationStatus(id: string, status: string, sentAt?: Date): Promise<NotificationEntity> {
    return (await this.db.notification.update({
      where: { id },
      data: {
        status: status as any,
        sentAt: sentAt || undefined,
      },
    })) as unknown as NotificationEntity;
  }

  // ─── Preferences ─────────────────────────────────────────────────────────

  async getPreferenceByUserId(userId: string): Promise<NotificationPreferenceEntity | null> {
    return (await this.db.notificationPreference.findUnique({
      where: { userId },
    })) as unknown as NotificationPreferenceEntity | null;
  }

  async upsertPreference(userId: string, data: any): Promise<NotificationPreferenceEntity> {
    return (await this.db.notificationPreference.upsert({
      where: { userId },
      update: {
        emailEnabled: data.emailEnabled ?? undefined,
        smsEnabled: data.smsEnabled ?? undefined,
        pushEnabled: data.pushEnabled ?? undefined,
        inAppEnabled: data.inAppEnabled ?? undefined,
        webhookEnabled: data.webhookEnabled ?? undefined,
      },
      create: {
        userId,
        emailEnabled: data.emailEnabled ?? true,
        smsEnabled: data.smsEnabled ?? true,
        pushEnabled: data.pushEnabled ?? true,
        inAppEnabled: data.inAppEnabled ?? true,
        webhookEnabled: data.webhookEnabled ?? false,
      },
    })) as unknown as NotificationPreferenceEntity;
  }

  // ─── Queue ───────────────────────────────────────────────────────────────

  async createQueueItem(notificationId: string, attempt = 1): Promise<NotificationQueueEntity> {
    return (await this.db.notificationQueue.create({
      data: {
        notificationId,
        attempt,
        status: 'QUEUED',
      },
      include: { notification: true },
    })) as unknown as NotificationQueueEntity;
  }

  async findPendingQueueItems(limit = 50): Promise<NotificationQueueEntity[]> {
    return (await this.db.notificationQueue.findMany({
      where: {
        status: { in: ['QUEUED', 'PENDING', 'FAILED'] },
      },
      include: { notification: true },
      orderBy: { createdAt: 'asc' },
      take: limit,
    })) as unknown as NotificationQueueEntity[];
  }

  async updateQueueItem(id: string, status: string, attempt: number, lastError?: string, nextRetryAt?: Date): Promise<NotificationQueueEntity> {
    return (await this.db.notificationQueue.update({
      where: { id },
      data: {
        status: status as any,
        attempt,
        lastError: lastError || undefined,
        nextRetryAt: nextRetryAt || undefined,
      },
      include: { notification: true },
    })) as unknown as NotificationQueueEntity;
  }

  // ─── Audit ───────────────────────────────────────────────────────────────

  async createAuditLog(data: { notificationId?: string; action: string; performedBy?: string; details?: string }): Promise<NotificationAuditLogEntity> {
    return (await this.db.notificationAuditLog.create({
      data: {
        notificationId: data.notificationId || null,
        action: data.action,
        performedBy: data.performedBy || null,
        details: data.details || null,
      },
    })) as unknown as NotificationAuditLogEntity;
  }

  async findAuditLogs(limit = 100): Promise<NotificationAuditLogEntity[]> {
    return (await this.db.notificationAuditLog.findMany({
      orderBy: { createdAt: 'desc' },
      take: limit,
    })) as unknown as NotificationAuditLogEntity[];
  }

  // ─── Dashboard Stats ─────────────────────────────────────────────────────

  async getDashboardStats() {
    const [
      totalNotifications,
      pendingCount,
      sentCount,
      deliveredCount,
      failedCount,
      readCount,
      activeTemplatesCount,
      queuePendingCount,
    ] = await Promise.all([
      this.db.notification.count({ where: { isDeleted: false } }),
      this.db.notification.count({ where: { isDeleted: false, status: 'PENDING' } }),
      this.db.notification.count({ where: { isDeleted: false, status: 'SENT' } }),
      this.db.notification.count({ where: { isDeleted: false, status: 'DELIVERED' } }),
      this.db.notification.count({ where: { isDeleted: false, status: 'FAILED' } }),
      this.db.notification.count({ where: { isDeleted: false, status: 'READ' } }),
      this.db.notificationTemplate.count({ where: { isDeleted: false, isActive: true } }),
      this.db.notificationQueue.count({ where: { status: { in: ['QUEUED', 'PENDING', 'FAILED'] } } }),
    ]);

    return {
      totalNotifications,
      pendingCount,
      sentCount,
      deliveredCount,
      failedCount,
      readCount,
      activeTemplatesCount,
      queuePendingCount,
    };
  }
}

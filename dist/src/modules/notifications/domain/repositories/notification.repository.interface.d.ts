import { NotificationTemplateEntity, NotificationEntity, NotificationPreferenceEntity, NotificationQueueEntity, NotificationAuditLogEntity } from '../entities/notification.entity';
export interface INotificationRepository {
    createTemplate(data: any): Promise<NotificationTemplateEntity>;
    findTemplates(): Promise<NotificationTemplateEntity[]>;
    findTemplateByCode(code: string): Promise<NotificationTemplateEntity | null>;
    findTemplateById(id: string): Promise<NotificationTemplateEntity | null>;
    updateTemplate(id: string, data: any): Promise<NotificationTemplateEntity>;
    softDeleteTemplate(id: string): Promise<void>;
    createNotification(data: any): Promise<NotificationEntity>;
    findNotifications(recipientUserId?: string, status?: string): Promise<NotificationEntity[]>;
    findNotificationById(id: string): Promise<NotificationEntity | null>;
    markAsRead(id: string): Promise<NotificationEntity>;
    softDeleteNotification(id: string): Promise<void>;
    updateNotificationStatus(id: string, status: string, sentAt?: Date): Promise<NotificationEntity>;
    getPreferenceByUserId(userId: string): Promise<NotificationPreferenceEntity | null>;
    upsertPreference(userId: string, data: any): Promise<NotificationPreferenceEntity>;
    createQueueItem(notificationId: string, attempt?: number): Promise<NotificationQueueEntity>;
    findPendingQueueItems(limit?: number): Promise<NotificationQueueEntity[]>;
    updateQueueItem(id: string, status: string, attempt: number, lastError?: string, nextRetryAt?: Date): Promise<NotificationQueueEntity>;
    createAuditLog(data: {
        notificationId?: string;
        action: string;
        performedBy?: string;
        details?: string;
    }): Promise<NotificationAuditLogEntity>;
    findAuditLogs(limit?: number): Promise<NotificationAuditLogEntity[]>;
    getDashboardStats(): Promise<{
        totalNotifications: number;
        pendingCount: number;
        sentCount: number;
        deliveredCount: number;
        failedCount: number;
        readCount: number;
        activeTemplatesCount: number;
        queuePendingCount: number;
    }>;
}

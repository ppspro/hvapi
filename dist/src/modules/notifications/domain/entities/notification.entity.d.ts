export declare class NotificationTemplateEntity {
    id: string;
    code: string;
    name: string;
    subject: string;
    body: string;
    channel: string;
    variables?: string | null;
    isActive: boolean;
    version: number;
    isDeleted: boolean;
    deletedAt?: Date | null;
    createdAt: Date;
    updatedAt: Date;
}
export declare class NotificationEntity {
    id: string;
    recipientUserId?: string | null;
    recipientEmail?: string | null;
    recipientPhone?: string | null;
    title: string;
    message: string;
    notificationType: string;
    priority: string;
    channel: string;
    status: string;
    metadata?: string | null;
    scheduledAt?: Date | null;
    sentAt?: Date | null;
    readAt?: Date | null;
    isDeleted: boolean;
    deletedAt?: Date | null;
    createdAt: Date;
    updatedAt: Date;
}
export declare class NotificationPreferenceEntity {
    id: string;
    userId: string;
    emailEnabled: boolean;
    smsEnabled: boolean;
    pushEnabled: boolean;
    inAppEnabled: boolean;
    webhookEnabled: boolean;
    createdAt: Date;
    updatedAt: Date;
}
export declare class NotificationQueueEntity {
    id: string;
    notificationId: string;
    attempt: number;
    status: string;
    nextRetryAt?: Date | null;
    lastError?: string | null;
    createdAt: Date;
    updatedAt: Date;
    notification?: NotificationEntity;
}
export declare class NotificationAuditLogEntity {
    id: string;
    notificationId?: string | null;
    action: string;
    performedBy?: string | null;
    details?: string | null;
    createdAt: Date;
}

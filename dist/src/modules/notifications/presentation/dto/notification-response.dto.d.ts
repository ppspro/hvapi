export declare class NotificationTemplateResponseDto {
    id: string;
    code: string;
    name: string;
    subject: string;
    body: string;
    channel: string;
    variables?: any;
    isActive: boolean;
    version: number;
    createdAt: string;
    updatedAt: string;
}
export declare class NotificationResponseDto {
    id: string;
    recipientUserId?: string;
    recipientEmail?: string;
    recipientPhone?: string;
    title: string;
    message: string;
    notificationType: string;
    priority: string;
    channel: string;
    status: string;
    metadata?: any;
    scheduledAt?: string;
    sentAt?: string;
    readAt?: string;
    createdAt: string;
    updatedAt: string;
}
export declare class NotificationPreferenceResponseDto {
    id: string;
    userId: string;
    emailEnabled: boolean;
    smsEnabled: boolean;
    pushEnabled: boolean;
    inAppEnabled: boolean;
    webhookEnabled: boolean;
    createdAt: string;
    updatedAt: string;
}
export declare class NotificationQueueResponseDto {
    id: string;
    notificationId: string;
    attempt: number;
    status: string;
    nextRetryAt?: string;
    lastError?: string;
    notification?: NotificationResponseDto;
    createdAt: string;
}
export declare class NotificationAuditLogResponseDto {
    id: string;
    notificationId?: string;
    action: string;
    performedBy?: string;
    details?: string;
    createdAt: string;
}
export declare class NotificationDashboardResponseDto {
    totalNotifications: number;
    pendingCount: number;
    sentCount: number;
    deliveredCount: number;
    failedCount: number;
    readCount: number;
    activeTemplatesCount: number;
    queuePendingCount: number;
}

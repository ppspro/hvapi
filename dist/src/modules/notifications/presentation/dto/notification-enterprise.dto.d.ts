export declare class CreateTemplateDto {
    code: string;
    name: string;
    subject: string;
    body: string;
    channel?: string;
    variables?: any;
    isActive?: boolean;
}
export declare class UpdateTemplateDto {
    subject?: string;
    body?: string;
    channel?: string;
    isActive?: boolean;
}
export declare class CreateNotificationDto {
    recipientUserId?: string;
    recipientEmail?: string;
    recipientPhone?: string;
    title: string;
    message: string;
    notificationType?: string;
    priority?: string;
    channel?: string;
    metadata?: any;
    scheduledAt?: string;
}
export declare class UpdateNotificationPreferenceDto {
    emailEnabled?: boolean;
    smsEnabled?: boolean;
    pushEnabled?: boolean;
    inAppEnabled?: boolean;
    webhookEnabled?: boolean;
}
export declare class RetryQueueDto {
    queueItemId?: string;
}

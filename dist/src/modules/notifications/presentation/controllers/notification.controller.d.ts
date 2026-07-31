import { NotificationService } from '../../application/use-cases/notification.service';
import { NotificationResponseDto, NotificationPreferenceResponseDto, NotificationQueueResponseDto, NotificationAuditLogResponseDto, NotificationDashboardResponseDto } from '../dto/notification-response.dto';
import { CreateNotificationDto, UpdateNotificationPreferenceDto, RetryQueueDto } from '../dto/notification-enterprise.dto';
export declare class NotificationController {
    private readonly notificationService;
    constructor(notificationService: NotificationService);
    getDashboardStats(): Promise<NotificationDashboardResponseDto>;
    createNotification(req: any, dto: CreateNotificationDto): Promise<NotificationResponseDto>;
    getNotifications(recipientUserId?: string, status?: string): Promise<NotificationResponseDto[]>;
    getNotificationById(id: string): Promise<NotificationResponseDto>;
    markAsRead(req: any, id: string): Promise<NotificationResponseDto>;
    softDeleteNotification(req: any, id: string): Promise<any>;
    getPreferences(req: any): Promise<NotificationPreferenceResponseDto>;
    updatePreferences(req: any, dto: UpdateNotificationPreferenceDto): Promise<NotificationPreferenceResponseDto>;
    getPendingQueueItems(): Promise<NotificationQueueResponseDto[]>;
    retryQueue(req: any, dto: RetryQueueDto): Promise<{
        retried: number;
    }>;
    getAuditLogs(): Promise<NotificationAuditLogResponseDto[]>;
}

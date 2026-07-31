import { INotificationRepository } from '../../domain/repositories/notification.repository.interface';
import { NotificationTemplateResponseDto, NotificationResponseDto, NotificationPreferenceResponseDto, NotificationQueueResponseDto, NotificationAuditLogResponseDto, NotificationDashboardResponseDto } from '../../presentation/dto/notification-response.dto';
import { CreateTemplateDto, UpdateTemplateDto, CreateNotificationDto, UpdateNotificationPreferenceDto, RetryQueueDto } from '../../presentation/dto/notification-enterprise.dto';
import { Logger } from 'nestjs-pino';
export declare class NotificationService {
    private readonly notificationRepository;
    private readonly logger;
    constructor(notificationRepository: INotificationRepository, logger: Logger);
    getDashboardStats(): Promise<NotificationDashboardResponseDto>;
    createTemplate(userId: string, dto: CreateTemplateDto): Promise<NotificationTemplateResponseDto>;
    getTemplates(): Promise<NotificationTemplateResponseDto[]>;
    getTemplateById(id: string): Promise<NotificationTemplateResponseDto>;
    updateTemplate(id: string, dto: UpdateTemplateDto, userId: string): Promise<NotificationTemplateResponseDto>;
    softDeleteTemplate(id: string, userId: string): Promise<{
        message: string;
    }>;
    private mapTemplate;
    createNotification(userId: string, dto: CreateNotificationDto): Promise<NotificationResponseDto>;
    getNotifications(userId?: string, status?: string): Promise<NotificationResponseDto[]>;
    getNotificationById(id: string): Promise<NotificationResponseDto>;
    markAsRead(id: string, userId: string): Promise<NotificationResponseDto>;
    softDeleteNotification(id: string, userId: string): Promise<{
        message: string;
    }>;
    private mapNotification;
    getPreferences(userId: string): Promise<NotificationPreferenceResponseDto>;
    updatePreferences(userId: string, dto: UpdateNotificationPreferenceDto): Promise<NotificationPreferenceResponseDto>;
    getPendingQueueItems(): Promise<NotificationQueueResponseDto[]>;
    retryQueue(dto: RetryQueueDto, userId: string): Promise<{
        retried: number;
    }>;
    getAuditLogs(): Promise<NotificationAuditLogResponseDto[]>;
}

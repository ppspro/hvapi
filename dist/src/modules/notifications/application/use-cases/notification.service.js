"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationService = void 0;
const common_1 = require("@nestjs/common");
const nestjs_pino_1 = require("nestjs-pino");
let NotificationService = class NotificationService {
    constructor(notificationRepository, logger) {
        this.notificationRepository = notificationRepository;
        this.logger = logger;
    }
    async getDashboardStats() {
        return this.notificationRepository.getDashboardStats();
    }
    async createTemplate(userId, dto) {
        const existing = await this.notificationRepository.findTemplateByCode(dto.code);
        if (existing) {
            throw new common_1.ConflictException(`Notification template code '${dto.code}' already exists`);
        }
        const template = await this.notificationRepository.createTemplate(dto);
        await this.notificationRepository.createAuditLog({
            action: 'TEMPLATE_CREATED',
            performedBy: userId,
            details: `Created notification template: ${template.name} (${template.code})`,
        });
        return this.mapTemplate(template);
    }
    async getTemplates() {
        const templates = await this.notificationRepository.findTemplates();
        return templates.map((t) => this.mapTemplate(t));
    }
    async getTemplateById(id) {
        const template = await this.notificationRepository.findTemplateById(id);
        if (!template)
            throw new common_1.NotFoundException('Notification template not found');
        return this.mapTemplate(template);
    }
    async updateTemplate(id, dto, userId) {
        const template = await this.notificationRepository.findTemplateById(id);
        if (!template)
            throw new common_1.NotFoundException('Notification template not found');
        const updated = await this.notificationRepository.updateTemplate(id, dto);
        await this.notificationRepository.createAuditLog({
            action: 'TEMPLATE_UPDATED',
            performedBy: userId,
            details: `Updated template ${id} to version ${updated.version}`,
        });
        return this.mapTemplate(updated);
    }
    async softDeleteTemplate(id, userId) {
        const template = await this.notificationRepository.findTemplateById(id);
        if (!template)
            throw new common_1.NotFoundException('Notification template not found');
        await this.notificationRepository.softDeleteTemplate(id);
        await this.notificationRepository.createAuditLog({
            action: 'TEMPLATE_DELETED',
            performedBy: userId,
            details: `Soft-deleted template: ${template.name}`,
        });
        return { message: 'Notification template soft-deleted successfully' };
    }
    mapTemplate(t) {
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
    async createNotification(userId, dto) {
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
    async getNotifications(userId, status) {
        const notifications = await this.notificationRepository.findNotifications(userId, status);
        return notifications.map((n) => this.mapNotification(n));
    }
    async getNotificationById(id) {
        const notification = await this.notificationRepository.findNotificationById(id);
        if (!notification)
            throw new common_1.NotFoundException('Notification not found');
        return this.mapNotification(notification);
    }
    async markAsRead(id, userId) {
        const notification = await this.notificationRepository.findNotificationById(id);
        if (!notification)
            throw new common_1.NotFoundException('Notification not found');
        const updated = await this.notificationRepository.markAsRead(id);
        await this.notificationRepository.createAuditLog({
            notificationId: id,
            action: 'NOTIFICATION_READ',
            performedBy: userId,
            details: `Marked notification ${id} as READ`,
        });
        return this.mapNotification(updated);
    }
    async softDeleteNotification(id, userId) {
        const notification = await this.notificationRepository.findNotificationById(id);
        if (!notification)
            throw new common_1.NotFoundException('Notification not found');
        await this.notificationRepository.softDeleteNotification(id);
        await this.notificationRepository.createAuditLog({
            notificationId: id,
            action: 'NOTIFICATION_DELETED',
            performedBy: userId,
            details: `Soft-deleted notification ${id}`,
        });
        return { message: 'Notification soft-deleted successfully' };
    }
    mapNotification(n) {
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
    async getPreferences(userId) {
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
    async updatePreferences(userId, dto) {
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
    async getPendingQueueItems() {
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
    async retryQueue(dto, userId) {
        const pending = await this.notificationRepository.findPendingQueueItems(20);
        let retried = 0;
        for (const item of pending) {
            if (dto.queueItemId && item.id !== dto.queueItemId)
                continue;
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
    async getAuditLogs() {
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
};
exports.NotificationService = NotificationService;
exports.NotificationService = NotificationService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('INotificationRepository')),
    __metadata("design:paramtypes", [Object, nestjs_pino_1.Logger])
], NotificationService);
//# sourceMappingURL=notification.service.js.map
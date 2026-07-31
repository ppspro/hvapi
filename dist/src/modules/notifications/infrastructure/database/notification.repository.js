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
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationRepository = void 0;
const common_1 = require("@nestjs/common");
const database_service_1 = require("../../../../database/database.service");
let NotificationRepository = class NotificationRepository {
    constructor(db) {
        this.db = db;
    }
    async createTemplate(data) {
        return (await this.db.notificationTemplate.create({
            data: {
                code: data.code,
                name: data.name,
                subject: data.subject,
                body: data.body,
                channel: data.channel || 'IN_APP',
                variables: data.variables ? JSON.stringify(data.variables) : null,
                isActive: data.isActive ?? true,
            },
        }));
    }
    async findTemplates() {
        return (await this.db.notificationTemplate.findMany({
            where: { isDeleted: false },
            orderBy: { createdAt: 'desc' },
        }));
    }
    async findTemplateByCode(code) {
        return (await this.db.notificationTemplate.findFirst({
            where: { code, isDeleted: false },
        }));
    }
    async findTemplateById(id) {
        return (await this.db.notificationTemplate.findFirst({
            where: { id, isDeleted: false },
        }));
    }
    async updateTemplate(id, data) {
        const existing = await this.db.notificationTemplate.findUnique({ where: { id } });
        return (await this.db.notificationTemplate.update({
            where: { id },
            data: {
                name: data.name || undefined,
                subject: data.subject || undefined,
                body: data.body || undefined,
                channel: data.channel || undefined,
                variables: data.variables ? JSON.stringify(data.variables) : undefined,
                isActive: data.isActive ?? undefined,
                version: (existing?.version || 1) + 1,
            },
        }));
    }
    async softDeleteTemplate(id) {
        await this.db.notificationTemplate.update({
            where: { id },
            data: { isDeleted: true, deletedAt: new Date() },
        });
    }
    async createNotification(data) {
        return (await this.db.notification.create({
            data: {
                recipientUserId: data.recipientUserId || null,
                recipientEmail: data.recipientEmail || null,
                recipientPhone: data.recipientPhone || null,
                title: data.title,
                message: data.message,
                notificationType: data.notificationType || 'GENERAL',
                priority: data.priority || 'NORMAL',
                channel: data.channel || 'IN_APP',
                status: data.status || 'PENDING',
                metadata: data.metadata ? JSON.stringify(data.metadata) : null,
                scheduledAt: data.scheduledAt ? new Date(data.scheduledAt) : null,
            },
        }));
    }
    async findNotifications(recipientUserId, status) {
        return (await this.db.notification.findMany({
            where: {
                isDeleted: false,
                ...(recipientUserId ? { recipientUserId } : {}),
                ...(status ? { status: status } : {}),
            },
            orderBy: { createdAt: 'desc' },
        }));
    }
    async findNotificationById(id) {
        return (await this.db.notification.findFirst({
            where: { id, isDeleted: false },
        }));
    }
    async markAsRead(id) {
        return (await this.db.notification.update({
            where: { id },
            data: {
                status: 'READ',
                readAt: new Date(),
            },
        }));
    }
    async softDeleteNotification(id) {
        await this.db.notification.update({
            where: { id },
            data: { isDeleted: true, deletedAt: new Date() },
        });
    }
    async updateNotificationStatus(id, status, sentAt) {
        return (await this.db.notification.update({
            where: { id },
            data: {
                status: status,
                sentAt: sentAt || undefined,
            },
        }));
    }
    async getPreferenceByUserId(userId) {
        return (await this.db.notificationPreference.findUnique({
            where: { userId },
        }));
    }
    async upsertPreference(userId, data) {
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
        }));
    }
    async createQueueItem(notificationId, attempt = 1) {
        return (await this.db.notificationQueue.create({
            data: {
                notificationId,
                attempt,
                status: 'QUEUED',
            },
            include: { notification: true },
        }));
    }
    async findPendingQueueItems(limit = 50) {
        return (await this.db.notificationQueue.findMany({
            where: {
                status: { in: ['QUEUED', 'PENDING', 'FAILED'] },
            },
            include: { notification: true },
            orderBy: { createdAt: 'asc' },
            take: limit,
        }));
    }
    async updateQueueItem(id, status, attempt, lastError, nextRetryAt) {
        return (await this.db.notificationQueue.update({
            where: { id },
            data: {
                status: status,
                attempt,
                lastError: lastError || undefined,
                nextRetryAt: nextRetryAt || undefined,
            },
            include: { notification: true },
        }));
    }
    async createAuditLog(data) {
        return (await this.db.notificationAuditLog.create({
            data: {
                notificationId: data.notificationId || null,
                action: data.action,
                performedBy: data.performedBy || null,
                details: data.details || null,
            },
        }));
    }
    async findAuditLogs(limit = 100) {
        return (await this.db.notificationAuditLog.findMany({
            orderBy: { createdAt: 'desc' },
            take: limit,
        }));
    }
    async getDashboardStats() {
        const [totalNotifications, pendingCount, sentCount, deliveredCount, failedCount, readCount, activeTemplatesCount, queuePendingCount,] = await Promise.all([
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
};
exports.NotificationRepository = NotificationRepository;
exports.NotificationRepository = NotificationRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [database_service_1.DatabaseService])
], NotificationRepository);
//# sourceMappingURL=notification.repository.js.map
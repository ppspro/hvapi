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
exports.NotificationController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const passport_1 = require("@nestjs/passport");
const notification_service_1 = require("../../application/use-cases/notification.service");
const notification_response_dto_1 = require("../dto/notification-response.dto");
const notification_enterprise_dto_1 = require("../dto/notification-enterprise.dto");
let NotificationController = class NotificationController {
    constructor(notificationService) {
        this.notificationService = notificationService;
    }
    async getDashboardStats() {
        return this.notificationService.getDashboardStats();
    }
    async createNotification(req, dto) {
        return this.notificationService.createNotification(req.user.userId, dto);
    }
    async getNotifications(recipientUserId, status) {
        return this.notificationService.getNotifications(recipientUserId, status);
    }
    async getNotificationById(id) {
        return this.notificationService.getNotificationById(id);
    }
    async markAsRead(req, id) {
        return this.notificationService.markAsRead(id, req.user.userId);
    }
    async softDeleteNotification(req, id) {
        return this.notificationService.softDeleteNotification(id, req.user.userId);
    }
    async getPreferences(req) {
        return this.notificationService.getPreferences(req.user.userId);
    }
    async updatePreferences(req, dto) {
        return this.notificationService.updatePreferences(req.user.userId, dto);
    }
    async getPendingQueueItems() {
        return this.notificationService.getPendingQueueItems();
    }
    async retryQueue(req, dto) {
        return this.notificationService.retryQueue(dto, req.user.userId);
    }
    async getAuditLogs() {
        return this.notificationService.getAuditLogs();
    }
};
exports.NotificationController = NotificationController;
__decorate([
    (0, common_1.Get)('dashboard/stats'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Get Enterprise Notification Platform stats & queue summary' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: notification_response_dto_1.NotificationDashboardResponseDto }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], NotificationController.prototype, "getDashboardStats", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, swagger_1.ApiOperation)({ summary: 'Publish/dispatch a notification across channels' }),
    (0, swagger_1.ApiResponse)({ status: 201, type: notification_response_dto_1.NotificationResponseDto }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, notification_enterprise_dto_1.CreateNotificationDto]),
    __metadata("design:returntype", Promise)
], NotificationController.prototype, "createNotification", null);
__decorate([
    (0, common_1.Get)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'List notifications for recipient or platform' }),
    (0, swagger_1.ApiQuery)({ name: 'recipientUserId', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'status', required: false, enum: ['PENDING', 'QUEUED', 'SENT', 'DELIVERED', 'FAILED', 'READ'] }),
    (0, swagger_1.ApiResponse)({ status: 200, type: [notification_response_dto_1.NotificationResponseDto] }),
    __param(0, (0, common_1.Query)('recipientUserId')),
    __param(1, (0, common_1.Query)('status')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], NotificationController.prototype, "getNotifications", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Get notification details by ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Notification ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: notification_response_dto_1.NotificationResponseDto }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], NotificationController.prototype, "getNotificationById", null);
__decorate([
    (0, common_1.Put)(':id/read'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Mark notification as READ' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Notification ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: notification_response_dto_1.NotificationResponseDto }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], NotificationController.prototype, "markAsRead", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Soft-delete a notification' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Notification ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Notification soft-deleted' }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], NotificationController.prototype, "softDeleteNotification", null);
__decorate([
    (0, common_1.Get)('preferences'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Get current user notification preferences' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: notification_response_dto_1.NotificationPreferenceResponseDto }),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], NotificationController.prototype, "getPreferences", null);
__decorate([
    (0, common_1.Put)('preferences'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Update current user notification channel preferences' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: notification_response_dto_1.NotificationPreferenceResponseDto }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, notification_enterprise_dto_1.UpdateNotificationPreferenceDto]),
    __metadata("design:returntype", Promise)
], NotificationController.prototype, "updatePreferences", null);
__decorate([
    (0, common_1.Get)('queue'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'List pending/queued notification delivery items' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: [notification_response_dto_1.NotificationQueueResponseDto] }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], NotificationController.prototype, "getPendingQueueItems", null);
__decorate([
    (0, common_1.Post)('queue/retry'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Retry queued/failed notification delivery attempts' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Retry execution result' }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, notification_enterprise_dto_1.RetryQueueDto]),
    __metadata("design:returntype", Promise)
], NotificationController.prototype, "retryQueue", null);
__decorate([
    (0, common_1.Get)('audit'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'List notification audit logs' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: [notification_response_dto_1.NotificationAuditLogResponseDto] }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], NotificationController.prototype, "getAuditLogs", null);
exports.NotificationController = NotificationController = __decorate([
    (0, swagger_1.ApiTags)('Notifications'),
    (0, common_1.Controller)('notifications'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, swagger_1.ApiBearerAuth)('JWT-Auth'),
    __metadata("design:paramtypes", [notification_service_1.NotificationService])
], NotificationController);
//# sourceMappingURL=notification.controller.js.map
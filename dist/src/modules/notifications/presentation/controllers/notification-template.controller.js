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
exports.NotificationTemplateController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const passport_1 = require("@nestjs/passport");
const notification_service_1 = require("../../application/use-cases/notification.service");
const notification_response_dto_1 = require("../dto/notification-response.dto");
const notification_enterprise_dto_1 = require("../dto/notification-enterprise.dto");
let NotificationTemplateController = class NotificationTemplateController {
    constructor(notificationService) {
        this.notificationService = notificationService;
    }
    async createTemplate(req, dto) {
        return this.notificationService.createTemplate(req.user.userId, dto);
    }
    async getTemplates() {
        return this.notificationService.getTemplates();
    }
    async getTemplateById(id) {
        return this.notificationService.getTemplateById(id);
    }
    async updateTemplate(req, id, dto) {
        return this.notificationService.updateTemplate(id, dto, req.user.userId);
    }
    async softDeleteTemplate(req, id) {
        return this.notificationService.softDeleteTemplate(id, req.user.userId);
    }
};
exports.NotificationTemplateController = NotificationTemplateController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new notification template with variable placeholders' }),
    (0, swagger_1.ApiResponse)({ status: 201, type: notification_response_dto_1.NotificationTemplateResponseDto }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, notification_enterprise_dto_1.CreateTemplateDto]),
    __metadata("design:returntype", Promise)
], NotificationTemplateController.prototype, "createTemplate", null);
__decorate([
    (0, common_1.Get)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'List all notification templates' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: [notification_response_dto_1.NotificationTemplateResponseDto] }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], NotificationTemplateController.prototype, "getTemplates", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Get notification template by ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Template ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: notification_response_dto_1.NotificationTemplateResponseDto }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], NotificationTemplateController.prototype, "getTemplateById", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Update template body or subject and increment version' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Template ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: notification_response_dto_1.NotificationTemplateResponseDto }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, notification_enterprise_dto_1.UpdateTemplateDto]),
    __metadata("design:returntype", Promise)
], NotificationTemplateController.prototype, "updateTemplate", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Soft-delete a notification template' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Template ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Template soft-deleted' }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], NotificationTemplateController.prototype, "softDeleteTemplate", null);
exports.NotificationTemplateController = NotificationTemplateController = __decorate([
    (0, swagger_1.ApiTags)('Notification Templates'),
    (0, common_1.Controller)('notifications/templates'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, swagger_1.ApiBearerAuth)('JWT-Auth'),
    __metadata("design:paramtypes", [notification_service_1.NotificationService])
], NotificationTemplateController);
//# sourceMappingURL=notification-template.controller.js.map
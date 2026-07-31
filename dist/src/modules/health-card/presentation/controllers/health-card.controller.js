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
exports.HealthCardController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const passport_1 = require("@nestjs/passport");
const health_card_service_1 = require("../../application/use-cases/health-card.service");
const issue_card_dto_1 = require("../dto/issue-card.dto");
const full_health_card_dto_1 = require("../dto/full-health-card.dto");
const verify_qr_dto_1 = require("../dto/verify-qr.dto");
let HealthCardController = class HealthCardController {
    constructor(healthCardService) {
        this.healthCardService = healthCardService;
    }
    async issueCard(req, dto) {
        return this.healthCardService.issueCard(req.user.userId, dto);
    }
    async getActiveCard(req) {
        return this.healthCardService.getActiveCard(req.user.userId);
    }
    async searchCards(query) {
        return this.healthCardService.searchCards(query);
    }
    async getCardById(req, id) {
        return this.healthCardService.getCardById(req.user.userId, id);
    }
    async updateCard(req, id, dto) {
        return this.healthCardService.updateCard(req.user.userId, id, dto);
    }
    async activateCard(req, id, dto) {
        return this.healthCardService.activateCard(req.user.userId, id, dto);
    }
    async deactivateCard(req, id, dto) {
        return this.healthCardService.deactivateCard(req.user.userId, id, dto);
    }
    async suspendCard(req, id, dto) {
        return this.healthCardService.suspendCard(req.user.userId, id, dto);
    }
    async blockCard(req, id, dto) {
        return this.healthCardService.blockCard(req.user.userId, id, dto);
    }
    async unblockCard(req, id, dto) {
        return this.healthCardService.unblockCard(req.user.userId, id, dto);
    }
    async replaceCard(req, id, dto) {
        return this.healthCardService.replaceCard(req.user.userId, id, dto);
    }
    async renewCard(req, id, dto) {
        return this.healthCardService.renewCard(req.user.userId, id, dto);
    }
    async archiveCard(req, id, dto) {
        return this.healthCardService.archiveCard(req.user.userId, id, dto);
    }
    async restoreCard(req, id, dto) {
        return this.healthCardService.restoreCard(req.user.userId, id, dto);
    }
    async getCardHistory(req, id) {
        return this.healthCardService.getCardHistory(req.user.userId, id);
    }
    async verifyQr(req, dto) {
        return this.healthCardService.verifyQr(dto, req.user.userId);
    }
};
exports.HealthCardController = HealthCardController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, swagger_1.ApiOperation)({ summary: 'Issue a new Health Card for authenticated patient' }),
    (0, swagger_1.ApiResponse)({ status: 201, type: full_health_card_dto_1.FullHealthCardResponseDto }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, issue_card_dto_1.IssueCardDto]),
    __metadata("design:returntype", Promise)
], HealthCardController.prototype, "issueCard", null);
__decorate([
    (0, common_1.Get)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Get active Health Card details for current patient' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: full_health_card_dto_1.FullHealthCardResponseDto }),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], HealthCardController.prototype, "getActiveCard", null);
__decorate([
    (0, common_1.Get)('search'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Search Health Cards by card number or patient name' }),
    (0, swagger_1.ApiQuery)({ name: 'q', required: true, description: 'Search term' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: [full_health_card_dto_1.FullHealthCardResponseDto] }),
    __param(0, (0, common_1.Query)('q')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], HealthCardController.prototype, "searchCards", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Get specific Health Card details by ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Health Card ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: full_health_card_dto_1.FullHealthCardResponseDto }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], HealthCardController.prototype, "getCardById", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Update Health Card emergency flag or metadata' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Health Card ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: full_health_card_dto_1.FullHealthCardResponseDto }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, issue_card_dto_1.UpdateCardDto]),
    __metadata("design:returntype", Promise)
], HealthCardController.prototype, "updateCard", null);
__decorate([
    (0, common_1.Post)(':id/activate'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Activate an ISSUED or DEACTIVATED Health Card' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Health Card ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: full_health_card_dto_1.FullHealthCardResponseDto }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, issue_card_dto_1.CardActionDto]),
    __metadata("design:returntype", Promise)
], HealthCardController.prototype, "activateCard", null);
__decorate([
    (0, common_1.Post)(':id/deactivate'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Deactivate Health Card' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Health Card ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: full_health_card_dto_1.FullHealthCardResponseDto }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, issue_card_dto_1.CardActionDto]),
    __metadata("design:returntype", Promise)
], HealthCardController.prototype, "deactivateCard", null);
__decorate([
    (0, common_1.Post)(':id/suspend'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Suspend Health Card' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Health Card ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: full_health_card_dto_1.FullHealthCardResponseDto }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, issue_card_dto_1.CardActionDto]),
    __metadata("design:returntype", Promise)
], HealthCardController.prototype, "suspendCard", null);
__decorate([
    (0, common_1.Post)(':id/block'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Block Health Card for security or lost card reasons' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Health Card ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: full_health_card_dto_1.FullHealthCardResponseDto }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, issue_card_dto_1.CardActionDto]),
    __metadata("design:returntype", Promise)
], HealthCardController.prototype, "blockCard", null);
__decorate([
    (0, common_1.Post)(':id/unblock'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Unblock a BLOCKED Health Card' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Health Card ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: full_health_card_dto_1.FullHealthCardResponseDto }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, issue_card_dto_1.CardActionDto]),
    __metadata("design:returntype", Promise)
], HealthCardController.prototype, "unblockCard", null);
__decorate([
    (0, common_1.Post)(':id/replace'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Replace Health Card — generates a new card number and increments version' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Health Card ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: full_health_card_dto_1.FullHealthCardResponseDto }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, issue_card_dto_1.CardActionDto]),
    __metadata("design:returntype", Promise)
], HealthCardController.prototype, "replaceCard", null);
__decorate([
    (0, common_1.Post)(':id/renew'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Renew Health Card — extends validity period by 1 year' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Health Card ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: full_health_card_dto_1.FullHealthCardResponseDto }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, issue_card_dto_1.CardActionDto]),
    __metadata("design:returntype", Promise)
], HealthCardController.prototype, "renewCard", null);
__decorate([
    (0, common_1.Post)(':id/archive'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Archive Health Card' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Health Card ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: full_health_card_dto_1.FullHealthCardResponseDto }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, issue_card_dto_1.CardActionDto]),
    __metadata("design:returntype", Promise)
], HealthCardController.prototype, "archiveCard", null);
__decorate([
    (0, common_1.Post)(':id/restore'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Restore an ARCHIVED Health Card' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Health Card ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: full_health_card_dto_1.FullHealthCardResponseDto }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, issue_card_dto_1.CardActionDto]),
    __metadata("design:returntype", Promise)
], HealthCardController.prototype, "restoreCard", null);
__decorate([
    (0, common_1.Get)(':id/history'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Get complete status lifecycle audit history for Health Card' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Health Card ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: [full_health_card_dto_1.HealthCardHistoryItemDto] }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], HealthCardController.prototype, "getCardHistory", null);
__decorate([
    (0, common_1.Post)('verify-qr'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Verify digital Health Card QR payload' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: verify_qr_dto_1.VerifyQrResponseDto }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, verify_qr_dto_1.VerifyQrDto]),
    __metadata("design:returntype", Promise)
], HealthCardController.prototype, "verifyQr", null);
exports.HealthCardController = HealthCardController = __decorate([
    (0, swagger_1.ApiTags)('Health Cards'),
    (0, common_1.Controller)('health-cards'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, swagger_1.ApiBearerAuth)('JWT-Auth'),
    __metadata("design:paramtypes", [health_card_service_1.HealthCardService])
], HealthCardController);
//# sourceMappingURL=health-card.controller.js.map
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
exports.QrController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const passport_1 = require("@nestjs/passport");
const qr_service_1 = require("../../application/use-cases/qr.service");
const generate_qr_dto_1 = require("../dto/generate-qr.dto");
const qr_response_dto_1 = require("../dto/qr-response.dto");
let QrController = class QrController {
    constructor(qrService) {
        this.qrService = qrService;
    }
    async createQr(req, dto) {
        return this.qrService.generateQr(req.user.userId, dto);
    }
    async generateQrAlias(req, dto) {
        return this.qrService.generateQr(req.user.userId, dto);
    }
    async verifyQr(req, dto) {
        return this.qrService.verifyQrPayload(dto, req.user.userId);
    }
    async rotateQrAlias(req, dto) {
        return this.qrService.rotateQr(req.user.userId, dto.id, { reason: dto.reason });
    }
    async rotateQr(req, id, dto) {
        return this.qrService.rotateQr(req.user.userId, id, dto);
    }
    async revokeQrAlias(req, dto) {
        return this.qrService.revokeQr(req.user.userId, dto.id, { reason: dto.reason });
    }
    async revokeQr(req, id, dto) {
        return this.qrService.revokeQr(req.user.userId, id, dto);
    }
    async restoreQr(req, id) {
        return this.qrService.restoreQr(req.user.userId, id);
    }
    async archiveQr(req, id) {
        return this.qrService.archiveQr(req.user.userId, id);
    }
    async getUserQrs(req, entityType) {
        return this.qrService.getUserQrs(req.user.userId, entityType);
    }
    async searchQrs(query) {
        return this.qrService.searchQrs(query);
    }
    async getAnalytics() {
        return this.qrService.getAnalytics();
    }
    async getQrById(req, id) {
        return this.qrService.getQrById(req.user.userId, id);
    }
    async updateQr(req, id, dto) {
        return this.qrService.updateQr(req.user.userId, id, dto);
    }
    async softDeleteQr(req, id) {
        return this.qrService.softDeleteQr(req.user.userId, id);
    }
    async getQrHistory(req, id) {
        return this.qrService.getQrHistory(req.user.userId, id);
    }
    async getQrScanLogs(req, id) {
        return this.qrService.getQrScanLogs(req.user.userId, id);
    }
    async bulkGenerate(req, dto) {
        return this.qrService.bulkGenerate(req.user.userId, dto);
    }
    async bulkRotate(req, dto) {
        return this.qrService.bulkRotate(req.user.userId, dto);
    }
    async bulkRevoke(req, dto) {
        return this.qrService.bulkRevoke(req.user.userId, dto);
    }
};
exports.QrController = QrController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, swagger_1.ApiOperation)({ summary: 'Generate a cryptographically signed QR token for any business entity' }),
    (0, swagger_1.ApiResponse)({ status: 201, type: qr_response_dto_1.QrResponseDto }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, generate_qr_dto_1.GenerateQrDto]),
    __metadata("design:returntype", Promise)
], QrController.prototype, "createQr", null);
__decorate([
    (0, common_1.Post)('generate'),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, swagger_1.ApiOperation)({ summary: 'Alias for generating a signed QR identity' }),
    (0, swagger_1.ApiResponse)({ status: 201, type: qr_response_dto_1.QrResponseDto }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, generate_qr_dto_1.GenerateQrDto]),
    __metadata("design:returntype", Promise)
], QrController.prototype, "generateQrAlias", null);
__decorate([
    (0, common_1.Post)('verify'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Verify QR token signature, check validity status, and log scan details' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: qr_response_dto_1.QrVerificationResultDto }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, generate_qr_dto_1.VerifyQrPayloadDto]),
    __metadata("design:returntype", Promise)
], QrController.prototype, "verifyQr", null);
__decorate([
    (0, common_1.Post)('rotate'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Rotate QR token by ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: qr_response_dto_1.QrResponseDto }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], QrController.prototype, "rotateQrAlias", null);
__decorate([
    (0, common_1.Post)(':id/rotate'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Rotate QR token (invalidates old token, generates new version)' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'QR Code ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: qr_response_dto_1.QrResponseDto }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, generate_qr_dto_1.RotateQrDto]),
    __metadata("design:returntype", Promise)
], QrController.prototype, "rotateQr", null);
__decorate([
    (0, common_1.Post)('revoke'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Revoke QR token by ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: qr_response_dto_1.QrResponseDto }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], QrController.prototype, "revokeQrAlias", null);
__decorate([
    (0, common_1.Post)(':id/revoke'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Revoke a QR token' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'QR Code ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: qr_response_dto_1.QrResponseDto }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, generate_qr_dto_1.RevokeQrDto]),
    __metadata("design:returntype", Promise)
], QrController.prototype, "revokeQr", null);
__decorate([
    (0, common_1.Post)(':id/restore'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Restore a revoked or archived QR token' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'QR Code ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: qr_response_dto_1.QrResponseDto }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], QrController.prototype, "restoreQr", null);
__decorate([
    (0, common_1.Post)(':id/archive'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Archive a QR token' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'QR Code ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: qr_response_dto_1.QrResponseDto }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], QrController.prototype, "archiveQr", null);
__decorate([
    (0, common_1.Get)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'List all QR tokens owned by current user (supports entityType filtering)' }),
    (0, swagger_1.ApiQuery)({ name: 'entityType', required: false }),
    (0, swagger_1.ApiResponse)({ status: 200, type: [qr_response_dto_1.QrResponseDto] }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)('entityType')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], QrController.prototype, "getUserQrs", null);
__decorate([
    (0, common_1.Get)('search'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Search QR tokens directory by token or entity ID' }),
    (0, swagger_1.ApiQuery)({ name: 'q', required: true }),
    (0, swagger_1.ApiResponse)({ status: 200, type: [qr_response_dto_1.QrResponseDto] }),
    __param(0, (0, common_1.Query)('q')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], QrController.prototype, "searchQrs", null);
__decorate([
    (0, common_1.Get)('statistics'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Get QR scan and usage analytics' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: qr_response_dto_1.QrAnalyticsResponseDto }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], QrController.prototype, "getAnalytics", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Get QR details by ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'QR Code ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: qr_response_dto_1.QrResponseDto }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], QrController.prototype, "getQrById", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Update QR code validity or parameters' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'QR Code ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: qr_response_dto_1.QrResponseDto }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, generate_qr_dto_1.UpdateQrDto]),
    __metadata("design:returntype", Promise)
], QrController.prototype, "updateQr", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Soft-delete a QR token' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'QR Code ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'QR Code soft-deleted' }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], QrController.prototype, "softDeleteQr", null);
__decorate([
    (0, common_1.Get)(':id/history'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Get complete status lifecycle history for a QR code' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'QR Code ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: [qr_response_dto_1.QrHistoryItemDto] }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], QrController.prototype, "getQrHistory", null);
__decorate([
    (0, common_1.Get)(':id/scans'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Get scan audit log history for a QR code' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'QR Code ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: [qr_response_dto_1.QrScanLogItemDto] }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], QrController.prototype, "getQrScanLogs", null);
__decorate([
    (0, common_1.Post)('bulk-generate'),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, swagger_1.ApiOperation)({ summary: 'Bulk generate QR tokens for multiple entities' }),
    (0, swagger_1.ApiResponse)({ status: 201, type: [qr_response_dto_1.QrResponseDto] }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, generate_qr_dto_1.BulkGenerateQrDto]),
    __metadata("design:returntype", Promise)
], QrController.prototype, "bulkGenerate", null);
__decorate([
    (0, common_1.Post)('bulk-rotate'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Bulk rotate multiple QR tokens' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Bulk rotation summary' }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, generate_qr_dto_1.BulkQrActionDto]),
    __metadata("design:returntype", Promise)
], QrController.prototype, "bulkRotate", null);
__decorate([
    (0, common_1.Post)('bulk-revoke'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Bulk revoke multiple QR tokens' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Bulk revocation summary' }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, generate_qr_dto_1.BulkQrActionDto]),
    __metadata("design:returntype", Promise)
], QrController.prototype, "bulkRevoke", null);
exports.QrController = QrController = __decorate([
    (0, swagger_1.ApiTags)('Enterprise QR Subsystem'),
    (0, common_1.Controller)('qr'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, swagger_1.ApiBearerAuth)('JWT-Auth'),
    __metadata("design:paramtypes", [qr_service_1.QrService])
], QrController);
//# sourceMappingURL=qr.controller.js.map
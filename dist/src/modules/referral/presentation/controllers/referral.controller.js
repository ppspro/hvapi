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
exports.ReferralController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const passport_1 = require("@nestjs/passport");
const referral_service_1 = require("../../application/use-cases/referral.service");
const referral_response_dto_1 = require("../dto/referral-response.dto");
const referral_enterprise_dto_1 = require("../dto/referral-enterprise.dto");
let ReferralController = class ReferralController {
    constructor(referralService) {
        this.referralService = referralService;
    }
    async createReferral(req, dto) {
        return this.referralService.createReferral(req.user.userId, dto);
    }
    async getReferrals(patientId, referringDoctorId, receivingDoctorId, receivingFacilityId, status, priority, page, limit) {
        return this.referralService.getReferrals({
            patientId, referringDoctorId, receivingDoctorId, receivingFacilityId, status, priority, page, limit,
        });
    }
    async getMyIncoming(req) {
        return this.referralService.getReferrals({ receivingDoctorId: req.user.userId });
    }
    async getMyOutgoing(req) {
        return this.referralService.getReferrals({ referringDoctorId: req.user.userId });
    }
    async getDashboardStats(facilityId) {
        return this.referralService.getDashboardStats(facilityId);
    }
    async getReferralById(id) {
        return this.referralService.getReferralById(id);
    }
    async triageReferral(req, id, dto) {
        return this.referralService.triageReferral(id, req.user.userId, dto);
    }
    async updateStatus(req, id, dto) {
        return this.referralService.updateStatus(id, req.user.userId, dto);
    }
    async addNote(req, id, dto) {
        const userRole = req.user.role || 'DOCTOR';
        return this.referralService.addNote(id, req.user.userId, userRole, dto);
    }
    async getNotes(id) {
        return this.referralService.getNotes(id);
    }
    async addAttachment(req, id, dto) {
        return this.referralService.addAttachment(id, req.user.userId, dto);
    }
    async getAttachments(id) {
        return this.referralService.getAttachments(id);
    }
    async getHistory(id) {
        return this.referralService.getHistory(id);
    }
    async softDeleteReferral(id) {
        return this.referralService.softDeleteReferral(id);
    }
};
exports.ReferralController = ReferralController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, swagger_1.ApiOperation)({ summary: 'Create patient care referral' }),
    (0, swagger_1.ApiResponse)({ status: 201, type: referral_response_dto_1.ReferralResponseDto }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, referral_enterprise_dto_1.CreateReferralDto]),
    __metadata("design:returntype", Promise)
], ReferralController.prototype, "createReferral", null);
__decorate([
    (0, common_1.Get)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'List patient care referrals with optional filters' }),
    (0, swagger_1.ApiQuery)({ name: 'patientId', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'referringDoctorId', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'receivingDoctorId', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'receivingFacilityId', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'status', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'priority', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'page', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'limit', required: false }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Paginated referral list' }),
    __param(0, (0, common_1.Query)('patientId')),
    __param(1, (0, common_1.Query)('referringDoctorId')),
    __param(2, (0, common_1.Query)('receivingDoctorId')),
    __param(3, (0, common_1.Query)('receivingFacilityId')),
    __param(4, (0, common_1.Query)('status')),
    __param(5, (0, common_1.Query)('priority')),
    __param(6, (0, common_1.Query)('page')),
    __param(7, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String, String, String, Number, Number]),
    __metadata("design:returntype", Promise)
], ReferralController.prototype, "getReferrals", null);
__decorate([
    (0, common_1.Get)('my-incoming'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'List incoming referrals for current doctor/facility' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Incoming referral list' }),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ReferralController.prototype, "getMyIncoming", null);
__decorate([
    (0, common_1.Get)('my-outgoing'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'List outgoing referrals created by current doctor' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Outgoing referral list' }),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ReferralController.prototype, "getMyOutgoing", null);
__decorate([
    (0, common_1.Get)('dashboard/stats'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Get referral dashboard metrics and SLA performance analytics' }),
    (0, swagger_1.ApiQuery)({ name: 'facilityId', required: false }),
    (0, swagger_1.ApiResponse)({ status: 200, type: referral_response_dto_1.ReferralDashboardStatsResponseDto }),
    __param(0, (0, common_1.Query)('facilityId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ReferralController.prototype, "getDashboardStats", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Get referral details by ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Referral ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: referral_response_dto_1.ReferralResponseDto }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ReferralController.prototype, "getReferralById", null);
__decorate([
    (0, common_1.Put)(':id/triage'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Triage patient referral (Approve/Decline/Redirect)' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Referral ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: referral_response_dto_1.ReferralResponseDto }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, referral_enterprise_dto_1.TriageReferralDto]),
    __metadata("design:returntype", Promise)
], ReferralController.prototype, "triageReferral", null);
__decorate([
    (0, common_1.Put)(':id/status'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Update referral status (IN_PROGRESS, COMPLETED, CANCELLED)' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Referral ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: referral_response_dto_1.ReferralResponseDto }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, referral_enterprise_dto_1.UpdateReferralStatusDto]),
    __metadata("design:returntype", Promise)
], ReferralController.prototype, "updateStatus", null);
__decorate([
    (0, common_1.Post)(':id/notes'),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, swagger_1.ApiOperation)({ summary: 'Add clinical coordination note to referral' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Referral ID' }),
    (0, swagger_1.ApiResponse)({ status: 201, type: referral_response_dto_1.ReferralNoteResponseDto }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, referral_enterprise_dto_1.AddReferralNoteDto]),
    __metadata("design:returntype", Promise)
], ReferralController.prototype, "addNote", null);
__decorate([
    (0, common_1.Get)(':id/notes'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'List clinical notes for referral' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Referral ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: [referral_response_dto_1.ReferralNoteResponseDto] }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ReferralController.prototype, "getNotes", null);
__decorate([
    (0, common_1.Post)(':id/attachments'),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, swagger_1.ApiOperation)({ summary: 'Link medical attachment to referral' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Referral ID' }),
    (0, swagger_1.ApiResponse)({ status: 201, type: referral_response_dto_1.ReferralAttachmentResponseDto }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, referral_enterprise_dto_1.AddReferralAttachmentDto]),
    __metadata("design:returntype", Promise)
], ReferralController.prototype, "addAttachment", null);
__decorate([
    (0, common_1.Get)(':id/attachments'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'List linked medical attachments for referral' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Referral ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: [referral_response_dto_1.ReferralAttachmentResponseDto] }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ReferralController.prototype, "getAttachments", null);
__decorate([
    (0, common_1.Get)(':id/history'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Get immutable status transition history for referral' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Referral ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: [referral_response_dto_1.ReferralStatusHistoryResponseDto] }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ReferralController.prototype, "getHistory", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Soft-delete referral' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Referral ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Referral soft-deleted' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ReferralController.prototype, "softDeleteReferral", null);
exports.ReferralController = ReferralController = __decorate([
    (0, swagger_1.ApiTags)('Referral & Care Coordination'),
    (0, common_1.Controller)('referrals'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, swagger_1.ApiBearerAuth)('JWT-Auth'),
    __metadata("design:paramtypes", [referral_service_1.ReferralService])
], ReferralController);
//# sourceMappingURL=referral.controller.js.map
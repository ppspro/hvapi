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
exports.FamilyController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const passport_1 = require("@nestjs/passport");
const family_service_1 = require("../../application/use-cases/family.service");
const invitation_dto_1 = require("../dto/invitation.dto");
const family_member_dto_1 = require("../dto/family-member.dto");
const guardian_dto_1 = require("../dto/guardian.dto");
const dependent_dto_1 = require("../dto/dependent.dto");
const consent_dto_1 = require("../dto/consent.dto");
let FamilyController = class FamilyController {
    constructor(familyService) {
        this.familyService = familyService;
    }
    async createInvitation(req, dto) {
        return this.familyService.createInvitation(req.user.userId, dto);
    }
    async resendInvitation(req, id) {
        return this.familyService.resendInvitation(req.user.userId, id);
    }
    async acceptInvitation(req, id) {
        return this.familyService.acceptInvitation(req.user.userId, id);
    }
    async rejectInvitation(req, id) {
        return this.familyService.rejectInvitation(req.user.userId, id);
    }
    async cancelInvitation(req, id) {
        return this.familyService.cancelInvitation(req.user.userId, id);
    }
    async getInvitations(req) {
        return this.familyService.getInvitations(req.user.userId);
    }
    async getFamilyMembers(req) {
        return this.familyService.getFamilyMembers(req.user.userId);
    }
    async getFamilyMemberById(req, id) {
        return this.familyService.getFamilyMemberById(req.user.userId, id);
    }
    async updateFamilyMember(req, id, dto) {
        return this.familyService.updateFamilyMember(req.user.userId, id, dto);
    }
    async removeFamilyMember(req, id) {
        return this.familyService.removeFamilyMember(req.user.userId, id);
    }
    async grantConsent(req, dto) {
        return this.familyService.grantConsent(req.user.userId, dto);
    }
    async updateConsent(req, id, dto) {
        return this.familyService.updateConsent(req.user.userId, id, dto);
    }
    async revokeConsent(req, id) {
        return this.familyService.revokeConsent(req.user.userId, id);
    }
    async getConsents(req) {
        return this.familyService.getConsents(req.user.userId);
    }
    async getConsentHistory(req) {
        return this.familyService.getConsentHistory(req.user.userId);
    }
    async getGuardians(req) {
        return this.familyService.getGuardians(req.user.userId);
    }
    async createGuardian(req, dto) {
        return this.familyService.createGuardian(req.user.userId, dto);
    }
    async updateGuardian(req, id, dto) {
        return this.familyService.updateGuardian(req.user.userId, id, dto);
    }
    async getDependents(req) {
        return this.familyService.getDependents(req.user.userId);
    }
    async createDependent(req, dto) {
        return this.familyService.createDependent(req.user.userId, dto);
    }
    async updateDependent(req, id, dto) {
        return this.familyService.updateDependent(req.user.userId, id, dto);
    }
    async removeDependent(req, id) {
        return this.familyService.removeDependent(req.user.userId, id);
    }
};
exports.FamilyController = FamilyController;
__decorate([
    (0, common_1.Post)('invitations'),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, swagger_1.ApiOperation)({ summary: 'Create a family invitation' }),
    (0, swagger_1.ApiResponse)({ status: 201, type: invitation_dto_1.InvitationResponseDto }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, invitation_dto_1.CreateInvitationDto]),
    __metadata("design:returntype", Promise)
], FamilyController.prototype, "createInvitation", null);
__decorate([
    (0, common_1.Post)('invitations/:id/resend'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Resend a pending family invitation (max 5 times)' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Invitation ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: invitation_dto_1.InvitationResponseDto }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], FamilyController.prototype, "resendInvitation", null);
__decorate([
    (0, common_1.Post)('invitations/:id/accept'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Accept a family invitation — auto-creates family member record' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Invitation ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Invitation accepted and family member created' }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], FamilyController.prototype, "acceptInvitation", null);
__decorate([
    (0, common_1.Post)('invitations/:id/reject'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Reject a family invitation' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Invitation ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Invitation rejected' }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], FamilyController.prototype, "rejectInvitation", null);
__decorate([
    (0, common_1.Delete)('invitations/:id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Cancel a pending family invitation' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Invitation ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Invitation cancelled' }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], FamilyController.prototype, "cancelInvitation", null);
__decorate([
    (0, common_1.Get)('invitations'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'List all invitations sent by the patient' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: [invitation_dto_1.InvitationResponseDto] }),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], FamilyController.prototype, "getInvitations", null);
__decorate([
    (0, common_1.Get)('members'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'List all active family members' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: [family_member_dto_1.FamilyMemberResponseDto] }),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], FamilyController.prototype, "getFamilyMembers", null);
__decorate([
    (0, common_1.Get)('members/:id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Get a specific family member' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Family Member ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: family_member_dto_1.FamilyMemberResponseDto }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], FamilyController.prototype, "getFamilyMemberById", null);
__decorate([
    (0, common_1.Patch)('members/:id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Update family member details or status' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Family Member ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: family_member_dto_1.FamilyMemberResponseDto }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, family_member_dto_1.UpdateFamilyMemberDto]),
    __metadata("design:returntype", Promise)
], FamilyController.prototype, "updateFamilyMember", null);
__decorate([
    (0, common_1.Delete)('members/:id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Remove (archive) a family member' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Family Member ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Family member removed' }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], FamilyController.prototype, "removeFamilyMember", null);
__decorate([
    (0, common_1.Post)('consents'),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, swagger_1.ApiOperation)({ summary: 'Grant a consent category to a family member' }),
    (0, swagger_1.ApiResponse)({ status: 201, type: consent_dto_1.ConsentRecordResponseDto }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, consent_dto_1.CreateConsentDto]),
    __metadata("design:returntype", Promise)
], FamilyController.prototype, "grantConsent", null);
__decorate([
    (0, common_1.Put)('consents/:id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Update consent (expiry date, notes)' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Consent Record ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: consent_dto_1.ConsentRecordResponseDto }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, consent_dto_1.UpdateConsentDto]),
    __metadata("design:returntype", Promise)
], FamilyController.prototype, "updateConsent", null);
__decorate([
    (0, common_1.Delete)('consents/:id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Revoke a granted consent — blocks access immediately' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Consent Record ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Consent revoked' }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], FamilyController.prototype, "revokeConsent", null);
__decorate([
    (0, common_1.Get)('consents'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'List all active consents granted by the patient' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: [consent_dto_1.ConsentRecordResponseDto] }),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], FamilyController.prototype, "getConsents", null);
__decorate([
    (0, common_1.Get)('consents/history'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Get full consent audit history for the patient' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: [consent_dto_1.ConsentHistoryResponseDto] }),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], FamilyController.prototype, "getConsentHistory", null);
__decorate([
    (0, common_1.Get)('guardians'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'List all guardians assigned to the patient' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: [family_member_dto_1.FamilyMemberResponseDto] }),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], FamilyController.prototype, "getGuardians", null);
__decorate([
    (0, common_1.Post)('guardians'),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, swagger_1.ApiOperation)({ summary: 'Assign a guardian to the patient' }),
    (0, swagger_1.ApiResponse)({ status: 201, type: family_member_dto_1.FamilyMemberResponseDto }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, guardian_dto_1.CreateGuardianDto]),
    __metadata("design:returntype", Promise)
], FamilyController.prototype, "createGuardian", null);
__decorate([
    (0, common_1.Patch)('guardians/:id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Update guardian verification status or primary flag' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Guardian (FamilyMember) ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: family_member_dto_1.FamilyMemberResponseDto }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, guardian_dto_1.UpdateGuardianDto]),
    __metadata("design:returntype", Promise)
], FamilyController.prototype, "updateGuardian", null);
__decorate([
    (0, common_1.Get)('dependents'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'List all dependents registered under this patient' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: [family_member_dto_1.FamilyMemberResponseDto] }),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], FamilyController.prototype, "getDependents", null);
__decorate([
    (0, common_1.Post)('dependents'),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, swagger_1.ApiOperation)({ summary: 'Register a dependent (minor, senior, or care patient)' }),
    (0, swagger_1.ApiResponse)({ status: 201, type: family_member_dto_1.FamilyMemberResponseDto }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, dependent_dto_1.CreateDependentDto]),
    __metadata("design:returntype", Promise)
], FamilyController.prototype, "createDependent", null);
__decorate([
    (0, common_1.Patch)('dependents/:id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Update dependent details' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Dependent (FamilyMember) ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: family_member_dto_1.FamilyMemberResponseDto }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, dependent_dto_1.UpdateDependentDto]),
    __metadata("design:returntype", Promise)
], FamilyController.prototype, "updateDependent", null);
__decorate([
    (0, common_1.Delete)('dependents/:id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Remove a dependent' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Dependent (FamilyMember) ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Dependent removed' }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], FamilyController.prototype, "removeDependent", null);
exports.FamilyController = FamilyController = __decorate([
    (0, swagger_1.ApiTags)('Family'),
    (0, common_1.Controller)('family'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, swagger_1.ApiBearerAuth)('JWT-Auth'),
    __metadata("design:paramtypes", [family_service_1.FamilyService])
], FamilyController);
//# sourceMappingURL=family.controller.js.map
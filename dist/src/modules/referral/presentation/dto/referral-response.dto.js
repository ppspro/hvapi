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
exports.ReferralDashboardStatsResponseDto = exports.ReferralResponseDto = exports.ReferralStatusHistoryResponseDto = exports.ReferralAttachmentResponseDto = exports.ReferralNoteResponseDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class ReferralNoteResponseDto {
}
exports.ReferralNoteResponseDto = ReferralNoteResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], ReferralNoteResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], ReferralNoteResponseDto.prototype, "referralId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], ReferralNoteResponseDto.prototype, "authorId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], ReferralNoteResponseDto.prototype, "authorRole", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], ReferralNoteResponseDto.prototype, "noteText", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Boolean)
], ReferralNoteResponseDto.prototype, "isPrivate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], ReferralNoteResponseDto.prototype, "createdAt", void 0);
class ReferralAttachmentResponseDto {
}
exports.ReferralAttachmentResponseDto = ReferralAttachmentResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], ReferralAttachmentResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], ReferralAttachmentResponseDto.prototype, "referralId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], ReferralAttachmentResponseDto.prototype, "attachmentId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], ReferralAttachmentResponseDto.prototype, "attachedBy", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], ReferralAttachmentResponseDto.prototype, "createdAt", void 0);
class ReferralStatusHistoryResponseDto {
}
exports.ReferralStatusHistoryResponseDto = ReferralStatusHistoryResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], ReferralStatusHistoryResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], ReferralStatusHistoryResponseDto.prototype, "referralId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true }),
    __metadata("design:type", String)
], ReferralStatusHistoryResponseDto.prototype, "fromStatus", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], ReferralStatusHistoryResponseDto.prototype, "toStatus", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], ReferralStatusHistoryResponseDto.prototype, "changedBy", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true }),
    __metadata("design:type", String)
], ReferralStatusHistoryResponseDto.prototype, "reason", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], ReferralStatusHistoryResponseDto.prototype, "createdAt", void 0);
class ReferralResponseDto {
}
exports.ReferralResponseDto = ReferralResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], ReferralResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], ReferralResponseDto.prototype, "referralNumber", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], ReferralResponseDto.prototype, "patientId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], ReferralResponseDto.prototype, "referringDoctorId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], ReferralResponseDto.prototype, "referringFacilityId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true }),
    __metadata("design:type", String)
], ReferralResponseDto.prototype, "receivingDoctorId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], ReferralResponseDto.prototype, "receivingFacilityId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true }),
    __metadata("design:type", String)
], ReferralResponseDto.prototype, "medicalRecordId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], ReferralResponseDto.prototype, "referralType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], ReferralResponseDto.prototype, "priority", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], ReferralResponseDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], ReferralResponseDto.prototype, "reasonForReferral", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true }),
    __metadata("design:type", String)
], ReferralResponseDto.prototype, "clinicalSummary", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true }),
    __metadata("design:type", String)
], ReferralResponseDto.prototype, "specialtyRequired", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true }),
    __metadata("design:type", String)
], ReferralResponseDto.prototype, "expiresAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true }),
    __metadata("design:type", String)
], ReferralResponseDto.prototype, "acceptedAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true }),
    __metadata("design:type", String)
], ReferralResponseDto.prototype, "completedAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true }),
    __metadata("design:type", String)
], ReferralResponseDto.prototype, "rejectedAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true }),
    __metadata("design:type", String)
], ReferralResponseDto.prototype, "rejectionReason", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], ReferralResponseDto.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], ReferralResponseDto.prototype, "updatedAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [ReferralNoteResponseDto], required: false }),
    __metadata("design:type", Array)
], ReferralResponseDto.prototype, "notes", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [ReferralAttachmentResponseDto], required: false }),
    __metadata("design:type", Array)
], ReferralResponseDto.prototype, "attachments", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [ReferralStatusHistoryResponseDto], required: false }),
    __metadata("design:type", Array)
], ReferralResponseDto.prototype, "statusHistory", void 0);
class ReferralDashboardStatsResponseDto {
}
exports.ReferralDashboardStatsResponseDto = ReferralDashboardStatsResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], ReferralDashboardStatsResponseDto.prototype, "totalReferrals", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], ReferralDashboardStatsResponseDto.prototype, "pendingTriageCount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], ReferralDashboardStatsResponseDto.prototype, "acceptedCount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], ReferralDashboardStatsResponseDto.prototype, "completedCount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], ReferralDashboardStatsResponseDto.prototype, "avgCompletionTimeHours", void 0);
//# sourceMappingURL=referral-response.dto.js.map
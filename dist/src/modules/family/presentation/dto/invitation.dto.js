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
exports.InvitationResponseDto = exports.CreateInvitationDto = exports.FamilyRelationshipType = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
var FamilyRelationshipType;
(function (FamilyRelationshipType) {
    FamilyRelationshipType["GUARDIAN"] = "GUARDIAN";
    FamilyRelationshipType["DEPENDENT"] = "DEPENDENT";
    FamilyRelationshipType["PARENT"] = "PARENT";
    FamilyRelationshipType["CHILD"] = "CHILD";
    FamilyRelationshipType["SPOUSE"] = "SPOUSE";
    FamilyRelationshipType["SIBLING"] = "SIBLING";
    FamilyRelationshipType["CAREGIVER"] = "CAREGIVER";
    FamilyRelationshipType["OTHER"] = "OTHER";
})(FamilyRelationshipType || (exports.FamilyRelationshipType = FamilyRelationshipType = {}));
class CreateInvitationDto {
}
exports.CreateInvitationDto = CreateInvitationDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: '+923001234567', description: 'Invitee phone number (E.164 format)' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Matches)(/^\+[1-9]\d{1,14}$/, { message: 'Phone number must follow E.164 format (e.g. +923001234567)' }),
    __metadata("design:type", String)
], CreateInvitationDto.prototype, "inviteePhone", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Jane Doe', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateInvitationDto.prototype, "inviteeName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Spouse', description: 'Relationship label' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateInvitationDto.prototype, "relationship", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: FamilyRelationshipType, example: 'SPOUSE', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(FamilyRelationshipType),
    __metadata("design:type", String)
], CreateInvitationDto.prototype, "relationshipType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2027-01-01', description: 'Optional expiry date for invitation', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], CreateInvitationDto.prototype, "expiresAt", void 0);
class InvitationResponseDto {
}
exports.InvitationResponseDto = InvitationResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], InvitationResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], InvitationResponseDto.prototype, "inviteePhone", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true }),
    __metadata("design:type", String)
], InvitationResponseDto.prototype, "inviteeName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], InvitationResponseDto.prototype, "relationship", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], InvitationResponseDto.prototype, "relationshipType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], InvitationResponseDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], InvitationResponseDto.prototype, "invitationToken", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], InvitationResponseDto.prototype, "resendCount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true }),
    __metadata("design:type", String)
], InvitationResponseDto.prototype, "expiresAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true }),
    __metadata("design:type", String)
], InvitationResponseDto.prototype, "acceptedAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true }),
    __metadata("design:type", String)
], InvitationResponseDto.prototype, "rejectedAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true }),
    __metadata("design:type", String)
], InvitationResponseDto.prototype, "cancelledAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], InvitationResponseDto.prototype, "createdAt", void 0);
//# sourceMappingURL=invitation.dto.js.map
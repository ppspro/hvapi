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
exports.FamilyMemberResponseDto = exports.UpdateFamilyMemberDto = exports.FamilyMemberStatus = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
const invitation_dto_1 = require("./invitation.dto");
var FamilyMemberStatus;
(function (FamilyMemberStatus) {
    FamilyMemberStatus["ACTIVE"] = "ACTIVE";
    FamilyMemberStatus["INACTIVE"] = "INACTIVE";
    FamilyMemberStatus["ARCHIVED"] = "ARCHIVED";
})(FamilyMemberStatus || (exports.FamilyMemberStatus = FamilyMemberStatus = {}));
class UpdateFamilyMemberDto {
}
exports.UpdateFamilyMemberDto = UpdateFamilyMemberDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Jane Doe', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateFamilyMemberDto.prototype, "fullName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Spouse', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateFamilyMemberDto.prototype, "relationship", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: invitation_dto_1.FamilyRelationshipType, required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(invitation_dto_1.FamilyRelationshipType),
    __metadata("design:type", String)
], UpdateFamilyMemberDto.prototype, "relationshipType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '+923001234567', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateFamilyMemberDto.prototype, "phone", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: FamilyMemberStatus, required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(FamilyMemberStatus),
    __metadata("design:type", String)
], UpdateFamilyMemberDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: true, required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], UpdateFamilyMemberDto.prototype, "isPrimary", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Clinical notes', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateFamilyMemberDto.prototype, "notes", void 0);
class FamilyMemberResponseDto {
}
exports.FamilyMemberResponseDto = FamilyMemberResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], FamilyMemberResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], FamilyMemberResponseDto.prototype, "fullName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], FamilyMemberResponseDto.prototype, "relationship", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], FamilyMemberResponseDto.prototype, "relationshipType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], FamilyMemberResponseDto.prototype, "phone", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], FamilyMemberResponseDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Boolean)
], FamilyMemberResponseDto.prototype, "isPrimary", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Boolean)
], FamilyMemberResponseDto.prototype, "isGuardian", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Boolean)
], FamilyMemberResponseDto.prototype, "isDependent", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Boolean)
], FamilyMemberResponseDto.prototype, "isCaregiver", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], FamilyMemberResponseDto.prototype, "verificationStatus", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true }),
    __metadata("design:type", String)
], FamilyMemberResponseDto.prototype, "notes", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], FamilyMemberResponseDto.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], FamilyMemberResponseDto.prototype, "updatedAt", void 0);
//# sourceMappingURL=family-member.dto.js.map
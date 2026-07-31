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
exports.UpdateGuardianDto = exports.CreateGuardianDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
const invitation_dto_1 = require("./invitation.dto");
class CreateGuardianDto {
}
exports.CreateGuardianDto = CreateGuardianDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Ahmed Ali', description: 'Full name of guardian' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateGuardianDto.prototype, "fullName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '+923001234567' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateGuardianDto.prototype, "phone", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'GUARDIAN', enum: invitation_dto_1.FamilyRelationshipType }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsEnum)(invitation_dto_1.FamilyRelationshipType),
    __metadata("design:type", String)
], CreateGuardianDto.prototype, "relationshipType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Father', description: 'Human-readable relationship label' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateGuardianDto.prototype, "relationship", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: true, required: false, description: 'Is this the primary guardian?' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CreateGuardianDto.prototype, "isPrimary", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Legal guardian by court order', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateGuardianDto.prototype, "notes", void 0);
class UpdateGuardianDto {
}
exports.UpdateGuardianDto = UpdateGuardianDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Verified', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateGuardianDto.prototype, "verificationStatus", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: true, required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], UpdateGuardianDto.prototype, "isPrimary", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateGuardianDto.prototype, "notes", void 0);
//# sourceMappingURL=guardian.dto.js.map
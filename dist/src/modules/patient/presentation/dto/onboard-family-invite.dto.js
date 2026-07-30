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
exports.OnboardFamilyInviteResponseDto = exports.OnboardFamilyInviteDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
class OnboardFamilyInviteDto {
}
exports.OnboardFamilyInviteDto = OnboardFamilyInviteDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: '+14155559876', description: 'Family member phone number in E.164 format' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Matches)(/^\+[1-9]\d{1,14}$/, {
        message: 'Family invite phone number must follow E.164 international format (e.g. +14155559876)',
    }),
    __metadata("design:type", String)
], OnboardFamilyInviteDto.prototype, "inviteePhone", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Child', description: 'Relationship to the patient' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], OnboardFamilyInviteDto.prototype, "relationship", void 0);
class OnboardFamilyInviteResponseDto {
}
exports.OnboardFamilyInviteResponseDto = OnboardFamilyInviteResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'consent-uuid', description: 'Created family consent invitation identifier' }),
    __metadata("design:type", String)
], OnboardFamilyInviteResponseDto.prototype, "consentId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Family invitation sent successfully', description: 'Status message' }),
    __metadata("design:type", String)
], OnboardFamilyInviteResponseDto.prototype, "message", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 7, description: 'Next onboarding step flow' }),
    __metadata("design:type", Number)
], OnboardFamilyInviteResponseDto.prototype, "nextStep", void 0);
//# sourceMappingURL=onboard-family-invite.dto.js.map
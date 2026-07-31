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
exports.ProfileTimelineResponseDto = exports.ProfileTimelineEventDto = exports.ProfileCompletionResponseDto = exports.ProfileCompletionSectionDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class ProfileCompletionSectionDto {
}
exports.ProfileCompletionSectionDto = ProfileCompletionSectionDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Basic Information' }),
    __metadata("design:type", String)
], ProfileCompletionSectionDto.prototype, "section", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: true }),
    __metadata("design:type", Boolean)
], ProfileCompletionSectionDto.prototype, "completed", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: ['firstName', 'lastName'], type: [String], nullable: true }),
    __metadata("design:type", Array)
], ProfileCompletionSectionDto.prototype, "missingFields", void 0);
class ProfileCompletionResponseDto {
}
exports.ProfileCompletionResponseDto = ProfileCompletionResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 72, description: 'Overall completion percentage (0-100)' }),
    __metadata("design:type", Number)
], ProfileCompletionResponseDto.prototype, "completionPercentage", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'DRAFT', description: 'Profile status' }),
    __metadata("design:type", String)
], ProfileCompletionResponseDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [ProfileCompletionSectionDto], description: 'Section-level completion breakdown' }),
    __metadata("design:type", Array)
], ProfileCompletionResponseDto.prototype, "sections", void 0);
class ProfileTimelineEventDto {
}
exports.ProfileTimelineEventDto = ProfileTimelineEventDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'profile_updated' }),
    __metadata("design:type", String)
], ProfileTimelineEventDto.prototype, "action", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'firstName', nullable: true }),
    __metadata("design:type", String)
], ProfileTimelineEventDto.prototype, "fieldChanged", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2026-07-31T06:00:00.000Z' }),
    __metadata("design:type", String)
], ProfileTimelineEventDto.prototype, "timestamp", void 0);
class ProfileTimelineResponseDto {
}
exports.ProfileTimelineResponseDto = ProfileTimelineResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ type: [ProfileTimelineEventDto] }),
    __metadata("design:type", Array)
], ProfileTimelineResponseDto.prototype, "events", void 0);
//# sourceMappingURL=profile-completion.dto.js.map
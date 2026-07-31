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
exports.OnboardingProgressResponseDto = exports.StepProgressDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class StepProgressDto {
}
exports.StepProgressDto = StepProgressDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1, description: 'Step index number' }),
    __metadata("design:type", Number)
], StepProgressDto.prototype, "step", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Identity Verification', description: 'Step name' }),
    __metadata("design:type", String)
], StepProgressDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: true, description: 'Indicating step completion status' }),
    __metadata("design:type", Boolean)
], StepProgressDto.prototype, "completed", void 0);
class OnboardingProgressResponseDto {
}
exports.OnboardingProgressResponseDto = OnboardingProgressResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 83, description: 'Overall onboarding completion percentage (0-100)' }),
    __metadata("design:type", Number)
], OnboardingProgressResponseDto.prototype, "completionPercentage", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'DRAFT', description: 'Overall registration status' }),
    __metadata("design:type", String)
], OnboardingProgressResponseDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [StepProgressDto], description: 'Detailed checklist parameters per step' }),
    __metadata("design:type", Array)
], OnboardingProgressResponseDto.prototype, "steps", void 0);
//# sourceMappingURL=onboarding-progress.dto.js.map
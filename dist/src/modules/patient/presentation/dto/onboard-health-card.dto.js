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
exports.OnboardHealthCardResponseDto = exports.OnboardHealthCardDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class OnboardHealthCardDto {
}
exports.OnboardHealthCardDto = OnboardHealthCardDto;
class OnboardHealthCardResponseDto {
}
exports.OnboardHealthCardResponseDto = OnboardHealthCardResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'card-uuid-v4', description: 'Generated health card record ID' }),
    __metadata("design:type", String)
], OnboardHealthCardResponseDto.prototype, "cardId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'HC-2026-00001', description: 'Unique digital health card number' }),
    __metadata("design:type", String)
], OnboardHealthCardResponseDto.prototype, "cardNumber", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Digital Health Card initialized successfully', description: 'Status message' }),
    __metadata("design:type", String)
], OnboardHealthCardResponseDto.prototype, "message", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 6, description: 'Next step to execute' }),
    __metadata("design:type", Number)
], OnboardHealthCardResponseDto.prototype, "nextStep", void 0);
//# sourceMappingURL=onboard-health-card.dto.js.map
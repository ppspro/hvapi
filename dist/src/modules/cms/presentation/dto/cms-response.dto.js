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
exports.FaqResponseDto = exports.HealthArticleResponseDto = exports.CmsPageResponseDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class CmsPageResponseDto {
}
exports.CmsPageResponseDto = CmsPageResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'faq' }),
    __metadata("design:type", String)
], CmsPageResponseDto.prototype, "slug", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Frequently Asked Questions' }),
    __metadata("design:type", String)
], CmsPageResponseDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '<p>FAQ Page Content...</p>' }),
    __metadata("design:type", String)
], CmsPageResponseDto.prototype, "content", void 0);
class HealthArticleResponseDto {
}
exports.HealthArticleResponseDto = HealthArticleResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'article-uuid-v4' }),
    __metadata("design:type", String)
], HealthArticleResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Understanding Blood Sugar Levels' }),
    __metadata("design:type", String)
], HealthArticleResponseDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'A brief guide to reading blood panel glucose tests.' }),
    __metadata("design:type", String)
], HealthArticleResponseDto.prototype, "summary", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '<p>Complete article body text...</p>' }),
    __metadata("design:type", String)
], HealthArticleResponseDto.prototype, "body", void 0);
class FaqResponseDto {
}
exports.FaqResponseDto = FaqResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'faq-uuid-v4' }),
    __metadata("design:type", String)
], FaqResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'How do I download my health card?' }),
    __metadata("design:type", String)
], FaqResponseDto.prototype, "question", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'You can request the card from your home tab.' }),
    __metadata("design:type", String)
], FaqResponseDto.prototype, "answer", void 0);
//# sourceMappingURL=cms-response.dto.js.map
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
exports.AiOcrController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const passport_1 = require("@nestjs/passport");
const ai_ocr_service_1 = require("../../application/use-cases/ai-ocr.service");
const ai_ocr_dto_1 = require("../dto/ai-ocr.dto");
let AiOcrController = class AiOcrController {
    constructor(aiOcrService) {
        this.aiOcrService = aiOcrService;
    }
    async extractDocument(req, dto) {
        return this.aiOcrService.extractDocument(req.user.userId, dto);
    }
    async confirmOcr(req, dto) {
        return this.aiOcrService.confirmOcr(req.user.userId, dto);
    }
};
exports.AiOcrController = AiOcrController;
__decorate([
    (0, common_1.Post)('extract'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Image Scan & Candidate Metadata Extraction' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: ai_ocr_dto_1.AiOcrExtractResponseDto }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, ai_ocr_dto_1.AiOcrExtractDto]),
    __metadata("design:returntype", Promise)
], AiOcrController.prototype, "extractDocument", null);
__decorate([
    (0, common_1.Post)('confirm'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'OCR Candidate Field Review & Manual Confirmation' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: ai_ocr_dto_1.AiOcrConfirmResponseDto }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, ai_ocr_dto_1.AiOcrConfirmDto]),
    __metadata("design:returntype", Promise)
], AiOcrController.prototype, "confirmOcr", null);
exports.AiOcrController = AiOcrController = __decorate([
    (0, swagger_1.ApiTags)('AI OCR'),
    (0, common_1.Controller)('ai/ocr'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, swagger_1.ApiBearerAuth)('JWT-Auth'),
    __metadata("design:paramtypes", [ai_ocr_service_1.AiOcrService])
], AiOcrController);
//# sourceMappingURL=ai-ocr.controller.js.map
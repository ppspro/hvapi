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
exports.AiOcrService = void 0;
const common_1 = require("@nestjs/common");
const nestjs_pino_1 = require("nestjs-pino");
let AiOcrService = class AiOcrService {
    constructor(aiOcrRepository, logger) {
        this.aiOcrRepository = aiOcrRepository;
        this.logger = logger;
    }
    async extractDocument(userId, dto) {
        const profile = await this.aiOcrRepository.findProfileByUserId(userId);
        if (!profile) {
            throw new common_1.NotFoundException('Patient profile not found');
        }
        this.logger.log({ msg: 'OCR upload started' });
        const doc = await this.aiOcrRepository.createDocument(profile.id, dto.imageUrl);
        const mockExtracted = {
            title: 'Blood Count Report OCR',
            category: 'Laboratory',
            prescribedBy: 'Dr. John Watson',
        };
        await this.aiOcrRepository.createExtraction(doc.id, JSON.stringify(mockExtracted), 0.92);
        this.logger.log({ msg: 'OCR extraction completed', documentId: doc.id });
        return {
            documentId: doc.id,
            extractedData: mockExtracted,
            confidence: 0.92,
        };
    }
    async confirmOcr(userId, dto) {
        const profile = await this.aiOcrRepository.findProfileByUserId(userId);
        if (!profile) {
            throw new common_1.NotFoundException('Patient profile not found');
        }
        const doc = await this.aiOcrRepository.findDocumentById(dto.documentId);
        if (!doc) {
            throw new common_1.NotFoundException('OCR Document not found');
        }
        if (doc.status === 'CONFIRMED') {
            throw new common_1.BadRequestException('OCR Document has already been confirmed');
        }
        await this.aiOcrRepository.createReview(dto.documentId, dto.confirmedData);
        await this.aiOcrRepository.updateDocumentStatus(dto.documentId, 'CONFIRMED');
        this.logger.log({ msg: 'OCR confirmation completed', documentId: dto.documentId });
        return {
            success: true,
            message: 'OCR extraction verified and saved successfully',
        };
    }
};
exports.AiOcrService = AiOcrService;
exports.AiOcrService = AiOcrService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('IAiOcrRepository')),
    __metadata("design:paramtypes", [Object, nestjs_pino_1.Logger])
], AiOcrService);
//# sourceMappingURL=ai-ocr.service.js.map
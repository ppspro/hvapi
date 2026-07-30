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
exports.AiOcrRepository = void 0;
const common_1 = require("@nestjs/common");
const database_service_1 = require("../../../../database/database.service");
let AiOcrRepository = class AiOcrRepository {
    constructor(db) {
        this.db = db;
    }
    async findProfileByUserId(userId) {
        return this.db.patientProfile.findUnique({
            where: { userId },
            select: { id: true },
        });
    }
    async createDocument(profileId, imageUrl) {
        return (await this.db.ocrDocument.create({
            data: {
                patientProfileId: profileId,
                imageUrl,
                status: 'PENDING',
            },
        }));
    }
    async createExtraction(documentId, extractedData, confidence) {
        return (await this.db.ocrExtraction.create({
            data: {
                documentId,
                extractedData,
                confidence,
            },
        }));
    }
    async findDocumentById(documentId) {
        return (await this.db.ocrDocument.findUnique({
            where: { id: documentId },
        }));
    }
    async createReview(documentId, correctedData) {
        return (await this.db.ocrReview.create({
            data: {
                documentId,
                correctedData,
            },
        }));
    }
    async updateDocumentStatus(documentId, status) {
        await this.db.ocrDocument.update({
            where: { id: documentId },
            data: { status },
        });
    }
};
exports.AiOcrRepository = AiOcrRepository;
exports.AiOcrRepository = AiOcrRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [database_service_1.DatabaseService])
], AiOcrRepository);
//# sourceMappingURL=ai-ocr.repository.js.map
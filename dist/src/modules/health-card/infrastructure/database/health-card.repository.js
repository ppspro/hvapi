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
exports.HealthCardRepository = void 0;
const common_1 = require("@nestjs/common");
const database_service_1 = require("../../../../database/database.service");
let HealthCardRepository = class HealthCardRepository {
    constructor(db) {
        this.db = db;
    }
    async findProfileByUserId(userId) {
        return this.db.patientProfile.findUnique({
            where: { userId },
            select: { id: true, firstName: true, lastName: true },
        });
    }
    async findCardByProfileId(profileId) {
        return (await this.db.healthCard.findUnique({
            where: { patientProfileId: profileId },
            include: { healthCardQr: true },
        }));
    }
    async createCard(profileId, cardNumber, expiresAt) {
        return (await this.db.healthCard.create({
            data: {
                patientProfileId: profileId,
                cardNumber,
                expiresAt,
                status: 'ACTIVE',
            },
        }));
    }
    async createQr(cardId, encryptedPayload, expiresAt) {
        return (await this.db.healthCardQr.create({
            data: {
                healthCardId: cardId,
                encryptedPayload,
                expiresAt,
            },
        }));
    }
    async findQrByPayload(encryptedPayload) {
        return (await this.db.healthCardQr.findFirst({
            where: { encryptedPayload },
            include: { healthCard: true },
        }));
    }
    async updateQrPayload(cardId, encryptedPayload, expiresAt) {
        return (await this.db.healthCardQr.update({
            where: { healthCardId: cardId },
            data: {
                encryptedPayload,
                expiresAt,
            },
        }));
    }
    async createVerificationLog(qrId, verifierUserId, status) {
        return (await this.db.qrVerificationLog.create({
            data: {
                qrId,
                verifierUserId,
                status,
            },
        }));
    }
};
exports.HealthCardRepository = HealthCardRepository;
exports.HealthCardRepository = HealthCardRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [database_service_1.DatabaseService])
], HealthCardRepository);
//# sourceMappingURL=health-card.repository.js.map
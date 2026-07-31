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
            select: { id: true, firstName: true, lastName: true, dateOfBirth: true, bloodGroup: true },
        });
    }
    async createCard(patientProfileId, cardNumber, expiresAt, metadata) {
        const card = await this.db.healthCard.create({
            data: {
                patientProfileId,
                cardNumber,
                status: 'ISSUED',
                version: 1,
                expiresAt,
                metadata: metadata || null,
            },
            include: { healthCardQr: true, history: true },
        });
        await this.createHistory(card.id, {
            action: 'ISSUED',
            newStatus: 'ISSUED',
            reason: 'Initial Health Card issuance',
        });
        return card;
    }
    async findCardById(id, includeDeleted = false) {
        return (await this.db.healthCard.findFirst({
            where: { id, ...(includeDeleted ? {} : { isDeleted: false }) },
            include: { healthCardQr: true, history: { orderBy: { createdAt: 'desc' } } },
        }));
    }
    async findCardByProfileId(patientProfileId, includeDeleted = false) {
        return (await this.db.healthCard.findFirst({
            where: { patientProfileId, ...(includeDeleted ? {} : { isDeleted: false }) },
            include: { healthCardQr: true, history: { orderBy: { createdAt: 'desc' } } },
        }));
    }
    async findCardByNumber(cardNumber) {
        return (await this.db.healthCard.findFirst({
            where: { cardNumber, isDeleted: false },
            include: { healthCardQr: true, history: { orderBy: { createdAt: 'desc' } } },
        }));
    }
    async updateCard(id, data) {
        return (await this.db.healthCard.update({
            where: { id },
            data: {
                status: data.status || undefined,
                version: data.version || undefined,
                emergencyFlag: data.emergencyFlag ?? undefined,
                metadata: data.metadata || undefined,
                expiresAt: data.expiresAt ? new Date(data.expiresAt) : undefined,
                suspendedAt: data.suspendedAt || undefined,
                blockedAt: data.blockedAt || undefined,
                archivedAt: data.archivedAt || undefined,
                replacedAt: data.replacedAt || undefined,
                previousCardNumber: data.previousCardNumber || undefined,
                isDeleted: data.isDeleted ?? undefined,
                deletedAt: data.deletedAt || undefined,
            },
            include: { healthCardQr: true, history: { orderBy: { createdAt: 'desc' } } },
        }));
    }
    async searchCards(query) {
        const q = query.toLowerCase();
        return (await this.db.healthCard.findMany({
            where: {
                isDeleted: false,
                OR: [
                    { cardNumber: { contains: q, mode: 'insensitive' } },
                    { patientProfile: { firstName: { contains: q, mode: 'insensitive' } } },
                    { patientProfile: { lastName: { contains: q, mode: 'insensitive' } } },
                    { patientProfile: { patientNumber: { contains: q, mode: 'insensitive' } } },
                ],
            },
            include: { healthCardQr: true, history: { orderBy: { createdAt: 'desc' } } },
            orderBy: { createdAt: 'desc' },
        }));
    }
    async createQr(healthCardId, encryptedPayload, expiresAt) {
        return (await this.db.healthCardQr.upsert({
            where: { healthCardId },
            create: { healthCardId, encryptedPayload, expiresAt },
            update: { encryptedPayload, expiresAt },
        }));
    }
    async findQrByCardId(healthCardId) {
        return (await this.db.healthCardQr.findUnique({
            where: { healthCardId },
        }));
    }
    async updateQrPayload(healthCardId, encryptedPayload, expiresAt) {
        return (await this.db.healthCardQr.update({
            where: { healthCardId },
            data: { encryptedPayload, expiresAt },
        }));
    }
    async createHistory(healthCardId, data) {
        return (await this.db.healthCardHistory.create({
            data: {
                healthCardId,
                action: data.action,
                previousStatus: data.previousStatus || null,
                newStatus: data.newStatus,
                reason: data.reason || null,
                performedBy: data.performedBy || null,
            },
        }));
    }
    async findHistoryByCardId(healthCardId) {
        return (await this.db.healthCardHistory.findMany({
            where: { healthCardId },
            orderBy: { createdAt: 'desc' },
        }));
    }
    async createAuditLog(data) {
        return (await this.db.healthCardAuditLog.create({
            data: {
                healthCardId: data.healthCardId,
                action: data.action,
                performedBy: data.performedBy || null,
                details: data.details || null,
            },
        }));
    }
    async recordQrScanLog(qrId, verifierUserId, status) {
        return this.db.qrVerificationLog.create({
            data: { qrId, verifierUserId, status },
        });
    }
};
exports.HealthCardRepository = HealthCardRepository;
exports.HealthCardRepository = HealthCardRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [database_service_1.DatabaseService])
], HealthCardRepository);
//# sourceMappingURL=health-card.repository.js.map
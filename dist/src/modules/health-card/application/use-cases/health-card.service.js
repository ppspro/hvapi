"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HealthCardService = void 0;
const common_1 = require("@nestjs/common");
const nestjs_pino_1 = require("nestjs-pino");
const crypto = __importStar(require("crypto"));
const qr_service_1 = require("../../../qr/application/use-cases/qr.service");
let HealthCardService = class HealthCardService {
    constructor(repository, qrService, logger) {
        this.repository = repository;
        this.qrService = qrService;
        this.logger = logger;
    }
    async resolveProfile(userId) {
        const profile = await this.repository.findProfileByUserId(userId);
        if (!profile) {
            throw new common_1.NotFoundException('Patient profile not found. Complete onboarding demographics first.');
        }
        return profile;
    }
    generateCardNumber() {
        const uniqueSuffix = crypto.randomBytes(6).toString('hex').toUpperCase();
        return `HV360-${uniqueSuffix.slice(0, 4)}-${uniqueSuffix.slice(4, 8)}-${uniqueSuffix.slice(8, 12)}`;
    }
    mapCard(card) {
        return {
            id: card.id,
            patientProfileId: card.patientProfileId,
            cardNumber: card.cardNumber,
            status: card.status,
            version: card.version || 1,
            emergencyFlag: card.emergencyFlag ?? false,
            metadata: card.metadata || undefined,
            issuedAt: card.issuedAt.toISOString(),
            expiresAt: card.expiresAt.toISOString(),
            suspendedAt: card.suspendedAt?.toISOString() || undefined,
            blockedAt: card.blockedAt?.toISOString() || undefined,
            archivedAt: card.archivedAt?.toISOString() || undefined,
            replacedAt: card.replacedAt?.toISOString() || undefined,
            previousCardNumber: card.previousCardNumber || undefined,
            isDeleted: card.isDeleted,
            qrPayload: card.healthCardQr?.encryptedPayload || undefined,
            history: card.history?.map((h) => ({
                id: h.id,
                healthCardId: h.healthCardId,
                action: h.action,
                previousStatus: h.previousStatus || undefined,
                newStatus: h.newStatus,
                reason: h.reason || undefined,
                performedBy: h.performedBy || undefined,
                createdAt: h.createdAt.toISOString(),
            })) || [],
            createdAt: card.createdAt.toISOString(),
            updatedAt: card.updatedAt.toISOString(),
        };
    }
    async onboardHealthCard(userId) {
        const profile = await this.resolveProfile(userId);
        let card = await this.repository.findCardByProfileId(profile.id);
        if (!card) {
            const cardNumber = this.generateCardNumber();
            const expiresAt = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000);
            card = await this.repository.createCard(profile.id, cardNumber, expiresAt);
            const qrPayload = crypto.createHash('sha256').update(card.cardNumber + Date.now()).digest('hex');
            await this.repository.createQr(card.id, qrPayload, new Date(Date.now() + 30 * 24 * 60 * 60 * 1000));
        }
        return {
            cardId: card.id,
            cardNumber: card.cardNumber,
            message: 'Health Card generated successfully during onboarding',
            nextStep: 6,
        };
    }
    async issueCard(userId, dto) {
        const profile = await this.resolveProfile(userId);
        const existing = await this.repository.findCardByProfileId(profile.id);
        if (existing && !['EXPIRED', 'ARCHIVED', 'REPLACED'].includes(existing.status)) {
            throw new common_1.BadRequestException(`Patient already has an active or valid Health Card (${existing.cardNumber}). Replace or renew it instead.`);
        }
        const cardNumber = this.generateCardNumber();
        const expiresAt = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000);
        const card = await this.repository.createCard(profile.id, cardNumber, expiresAt);
        const qrPayload = crypto.createHash('sha256').update(card.cardNumber + Date.now()).digest('hex');
        await this.repository.createQr(card.id, qrPayload, new Date(Date.now() + 30 * 24 * 60 * 60 * 1000));
        await this.repository.createAuditLog({
            healthCardId: card.id,
            action: 'ISSUED',
            performedBy: userId,
            details: dto.reason || 'Card issued',
        });
        return this.mapCard(card);
    }
    async getActiveCard(userId) {
        const profile = await this.resolveProfile(userId);
        const card = await this.repository.findCardByProfileId(profile.id);
        if (!card) {
            throw new common_1.NotFoundException('Health Card not found for current patient profile');
        }
        return this.mapCard(card);
    }
    async getCardById(userId, cardId) {
        const profile = await this.resolveProfile(userId);
        const card = await this.repository.findCardById(cardId);
        if (!card)
            throw new common_1.NotFoundException('Health Card not found');
        if (card.patientProfileId !== profile.id)
            throw new common_1.ForbiddenException('Access denied');
        return this.mapCard(card);
    }
    async updateCard(userId, cardId, dto) {
        const profile = await this.resolveProfile(userId);
        const card = await this.repository.findCardById(cardId);
        if (!card)
            throw new common_1.NotFoundException('Health Card not found');
        if (card.patientProfileId !== profile.id)
            throw new common_1.ForbiddenException('Access denied');
        const updated = await this.repository.updateCard(cardId, dto);
        return this.mapCard(updated);
    }
    async activateCard(userId, cardId, dto) {
        const profile = await this.resolveProfile(userId);
        const card = await this.repository.findCardById(cardId);
        if (!card)
            throw new common_1.NotFoundException('Health Card not found');
        if (card.patientProfileId !== profile.id)
            throw new common_1.ForbiddenException('Access denied');
        if (card.status === 'ACTIVE')
            throw new common_1.BadRequestException('Card is already ACTIVE');
        if (['BLOCKED', 'EXPIRED', 'ARCHIVED'].includes(card.status)) {
            throw new common_1.BadRequestException(`Cannot activate card with status: ${card.status}`);
        }
        const prevStatus = card.status;
        const updated = await this.repository.updateCard(cardId, { status: 'ACTIVE' });
        await this.repository.createHistory(cardId, {
            action: 'ACTIVATED',
            previousStatus: prevStatus,
            newStatus: 'ACTIVE',
            reason: dto.reason || 'Card activated',
            performedBy: userId,
        });
        return this.mapCard(updated);
    }
    async deactivateCard(userId, cardId, dto) {
        const profile = await this.resolveProfile(userId);
        const card = await this.repository.findCardById(cardId);
        if (!card)
            throw new common_1.NotFoundException('Health Card not found');
        if (card.patientProfileId !== profile.id)
            throw new common_1.ForbiddenException('Access denied');
        const prevStatus = card.status;
        const updated = await this.repository.updateCard(cardId, { status: 'DEACTIVATED' });
        await this.repository.createHistory(cardId, {
            action: 'DEACTIVATED',
            previousStatus: prevStatus,
            newStatus: 'DEACTIVATED',
            reason: dto.reason || 'Card deactivated by user',
            performedBy: userId,
        });
        return this.mapCard(updated);
    }
    async suspendCard(userId, cardId, dto) {
        const profile = await this.resolveProfile(userId);
        const card = await this.repository.findCardById(cardId);
        if (!card)
            throw new common_1.NotFoundException('Health Card not found');
        if (card.patientProfileId !== profile.id)
            throw new common_1.ForbiddenException('Access denied');
        const prevStatus = card.status;
        const updated = await this.repository.updateCard(cardId, { status: 'SUSPENDED', suspendedAt: new Date() });
        await this.repository.createHistory(cardId, {
            action: 'SUSPENDED',
            previousStatus: prevStatus,
            newStatus: 'SUSPENDED',
            reason: dto.reason || 'Card suspended temporarily',
            performedBy: userId,
        });
        return this.mapCard(updated);
    }
    async blockCard(userId, cardId, dto) {
        const profile = await this.resolveProfile(userId);
        const card = await this.repository.findCardById(cardId);
        if (!card)
            throw new common_1.NotFoundException('Health Card not found');
        if (card.patientProfileId !== profile.id)
            throw new common_1.ForbiddenException('Access denied');
        const prevStatus = card.status;
        const updated = await this.repository.updateCard(cardId, { status: 'BLOCKED', blockedAt: new Date() });
        await this.repository.createHistory(cardId, {
            action: 'BLOCKED',
            previousStatus: prevStatus,
            newStatus: 'BLOCKED',
            reason: dto.reason || 'Card blocked for security/lost reasons',
            performedBy: userId,
        });
        return this.mapCard(updated);
    }
    async unblockCard(userId, cardId, dto) {
        const profile = await this.resolveProfile(userId);
        const card = await this.repository.findCardById(cardId);
        if (!card)
            throw new common_1.NotFoundException('Health Card not found');
        if (card.patientProfileId !== profile.id)
            throw new common_1.ForbiddenException('Access denied');
        if (card.status !== 'BLOCKED')
            throw new common_1.BadRequestException('Card is not blocked');
        const prevStatus = card.status;
        const updated = await this.repository.updateCard(cardId, { status: 'ACTIVE', blockedAt: null });
        await this.repository.createHistory(cardId, {
            action: 'UNBLOCKED',
            previousStatus: prevStatus,
            newStatus: 'ACTIVE',
            reason: dto.reason || 'Card unblocked by user/admin',
            performedBy: userId,
        });
        return this.mapCard(updated);
    }
    async replaceCard(userId, cardId, dto) {
        const profile = await this.resolveProfile(userId);
        const card = await this.repository.findCardById(cardId);
        if (!card)
            throw new common_1.NotFoundException('Health Card not found');
        if (card.patientProfileId !== profile.id)
            throw new common_1.ForbiddenException('Access denied');
        const oldCardNumber = card.cardNumber;
        const newCardNumber = this.generateCardNumber();
        const newVersion = (card.version || 1) + 1;
        const expiresAt = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000);
        const prevStatus = card.status;
        const updated = await this.repository.updateCard(cardId, {
            cardNumber: newCardNumber,
            version: newVersion,
            status: 'ACTIVE',
            replacedAt: new Date(),
            previousCardNumber: oldCardNumber,
            expiresAt,
        });
        const qrPayload = crypto.createHash('sha256').update(newCardNumber + Date.now()).digest('hex');
        await this.repository.createQr(cardId, qrPayload, new Date(Date.now() + 30 * 24 * 60 * 60 * 1000));
        await this.repository.createHistory(cardId, {
            action: 'REPLACED',
            previousStatus: prevStatus,
            newStatus: 'ACTIVE',
            reason: dto.reason || `Replaced old card ${oldCardNumber} with new card ${newCardNumber}`,
            performedBy: userId,
        });
        return this.mapCard(updated);
    }
    async renewCard(userId, cardId, dto) {
        const profile = await this.resolveProfile(userId);
        const card = await this.repository.findCardById(cardId);
        if (!card)
            throw new common_1.NotFoundException('Health Card not found');
        if (card.patientProfileId !== profile.id)
            throw new common_1.ForbiddenException('Access denied');
        const newExpiry = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000);
        const prevStatus = card.status;
        const updated = await this.repository.updateCard(cardId, {
            status: 'ACTIVE',
            expiresAt: newExpiry,
        });
        await this.repository.createHistory(cardId, {
            action: 'RENEWED',
            previousStatus: prevStatus,
            newStatus: 'ACTIVE',
            reason: dto.reason || 'Card validity renewed for 1 year',
            performedBy: userId,
        });
        return this.mapCard(updated);
    }
    async archiveCard(userId, cardId, dto) {
        const profile = await this.resolveProfile(userId);
        const card = await this.repository.findCardById(cardId);
        if (!card)
            throw new common_1.NotFoundException('Health Card not found');
        if (card.patientProfileId !== profile.id)
            throw new common_1.ForbiddenException('Access denied');
        if (card.status === 'ARCHIVED')
            throw new common_1.BadRequestException('Card is already archived');
        const prevStatus = card.status;
        const updated = await this.repository.updateCard(cardId, { status: 'ARCHIVED', archivedAt: new Date() });
        await this.repository.createHistory(cardId, {
            action: 'ARCHIVED',
            previousStatus: prevStatus,
            newStatus: 'ARCHIVED',
            reason: dto.reason || 'Card archived',
            performedBy: userId,
        });
        return this.mapCard(updated);
    }
    async restoreCard(userId, cardId, dto) {
        const profile = await this.resolveProfile(userId);
        const card = await this.repository.findCardById(cardId, true);
        if (!card)
            throw new common_1.NotFoundException('Health Card not found');
        if (card.patientProfileId !== profile.id)
            throw new common_1.ForbiddenException('Access denied');
        if (card.status !== 'ARCHIVED' && !card.isDeleted) {
            throw new common_1.BadRequestException('Card is not archived or deleted');
        }
        const prevStatus = card.status;
        const updated = await this.repository.updateCard(cardId, {
            status: 'ACTIVE',
            archivedAt: null,
            isDeleted: false,
            deletedAt: null,
        });
        await this.repository.createHistory(cardId, {
            action: 'RESTORED',
            previousStatus: prevStatus,
            newStatus: 'ACTIVE',
            reason: dto.reason || 'Card restored',
            performedBy: userId,
        });
        return this.mapCard(updated);
    }
    async getCardHistory(userId, cardId) {
        const profile = await this.resolveProfile(userId);
        const card = await this.repository.findCardById(cardId, true);
        if (!card)
            throw new common_1.NotFoundException('Health Card not found');
        if (card.patientProfileId !== profile.id)
            throw new common_1.ForbiddenException('Access denied');
        const history = await this.repository.findHistoryByCardId(cardId);
        return history.map((h) => ({
            id: h.id,
            healthCardId: h.healthCardId,
            action: h.action,
            previousStatus: h.previousStatus || undefined,
            newStatus: h.newStatus,
            reason: h.reason || undefined,
            performedBy: h.performedBy || undefined,
            createdAt: h.createdAt.toISOString(),
        }));
    }
    async searchCards(query) {
        if (!query || query.trim().length === 0)
            return [];
        const cards = await this.repository.searchCards(query.trim());
        return cards.map((c) => this.mapCard(c));
    }
    async verifyQr(dto, verifierUserId) {
        this.logger.log({ msg: 'Verifying Health Card QR code', verifierUserId });
        const card = await this.repository.findCardByNumber(dto.qrPayload);
        if (!card) {
            return { isValid: false, status: 'EXPIRED' };
        }
        if (card.status !== 'ACTIVE') {
            await this.repository.recordQrScanLog(card.id, verifierUserId, 'SUSPENDED');
            return { isValid: false, status: card.status };
        }
        if (new Date() > card.expiresAt) {
            await this.repository.recordQrScanLog(card.id, verifierUserId, 'EXPIRED');
            return { isValid: false, status: 'EXPIRED' };
        }
        await this.repository.recordQrScanLog(card.id, verifierUserId, 'VERIFIED');
        const profile = card.patientProfile;
        return {
            isValid: true,
            status: 'VERIFIED',
            patientDetails: {
                patientNumber: profile?.patientNumber || 'PT-UNKNOWN',
                firstName: profile?.firstName || 'Patient',
                lastName: profile?.lastName || 'User',
                dateOfBirth: profile?.dateOfBirth ? profile.dateOfBirth.toISOString().split('T')[0] : '1990-01-01',
                bloodGroup: profile?.bloodGroup || 'N/A',
            },
        };
    }
    async getCardDetails(userId) {
        const card = await this.getActiveCard(userId);
        return {
            id: card.id,
            cardNumber: card.cardNumber,
            status: card.status,
            issuedAt: card.issuedAt,
            expiresAt: card.expiresAt,
            healthCardQr: card.qrPayload ? {
                id: 'qr-1',
                encryptedPayload: card.qrPayload,
                expiresAt: card.expiresAt,
            } : undefined,
        };
    }
    async getWalletPass(userId) {
        const card = await this.getActiveCard(userId);
        return {
            passType: 'PKPass',
            cardNumber: card.cardNumber,
            status: card.status,
            downloadUrl: `https://cdn.hvapi.com/wallet/${card.cardNumber}.pkpass`,
        };
    }
};
exports.HealthCardService = HealthCardService;
exports.HealthCardService = HealthCardService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('IHealthCardRepository')),
    __metadata("design:paramtypes", [Object, qr_service_1.QrService,
        nestjs_pino_1.Logger])
], HealthCardService);
//# sourceMappingURL=health-card.service.js.map
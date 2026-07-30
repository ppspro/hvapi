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
let HealthCardService = class HealthCardService {
    constructor(healthCardRepository, logger) {
        this.healthCardRepository = healthCardRepository;
        this.logger = logger;
    }
    async onboardHealthCard(userId) {
        const profile = await this.healthCardRepository.findProfileByUserId(userId);
        if (!profile) {
            throw new common_1.NotFoundException('Patient profile not found. Complete onboarding demographics first.');
        }
        let card = await this.healthCardRepository.findCardByProfileId(profile.id);
        if (!card) {
            const uniqueSuffix = crypto.randomBytes(6).toString('hex').toUpperCase();
            const cardNumber = `HV360-${uniqueSuffix.slice(0, 4)}-${uniqueSuffix.slice(4, 8)}-${uniqueSuffix.slice(8, 12)}`;
            const expiresAt = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000);
            card = await this.healthCardRepository.createCard(profile.id, cardNumber, expiresAt);
            this.logger.log({ msg: 'Health Card generated successfully', cardId: card.id });
            const qrPayload = crypto.createHash('sha256').update(card.cardNumber + Date.now()).digest('hex');
            const qrExpiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
            await this.healthCardRepository.createQr(card.id, qrPayload, qrExpiresAt);
        }
        return {
            cardId: card.id,
            cardNumber: card.cardNumber,
            message: 'Health Card generated successfully during onboarding',
            nextStep: 6,
        };
    }
    async getCardDetails(userId) {
        const profile = await this.healthCardRepository.findProfileByUserId(userId);
        if (!profile) {
            throw new common_1.NotFoundException('Patient profile not found');
        }
        const card = await this.healthCardRepository.findCardByProfileId(profile.id);
        if (!card) {
            throw new common_1.NotFoundException('Health Card not found for current patient profile');
        }
        const qrRecord = card.healthCardQr;
        return {
            id: card.id,
            cardNumber: card.cardNumber,
            status: card.status,
            issuedAt: card.issuedAt,
            expiresAt: card.expiresAt,
            qrPayload: qrRecord ? qrRecord.encryptedPayload : undefined,
        };
    }
    async verifyQr(verifierUserId, dto) {
        this.logger.log({ msg: 'QR verification request received' });
        const qrWithCard = await this.healthCardRepository.findQrByPayload(dto.qrPayload);
        if (!qrWithCard) {
            throw new common_1.NotFoundException('QR Payload signature not found or invalid');
        }
        if (new Date() > new Date(qrWithCard.expiresAt)) {
            await this.healthCardRepository.createVerificationLog(qrWithCard.id, verifierUserId, 'EXPIRED');
            throw new common_1.BadRequestException('Verification failed. QR payload has expired.');
        }
        await this.healthCardRepository.createVerificationLog(qrWithCard.id, verifierUserId, 'SUCCESS');
        this.logger.log({ msg: 'QR verification completed successfully' });
        return {
            isValid: true,
            patientName: 'John Doe',
            cardNumber: qrWithCard.healthCard.cardNumber,
            message: 'QR verification completed successfully',
        };
    }
    async refreshCardQr(userId) {
        const profile = await this.healthCardRepository.findProfileByUserId(userId);
        if (!profile) {
            throw new common_1.NotFoundException('Patient profile not found');
        }
        const card = await this.healthCardRepository.findCardByProfileId(profile.id);
        if (!card) {
            throw new common_1.NotFoundException('Health Card not found');
        }
        const newQrPayload = crypto.createHash('sha256').update(card.cardNumber + Date.now()).digest('hex');
        const newExpiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
        await this.healthCardRepository.updateQrPayload(card.id, newQrPayload, newExpiresAt);
        this.logger.log({ msg: 'Monthly refresh completed. Refreshed QR payload generated' });
        return this.getCardDetails(userId);
    }
    async generateWalletPass(userId) {
        const profile = await this.healthCardRepository.findProfileByUserId(userId);
        if (!profile) {
            throw new common_1.NotFoundException('Patient profile not found');
        }
        this.logger.log({ msg: 'Wallet pass generated request' });
        const mockPkPassContent = Buffer.from('mock-pkpass-binary-content').toString('base64');
        return {
            passPayload: mockPkPassContent,
            mimeType: 'application/vnd.apple.pkpass',
        };
    }
};
exports.HealthCardService = HealthCardService;
exports.HealthCardService = HealthCardService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('IHealthCardRepository')),
    __metadata("design:paramtypes", [Object, nestjs_pino_1.Logger])
], HealthCardService);
//# sourceMappingURL=health-card.service.js.map
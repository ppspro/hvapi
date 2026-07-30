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
exports.HealthCardController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const passport_1 = require("@nestjs/passport");
const health_card_service_1 = require("../../application/use-cases/health-card.service");
const onboard_health_card_dto_1 = require("../dto/onboard-health-card.dto");
const verify_qr_dto_1 = require("../dto/verify-qr.dto");
const health_card_details_dto_1 = require("../dto/health-card-details.dto");
const wallet_pass_dto_1 = require("../dto/wallet-pass.dto");
let HealthCardController = class HealthCardController {
    constructor(healthCardService) {
        this.healthCardService = healthCardService;
    }
    async onboardHealthCard(req) {
        return this.healthCardService.onboardHealthCard(req.user.userId);
    }
    async getCardDetails(req) {
        return this.healthCardService.getCardDetails(req.user.userId);
    }
    async verifyQr(req, dto) {
        return this.healthCardService.verifyQr(req.user.userId, dto);
    }
    async refreshCardQr(req) {
        return this.healthCardService.refreshCardQr(req.user.userId);
    }
    async generateWalletPass(req) {
        return this.healthCardService.generateWalletPass(req.user.userId);
    }
};
exports.HealthCardController = HealthCardController;
__decorate([
    (0, common_1.Post)('patients/onboarding/health-card'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Step 5: Digital Health Card Generation' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: onboard_health_card_dto_1.OnboardHealthCardResponseDto }),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], HealthCardController.prototype, "onboardHealthCard", null);
__decorate([
    (0, common_1.Get)('health-card/me'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Get Patient Digital Health Card Details' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: health_card_details_dto_1.HealthCardDetailsResponseDto }),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], HealthCardController.prototype, "getCardDetails", null);
__decorate([
    (0, common_1.Post)('health-card/verify-qr'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Secure Doctor QR Scanner Verification' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: verify_qr_dto_1.VerifyQrResponseDto }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, verify_qr_dto_1.VerifyQrDto]),
    __metadata("design:returntype", Promise)
], HealthCardController.prototype, "verifyQr", null);
__decorate([
    (0, common_1.Post)('health-card/monthly-refresh'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Monthly Card Token Renewal Refresh' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: health_card_details_dto_1.HealthCardDetailsResponseDto }),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], HealthCardController.prototype, "refreshCardQr", null);
__decorate([
    (0, common_1.Get)('health-card/wallet-pass'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Google / Apple Wallet Pass Export' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: wallet_pass_dto_1.WalletPassResponseDto }),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], HealthCardController.prototype, "generateWalletPass", null);
exports.HealthCardController = HealthCardController = __decorate([
    (0, swagger_1.ApiTags)('HealthCard'),
    (0, common_1.Controller)(),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, swagger_1.ApiBearerAuth)('JWT-Auth'),
    __metadata("design:paramtypes", [health_card_service_1.HealthCardService])
], HealthCardController);
//# sourceMappingURL=health-card.controller.js.map
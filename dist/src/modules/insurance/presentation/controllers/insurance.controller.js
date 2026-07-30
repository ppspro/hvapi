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
exports.InsuranceController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const passport_1 = require("@nestjs/passport");
const insurance_service_1 = require("../../application/use-cases/insurance.service");
const onboard_insurance_dto_1 = require("../dto/onboard-insurance.dto");
const insurance_ocr_scan_dto_1 = require("../dto/insurance-ocr-scan.dto");
const insurance_ocr_confirm_dto_1 = require("../dto/insurance-ocr-confirm.dto");
let InsuranceController = class InsuranceController {
    constructor(insuranceService) {
        this.insuranceService = insuranceService;
    }
    async onboardInsurance(req, dto) {
        return this.insuranceService.onboardInsurance(req.user.userId, dto);
    }
    async scanInsuranceCard(req, dto) {
        return this.insuranceService.scanInsuranceCard(req.user.userId, dto);
    }
    async confirmOcrData(req, dto) {
        return this.insuranceService.confirmOcrData(req.user.userId, dto);
    }
};
exports.InsuranceController = InsuranceController;
__decorate([
    (0, common_1.Post)('patients/onboarding/insurance'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Step 4: Primary Insurance Onboarding Link' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: onboard_insurance_dto_1.OnboardInsuranceResponseDto }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, onboard_insurance_dto_1.OnboardInsuranceDto]),
    __metadata("design:returntype", Promise)
], InsuranceController.prototype, "onboardInsurance", null);
__decorate([
    (0, common_1.Post)('insurance/ocr/scan'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Insurance Card OCR Image Scanner' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: insurance_ocr_scan_dto_1.InsuranceOcrScanResponseDto }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, insurance_ocr_scan_dto_1.InsuranceOcrScanDto]),
    __metadata("design:returntype", Promise)
], InsuranceController.prototype, "scanInsuranceCard", null);
__decorate([
    (0, common_1.Post)('insurance/ocr/confirm'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'OCR Candidate Field Review & Manual Correction Confirmation' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: insurance_ocr_confirm_dto_1.InsuranceOcrConfirmResponseDto }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, insurance_ocr_confirm_dto_1.InsuranceOcrConfirmDto]),
    __metadata("design:returntype", Promise)
], InsuranceController.prototype, "confirmOcrData", null);
exports.InsuranceController = InsuranceController = __decorate([
    (0, swagger_1.ApiTags)('Insurance'),
    (0, common_1.Controller)(),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, swagger_1.ApiBearerAuth)('JWT-Auth'),
    __metadata("design:paramtypes", [insurance_service_1.InsuranceService])
], InsuranceController);
//# sourceMappingURL=insurance.controller.js.map
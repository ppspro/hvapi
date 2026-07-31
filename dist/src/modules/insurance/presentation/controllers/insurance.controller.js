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
const create_provider_dto_1 = require("../dto/create-provider.dto");
const insurance_response_dto_1 = require("../dto/insurance-response.dto");
let InsuranceController = class InsuranceController {
    constructor(insuranceService) {
        this.insuranceService = insuranceService;
    }
    async createProvider(dto) {
        return this.insuranceService.createProvider(dto);
    }
    async getProviders() {
        return this.insuranceService.getProviders();
    }
    async createPlan(dto) {
        return this.insuranceService.createPlan(dto);
    }
    async getPlans(providerId) {
        return this.insuranceService.getPlans(providerId);
    }
    async createFullPolicy(req, dto) {
        return this.insuranceService.createFullPolicy(req.user.userId, dto);
    }
    async getPolicies(req) {
        return this.insuranceService.getPolicies(req.user.userId);
    }
    async searchPolicies(query) {
        return this.insuranceService.searchPolicies(query);
    }
    async getStatistics() {
        return this.insuranceService.getStatistics();
    }
    async getPolicyById(req, id) {
        return this.insuranceService.getPolicyById(req.user.userId, id);
    }
    async updatePolicyDetails(req, id, dto) {
        return this.insuranceService.updatePolicyDetails(req.user.userId, id, dto);
    }
    async activatePolicy(req, id, dto) {
        return this.insuranceService.activatePolicy(req.user.userId, id, dto);
    }
    async renewPolicy(req, id, dto) {
        return this.insuranceService.renewPolicy(req.user.userId, id, dto);
    }
    async suspendPolicy(req, id, dto) {
        return this.insuranceService.suspendPolicy(req.user.userId, id, dto);
    }
    async cancelPolicy(req, id, dto) {
        return this.insuranceService.cancelPolicy(req.user.userId, id, dto);
    }
    async archivePolicy(req, id, dto) {
        return this.insuranceService.archivePolicy(req.user.userId, id, dto);
    }
    async restorePolicy(req, id, dto) {
        return this.insuranceService.restorePolicy(req.user.userId, id, dto);
    }
    async verifyPolicy(req, id) {
        return this.insuranceService.verifyPolicy(req.user.userId, id);
    }
    async createClaimDraft(req, dto) {
        return this.insuranceService.createClaimDraft(req.user.userId, dto);
    }
    async getClaimDrafts(req) {
        return this.insuranceService.getClaimDrafts(req.user.userId);
    }
    async onboardInsurance(req, dto) {
        return this.insuranceService.onboardInsurance(req.user.userId, dto);
    }
    async scanInsuranceCard(req, dto) {
        return this.insuranceService.scanInsuranceCard(req.user.userId, dto);
    }
    async confirmOcrScan(req, dto) {
        return this.insuranceService.confirmOcrScan(req.user.userId, dto);
    }
};
exports.InsuranceController = InsuranceController;
__decorate([
    (0, common_1.Post)('providers'),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, swagger_1.ApiOperation)({ summary: 'Create an insurance provider' }),
    (0, swagger_1.ApiResponse)({ status: 201, type: insurance_response_dto_1.InsuranceProviderResponseDto }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_provider_dto_1.CreateProviderDto]),
    __metadata("design:returntype", Promise)
], InsuranceController.prototype, "createProvider", null);
__decorate([
    (0, common_1.Get)('providers'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'List active insurance providers' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: [insurance_response_dto_1.InsuranceProviderResponseDto] }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], InsuranceController.prototype, "getProviders", null);
__decorate([
    (0, common_1.Post)('plans'),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, swagger_1.ApiOperation)({ summary: 'Create an insurance plan' }),
    (0, swagger_1.ApiResponse)({ status: 201, type: insurance_response_dto_1.InsurancePlanResponseDto }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_provider_dto_1.CreatePlanDto]),
    __metadata("design:returntype", Promise)
], InsuranceController.prototype, "createPlan", null);
__decorate([
    (0, common_1.Get)('plans'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'List insurance plans (supports providerId filter)' }),
    (0, swagger_1.ApiQuery)({ name: 'providerId', required: false }),
    (0, swagger_1.ApiResponse)({ status: 200, type: [insurance_response_dto_1.InsurancePlanResponseDto] }),
    __param(0, (0, common_1.Query)('providerId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], InsuranceController.prototype, "getPlans", null);
__decorate([
    (0, common_1.Post)('policies'),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, swagger_1.ApiOperation)({ summary: 'Issue/Register a full insurance policy for patient' }),
    (0, swagger_1.ApiResponse)({ status: 201, type: insurance_response_dto_1.InsurancePolicyResponseDto }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_provider_dto_1.CreateFullPolicyDto]),
    __metadata("design:returntype", Promise)
], InsuranceController.prototype, "createFullPolicy", null);
__decorate([
    (0, common_1.Get)('policies'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Get all insurance policies for current patient' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: [insurance_response_dto_1.InsurancePolicyResponseDto] }),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], InsuranceController.prototype, "getPolicies", null);
__decorate([
    (0, common_1.Get)('search'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Search insurance policies by provider or policy number' }),
    (0, swagger_1.ApiQuery)({ name: 'q', required: true }),
    (0, swagger_1.ApiResponse)({ status: 200, type: [insurance_response_dto_1.InsurancePolicyResponseDto] }),
    __param(0, (0, common_1.Query)('q')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], InsuranceController.prototype, "searchPolicies", null);
__decorate([
    (0, common_1.Get)('statistics'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Get platform-wide insurance statistics' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: insurance_response_dto_1.InsuranceStatsResponseDto }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], InsuranceController.prototype, "getStatistics", null);
__decorate([
    (0, common_1.Get)('policies/:id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Get specific insurance policy details' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Insurance Policy ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: insurance_response_dto_1.InsurancePolicyResponseDto }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], InsuranceController.prototype, "getPolicyById", null);
__decorate([
    (0, common_1.Put)('policies/:id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Update insurance policy details (blocked if ARCHIVED)' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Insurance Policy ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: insurance_response_dto_1.InsurancePolicyResponseDto }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", Promise)
], InsuranceController.prototype, "updatePolicyDetails", null);
__decorate([
    (0, common_1.Post)('policies/:id/activate'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Activate an insurance policy' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Insurance Policy ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: insurance_response_dto_1.InsurancePolicyResponseDto }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, create_provider_dto_1.PolicyActionDto]),
    __metadata("design:returntype", Promise)
], InsuranceController.prototype, "activatePolicy", null);
__decorate([
    (0, common_1.Post)('policies/:id/renew'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Renew an insurance policy (extends validity by 1 year)' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Insurance Policy ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: insurance_response_dto_1.InsurancePolicyResponseDto }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, create_provider_dto_1.PolicyActionDto]),
    __metadata("design:returntype", Promise)
], InsuranceController.prototype, "renewPolicy", null);
__decorate([
    (0, common_1.Post)('policies/:id/suspend'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Suspend an insurance policy' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Insurance Policy ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: insurance_response_dto_1.InsurancePolicyResponseDto }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, create_provider_dto_1.PolicyActionDto]),
    __metadata("design:returntype", Promise)
], InsuranceController.prototype, "suspendPolicy", null);
__decorate([
    (0, common_1.Post)('policies/:id/cancel'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Cancel an insurance policy' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Insurance Policy ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: insurance_response_dto_1.InsurancePolicyResponseDto }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, create_provider_dto_1.PolicyActionDto]),
    __metadata("design:returntype", Promise)
], InsuranceController.prototype, "cancelPolicy", null);
__decorate([
    (0, common_1.Post)('policies/:id/archive'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Archive an insurance policy' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Insurance Policy ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: insurance_response_dto_1.InsurancePolicyResponseDto }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, create_provider_dto_1.PolicyActionDto]),
    __metadata("design:returntype", Promise)
], InsuranceController.prototype, "archivePolicy", null);
__decorate([
    (0, common_1.Post)('policies/:id/restore'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Restore an archived insurance policy' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Insurance Policy ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: insurance_response_dto_1.InsurancePolicyResponseDto }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, create_provider_dto_1.PolicyActionDto]),
    __metadata("design:returntype", Promise)
], InsuranceController.prototype, "restorePolicy", null);
__decorate([
    (0, common_1.Post)('policies/:id/verify'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Verify coverage status for an insurance policy' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Insurance Policy ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: insurance_response_dto_1.InsurancePolicyResponseDto }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], InsuranceController.prototype, "verifyPolicy", null);
__decorate([
    (0, common_1.Post)('claims'),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, swagger_1.ApiOperation)({ summary: 'Create a claim draft attaching medical records and reports' }),
    (0, swagger_1.ApiResponse)({ status: 201, type: insurance_response_dto_1.InsuranceClaimDraftResponseDto }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_provider_dto_1.CreateClaimDraftDto]),
    __metadata("design:returntype", Promise)
], InsuranceController.prototype, "createClaimDraft", null);
__decorate([
    (0, common_1.Get)('claims'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'List all claim drafts for current patient' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: [insurance_response_dto_1.InsuranceClaimDraftResponseDto] }),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], InsuranceController.prototype, "getClaimDrafts", null);
__decorate([
    (0, common_1.Post)('onboard'),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, swagger_1.ApiOperation)({ summary: 'Save insurance details during 6-step patient onboarding (Step 4)' }),
    (0, swagger_1.ApiResponse)({ status: 201, type: onboard_insurance_dto_1.OnboardInsuranceResponseDto }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, onboard_insurance_dto_1.OnboardInsuranceDto]),
    __metadata("design:returntype", Promise)
], InsuranceController.prototype, "onboardInsurance", null);
__decorate([
    (0, common_1.Post)('ocr/scan'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Scan insurance card image via OCR extraction' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: insurance_ocr_scan_dto_1.InsuranceOcrScanResponseDto }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, insurance_ocr_scan_dto_1.InsuranceOcrScanDto]),
    __metadata("design:returntype", Promise)
], InsuranceController.prototype, "scanInsuranceCard", null);
__decorate([
    (0, common_1.Post)('ocr/confirm'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Confirm extracted OCR data to create insurance policy' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: insurance_ocr_confirm_dto_1.InsuranceOcrConfirmResponseDto }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, insurance_ocr_confirm_dto_1.InsuranceOcrConfirmDto]),
    __metadata("design:returntype", Promise)
], InsuranceController.prototype, "confirmOcrScan", null);
exports.InsuranceController = InsuranceController = __decorate([
    (0, swagger_1.ApiTags)('Insurance Platform'),
    (0, common_1.Controller)('insurance'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, swagger_1.ApiBearerAuth)('JWT-Auth'),
    __metadata("design:paramtypes", [insurance_service_1.InsuranceService])
], InsuranceController);
//# sourceMappingURL=insurance.controller.js.map
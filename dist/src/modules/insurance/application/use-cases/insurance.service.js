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
exports.InsuranceService = void 0;
const common_1 = require("@nestjs/common");
const nestjs_pino_1 = require("nestjs-pino");
let InsuranceService = class InsuranceService {
    constructor(insuranceRepository, logger) {
        this.insuranceRepository = insuranceRepository;
        this.logger = logger;
    }
    async onboardInsurance(userId, dto) {
        const profile = await this.insuranceRepository.findProfileByUserId(userId);
        if (!profile) {
            throw new common_1.NotFoundException('Patient profile not found. Complete demographics onboarding first.');
        }
        let policy = await this.insuranceRepository.findPolicyByProfileId(profile.id);
        if (!policy) {
            policy = await this.insuranceRepository.createPolicy(profile.id, dto.providerName, dto.policyNumber, dto.coverageDetails);
            this.logger.log({ msg: 'New insurance policy saved during onboarding step 4' });
        }
        else {
            policy = await this.insuranceRepository.updatePolicy(policy.id, dto.providerName, dto.policyNumber, dto.coverageDetails);
            this.logger.log({ msg: 'Existing insurance policy updated during onboarding' });
        }
        return {
            policyId: policy.id,
            message: 'Insurance onboarding completed successfully',
            nextStep: 5,
        };
    }
    async scanInsuranceCard(userId, dto) {
        const profile = await this.insuranceRepository.findProfileByUserId(userId);
        if (!profile) {
            throw new common_1.NotFoundException('Patient profile not found');
        }
        this.logger.log({ msg: 'OCR scan requested for insurance card' });
        const mockExtracted = {
            providerName: 'Blue Shield OCR Candidate',
            policyNumber: 'POL987654321',
            coverageDetails: 'Co-pay $20 (Extracted)',
        };
        const record = await this.insuranceRepository.createOcrRecord(profile.id, dto.imageUrl, JSON.stringify(mockExtracted));
        this.logger.log({ msg: 'OCR extraction completed', ocrId: record.id });
        return {
            ocrId: record.id,
            extractedData: mockExtracted,
            confidence: 0.95,
        };
    }
    async confirmOcrData(userId, dto) {
        const profile = await this.insuranceRepository.findProfileByUserId(userId);
        if (!profile) {
            throw new common_1.NotFoundException('Patient profile not found');
        }
        const ocrRecord = await this.insuranceRepository.findOcrRecordById(dto.ocrId);
        if (!ocrRecord) {
            throw new common_1.NotFoundException('OCR record not found');
        }
        if (ocrRecord.isConfirmed) {
            throw new common_1.BadRequestException('OCR record has already been confirmed and processed');
        }
        await this.insuranceRepository.confirmOcrRecord(dto.ocrId);
        this.logger.log({ msg: 'Manual correction submitted for OCR card scan' });
        let policy = await this.insuranceRepository.findPolicyByProfileId(profile.id);
        if (!policy) {
            policy = await this.insuranceRepository.createPolicy(profile.id, dto.confirmedData.providerName, dto.confirmedData.policyNumber, dto.confirmedData.coverageDetails);
        }
        else {
            policy = await this.insuranceRepository.updatePolicy(policy.id, dto.confirmedData.providerName, dto.confirmedData.policyNumber, dto.confirmedData.coverageDetails);
        }
        this.logger.log({ msg: 'Policy saved and confirmed from OCR review' });
        return {
            policyId: policy.id,
            message: 'Insurance OCR data confirmed and policy saved',
        };
    }
};
exports.InsuranceService = InsuranceService;
exports.InsuranceService = InsuranceService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('IInsuranceRepository')),
    __metadata("design:paramtypes", [Object, nestjs_pino_1.Logger])
], InsuranceService);
//# sourceMappingURL=insurance.service.js.map
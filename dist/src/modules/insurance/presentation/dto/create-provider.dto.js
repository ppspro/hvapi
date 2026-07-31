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
exports.CreateClaimDraftDto = exports.PolicyActionDto = exports.CreateFullPolicyDto = exports.CreateBeneficiaryDto = exports.CreatePlanDto = exports.CreateProviderDto = exports.InsurancePolicyStatus = void 0;
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const swagger_1 = require("@nestjs/swagger");
var InsurancePolicyStatus;
(function (InsurancePolicyStatus) {
    InsurancePolicyStatus["DRAFT"] = "DRAFT";
    InsurancePolicyStatus["ACTIVE"] = "ACTIVE";
    InsurancePolicyStatus["SUSPENDED"] = "SUSPENDED";
    InsurancePolicyStatus["EXPIRED"] = "EXPIRED";
    InsurancePolicyStatus["CANCELLED"] = "CANCELLED";
    InsurancePolicyStatus["ARCHIVED"] = "ARCHIVED";
})(InsurancePolicyStatus || (exports.InsurancePolicyStatus = InsurancePolicyStatus = {}));
class CreateProviderDto {
}
exports.CreateProviderDto = CreateProviderDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'State Life Health Insurance' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateProviderDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'SLIC-HEALTH', description: 'Unique provider code' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateProviderDto.prototype, "code", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'support@statelife.com', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateProviderDto.prototype, "contactEmail", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '+92-51-111-111-222', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateProviderDto.prototype, "contactPhone", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Plot 14, Blue Area, Islamabad', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateProviderDto.prototype, "address", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'PPO', enum: ['PPO', 'HMO', 'EPO', 'POS'], required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateProviderDto.prototype, "networkType", void 0);
class CreatePlanDto {
}
exports.CreatePlanDto = CreatePlanDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'provider-uuid-1' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreatePlanDto.prototype, "providerId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Gold Comprehensive Health Plan' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreatePlanDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'GOLD-360-COMP' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreatePlanDto.prototype, "planCode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'COMPREHENSIVE', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreatePlanDto.prototype, "planType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 500, required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreatePlanDto.prototype, "deductibleAmount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 25, required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreatePlanDto.prototype, "copayAmount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 500000, required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreatePlanDto.prototype, "maxCoverageLimit", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: true, required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CreatePlanDto.prototype, "preAuthRequired", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 30, required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreatePlanDto.prototype, "waitingPeriodDays", void 0);
class CreateBeneficiaryDto {
}
exports.CreateBeneficiaryDto = CreateBeneficiaryDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Jane Doe' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateBeneficiaryDto.prototype, "fullName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'SPOUSE' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateBeneficiaryDto.prototype, "relationship", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '1992-08-20', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], CreateBeneficiaryDto.prototype, "dateOfBirth", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: false, required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CreateBeneficiaryDto.prototype, "isPrimary", void 0);
class CreateFullPolicyDto {
}
exports.CreateFullPolicyDto = CreateFullPolicyDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'State Life Health Insurance' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateFullPolicyDto.prototype, "providerName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'provider-uuid-1', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateFullPolicyDto.prototype, "providerId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'plan-uuid-1', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateFullPolicyDto.prototype, "planId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'POL-9988776655' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateFullPolicyDto.prototype, "policyNumber", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'GRP-100200', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateFullPolicyDto.prototype, "groupNumber", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: InsurancePolicyStatus, example: 'ACTIVE', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(InsurancePolicyStatus),
    __metadata("design:type", String)
], CreateFullPolicyDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Inpatient & Outpatient 80/20 coverage up to $500,000', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateFullPolicyDto.prototype, "coverageDetails", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2026-01-01', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], CreateFullPolicyDto.prototype, "startDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2026-12-31', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], CreateFullPolicyDto.prototype, "expiryDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 25, required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateFullPolicyDto.prototype, "copayAmount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 500, required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateFullPolicyDto.prototype, "deductibleAmount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 500000, required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateFullPolicyDto.prototype, "maxLimit", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: true, required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CreateFullPolicyDto.prototype, "preAuthRequired", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [CreateBeneficiaryDto], required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => CreateBeneficiaryDto),
    __metadata("design:type", Array)
], CreateFullPolicyDto.prototype, "beneficiaries", void 0);
class PolicyActionDto {
}
exports.PolicyActionDto = PolicyActionDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Action requested by policy holder/admin', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], PolicyActionDto.prototype, "reason", void 0);
class CreateClaimDraftDto {
}
exports.CreateClaimDraftDto = CreateClaimDraftDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'policy-uuid-1' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateClaimDraftDto.prototype, "policyId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1250.50, description: 'Total claimed amount in USD' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], CreateClaimDraftDto.prototype, "totalAmount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: ['ICD10-E11.9', 'ICD10-I10'], type: [String], required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], CreateClaimDraftDto.prototype, "diagnosisCodes", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2026-07-28', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], CreateClaimDraftDto.prototype, "treatmentDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Inpatient consultation and lab test reimbursement claim', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateClaimDraftDto.prototype, "notes", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: ['medical-record-uuid-1'], type: [String], required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], CreateClaimDraftDto.prototype, "attachedRecordIds", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: ['report-uuid-1'], type: [String], required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], CreateClaimDraftDto.prototype, "attachedReportIds", void 0);
//# sourceMappingURL=create-provider.dto.js.map
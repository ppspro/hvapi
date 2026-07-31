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
exports.InsuranceStatsResponseDto = exports.InsuranceClaimDraftResponseDto = exports.InsurancePolicyResponseDto = exports.InsuranceBeneficiaryResponseDto = exports.InsurancePlanResponseDto = exports.InsuranceProviderResponseDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class InsuranceProviderResponseDto {
}
exports.InsuranceProviderResponseDto = InsuranceProviderResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], InsuranceProviderResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], InsuranceProviderResponseDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], InsuranceProviderResponseDto.prototype, "code", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true }),
    __metadata("design:type", String)
], InsuranceProviderResponseDto.prototype, "contactEmail", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true }),
    __metadata("design:type", String)
], InsuranceProviderResponseDto.prototype, "contactPhone", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true }),
    __metadata("design:type", String)
], InsuranceProviderResponseDto.prototype, "address", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], InsuranceProviderResponseDto.prototype, "networkType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Boolean)
], InsuranceProviderResponseDto.prototype, "isActive", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], InsuranceProviderResponseDto.prototype, "createdAt", void 0);
class InsurancePlanResponseDto {
}
exports.InsurancePlanResponseDto = InsurancePlanResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], InsurancePlanResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], InsurancePlanResponseDto.prototype, "providerId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], InsurancePlanResponseDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], InsurancePlanResponseDto.prototype, "planCode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], InsurancePlanResponseDto.prototype, "planType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], InsurancePlanResponseDto.prototype, "deductibleAmount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], InsurancePlanResponseDto.prototype, "copayAmount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], InsurancePlanResponseDto.prototype, "maxCoverageLimit", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Boolean)
], InsurancePlanResponseDto.prototype, "preAuthRequired", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], InsurancePlanResponseDto.prototype, "waitingPeriodDays", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], InsurancePlanResponseDto.prototype, "createdAt", void 0);
class InsuranceBeneficiaryResponseDto {
}
exports.InsuranceBeneficiaryResponseDto = InsuranceBeneficiaryResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], InsuranceBeneficiaryResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], InsuranceBeneficiaryResponseDto.prototype, "policyId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], InsuranceBeneficiaryResponseDto.prototype, "fullName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], InsuranceBeneficiaryResponseDto.prototype, "relationship", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true }),
    __metadata("design:type", String)
], InsuranceBeneficiaryResponseDto.prototype, "dateOfBirth", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Boolean)
], InsuranceBeneficiaryResponseDto.prototype, "isPrimary", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], InsuranceBeneficiaryResponseDto.prototype, "createdAt", void 0);
class InsurancePolicyResponseDto {
}
exports.InsurancePolicyResponseDto = InsurancePolicyResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], InsurancePolicyResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], InsurancePolicyResponseDto.prototype, "patientProfileId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true }),
    __metadata("design:type", String)
], InsurancePolicyResponseDto.prototype, "providerId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true }),
    __metadata("design:type", String)
], InsurancePolicyResponseDto.prototype, "planId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], InsurancePolicyResponseDto.prototype, "providerName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], InsurancePolicyResponseDto.prototype, "policyNumber", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true }),
    __metadata("design:type", String)
], InsurancePolicyResponseDto.prototype, "groupNumber", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], InsurancePolicyResponseDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true }),
    __metadata("design:type", String)
], InsurancePolicyResponseDto.prototype, "coverageDetails", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true }),
    __metadata("design:type", String)
], InsurancePolicyResponseDto.prototype, "startDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true }),
    __metadata("design:type", String)
], InsurancePolicyResponseDto.prototype, "expiryDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], InsurancePolicyResponseDto.prototype, "verificationStatus", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true }),
    __metadata("design:type", String)
], InsurancePolicyResponseDto.prototype, "verifiedBy", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true }),
    __metadata("design:type", String)
], InsurancePolicyResponseDto.prototype, "verifiedAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true }),
    __metadata("design:type", Number)
], InsurancePolicyResponseDto.prototype, "copayAmount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true }),
    __metadata("design:type", Number)
], InsurancePolicyResponseDto.prototype, "deductibleAmount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true }),
    __metadata("design:type", Number)
], InsurancePolicyResponseDto.prototype, "maxLimit", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Boolean)
], InsurancePolicyResponseDto.prototype, "preAuthRequired", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true }),
    __metadata("design:type", String)
], InsurancePolicyResponseDto.prototype, "secondaryProvider", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true }),
    __metadata("design:type", String)
], InsurancePolicyResponseDto.prototype, "secondaryPolicyNumber", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true }),
    __metadata("design:type", String)
], InsurancePolicyResponseDto.prototype, "secondaryCoverage", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Boolean)
], InsurancePolicyResponseDto.prototype, "isDeleted", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [InsuranceBeneficiaryResponseDto], required: false }),
    __metadata("design:type", Array)
], InsurancePolicyResponseDto.prototype, "beneficiaries", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true }),
    __metadata("design:type", String)
], InsurancePolicyResponseDto.prototype, "qrToken", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], InsurancePolicyResponseDto.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], InsurancePolicyResponseDto.prototype, "updatedAt", void 0);
class InsuranceClaimDraftResponseDto {
}
exports.InsuranceClaimDraftResponseDto = InsuranceClaimDraftResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], InsuranceClaimDraftResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], InsuranceClaimDraftResponseDto.prototype, "policyId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], InsuranceClaimDraftResponseDto.prototype, "patientProfileId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], InsuranceClaimDraftResponseDto.prototype, "claimNumber", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], InsuranceClaimDraftResponseDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], InsuranceClaimDraftResponseDto.prototype, "totalAmount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [String] }),
    __metadata("design:type", Array)
], InsuranceClaimDraftResponseDto.prototype, "diagnosisCodes", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true }),
    __metadata("design:type", String)
], InsuranceClaimDraftResponseDto.prototype, "treatmentDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true }),
    __metadata("design:type", String)
], InsuranceClaimDraftResponseDto.prototype, "notes", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [String] }),
    __metadata("design:type", Array)
], InsuranceClaimDraftResponseDto.prototype, "attachedRecordIds", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [String] }),
    __metadata("design:type", Array)
], InsuranceClaimDraftResponseDto.prototype, "attachedReportIds", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], InsuranceClaimDraftResponseDto.prototype, "createdAt", void 0);
class InsuranceStatsResponseDto {
}
exports.InsuranceStatsResponseDto = InsuranceStatsResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], InsuranceStatsResponseDto.prototype, "totalPolicies", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], InsuranceStatsResponseDto.prototype, "activePolicies", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], InsuranceStatsResponseDto.prototype, "verifiedPolicies", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], InsuranceStatsResponseDto.prototype, "totalClaimDrafts", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], InsuranceStatsResponseDto.prototype, "totalProviders", void 0);
//# sourceMappingURL=insurance-response.dto.js.map
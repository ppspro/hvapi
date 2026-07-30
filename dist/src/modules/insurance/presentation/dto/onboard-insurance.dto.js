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
exports.OnboardInsuranceResponseDto = exports.OnboardInsuranceDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
class OnboardInsuranceDto {
}
exports.OnboardInsuranceDto = OnboardInsuranceDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Blue Shield', description: 'Insurance provider name' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], OnboardInsuranceDto.prototype, "providerName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'POL987654321', description: 'Insurance policy number' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], OnboardInsuranceDto.prototype, "policyNumber", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Co-pay $20, Deductible $500', description: 'Coverage details', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], OnboardInsuranceDto.prototype, "coverageDetails", void 0);
class OnboardInsuranceResponseDto {
}
exports.OnboardInsuranceResponseDto = OnboardInsuranceResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'policy-uuid', description: 'Created policy identifier' }),
    __metadata("design:type", String)
], OnboardInsuranceResponseDto.prototype, "policyId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Insurance onboarding completed successfully', description: 'Success status message' }),
    __metadata("design:type", String)
], OnboardInsuranceResponseDto.prototype, "message", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 5, description: 'Next onboarding step flow' }),
    __metadata("design:type", Number)
], OnboardInsuranceResponseDto.prototype, "nextStep", void 0);
//# sourceMappingURL=onboard-insurance.dto.js.map
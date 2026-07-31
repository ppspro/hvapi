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
    (0, swagger_1.ApiProperty)({ example: 'MetLife Healthcare', description: 'Primary insurance provider' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Primary insurance provider is required' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], OnboardInsuranceDto.prototype, "providerName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'POL-10029302', description: 'Primary policy identifier number' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Primary policy number is required' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], OnboardInsuranceDto.prototype, "policyNumber", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Standard Medical Plan A', description: 'Primary coverage description details' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], OnboardInsuranceDto.prototype, "coverageDetails", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2028-12-31', description: 'Primary policy expiration date' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Primary policy expiration date is required' }),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], OnboardInsuranceDto.prototype, "expiryDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Aetna Life', description: 'Secondary insurance provider' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], OnboardInsuranceDto.prototype, "secondaryProvider", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'POL-20038491', description: 'Secondary policy identifier number' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], OnboardInsuranceDto.prototype, "secondaryPolicyNumber", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Dental and Vision Supplement', description: 'Secondary coverage details' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], OnboardInsuranceDto.prototype, "secondaryCoverage", void 0);
class OnboardInsuranceResponseDto {
}
exports.OnboardInsuranceResponseDto = OnboardInsuranceResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'policy-uuid-v4', description: 'Insurance policy record ID' }),
    __metadata("design:type", String)
], OnboardInsuranceResponseDto.prototype, "policyId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Primary and optional secondary insurance linked successfully', description: 'Status message' }),
    __metadata("design:type", String)
], OnboardInsuranceResponseDto.prototype, "message", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 5, description: 'Next step to execute' }),
    __metadata("design:type", Number)
], OnboardInsuranceResponseDto.prototype, "nextStep", void 0);
//# sourceMappingURL=onboard-insurance.dto.js.map
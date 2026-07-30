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
exports.OnboardDemographicsResponseDto = exports.OnboardDemographicsDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
class OnboardDemographicsDto {
}
exports.OnboardDemographicsDto = OnboardDemographicsDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'John', description: 'First name of the patient' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], OnboardDemographicsDto.prototype, "firstName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Doe', description: 'Last name of the patient' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], OnboardDemographicsDto.prototype, "lastName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '1990-01-01', description: 'Date of birth of the patient' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], OnboardDemographicsDto.prototype, "dateOfBirth", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Male', description: 'Gender of the patient' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsIn)(['Male', 'Female', 'Other']),
    __metadata("design:type", String)
], OnboardDemographicsDto.prototype, "gender", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'O+', description: 'Blood group', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], OnboardDemographicsDto.prototype, "bloodGroup", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '123 Main St, New York, NY', description: 'Primary address', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], OnboardDemographicsDto.prototype, "address", void 0);
class OnboardDemographicsResponseDto {
}
exports.OnboardDemographicsResponseDto = OnboardDemographicsResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'profile-uuid', description: 'Created patient profile identifier' }),
    __metadata("design:type", String)
], OnboardDemographicsResponseDto.prototype, "profileId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Demographics onboarding completed successfully', description: 'Status message' }),
    __metadata("design:type", String)
], OnboardDemographicsResponseDto.prototype, "message", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 3, description: 'Next onboarding step flow' }),
    __metadata("design:type", Number)
], OnboardDemographicsResponseDto.prototype, "nextStep", void 0);
//# sourceMappingURL=onboard-demographics.dto.js.map
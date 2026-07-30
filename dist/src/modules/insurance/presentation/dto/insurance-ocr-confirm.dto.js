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
exports.InsuranceOcrConfirmResponseDto = exports.InsuranceOcrConfirmDto = void 0;
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const swagger_1 = require("@nestjs/swagger");
const onboard_insurance_dto_1 = require("./onboard-insurance.dto");
class InsuranceOcrConfirmDto {
}
exports.InsuranceOcrConfirmDto = InsuranceOcrConfirmDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'ocr-uuid-v4', description: 'OCR task identifier' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsUUID)('4'),
    __metadata("design:type", String)
], InsuranceOcrConfirmDto.prototype, "ocrId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: onboard_insurance_dto_1.OnboardInsuranceDto, description: 'Reviewed and corrected policy data' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => onboard_insurance_dto_1.OnboardInsuranceDto),
    __metadata("design:type", onboard_insurance_dto_1.OnboardInsuranceDto)
], InsuranceOcrConfirmDto.prototype, "confirmedData", void 0);
class InsuranceOcrConfirmResponseDto {
}
exports.InsuranceOcrConfirmResponseDto = InsuranceOcrConfirmResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'policy-uuid-v4', description: 'Created policy identifier' }),
    __metadata("design:type", String)
], InsuranceOcrConfirmResponseDto.prototype, "policyId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Insurance OCR data confirmed and policy saved', description: 'Success status message' }),
    __metadata("design:type", String)
], InsuranceOcrConfirmResponseDto.prototype, "message", void 0);
//# sourceMappingURL=insurance-ocr-confirm.dto.js.map
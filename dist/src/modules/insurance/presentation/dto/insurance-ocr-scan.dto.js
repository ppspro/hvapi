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
exports.InsuranceOcrScanResponseDto = exports.InsuranceOcrScanDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
class InsuranceOcrScanDto {
}
exports.InsuranceOcrScanDto = InsuranceOcrScanDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'https://storage.healthvault360.com/cards/ins-123.jpg', description: 'URL of the uploaded insurance card image' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsUrl)(),
    __metadata("design:type", String)
], InsuranceOcrScanDto.prototype, "imageUrl", void 0);
class InsuranceOcrScanResponseDto {
}
exports.InsuranceOcrScanResponseDto = InsuranceOcrScanResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'ocr-uuid', description: 'Identifier of the created OCR task' }),
    __metadata("design:type", String)
], InsuranceOcrScanResponseDto.prototype, "ocrId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: { providerName: 'Blue Shield', policyNumber: 'POL987654321', coverageDetails: 'OCR Extracted Details' },
        description: 'Extracted candidate policy values',
    }),
    __metadata("design:type", Object)
], InsuranceOcrScanResponseDto.prototype, "extractedData", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 0.95, description: 'OCR extraction confidence score (0.0 to 1.0)' }),
    __metadata("design:type", Number)
], InsuranceOcrScanResponseDto.prototype, "confidence", void 0);
//# sourceMappingURL=insurance-ocr-scan.dto.js.map
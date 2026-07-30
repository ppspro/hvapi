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
exports.AiOcrConfirmResponseDto = exports.AiOcrConfirmDto = exports.AiOcrExtractResponseDto = exports.AiOcrExtractDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
class AiOcrExtractDto {
}
exports.AiOcrExtractDto = AiOcrExtractDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'https://storage.healthvault360.com/reports/lab-123.jpg', description: 'URL of the uploaded medical report file image' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsUrl)(),
    __metadata("design:type", String)
], AiOcrExtractDto.prototype, "imageUrl", void 0);
class AiOcrExtractResponseDto {
}
exports.AiOcrExtractResponseDto = AiOcrExtractResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'ocr-doc-uuid-v4', description: 'Identifier of the created OCR document entry' }),
    __metadata("design:type", String)
], AiOcrExtractResponseDto.prototype, "documentId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: { title: 'Blood Panel', category: 'Laboratory', prescribedBy: 'Dr. Robert Watson' },
        description: 'AI candidate extracted fields payload structure',
    }),
    __metadata("design:type", Object)
], AiOcrExtractResponseDto.prototype, "extractedData", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 0.92, description: 'AI extraction confidence score (0.0 to 1.0)' }),
    __metadata("design:type", Number)
], AiOcrExtractResponseDto.prototype, "confidence", void 0);
class AiOcrConfirmDto {
}
exports.AiOcrConfirmDto = AiOcrConfirmDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'ocr-doc-uuid-v4', description: 'OCR document identifier' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsUUID)('4'),
    __metadata("design:type", String)
], AiOcrConfirmDto.prototype, "documentId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '{"title":"Blood Panel","category":"Laboratory","prescribedBy":"Dr. Watson"}', description: 'Corrected JSON string values confirmed by manual review' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AiOcrConfirmDto.prototype, "confirmedData", void 0);
class AiOcrConfirmResponseDto {
}
exports.AiOcrConfirmResponseDto = AiOcrConfirmResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: true }),
    __metadata("design:type", Boolean)
], AiOcrConfirmResponseDto.prototype, "success", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'OCR extraction verified and saved successfully' }),
    __metadata("design:type", String)
], AiOcrConfirmResponseDto.prototype, "message", void 0);
//# sourceMappingURL=ai-ocr.dto.js.map
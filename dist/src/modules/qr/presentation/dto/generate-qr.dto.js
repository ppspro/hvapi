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
exports.UpdateQrDto = exports.BulkQrActionDto = exports.BulkGenerateQrDto = exports.RevokeQrDto = exports.RotateQrDto = exports.VerifyQrPayloadDto = exports.GenerateQrDto = exports.QrEntityType = void 0;
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const swagger_1 = require("@nestjs/swagger");
var QrEntityType;
(function (QrEntityType) {
    QrEntityType["HEALTH_CARD"] = "HEALTH_CARD";
    QrEntityType["MEDICAL_RECORD"] = "MEDICAL_RECORD";
    QrEntityType["MEDICAL_REPORT"] = "MEDICAL_REPORT";
    QrEntityType["INSURANCE"] = "INSURANCE";
    QrEntityType["IMMUNISATION"] = "IMMUNISATION";
    QrEntityType["DOCTOR_ID"] = "DOCTOR_ID";
    QrEntityType["FACILITY_ID"] = "FACILITY_ID";
    QrEntityType["STAFF_ID"] = "STAFF_ID";
    QrEntityType["EMERGENCY_CARD"] = "EMERGENCY_CARD";
    QrEntityType["CUSTOM"] = "CUSTOM";
})(QrEntityType || (exports.QrEntityType = QrEntityType = {}));
class GenerateQrDto {
}
exports.GenerateQrDto = GenerateQrDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'entity-uuid-12345', description: 'ID of the business entity (Health Card ID, Record ID, Report ID, etc.)' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], GenerateQrDto.prototype, "entityId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: QrEntityType, example: 'HEALTH_CARD' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsEnum)(QrEntityType),
    __metadata("design:type", String)
], GenerateQrDto.prototype, "entityType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 365, required: false, description: 'Validity duration in days' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], GenerateQrDto.prototype, "validityDays", void 0);
class VerifyQrPayloadDto {
}
exports.VerifyQrPayloadDto = VerifyQrPayloadDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'qr_token_string_or_signed_hash', description: 'QR Token string to verify' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], VerifyQrPayloadDto.prototype, "token", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'iOS / Chrome 120', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], VerifyQrPayloadDto.prototype, "deviceInfo", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '37.7749,-122.4194', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], VerifyQrPayloadDto.prototype, "location", void 0);
class RotateQrDto {
}
exports.RotateQrDto = RotateQrDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Token compromised or scheduled rotation', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], RotateQrDto.prototype, "reason", void 0);
class RevokeQrDto {
}
exports.RevokeQrDto = RevokeQrDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Security compromise / lost card', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], RevokeQrDto.prototype, "reason", void 0);
class BulkGenerateQrDto {
}
exports.BulkGenerateQrDto = BulkGenerateQrDto;
__decorate([
    (0, swagger_1.ApiProperty)({ type: [GenerateQrDto] }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => GenerateQrDto),
    __metadata("design:type", Array)
], BulkGenerateQrDto.prototype, "items", void 0);
class BulkQrActionDto {
}
exports.BulkQrActionDto = BulkQrActionDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: ['qr-uuid-1', 'qr-uuid-2'], type: [String] }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], BulkQrActionDto.prototype, "qrIds", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Bulk administrative operation', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], BulkQrActionDto.prototype, "reason", void 0);
class UpdateQrDto {
}
exports.UpdateQrDto = UpdateQrDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 180, required: false, description: 'Extend or set expiry days' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], UpdateQrDto.prototype, "validityDays", void 0);
//# sourceMappingURL=generate-qr.dto.js.map
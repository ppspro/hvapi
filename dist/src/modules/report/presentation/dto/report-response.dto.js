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
exports.ReportResponseDto = exports.ReportAttachmentDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class ReportAttachmentDto {
}
exports.ReportAttachmentDto = ReportAttachmentDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'attachment-uuid-v4' }),
    __metadata("design:type", String)
], ReportAttachmentDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'cbc-report.pdf' }),
    __metadata("design:type", String)
], ReportAttachmentDto.prototype, "fileName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1048576 }),
    __metadata("design:type", Number)
], ReportAttachmentDto.prototype, "fileSize", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'application/pdf' }),
    __metadata("design:type", String)
], ReportAttachmentDto.prototype, "mimeType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'https://storage.healthvault360.com/reports/cbc.pdf' }),
    __metadata("design:type", String)
], ReportAttachmentDto.prototype, "storageUrl", void 0);
class ReportResponseDto {
}
exports.ReportResponseDto = ReportResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'report-uuid-v4' }),
    __metadata("design:type", String)
], ReportResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'CBC Blood Test' }),
    __metadata("design:type", String)
], ReportResponseDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Laboratory' }),
    __metadata("design:type", String)
], ReportResponseDto.prototype, "category", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Dr. Robert Chen', required: false }),
    __metadata("design:type", String)
], ReportResponseDto.prototype, "prescribedBy", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2026-07-30T17:25:54.000Z' }),
    __metadata("design:type", Date)
], ReportResponseDto.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [ReportAttachmentDto], description: 'Attachments linked to the report' }),
    __metadata("design:type", Array)
], ReportResponseDto.prototype, "attachments", void 0);
//# sourceMappingURL=report-response.dto.js.map
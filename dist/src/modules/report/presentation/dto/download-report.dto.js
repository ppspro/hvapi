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
exports.DownloadReportResponseDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class DownloadReportResponseDto {
}
exports.DownloadReportResponseDto = DownloadReportResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'https://storage.healthvault360.com/reports/cbc.pdf?expiry-signature-auth', description: 'Secure presigned temporary file download link' }),
    __metadata("design:type", String)
], DownloadReportResponseDto.prototype, "downloadUrl", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '3600', description: 'Link validity duration in seconds' }),
    __metadata("design:type", Number)
], DownloadReportResponseDto.prototype, "expiresInSeconds", void 0);
//# sourceMappingURL=download-report.dto.js.map
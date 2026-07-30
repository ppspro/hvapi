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
exports.AuditLogResponseDto = exports.AdminDashboardStatsDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class AdminDashboardStatsDto {
}
exports.AdminDashboardStatsDto = AdminDashboardStatsDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1200 }),
    __metadata("design:type", Number)
], AdminDashboardStatsDto.prototype, "totalPatients", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 450 }),
    __metadata("design:type", Number)
], AdminDashboardStatsDto.prototype, "totalDoctors", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 85 }),
    __metadata("design:type", Number)
], AdminDashboardStatsDto.prototype, "pendingOcrReviews", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 3400 }),
    __metadata("design:type", Number)
], AdminDashboardStatsDto.prototype, "systemLogsCount", void 0);
class AuditLogResponseDto {
}
exports.AuditLogResponseDto = AuditLogResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'log-uuid-v4' }),
    __metadata("design:type", String)
], AuditLogResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'user-uuid-v4' }),
    __metadata("design:type", String)
], AuditLogResponseDto.prototype, "userId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'USER_LOGIN' }),
    __metadata("design:type", String)
], AuditLogResponseDto.prototype, "action", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'User logged in successfully' }),
    __metadata("design:type", String)
], AuditLogResponseDto.prototype, "details", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '127.0.0.1' }),
    __metadata("design:type", String)
], AuditLogResponseDto.prototype, "ipAddress", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2026-07-30T17:25:54.000Z' }),
    __metadata("design:type", Date)
], AuditLogResponseDto.prototype, "createdAt", void 0);
//# sourceMappingURL=admin.dto.js.map
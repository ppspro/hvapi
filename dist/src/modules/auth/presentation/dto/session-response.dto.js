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
exports.SessionResponseDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class SessionResponseDto {
}
exports.SessionResponseDto = SessionResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'session-uuid-v4', description: 'Session identifier' }),
    __metadata("design:type", String)
], SessionResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '127.0.0.1', description: 'Client IP address' }),
    __metadata("design:type", Object)
], SessionResponseDto.prototype, "ipAddress", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Mozilla/5.0 ...', description: 'Client user agent' }),
    __metadata("design:type", Object)
], SessionResponseDto.prototype, "userAgent", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2026-07-31T06:00:00.000Z', description: 'Session creation timestamp' }),
    __metadata("design:type", Date)
], SessionResponseDto.prototype, "createdAt", void 0);
//# sourceMappingURL=session-response.dto.js.map
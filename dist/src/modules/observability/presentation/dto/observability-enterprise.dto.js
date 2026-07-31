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
exports.RecordHealthCheckDto = exports.CreateTraceDto = exports.CreateLogDto = exports.CreateMetricDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
class CreateMetricDto {
}
exports.CreateMetricDto = CreateMetricDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'API', enum: ['SYSTEM', 'APPLICATION', 'DATABASE', 'CACHE', 'QUEUE', 'API', 'SECURITY', 'OCR', 'NOTIFICATION'] }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateMetricDto.prototype, "metricCategory", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'http_request_duration_ms' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateMetricDto.prototype, "metricName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 45.2 }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateMetricDto.prototype, "metricValue", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'ms', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateMetricDto.prototype, "unit", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: { path: '/api/v1/patients', method: 'GET' }, required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsObject)(),
    __metadata("design:type", Object)
], CreateMetricDto.prototype, "metadata", void 0);
class CreateLogDto {
}
exports.CreateLogDto = CreateLogDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'INFO', enum: ['TRACE', 'DEBUG', 'INFO', 'WARN', 'ERROR', 'FATAL'], required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateLogDto.prototype, "severity", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'patient-module', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateLogDto.prototype, "module", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'req-uuid-1', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateLogDto.prototype, "requestId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'trace-uuid-1', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateLogDto.prototype, "traceId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Patient profile retrieved successfully' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateLogDto.prototype, "message", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: { patientId: 'patient-1' }, required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsObject)(),
    __metadata("design:type", Object)
], CreateLogDto.prototype, "context", void 0);
class CreateTraceDto {
}
exports.CreateTraceDto = CreateTraceDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'trace-uuid-999' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateTraceDto.prototype, "traceId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'PatientService.getProfile' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateTraceDto.prototype, "operation", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: { dbQueries: 2 }, required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsObject)(),
    __metadata("design:type", Object)
], CreateTraceDto.prototype, "metadata", void 0);
class RecordHealthCheckDto {
}
exports.RecordHealthCheckDto = RecordHealthCheckDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'postgresql' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], RecordHealthCheckDto.prototype, "component", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'HEALTHY', enum: ['HEALTHY', 'DEGRADED', 'UNHEALTHY', 'OFFLINE'], required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], RecordHealthCheckDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 4, required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], RecordHealthCheckDto.prototype, "responseTimeMs", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: { activeConnections: 12 }, required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsObject)(),
    __metadata("design:type", Object)
], RecordHealthCheckDto.prototype, "details", void 0);
//# sourceMappingURL=observability-enterprise.dto.js.map
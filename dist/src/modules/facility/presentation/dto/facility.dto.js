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
exports.DepartmentResponseDto = exports.FacilityResponseDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class FacilityResponseDto {
}
exports.FacilityResponseDto = FacilityResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'facility-uuid-v4' }),
    __metadata("design:type", String)
], FacilityResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Mayo Clinic' }),
    __metadata("design:type", String)
], FacilityResponseDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '123 Medical Ctr Dr' }),
    __metadata("design:type", String)
], FacilityResponseDto.prototype, "address", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '+14155551234' }),
    __metadata("design:type", String)
], FacilityResponseDto.prototype, "phone", void 0);
class DepartmentResponseDto {
}
exports.DepartmentResponseDto = DepartmentResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'dept-uuid-v4' }),
    __metadata("design:type", String)
], DepartmentResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Cardiology' }),
    __metadata("design:type", String)
], DepartmentResponseDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Heart Health Center', required: false }),
    __metadata("design:type", String)
], DepartmentResponseDto.prototype, "description", void 0);
//# sourceMappingURL=facility.dto.js.map
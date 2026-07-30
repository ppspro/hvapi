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
exports.ScheduleSlotResponseDto = exports.DoctorProfileResponseDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class DoctorProfileResponseDto {
}
exports.DoctorProfileResponseDto = DoctorProfileResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'doctor-uuid-v4' }),
    __metadata("design:type", String)
], DoctorProfileResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Dr. John Watson' }),
    __metadata("design:type", String)
], DoctorProfileResponseDto.prototype, "fullName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'General Medicine' }),
    __metadata("design:type", String)
], DoctorProfileResponseDto.prototype, "specialization", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'MD, PhD' }),
    __metadata("design:type", String)
], DoctorProfileResponseDto.prototype, "credentials", void 0);
class ScheduleSlotResponseDto {
}
exports.ScheduleSlotResponseDto = ScheduleSlotResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'slot-uuid-v4' }),
    __metadata("design:type", String)
], ScheduleSlotResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2026-07-30T09:00:00.000Z' }),
    __metadata("design:type", Date)
], ScheduleSlotResponseDto.prototype, "startTime", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2026-07-30T09:30:00.000Z' }),
    __metadata("design:type", Date)
], ScheduleSlotResponseDto.prototype, "endTime", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: false }),
    __metadata("design:type", Boolean)
], ScheduleSlotResponseDto.prototype, "isBooked", void 0);
//# sourceMappingURL=doctor-profile.dto.js.map
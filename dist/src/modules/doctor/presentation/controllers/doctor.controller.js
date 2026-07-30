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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DoctorController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const passport_1 = require("@nestjs/passport");
const doctor_service_1 = require("../../application/use-cases/doctor.service");
const doctor_profile_dto_1 = require("../dto/doctor-profile.dto");
let DoctorController = class DoctorController {
    constructor(doctorService) {
        this.doctorService = doctorService;
    }
    async getDoctorProfile(doctorId) {
        return this.doctorService.getDoctorProfile(doctorId);
    }
    async getDoctorSlots(doctorId) {
        return this.doctorService.getDoctorSlots(doctorId);
    }
};
exports.DoctorController = DoctorController;
__decorate([
    (0, common_1.Get)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Get Doctor Profile' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: doctor_profile_dto_1.DoctorProfileResponseDto }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], DoctorController.prototype, "getDoctorProfile", null);
__decorate([
    (0, common_1.Get)(':id/slots'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Get Doctor Availability Schedule Slots' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: [doctor_profile_dto_1.ScheduleSlotResponseDto] }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], DoctorController.prototype, "getDoctorSlots", null);
exports.DoctorController = DoctorController = __decorate([
    (0, swagger_1.ApiTags)('Doctors'),
    (0, common_1.Controller)('doctors'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, swagger_1.ApiBearerAuth)('JWT-Auth'),
    __metadata("design:paramtypes", [doctor_service_1.DoctorService])
], DoctorController);
//# sourceMappingURL=doctor.controller.js.map
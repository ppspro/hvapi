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
exports.ShiftController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const passport_1 = require("@nestjs/passport");
const schedule_service_1 = require("../../application/use-cases/schedule.service");
const create_schedule_dto_1 = require("../dto/create-schedule.dto");
const schedule_response_dto_1 = require("../dto/schedule-response.dto");
let ShiftController = class ShiftController {
    constructor(scheduleService) {
        this.scheduleService = scheduleService;
    }
    async createShift(dto) {
        return this.scheduleService.createShift(dto);
    }
    async getShifts(facilityId) {
        return this.scheduleService.getShifts(facilityId);
    }
    async assignStaffToShift(id, dto) {
        return this.scheduleService.assignStaffToShift(id, dto);
    }
    async getShiftAssignments(id) {
        return this.scheduleService.getShiftAssignments(id);
    }
};
exports.ShiftController = ShiftController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, swagger_1.ApiOperation)({ summary: 'Create shift definition (Morning / Evening / Night / Split / Custom)' }),
    (0, swagger_1.ApiResponse)({ status: 201, type: schedule_response_dto_1.ShiftResponseDto }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_schedule_dto_1.CreateShiftDto]),
    __metadata("design:returntype", Promise)
], ShiftController.prototype, "createShift", null);
__decorate([
    (0, common_1.Get)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'List shift definitions, optionally filtered by facility' }),
    (0, swagger_1.ApiQuery)({ name: 'facilityId', required: false }),
    (0, swagger_1.ApiResponse)({ status: 200, type: [schedule_response_dto_1.ShiftResponseDto] }),
    __param(0, (0, common_1.Query)('facilityId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ShiftController.prototype, "getShifts", null);
__decorate([
    (0, common_1.Post)(':id/assign'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Assign a staff member to a shift for a specific date' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Shift ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: schedule_response_dto_1.ShiftResponseDto }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, create_schedule_dto_1.AssignStaffToShiftDto]),
    __metadata("design:returntype", Promise)
], ShiftController.prototype, "assignStaffToShift", null);
__decorate([
    (0, common_1.Get)(':id/assignments'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Get all staff assignments for a specific shift' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Shift ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Shift assignment list' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ShiftController.prototype, "getShiftAssignments", null);
exports.ShiftController = ShiftController = __decorate([
    (0, swagger_1.ApiTags)('Shifts'),
    (0, common_1.Controller)('shifts'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, swagger_1.ApiBearerAuth)('JWT-Auth'),
    __metadata("design:paramtypes", [schedule_service_1.ScheduleService])
], ShiftController);
//# sourceMappingURL=shift.controller.js.map
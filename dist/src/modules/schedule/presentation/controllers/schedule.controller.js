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
exports.ScheduleController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const passport_1 = require("@nestjs/passport");
const schedule_service_1 = require("../../application/use-cases/schedule.service");
const create_schedule_dto_1 = require("../dto/create-schedule.dto");
const schedule_response_dto_1 = require("../dto/schedule-response.dto");
let ScheduleController = class ScheduleController {
    constructor(scheduleService) {
        this.scheduleService = scheduleService;
    }
    async createSchedule(req, dto) {
        return this.scheduleService.createSchedule(req.user.userId, dto);
    }
    async getSchedules() {
        return this.scheduleService.getSchedules();
    }
    async searchSchedules(query) {
        return this.scheduleService.searchSchedules(query);
    }
    async getStatistics() {
        return this.scheduleService.getStatistics();
    }
    async getScheduleById(id) {
        return this.scheduleService.getScheduleById(id);
    }
    async updateSchedule(id, dto) {
        return this.scheduleService.updateSchedule(id, dto);
    }
    async softDeleteSchedule(id) {
        return this.scheduleService.softDeleteSchedule(id);
    }
    async generateSlots(req, id, dto) {
        return this.scheduleService.generateSlots(id, dto, req.user.userId);
    }
    async getSlots(id, fromDate, toDate) {
        return this.scheduleService.getSlots(id, fromDate, toDate);
    }
    async blockSchedule(req, id, dto) {
        return this.scheduleService.blockSchedule(id, dto, req.user.userId);
    }
    async unblockSchedule(req, id, exceptionId) {
        return this.scheduleService.unblockSchedule(id, exceptionId, req.user.userId);
    }
    async addLeaveBlock(req, id, dto) {
        return this.scheduleService.addLeaveBlock(id, dto, req.user.userId);
    }
    async getHistory(id) {
        return this.scheduleService.getHistory(id);
    }
};
exports.ScheduleController = ScheduleController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, swagger_1.ApiOperation)({ summary: 'Create a schedule profile (doctor / staff / facility)' }),
    (0, swagger_1.ApiResponse)({ status: 201, type: schedule_response_dto_1.ScheduleFullResponseDto }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_schedule_dto_1.CreateScheduleDto]),
    __metadata("design:returntype", Promise)
], ScheduleController.prototype, "createSchedule", null);
__decorate([
    (0, common_1.Get)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'List all schedule profiles' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: [schedule_response_dto_1.ScheduleFullResponseDto] }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ScheduleController.prototype, "getSchedules", null);
__decorate([
    (0, common_1.Get)('search'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Search schedules by owner type, title, facility or doctor' }),
    (0, swagger_1.ApiQuery)({ name: 'q', required: true }),
    (0, swagger_1.ApiResponse)({ status: 200, type: [schedule_response_dto_1.ScheduleFullResponseDto] }),
    __param(0, (0, common_1.Query)('q')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ScheduleController.prototype, "searchSchedules", null);
__decorate([
    (0, common_1.Get)('statistics'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Platform-wide scheduling engine statistics' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: schedule_response_dto_1.ScheduleStatsResponseDto }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ScheduleController.prototype, "getStatistics", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Get schedule detail with working hours, exceptions, leave blocks' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Schedule ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: schedule_response_dto_1.ScheduleFullResponseDto }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ScheduleController.prototype, "getScheduleById", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Update schedule profile and/or working hours' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Schedule ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: schedule_response_dto_1.ScheduleFullResponseDto }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ScheduleController.prototype, "updateSchedule", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Soft-delete a schedule profile' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Schedule ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Schedule soft-deleted' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ScheduleController.prototype, "softDeleteSchedule", null);
__decorate([
    (0, common_1.Post)(':id/generate-slots'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Run slot generation engine for a date range' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Schedule ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Generated availability slots' }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, create_schedule_dto_1.GenerateSlotsDto]),
    __metadata("design:returntype", Promise)
], ScheduleController.prototype, "generateSlots", null);
__decorate([
    (0, common_1.Get)(':id/slots'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Get generated slots for a schedule in a date range' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Schedule ID' }),
    (0, swagger_1.ApiQuery)({ name: 'fromDate', required: true, example: '2025-08-01' }),
    (0, swagger_1.ApiQuery)({ name: 'toDate', required: true, example: '2025-08-31' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: [schedule_response_dto_1.GeneratedSlotResponseDto] }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Query)('fromDate')),
    __param(2, (0, common_1.Query)('toDate')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], ScheduleController.prototype, "getSlots", null);
__decorate([
    (0, common_1.Post)(':id/block'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Add schedule exception (vacation, conference, emergency, etc.)' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Schedule ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: schedule_response_dto_1.ScheduleFullResponseDto }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, create_schedule_dto_1.BlockScheduleDto]),
    __metadata("design:returntype", Promise)
], ScheduleController.prototype, "blockSchedule", null);
__decorate([
    (0, common_1.Post)(':id/unblock'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Remove a schedule exception by its ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Schedule ID' }),
    (0, swagger_1.ApiQuery)({ name: 'exceptionId', required: true }),
    (0, swagger_1.ApiResponse)({ status: 200, type: schedule_response_dto_1.ScheduleFullResponseDto }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Query)('exceptionId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String]),
    __metadata("design:returntype", Promise)
], ScheduleController.prototype, "unblockSchedule", null);
__decorate([
    (0, common_1.Post)(':id/leave'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Add leave block (sick, casual, earned, emergency) to schedule' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Schedule ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: schedule_response_dto_1.ScheduleFullResponseDto }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, create_schedule_dto_1.CreateLeaveBlockDto]),
    __metadata("design:returntype", Promise)
], ScheduleController.prototype, "addLeaveBlock", null);
__decorate([
    (0, common_1.Get)(':id/history'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Get full schedule audit & modification history' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Schedule ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: [schedule_response_dto_1.ScheduleAuditLogResponseDto] }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ScheduleController.prototype, "getHistory", null);
exports.ScheduleController = ScheduleController = __decorate([
    (0, swagger_1.ApiTags)('Schedules'),
    (0, common_1.Controller)('schedules'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, swagger_1.ApiBearerAuth)('JWT-Auth'),
    __metadata("design:paramtypes", [schedule_service_1.ScheduleService])
], ScheduleController);
//# sourceMappingURL=schedule.controller.js.map
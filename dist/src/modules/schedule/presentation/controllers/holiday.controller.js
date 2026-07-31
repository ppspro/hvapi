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
exports.HolidayController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const passport_1 = require("@nestjs/passport");
const schedule_service_1 = require("../../application/use-cases/schedule.service");
const create_schedule_dto_1 = require("../dto/create-schedule.dto");
const schedule_response_dto_1 = require("../dto/schedule-response.dto");
let HolidayController = class HolidayController {
    constructor(scheduleService) {
        this.scheduleService = scheduleService;
    }
    async createHoliday(dto) {
        return this.scheduleService.createHoliday(dto);
    }
    async getHolidays(facilityId) {
        return this.scheduleService.getHolidays(facilityId);
    }
};
exports.HolidayController = HolidayController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, swagger_1.ApiOperation)({ summary: 'Add a holiday to the calendar (global or facility-specific)' }),
    (0, swagger_1.ApiResponse)({ status: 201, type: schedule_response_dto_1.HolidayResponseDto }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_schedule_dto_1.CreateHolidayDto]),
    __metadata("design:returntype", Promise)
], HolidayController.prototype, "createHoliday", null);
__decorate([
    (0, common_1.Get)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'List holidays (global + optional facility-specific)' }),
    (0, swagger_1.ApiQuery)({ name: 'facilityId', required: false, description: 'Filter by facility (also includes global holidays)' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: [schedule_response_dto_1.HolidayResponseDto] }),
    __param(0, (0, common_1.Query)('facilityId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], HolidayController.prototype, "getHolidays", null);
exports.HolidayController = HolidayController = __decorate([
    (0, swagger_1.ApiTags)('Holidays'),
    (0, common_1.Controller)('holidays'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, swagger_1.ApiBearerAuth)('JWT-Auth'),
    __metadata("design:paramtypes", [schedule_service_1.ScheduleService])
], HolidayController);
//# sourceMappingURL=holiday.controller.js.map
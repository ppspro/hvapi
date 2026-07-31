"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScheduleModule = void 0;
const common_1 = require("@nestjs/common");
const schedule_controller_1 = require("./presentation/controllers/schedule.controller");
const shift_controller_1 = require("./presentation/controllers/shift.controller");
const holiday_controller_1 = require("./presentation/controllers/holiday.controller");
const schedule_service_1 = require("./application/use-cases/schedule.service");
const slot_engine_service_1 = require("./application/use-cases/slot-engine.service");
const schedule_repository_1 = require("./infrastructure/database/schedule.repository");
const database_module_1 = require("../../database/database.module");
let ScheduleModule = class ScheduleModule {
};
exports.ScheduleModule = ScheduleModule;
exports.ScheduleModule = ScheduleModule = __decorate([
    (0, common_1.Module)({
        imports: [database_module_1.DatabaseModule],
        controllers: [schedule_controller_1.ScheduleController, shift_controller_1.ShiftController, holiday_controller_1.HolidayController],
        providers: [
            schedule_service_1.ScheduleService,
            slot_engine_service_1.SlotEngineService,
            {
                provide: 'IScheduleRepository',
                useClass: schedule_repository_1.ScheduleRepository,
            },
        ],
        exports: [schedule_service_1.ScheduleService, slot_engine_service_1.SlotEngineService],
    })
], ScheduleModule);
//# sourceMappingURL=schedule.module.js.map
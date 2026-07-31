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
exports.ScheduleService = void 0;
const common_1 = require("@nestjs/common");
const slot_engine_service_1 = require("./slot-engine.service");
const nestjs_pino_1 = require("nestjs-pino");
let ScheduleService = class ScheduleService {
    constructor(repository, slotEngine, logger) {
        this.repository = repository;
        this.slotEngine = slotEngine;
        this.logger = logger;
    }
    mapSchedule(s) {
        return {
            id: s.id,
            ownerType: s.ownerType,
            doctorProfileId: s.doctorProfileId || undefined,
            staffId: s.staffId || undefined,
            facilityId: s.facilityId || undefined,
            departmentId: s.departmentId || undefined,
            title: s.title,
            timezone: s.timezone,
            slotDurationMinutes: s.slotDurationMinutes,
            bufferMinutes: s.bufferMinutes,
            maxPatientsPerSlot: s.maxPatientsPerSlot,
            effectiveFrom: s.effectiveFrom.toISOString().split('T')[0],
            effectiveTo: s.effectiveTo ? s.effectiveTo.toISOString().split('T')[0] : undefined,
            isActive: s.isActive,
            notes: s.notes || undefined,
            isDeleted: s.isDeleted,
            workingHours: s.workingHours?.map((wh) => ({
                id: wh.id,
                dayOfWeek: wh.dayOfWeek,
                sessionType: wh.sessionType,
                startTime: wh.startTime,
                endTime: wh.endTime,
                breakStart: wh.breakStart || undefined,
                breakEnd: wh.breakEnd || undefined,
                isEnabled: wh.isEnabled,
                createdAt: wh.createdAt.toISOString(),
            })) || [],
            exceptions: s.exceptions?.map((ex) => ({
                id: ex.id,
                exceptionType: ex.exceptionType,
                startDatetime: ex.startDatetime.toISOString(),
                endDatetime: ex.endDatetime.toISOString(),
                reason: ex.reason || undefined,
                addedBy: ex.addedBy || undefined,
                createdAt: ex.createdAt.toISOString(),
            })) || [],
            leaveBlocks: s.leaveBlocks?.map((lb) => ({
                id: lb.id,
                leaveType: lb.leaveType,
                startDate: lb.startDate.toISOString().split('T')[0],
                endDate: lb.endDate.toISOString().split('T')[0],
                reason: lb.reason || undefined,
                status: lb.status,
                createdAt: lb.createdAt.toISOString(),
            })) || [],
            createdAt: s.createdAt.toISOString(),
            updatedAt: s.updatedAt.toISOString(),
        };
    }
    async createSchedule(userId, dto) {
        const schedule = await this.repository.createSchedule({ ...dto, createdBy: userId });
        if (dto.workingHours && dto.workingHours.length > 0) {
            await this.repository.upsertWorkingHours(schedule.id, dto.workingHours);
        }
        await this.repository.createAuditLog({
            scheduleId: schedule.id,
            action: 'CREATED',
            performedBy: userId,
            details: `Schedule created for ${dto.ownerType}`,
        });
        const fresh = await this.repository.findScheduleById(schedule.id);
        return this.mapSchedule(fresh);
    }
    async getSchedules() {
        const schedules = await this.repository.findSchedules();
        return schedules.map((s) => this.mapSchedule(s));
    }
    async getScheduleById(id) {
        const schedule = await this.repository.findScheduleById(id);
        if (!schedule)
            throw new common_1.NotFoundException('Schedule not found');
        return this.mapSchedule(schedule);
    }
    async updateSchedule(id, dto) {
        const schedule = await this.repository.findScheduleById(id);
        if (!schedule)
            throw new common_1.NotFoundException('Schedule not found');
        const updated = await this.repository.updateSchedule(id, dto);
        if (dto.workingHours && dto.workingHours.length > 0) {
            await this.repository.upsertWorkingHours(id, dto.workingHours);
        }
        await this.repository.createAuditLog({ scheduleId: id, action: 'UPDATED', details: 'Schedule updated' });
        const fresh = await this.repository.findScheduleById(id);
        return this.mapSchedule(fresh);
    }
    async softDeleteSchedule(id) {
        const schedule = await this.repository.findScheduleById(id);
        if (!schedule)
            throw new common_1.NotFoundException('Schedule not found');
        await this.repository.softDeleteSchedule(id);
        return { message: 'Schedule soft-deleted successfully' };
    }
    async searchSchedules(query) {
        if (!query?.trim())
            return [];
        const results = await this.repository.searchSchedules(query.trim());
        return results.map((s) => this.mapSchedule(s));
    }
    async getStatistics() {
        return this.repository.getStatistics();
    }
    async generateSlots(id, dto, userId) {
        const schedule = await this.repository.findScheduleById(id);
        if (!schedule)
            throw new common_1.NotFoundException('Schedule not found');
        const fromDate = new Date(dto.fromDate);
        const toDate = new Date(dto.toDate);
        const holidays = await this.repository.findHolidaysInRange(fromDate, toDate, schedule.facilityId || undefined);
        const holidayDates = holidays.map((h) => new Date(h.holidayDate));
        const leaveBlocks = schedule.leaveBlocks || [];
        const leaveDates = [];
        for (const lb of leaveBlocks) {
            const lbStart = new Date(lb.startDate);
            const lbEnd = new Date(lb.endDate);
            const cur = new Date(lbStart);
            while (cur <= lbEnd) {
                leaveDates.push(new Date(cur));
                cur.setDate(cur.getDate() + 1);
            }
        }
        const workingHours = await this.repository.findWorkingHours(id);
        const exceptions = await this.repository.findExceptions(id);
        await this.repository.deleteSlotsByScheduleAndDate(id, fromDate, toDate);
        const rawSlots = this.slotEngine.generateSlots({
            scheduleId: id,
            fromDate,
            toDate,
            workingHours,
            exceptions,
            holidayDates,
            leaveDates,
            slotDurationMinutes: schedule.slotDurationMinutes,
            bufferMinutes: schedule.bufferMinutes,
        });
        const generated = await this.repository.bulkUpsertSlots(rawSlots);
        await this.repository.createAuditLog({
            scheduleId: id,
            action: 'SLOTS_GENERATED',
            performedBy: userId,
            details: `Generated ${generated} slots from ${dto.fromDate} to ${dto.toDate}`,
        });
        const persistedSlots = await this.repository.findSlotsByScheduleAndDate(id, fromDate, toDate);
        return {
            generated,
            slots: persistedSlots.map((slot) => ({
                id: slot.id,
                scheduleId: slot.scheduleId,
                slotDate: new Date(slot.slotDate).toISOString().split('T')[0],
                startTime: slot.startTime,
                endTime: slot.endTime,
                durationMinutes: slot.durationMinutes,
                status: slot.status,
                statusReason: slot.statusReason || undefined,
                createdAt: slot.createdAt.toISOString(),
            })),
        };
    }
    async getSlots(id, fromDate, toDate) {
        const schedule = await this.repository.findScheduleById(id);
        if (!schedule)
            throw new common_1.NotFoundException('Schedule not found');
        const slots = await this.repository.findSlotsByScheduleAndDate(id, new Date(fromDate), new Date(toDate));
        return slots.map((slot) => ({
            id: slot.id,
            scheduleId: slot.scheduleId,
            slotDate: new Date(slot.slotDate).toISOString().split('T')[0],
            startTime: slot.startTime,
            endTime: slot.endTime,
            durationMinutes: slot.durationMinutes,
            status: slot.status,
            statusReason: slot.statusReason || undefined,
            createdAt: slot.createdAt.toISOString(),
        }));
    }
    async blockSchedule(id, dto, userId) {
        const schedule = await this.repository.findScheduleById(id);
        if (!schedule)
            throw new common_1.NotFoundException('Schedule not found');
        await this.repository.createException(id, { ...dto, addedBy: userId });
        await this.repository.createAuditLog({
            scheduleId: id,
            action: 'BLOCKED',
            performedBy: userId,
            details: `Exception: ${dto.exceptionType} from ${dto.startDatetime} to ${dto.endDatetime}`,
        });
        const fresh = await this.repository.findScheduleById(id);
        return this.mapSchedule(fresh);
    }
    async unblockSchedule(id, exceptionId, userId) {
        const schedule = await this.repository.findScheduleById(id);
        if (!schedule)
            throw new common_1.NotFoundException('Schedule not found');
        await this.repository.deleteException(exceptionId);
        await this.repository.createAuditLog({
            scheduleId: id,
            action: 'UNBLOCKED',
            performedBy: userId,
            details: `Exception ${exceptionId} removed`,
        });
        const fresh = await this.repository.findScheduleById(id);
        return this.mapSchedule(fresh);
    }
    async addLeaveBlock(id, dto, userId) {
        const schedule = await this.repository.findScheduleById(id);
        if (!schedule)
            throw new common_1.NotFoundException('Schedule not found');
        await this.repository.createLeaveBlock(id, { ...dto, approvedBy: userId });
        await this.repository.createAuditLog({
            scheduleId: id,
            action: 'LEAVE_ADDED',
            performedBy: userId,
            details: `Leave ${dto.leaveType} from ${dto.startDate} to ${dto.endDate}`,
        });
        const fresh = await this.repository.findScheduleById(id);
        return this.mapSchedule(fresh);
    }
    async getHistory(id) {
        const schedule = await this.repository.findScheduleById(id, true);
        if (!schedule)
            throw new common_1.NotFoundException('Schedule not found');
        const logs = await this.repository.findAuditLogs(id);
        return logs.map((l) => ({
            id: l.id,
            scheduleId: l.scheduleId,
            action: l.action,
            performedBy: l.performedBy || undefined,
            details: l.details || undefined,
            createdAt: l.createdAt.toISOString(),
        }));
    }
    async createShift(dto) {
        const shift = await this.repository.createShift(dto);
        return this.mapShift(shift);
    }
    async getShifts(facilityId) {
        const shifts = await this.repository.findShifts(facilityId);
        return shifts.map((s) => this.mapShift(s));
    }
    async assignStaffToShift(shiftId, dto) {
        const shift = await this.repository.findShiftById(shiftId);
        if (!shift)
            throw new common_1.NotFoundException('Shift not found');
        await this.repository.assignStaffToShift(shiftId, dto);
        const fresh = await this.repository.findShiftById(shiftId);
        return this.mapShift(fresh);
    }
    async getShiftAssignments(shiftId) {
        const shift = await this.repository.findShiftById(shiftId);
        if (!shift)
            throw new common_1.NotFoundException('Shift not found');
        const assignments = await this.repository.findShiftAssignments(shiftId);
        return assignments.map((a) => ({
            id: a.id,
            shiftId: a.shiftId,
            staffId: a.staffId,
            assignedDate: new Date(a.assignedDate).toISOString().split('T')[0],
            status: a.status,
            notes: a.notes || undefined,
            createdAt: a.createdAt.toISOString(),
        }));
    }
    mapShift(s) {
        return {
            id: s.id,
            facilityId: s.facilityId,
            departmentId: s.departmentId || undefined,
            name: s.name,
            shiftType: s.shiftType,
            startTime: s.startTime,
            endTime: s.endTime,
            breakDurationMinutes: s.breakDurationMinutes,
            isActive: s.isActive,
            assignments: s.assignments?.map((a) => ({
                id: a.id,
                staffId: a.staffId,
                assignedDate: new Date(a.assignedDate).toISOString().split('T')[0],
                status: a.status,
                notes: a.notes || undefined,
                createdAt: a.createdAt.toISOString(),
            })) || [],
            createdAt: s.createdAt.toISOString(),
            updatedAt: s.updatedAt.toISOString(),
        };
    }
    async createHoliday(dto) {
        const holiday = await this.repository.createHoliday(dto);
        return this.mapHoliday(holiday);
    }
    async getHolidays(facilityId) {
        const holidays = await this.repository.findHolidays(facilityId);
        return holidays.map((h) => this.mapHoliday(h));
    }
    mapHoliday(h) {
        return {
            id: h.id,
            facilityId: h.facilityId || undefined,
            name: h.name,
            holidayDate: new Date(h.holidayDate).toISOString().split('T')[0],
            isRecurring: h.isRecurring,
            description: h.description || undefined,
            createdAt: h.createdAt.toISOString(),
        };
    }
};
exports.ScheduleService = ScheduleService;
exports.ScheduleService = ScheduleService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('IScheduleRepository')),
    __metadata("design:paramtypes", [Object, slot_engine_service_1.SlotEngineService,
        nestjs_pino_1.Logger])
], ScheduleService);
//# sourceMappingURL=schedule.service.js.map
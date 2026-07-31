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
exports.SlotEngineService = void 0;
const common_1 = require("@nestjs/common");
let SlotEngineService = class SlotEngineService {
    constructor() { }
    generateSlots(params) {
        const { scheduleId, fromDate, toDate, workingHours, exceptions, holidayDates, leaveDates, slotDurationMinutes, bufferMinutes, } = params;
        const slots = [];
        const totalSlotMinutes = slotDurationMinutes + bufferMinutes;
        const normalizeDate = (d) => new Date(d.getFullYear(), d.getMonth(), d.getDate());
        const holidaySet = new Set(holidayDates.map((d) => normalizeDate(d).toISOString()));
        const leaveSet = new Set(leaveDates.map((d) => normalizeDate(d).toISOString()));
        const exceptionBlocks = exceptions.map((ex) => [
            new Date(ex.startDatetime).getTime(),
            new Date(ex.endDatetime).getTime(),
        ]);
        const current = new Date(normalizeDate(fromDate));
        const end = normalizeDate(toDate);
        while (current <= end) {
            const dayOfWeek = current.getDay();
            const dateKey = current.toISOString();
            const slotDateCopy = new Date(current);
            if (holidaySet.has(dateKey)) {
                current.setDate(current.getDate() + 1);
                continue;
            }
            if (leaveSet.has(dateKey)) {
                current.setDate(current.getDate() + 1);
                continue;
            }
            const dayStartMs = slotDateCopy.getTime();
            const dayEndMs = dayStartMs + 24 * 60 * 60 * 1000;
            const fullDayException = exceptionBlocks.some(([s, e]) => s <= dayStartMs && e >= dayEndMs);
            if (fullDayException) {
                current.setDate(current.getDate() + 1);
                continue;
            }
            const dayHours = workingHours.filter((wh) => wh.dayOfWeek === dayOfWeek && wh.isEnabled);
            for (const wh of dayHours) {
                const windows = this.splitByBreak(wh.startTime, wh.endTime, wh.breakStart, wh.breakEnd);
                for (const win of windows) {
                    let curMinutes = this.timeToMinutes(win.start);
                    const endMinutes = this.timeToMinutes(win.end);
                    while (curMinutes + slotDurationMinutes <= endMinutes) {
                        const slotStart = this.minutesToTime(curMinutes);
                        const slotEnd = this.minutesToTime(curMinutes + slotDurationMinutes);
                        const slotStartMs = this.dateTimeMs(slotDateCopy, slotStart);
                        const slotEndMs = this.dateTimeMs(slotDateCopy, slotEnd);
                        const inException = exceptionBlocks.some(([s, e]) => slotStartMs < e && slotEndMs > s);
                        if (!inException) {
                            slots.push({
                                scheduleId,
                                slotDate: new Date(slotDateCopy),
                                startTime: slotStart,
                                endTime: slotEnd,
                                durationMinutes: slotDurationMinutes,
                                status: 'AVAILABLE',
                                statusReason: null,
                            });
                        }
                        curMinutes += totalSlotMinutes;
                    }
                }
            }
            current.setDate(current.getDate() + 1);
        }
        return slots;
    }
    splitByBreak(startTime, endTime, breakStart, breakEnd) {
        if (!breakStart || !breakEnd) {
            return [{ start: startTime, end: endTime }];
        }
        const windows = [];
        if (this.timeToMinutes(breakStart) > this.timeToMinutes(startTime)) {
            windows.push({ start: startTime, end: breakStart });
        }
        if (this.timeToMinutes(endTime) > this.timeToMinutes(breakEnd)) {
            windows.push({ start: breakEnd, end: endTime });
        }
        return windows.length > 0 ? windows : [{ start: startTime, end: endTime }];
    }
    timeToMinutes(time) {
        const [h, m] = time.split(':').map(Number);
        return h * 60 + m;
    }
    minutesToTime(minutes) {
        const h = Math.floor(minutes / 60);
        const m = minutes % 60;
        return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
    }
    dateTimeMs(date, time) {
        const [h, m] = time.split(':').map(Number);
        return new Date(date.getFullYear(), date.getMonth(), date.getDate(), h, m).getTime();
    }
};
exports.SlotEngineService = SlotEngineService;
exports.SlotEngineService = SlotEngineService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], SlotEngineService);
//# sourceMappingURL=slot-engine.service.js.map
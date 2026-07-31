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
exports.ScheduleRepository = void 0;
const common_1 = require("@nestjs/common");
const database_service_1 = require("../../../../database/database.service");
const scheduleInclude = {
    workingHours: { orderBy: { dayOfWeek: 'asc' } },
    recurringSchedules: true,
    exceptions: { orderBy: { startDatetime: 'asc' } },
    leaveBlocks: { orderBy: { startDate: 'asc' } },
};
let ScheduleRepository = class ScheduleRepository {
    constructor(db) {
        this.db = db;
    }
    async createSchedule(data) {
        const schedule = await this.db.schedule.create({
            data: {
                ownerType: data.ownerType,
                doctorProfileId: data.doctorProfileId || null,
                staffId: data.staffId || null,
                facilityId: data.facilityId || null,
                departmentId: data.departmentId || null,
                title: data.title,
                timezone: data.timezone || 'Asia/Karachi',
                slotDurationMinutes: data.slotDurationMinutes || 15,
                bufferMinutes: data.bufferMinutes || 5,
                maxPatientsPerSlot: data.maxPatientsPerSlot || 1,
                effectiveFrom: new Date(data.effectiveFrom),
                effectiveTo: data.effectiveTo ? new Date(data.effectiveTo) : null,
                isActive: data.isActive ?? true,
                notes: data.notes || null,
            },
            include: scheduleInclude,
        });
        return schedule;
    }
    async findScheduleById(id, includeDeleted = false) {
        return (await this.db.schedule.findFirst({
            where: { id, ...(includeDeleted ? {} : { isDeleted: false }) },
            include: { ...scheduleInclude, generatedSlots: { orderBy: { slotDate: 'asc' }, take: 100 } },
        }));
    }
    async findSchedules(includeDeleted = false) {
        return (await this.db.schedule.findMany({
            where: includeDeleted ? {} : { isDeleted: false },
            include: scheduleInclude,
            orderBy: { createdAt: 'desc' },
        }));
    }
    async updateSchedule(id, data) {
        return (await this.db.schedule.update({
            where: { id },
            data: {
                title: data.title || undefined,
                timezone: data.timezone || undefined,
                slotDurationMinutes: data.slotDurationMinutes ?? undefined,
                bufferMinutes: data.bufferMinutes ?? undefined,
                maxPatientsPerSlot: data.maxPatientsPerSlot ?? undefined,
                effectiveFrom: data.effectiveFrom ? new Date(data.effectiveFrom) : undefined,
                effectiveTo: data.effectiveTo ? new Date(data.effectiveTo) : undefined,
                isActive: data.isActive ?? undefined,
                notes: data.notes || undefined,
                isDeleted: data.isDeleted ?? undefined,
                deletedAt: data.deletedAt || undefined,
            },
            include: scheduleInclude,
        }));
    }
    async softDeleteSchedule(id) {
        await this.db.schedule.update({ where: { id }, data: { isDeleted: true, deletedAt: new Date() } });
    }
    async searchSchedules(query) {
        return (await this.db.schedule.findMany({
            where: {
                isDeleted: false,
                OR: [
                    { title: { contains: query, mode: 'insensitive' } },
                    { ownerType: { equals: query.toUpperCase() } },
                    { facilityId: { equals: query } },
                    { doctorProfileId: { equals: query } },
                ],
            },
            include: scheduleInclude,
            orderBy: { createdAt: 'desc' },
        }));
    }
    async upsertWorkingHours(scheduleId, hours) {
        await this.db.workingHours.deleteMany({ where: { scheduleId } });
        const created = await this.db.workingHours.createMany({
            data: hours.map((h) => ({
                scheduleId,
                dayOfWeek: h.dayOfWeek,
                sessionType: h.sessionType || 'MORNING',
                startTime: h.startTime,
                endTime: h.endTime,
                breakStart: h.breakStart || null,
                breakEnd: h.breakEnd || null,
                isEnabled: h.isEnabled ?? true,
            })),
        });
        return (await this.db.workingHours.findMany({
            where: { scheduleId },
            orderBy: { dayOfWeek: 'asc' },
        }));
    }
    async findWorkingHours(scheduleId) {
        return (await this.db.workingHours.findMany({
            where: { scheduleId },
            orderBy: { dayOfWeek: 'asc' },
        }));
    }
    async createException(scheduleId, data) {
        return (await this.db.scheduleException.create({
            data: {
                scheduleId,
                exceptionType: data.exceptionType,
                startDatetime: new Date(data.startDatetime),
                endDatetime: new Date(data.endDatetime),
                reason: data.reason || null,
                addedBy: data.addedBy || null,
            },
        }));
    }
    async deleteException(exceptionId) {
        await this.db.scheduleException.delete({ where: { id: exceptionId } });
    }
    async findExceptions(scheduleId) {
        return (await this.db.scheduleException.findMany({
            where: { scheduleId },
            orderBy: { startDatetime: 'asc' },
        }));
    }
    async createLeaveBlock(scheduleId, data) {
        return (await this.db.leaveBlock.create({
            data: {
                scheduleId,
                leaveType: data.leaveType || 'CASUAL',
                startDate: new Date(data.startDate),
                endDate: new Date(data.endDate),
                reason: data.reason || null,
                approvedBy: data.approvedBy || null,
                status: 'APPROVED',
            },
        }));
    }
    async findLeaveBlocks(scheduleId) {
        return (await this.db.leaveBlock.findMany({
            where: { scheduleId },
            orderBy: { startDate: 'asc' },
        }));
    }
    async createHoliday(data) {
        return (await this.db.holidayCalendar.create({
            data: {
                facilityId: data.facilityId || null,
                name: data.name,
                holidayDate: new Date(data.holidayDate),
                isRecurring: data.isRecurring ?? false,
                description: data.description || null,
            },
        }));
    }
    async findHolidays(facilityId) {
        return (await this.db.holidayCalendar.findMany({
            where: facilityId ? { OR: [{ facilityId }, { facilityId: null }] } : {},
            orderBy: { holidayDate: 'asc' },
        }));
    }
    async findHolidaysInRange(startDate, endDate, facilityId) {
        return (await this.db.holidayCalendar.findMany({
            where: {
                holidayDate: { gte: startDate, lte: endDate },
                ...(facilityId ? { OR: [{ facilityId }, { facilityId: null }] } : {}),
            },
        }));
    }
    async createShift(data) {
        return (await this.db.shift.create({
            data: {
                facilityId: data.facilityId,
                departmentId: data.departmentId || null,
                name: data.name,
                shiftType: data.shiftType || 'MORNING',
                startTime: data.startTime,
                endTime: data.endTime,
                breakDurationMinutes: data.breakDurationMinutes || 30,
                isActive: data.isActive ?? true,
            },
            include: { assignments: true },
        }));
    }
    async findShifts(facilityId) {
        return (await this.db.shift.findMany({
            where: facilityId ? { facilityId } : {},
            include: { assignments: { orderBy: { assignedDate: 'desc' }, take: 10 } },
            orderBy: { createdAt: 'desc' },
        }));
    }
    async findShiftById(id) {
        return (await this.db.shift.findUnique({
            where: { id },
            include: { assignments: { orderBy: { assignedDate: 'desc' } } },
        }));
    }
    async assignStaffToShift(shiftId, data) {
        return (await this.db.shiftAssignment.upsert({
            where: {
                shiftId_staffId_assignedDate: {
                    shiftId,
                    staffId: data.staffId,
                    assignedDate: new Date(data.assignedDate),
                },
            },
            update: { status: data.status || 'ASSIGNED', notes: data.notes || null },
            create: {
                shiftId,
                staffId: data.staffId,
                assignedDate: new Date(data.assignedDate),
                status: data.status || 'ASSIGNED',
                notes: data.notes || null,
            },
        }));
    }
    async findShiftAssignments(shiftId) {
        return (await this.db.shiftAssignment.findMany({
            where: { shiftId },
            orderBy: { assignedDate: 'desc' },
        }));
    }
    async bulkUpsertSlots(slots) {
        if (slots.length === 0)
            return 0;
        const result = await this.db.generatedSlot.createMany({ data: slots, skipDuplicates: true });
        return result.count;
    }
    async findSlotsByScheduleAndDate(scheduleId, fromDate, toDate) {
        return (await this.db.generatedSlot.findMany({
            where: { scheduleId, slotDate: { gte: fromDate, lte: toDate } },
            orderBy: [{ slotDate: 'asc' }, { startTime: 'asc' }],
        }));
    }
    async deleteSlotsByScheduleAndDate(scheduleId, fromDate, toDate) {
        await this.db.generatedSlot.deleteMany({
            where: { scheduleId, slotDate: { gte: fromDate, lte: toDate }, status: 'AVAILABLE' },
        });
    }
    async createAuditLog(data) {
        return (await this.db.scheduleAuditLog.create({
            data: {
                scheduleId: data.scheduleId,
                action: data.action,
                performedBy: data.performedBy || null,
                details: data.details || null,
            },
        }));
    }
    async findAuditLogs(scheduleId) {
        return (await this.db.scheduleAuditLog.findMany({
            where: { scheduleId },
            orderBy: { createdAt: 'desc' },
        }));
    }
    async getStatistics() {
        const [totalSchedules, activeSchedules, doctorSchedules, staffSchedules, facilitySchedules, totalGeneratedSlots, availableSlots, totalShifts, totalHolidays] = await Promise.all([
            this.db.schedule.count({ where: { isDeleted: false } }),
            this.db.schedule.count({ where: { isDeleted: false, isActive: true } }),
            this.db.schedule.count({ where: { isDeleted: false, ownerType: 'DOCTOR' } }),
            this.db.schedule.count({ where: { isDeleted: false, ownerType: 'STAFF' } }),
            this.db.schedule.count({ where: { isDeleted: false, ownerType: 'FACILITY' } }),
            this.db.generatedSlot.count(),
            this.db.generatedSlot.count({ where: { status: 'AVAILABLE' } }),
            this.db.shift.count({ where: { isActive: true } }),
            this.db.holidayCalendar.count(),
        ]);
        return { totalSchedules, activeSchedules, doctorSchedules, staffSchedules, facilitySchedules, totalGeneratedSlots, availableSlots, totalShifts, totalHolidays };
    }
};
exports.ScheduleRepository = ScheduleRepository;
exports.ScheduleRepository = ScheduleRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [database_service_1.DatabaseService])
], ScheduleRepository);
//# sourceMappingURL=schedule.repository.js.map
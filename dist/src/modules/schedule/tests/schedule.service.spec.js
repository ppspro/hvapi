"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const schedule_service_1 = require("../application/use-cases/schedule.service");
const slot_engine_service_1 = require("../application/use-cases/slot-engine.service");
const common_1 = require("@nestjs/common");
const nestjs_pino_1 = require("nestjs-pino");
const mockScheduleId = 'schedule-uuid-1';
const mockUserId = 'user-uuid-1';
const mockBaseSchedule = {
    id: mockScheduleId,
    ownerType: 'DOCTOR',
    doctorProfileId: 'doctor-uuid-1',
    title: 'Dr. Khan Morning OPD Schedule',
    timezone: 'Asia/Karachi',
    slotDurationMinutes: 15,
    bufferMinutes: 5,
    maxPatientsPerSlot: 1,
    effectiveFrom: new Date('2025-08-01'),
    effectiveTo: null,
    isActive: true,
    notes: null,
    isDeleted: false,
    deletedAt: null,
    workingHours: [],
    recurringSchedules: [],
    exceptions: [],
    leaveBlocks: [],
    generatedSlots: [],
    createdAt: new Date(),
    updatedAt: new Date(),
};
const mockRepo = {
    createSchedule: jest.fn(),
    findScheduleById: jest.fn(),
    findSchedules: jest.fn(),
    updateSchedule: jest.fn(),
    softDeleteSchedule: jest.fn(),
    searchSchedules: jest.fn(),
    upsertWorkingHours: jest.fn(),
    findWorkingHours: jest.fn(),
    createException: jest.fn(),
    deleteException: jest.fn(),
    findExceptions: jest.fn(),
    createLeaveBlock: jest.fn(),
    findLeaveBlocks: jest.fn(),
    createHoliday: jest.fn(),
    findHolidays: jest.fn(),
    findHolidaysInRange: jest.fn(),
    createShift: jest.fn(),
    findShifts: jest.fn(),
    findShiftById: jest.fn(),
    assignStaffToShift: jest.fn(),
    findShiftAssignments: jest.fn(),
    bulkUpsertSlots: jest.fn(),
    findSlotsByScheduleAndDate: jest.fn(),
    deleteSlotsByScheduleAndDate: jest.fn(),
    createAuditLog: jest.fn(),
    findAuditLogs: jest.fn(),
    getStatistics: jest.fn(),
};
const mockLogger = { log: jest.fn(), error: jest.fn(), warn: jest.fn() };
describe('ScheduleService', () => {
    let service;
    let slotEngine;
    beforeEach(async () => {
        jest.clearAllMocks();
        const module = await testing_1.Test.createTestingModule({
            providers: [
                schedule_service_1.ScheduleService,
                slot_engine_service_1.SlotEngineService,
                { provide: 'IScheduleRepository', useValue: mockRepo },
                { provide: nestjs_pino_1.Logger, useValue: mockLogger },
            ],
        }).compile();
        service = module.get(schedule_service_1.ScheduleService);
        slotEngine = module.get(slot_engine_service_1.SlotEngineService);
    });
    describe('createSchedule', () => {
        it('should create schedule profile with working hours and audit log', async () => {
            mockRepo.createSchedule.mockResolvedValue(mockBaseSchedule);
            mockRepo.upsertWorkingHours.mockResolvedValue([]);
            mockRepo.createAuditLog.mockResolvedValue({});
            mockRepo.findScheduleById.mockResolvedValue(mockBaseSchedule);
            const result = await service.createSchedule(mockUserId, {
                ownerType: 'DOCTOR',
                doctorProfileId: 'doctor-uuid-1',
                title: 'Dr. Khan Morning OPD Schedule',
                effectiveFrom: '2025-08-01',
                workingHours: [
                    { dayOfWeek: 1, startTime: '09:00', endTime: '13:00', sessionType: 'MORNING', isEnabled: true },
                ],
            });
            expect(result.id).toBe(mockScheduleId);
            expect(result.ownerType).toBe('DOCTOR');
            expect(mockRepo.upsertWorkingHours).toHaveBeenCalled();
            expect(mockRepo.createAuditLog).toHaveBeenCalled();
        });
    });
    describe('SlotEngineService', () => {
        it('should generate correct number of slots for a simple working hours window', () => {
            const slots = slotEngine.generateSlots({
                scheduleId: mockScheduleId,
                fromDate: new Date('2025-08-04'),
                toDate: new Date('2025-08-04'),
                workingHours: [
                    { id: 'wh-1', scheduleId: mockScheduleId, dayOfWeek: 1, sessionType: 'MORNING',
                        startTime: '09:00', endTime: '13:00', breakStart: null, breakEnd: null, isEnabled: true, createdAt: new Date() },
                ],
                exceptions: [],
                holidayDates: [],
                leaveDates: [],
                slotDurationMinutes: 15,
                bufferMinutes: 5,
            });
            expect(slots).toHaveLength(12);
            expect(slots[0].startTime).toBe('09:00');
            expect(slots[0].endTime).toBe('09:15');
            expect(slots[11].startTime).toBe('12:40');
        });
        it('should skip holiday dates from slot generation', () => {
            const slots = slotEngine.generateSlots({
                scheduleId: mockScheduleId,
                fromDate: new Date('2025-08-04'),
                toDate: new Date('2025-08-04'),
                workingHours: [
                    { id: 'wh-1', scheduleId: mockScheduleId, dayOfWeek: 1, sessionType: 'MORNING',
                        startTime: '09:00', endTime: '13:00', breakStart: null, breakEnd: null, isEnabled: true, createdAt: new Date() },
                ],
                exceptions: [],
                holidayDates: [new Date('2025-08-04')],
                leaveDates: [],
                slotDurationMinutes: 15,
                bufferMinutes: 5,
            });
            expect(slots).toHaveLength(0);
        });
        it('should split slots correctly around break period', () => {
            const slots = slotEngine.generateSlots({
                scheduleId: mockScheduleId,
                fromDate: new Date('2025-08-04'),
                toDate: new Date('2025-08-04'),
                workingHours: [
                    { id: 'wh-1', scheduleId: mockScheduleId, dayOfWeek: 1, sessionType: 'MORNING',
                        startTime: '09:00', endTime: '13:00', breakStart: '11:00', breakEnd: '11:15', isEnabled: true, createdAt: new Date() },
                ],
                exceptions: [],
                holidayDates: [],
                leaveDates: [],
                slotDurationMinutes: 15,
                bufferMinutes: 5,
            });
            expect(slots).toHaveLength(11);
        });
        it('should generate slots for multiple days across a week', () => {
            const fromDate = new Date('2025-08-04');
            const toDate = new Date('2025-08-08');
            const workingHours = [1, 2, 3, 4, 5].map((day) => ({
                id: `wh-${day}`, scheduleId: mockScheduleId, dayOfWeek: day, sessionType: 'MORNING',
                startTime: '09:00', endTime: '10:00', breakStart: null, breakEnd: null, isEnabled: true, createdAt: new Date(),
            }));
            const slots = slotEngine.generateSlots({
                scheduleId: mockScheduleId,
                fromDate,
                toDate,
                workingHours,
                exceptions: [],
                holidayDates: [],
                leaveDates: [],
                slotDurationMinutes: 15,
                bufferMinutes: 5,
            });
            expect(slots).toHaveLength(15);
        });
    });
    describe('getScheduleById', () => {
        it('should throw NotFoundException for unknown ID', async () => {
            mockRepo.findScheduleById.mockResolvedValue(null);
            await expect(service.getScheduleById('non-existent')).rejects.toThrow(common_1.NotFoundException);
        });
    });
    describe('blockSchedule', () => {
        it('should create exception and return updated schedule', async () => {
            mockRepo.findScheduleById
                .mockResolvedValueOnce(mockBaseSchedule)
                .mockResolvedValueOnce({ ...mockBaseSchedule, exceptions: [{ id: 'ex-1', exceptionType: 'VACATION', startDatetime: new Date(), endDatetime: new Date(), createdAt: new Date() }] });
            mockRepo.createException.mockResolvedValue({});
            mockRepo.createAuditLog.mockResolvedValue({});
            const result = await service.blockSchedule(mockScheduleId, {
                exceptionType: 'VACATION',
                startDatetime: '2025-08-10T00:00:00.000Z',
                endDatetime: '2025-08-14T23:59:59.000Z',
                reason: 'Annual leave',
            }, mockUserId);
            expect(mockRepo.createException).toHaveBeenCalled();
            expect(result.exceptions).toHaveLength(1);
        });
    });
});
//# sourceMappingURL=schedule.service.spec.js.map
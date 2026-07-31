import { Injectable } from '@nestjs/common';
import { DatabaseService } from '@database/database.service';
import { IScheduleRepository } from '../../domain/repositories/schedule.repository.interface';
import {
  ScheduleEntity, WorkingHoursEntity, ScheduleExceptionEntity, LeaveBlockEntity,
  HolidayCalendarEntity, ShiftEntity, ShiftAssignmentEntity, GeneratedSlotEntity,
  ScheduleAuditLogEntity,
} from '../../domain/entities/schedule.entity';

const scheduleInclude = {
  workingHours: { orderBy: { dayOfWeek: 'asc' as const } },
  recurringSchedules: true,
  exceptions: { orderBy: { startDatetime: 'asc' as const } },
  leaveBlocks: { orderBy: { startDate: 'asc' as const } },
};

@Injectable()
export class ScheduleRepository implements IScheduleRepository {
  constructor(private readonly db: DatabaseService) {}

  async createSchedule(data: any): Promise<ScheduleEntity> {
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
    return schedule as unknown as ScheduleEntity;
  }

  async findScheduleById(id: string, includeDeleted = false): Promise<ScheduleEntity | null> {
    return (await this.db.schedule.findFirst({
      where: { id, ...(includeDeleted ? {} : { isDeleted: false }) },
      include: { ...scheduleInclude, generatedSlots: { orderBy: { slotDate: 'asc' as const }, take: 100 } },
    })) as unknown as ScheduleEntity | null;
  }

  async findSchedules(includeDeleted = false): Promise<ScheduleEntity[]> {
    return (await this.db.schedule.findMany({
      where: includeDeleted ? {} : { isDeleted: false },
      include: scheduleInclude,
      orderBy: { createdAt: 'desc' },
    })) as unknown as ScheduleEntity[];
  }

  async updateSchedule(id: string, data: any): Promise<ScheduleEntity> {
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
    })) as unknown as ScheduleEntity;
  }

  async softDeleteSchedule(id: string): Promise<void> {
    await this.db.schedule.update({ where: { id }, data: { isDeleted: true, deletedAt: new Date() } });
  }

  async searchSchedules(query: string): Promise<ScheduleEntity[]> {
    return (await this.db.schedule.findMany({
      where: {
        isDeleted: false,
        OR: [
          { title: { contains: query, mode: 'insensitive' } },
          { ownerType: { equals: query.toUpperCase() as any } },
          { facilityId: { equals: query } },
          { doctorProfileId: { equals: query } },
        ],
      },
      include: scheduleInclude,
      orderBy: { createdAt: 'desc' },
    })) as unknown as ScheduleEntity[];
  }

  async upsertWorkingHours(scheduleId: string, hours: any[]): Promise<WorkingHoursEntity[]> {
    // Delete existing, then create new
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
    })) as unknown as WorkingHoursEntity[];
  }

  async findWorkingHours(scheduleId: string): Promise<WorkingHoursEntity[]> {
    return (await this.db.workingHours.findMany({
      where: { scheduleId },
      orderBy: { dayOfWeek: 'asc' },
    })) as unknown as WorkingHoursEntity[];
  }

  async createException(scheduleId: string, data: any): Promise<ScheduleExceptionEntity> {
    return (await this.db.scheduleException.create({
      data: {
        scheduleId,
        exceptionType: data.exceptionType,
        startDatetime: new Date(data.startDatetime),
        endDatetime: new Date(data.endDatetime),
        reason: data.reason || null,
        addedBy: data.addedBy || null,
      },
    })) as unknown as ScheduleExceptionEntity;
  }

  async deleteException(exceptionId: string): Promise<void> {
    await this.db.scheduleException.delete({ where: { id: exceptionId } });
  }

  async findExceptions(scheduleId: string): Promise<ScheduleExceptionEntity[]> {
    return (await this.db.scheduleException.findMany({
      where: { scheduleId },
      orderBy: { startDatetime: 'asc' },
    })) as unknown as ScheduleExceptionEntity[];
  }

  async createLeaveBlock(scheduleId: string, data: any): Promise<LeaveBlockEntity> {
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
    })) as unknown as LeaveBlockEntity;
  }

  async findLeaveBlocks(scheduleId: string): Promise<LeaveBlockEntity[]> {
    return (await this.db.leaveBlock.findMany({
      where: { scheduleId },
      orderBy: { startDate: 'asc' },
    })) as unknown as LeaveBlockEntity[];
  }

  async createHoliday(data: any): Promise<HolidayCalendarEntity> {
    return (await this.db.holidayCalendar.create({
      data: {
        facilityId: data.facilityId || null,
        name: data.name,
        holidayDate: new Date(data.holidayDate),
        isRecurring: data.isRecurring ?? false,
        description: data.description || null,
      },
    })) as unknown as HolidayCalendarEntity;
  }

  async findHolidays(facilityId?: string): Promise<HolidayCalendarEntity[]> {
    return (await this.db.holidayCalendar.findMany({
      where: facilityId ? { OR: [{ facilityId }, { facilityId: null }] } : {},
      orderBy: { holidayDate: 'asc' },
    })) as unknown as HolidayCalendarEntity[];
  }

  async findHolidaysInRange(startDate: Date, endDate: Date, facilityId?: string): Promise<HolidayCalendarEntity[]> {
    return (await this.db.holidayCalendar.findMany({
      where: {
        holidayDate: { gte: startDate, lte: endDate },
        ...(facilityId ? { OR: [{ facilityId }, { facilityId: null }] } : {}),
      },
    })) as unknown as HolidayCalendarEntity[];
  }

  async createShift(data: any): Promise<ShiftEntity> {
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
    })) as unknown as ShiftEntity;
  }

  async findShifts(facilityId?: string): Promise<ShiftEntity[]> {
    return (await this.db.shift.findMany({
      where: facilityId ? { facilityId } : {},
      include: { assignments: { orderBy: { assignedDate: 'desc' }, take: 10 } },
      orderBy: { createdAt: 'desc' },
    })) as unknown as ShiftEntity[];
  }

  async findShiftById(id: string): Promise<ShiftEntity | null> {
    return (await this.db.shift.findUnique({
      where: { id },
      include: { assignments: { orderBy: { assignedDate: 'desc' } } },
    })) as unknown as ShiftEntity | null;
  }

  async assignStaffToShift(shiftId: string, data: any): Promise<ShiftAssignmentEntity> {
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
    })) as unknown as ShiftAssignmentEntity;
  }

  async findShiftAssignments(shiftId: string): Promise<ShiftAssignmentEntity[]> {
    return (await this.db.shiftAssignment.findMany({
      where: { shiftId },
      orderBy: { assignedDate: 'desc' },
    })) as unknown as ShiftAssignmentEntity[];
  }

  async bulkUpsertSlots(slots: any[]): Promise<number> {
    if (slots.length === 0) return 0;
    const result = await this.db.generatedSlot.createMany({ data: slots, skipDuplicates: true });
    return result.count;
  }

  async findSlotsByScheduleAndDate(scheduleId: string, fromDate: Date, toDate: Date): Promise<GeneratedSlotEntity[]> {
    return (await this.db.generatedSlot.findMany({
      where: { scheduleId, slotDate: { gte: fromDate, lte: toDate } },
      orderBy: [{ slotDate: 'asc' }, { startTime: 'asc' }],
    })) as unknown as GeneratedSlotEntity[];
  }

  async deleteSlotsByScheduleAndDate(scheduleId: string, fromDate: Date, toDate: Date): Promise<void> {
    await this.db.generatedSlot.deleteMany({
      where: { scheduleId, slotDate: { gte: fromDate, lte: toDate }, status: 'AVAILABLE' },
    });
  }

  async createAuditLog(data: { scheduleId: string; action: string; performedBy?: string; details?: string }): Promise<ScheduleAuditLogEntity> {
    return (await this.db.scheduleAuditLog.create({
      data: {
        scheduleId: data.scheduleId,
        action: data.action,
        performedBy: data.performedBy || null,
        details: data.details || null,
      },
    })) as unknown as ScheduleAuditLogEntity;
  }

  async findAuditLogs(scheduleId: string): Promise<ScheduleAuditLogEntity[]> {
    return (await this.db.scheduleAuditLog.findMany({
      where: { scheduleId },
      orderBy: { createdAt: 'desc' },
    })) as unknown as ScheduleAuditLogEntity[];
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
}

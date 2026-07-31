export class ScheduleEntity {
  id!: string;
  ownerType!: string;
  doctorProfileId?: string | null;
  staffId?: string | null;
  facilityId?: string | null;
  departmentId?: string | null;
  title!: string;
  timezone!: string;
  slotDurationMinutes!: number;
  bufferMinutes!: number;
  maxPatientsPerSlot!: number;
  effectiveFrom!: Date;
  effectiveTo?: Date | null;
  isActive!: boolean;
  notes?: string | null;
  isDeleted!: boolean;
  deletedAt?: Date | null;
  createdAt!: Date;
  updatedAt!: Date;
  workingHours?: WorkingHoursEntity[];
  recurringSchedules?: RecurringScheduleEntity[];
  exceptions?: ScheduleExceptionEntity[];
  leaveBlocks?: LeaveBlockEntity[];
  generatedSlots?: GeneratedSlotEntity[];
}

export class WorkingHoursEntity {
  id!: string;
  scheduleId!: string;
  dayOfWeek!: number;
  sessionType!: string;
  startTime!: string;
  endTime!: string;
  breakStart?: string | null;
  breakEnd?: string | null;
  isEnabled!: boolean;
  createdAt!: Date;
}

export class RecurringScheduleEntity {
  id!: string;
  scheduleId!: string;
  recurrenceType!: string;
  recurrenceDays!: number[];
  skipHolidays!: boolean;
  skipLeave!: boolean;
  startDate!: Date;
  endDate?: Date | null;
  createdAt!: Date;
}

export class ScheduleExceptionEntity {
  id!: string;
  scheduleId!: string;
  exceptionType!: string;
  startDatetime!: Date;
  endDatetime!: Date;
  reason?: string | null;
  addedBy?: string | null;
  createdAt!: Date;
}

export class LeaveBlockEntity {
  id!: string;
  scheduleId!: string;
  leaveType!: string;
  startDate!: Date;
  endDate!: Date;
  reason?: string | null;
  approvedBy?: string | null;
  status!: string;
  createdAt!: Date;
}

export class HolidayCalendarEntity {
  id!: string;
  facilityId?: string | null;
  name!: string;
  holidayDate!: Date;
  isRecurring!: boolean;
  description?: string | null;
  createdAt!: Date;
}

export class ShiftEntity {
  id!: string;
  facilityId!: string;
  departmentId?: string | null;
  name!: string;
  shiftType!: string;
  startTime!: string;
  endTime!: string;
  breakDurationMinutes!: number;
  isActive!: boolean;
  createdAt!: Date;
  updatedAt!: Date;
  assignments?: ShiftAssignmentEntity[];
}

export class ShiftAssignmentEntity {
  id!: string;
  shiftId!: string;
  staffId!: string;
  assignedDate!: Date;
  status!: string;
  notes?: string | null;
  createdAt!: Date;
}

export class GeneratedSlotEntity {
  id!: string;
  scheduleId!: string;
  slotDate!: Date;
  startTime!: string;
  endTime!: string;
  durationMinutes!: number;
  status!: string;
  statusReason?: string | null;
  createdAt!: Date;
}

export class ScheduleAuditLogEntity {
  id!: string;
  scheduleId!: string;
  action!: string;
  performedBy?: string | null;
  details?: string | null;
  createdAt!: Date;
}

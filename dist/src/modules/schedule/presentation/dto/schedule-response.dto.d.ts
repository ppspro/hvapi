export declare class WorkingHoursResponseDto {
    id: string;
    dayOfWeek: number;
    sessionType: string;
    startTime: string;
    endTime: string;
    breakStart?: string;
    breakEnd?: string;
    isEnabled: boolean;
    createdAt: string;
}
export declare class ScheduleExceptionResponseDto {
    id: string;
    exceptionType: string;
    startDatetime: string;
    endDatetime: string;
    reason?: string;
    addedBy?: string;
    createdAt: string;
}
export declare class LeaveBlockResponseDto {
    id: string;
    leaveType: string;
    startDate: string;
    endDate: string;
    reason?: string;
    status: string;
    createdAt: string;
}
export declare class ScheduleFullResponseDto {
    id: string;
    ownerType: string;
    doctorProfileId?: string;
    staffId?: string;
    facilityId?: string;
    departmentId?: string;
    title: string;
    timezone: string;
    slotDurationMinutes: number;
    bufferMinutes: number;
    maxPatientsPerSlot: number;
    effectiveFrom: string;
    effectiveTo?: string;
    isActive: boolean;
    notes?: string;
    isDeleted: boolean;
    workingHours: WorkingHoursResponseDto[];
    exceptions: ScheduleExceptionResponseDto[];
    leaveBlocks: LeaveBlockResponseDto[];
    createdAt: string;
    updatedAt: string;
}
export declare class GeneratedSlotResponseDto {
    id: string;
    scheduleId: string;
    slotDate: string;
    startTime: string;
    endTime: string;
    durationMinutes: number;
    status: string;
    statusReason?: string;
    createdAt: string;
}
export declare class ShiftAssignmentResponseDto {
    id: string;
    staffId: string;
    assignedDate: string;
    status: string;
    notes?: string;
    createdAt: string;
}
export declare class ShiftResponseDto {
    id: string;
    facilityId: string;
    departmentId?: string;
    name: string;
    shiftType: string;
    startTime: string;
    endTime: string;
    breakDurationMinutes: number;
    isActive: boolean;
    assignments: ShiftAssignmentResponseDto[];
    createdAt: string;
    updatedAt: string;
}
export declare class HolidayResponseDto {
    id: string;
    facilityId?: string;
    name: string;
    holidayDate: string;
    isRecurring: boolean;
    description?: string;
    createdAt: string;
}
export declare class ScheduleAuditLogResponseDto {
    id: string;
    scheduleId: string;
    action: string;
    performedBy?: string;
    details?: string;
    createdAt: string;
}
export declare class ScheduleStatsResponseDto {
    totalSchedules: number;
    activeSchedules: number;
    doctorSchedules: number;
    staffSchedules: number;
    facilitySchedules: number;
    totalGeneratedSlots: number;
    availableSlots: number;
    totalShifts: number;
    totalHolidays: number;
}

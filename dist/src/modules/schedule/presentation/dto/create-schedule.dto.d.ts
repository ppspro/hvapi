export declare class WorkingHoursInputDto {
    dayOfWeek: number;
    sessionType?: string;
    startTime: string;
    endTime: string;
    breakStart?: string;
    breakEnd?: string;
    isEnabled?: boolean;
}
export declare class CreateScheduleDto {
    ownerType: string;
    doctorProfileId?: string;
    staffId?: string;
    facilityId?: string;
    departmentId?: string;
    title: string;
    timezone?: string;
    slotDurationMinutes?: number;
    bufferMinutes?: number;
    maxPatientsPerSlot?: number;
    effectiveFrom: string;
    effectiveTo?: string;
    isActive?: boolean;
    notes?: string;
    workingHours?: WorkingHoursInputDto[];
}
export declare class UpsertWorkingHoursDto {
    workingHours: WorkingHoursInputDto[];
}
export declare class GenerateSlotsDto {
    fromDate: string;
    toDate: string;
}
export declare class BlockScheduleDto {
    exceptionType: string;
    startDatetime: string;
    endDatetime: string;
    reason?: string;
}
export declare class CreateLeaveBlockDto {
    leaveType?: string;
    startDate: string;
    endDate: string;
    reason?: string;
}
export declare class CreateShiftDto {
    facilityId: string;
    departmentId?: string;
    name: string;
    shiftType: string;
    startTime: string;
    endTime: string;
    breakDurationMinutes?: number;
}
export declare class AssignStaffToShiftDto {
    staffId: string;
    assignedDate: string;
    status?: string;
    notes?: string;
}
export declare class CreateHolidayDto {
    name: string;
    holidayDate: string;
    facilityId?: string;
    isRecurring?: boolean;
    description?: string;
}

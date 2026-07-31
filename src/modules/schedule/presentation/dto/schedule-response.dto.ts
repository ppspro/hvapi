import { ApiProperty } from '@nestjs/swagger';

export class WorkingHoursResponseDto {
  @ApiProperty() id!: string;
  @ApiProperty() dayOfWeek!: number;
  @ApiProperty() sessionType!: string;
  @ApiProperty() startTime!: string;
  @ApiProperty() endTime!: string;
  @ApiProperty({ nullable: true }) breakStart?: string;
  @ApiProperty({ nullable: true }) breakEnd?: string;
  @ApiProperty() isEnabled!: boolean;
  @ApiProperty() createdAt!: string;
}

export class ScheduleExceptionResponseDto {
  @ApiProperty() id!: string;
  @ApiProperty() exceptionType!: string;
  @ApiProperty() startDatetime!: string;
  @ApiProperty() endDatetime!: string;
  @ApiProperty({ nullable: true }) reason?: string;
  @ApiProperty({ nullable: true }) addedBy?: string;
  @ApiProperty() createdAt!: string;
}

export class LeaveBlockResponseDto {
  @ApiProperty() id!: string;
  @ApiProperty() leaveType!: string;
  @ApiProperty() startDate!: string;
  @ApiProperty() endDate!: string;
  @ApiProperty({ nullable: true }) reason?: string;
  @ApiProperty() status!: string;
  @ApiProperty() createdAt!: string;
}

export class ScheduleFullResponseDto {
  @ApiProperty() id!: string;
  @ApiProperty() ownerType!: string;
  @ApiProperty({ nullable: true }) doctorProfileId?: string;
  @ApiProperty({ nullable: true }) staffId?: string;
  @ApiProperty({ nullable: true }) facilityId?: string;
  @ApiProperty({ nullable: true }) departmentId?: string;
  @ApiProperty() title!: string;
  @ApiProperty() timezone!: string;
  @ApiProperty() slotDurationMinutes!: number;
  @ApiProperty() bufferMinutes!: number;
  @ApiProperty() maxPatientsPerSlot!: number;
  @ApiProperty() effectiveFrom!: string;
  @ApiProperty({ nullable: true }) effectiveTo?: string;
  @ApiProperty() isActive!: boolean;
  @ApiProperty({ nullable: true }) notes?: string;
  @ApiProperty() isDeleted!: boolean;
  @ApiProperty({ type: [WorkingHoursResponseDto] }) workingHours!: WorkingHoursResponseDto[];
  @ApiProperty({ type: [ScheduleExceptionResponseDto] }) exceptions!: ScheduleExceptionResponseDto[];
  @ApiProperty({ type: [LeaveBlockResponseDto] }) leaveBlocks!: LeaveBlockResponseDto[];
  @ApiProperty() createdAt!: string;
  @ApiProperty() updatedAt!: string;
}

export class GeneratedSlotResponseDto {
  @ApiProperty() id!: string;
  @ApiProperty() scheduleId!: string;
  @ApiProperty() slotDate!: string;
  @ApiProperty() startTime!: string;
  @ApiProperty() endTime!: string;
  @ApiProperty() durationMinutes!: number;
  @ApiProperty() status!: string;
  @ApiProperty({ nullable: true }) statusReason?: string;
  @ApiProperty() createdAt!: string;
}

export class ShiftAssignmentResponseDto {
  @ApiProperty() id!: string;
  @ApiProperty() staffId!: string;
  @ApiProperty() assignedDate!: string;
  @ApiProperty() status!: string;
  @ApiProperty({ nullable: true }) notes?: string;
  @ApiProperty() createdAt!: string;
}

export class ShiftResponseDto {
  @ApiProperty() id!: string;
  @ApiProperty() facilityId!: string;
  @ApiProperty({ nullable: true }) departmentId?: string;
  @ApiProperty() name!: string;
  @ApiProperty() shiftType!: string;
  @ApiProperty() startTime!: string;
  @ApiProperty() endTime!: string;
  @ApiProperty() breakDurationMinutes!: number;
  @ApiProperty() isActive!: boolean;
  @ApiProperty({ type: [ShiftAssignmentResponseDto] }) assignments!: ShiftAssignmentResponseDto[];
  @ApiProperty() createdAt!: string;
  @ApiProperty() updatedAt!: string;
}

export class HolidayResponseDto {
  @ApiProperty() id!: string;
  @ApiProperty({ nullable: true }) facilityId?: string;
  @ApiProperty() name!: string;
  @ApiProperty() holidayDate!: string;
  @ApiProperty() isRecurring!: boolean;
  @ApiProperty({ nullable: true }) description?: string;
  @ApiProperty() createdAt!: string;
}

export class ScheduleAuditLogResponseDto {
  @ApiProperty() id!: string;
  @ApiProperty() scheduleId!: string;
  @ApiProperty() action!: string;
  @ApiProperty({ nullable: true }) performedBy?: string;
  @ApiProperty({ nullable: true }) details?: string;
  @ApiProperty() createdAt!: string;
}

export class ScheduleStatsResponseDto {
  @ApiProperty() totalSchedules!: number;
  @ApiProperty() activeSchedules!: number;
  @ApiProperty() doctorSchedules!: number;
  @ApiProperty() staffSchedules!: number;
  @ApiProperty() facilitySchedules!: number;
  @ApiProperty() totalGeneratedSlots!: number;
  @ApiProperty() availableSlots!: number;
  @ApiProperty() totalShifts!: number;
  @ApiProperty() totalHolidays!: number;
}

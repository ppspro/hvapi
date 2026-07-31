import { IsNotEmpty, IsString, IsOptional, IsNumber, IsBoolean, IsArray, IsDateString, Min, ValidateNested, IsEnum, IsInt } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class WorkingHoursInputDto {
  @ApiProperty({ example: 1, description: '0=Sun,1=Mon,...,6=Sat' })
  @IsNotEmpty()
  @IsInt()
  dayOfWeek!: number;

  @ApiProperty({ example: 'MORNING', enum: ['MORNING', 'AFTERNOON', 'EVENING', 'NIGHT', 'CUSTOM'], required: false })
  @IsOptional()
  @IsString()
  sessionType?: string;

  @ApiProperty({ example: '09:00' })
  @IsNotEmpty()
  @IsString()
  startTime!: string;

  @ApiProperty({ example: '13:00' })
  @IsNotEmpty()
  @IsString()
  endTime!: string;

  @ApiProperty({ example: '11:00', required: false })
  @IsOptional()
  @IsString()
  breakStart?: string;

  @ApiProperty({ example: '11:15', required: false })
  @IsOptional()
  @IsString()
  breakEnd?: string;

  @ApiProperty({ example: true, required: false })
  @IsOptional()
  @IsBoolean()
  isEnabled?: boolean;
}

export class CreateScheduleDto {
  @ApiProperty({ example: 'DOCTOR', enum: ['DOCTOR', 'STAFF', 'FACILITY', 'DEPARTMENT'] })
  @IsNotEmpty()
  @IsString()
  ownerType!: string;

  @ApiProperty({ example: 'doctor-profile-uuid-1', required: false })
  @IsOptional()
  @IsString()
  doctorProfileId?: string;

  @ApiProperty({ example: 'staff-uuid-1', required: false })
  @IsOptional()
  @IsString()
  staffId?: string;

  @ApiProperty({ example: 'facility-uuid-1', required: false })
  @IsOptional()
  @IsString()
  facilityId?: string;

  @ApiProperty({ example: 'department-uuid-1', required: false })
  @IsOptional()
  @IsString()
  departmentId?: string;

  @ApiProperty({ example: 'Dr. Khan Morning OPD Schedule' })
  @IsNotEmpty()
  @IsString()
  title!: string;

  @ApiProperty({ example: 'Asia/Karachi', required: false })
  @IsOptional()
  @IsString()
  timezone?: string;

  @ApiProperty({ example: 15, required: false })
  @IsOptional()
  @IsInt()
  @Min(5)
  slotDurationMinutes?: number;

  @ApiProperty({ example: 5, required: false })
  @IsOptional()
  @IsInt()
  @Min(0)
  bufferMinutes?: number;

  @ApiProperty({ example: 1, required: false })
  @IsOptional()
  @IsInt()
  @Min(1)
  maxPatientsPerSlot?: number;

  @ApiProperty({ example: '2025-01-01' })
  @IsNotEmpty()
  @IsDateString()
  effectiveFrom!: string;

  @ApiProperty({ example: '2025-12-31', required: false })
  @IsOptional()
  @IsDateString()
  effectiveTo?: string;

  @ApiProperty({ example: true, required: false })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @ApiProperty({ example: 'Main OPD morning session', required: false })
  @IsOptional()
  @IsString()
  notes?: string;

  @ApiProperty({ type: [WorkingHoursInputDto], required: false })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => WorkingHoursInputDto)
  workingHours?: WorkingHoursInputDto[];
}

export class UpsertWorkingHoursDto {
  @ApiProperty({ type: [WorkingHoursInputDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => WorkingHoursInputDto)
  workingHours!: WorkingHoursInputDto[];
}

export class GenerateSlotsDto {
  @ApiProperty({ example: '2025-08-01' })
  @IsNotEmpty()
  @IsDateString()
  fromDate!: string;

  @ApiProperty({ example: '2025-08-31' })
  @IsNotEmpty()
  @IsDateString()
  toDate!: string;
}

export class BlockScheduleDto {
  @ApiProperty({ example: 'VACATION', enum: ['VACATION', 'CONFERENCE', 'TRAINING', 'EMERGENCY', 'MAINTENANCE', 'MANUAL'] })
  @IsNotEmpty()
  @IsString()
  exceptionType!: string;

  @ApiProperty({ example: '2025-08-10T00:00:00.000Z' })
  @IsNotEmpty()
  @IsString()
  startDatetime!: string;

  @ApiProperty({ example: '2025-08-14T23:59:59.000Z' })
  @IsNotEmpty()
  @IsString()
  endDatetime!: string;

  @ApiProperty({ example: 'Annual medical conference in Dubai', required: false })
  @IsOptional()
  @IsString()
  reason?: string;
}

export class CreateLeaveBlockDto {
  @ApiProperty({ example: 'SICK', enum: ['CASUAL', 'SICK', 'EARNED', 'UNPAID', 'EMERGENCY'], required: false })
  @IsOptional()
  @IsString()
  leaveType?: string;

  @ApiProperty({ example: '2025-08-05' })
  @IsNotEmpty()
  @IsDateString()
  startDate!: string;

  @ApiProperty({ example: '2025-08-07' })
  @IsNotEmpty()
  @IsDateString()
  endDate!: string;

  @ApiProperty({ example: 'Fever and recovery', required: false })
  @IsOptional()
  @IsString()
  reason?: string;
}

export class CreateShiftDto {
  @ApiProperty({ example: 'facility-uuid-1' })
  @IsNotEmpty()
  @IsString()
  facilityId!: string;

  @ApiProperty({ example: 'department-uuid-1', required: false })
  @IsOptional()
  @IsString()
  departmentId?: string;

  @ApiProperty({ example: 'ICU Morning Shift' })
  @IsNotEmpty()
  @IsString()
  name!: string;

  @ApiProperty({ example: 'MORNING', enum: ['MORNING', 'EVENING', 'NIGHT', 'SPLIT', 'CUSTOM'] })
  @IsNotEmpty()
  @IsString()
  shiftType!: string;

  @ApiProperty({ example: '07:00' })
  @IsNotEmpty()
  @IsString()
  startTime!: string;

  @ApiProperty({ example: '15:00' })
  @IsNotEmpty()
  @IsString()
  endTime!: string;

  @ApiProperty({ example: 30, required: false })
  @IsOptional()
  @IsInt()
  @Min(0)
  breakDurationMinutes?: number;
}

export class AssignStaffToShiftDto {
  @ApiProperty({ example: 'staff-uuid-1' })
  @IsNotEmpty()
  @IsString()
  staffId!: string;

  @ApiProperty({ example: '2025-08-01' })
  @IsNotEmpty()
  @IsDateString()
  assignedDate!: string;

  @ApiProperty({ example: 'ASSIGNED', enum: ['ASSIGNED', 'SWAPPED', 'CANCELLED'], required: false })
  @IsOptional()
  @IsString()
  status?: string;

  @ApiProperty({ example: 'Covering for Sister Ayesha', required: false })
  @IsOptional()
  @IsString()
  notes?: string;
}

export class CreateHolidayDto {
  @ApiProperty({ example: 'Pakistan Independence Day' })
  @IsNotEmpty()
  @IsString()
  name!: string;

  @ApiProperty({ example: '2025-08-14' })
  @IsNotEmpty()
  @IsDateString()
  holidayDate!: string;

  @ApiProperty({ example: 'facility-uuid-1', required: false, description: 'null = global holiday' })
  @IsOptional()
  @IsString()
  facilityId?: string;

  @ApiProperty({ example: true, required: false })
  @IsOptional()
  @IsBoolean()
  isRecurring?: boolean;

  @ApiProperty({ example: 'National public holiday', required: false })
  @IsOptional()
  @IsString()
  description?: string;
}

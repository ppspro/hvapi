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
exports.CreateHolidayDto = exports.AssignStaffToShiftDto = exports.CreateShiftDto = exports.CreateLeaveBlockDto = exports.BlockScheduleDto = exports.GenerateSlotsDto = exports.UpsertWorkingHoursDto = exports.CreateScheduleDto = exports.WorkingHoursInputDto = void 0;
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const swagger_1 = require("@nestjs/swagger");
class WorkingHoursInputDto {
}
exports.WorkingHoursInputDto = WorkingHoursInputDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1, description: '0=Sun,1=Mon,...,6=Sat' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], WorkingHoursInputDto.prototype, "dayOfWeek", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'MORNING', enum: ['MORNING', 'AFTERNOON', 'EVENING', 'NIGHT', 'CUSTOM'], required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], WorkingHoursInputDto.prototype, "sessionType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '09:00' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], WorkingHoursInputDto.prototype, "startTime", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '13:00' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], WorkingHoursInputDto.prototype, "endTime", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '11:00', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], WorkingHoursInputDto.prototype, "breakStart", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '11:15', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], WorkingHoursInputDto.prototype, "breakEnd", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: true, required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], WorkingHoursInputDto.prototype, "isEnabled", void 0);
class CreateScheduleDto {
}
exports.CreateScheduleDto = CreateScheduleDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'DOCTOR', enum: ['DOCTOR', 'STAFF', 'FACILITY', 'DEPARTMENT'] }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateScheduleDto.prototype, "ownerType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'doctor-profile-uuid-1', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateScheduleDto.prototype, "doctorProfileId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'staff-uuid-1', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateScheduleDto.prototype, "staffId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'facility-uuid-1', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateScheduleDto.prototype, "facilityId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'department-uuid-1', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateScheduleDto.prototype, "departmentId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Dr. Khan Morning OPD Schedule' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateScheduleDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Asia/Karachi', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateScheduleDto.prototype, "timezone", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 15, required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(5),
    __metadata("design:type", Number)
], CreateScheduleDto.prototype, "slotDurationMinutes", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 5, required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], CreateScheduleDto.prototype, "bufferMinutes", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1, required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], CreateScheduleDto.prototype, "maxPatientsPerSlot", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2025-01-01' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], CreateScheduleDto.prototype, "effectiveFrom", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2025-12-31', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], CreateScheduleDto.prototype, "effectiveTo", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: true, required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CreateScheduleDto.prototype, "isActive", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Main OPD morning session', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateScheduleDto.prototype, "notes", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [WorkingHoursInputDto], required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => WorkingHoursInputDto),
    __metadata("design:type", Array)
], CreateScheduleDto.prototype, "workingHours", void 0);
class UpsertWorkingHoursDto {
}
exports.UpsertWorkingHoursDto = UpsertWorkingHoursDto;
__decorate([
    (0, swagger_1.ApiProperty)({ type: [WorkingHoursInputDto] }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => WorkingHoursInputDto),
    __metadata("design:type", Array)
], UpsertWorkingHoursDto.prototype, "workingHours", void 0);
class GenerateSlotsDto {
}
exports.GenerateSlotsDto = GenerateSlotsDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2025-08-01' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], GenerateSlotsDto.prototype, "fromDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2025-08-31' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], GenerateSlotsDto.prototype, "toDate", void 0);
class BlockScheduleDto {
}
exports.BlockScheduleDto = BlockScheduleDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'VACATION', enum: ['VACATION', 'CONFERENCE', 'TRAINING', 'EMERGENCY', 'MAINTENANCE', 'MANUAL'] }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], BlockScheduleDto.prototype, "exceptionType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2025-08-10T00:00:00.000Z' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], BlockScheduleDto.prototype, "startDatetime", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2025-08-14T23:59:59.000Z' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], BlockScheduleDto.prototype, "endDatetime", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Annual medical conference in Dubai', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], BlockScheduleDto.prototype, "reason", void 0);
class CreateLeaveBlockDto {
}
exports.CreateLeaveBlockDto = CreateLeaveBlockDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'SICK', enum: ['CASUAL', 'SICK', 'EARNED', 'UNPAID', 'EMERGENCY'], required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateLeaveBlockDto.prototype, "leaveType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2025-08-05' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], CreateLeaveBlockDto.prototype, "startDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2025-08-07' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], CreateLeaveBlockDto.prototype, "endDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Fever and recovery', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateLeaveBlockDto.prototype, "reason", void 0);
class CreateShiftDto {
}
exports.CreateShiftDto = CreateShiftDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'facility-uuid-1' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateShiftDto.prototype, "facilityId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'department-uuid-1', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateShiftDto.prototype, "departmentId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'ICU Morning Shift' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateShiftDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'MORNING', enum: ['MORNING', 'EVENING', 'NIGHT', 'SPLIT', 'CUSTOM'] }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateShiftDto.prototype, "shiftType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '07:00' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateShiftDto.prototype, "startTime", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '15:00' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateShiftDto.prototype, "endTime", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 30, required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], CreateShiftDto.prototype, "breakDurationMinutes", void 0);
class AssignStaffToShiftDto {
}
exports.AssignStaffToShiftDto = AssignStaffToShiftDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'staff-uuid-1' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AssignStaffToShiftDto.prototype, "staffId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2025-08-01' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], AssignStaffToShiftDto.prototype, "assignedDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'ASSIGNED', enum: ['ASSIGNED', 'SWAPPED', 'CANCELLED'], required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AssignStaffToShiftDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Covering for Sister Ayesha', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AssignStaffToShiftDto.prototype, "notes", void 0);
class CreateHolidayDto {
}
exports.CreateHolidayDto = CreateHolidayDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Pakistan Independence Day' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateHolidayDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2025-08-14' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], CreateHolidayDto.prototype, "holidayDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'facility-uuid-1', required: false, description: 'null = global holiday' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateHolidayDto.prototype, "facilityId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: true, required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CreateHolidayDto.prototype, "isRecurring", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'National public holiday', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateHolidayDto.prototype, "description", void 0);
//# sourceMappingURL=create-schedule.dto.js.map
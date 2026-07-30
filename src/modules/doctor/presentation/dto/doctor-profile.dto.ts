import { ApiProperty } from '@nestjs/swagger';

export class DoctorProfileResponseDto {
  @ApiProperty({ example: 'doctor-uuid-v4' })
  id!: string;

  @ApiProperty({ example: 'Dr. John Watson' })
  fullName!: string;

  @ApiProperty({ example: 'General Medicine' })
  specialization!: string;

  @ApiProperty({ example: 'MD, PhD' })
  credentials!: string;
}

export class ScheduleSlotResponseDto {
  @ApiProperty({ example: 'slot-uuid-v4' })
  id!: string;

  @ApiProperty({ example: '2026-07-30T09:00:00.000Z' })
  startTime!: Date;

  @ApiProperty({ example: '2026-07-30T09:30:00.000Z' })
  endTime!: Date;

  @ApiProperty({ example: false })
  isBooked!: boolean;
}

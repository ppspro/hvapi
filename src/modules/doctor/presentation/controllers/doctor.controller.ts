import { Controller, Get, Param, UseGuards, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { DoctorService } from '../../application/use-cases/doctor.service';
import { DoctorProfileResponseDto, ScheduleSlotResponseDto } from '../dto/doctor-profile.dto';

@ApiTags('Doctors')
@Controller('doctors')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth('JWT-Auth')
export class DoctorController {
  constructor(private readonly doctorService: DoctorService) {}

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get Doctor Profile' })
  @ApiResponse({ status: 200, type: DoctorProfileResponseDto })
  async getDoctorProfile(@Param('id') doctorId: string): Promise<DoctorProfileResponseDto> {
    return this.doctorService.getDoctorProfile(doctorId);
  }

  @Get(':id/slots')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get Doctor Availability Schedule Slots' })
  @ApiResponse({ status: 200, type: [ScheduleSlotResponseDto] })
  async getDoctorSlots(@Param('id') doctorId: string): Promise<ScheduleSlotResponseDto[]> {
    return this.doctorService.getDoctorSlots(doctorId);
  }
}

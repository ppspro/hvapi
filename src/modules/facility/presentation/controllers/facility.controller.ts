import { Controller, Get, Param, UseGuards, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { FacilityService } from '../../application/use-cases/facility.service';
import { FacilityResponseDto, DepartmentResponseDto } from '../dto/facility.dto';
import { DoctorProfileResponseDto } from '../../../../modules/doctor/presentation/dto/doctor-profile.dto';

@ApiTags('Facilities')
@Controller('facilities')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth('JWT-Auth')
export class FacilityController {
  constructor(private readonly facilityService: FacilityService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'List Registered Health Facilities' })
  @ApiResponse({ status: 200, type: [FacilityResponseDto] })
  async listFacilities(): Promise<FacilityResponseDto[]> {
    return this.facilityService.listFacilities();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get Facility Details' })
  @ApiResponse({ status: 200, type: FacilityResponseDto })
  async getFacilityDetails(@Param('id') facilityId: string): Promise<FacilityResponseDto> {
    return this.facilityService.getFacilityDetails(facilityId);
  }

  @Get(':id/departments')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'List Facility Departments' })
  @ApiResponse({ status: 200, type: [DepartmentResponseDto] })
  async listDepartments(@Param('id') facilityId: string): Promise<DepartmentResponseDto[]> {
    return this.facilityService.listDepartments(facilityId);
  }

  @Get(':id/doctors')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'List Associated Facility Doctors' })
  @ApiResponse({ status: 200, type: [DoctorProfileResponseDto] })
  async listDoctors(@Param('id') facilityId: string): Promise<DoctorProfileResponseDto[]> {
    return this.facilityService.listDoctors(facilityId);
  }
}

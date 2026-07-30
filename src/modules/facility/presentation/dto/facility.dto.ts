import { ApiProperty } from '@nestjs/swagger';
import { DoctorProfileResponseDto } from '../../../../modules/doctor/presentation/dto/doctor-profile.dto';

export class FacilityResponseDto {
  @ApiProperty({ example: 'facility-uuid-v4' })
  id!: string;

  @ApiProperty({ example: 'Mayo Clinic' })
  name!: string;

  @ApiProperty({ example: '123 Medical Ctr Dr' })
  address!: string;

  @ApiProperty({ example: '+14155551234' })
  phone!: string;
}

export class DepartmentResponseDto {
  @ApiProperty({ example: 'dept-uuid-v4' })
  id!: string;

  @ApiProperty({ example: 'Cardiology' })
  name!: string;

  @ApiProperty({ example: 'Heart Health Center', required: false })
  description?: string;
}

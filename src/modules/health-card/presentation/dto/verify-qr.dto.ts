import { IsNotEmpty, IsString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class VerifyQrDto {
  @ApiProperty({ example: 'HV360-1234-5678-9012', description: 'QR payload or card number string' })
  @IsNotEmpty()
  @IsString()
  qrPayload!: string;
}

export class PatientDetailsDto {
  @ApiProperty({ example: 'PT-12345' }) patientNumber!: string;
  @ApiProperty({ example: 'John' }) firstName!: string;
  @ApiProperty({ example: 'Doe' }) lastName!: string;
  @ApiProperty({ example: '1990-01-01' }) dateOfBirth!: string;
  @ApiProperty({ example: 'O+' }) bloodGroup!: string;
}

export class VerifyQrResponseDto {
  @ApiProperty({ example: true }) isValid!: boolean;
  @ApiProperty({ example: 'VERIFIED', required: false }) status?: string;
  @ApiProperty({ example: 'John Doe', required: false }) patientName?: string;
  @ApiProperty({ example: 'HV360-1234-5678-9012', required: false }) cardNumber?: string;
  @ApiProperty({ example: 'QR verification completed successfully', required: false }) message?: string;
  @ApiProperty({ type: PatientDetailsDto, required: false }) patientDetails?: PatientDetailsDto;
}

import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class VerifyQrDto {
  @ApiProperty({ example: 'encrypted.payload.hash', description: 'Encrypted QR string to verify' })
  @IsNotEmpty()
  @IsString()
  qrPayload!: string;
}

export class VerifyQrResponseDto {
  @ApiProperty({ example: true, description: 'Verification validity status' })
  isValid!: boolean;

  @ApiProperty({ example: 'John Doe', description: 'Patient name if valid' })
  patientName!: string;

  @ApiProperty({ example: 'HV360-1234-5678-9012', description: 'Card identification number if valid' })
  cardNumber!: string;

  @ApiProperty({ example: 'QR verification completed successfully', description: 'Status message' })
  message!: string;
}

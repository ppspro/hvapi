import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ResendOtpDto {
  @ApiProperty({ example: 'challenge-uuid-v4', description: 'Existing OTP challenge session identifier' })
  @IsNotEmpty({ message: 'Challenge ID is required' })
  @IsString({ message: 'Challenge ID must be a string' })
  challengeId!: string;
}

export class ResendOtpResponseDto {
  @ApiProperty({ example: 'challenge-uuid-v4', description: 'New or existing OTP challenge session identifier' })
  challengeId!: string;

  @ApiProperty({ example: 'OTP resent successfully', description: 'Status message' })
  message!: string;
}

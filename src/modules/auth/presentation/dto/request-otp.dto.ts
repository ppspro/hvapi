import { IsNotEmpty, IsString, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RequestOtpDto {
  @ApiProperty({
    example: '+14155552671',
    description: 'User phone number in E.164 international format',
  })
  @IsNotEmpty({ message: 'Phone number is required' })
  @IsString({ message: 'Phone number must be a string' })
  @Matches(/^\+[1-9]\d{1,14}$/, {
    message: 'Phone number must follow E.164 format (e.g. +14155552671)',
  })
  phone!: string;
}

export class RequestOtpResponseDto {
  @ApiProperty({ example: 'challenge-uuid-v4', description: 'OTP challenge session identifier' })
  challengeId!: string;

  @ApiProperty({ example: 'OTP sent successfully', description: 'Status message' })
  message!: string;
}

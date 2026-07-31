import { IsString, IsOptional, IsEmail, IsPhoneNumber, IsBoolean, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateContactDto {
  @ApiProperty({ example: '+923001234567', required: false })
  @IsOptional()
  @IsPhoneNumber()
  phone?: string;

  @ApiProperty({ example: 'john.doe@email.com', required: false })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiProperty({ example: 'PHONE', enum: ['EMAIL', 'PHONE', 'SMS', 'APP'], required: false })
  @IsOptional()
  @IsString()
  prefContactMethod?: string;
}

import { IsBoolean, IsOptional, IsEnum, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdatePreferencesDto {
  @ApiProperty({ example: true, required: false })
  @IsOptional()
  @IsBoolean()
  emailNotifications?: boolean;

  @ApiProperty({ example: true, required: false })
  @IsOptional()
  @IsBoolean()
  smsNotifications?: boolean;

  @ApiProperty({ example: true, required: false })
  @IsOptional()
  @IsBoolean()
  pushNotifications?: boolean;

  @ApiProperty({ example: 'EMAIL', enum: ['EMAIL', 'PHONE', 'SMS', 'APP'], required: false })
  @IsOptional()
  @IsString()
  prefContactMethod?: string;

  @ApiProperty({ example: 'PRIVATE', enum: ['PRIVATE', 'PUBLIC', 'CARE_TEAM'], required: false })
  @IsOptional()
  @IsString()
  profileVisibility?: string;
}

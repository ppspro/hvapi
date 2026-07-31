import { IsString, IsOptional, IsDateString, IsEnum, IsArray, ArrayNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateBasicInfoDto {
  @ApiProperty({ example: 'John', required: false })
  @IsOptional()
  @IsString()
  firstName?: string;

  @ApiProperty({ example: 'Doe', required: false })
  @IsOptional()
  @IsString()
  lastName?: string;

  @ApiProperty({ example: '1990-01-01', required: false })
  @IsOptional()
  @IsDateString()
  dateOfBirth?: string;

  @ApiProperty({ example: 'MALE', enum: ['MALE', 'FEMALE', 'OTHER', 'PREFER_NOT_TO_SAY'], required: false })
  @IsOptional()
  @IsString()
  gender?: string;

  @ApiProperty({ example: 'O+', required: false })
  @IsOptional()
  @IsString()
  bloodGroup?: string;

  @ApiProperty({ example: 'Pakistani', required: false })
  @IsOptional()
  @IsString()
  nationality?: string;

  @ApiProperty({ example: 'Software Engineer', required: false })
  @IsOptional()
  @IsString()
  occupation?: string;

  @ApiProperty({ example: 'MARRIED', enum: ['SINGLE', 'MARRIED', 'DIVORCED', 'WIDOWED', 'OTHER'], required: false })
  @IsOptional()
  @IsString()
  maritalStatus?: string;

  @ApiProperty({ example: ['English', 'Urdu'], type: [String], required: false })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  languages?: string[];
}

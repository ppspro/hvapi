import { IsArray, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateMedicalSummaryDto {
  @ApiProperty({ example: 'O+', required: false })
  @IsOptional()
  @IsString()
  bloodGroup?: string;

  @ApiProperty({ example: ['Penicillin', 'Nuts'], type: [String], required: false })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  knownAllergies?: string[];

  @ApiProperty({ example: ['Diabetes Type 2', 'Hypertension'], type: [String], required: false })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  chronicConditions?: string[];

  @ApiProperty({ example: ['Visual Impairment'], type: [String], required: false })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  disabilities?: string[];
}

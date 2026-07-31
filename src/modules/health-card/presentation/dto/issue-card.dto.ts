import { IsNotEmpty, IsString, IsOptional, IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class IssueCardDto {
  @ApiProperty({ example: 'Initial issuance during registration', required: false })
  @IsOptional()
  @IsString()
  reason?: string;
}

export class CardActionDto {
  @ApiProperty({ example: 'Action requested by patient/admin', required: false })
  @IsOptional()
  @IsString()
  reason?: string;
}

export class UpdateCardDto {
  @ApiProperty({ example: true, required: false, description: 'Toggle emergency flag' })
  @IsOptional()
  @IsBoolean()
  emergencyFlag?: boolean;

  @ApiProperty({ example: '{"notes": "VIP Patient"}', required: false })
  @IsOptional()
  @IsString()
  metadata?: string;
}

import { IsNotEmpty, IsIn, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateFamilyConsentDto {
  @ApiProperty({ example: 'ACCEPTED', description: 'Consent status to update', enum: ['ACCEPTED', 'REJECTED'] })
  @IsNotEmpty()
  @IsString()
  @IsIn(['ACCEPTED', 'REJECTED'])
  status!: 'ACCEPTED' | 'REJECTED';
}

export class UpdateFamilyConsentResponseDto {
  @ApiProperty({ example: true, description: 'Success status flag' })
  success!: boolean;

  @ApiProperty({ example: 'Consent invitation updated successfully', description: 'Status message' })
  message!: string;
}

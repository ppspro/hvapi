import { IsNotEmpty, IsString, IsOptional, IsDateString, IsEnum, IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { FamilyRelationshipType } from './invitation.dto';

export class CreateGuardianDto {
  @ApiProperty({ example: 'Ahmed Ali', description: 'Full name of guardian' })
  @IsNotEmpty()
  @IsString()
  fullName!: string;

  @ApiProperty({ example: '+923001234567' })
  @IsNotEmpty()
  @IsString()
  phone!: string;

  @ApiProperty({ example: 'GUARDIAN', enum: FamilyRelationshipType })
  @IsNotEmpty()
  @IsEnum(FamilyRelationshipType)
  relationshipType!: FamilyRelationshipType;

  @ApiProperty({ example: 'Father', description: 'Human-readable relationship label' })
  @IsNotEmpty()
  @IsString()
  relationship!: string;

  @ApiProperty({ example: true, required: false, description: 'Is this the primary guardian?' })
  @IsOptional()
  @IsBoolean()
  isPrimary?: boolean;

  @ApiProperty({ example: 'Legal guardian by court order', required: false })
  @IsOptional()
  @IsString()
  notes?: string;
}

export class UpdateGuardianDto {
  @ApiProperty({ example: 'Verified', required: false })
  @IsOptional()
  @IsString()
  verificationStatus?: string;

  @ApiProperty({ example: true, required: false })
  @IsOptional()
  @IsBoolean()
  isPrimary?: boolean;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  notes?: string;
}

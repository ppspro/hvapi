import { IsNotEmpty, IsString, IsOptional, IsEnum, IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { FamilyRelationshipType } from './invitation.dto';

export class CreateDependentDto {
  @ApiProperty({ example: 'Sara Ali', description: 'Full name of dependent' })
  @IsNotEmpty()
  @IsString()
  fullName!: string;

  @ApiProperty({ example: '+923001234567' })
  @IsNotEmpty()
  @IsString()
  phone!: string;

  @ApiProperty({ example: 'CHILD', enum: FamilyRelationshipType })
  @IsNotEmpty()
  @IsEnum(FamilyRelationshipType)
  relationshipType!: FamilyRelationshipType;

  @ApiProperty({ example: 'Daughter', description: 'Human-readable relationship label' })
  @IsNotEmpty()
  @IsString()
  relationship!: string;

  @ApiProperty({ example: false, required: false, description: 'Is this a caregiver relationship?' })
  @IsOptional()
  @IsBoolean()
  isCaregiver?: boolean;

  @ApiProperty({ example: 'Minor, age 7', required: false })
  @IsOptional()
  @IsString()
  notes?: string;
}

export class UpdateDependentDto {
  @ApiProperty({ example: 'Sara Ali', required: false })
  @IsOptional()
  @IsString()
  fullName?: string;

  @ApiProperty({ example: '+923001234567', required: false })
  @IsOptional()
  @IsString()
  phone?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  notes?: string;
}

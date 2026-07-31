import { IsOptional, IsString, IsBoolean, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { FamilyRelationshipType } from './invitation.dto';

export enum FamilyMemberStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  ARCHIVED = 'ARCHIVED',
}

export class UpdateFamilyMemberDto {
  @ApiProperty({ example: 'Jane Doe', required: false })
  @IsOptional()
  @IsString()
  fullName?: string;

  @ApiProperty({ example: 'Spouse', required: false })
  @IsOptional()
  @IsString()
  relationship?: string;

  @ApiProperty({ enum: FamilyRelationshipType, required: false })
  @IsOptional()
  @IsEnum(FamilyRelationshipType)
  relationshipType?: FamilyRelationshipType;

  @ApiProperty({ example: '+923001234567', required: false })
  @IsOptional()
  @IsString()
  phone?: string;

  @ApiProperty({ enum: FamilyMemberStatus, required: false })
  @IsOptional()
  @IsEnum(FamilyMemberStatus)
  status?: FamilyMemberStatus;

  @ApiProperty({ example: true, required: false })
  @IsOptional()
  @IsBoolean()
  isPrimary?: boolean;

  @ApiProperty({ example: 'Clinical notes', required: false })
  @IsOptional()
  @IsString()
  notes?: string;
}

export class FamilyMemberResponseDto {
  @ApiProperty() id!: string;
  @ApiProperty() fullName!: string;
  @ApiProperty() relationship!: string;
  @ApiProperty() relationshipType!: string;
  @ApiProperty() phone!: string;
  @ApiProperty() status!: string;
  @ApiProperty() isPrimary!: boolean;
  @ApiProperty() isGuardian!: boolean;
  @ApiProperty() isDependent!: boolean;
  @ApiProperty() isCaregiver!: boolean;
  @ApiProperty() verificationStatus!: string;
  @ApiProperty({ nullable: true }) notes?: string;
  @ApiProperty() createdAt!: string;
  @ApiProperty() updatedAt!: string;
}

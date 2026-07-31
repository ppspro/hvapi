import { IsNotEmpty, IsString, IsOptional, IsDateString, Matches, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export enum FamilyRelationshipType {
  GUARDIAN = 'GUARDIAN',
  DEPENDENT = 'DEPENDENT',
  PARENT = 'PARENT',
  CHILD = 'CHILD',
  SPOUSE = 'SPOUSE',
  SIBLING = 'SIBLING',
  CAREGIVER = 'CAREGIVER',
  OTHER = 'OTHER',
}

export class CreateInvitationDto {
  @ApiProperty({ example: '+923001234567', description: 'Invitee phone number (E.164 format)' })
  @IsNotEmpty()
  @IsString()
  @Matches(/^\+[1-9]\d{1,14}$/, { message: 'Phone number must follow E.164 format (e.g. +923001234567)' })
  inviteePhone!: string;

  @ApiProperty({ example: 'Jane Doe', required: false })
  @IsOptional()
  @IsString()
  inviteeName?: string;

  @ApiProperty({ example: 'Spouse', description: 'Relationship label' })
  @IsNotEmpty()
  @IsString()
  relationship!: string;

  @ApiProperty({ enum: FamilyRelationshipType, example: 'SPOUSE', required: false })
  @IsOptional()
  @IsEnum(FamilyRelationshipType)
  relationshipType?: FamilyRelationshipType;

  @ApiProperty({ example: '2027-01-01', description: 'Optional expiry date for invitation', required: false })
  @IsOptional()
  @IsDateString()
  expiresAt?: string;
}

export class InvitationResponseDto {
  @ApiProperty() id!: string;
  @ApiProperty() inviteePhone!: string;
  @ApiProperty({ nullable: true }) inviteeName?: string;
  @ApiProperty() relationship!: string;
  @ApiProperty() relationshipType!: string;
  @ApiProperty() status!: string;
  @ApiProperty() invitationToken!: string;
  @ApiProperty() resendCount!: number;
  @ApiProperty({ nullable: true }) expiresAt?: string;
  @ApiProperty({ nullable: true }) acceptedAt?: string;
  @ApiProperty({ nullable: true }) rejectedAt?: string;
  @ApiProperty({ nullable: true }) cancelledAt?: string;
  @ApiProperty() createdAt!: string;
}

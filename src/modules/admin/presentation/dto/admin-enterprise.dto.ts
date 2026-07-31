import { IsNotEmpty, IsString, IsOptional, IsArray, IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserStatusDto {
  @ApiProperty({ example: 'BLOCKED', enum: ['ACTIVE', 'INACTIVE', 'BLOCKED'] })
  @IsNotEmpty()
  @IsString()
  status!: string;
}

export class AssignUserRolesDto {
  @ApiProperty({ example: ['DOCTOR', 'FACILITY_ADMIN'], type: [String] })
  @IsNotEmpty()
  @IsArray()
  @IsString({ each: true })
  roles!: string[];
}

export class CreatePermissionGroupDto {
  @ApiProperty({ example: 'Patient Management' })
  @IsNotEmpty()
  @IsString()
  name!: string;

  @ApiProperty({ example: 'Permissions related to patient profile access and onboarding', required: false })
  @IsOptional()
  @IsString()
  description?: string;
}

export class CreatePermissionDto {
  @ApiProperty({ example: 'PATIENT_READ' })
  @IsNotEmpty()
  @IsString()
  code!: string;

  @ApiProperty({ example: 'View Patient Profiles' })
  @IsNotEmpty()
  @IsString()
  name!: string;

  @ApiProperty({ example: 'Allows reading patient demographic data', required: false })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ example: 'group-uuid-1', required: false })
  @IsOptional()
  @IsString()
  groupId?: string;
}

export class AssignRolePermissionsDto {
  @ApiProperty({ example: ['perm-uuid-1', 'perm-uuid-2'], type: [String] })
  @IsNotEmpty()
  @IsArray()
  @IsString({ each: true })
  permissionIds!: string[];
}

export class CreateOrganizationDto {
  @ApiProperty({ example: 'Health Vault 360 National Network' })
  @IsNotEmpty()
  @IsString()
  name!: string;

  @ApiProperty({ example: 'HV360-NAT', required: false })
  @IsOptional()
  @IsString()
  code?: string;

  @ApiProperty({ example: 'https://storage.healthvault360.com/org/logo.png', required: false })
  @IsOptional()
  @IsString()
  logoUrl?: string;

  @ApiProperty({ example: '#004B87', required: false })
  @IsOptional()
  @IsString()
  primaryColor?: string;

  @ApiProperty({ example: '#00A896', required: false })
  @IsOptional()
  @IsString()
  secondaryColor?: string;

  @ApiProperty({ example: '+92-51-111222333', required: false })
  @IsOptional()
  @IsString()
  phone?: string;

  @ApiProperty({ example: 'admin@healthvault360.com', required: false })
  @IsOptional()
  @IsString()
  email?: string;

  @ApiProperty({ example: 'https://healthvault360.com', required: false })
  @IsOptional()
  @IsString()
  website?: string;

  @ApiProperty({ example: 'Islamabad, Pakistan', required: false })
  @IsOptional()
  @IsString()
  streetAddress?: string;

  @ApiProperty({ example: 'Islamabad', required: false })
  @IsOptional()
  @IsString()
  city?: string;

  @ApiProperty({ example: 'Punjab', required: false })
  @IsOptional()
  @IsString()
  state?: string;

  @ApiProperty({ example: 'Pakistan', required: false })
  @IsOptional()
  @IsString()
  country?: string;

  @ApiProperty({ example: 'Asia/Karachi', required: false })
  @IsOptional()
  @IsString()
  timezone?: string;

  @ApiProperty({ example: 'en', required: false })
  @IsOptional()
  @IsString()
  language?: string;
}

export class UpsertPlatformSettingDto {
  @ApiProperty({ example: 'JWT_EXPIRATION' })
  @IsNotEmpty()
  @IsString()
  key!: string;

  @ApiProperty({ example: '86400' })
  @IsNotEmpty()
  @IsString()
  value!: string;

  @ApiProperty({ example: 'SECURITY', enum: ['GENERAL', 'SECURITY', 'STORAGE', 'API_LIMITS', 'MAINTENANCE', 'FEATURE_TOGGLES'] })
  @IsNotEmpty()
  @IsString()
  category!: string;

  @ApiProperty({ example: 'NUMBER', enum: ['STRING', 'NUMBER', 'BOOLEAN', 'JSON'], required: false })
  @IsOptional()
  @IsString()
  valueType?: string;

  @ApiProperty({ example: 'JWT token validity duration in seconds', required: false })
  @IsOptional()
  @IsString()
  description?: string;
}

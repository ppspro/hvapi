import { ApiProperty } from '@nestjs/swagger';

export class UserMeResponseDto {
  @ApiProperty({ example: 'user-uuid-v4', description: 'User identifier' })
  id!: string;

  @ApiProperty({ example: '+14155552671', description: 'User phone number' })
  phone!: string;

  @ApiProperty({ example: 'ACTIVE', description: 'User account status' })
  status!: string;

  @ApiProperty({ example: ['PATIENT'], description: 'Assigned roles' })
  roles!: string[];

  @ApiProperty({ example: ['read:profile', 'write:profile'], description: 'Assigned permission claims' })
  permissions!: string[];
}

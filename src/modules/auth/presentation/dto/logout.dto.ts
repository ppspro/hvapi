import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LogoutDto {
  @ApiProperty({ example: 'refresh.token.string', description: 'Refresh token to revoke' })
  @IsNotEmpty()
  @IsString()
  refreshToken!: string;
}

export class LogoutResponseDto {
  @ApiProperty({ example: true, description: 'Success status' })
  success!: boolean;

  @ApiProperty({ example: 'Logged out successfully', description: 'Status message' })
  message!: string;
}

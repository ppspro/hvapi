import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LogoutAllDto {
  @ApiProperty({ example: 'refresh-token-jwt-string', description: 'Refresh token to identify user and clear all sessions' })
  @IsNotEmpty({ message: 'Refresh token is required' })
  @IsString({ message: 'Refresh token must be a string' })
  refreshToken!: string;
}

export class LogoutAllResponseDto {
  @ApiProperty({ example: true, description: 'Indicating execution success status' })
  success!: boolean;

  @ApiProperty({ example: 'All active sessions and tokens terminated successfully', description: 'Status message' })
  message!: string;
}

import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RefreshTokenDto {
  @ApiProperty({ example: 'refresh.token.string', description: 'Valid refresh token' })
  @IsNotEmpty()
  @IsString()
  refreshToken!: string;
}

export class RefreshTokenResponseDto {
  @ApiProperty({ example: 'new.jwt.access.token', description: 'Newly generated JWT access token' })
  accessToken!: string;

  @ApiProperty({ example: 'new.refresh.token.string', description: 'Rotated refresh token' })
  refreshToken!: string;
}

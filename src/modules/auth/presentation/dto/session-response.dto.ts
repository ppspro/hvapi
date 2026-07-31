import { ApiProperty } from '@nestjs/swagger';

export class SessionResponseDto {
  @ApiProperty({ example: 'session-uuid-v4', description: 'Session identifier' })
  id!: string;

  @ApiProperty({ example: '127.0.0.1', description: 'Client IP address' })
  ipAddress!: string | null;

  @ApiProperty({ example: 'Mozilla/5.0 ...', description: 'Client user agent' })
  userAgent!: string | null;

  @ApiProperty({ example: '2026-07-31T06:00:00.000Z', description: 'Session creation timestamp' })
  createdAt!: Date;
}

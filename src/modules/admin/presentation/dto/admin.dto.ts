import { ApiProperty } from '@nestjs/swagger';

export class AdminDashboardStatsDto {
  @ApiProperty({ example: 1200 })
  totalPatients!: number;

  @ApiProperty({ example: 450 })
  totalDoctors!: number;

  @ApiProperty({ example: 85 })
  pendingOcrReviews!: number;

  @ApiProperty({ example: 3400 })
  systemLogsCount!: number;
}

export class AuditLogResponseDto {
  @ApiProperty({ example: 'log-uuid-v4' })
  id!: string;

  @ApiProperty({ example: 'user-uuid-v4' })
  userId!: string;

  @ApiProperty({ example: 'USER_LOGIN' })
  action!: string;

  @ApiProperty({ example: 'User logged in successfully' })
  details?: string;

  @ApiProperty({ example: '127.0.0.1' })
  ipAddress?: string;

  @ApiProperty({ example: '2026-07-30T17:25:54.000Z' })
  createdAt!: Date;
}

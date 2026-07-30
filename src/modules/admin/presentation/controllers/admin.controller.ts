import { Controller, Get, UseGuards, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { AdminService } from '../../application/use-cases/admin.service';
import { AdminDashboardStatsDto, AuditLogResponseDto } from '../dto/admin.dto';

@ApiTags('Admin')
@Controller('admin')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth('JWT-Auth')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get('dashboard/stats')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get Administrative Dashboard Statistical Counts' })
  @ApiResponse({ status: 200, type: AdminDashboardStatsDto })
  async getDashboardStats(): Promise<AdminDashboardStatsDto> {
    return this.adminService.getDashboardStats();
  }

  @Get('audit-logs')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get System Audit Logs' })
  @ApiResponse({ status: 200, type: [AuditLogResponseDto] })
  async getAuditLogs(): Promise<AuditLogResponseDto[]> {
    return this.adminService.getAuditLogs();
  }
}

import { Injectable, Inject } from '@nestjs/common';
import { IAdminRepository } from '../../domain/repositories/admin.repository.interface';
import { AdminDashboardStatsDto, AuditLogResponseDto } from '../../presentation/dto/admin.dto';
import { Logger } from 'nestjs-pino';

@Injectable()
export class AdminService {
  constructor(
    @Inject('IAdminRepository')
    private readonly adminRepository: IAdminRepository,
    private readonly logger: Logger,
  ) {}

  async getDashboardStats(): Promise<AdminDashboardStatsDto> {
    this.logger.log({ msg: 'Admin dashboard stats requested' });
    return this.adminRepository.getStats();
  }

  async getAuditLogs(): Promise<AuditLogResponseDto[]> {
    this.logger.log({ msg: 'System audit logs requested' });
    const logs = await this.adminRepository.findAuditLogs();
    return logs.map(l => ({
      id: l.id,
      userId: l.userId,
      action: l.action,
      details: l.details || undefined,
      ipAddress: l.ipAddress || undefined,
      createdAt: l.createdAt,
    }));
  }

  async logAction(userId: string, action: string, details?: string, ipAddress?: string): Promise<void> {
    await this.adminRepository.createAuditLog(userId, action, details, ipAddress);
  }
}

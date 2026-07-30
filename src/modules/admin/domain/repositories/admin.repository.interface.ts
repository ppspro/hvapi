import { AuditLogEntity } from '../entities/admin.entity';

export interface IAdminRepository {
  getStats(): Promise<{ totalPatients: number; totalDoctors: number; pendingOcrReviews: number; systemLogsCount: number }>;
  findAuditLogs(): Promise<AuditLogEntity[]>;
  createAuditLog(userId: string, action: string, details?: string, ipAddress?: string): Promise<AuditLogEntity>;
}

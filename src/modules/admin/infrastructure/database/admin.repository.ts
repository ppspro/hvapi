import { Injectable } from '@nestjs/common';
import { DatabaseService } from '@database/database.service';
import { IAdminRepository } from '../../domain/repositories/admin.repository.interface';
import { AuditLogEntity } from '../../domain/entities/admin.entity';

@Injectable()
export class AdminRepository implements IAdminRepository {
  constructor(private readonly db: DatabaseService) {}

  async getStats(): Promise<{ totalPatients: number; totalDoctors: number; pendingOcrReviews: number; systemLogsCount: number }> {
    const totalPatients = await this.db.patientProfile.count();
    const totalDoctors = await this.db.doctorProfile.count();
    const pendingOcrReviews = await this.db.ocrDocument.count({
      where: { status: 'PENDING' },
    });
    const systemLogsCount = await this.db.auditLog.count();

    return {
      totalPatients,
      totalDoctors,
      pendingOcrReviews,
      systemLogsCount,
    };
  }

  async findAuditLogs(): Promise<AuditLogEntity[]> {
    return (await this.db.auditLog.findMany({
      orderBy: { createdAt: 'desc' },
      take: 100,
    })) as AuditLogEntity[];
  }

  async createAuditLog(userId: string, action: string, details?: string, ipAddress?: string): Promise<AuditLogEntity> {
    return (await this.db.auditLog.create({
      data: {
        userId,
        action,
        details: details || null,
        ipAddress: ipAddress || null,
      },
    })) as AuditLogEntity;
  }
}

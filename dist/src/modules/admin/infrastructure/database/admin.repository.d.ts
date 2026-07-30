import { DatabaseService } from "../../../../database/database.service";
import { IAdminRepository } from '../../domain/repositories/admin.repository.interface';
import { AuditLogEntity } from '../../domain/entities/admin.entity';
export declare class AdminRepository implements IAdminRepository {
    private readonly db;
    constructor(db: DatabaseService);
    getStats(): Promise<{
        totalPatients: number;
        totalDoctors: number;
        pendingOcrReviews: number;
        systemLogsCount: number;
    }>;
    findAuditLogs(): Promise<AuditLogEntity[]>;
    createAuditLog(userId: string, action: string, details?: string, ipAddress?: string): Promise<AuditLogEntity>;
}

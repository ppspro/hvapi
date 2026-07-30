import { IAdminRepository } from '../../domain/repositories/admin.repository.interface';
import { AdminDashboardStatsDto, AuditLogResponseDto } from '../../presentation/dto/admin.dto';
import { Logger } from 'nestjs-pino';
export declare class AdminService {
    private readonly adminRepository;
    private readonly logger;
    constructor(adminRepository: IAdminRepository, logger: Logger);
    getDashboardStats(): Promise<AdminDashboardStatsDto>;
    getAuditLogs(): Promise<AuditLogResponseDto[]>;
    logAction(userId: string, action: string, details?: string, ipAddress?: string): Promise<void>;
}

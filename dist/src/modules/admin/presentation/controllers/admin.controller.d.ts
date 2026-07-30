import { AdminService } from '../../application/use-cases/admin.service';
import { AdminDashboardStatsDto, AuditLogResponseDto } from '../dto/admin.dto';
export declare class AdminController {
    private readonly adminService;
    constructor(adminService: AdminService);
    getDashboardStats(): Promise<AdminDashboardStatsDto>;
    getAuditLogs(): Promise<AuditLogResponseDto[]>;
}

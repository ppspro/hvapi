export declare class AdminDashboardStatsDto {
    totalPatients: number;
    totalDoctors: number;
    pendingOcrReviews: number;
    systemLogsCount: number;
}
export declare class AuditLogResponseDto {
    id: string;
    userId: string;
    action: string;
    details?: string;
    ipAddress?: string;
    createdAt: Date;
}

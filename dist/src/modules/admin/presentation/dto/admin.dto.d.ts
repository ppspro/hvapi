export declare class AdminDashboardStatsDto {
    totalPatients: number;
    totalDoctors: number;
    pendingOcrReviews: number;
    systemLogsCount: number;
}
export declare class AdminDashboardSummaryResponseDto {
    totalPatients: number;
    totalDoctors: number;
    totalFacilities: number;
    totalStaff: number;
    totalHealthCards: number;
    totalInsurancePolicies: number;
    totalImmunisationRecords: number;
    totalActiveSchedules: number;
    recentActivities: any[];
    growthMetrics: {
        newPatientsThisMonth: number;
        newDoctorsThisMonth: number;
        newFacilitiesThisMonth: number;
    };
}
export declare class ManagedUserResponseDto {
    id: string;
    phone: string;
    status: string;
    roles: string[];
    patientProfileId?: string;
    doctorProfileId?: string;
    staffMemberId?: string;
    createdAt: string;
    updatedAt: string;
}
export declare class PermissionResponseDto {
    id: string;
    groupId?: string;
    code: string;
    name: string;
    description?: string;
    createdAt: string;
}
export declare class PermissionGroupResponseDto {
    id: string;
    name: string;
    description?: string;
    permissions: PermissionResponseDto[];
    createdAt: string;
}
export declare class OrganizationResponseDto {
    id: string;
    name: string;
    code: string;
    logoUrl?: string;
    primaryColor?: string;
    secondaryColor?: string;
    phone?: string;
    email?: string;
    website?: string;
    streetAddress?: string;
    city?: string;
    district?: string;
    state?: string;
    country: string;
    timezone: string;
    language: string;
    isDeleted: boolean;
    createdAt: string;
    updatedAt: string;
}
export declare class PlatformSettingResponseDto {
    id: string;
    category: string;
    key: string;
    value: string;
    valueType: string;
    description?: string;
    isPublic: boolean;
    updatedBy?: string;
    createdAt: string;
    updatedAt: string;
}
export declare class AuditLogResponseDto {
    id: string;
    userId?: string;
    action: string;
    details?: string;
    ipAddress?: string;
    createdAt: Date;
}

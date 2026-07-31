export declare class AdminDashboardSummaryEntity {
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
export declare class PermissionGroupEntity {
    id: string;
    name: string;
    description?: string | null;
    createdAt: Date;
    permissions?: PermissionEntity[];
}
export declare class PermissionEntity {
    id: string;
    groupId?: string | null;
    code: string;
    name: string;
    description?: string | null;
    createdAt: Date;
    group?: PermissionGroupEntity;
}
export declare class RolePermissionEntity {
    id: string;
    roleId: string;
    permissionId: string;
    createdAt: Date;
    permission?: PermissionEntity;
}
export declare class OrganizationEntity {
    id: string;
    name: string;
    code: string;
    logoUrl?: string | null;
    primaryColor?: string | null;
    secondaryColor?: string | null;
    phone?: string | null;
    email?: string | null;
    website?: string | null;
    streetAddress?: string | null;
    city?: string | null;
    district?: string | null;
    state?: string | null;
    country: string;
    timezone: string;
    language: string;
    isDeleted: boolean;
    deletedAt?: Date | null;
    createdAt: Date;
    updatedAt: Date;
}
export declare class PlatformSettingEntity {
    id: string;
    category: string;
    key: string;
    value: string;
    valueType: string;
    description?: string | null;
    isPublic: boolean;
    updatedBy?: string | null;
    createdAt: Date;
    updatedAt: Date;
}
export declare class ManagedUserEntity {
    id: string;
    phone: string;
    status: string;
    createdAt: Date;
    updatedAt: Date;
    roles: string[];
    patientProfileId?: string | null;
    doctorProfileId?: string | null;
    staffMemberId?: string | null;
}

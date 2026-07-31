export declare class HealthCardEntity {
    id: string;
    patientProfileId: string;
    cardNumber: string;
    status: string;
    version: number;
    emergencyFlag: boolean;
    metadata?: string | null;
    issuedAt: Date;
    expiresAt: Date;
    suspendedAt?: Date | null;
    blockedAt?: Date | null;
    archivedAt?: Date | null;
    replacedAt?: Date | null;
    previousCardNumber?: string | null;
    isDeleted: boolean;
    deletedAt?: Date | null;
    createdAt: Date;
    updatedAt: Date;
    healthCardQr?: HealthCardQrEntity | null;
    history?: HealthCardHistoryEntity[];
}
export declare class HealthCardQrEntity {
    id: string;
    healthCardId: string;
    encryptedPayload: string;
    expiresAt: Date;
    createdAt: Date;
    updatedAt: Date;
}
export declare class HealthCardHistoryEntity {
    id: string;
    healthCardId: string;
    action: string;
    previousStatus?: string | null;
    newStatus: string;
    reason?: string | null;
    performedBy?: string | null;
    createdAt: Date;
}
export declare class HealthCardAuditLogEntity {
    id: string;
    healthCardId: string;
    action: string;
    performedBy?: string | null;
    details?: string | null;
    ipAddress?: string | null;
    createdAt: Date;
}

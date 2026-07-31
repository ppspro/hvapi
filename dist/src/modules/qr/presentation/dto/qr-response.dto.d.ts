export declare class QrHistoryItemDto {
    id: string;
    qrCodeId: string;
    action: string;
    previousToken?: string;
    newToken?: string;
    previousStatus?: string;
    newStatus: string;
    reason?: string;
    performedBy?: string;
    createdAt: string;
}
export declare class QrScanLogItemDto {
    id: string;
    qrCodeId?: string;
    entityId: string;
    entityType: string;
    verifierUserId?: string;
    validationResult: string;
    failureReason?: string;
    deviceInfo?: string;
    ipAddress?: string;
    location?: string;
    platform?: string;
    scannedAt: string;
}
export declare class QrResponseDto {
    id: string;
    entityId: string;
    entityType: string;
    ownerId: string;
    token: string;
    signature: string;
    status: string;
    version: number;
    nonce: string;
    checksum?: string;
    issuedAt: string;
    expiresAt: string;
    rotatedAt?: string;
    revokedAt?: string;
    revocationReason?: string;
    isDeleted: boolean;
    createdAt: string;
    updatedAt: string;
}
export declare class QrVerificationResultDto {
    isValid: boolean;
    status: string;
    entityType: string;
    entityId: string;
    ownerId: string;
    failureReason?: string;
    scannedAt: string;
}
export declare class QrAnalyticsResponseDto {
    totalQrs: number;
    activeQrs: number;
    revokedQrs: number;
    totalScans: number;
    successfulScans: number;
    failedScans: number;
    scansByEntity: Record<string, number>;
}

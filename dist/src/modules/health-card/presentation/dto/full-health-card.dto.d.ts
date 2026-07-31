export declare class HealthCardHistoryItemDto {
    id: string;
    healthCardId: string;
    action: string;
    previousStatus?: string;
    newStatus: string;
    reason?: string;
    performedBy?: string;
    createdAt: string;
}
export declare class FullHealthCardResponseDto {
    id: string;
    patientProfileId: string;
    cardNumber: string;
    status: string;
    version: number;
    emergencyFlag: boolean;
    metadata?: string;
    issuedAt: string;
    expiresAt: string;
    suspendedAt?: string;
    blockedAt?: string;
    archivedAt?: string;
    replacedAt?: string;
    previousCardNumber?: string;
    isDeleted: boolean;
    qrPayload?: string;
    history?: HealthCardHistoryItemDto[];
    createdAt: string;
    updatedAt: string;
}

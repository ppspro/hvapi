export declare class HealthCardEntity {
    id: string;
    patientProfileId: string;
    cardNumber: string;
    status: string;
    issuedAt: Date;
    expiresAt: Date;
    createdAt: Date;
    updatedAt: Date;
}
export declare class HealthCardQrEntity {
    id: string;
    healthCardId: string;
    encryptedPayload: string;
    expiresAt: Date;
    createdAt: Date;
    updatedAt: Date;
}
export declare class QrVerificationLogEntity {
    id: string;
    qrId: string;
    verifierUserId: string;
    status: string;
    scannedAt: Date;
}

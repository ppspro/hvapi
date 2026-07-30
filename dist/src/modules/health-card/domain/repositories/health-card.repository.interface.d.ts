import { HealthCardEntity, HealthCardQrEntity, QrVerificationLogEntity } from '../entities/health-card.entity';
export interface IHealthCardRepository {
    findProfileByUserId(userId: string): Promise<{
        id: string;
        firstName: string;
        lastName: string;
    } | null>;
    findCardByProfileId(profileId: string): Promise<HealthCardEntity | null>;
    createCard(profileId: string, cardNumber: string, expiresAt: Date): Promise<HealthCardEntity>;
    createQr(cardId: string, encryptedPayload: string, expiresAt: Date): Promise<HealthCardQrEntity>;
    findQrByPayload(encryptedPayload: string): Promise<(HealthCardQrEntity & {
        healthCard: HealthCardEntity;
    }) | null>;
    updateQrPayload(cardId: string, encryptedPayload: string, expiresAt: Date): Promise<HealthCardQrEntity>;
    createVerificationLog(qrId: string, verifierUserId: string, status: string): Promise<QrVerificationLogEntity>;
}

import { DatabaseService } from "../../../../database/database.service";
import { IHealthCardRepository } from '../../domain/repositories/health-card.repository.interface';
import { HealthCardEntity, HealthCardQrEntity, QrVerificationLogEntity } from '../../domain/entities/health-card.entity';
export declare class HealthCardRepository implements IHealthCardRepository {
    private readonly db;
    constructor(db: DatabaseService);
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

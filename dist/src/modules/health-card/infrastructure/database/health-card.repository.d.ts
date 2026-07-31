import { DatabaseService } from "../../../../database/database.service";
import { IHealthCardRepository } from '../../domain/repositories/health-card.repository.interface';
import { HealthCardEntity, HealthCardQrEntity, HealthCardHistoryEntity, HealthCardAuditLogEntity } from '../../domain/entities/health-card.entity';
export declare class HealthCardRepository implements IHealthCardRepository {
    private readonly db;
    constructor(db: DatabaseService);
    findProfileByUserId(userId: string): Promise<{
        id: string;
        firstName: string | null;
        lastName: string | null;
        dateOfBirth: Date | null;
        bloodGroup: string | null;
    } | null>;
    createCard(patientProfileId: string, cardNumber: string, expiresAt: Date, metadata?: string): Promise<HealthCardEntity>;
    findCardById(id: string, includeDeleted?: boolean): Promise<HealthCardEntity | null>;
    findCardByProfileId(patientProfileId: string, includeDeleted?: boolean): Promise<HealthCardEntity | null>;
    findCardByNumber(cardNumber: string): Promise<HealthCardEntity | null>;
    updateCard(id: string, data: any): Promise<HealthCardEntity>;
    searchCards(query: string): Promise<HealthCardEntity[]>;
    createQr(healthCardId: string, encryptedPayload: string, expiresAt: Date): Promise<HealthCardQrEntity>;
    findQrByCardId(healthCardId: string): Promise<HealthCardQrEntity | null>;
    updateQrPayload(healthCardId: string, encryptedPayload: string, expiresAt: Date): Promise<HealthCardQrEntity>;
    createHistory(healthCardId: string, data: {
        action: string;
        previousStatus?: string;
        newStatus: string;
        reason?: string;
        performedBy?: string;
    }): Promise<HealthCardHistoryEntity>;
    findHistoryByCardId(healthCardId: string): Promise<HealthCardHistoryEntity[]>;
    createAuditLog(data: {
        healthCardId: string;
        action: string;
        performedBy?: string;
        details?: string;
    }): Promise<HealthCardAuditLogEntity>;
    recordQrScanLog(qrId: string, verifierUserId: string, status: string): Promise<any>;
}

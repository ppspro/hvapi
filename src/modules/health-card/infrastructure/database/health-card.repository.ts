import { Injectable } from '@nestjs/common';
import { DatabaseService } from '@database/database.service';
import { IHealthCardRepository } from '../../domain/repositories/health-card.repository.interface';
import {
  HealthCardEntity,
  HealthCardQrEntity,
  HealthCardHistoryEntity,
  HealthCardAuditLogEntity,
} from '../../domain/entities/health-card.entity';

@Injectable()
export class HealthCardRepository implements IHealthCardRepository {
  constructor(private readonly db: DatabaseService) {}

  async findProfileByUserId(userId: string) {
    return this.db.patientProfile.findUnique({
      where: { userId },
      select: { id: true, firstName: true, lastName: true, dateOfBirth: true, bloodGroup: true },
    });
  }

  async createCard(patientProfileId: string, cardNumber: string, expiresAt: Date, metadata?: string): Promise<HealthCardEntity> {
    const card = await this.db.healthCard.create({
      data: {
        patientProfileId,
        cardNumber,
        status: 'ISSUED',
        version: 1,
        expiresAt,
        metadata: metadata || null,
      },
      include: { healthCardQr: true, history: true },
    });

    await this.createHistory(card.id, {
      action: 'ISSUED',
      newStatus: 'ISSUED',
      reason: 'Initial Health Card issuance',
    });

    return card as unknown as HealthCardEntity;
  }

  async findCardById(id: string, includeDeleted = false): Promise<HealthCardEntity | null> {
    return (await this.db.healthCard.findFirst({
      where: { id, ...(includeDeleted ? {} : { isDeleted: false }) },
      include: { healthCardQr: true, history: { orderBy: { createdAt: 'desc' } } },
    })) as unknown as HealthCardEntity | null;
  }

  async findCardByProfileId(patientProfileId: string, includeDeleted = false): Promise<HealthCardEntity | null> {
    return (await this.db.healthCard.findFirst({
      where: { patientProfileId, ...(includeDeleted ? {} : { isDeleted: false }) },
      include: { healthCardQr: true, history: { orderBy: { createdAt: 'desc' } } },
    })) as unknown as HealthCardEntity | null;
  }

  async findCardByNumber(cardNumber: string): Promise<HealthCardEntity | null> {
    return (await this.db.healthCard.findFirst({
      where: { cardNumber, isDeleted: false },
      include: { healthCardQr: true, history: { orderBy: { createdAt: 'desc' } } },
    })) as unknown as HealthCardEntity | null;
  }

  async updateCard(id: string, data: any): Promise<HealthCardEntity> {
    return (await this.db.healthCard.update({
      where: { id },
      data: {
        status: data.status as any || undefined,
        version: data.version || undefined,
        emergencyFlag: data.emergencyFlag ?? undefined,
        metadata: data.metadata || undefined,
        expiresAt: data.expiresAt ? new Date(data.expiresAt) : undefined,
        suspendedAt: data.suspendedAt || undefined,
        blockedAt: data.blockedAt || undefined,
        archivedAt: data.archivedAt || undefined,
        replacedAt: data.replacedAt || undefined,
        previousCardNumber: data.previousCardNumber || undefined,
        isDeleted: data.isDeleted ?? undefined,
        deletedAt: data.deletedAt || undefined,
      },
      include: { healthCardQr: true, history: { orderBy: { createdAt: 'desc' } } },
    })) as unknown as HealthCardEntity;
  }

  async searchCards(query: string): Promise<HealthCardEntity[]> {
    const q = query.toLowerCase();
    return (await this.db.healthCard.findMany({
      where: {
        isDeleted: false,
        OR: [
          { cardNumber: { contains: q, mode: 'insensitive' } },
          { patientProfile: { firstName: { contains: q, mode: 'insensitive' } } },
          { patientProfile: { lastName: { contains: q, mode: 'insensitive' } } },
          { patientProfile: { patientNumber: { contains: q, mode: 'insensitive' } } },
        ],
      },
      include: { healthCardQr: true, history: { orderBy: { createdAt: 'desc' } } },
      orderBy: { createdAt: 'desc' },
    })) as unknown as HealthCardEntity[];
  }

  async createQr(healthCardId: string, encryptedPayload: string, expiresAt: Date): Promise<HealthCardQrEntity> {
    return (await this.db.healthCardQr.upsert({
      where: { healthCardId },
      create: { healthCardId, encryptedPayload, expiresAt },
      update: { encryptedPayload, expiresAt },
    })) as unknown as HealthCardQrEntity;
  }

  async findQrByCardId(healthCardId: string): Promise<HealthCardQrEntity | null> {
    return (await this.db.healthCardQr.findUnique({
      where: { healthCardId },
    })) as unknown as HealthCardQrEntity | null;
  }

  async updateQrPayload(healthCardId: string, encryptedPayload: string, expiresAt: Date): Promise<HealthCardQrEntity> {
    return (await this.db.healthCardQr.update({
      where: { healthCardId },
      data: { encryptedPayload, expiresAt },
    })) as unknown as HealthCardQrEntity;
  }

  async createHistory(healthCardId: string, data: {
    action: string;
    previousStatus?: string;
    newStatus: string;
    reason?: string;
    performedBy?: string;
  }): Promise<HealthCardHistoryEntity> {
    return (await this.db.healthCardHistory.create({
      data: {
        healthCardId,
        action: data.action,
        previousStatus: data.previousStatus || null,
        newStatus: data.newStatus,
        reason: data.reason || null,
        performedBy: data.performedBy || null,
      },
    })) as unknown as HealthCardHistoryEntity;
  }

  async findHistoryByCardId(healthCardId: string): Promise<HealthCardHistoryEntity[]> {
    return (await this.db.healthCardHistory.findMany({
      where: { healthCardId },
      orderBy: { createdAt: 'desc' },
    })) as unknown as HealthCardHistoryEntity[];
  }

  async createAuditLog(data: {
    healthCardId: string;
    action: string;
    performedBy?: string;
    details?: string;
  }): Promise<HealthCardAuditLogEntity> {
    return (await this.db.healthCardAuditLog.create({
      data: {
        healthCardId: data.healthCardId,
        action: data.action,
        performedBy: data.performedBy || null,
        details: data.details || null,
      },
    })) as unknown as HealthCardAuditLogEntity;
  }

  async recordQrScanLog(qrId: string, verifierUserId: string, status: string): Promise<any> {
    return this.db.qrVerificationLog.create({
      data: { qrId, verifierUserId, status },
    });
  }
}

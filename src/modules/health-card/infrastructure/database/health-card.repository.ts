import { Injectable } from '@nestjs/common';
import { DatabaseService } from '@database/database.service';
import { IHealthCardRepository } from '../../domain/repositories/health-card.repository.interface';
import { HealthCardEntity, HealthCardQrEntity, QrVerificationLogEntity } from '../../domain/entities/health-card.entity';

@Injectable()
export class HealthCardRepository implements IHealthCardRepository {
  constructor(private readonly db: DatabaseService) {}

  async findProfileByUserId(userId: string): Promise<{ id: string; firstName: string; lastName: string } | null> {
    return this.db.patientProfile.findUnique({
      where: { userId },
      select: { id: true, firstName: true, lastName: true },
    });
  }

  async findCardByProfileId(profileId: string): Promise<HealthCardEntity | null> {
    return (await this.db.healthCard.findUnique({
      where: { patientProfileId: profileId },
      include: { healthCardQr: true },
    })) as any;
  }

  async createCard(profileId: string, cardNumber: string, expiresAt: Date): Promise<HealthCardEntity> {
    return (await this.db.healthCard.create({
      data: {
        patientProfileId: profileId,
        cardNumber,
        expiresAt,
        status: 'ACTIVE',
      },
    })) as HealthCardEntity;
  }

  async createQr(cardId: string, encryptedPayload: string, expiresAt: Date): Promise<HealthCardQrEntity> {
    return (await this.db.healthCardQr.create({
      data: {
        healthCardId: cardId,
        encryptedPayload,
        expiresAt,
      },
    })) as HealthCardQrEntity;
  }

  async findQrByPayload(encryptedPayload: string): Promise<(HealthCardQrEntity & { healthCard: HealthCardEntity }) | null> {
    return (await this.db.healthCardQr.findFirst({
      where: { encryptedPayload },
      include: { healthCard: true },
    })) as any;
  }

  async updateQrPayload(cardId: string, encryptedPayload: string, expiresAt: Date): Promise<HealthCardQrEntity> {
    return (await this.db.healthCardQr.update({
      where: { healthCardId: cardId },
      data: {
        encryptedPayload,
        expiresAt,
      },
    })) as HealthCardQrEntity;
  }

  async createVerificationLog(qrId: string, verifierUserId: string, status: string): Promise<QrVerificationLogEntity> {
    return (await this.db.qrVerificationLog.create({
      data: {
        qrId,
        verifierUserId,
        status,
      },
    })) as QrVerificationLogEntity;
  }
}

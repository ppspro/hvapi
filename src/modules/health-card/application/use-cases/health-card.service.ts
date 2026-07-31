import { Injectable, NotFoundException, BadRequestException, ForbiddenException, Inject } from '@nestjs/common';
import { IHealthCardRepository } from '../../domain/repositories/health-card.repository.interface';
import { IssueCardDto, CardActionDto, UpdateCardDto } from '../../presentation/dto/issue-card.dto';
import { FullHealthCardResponseDto, HealthCardHistoryItemDto } from '../../presentation/dto/full-health-card.dto';
import { OnboardHealthCardResponseDto } from '../../presentation/dto/onboard-health-card.dto';
import { VerifyQrDto, VerifyQrResponseDto } from '../../presentation/dto/verify-qr.dto';
import { Logger } from 'nestjs-pino';
import * as crypto from 'crypto';

import { QrService } from '@modules/qr/application/use-cases/qr.service';
import { QrEntityType } from '@modules/qr/presentation/dto/generate-qr.dto';

@Injectable()
export class HealthCardService {
  constructor(
    @Inject('IHealthCardRepository')
    private readonly repository: IHealthCardRepository,
    private readonly qrService: QrService,
    private readonly logger: Logger,
  ) {}


  private async resolveProfile(userId: string) {
    const profile = await this.repository.findProfileByUserId(userId);
    if (!profile) {
      throw new NotFoundException('Patient profile not found. Complete onboarding demographics first.');
    }
    return profile;
  }

  private generateCardNumber(): string {
    const uniqueSuffix = crypto.randomBytes(6).toString('hex').toUpperCase();
    return `HV360-${uniqueSuffix.slice(0, 4)}-${uniqueSuffix.slice(4, 8)}-${uniqueSuffix.slice(8, 12)}`;
  }

  private mapCard(card: any): FullHealthCardResponseDto {
    return {
      id: card.id,
      patientProfileId: card.patientProfileId,
      cardNumber: card.cardNumber,
      status: card.status,
      version: card.version || 1,
      emergencyFlag: card.emergencyFlag ?? false,
      metadata: card.metadata || undefined,
      issuedAt: card.issuedAt.toISOString(),
      expiresAt: card.expiresAt.toISOString(),
      suspendedAt: card.suspendedAt?.toISOString() || undefined,
      blockedAt: card.blockedAt?.toISOString() || undefined,
      archivedAt: card.archivedAt?.toISOString() || undefined,
      replacedAt: card.replacedAt?.toISOString() || undefined,
      previousCardNumber: card.previousCardNumber || undefined,
      isDeleted: card.isDeleted,
      qrPayload: card.healthCardQr?.encryptedPayload || undefined,
      history: card.history?.map((h: any) => ({
        id: h.id,
        healthCardId: h.healthCardId,
        action: h.action,
        previousStatus: h.previousStatus || undefined,
        newStatus: h.newStatus,
        reason: h.reason || undefined,
        performedBy: h.performedBy || undefined,
        createdAt: h.createdAt.toISOString(),
      })) || [],
      createdAt: card.createdAt.toISOString(),
      updatedAt: card.updatedAt.toISOString(),
    };
  }

  // ─── Onboarding Hook (Phase 3 Backward Compatibility) ─────────────────────

  async onboardHealthCard(userId: string): Promise<OnboardHealthCardResponseDto> {
    const profile = await this.resolveProfile(userId);
    let card = await this.repository.findCardByProfileId(profile.id);

    if (!card) {
      const cardNumber = this.generateCardNumber();
      const expiresAt = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000); // 1 year validity

      card = await this.repository.createCard(profile.id, cardNumber, expiresAt);
      const qrPayload = crypto.createHash('sha256').update(card.cardNumber + Date.now()).digest('hex');
      await this.repository.createQr(card.id, qrPayload, new Date(Date.now() + 30 * 24 * 60 * 60 * 1000));
    }

    return {
      cardId: card.id,
      cardNumber: card.cardNumber,
      message: 'Health Card generated successfully during onboarding',
      nextStep: 6,
    };
  }

  // ─── Lifecycle Operations ──────────────────────────────────────────────────

  async issueCard(userId: string, dto: IssueCardDto): Promise<FullHealthCardResponseDto> {
    const profile = await this.resolveProfile(userId);
    const existing = await this.repository.findCardByProfileId(profile.id);

    if (existing && !['EXPIRED', 'ARCHIVED', 'REPLACED'].includes(existing.status)) {
      throw new BadRequestException(`Patient already has an active or valid Health Card (${existing.cardNumber}). Replace or renew it instead.`);
    }

    const cardNumber = this.generateCardNumber();
    const expiresAt = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000);

    const card = await this.repository.createCard(profile.id, cardNumber, expiresAt);
    const qrPayload = crypto.createHash('sha256').update(card.cardNumber + Date.now()).digest('hex');
    await this.repository.createQr(card.id, qrPayload, new Date(Date.now() + 30 * 24 * 60 * 60 * 1000));

    await this.repository.createAuditLog({
      healthCardId: card.id,
      action: 'ISSUED',
      performedBy: userId,
      details: dto.reason || 'Card issued',
    });

    return this.mapCard(card);
  }

  async getActiveCard(userId: string): Promise<FullHealthCardResponseDto> {
    const profile = await this.resolveProfile(userId);
    const card = await this.repository.findCardByProfileId(profile.id);

    if (!card) {
      throw new NotFoundException('Health Card not found for current patient profile');
    }

    return this.mapCard(card);
  }

  async getCardById(userId: string, cardId: string): Promise<FullHealthCardResponseDto> {
    const profile = await this.resolveProfile(userId);
    const card = await this.repository.findCardById(cardId);

    if (!card) throw new NotFoundException('Health Card not found');
    if (card.patientProfileId !== profile.id) throw new ForbiddenException('Access denied');

    return this.mapCard(card);
  }

  async updateCard(userId: string, cardId: string, dto: UpdateCardDto): Promise<FullHealthCardResponseDto> {
    const profile = await this.resolveProfile(userId);
    const card = await this.repository.findCardById(cardId);

    if (!card) throw new NotFoundException('Health Card not found');
    if (card.patientProfileId !== profile.id) throw new ForbiddenException('Access denied');

    const updated = await this.repository.updateCard(cardId, dto);
    return this.mapCard(updated);
  }

  async activateCard(userId: string, cardId: string, dto: CardActionDto): Promise<FullHealthCardResponseDto> {
    const profile = await this.resolveProfile(userId);
    const card = await this.repository.findCardById(cardId);

    if (!card) throw new NotFoundException('Health Card not found');
    if (card.patientProfileId !== profile.id) throw new ForbiddenException('Access denied');
    if (card.status === 'ACTIVE') throw new BadRequestException('Card is already ACTIVE');
    if (['BLOCKED', 'EXPIRED', 'ARCHIVED'].includes(card.status)) {
      throw new BadRequestException(`Cannot activate card with status: ${card.status}`);
    }

    const prevStatus = card.status;
    const updated = await this.repository.updateCard(cardId, { status: 'ACTIVE' });

    await this.repository.createHistory(cardId, {
      action: 'ACTIVATED',
      previousStatus: prevStatus,
      newStatus: 'ACTIVE',
      reason: dto.reason || 'Card activated',
      performedBy: userId,
    });

    return this.mapCard(updated);
  }

  async deactivateCard(userId: string, cardId: string, dto: CardActionDto): Promise<FullHealthCardResponseDto> {
    const profile = await this.resolveProfile(userId);
    const card = await this.repository.findCardById(cardId);

    if (!card) throw new NotFoundException('Health Card not found');
    if (card.patientProfileId !== profile.id) throw new ForbiddenException('Access denied');

    const prevStatus = card.status;
    const updated = await this.repository.updateCard(cardId, { status: 'DEACTIVATED' });

    await this.repository.createHistory(cardId, {
      action: 'DEACTIVATED',
      previousStatus: prevStatus,
      newStatus: 'DEACTIVATED',
      reason: dto.reason || 'Card deactivated by user',
      performedBy: userId,
    });

    return this.mapCard(updated);
  }

  async suspendCard(userId: string, cardId: string, dto: CardActionDto): Promise<FullHealthCardResponseDto> {
    const profile = await this.resolveProfile(userId);
    const card = await this.repository.findCardById(cardId);

    if (!card) throw new NotFoundException('Health Card not found');
    if (card.patientProfileId !== profile.id) throw new ForbiddenException('Access denied');

    const prevStatus = card.status;
    const updated = await this.repository.updateCard(cardId, { status: 'SUSPENDED', suspendedAt: new Date() });

    await this.repository.createHistory(cardId, {
      action: 'SUSPENDED',
      previousStatus: prevStatus,
      newStatus: 'SUSPENDED',
      reason: dto.reason || 'Card suspended temporarily',
      performedBy: userId,
    });

    return this.mapCard(updated);
  }

  async blockCard(userId: string, cardId: string, dto: CardActionDto): Promise<FullHealthCardResponseDto> {
    const profile = await this.resolveProfile(userId);
    const card = await this.repository.findCardById(cardId);

    if (!card) throw new NotFoundException('Health Card not found');
    if (card.patientProfileId !== profile.id) throw new ForbiddenException('Access denied');

    const prevStatus = card.status;
    const updated = await this.repository.updateCard(cardId, { status: 'BLOCKED', blockedAt: new Date() });

    await this.repository.createHistory(cardId, {
      action: 'BLOCKED',
      previousStatus: prevStatus,
      newStatus: 'BLOCKED',
      reason: dto.reason || 'Card blocked for security/lost reasons',
      performedBy: userId,
    });

    return this.mapCard(updated);
  }

  async unblockCard(userId: string, cardId: string, dto: CardActionDto): Promise<FullHealthCardResponseDto> {
    const profile = await this.resolveProfile(userId);
    const card = await this.repository.findCardById(cardId);

    if (!card) throw new NotFoundException('Health Card not found');
    if (card.patientProfileId !== profile.id) throw new ForbiddenException('Access denied');
    if (card.status !== 'BLOCKED') throw new BadRequestException('Card is not blocked');

    const prevStatus = card.status;
    const updated = await this.repository.updateCard(cardId, { status: 'ACTIVE', blockedAt: null });

    await this.repository.createHistory(cardId, {
      action: 'UNBLOCKED',
      previousStatus: prevStatus,
      newStatus: 'ACTIVE',
      reason: dto.reason || 'Card unblocked by user/admin',
      performedBy: userId,
    });

    return this.mapCard(updated);
  }

  async replaceCard(userId: string, cardId: string, dto: CardActionDto): Promise<FullHealthCardResponseDto> {
    const profile = await this.resolveProfile(userId);
    const card = await this.repository.findCardById(cardId);

    if (!card) throw new NotFoundException('Health Card not found');
    if (card.patientProfileId !== profile.id) throw new ForbiddenException('Access denied');

    const oldCardNumber = card.cardNumber;
    const newCardNumber = this.generateCardNumber();
    const newVersion = (card.version || 1) + 1;
    const expiresAt = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000);

    const prevStatus = card.status;
    const updated = await this.repository.updateCard(cardId, {
      cardNumber: newCardNumber,
      version: newVersion,
      status: 'ACTIVE',
      replacedAt: new Date(),
      previousCardNumber: oldCardNumber,
      expiresAt,
    });

    // Update QR code payload for new card number
    const qrPayload = crypto.createHash('sha256').update(newCardNumber + Date.now()).digest('hex');
    await this.repository.createQr(cardId, qrPayload, new Date(Date.now() + 30 * 24 * 60 * 60 * 1000));

    await this.repository.createHistory(cardId, {
      action: 'REPLACED',
      previousStatus: prevStatus,
      newStatus: 'ACTIVE',
      reason: dto.reason || `Replaced old card ${oldCardNumber} with new card ${newCardNumber}`,
      performedBy: userId,
    });

    return this.mapCard(updated);
  }

  async renewCard(userId: string, cardId: string, dto: CardActionDto): Promise<FullHealthCardResponseDto> {
    const profile = await this.resolveProfile(userId);
    const card = await this.repository.findCardById(cardId);

    if (!card) throw new NotFoundException('Health Card not found');
    if (card.patientProfileId !== profile.id) throw new ForbiddenException('Access denied');

    const newExpiry = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000); // 1 additional year
    const prevStatus = card.status;
    const updated = await this.repository.updateCard(cardId, {
      status: 'ACTIVE',
      expiresAt: newExpiry,
    });

    await this.repository.createHistory(cardId, {
      action: 'RENEWED',
      previousStatus: prevStatus,
      newStatus: 'ACTIVE',
      reason: dto.reason || 'Card validity renewed for 1 year',
      performedBy: userId,
    });

    return this.mapCard(updated);
  }

  async archiveCard(userId: string, cardId: string, dto: CardActionDto): Promise<FullHealthCardResponseDto> {
    const profile = await this.resolveProfile(userId);
    const card = await this.repository.findCardById(cardId);

    if (!card) throw new NotFoundException('Health Card not found');
    if (card.patientProfileId !== profile.id) throw new ForbiddenException('Access denied');
    if (card.status === 'ARCHIVED') throw new BadRequestException('Card is already archived');

    const prevStatus = card.status;
    const updated = await this.repository.updateCard(cardId, { status: 'ARCHIVED', archivedAt: new Date() });

    await this.repository.createHistory(cardId, {
      action: 'ARCHIVED',
      previousStatus: prevStatus,
      newStatus: 'ARCHIVED',
      reason: dto.reason || 'Card archived',
      performedBy: userId,
    });

    return this.mapCard(updated);
  }

  async restoreCard(userId: string, cardId: string, dto: CardActionDto): Promise<FullHealthCardResponseDto> {
    const profile = await this.resolveProfile(userId);
    const card = await this.repository.findCardById(cardId, true);

    if (!card) throw new NotFoundException('Health Card not found');
    if (card.patientProfileId !== profile.id) throw new ForbiddenException('Access denied');
    if (card.status !== 'ARCHIVED' && !card.isDeleted) {
      throw new BadRequestException('Card is not archived or deleted');
    }

    const prevStatus = card.status;
    const updated = await this.repository.updateCard(cardId, {
      status: 'ACTIVE',
      archivedAt: null,
      isDeleted: false,
      deletedAt: null,
    });

    await this.repository.createHistory(cardId, {
      action: 'RESTORED',
      previousStatus: prevStatus,
      newStatus: 'ACTIVE',
      reason: dto.reason || 'Card restored',
      performedBy: userId,
    });

    return this.mapCard(updated);
  }

  async getCardHistory(userId: string, cardId: string): Promise<HealthCardHistoryItemDto[]> {
    const profile = await this.resolveProfile(userId);
    const card = await this.repository.findCardById(cardId, true);

    if (!card) throw new NotFoundException('Health Card not found');
    if (card.patientProfileId !== profile.id) throw new ForbiddenException('Access denied');

    const history = await this.repository.findHistoryByCardId(cardId);
    return history.map((h) => ({
      id: h.id,
      healthCardId: h.healthCardId,
      action: h.action,
      previousStatus: h.previousStatus || undefined,
      newStatus: h.newStatus,
      reason: h.reason || undefined,
      performedBy: h.performedBy || undefined,
      createdAt: h.createdAt.toISOString(),
    }));
  }

  async searchCards(query: string): Promise<FullHealthCardResponseDto[]> {
    if (!query || query.trim().length === 0) return [];
    const cards = await this.repository.searchCards(query.trim());
    return cards.map((c) => this.mapCard(c));
  }

  // ─── QR Code Verification ─────────────────────────────────────────────────

  async verifyQr(dto: VerifyQrDto, verifierUserId: string): Promise<VerifyQrResponseDto> {
    this.logger.log({ msg: 'Verifying Health Card QR code', verifierUserId });
    const card = await this.repository.findCardByNumber(dto.qrPayload);

    if (!card) {
      return { isValid: false, status: 'EXPIRED' };
    }

    if (card.status !== 'ACTIVE') {
      await this.repository.recordQrScanLog(card.id, verifierUserId, 'SUSPENDED');
      return { isValid: false, status: card.status as any };
    }

    if (new Date() > card.expiresAt) {
      await this.repository.recordQrScanLog(card.id, verifierUserId, 'EXPIRED');
      return { isValid: false, status: 'EXPIRED' };
    }

    await this.repository.recordQrScanLog(card.id, verifierUserId, 'VERIFIED');

    const profile = (card as any).patientProfile;

    return {
      isValid: true,
      status: 'VERIFIED',
      patientDetails: {
        patientNumber: profile?.patientNumber || 'PT-UNKNOWN',
        firstName: profile?.firstName || 'Patient',
        lastName: profile?.lastName || 'User',
        dateOfBirth: profile?.dateOfBirth ? profile.dateOfBirth.toISOString().split('T')[0] : '1990-01-01',
        bloodGroup: profile?.bloodGroup || 'N/A',
      },
    };
  }

  async getCardDetails(userId: string): Promise<any> {
    const card = await this.getActiveCard(userId);
    return {
      id: card.id,
      cardNumber: card.cardNumber,
      status: card.status,
      issuedAt: card.issuedAt,
      expiresAt: card.expiresAt,
      healthCardQr: card.qrPayload ? {
        id: 'qr-1',
        encryptedPayload: card.qrPayload,
        expiresAt: card.expiresAt,
      } : undefined,
    };
  }

  async getWalletPass(userId: string): Promise<any> {
    const card = await this.getActiveCard(userId);
    return {
      passType: 'PKPass',
      cardNumber: card.cardNumber,
      status: card.status,
      downloadUrl: `https://cdn.hvapi.com/wallet/${card.cardNumber}.pkpass`,
    };
  }
}

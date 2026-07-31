import { Injectable, NotFoundException, BadRequestException, ForbiddenException, Inject } from '@nestjs/common';
import { IQrRepository } from '../../domain/repositories/qr.repository.interface';
import { GenerateQrDto, VerifyQrPayloadDto, RotateQrDto, RevokeQrDto, BulkGenerateQrDto, BulkQrActionDto, UpdateQrDto } from '../../presentation/dto/generate-qr.dto';
import { QrResponseDto, QrVerificationResultDto, QrAnalyticsResponseDto, QrHistoryItemDto, QrScanLogItemDto } from '../../presentation/dto/qr-response.dto';
import { Logger } from 'nestjs-pino';
import * as crypto from 'crypto';

const HMAC_SECRET = process.env.QR_HMAC_SECRET || 'hvapi_enterprise_qr_super_secret_key_360';

@Injectable()
export class QrService {
  constructor(
    @Inject('IQrRepository')
    private readonly repository: IQrRepository,
    private readonly logger: Logger,
  ) {}

  private async resolveProfile(userId: string): Promise<string> {
    const profile = await this.repository.findProfileByUserId(userId);
    if (!profile) {
      throw new NotFoundException('Patient profile not found');
    }
    return profile.id;
  }

  private generateTokenAndSignature(entityId: string, entityType: string, nonce: string): { token: string; signature: string; checksum: string } {
    const payloadRaw = `${entityType}:${entityId}:${nonce}:${Date.now()}`;
    const checksum = crypto.createHash('sha256').update(payloadRaw).digest('hex');
    const signature = crypto.createHmac('sha256', HMAC_SECRET).update(checksum).digest('hex');
    const token = `HVQR-${crypto.randomBytes(8).toString('hex').toUpperCase()}`;
    return { token, signature, checksum };
  }

  private mapQr(q: any): QrResponseDto {
    return {
      id: q.id,
      entityId: q.entityId,
      entityType: q.entityType,
      ownerId: q.ownerId,
      token: q.token,
      signature: q.signature,
      status: q.status,
      version: q.version,
      nonce: q.nonce,
      checksum: q.checksum || undefined,
      issuedAt: q.issuedAt.toISOString(),
      expiresAt: q.expiresAt.toISOString(),
      rotatedAt: q.rotatedAt?.toISOString() || undefined,
      revokedAt: q.revokedAt?.toISOString() || undefined,
      revocationReason: q.revocationReason || undefined,
      isDeleted: q.isDeleted,
      createdAt: q.createdAt.toISOString(),
      updatedAt: q.updatedAt.toISOString(),
    };
  }

  // ─── QR Generation ─────────────────────────────────────────────────────────

  async generateQr(userId: string, dto: GenerateQrDto): Promise<QrResponseDto> {
    const profileId = await this.resolveProfile(userId);

    // If an active QR already exists for this entity and type, return or replace
    const existing = await this.repository.findQrByEntity(dto.entityId, dto.entityType);
    if (existing && existing.status === 'ACTIVE') {
      return this.mapQr(existing);
    }

    const validityDays = dto.validityDays || 365;
    const expiresAt = new Date(Date.now() + validityDays * 24 * 60 * 60 * 1000);
    const nonce = crypto.randomBytes(16).toString('hex');

    const { token, signature, checksum } = this.generateTokenAndSignature(dto.entityId, dto.entityType, nonce);

    const qr = await this.repository.createQr({
      entityId: dto.entityId,
      entityType: dto.entityType,
      ownerId: profileId,
      token,
      signature,
      nonce,
      checksum,
      expiresAt,
    });

    await this.repository.createAuditLog({
      qrCodeId: qr.id,
      action: 'GENERATED',
      performedBy: userId,
      details: `Generated ${dto.entityType} QR token for entity ${dto.entityId}`,
    });

    this.logger.log({ msg: 'QR Token generated successfully', qrId: qr.id, entityType: dto.entityType });
    return this.mapQr(qr);
  }

  // ─── Verification Scan Engine ─────────────────────────────────────────────

  async verifyQrPayload(dto: VerifyQrPayloadDto, verifierUserId?: string): Promise<QrVerificationResultDto> {
    const scannedAt = new Date().toISOString();
    const qr = await this.repository.findQrByToken(dto.token);

    if (!qr) {
      await this.repository.createScanLog({
        entityId: 'UNKNOWN',
        entityType: 'CUSTOM',
        verifierUserId,
        validationResult: 'INVALID',
        failureReason: 'QR Token not found in repository',
        deviceInfo: dto.deviceInfo,
        location: dto.location,
      });
      return {
        isValid: false,
        status: 'INVALID',
        entityType: 'UNKNOWN',
        entityId: 'UNKNOWN',
        ownerId: 'UNKNOWN',
        failureReason: 'Invalid or non-existing QR token',
        scannedAt,
      };
    }

    // Check status
    if (qr.status === 'REVOKED') {
      await this.repository.createScanLog({
        qrCodeId: qr.id,
        entityId: qr.entityId,
        entityType: qr.entityType,
        verifierUserId,
        validationResult: 'REVOKED',
        failureReason: `QR token revoked: ${qr.revocationReason || 'No reason provided'}`,
        deviceInfo: dto.deviceInfo,
        location: dto.location,
      });
      return {
        isValid: false,
        status: 'REVOKED',
        entityType: qr.entityType,
        entityId: qr.entityId,
        ownerId: qr.ownerId,
        failureReason: 'QR Token has been revoked',
        scannedAt,
      };
    }

    if (qr.status === 'ROTATED') {
      await this.repository.createScanLog({
        qrCodeId: qr.id,
        entityId: qr.entityId,
        entityType: qr.entityType,
        verifierUserId,
        validationResult: 'INVALID',
        failureReason: 'QR token has been rotated out of service',
        deviceInfo: dto.deviceInfo,
        location: dto.location,
      });
      return {
        isValid: false,
        status: 'ROTATED',
        entityType: qr.entityType,
        entityId: qr.entityId,
        ownerId: qr.ownerId,
        failureReason: 'QR Token has been rotated out',
        scannedAt,
      };
    }

    // Check Expiry
    if (new Date() > qr.expiresAt) {
      await this.repository.createScanLog({
        qrCodeId: qr.id,
        entityId: qr.entityId,
        entityType: qr.entityType,
        verifierUserId,
        validationResult: 'EXPIRED',
        failureReason: 'QR token validity period has expired',
        deviceInfo: dto.deviceInfo,
        location: dto.location,
      });
      return {
        isValid: false,
        status: 'EXPIRED',
        entityType: qr.entityType,
        entityId: qr.entityId,
        ownerId: qr.ownerId,
        failureReason: 'QR Token has expired',
        scannedAt,
      };
    }

    // Valid Scan
    await this.repository.createScanLog({
      qrCodeId: qr.id,
      entityId: qr.entityId,
      entityType: qr.entityType,
      verifierUserId,
      validationResult: 'VALID',
      deviceInfo: dto.deviceInfo,
      location: dto.location,
    });

    return {
      isValid: true,
      status: 'VALID',
      entityType: qr.entityType,
      entityId: qr.entityId,
      ownerId: qr.ownerId,
      scannedAt,
    };
  }

  // ─── Lifecycle Operations ──────────────────────────────────────────────────

  async rotateQr(userId: string, id: string, dto: RotateQrDto): Promise<QrResponseDto> {
    const profileId = await this.resolveProfile(userId);
    const qr = await this.repository.findQrById(id);

    if (!qr) throw new NotFoundException('QR Code not found');
    if (qr.ownerId !== profileId) throw new ForbiddenException('Access denied');
    if (qr.status === 'REVOKED') throw new BadRequestException('Cannot rotate a revoked QR code');

    const prevToken = qr.token;
    const prevStatus = qr.status;
    const newNonce = crypto.randomBytes(16).toString('hex');
    const { token: newToken, signature: newSignature, checksum: newChecksum } = this.generateTokenAndSignature(qr.entityId, qr.entityType, newNonce);

    const updated = await this.repository.updateQr(id, {
      token: newToken,
      signature: newSignature,
      nonce: newNonce,
      checksum: newChecksum,
      status: 'ACTIVE',
      version: qr.version + 1,
      rotatedAt: new Date(),
    });

    await this.repository.createHistory({
      qrCodeId: id,
      action: 'ROTATED',
      previousToken: prevToken,
      newToken,
      previousStatus: prevStatus,
      newStatus: 'ACTIVE',
      reason: dto.reason || 'Security token rotation',
      performedBy: userId,
    });

    await this.repository.createAuditLog({
      qrCodeId: id,
      action: 'ROTATED',
      performedBy: userId,
      details: `Rotated QR token to version ${qr.version + 1}`,
    });

    return this.mapQr(updated);
  }

  async revokeQr(userId: string, id: string, dto: RevokeQrDto): Promise<QrResponseDto> {
    const profileId = await this.resolveProfile(userId);
    const qr = await this.repository.findQrById(id);

    if (!qr) throw new NotFoundException('QR Code not found');
    if (qr.ownerId !== profileId) throw new ForbiddenException('Access denied');
    if (qr.status === 'REVOKED') throw new BadRequestException('QR code is already revoked');

    const prevStatus = qr.status;
    const updated = await this.repository.updateQr(id, {
      status: 'REVOKED',
      revokedAt: new Date(),
      revocationReason: dto.reason || 'Revoked by owner/admin',
    });

    await this.repository.createHistory({
      qrCodeId: id,
      action: 'REVOKED',
      previousStatus: prevStatus,
      newStatus: 'REVOKED',
      reason: dto.reason || 'Revoked',
      performedBy: userId,
    });

    await this.repository.createAuditLog({
      qrCodeId: id,
      action: 'REVOKED',
      performedBy: userId,
      details: dto.reason || 'Revoked QR code',
    });

    return this.mapQr(updated);
  }

  async restoreQr(userId: string, id: string): Promise<QrResponseDto> {
    const profileId = await this.resolveProfile(userId);
    const qr = await this.repository.findQrById(id, true);

    if (!qr) throw new NotFoundException('QR Code not found');
    if (qr.ownerId !== profileId) throw new ForbiddenException('Access denied');

    const prevStatus = qr.status;
    const updated = await this.repository.updateQr(id, {
      status: 'ACTIVE',
      revokedAt: null,
      revocationReason: null,
      isDeleted: false,
      deletedAt: null,
    });

    await this.repository.createHistory({
      qrCodeId: id,
      action: 'RESTORED',
      previousStatus: prevStatus,
      newStatus: 'ACTIVE',
      performedBy: userId,
    });

    return this.mapQr(updated);
  }

  async archiveQr(userId: string, id: string): Promise<QrResponseDto> {
    const profileId = await this.resolveProfile(userId);
    const qr = await this.repository.findQrById(id);

    if (!qr) throw new NotFoundException('QR Code not found');
    if (qr.ownerId !== profileId) throw new ForbiddenException('Access denied');

    const prevStatus = qr.status;
    const updated = await this.repository.updateQr(id, { status: 'ARCHIVED' });

    await this.repository.createHistory({
      qrCodeId: id,
      action: 'ARCHIVED',
      previousStatus: prevStatus,
      newStatus: 'ARCHIVED',
      performedBy: userId,
    });

    return this.mapQr(updated);
  }

  // ─── Query Operations ─────────────────────────────────────────────────────

  async getUserQrs(userId: string, entityType?: string): Promise<QrResponseDto[]> {
    const profileId = await this.resolveProfile(userId);
    const qrs = await this.repository.findQrsByOwner(profileId, entityType);
    return qrs.map((q) => this.mapQr(q));
  }

  async getQrById(userId: string, id: string): Promise<QrResponseDto> {
    const profileId = await this.resolveProfile(userId);
    const qr = await this.repository.findQrById(id);

    if (!qr) throw new NotFoundException('QR Code not found');
    if (qr.ownerId !== profileId) throw new ForbiddenException('Access denied');

    return this.mapQr(qr);
  }

  async updateQr(userId: string, id: string, dto: UpdateQrDto): Promise<QrResponseDto> {
    const profileId = await this.resolveProfile(userId);
    const qr = await this.repository.findQrById(id);

    if (!qr) throw new NotFoundException('QR Code not found');
    if (qr.ownerId !== profileId) throw new ForbiddenException('Access denied');

    const newExpiry = dto.validityDays
      ? new Date(Date.now() + dto.validityDays * 24 * 60 * 60 * 1000)
      : undefined;

    const updated = await this.repository.updateQr(id, { expiresAt: newExpiry });
    return this.mapQr(updated);
  }

  async softDeleteQr(userId: string, id: string): Promise<{ message: string }> {
    const profileId = await this.resolveProfile(userId);
    const qr = await this.repository.findQrById(id);

    if (!qr) throw new NotFoundException('QR Code not found');
    if (qr.ownerId !== profileId) throw new ForbiddenException('Access denied');

    await this.repository.softDeleteQr(id);
    return { message: 'QR Code soft-deleted successfully' };
  }

  async getQrHistory(userId: string, id: string): Promise<QrHistoryItemDto[]> {
    const profileId = await this.resolveProfile(userId);
    const qr = await this.repository.findQrById(id, true);

    if (!qr) throw new NotFoundException('QR Code not found');
    if (qr.ownerId !== profileId) throw new ForbiddenException('Access denied');

    const history = await this.repository.findHistoryByQrId(id);
    return history.map((h) => ({
      id: h.id,
      qrCodeId: h.qrCodeId,
      action: h.action,
      previousToken: h.previousToken || undefined,
      newToken: h.newToken || undefined,
      previousStatus: h.previousStatus || undefined,
      newStatus: h.newStatus,
      reason: h.reason || undefined,
      performedBy: h.performedBy || undefined,
      createdAt: h.createdAt.toISOString(),
    }));
  }

  async getQrScanLogs(userId: string, id: string): Promise<QrScanLogItemDto[]> {
    const profileId = await this.resolveProfile(userId);
    const qr = await this.repository.findQrById(id, true);

    if (!qr) throw new NotFoundException('QR Code not found');
    if (qr.ownerId !== profileId) throw new ForbiddenException('Access denied');

    const logs = await this.repository.findScanLogsByQrId(id);
    return logs.map((l) => ({
      id: l.id,
      qrCodeId: l.qrCodeId || undefined,
      entityId: l.entityId,
      entityType: l.entityType,
      verifierUserId: l.verifierUserId || undefined,
      validationResult: l.validationResult,
      failureReason: l.failureReason || undefined,
      deviceInfo: l.deviceInfo || undefined,
      ipAddress: l.ipAddress || undefined,
      location: l.location || undefined,
      platform: l.platform || undefined,
      scannedAt: l.scannedAt.toISOString(),
    }));
  }

  async searchQrs(query: string): Promise<QrResponseDto[]> {
    if (!query || query.trim().length === 0) return [];
    const qrs = await this.repository.searchQrs(query.trim());
    return qrs.map((q) => this.mapQr(q));
  }

  async getAnalytics(): Promise<QrAnalyticsResponseDto> {
    return this.repository.getAnalytics();
  }

  // ─── Bulk Operations ───────────────────────────────────────────────────────

  async bulkGenerate(userId: string, dto: BulkGenerateQrDto): Promise<QrResponseDto[]> {
    const results: QrResponseDto[] = [];
    for (const item of dto.items) {
      const generated = await this.generateQr(userId, item);
      results.push(generated);
    }
    return results;
  }

  async bulkRotate(userId: string, dto: BulkQrActionDto): Promise<{ processed: number; message: string }> {
    let count = 0;
    for (const id of dto.qrIds) {
      try {
        await this.rotateQr(userId, id, { reason: dto.reason });
        count++;
      } catch (err) {
        // Continue processing batch
      }
    }
    return { processed: count, message: `Successfully rotated ${count} QR codes` };
  }

  async bulkRevoke(userId: string, dto: BulkQrActionDto): Promise<{ processed: number; message: string }> {
    let count = 0;
    for (const id of dto.qrIds) {
      try {
        await this.revokeQr(userId, id, { reason: dto.reason });
        count++;
      } catch (err) {
        // Continue processing batch
      }
    }
    return { processed: count, message: `Successfully revoked ${count} QR codes` };
  }
}

import { Injectable } from '@nestjs/common';
import { DatabaseService } from '@database/database.service';
import { IFamilyRepository } from '../../domain/repositories/family.repository.interface';
import { FamilyMemberEntity, FamilyConsentEntity, ConsentRecordEntity, ConsentHistoryEntity } from '../../domain/entities/family.entity';

@Injectable()
export class FamilyRepository implements IFamilyRepository {
  constructor(private readonly db: DatabaseService) {}

  // ─── Profile Lookup ───────────────────────────────────────────────────────
  async findProfileByUserId(userId: string): Promise<{ id: string } | null> {
    return this.db.patientProfile.findUnique({ where: { userId }, select: { id: true } });
  }

  // ─── Invitations ──────────────────────────────────────────────────────────
  async createInvitation(patientProfileId: string, data: Partial<FamilyConsentEntity>): Promise<FamilyConsentEntity> {
    return (await this.db.familyConsent.create({
      data: {
        patientProfileId,
        inviteePhone: data.inviteePhone!,
        inviteeName: data.inviteeName || null,
        relationship: data.relationship!,
        relationshipType: data.relationshipType as any || 'OTHER',
        invitationToken: data.invitationToken!,
        expiresAt: data.expiresAt || null,
        status: 'PENDING',
        resendCount: 0,
      },
    })) as FamilyConsentEntity;
  }

  async findInvitationById(id: string): Promise<FamilyConsentEntity | null> {
    return (await this.db.familyConsent.findUnique({ where: { id } })) as FamilyConsentEntity | null;
  }

  async findInvitationByToken(token: string): Promise<FamilyConsentEntity | null> {
    return (await this.db.familyConsent.findUnique({ where: { invitationToken: token } })) as FamilyConsentEntity | null;
  }

  async findInvitationsByProfile(patientProfileId: string): Promise<FamilyConsentEntity[]> {
    return (await this.db.familyConsent.findMany({
      where: { patientProfileId },
      orderBy: { createdAt: 'desc' },
    })) as FamilyConsentEntity[];
  }

  async updateInvitation(id: string, data: Partial<FamilyConsentEntity>): Promise<FamilyConsentEntity> {
    return (await this.db.familyConsent.update({
      where: { id },
      data: {
        status: data.status as any,
        resendCount: data.resendCount,
        acceptedAt: data.acceptedAt || undefined,
        rejectedAt: data.rejectedAt || undefined,
        cancelledAt: data.cancelledAt || undefined,
        inviteeName: data.inviteeName || undefined,
      },
    })) as FamilyConsentEntity;
  }

  async deleteInvitation(id: string): Promise<void> {
    await this.db.familyConsent.delete({ where: { id } });
  }

  // ─── Family Members ───────────────────────────────────────────────────────
  async createFamilyMember(patientProfileId: string, data: Partial<FamilyMemberEntity>): Promise<FamilyMemberEntity> {
    return (await this.db.familyMember.create({
      data: {
        patientProfileId,
        fullName: data.fullName!,
        relationship: data.relationship!,
        relationshipType: data.relationshipType as any || 'OTHER',
        phone: data.phone!,
        isPrimary: data.isPrimary ?? false,
        isGuardian: data.isGuardian ?? false,
        isDependent: data.isDependent ?? false,
        isCaregiver: data.isCaregiver ?? false,
        notes: data.notes || null,
      },
    })) as FamilyMemberEntity;
  }

  async findFamilyMemberById(id: string): Promise<FamilyMemberEntity | null> {
    return (await this.db.familyMember.findUnique({ where: { id } })) as FamilyMemberEntity | null;
  }

  async findFamilyMembersByProfile(patientProfileId: string): Promise<FamilyMemberEntity[]> {
    return (await this.db.familyMember.findMany({
      where: { patientProfileId, status: { not: 'ARCHIVED' } },
      orderBy: { createdAt: 'asc' },
    })) as FamilyMemberEntity[];
  }

  async findGuardiansByProfile(patientProfileId: string): Promise<FamilyMemberEntity[]> {
    return (await this.db.familyMember.findMany({
      where: { patientProfileId, isGuardian: true, status: 'ACTIVE' },
    })) as FamilyMemberEntity[];
  }

  async findDependentsByProfile(patientProfileId: string): Promise<FamilyMemberEntity[]> {
    return (await this.db.familyMember.findMany({
      where: { patientProfileId, isDependent: true, status: 'ACTIVE' },
    })) as FamilyMemberEntity[];
  }

  async updateFamilyMember(id: string, data: Partial<FamilyMemberEntity>): Promise<FamilyMemberEntity> {
    return (await this.db.familyMember.update({
      where: { id },
      data: {
        fullName: data.fullName || undefined,
        relationship: data.relationship || undefined,
        relationshipType: data.relationshipType as any || undefined,
        phone: data.phone || undefined,
        status: data.status as any || undefined,
        isPrimary: data.isPrimary ?? undefined,
        isGuardian: data.isGuardian ?? undefined,
        isDependent: data.isDependent ?? undefined,
        isCaregiver: data.isCaregiver ?? undefined,
        verificationStatus: data.verificationStatus || undefined,
        notes: data.notes || undefined,
        archivedAt: data.archivedAt || undefined,
      },
    })) as FamilyMemberEntity;
  }

  async deleteFamilyMember(id: string): Promise<void> {
    await this.db.familyMember.update({ where: { id }, data: { status: 'ARCHIVED', archivedAt: new Date() } });
  }

  // ─── Consent Records ─────────────────────────────────────────────────────
  async createConsentRecord(patientProfileId: string, familyMemberId: string, data: Partial<ConsentRecordEntity>): Promise<ConsentRecordEntity> {
    return (await this.db.consentRecord.create({
      data: {
        patientProfileId,
        familyMemberId,
        category: data.category as any,
        expiresAt: data.expiresAt || null,
        notes: data.notes || null,
      },
    })) as ConsentRecordEntity;
  }

  async findConsentRecordById(id: string): Promise<ConsentRecordEntity | null> {
    return (await this.db.consentRecord.findUnique({ where: { id } })) as ConsentRecordEntity | null;
  }

  async findConsentsByProfile(patientProfileId: string, activeOnly = false): Promise<ConsentRecordEntity[]> {
    return (await this.db.consentRecord.findMany({
      where: { patientProfileId, ...(activeOnly ? { isActive: true } : {}) },
      orderBy: { createdAt: 'desc' },
    })) as ConsentRecordEntity[];
  }

  async findConsentsByMember(familyMemberId: string, activeOnly = false): Promise<ConsentRecordEntity[]> {
    return (await this.db.consentRecord.findMany({
      where: { familyMemberId, ...(activeOnly ? { isActive: true } : {}) },
      orderBy: { createdAt: 'desc' },
    })) as ConsentRecordEntity[];
  }

  async updateConsentRecord(id: string, data: Partial<ConsentRecordEntity>): Promise<ConsentRecordEntity> {
    return (await this.db.consentRecord.update({
      where: { id },
      data: {
        isActive: data.isActive ?? undefined,
        revokedAt: data.revokedAt || undefined,
        expiresAt: data.expiresAt || undefined,
        notes: data.notes || undefined,
      },
    })) as ConsentRecordEntity;
  }

  // ─── Consent History ──────────────────────────────────────────────────────
  async createConsentHistory(consentRecordId: string, action: string, performedBy?: string, reason?: string): Promise<ConsentHistoryEntity> {
    return (await this.db.consentHistory.create({
      data: { consentRecordId, action, performedBy: performedBy || null, reason: reason || null },
    })) as ConsentHistoryEntity;
  }

  async findConsentHistory(consentRecordId: string): Promise<ConsentHistoryEntity[]> {
    return (await this.db.consentHistory.findMany({
      where: { consentRecordId },
      orderBy: { createdAt: 'desc' },
    })) as ConsentHistoryEntity[];
  }

  async findAllConsentHistoryByProfile(patientProfileId: string): Promise<ConsentHistoryEntity[]> {
    return (await this.db.consentHistory.findMany({
      where: { consentRecord: { patientProfileId } },
      orderBy: { createdAt: 'desc' },
      take: 100,
    })) as ConsentHistoryEntity[];
  }
}

import { Injectable, NotFoundException, BadRequestException, ForbiddenException, Inject } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { IFamilyRepository } from '../../domain/repositories/family.repository.interface';
import { CreateInvitationDto, InvitationResponseDto } from '../../presentation/dto/invitation.dto';
import { UpdateFamilyMemberDto, FamilyMemberResponseDto } from '../../presentation/dto/family-member.dto';
import { CreateGuardianDto, UpdateGuardianDto } from '../../presentation/dto/guardian.dto';
import { CreateDependentDto, UpdateDependentDto } from '../../presentation/dto/dependent.dto';
import { CreateConsentDto, UpdateConsentDto, ConsentRecordResponseDto, ConsentHistoryResponseDto } from '../../presentation/dto/consent.dto';

@Injectable()
export class FamilyService {
  constructor(
    @Inject('IFamilyRepository')
    private readonly familyRepository: IFamilyRepository,
  ) {}

  // ─── Helpers ─────────────────────────────────────────────────────────────

  private async resolveProfile(userId: string): Promise<string> {
    const profile = await this.familyRepository.findProfileByUserId(userId);
    if (!profile) {
      throw new NotFoundException('Patient profile not found. Please complete registration first.');
    }
    return profile.id;
  }

  private mapInvitation(inv: any): InvitationResponseDto {
    return {
      id: inv.id,
      inviteePhone: inv.inviteePhone,
      inviteeName: inv.inviteeName || undefined,
      relationship: inv.relationship,
      relationshipType: inv.relationshipType,
      status: inv.status,
      invitationToken: inv.invitationToken,
      resendCount: inv.resendCount,
      expiresAt: inv.expiresAt?.toISOString() || undefined,
      acceptedAt: inv.acceptedAt?.toISOString() || undefined,
      rejectedAt: inv.rejectedAt?.toISOString() || undefined,
      cancelledAt: inv.cancelledAt?.toISOString() || undefined,
      createdAt: inv.createdAt.toISOString(),
    };
  }

  private mapMember(m: any): FamilyMemberResponseDto {
    return {
      id: m.id,
      fullName: m.fullName,
      relationship: m.relationship,
      relationshipType: m.relationshipType,
      phone: m.phone,
      status: m.status,
      isPrimary: m.isPrimary,
      isGuardian: m.isGuardian,
      isDependent: m.isDependent,
      isCaregiver: m.isCaregiver,
      verificationStatus: m.verificationStatus,
      notes: m.notes || undefined,
      createdAt: m.createdAt.toISOString(),
      updatedAt: m.updatedAt.toISOString(),
    };
  }

  private mapConsent(c: any): ConsentRecordResponseDto {
    return {
      id: c.id,
      patientProfileId: c.patientProfileId,
      familyMemberId: c.familyMemberId,
      category: c.category,
      isActive: c.isActive,
      grantedAt: c.grantedAt.toISOString(),
      revokedAt: c.revokedAt?.toISOString() || undefined,
      expiresAt: c.expiresAt?.toISOString() || undefined,
      notes: c.notes || undefined,
      createdAt: c.createdAt.toISOString(),
    };
  }

  private mapHistory(h: any): ConsentHistoryResponseDto {
    return {
      id: h.id,
      consentRecordId: h.consentRecordId,
      action: h.action,
      performedBy: h.performedBy || undefined,
      reason: h.reason || undefined,
      createdAt: h.createdAt.toISOString(),
    };
  }

  // ─── Invitations ──────────────────────────────────────────────────────────

  async createInvitation(userId: string, dto: CreateInvitationDto): Promise<InvitationResponseDto> {
    const profileId = await this.resolveProfile(userId);

    // Check for duplicate active invitation to same phone
    const existing = await this.familyRepository.findInvitationsByProfile(profileId);
    const duplicate = existing.find(
      (inv) => inv.inviteePhone === dto.inviteePhone && (inv.status === 'PENDING'),
    );
    if (duplicate) {
      throw new BadRequestException('A pending invitation already exists for this phone number. Cancel or resend it.');
    }

    const invitationToken = randomUUID();
    const expiresAt = dto.expiresAt ? new Date(dto.expiresAt) : new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days default

    const invitation = await this.familyRepository.createInvitation(profileId, {
      inviteePhone: dto.inviteePhone,
      inviteeName: dto.inviteeName,
      relationship: dto.relationship,
      relationshipType: dto.relationshipType || 'OTHER',
      invitationToken,
      expiresAt,
    });

    return this.mapInvitation(invitation);
  }

  async resendInvitation(userId: string, invitationId: string): Promise<InvitationResponseDto> {
    const profileId = await this.resolveProfile(userId);
    const invitation = await this.familyRepository.findInvitationById(invitationId);

    if (!invitation) throw new NotFoundException('Invitation not found');
    if (invitation.patientProfileId !== profileId) throw new ForbiddenException('Access denied');
    if (invitation.status !== 'PENDING') {
      throw new BadRequestException(`Cannot resend invitation with status: ${invitation.status}`);
    }
    if (invitation.resendCount >= 5) {
      throw new BadRequestException('Maximum resend limit (5) reached for this invitation');
    }

    const updated = await this.familyRepository.updateInvitation(invitationId, {
      resendCount: invitation.resendCount + 1,
    });
    return this.mapInvitation(updated);
  }

  async acceptInvitation(userId: string, invitationId: string): Promise<{ message: string; memberId?: string }> {
    const profileId = await this.resolveProfile(userId);
    const invitation = await this.familyRepository.findInvitationById(invitationId);

    if (!invitation) throw new NotFoundException('Invitation not found');
    if (invitation.patientProfileId !== profileId) throw new ForbiddenException('Access denied');
    if (invitation.status !== 'PENDING') {
      throw new BadRequestException(`Invitation is already ${invitation.status}`);
    }
    if (invitation.expiresAt && new Date() > invitation.expiresAt) {
      await this.familyRepository.updateInvitation(invitationId, { status: 'EXPIRED' as any });
      throw new BadRequestException('Invitation has expired');
    }

    await this.familyRepository.updateInvitation(invitationId, {
      status: 'ACCEPTED' as any,
      acceptedAt: new Date(),
    });

    // Auto-create family member from accepted invitation
    const member = await this.familyRepository.createFamilyMember(profileId, {
      fullName: invitation.inviteeName || 'Family Member',
      relationship: invitation.relationship,
      relationshipType: invitation.relationshipType,
      phone: invitation.inviteePhone,
      isGuardian: invitation.relationshipType === 'GUARDIAN' || invitation.relationshipType === 'PARENT',
      isDependent: invitation.relationshipType === 'DEPENDENT' || invitation.relationshipType === 'CHILD',
      isCaregiver: invitation.relationshipType === 'CAREGIVER',
    });

    return { message: 'Invitation accepted and family member added', memberId: member.id };
  }

  async rejectInvitation(userId: string, invitationId: string): Promise<{ message: string }> {
    const profileId = await this.resolveProfile(userId);
    const invitation = await this.familyRepository.findInvitationById(invitationId);

    if (!invitation) throw new NotFoundException('Invitation not found');
    if (invitation.patientProfileId !== profileId) throw new ForbiddenException('Access denied');
    if (invitation.status !== 'PENDING') {
      throw new BadRequestException(`Invitation is already ${invitation.status}`);
    }

    await this.familyRepository.updateInvitation(invitationId, {
      status: 'REJECTED' as any,
      rejectedAt: new Date(),
    });
    return { message: 'Invitation rejected' };
  }

  async cancelInvitation(userId: string, invitationId: string): Promise<{ message: string }> {
    const profileId = await this.resolveProfile(userId);
    const invitation = await this.familyRepository.findInvitationById(invitationId);

    if (!invitation) throw new NotFoundException('Invitation not found');
    if (invitation.patientProfileId !== profileId) throw new ForbiddenException('Access denied');
    if (!['PENDING'].includes(invitation.status)) {
      throw new BadRequestException('Only pending invitations can be cancelled');
    }

    await this.familyRepository.updateInvitation(invitationId, {
      status: 'CANCELLED' as any,
      cancelledAt: new Date(),
    });
    return { message: 'Invitation cancelled' };
  }

  async getInvitations(userId: string): Promise<InvitationResponseDto[]> {
    const profileId = await this.resolveProfile(userId);
    const invitations = await this.familyRepository.findInvitationsByProfile(profileId);
    return invitations.map((inv) => this.mapInvitation(inv));
  }

  // ─── Family Members ───────────────────────────────────────────────────────

  async getFamilyMembers(userId: string): Promise<FamilyMemberResponseDto[]> {
    const profileId = await this.resolveProfile(userId);
    const members = await this.familyRepository.findFamilyMembersByProfile(profileId);
    return members.map((m) => this.mapMember(m));
  }

  async getFamilyMemberById(userId: string, memberId: string): Promise<FamilyMemberResponseDto> {
    const profileId = await this.resolveProfile(userId);
    const member = await this.familyRepository.findFamilyMemberById(memberId);

    if (!member) throw new NotFoundException('Family member not found');
    if (member.patientProfileId !== profileId) throw new ForbiddenException('Access denied');

    return this.mapMember(member);
  }

  async updateFamilyMember(userId: string, memberId: string, dto: UpdateFamilyMemberDto): Promise<FamilyMemberResponseDto> {
    const profileId = await this.resolveProfile(userId);
    const member = await this.familyRepository.findFamilyMemberById(memberId);

    if (!member) throw new NotFoundException('Family member not found');
    if (member.patientProfileId !== profileId) throw new ForbiddenException('Access denied');

    const updated = await this.familyRepository.updateFamilyMember(memberId, {
      fullName: dto.fullName,
      relationship: dto.relationship,
      relationshipType: dto.relationshipType,
      phone: dto.phone,
      status: dto.status,
      isPrimary: dto.isPrimary,
      notes: dto.notes,
    });
    return this.mapMember(updated);
  }

  async removeFamilyMember(userId: string, memberId: string): Promise<{ message: string }> {
    const profileId = await this.resolveProfile(userId);
    const member = await this.familyRepository.findFamilyMemberById(memberId);

    if (!member) throw new NotFoundException('Family member not found');
    if (member.patientProfileId !== profileId) throw new ForbiddenException('Access denied');

    await this.familyRepository.deleteFamilyMember(memberId);
    return { message: 'Family member removed (archived)' };
  }

  // ─── Guardians ────────────────────────────────────────────────────────────

  async getGuardians(userId: string): Promise<FamilyMemberResponseDto[]> {
    const profileId = await this.resolveProfile(userId);
    const guardians = await this.familyRepository.findGuardiansByProfile(profileId);
    return guardians.map((g) => this.mapMember(g));
  }

  async createGuardian(userId: string, dto: CreateGuardianDto): Promise<FamilyMemberResponseDto> {
    const profileId = await this.resolveProfile(userId);

    const member = await this.familyRepository.createFamilyMember(profileId, {
      fullName: dto.fullName,
      relationship: dto.relationship,
      relationshipType: dto.relationshipType,
      phone: dto.phone,
      isGuardian: true,
      isPrimary: dto.isPrimary ?? false,
      notes: dto.notes,
    });
    return this.mapMember(member);
  }

  async updateGuardian(userId: string, memberId: string, dto: UpdateGuardianDto): Promise<FamilyMemberResponseDto> {
    const profileId = await this.resolveProfile(userId);
    const member = await this.familyRepository.findFamilyMemberById(memberId);

    if (!member) throw new NotFoundException('Guardian not found');
    if (member.patientProfileId !== profileId) throw new ForbiddenException('Access denied');
    if (!member.isGuardian) throw new BadRequestException('This family member is not a guardian');

    const updated = await this.familyRepository.updateFamilyMember(memberId, {
      verificationStatus: dto.verificationStatus,
      isPrimary: dto.isPrimary,
      notes: dto.notes,
    });
    return this.mapMember(updated);
  }

  // ─── Dependents ───────────────────────────────────────────────────────────

  async getDependents(userId: string): Promise<FamilyMemberResponseDto[]> {
    const profileId = await this.resolveProfile(userId);
    const dependents = await this.familyRepository.findDependentsByProfile(profileId);
    return dependents.map((d) => this.mapMember(d));
  }

  async createDependent(userId: string, dto: CreateDependentDto): Promise<FamilyMemberResponseDto> {
    const profileId = await this.resolveProfile(userId);

    const member = await this.familyRepository.createFamilyMember(profileId, {
      fullName: dto.fullName,
      relationship: dto.relationship,
      relationshipType: dto.relationshipType,
      phone: dto.phone,
      isDependent: true,
      isCaregiver: dto.isCaregiver ?? false,
      notes: dto.notes,
    });
    return this.mapMember(member);
  }

  async updateDependent(userId: string, memberId: string, dto: UpdateDependentDto): Promise<FamilyMemberResponseDto> {
    const profileId = await this.resolveProfile(userId);
    const member = await this.familyRepository.findFamilyMemberById(memberId);

    if (!member) throw new NotFoundException('Dependent not found');
    if (member.patientProfileId !== profileId) throw new ForbiddenException('Access denied');
    if (!member.isDependent) throw new BadRequestException('This family member is not a dependent');

    const updated = await this.familyRepository.updateFamilyMember(memberId, {
      fullName: dto.fullName,
      phone: dto.phone,
      notes: dto.notes,
    });
    return this.mapMember(updated);
  }

  async removeDependent(userId: string, memberId: string): Promise<{ message: string }> {
    const profileId = await this.resolveProfile(userId);
    const member = await this.familyRepository.findFamilyMemberById(memberId);

    if (!member) throw new NotFoundException('Dependent not found');
    if (member.patientProfileId !== profileId) throw new ForbiddenException('Access denied');
    if (!member.isDependent) throw new BadRequestException('This family member is not a dependent');

    await this.familyRepository.deleteFamilyMember(memberId);
    return { message: 'Dependent removed' };
  }

  // ─── Consents ─────────────────────────────────────────────────────────────

  async grantConsent(userId: string, dto: CreateConsentDto): Promise<ConsentRecordResponseDto> {
    const profileId = await this.resolveProfile(userId);

    // Verify the family member belongs to this patient
    const member = await this.familyRepository.findFamilyMemberById(dto.familyMemberId);
    if (!member) throw new NotFoundException('Family member not found');
    if (member.patientProfileId !== profileId) throw new ForbiddenException('Access denied');

    // Check for duplicate active consent in same category for same member
    const existingConsents = await this.familyRepository.findConsentsByMember(dto.familyMemberId, true);
    const duplicate = existingConsents.find((c) => c.category === dto.category && c.isActive);
    if (duplicate) {
      throw new BadRequestException(`Active consent for category ${dto.category} already exists for this member`);
    }

    const record = await this.familyRepository.createConsentRecord(profileId, dto.familyMemberId, {
      category: dto.category,
      expiresAt: dto.expiresAt ? new Date(dto.expiresAt) : undefined,
      notes: dto.notes,
    });

    await this.familyRepository.createConsentHistory(record.id, 'GRANTED', userId);
    return this.mapConsent(record);
  }

  async updateConsent(userId: string, consentId: string, dto: UpdateConsentDto): Promise<ConsentRecordResponseDto> {
    const profileId = await this.resolveProfile(userId);
    const record = await this.familyRepository.findConsentRecordById(consentId);

    if (!record) throw new NotFoundException('Consent record not found');
    if (record.patientProfileId !== profileId) throw new ForbiddenException('Access denied');
    if (!record.isActive) throw new BadRequestException('Cannot update a revoked consent');

    const updated = await this.familyRepository.updateConsentRecord(consentId, {
      expiresAt: dto.expiresAt ? new Date(dto.expiresAt) : undefined,
      notes: dto.notes,
    });

    await this.familyRepository.createConsentHistory(consentId, 'UPDATED', userId);
    return this.mapConsent(updated);
  }

  async revokeConsent(userId: string, consentId: string): Promise<{ message: string }> {
    const profileId = await this.resolveProfile(userId);
    const record = await this.familyRepository.findConsentRecordById(consentId);

    if (!record) throw new NotFoundException('Consent record not found');
    if (record.patientProfileId !== profileId) throw new ForbiddenException('Access denied');
    if (!record.isActive) throw new BadRequestException('Consent is already revoked');

    await this.familyRepository.updateConsentRecord(consentId, {
      isActive: false,
      revokedAt: new Date(),
    });

    await this.familyRepository.createConsentHistory(consentId, 'REVOKED', userId, 'Consent withdrawn by patient');
    return { message: 'Consent revoked successfully' };
  }

  async getConsents(userId: string): Promise<ConsentRecordResponseDto[]> {
    const profileId = await this.resolveProfile(userId);
    const consents = await this.familyRepository.findConsentsByProfile(profileId, true);
    return consents.map((c) => this.mapConsent(c));
  }

  async getConsentHistory(userId: string): Promise<ConsentHistoryResponseDto[]> {
    const profileId = await this.resolveProfile(userId);
    const history = await this.familyRepository.findAllConsentHistoryByProfile(profileId);
    return history.map((h) => this.mapHistory(h));
  }
}

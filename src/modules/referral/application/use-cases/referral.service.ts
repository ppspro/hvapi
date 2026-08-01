import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { IReferralRepository } from '../../domain/repositories/referral.repository.interface';
import {
  ReferralResponseDto, ReferralNoteResponseDto, ReferralAttachmentResponseDto,
  ReferralStatusHistoryResponseDto, ReferralDashboardStatsResponseDto,
} from '../../presentation/dto/referral-response.dto';
import {
  CreateReferralDto, TriageReferralDto, UpdateReferralStatusDto, AddReferralNoteDto, AddReferralAttachmentDto,
} from '../../presentation/dto/referral-enterprise.dto';
import { Logger } from 'nestjs-pino';

@Injectable()
export class ReferralService {
  constructor(
    @Inject('IReferralRepository')
    private readonly referralRepository: IReferralRepository,
    private readonly logger: Logger,
  ) {}

  async createReferral(userId: string, dto: CreateReferralDto): Promise<ReferralResponseDto> {
    const referral = await this.referralRepository.createReferral({
      ...dto,
      referringDoctorId: userId,
      referringFacilityId: 'facility-uuid-default', // Default or user primary facility
    });
    return this.mapReferral(referral);
  }

  async getReferrals(filters: {
    patientId?: string;
    referringDoctorId?: string;
    receivingDoctorId?: string;
    receivingFacilityId?: string;
    status?: string;
    priority?: string;
    page?: number;
    limit?: number;
  }): Promise<{ data: ReferralResponseDto[]; total: number }> {
    const res = await this.referralRepository.findReferrals(filters);
    return {
      data: res.data.map((r) => this.mapReferral(r)),
      total: res.total,
    };
  }

  async getReferralById(id: string): Promise<ReferralResponseDto> {
    const ref = await this.referralRepository.findReferralById(id);
    if (!ref) throw new NotFoundException('Referral not found');
    return this.mapReferral(ref);
  }

  async triageReferral(id: string, userId: string, dto: TriageReferralDto): Promise<ReferralResponseDto> {
    const ref = await this.referralRepository.triageReferral(id, dto.outcome, userId, dto.receivingDoctorId, dto.reason);
    return this.mapReferral(ref);
  }

  async updateStatus(id: string, userId: string, dto: UpdateReferralStatusDto): Promise<ReferralResponseDto> {
    const ref = await this.referralRepository.updateReferralStatus(id, dto.status, userId, dto.reason);
    return this.mapReferral(ref);
  }

  async addNote(id: string, userId: string, userRole: string, dto: AddReferralNoteDto): Promise<ReferralNoteResponseDto> {
    const ref = await this.referralRepository.findReferralById(id);
    if (!ref) throw new NotFoundException('Referral not found');

    const note = await this.referralRepository.addNote({
      referralId: id,
      authorId: userId,
      authorRole: userRole || 'DOCTOR',
      noteText: dto.noteText,
      isPrivate: dto.isPrivate,
    });

    return {
      id: note.id,
      referralId: note.referralId,
      authorId: note.authorId,
      authorRole: note.authorRole,
      noteText: note.noteText,
      isPrivate: note.isPrivate,
      createdAt: note.createdAt.toISOString(),
    };
  }

  async getNotes(id: string): Promise<ReferralNoteResponseDto[]> {
    const notes = await this.referralRepository.findNotes(id, true);
    return notes.map((n) => ({
      id: n.id,
      referralId: n.referralId,
      authorId: n.authorId,
      authorRole: n.authorRole,
      noteText: n.noteText,
      isPrivate: n.isPrivate,
      createdAt: n.createdAt.toISOString(),
    }));
  }

  async addAttachment(id: string, userId: string, dto: AddReferralAttachmentDto): Promise<ReferralAttachmentResponseDto> {
    const ref = await this.referralRepository.findReferralById(id);
    if (!ref) throw new NotFoundException('Referral not found');

    const att = await this.referralRepository.addAttachment({
      referralId: id,
      attachmentId: dto.attachmentId,
      attachedBy: userId,
    });

    return {
      id: att.id,
      referralId: att.referralId,
      attachmentId: att.attachmentId,
      attachedBy: att.attachedBy,
      createdAt: att.createdAt.toISOString(),
    };
  }

  async getAttachments(id: string): Promise<ReferralAttachmentResponseDto[]> {
    const atts = await this.referralRepository.findAttachments(id);
    return atts.map((a) => ({
      id: a.id,
      referralId: a.referralId,
      attachmentId: a.attachmentId,
      attachedBy: a.attachedBy,
      createdAt: a.createdAt.toISOString(),
    }));
  }

  async getHistory(id: string): Promise<ReferralStatusHistoryResponseDto[]> {
    const history = await this.referralRepository.findStatusHistory(id);
    return history.map((h) => ({
      id: h.id,
      referralId: h.referralId,
      fromStatus: h.fromStatus || undefined,
      toStatus: h.toStatus,
      changedBy: h.changedBy,
      reason: h.reason || undefined,
      createdAt: h.createdAt.toISOString(),
    }));
  }

  async getDashboardStats(facilityId?: string): Promise<ReferralDashboardStatsResponseDto> {
    return this.referralRepository.getDashboardStats(facilityId);
  }

  async softDeleteReferral(id: string): Promise<{ message: string }> {
    const ref = await this.referralRepository.findReferralById(id);
    if (!ref) throw new NotFoundException('Referral not found');
    await this.referralRepository.softDeleteReferral(id);
    return { message: 'Referral soft-deleted successfully' };
  }

  private mapReferral(r: any): ReferralResponseDto {
    return {
      id: r.id,
      referralNumber: r.referralNumber,
      patientId: r.patientId,
      referringDoctorId: r.referringDoctorId,
      referringFacilityId: r.referringFacilityId,
      receivingDoctorId: r.receivingDoctorId || undefined,
      receivingFacilityId: r.receivingFacilityId,
      medicalRecordId: r.medicalRecordId || undefined,
      referralType: r.referralType,
      priority: r.priority,
      status: r.status,
      reasonForReferral: r.reasonForReferral,
      clinicalSummary: r.clinicalSummary || undefined,
      specialtyRequired: r.specialtyRequired || undefined,
      expiresAt: r.expiresAt ? r.expiresAt.toISOString() : undefined,
      acceptedAt: r.acceptedAt ? r.acceptedAt.toISOString() : undefined,
      completedAt: r.completedAt ? r.completedAt.toISOString() : undefined,
      rejectedAt: r.rejectedAt ? r.rejectedAt.toISOString() : undefined,
      rejectionReason: r.rejectionReason || undefined,
      createdAt: r.createdAt.toISOString(),
      updatedAt: r.updatedAt.toISOString(),
      notes: r.notes ? r.notes.map((n: any) => ({
        id: n.id,
        referralId: n.referralId,
        authorId: n.authorId,
        authorRole: n.authorRole,
        noteText: n.noteText,
        isPrivate: n.isPrivate,
        createdAt: n.createdAt.toISOString(),
      })) : undefined,
      attachments: r.attachments ? r.attachments.map((a: any) => ({
        id: a.id,
        referralId: a.referralId,
        attachmentId: a.attachmentId,
        attachedBy: a.attachedBy,
        createdAt: a.createdAt.toISOString(),
      })) : undefined,
      statusHistory: r.statusHistory ? r.statusHistory.map((h: any) => ({
        id: h.id,
        referralId: h.referralId,
        fromStatus: h.fromStatus || undefined,
        toStatus: h.toStatus,
        changedBy: h.changedBy,
        reason: h.reason || undefined,
        createdAt: h.createdAt.toISOString(),
      })) : undefined,
    };
  }
}

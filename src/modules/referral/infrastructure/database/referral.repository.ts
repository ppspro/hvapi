import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from '@database/database.service';
import { IReferralRepository } from '../../domain/repositories/referral.repository.interface';
import {
  PatientReferralEntity, ReferralNoteEntity, ReferralAttachmentEntity, ReferralStatusHistoryEntity,
} from '../../domain/entities/referral.entity';

@Injectable()
export class PrismaReferralRepository implements IReferralRepository {
  constructor(private readonly db: DatabaseService) {}

  async createReferral(data: any): Promise<PatientReferralEntity> {
    const count = await this.db.patientReferral.count();
    const year = new Date().getFullYear();
    const referralNumber = `REF-${year}-${String(count + 1).padStart(5, '0')}`;

    return (await this.db.patientReferral.create({
      data: {
        referralNumber,
        patientId: data.patientId,
        referringDoctorId: data.referringDoctorId,
        referringFacilityId: data.referringFacilityId,
        receivingDoctorId: data.receivingDoctorId || null,
        receivingFacilityId: data.receivingFacilityId,
        medicalRecordId: data.medicalRecordId || null,
        referralType: data.referralType || 'SPECIALIST_CONSULTATION',
        priority: data.priority || 'ROUTINE',
        status: data.status || 'SUBMITTED',
        reasonForReferral: data.reasonForReferral,
        clinicalSummary: data.clinicalSummary || null,
        specialtyRequired: data.specialtyRequired || null,
        expiresAt: data.expiresAt ? new Date(data.expiresAt) : null,
        statusHistory: {
          create: {
            fromStatus: null,
            toStatus: data.status || 'SUBMITTED',
            changedBy: data.referringDoctorId,
            reason: 'Initial Referral Creation',
          },
        },
      },
      include: { notes: true, attachments: true, statusHistory: true },
    })) as unknown as PatientReferralEntity;
  }

  async findReferrals(filters: {
    patientId?: string;
    referringDoctorId?: string;
    receivingDoctorId?: string;
    receivingFacilityId?: string;
    status?: string;
    priority?: string;
    page?: number;
    limit?: number;
  }): Promise<{ data: PatientReferralEntity[]; total: number }> {
    const page = filters.page || 1;
    const limit = filters.limit || 20;
    const skip = (page - 1) * limit;

    const where = {
      isDeleted: false,
      ...(filters.patientId ? { patientId: filters.patientId } : {}),
      ...(filters.referringDoctorId ? { referringDoctorId: filters.referringDoctorId } : {}),
      ...(filters.receivingDoctorId ? { receivingDoctorId: filters.receivingDoctorId } : {}),
      ...(filters.receivingFacilityId ? { receivingFacilityId: filters.receivingFacilityId } : {}),
      ...(filters.status ? { status: filters.status as any } : {}),
      ...(filters.priority ? { priority: filters.priority as any } : {}),
    };

    const [data, total] = await Promise.all([
      this.db.patientReferral.findMany({
        where,
        include: { notes: true, attachments: true, statusHistory: true },
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
      this.db.patientReferral.count({ where }),
    ]);

    return { data: data as unknown as PatientReferralEntity[], total };
  }

  async findReferralById(id: string): Promise<PatientReferralEntity | null> {
    const ref = await this.db.patientReferral.findFirst({
      where: { id, isDeleted: false },
      include: { notes: true, attachments: true, statusHistory: true },
    });
    return ref as unknown as PatientReferralEntity | null;
  }

  async findReferralByNumber(referralNumber: string): Promise<PatientReferralEntity | null> {
    const ref = await this.db.patientReferral.findFirst({
      where: { referralNumber, isDeleted: false },
      include: { notes: true, attachments: true, statusHistory: true },
    });
    return ref as unknown as PatientReferralEntity | null;
  }

  async updateReferralStatus(id: string, status: string, changedBy: string, reason?: string): Promise<PatientReferralEntity> {
    const current = await this.findReferralById(id);
    if (!current) throw new NotFoundException('Referral record not found');

    const updated = await this.db.patientReferral.update({
      where: { id },
      data: {
        status: status as any,
        acceptedAt: status === 'ACCEPTED' ? new Date() : undefined,
        completedAt: status === 'COMPLETED' ? new Date() : undefined,
        rejectedAt: status === 'REJECTED' ? new Date() : undefined,
        rejectionReason: status === 'REJECTED' ? reason : undefined,
        statusHistory: {
          create: {
            fromStatus: current.status as any,
            toStatus: status as any,
            changedBy,
            reason: reason || `Status changed to ${status}`,
          },
        },
      },
      include: { notes: true, attachments: true, statusHistory: true },
    });

    return updated as unknown as PatientReferralEntity;
  }

  async triageReferral(id: string, outcome: string, changedBy: string, receivingDoctorId?: string, reason?: string): Promise<PatientReferralEntity> {
    const current = await this.findReferralById(id);
    if (!current) throw new NotFoundException('Referral record not found');

    let targetStatus = 'TRIAGED';
    if (outcome === 'APPROVED') targetStatus = 'ACCEPTED';
    if (outcome === 'DECLINED') targetStatus = 'REJECTED';

    const updated = await this.db.patientReferral.update({
      where: { id },
      data: {
        status: targetStatus as any,
        receivingDoctorId: receivingDoctorId || undefined,
        acceptedAt: targetStatus === 'ACCEPTED' ? new Date() : undefined,
        rejectedAt: targetStatus === 'REJECTED' ? new Date() : undefined,
        rejectionReason: targetStatus === 'REJECTED' ? reason : undefined,
        statusHistory: {
          create: {
            fromStatus: current.status as any,
            toStatus: targetStatus as any,
            changedBy,
            reason: reason || `Triaged: ${outcome}`,
          },
        },
      },
      include: { notes: true, attachments: true, statusHistory: true },
    });

    return updated as unknown as PatientReferralEntity;
  }

  async addNote(data: { referralId: string; authorId: string; authorRole: string; noteText: string; isPrivate?: boolean }): Promise<ReferralNoteEntity> {
    return (await this.db.referralNote.create({
      data: {
        referralId: data.referralId,
        authorId: data.authorId,
        authorRole: data.authorRole,
        noteText: data.noteText,
        isPrivate: data.isPrivate || false,
      },
    })) as unknown as ReferralNoteEntity;
  }

  async findNotes(referralId: string, includePrivate = true): Promise<ReferralNoteEntity[]> {
    return (await this.db.referralNote.findMany({
      where: {
        referralId,
        ...(includePrivate ? {} : { isPrivate: false }),
      },
      orderBy: { createdAt: 'desc' },
    })) as unknown as ReferralNoteEntity[];
  }

  async addAttachment(data: { referralId: string; attachmentId: string; attachedBy: string }): Promise<ReferralAttachmentEntity> {
    return (await this.db.referralAttachment.create({
      data: {
        referralId: data.referralId,
        attachmentId: data.attachmentId,
        attachedBy: data.attachedBy,
      },
    })) as unknown as ReferralAttachmentEntity;
  }

  async findAttachments(referralId: string): Promise<ReferralAttachmentEntity[]> {
    return (await this.db.referralAttachment.findMany({
      where: { referralId },
      orderBy: { createdAt: 'desc' },
    })) as unknown as ReferralAttachmentEntity[];
  }

  async findStatusHistory(referralId: string): Promise<ReferralStatusHistoryEntity[]> {
    return (await this.db.referralStatusHistory.findMany({
      where: { referralId },
      orderBy: { createdAt: 'asc' },
    })) as unknown as ReferralStatusHistoryEntity[];
  }

  async getDashboardStats(facilityId?: string) {
    const where = {
      isDeleted: false,
      ...(facilityId ? { receivingFacilityId: facilityId } : {}),
    };

    const [total, pendingTriage, accepted, completed] = await Promise.all([
      this.db.patientReferral.count({ where }),
      this.db.patientReferral.count({ where: { ...where, status: 'SUBMITTED' } }),
      this.db.patientReferral.count({ where: { ...where, status: 'ACCEPTED' } }),
      this.db.patientReferral.count({ where: { ...where, status: 'COMPLETED' } }),
    ]);

    return {
      totalReferrals: total,
      pendingTriageCount: pendingTriage,
      acceptedCount: accepted,
      completedCount: completed,
      avgCompletionTimeHours: 18.5,
    };
  }

  async softDeleteReferral(id: string): Promise<PatientReferralEntity> {
    return (await this.db.patientReferral.update({
      where: { id },
      data: { isDeleted: true, deletedAt: new Date() },
    })) as unknown as PatientReferralEntity;
  }
}

import { Injectable } from '@nestjs/common';
import { DatabaseService } from '@database/database.service';
import { IMedicalRecordRepository } from '../../domain/repositories/medical-record.repository.interface';
import {
  MedicalRecordEntity,
  MedicalAttachmentEntity,
  AttachmentVersionEntity,
  MedicalRecordAuditLogEntity,
} from '../../domain/entities/medical-record.entity';

@Injectable()
export class MedicalRecordRepository implements IMedicalRecordRepository {
  constructor(private readonly db: DatabaseService) {}

  async findProfileByUserId(userId: string): Promise<{ id: string } | null> {
    return this.db.patientProfile.findUnique({ where: { userId }, select: { id: true } });
  }

  // ─── Medical Records ──────────────────────────────────────────────────────
  async createRecord(patientProfileId: string, data: any): Promise<MedicalRecordEntity> {
    return (await this.db.medicalRecord.create({
      data: {
        patientProfileId,
        title: data.title,
        chiefComplaint: data.chiefComplaint || null,
        clinicalNotes: data.clinicalNotes || null,
        treatmentPlan: data.treatmentPlan || null,
        followUpInstructions: data.followUpInstructions || null,
        status: data.status || 'FINAL',
        createdById: data.createdById || null,
        encounters: data.encounter ? {
          create: {
            providerName: data.encounter.providerName || null,
            facilityName: data.encounter.facilityName || null,
            encounterType: data.encounter.encounterType || 'CONSULTATION',
            encounterDate: data.encounter.encounterDate ? new Date(data.encounter.encounterDate) : new Date(),
          },
        } : undefined,
        diagnoses: data.diagnoses && data.diagnoses.length > 0 ? {
          create: data.diagnoses.map((d: any) => ({
            code: d.code || null,
            description: d.description,
            type: d.type || 'PRIMARY',
            status: d.status || 'ACTIVE',
          })),
        } : undefined,
        vitalSigns: data.vitalSigns ? {
          create: {
            heightCm: data.vitalSigns.heightCm ?? null,
            weightKg: data.vitalSigns.weightKg ?? null,
            bmi: data.vitalSigns.bmi ?? null,
            systolicBp: data.vitalSigns.systolicBp ?? null,
            diastolicBp: data.vitalSigns.diastolicBp ?? null,
            pulseBpm: data.vitalSigns.pulseBpm ?? null,
            respirationRate: data.vitalSigns.respirationRate ?? null,
            temperatureC: data.vitalSigns.temperatureC ?? null,
            bloodSugarMgDl: data.vitalSigns.bloodSugarMgDl ?? null,
            oxygenSaturation: data.vitalSigns.oxygenSaturation ?? null,
          },
        } : undefined,
        procedures: data.procedures && data.procedures.length > 0 ? {
          create: data.procedures.map((p: any) => ({
            name: p.name,
            code: p.code || null,
            performedAt: p.performedAt ? new Date(p.performedAt) : null,
            notes: p.notes || null,
          })),
        } : undefined,
      },
      include: {
        encounters: true,
        diagnoses: true,
        vitalSigns: true,
        procedures: true,
        attachments: { where: { isDeleted: false } },
      },
    })) as unknown as MedicalRecordEntity;
  }

  async findRecordById(id: string, includeDeleted = false): Promise<MedicalRecordEntity | null> {
    return (await this.db.medicalRecord.findFirst({
      where: { id, ...(includeDeleted ? {} : { isDeleted: false }) },
      include: {
        encounters: true,
        diagnoses: true,
        vitalSigns: true,
        procedures: true,
        attachments: { where: { isDeleted: false } },
      },
    })) as unknown as MedicalRecordEntity | null;
  }

  async findRecordsByProfile(patientProfileId: string, includeArchived = true): Promise<MedicalRecordEntity[]> {
    return (await this.db.medicalRecord.findMany({
      where: {
        patientProfileId,
        isDeleted: false,
        ...(includeArchived ? {} : { status: { not: 'ARCHIVED' } }),
      },
      include: {
        encounters: true,
        diagnoses: true,
        vitalSigns: true,
        procedures: true,
        attachments: { where: { isDeleted: false } },
      },
      orderBy: { createdAt: 'desc' },
    })) as unknown as MedicalRecordEntity[];
  }

  async updateRecord(id: string, data: any): Promise<MedicalRecordEntity> {
    return (await this.db.medicalRecord.update({
      where: { id },
      data: {
        title: data.title || undefined,
        chiefComplaint: data.chiefComplaint || undefined,
        clinicalNotes: data.clinicalNotes || undefined,
        treatmentPlan: data.treatmentPlan || undefined,
        followUpInstructions: data.followUpInstructions || undefined,
        status: data.status || undefined,
      },
      include: {
        encounters: true,
        diagnoses: true,
        vitalSigns: true,
        procedures: true,
        attachments: { where: { isDeleted: false } },
      },
    })) as unknown as MedicalRecordEntity;
  }

  async softDeleteRecord(id: string): Promise<void> {
    await this.db.medicalRecord.update({
      where: { id },
      data: { isDeleted: true, deletedAt: new Date() },
    });
  }

  async restoreRecord(id: string): Promise<MedicalRecordEntity> {
    return (await this.db.medicalRecord.update({
      where: { id },
      data: { isDeleted: false, deletedAt: null, status: 'FINAL' },
      include: {
        encounters: true,
        diagnoses: true,
        vitalSigns: true,
        procedures: true,
        attachments: { where: { isDeleted: false } },
      },
    })) as unknown as MedicalRecordEntity;
  }

  async searchRecords(patientProfileId: string, query: string): Promise<MedicalRecordEntity[]> {
    const q = query.toLowerCase();
    return (await this.db.medicalRecord.findMany({
      where: {
        patientProfileId,
        isDeleted: false,
        OR: [
          { title: { contains: q, mode: 'insensitive' } },
          { chiefComplaint: { contains: q, mode: 'insensitive' } },
          { clinicalNotes: { contains: q, mode: 'insensitive' } },
          { treatmentPlan: { contains: q, mode: 'insensitive' } },
          { diagnoses: { some: { description: { contains: q, mode: 'insensitive' } } } },
        ],
      },
      include: {
        encounters: true,
        diagnoses: true,
        vitalSigns: true,
        procedures: true,
        attachments: { where: { isDeleted: false } },
      },
      orderBy: { createdAt: 'desc' },
    })) as unknown as MedicalRecordEntity[];
  }

  async getTimeline(patientProfileId: string): Promise<any[]> {
    const records = await this.findRecordsByProfile(patientProfileId, true);
    const attachments = await this.findAttachmentsByProfile(patientProfileId, false);

    const events: any[] = [];

    records.forEach((r) => {
      events.push({
        id: r.id,
        eventType: 'MEDICAL_RECORD',
        title: r.title,
        status: r.status,
        date: r.createdAt,
        details: {
          chiefComplaint: r.chiefComplaint,
          diagnoses: r.diagnoses?.map((d) => d.description),
        },
      });
    });

    attachments.forEach((a) => {
      events.push({
        id: a.id,
        eventType: 'ATTACHMENT_UPLOAD',
        title: a.originalName,
        category: a.category,
        date: a.createdAt,
        details: {
          fileSize: a.fileSize,
          mimeType: a.mimeType,
          storageUrl: a.storageUrl,
        },
      });
    });

    return events.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }

  // ─── Medical Attachments ──────────────────────────────────────────────────
  async createAttachment(data: any): Promise<MedicalAttachmentEntity> {
    const created = await this.db.medicalAttachment.create({
      data: {
        medicalRecordId: data.medicalRecordId || null,
        patientProfileId: data.patientProfileId,
        fileName: data.fileName,
        originalName: data.originalName,
        fileSize: data.fileSize,
        mimeType: data.mimeType,
        category: data.category || 'OTHER',
        storageKey: data.storageKey,
        storageUrl: data.storageUrl,
        checksum: data.checksum || null,
        virusScanStatus: data.virusScanStatus || 'CLEAN',
        version: 1,
      },
    });

    // Create initial version record
    await this.createAttachmentVersion({
      attachmentId: created.id,
      version: 1,
      storageKey: data.storageKey,
      storageUrl: data.storageUrl,
      fileSize: data.fileSize,
      createdById: data.createdById || null,
    });

    return created as unknown as MedicalAttachmentEntity;
  }

  async findAttachmentById(id: string, includeDeleted = false): Promise<MedicalAttachmentEntity | null> {
    return (await this.db.medicalAttachment.findFirst({
      where: { id, ...(includeDeleted ? {} : { isDeleted: false }) },
    })) as unknown as MedicalAttachmentEntity | null;
  }

  async findAttachmentsByRecord(medicalRecordId: string, includeDeleted = false): Promise<MedicalAttachmentEntity[]> {
    return (await this.db.medicalAttachment.findMany({
      where: { medicalRecordId, ...(includeDeleted ? {} : { isDeleted: false }) },
      orderBy: { createdAt: 'desc' },
    })) as unknown as MedicalAttachmentEntity[];
  }

  async findAttachmentsByProfile(patientProfileId: string, includeDeleted = false): Promise<MedicalAttachmentEntity[]> {
    return (await this.db.medicalAttachment.findMany({
      where: { patientProfileId, ...(includeDeleted ? {} : { isDeleted: false }) },
      orderBy: { createdAt: 'desc' },
    })) as unknown as MedicalAttachmentEntity[];
  }

  async updateAttachment(id: string, data: any): Promise<MedicalAttachmentEntity> {
    const existing = await this.findAttachmentById(id);
    if (!existing) throw new Error('Attachment not found');

    const newVersion = data.storageKey ? existing.version + 1 : existing.version;

    const updated = await this.db.medicalAttachment.update({
      where: { id },
      data: {
        category: data.category || undefined,
        fileName: data.fileName || undefined,
        originalName: data.originalName || undefined,
        fileSize: data.fileSize || undefined,
        mimeType: data.mimeType || undefined,
        storageKey: data.storageKey || undefined,
        storageUrl: data.storageUrl || undefined,
        version: newVersion,
      },
    });

    if (data.storageKey) {
      await this.createAttachmentVersion({
        attachmentId: id,
        version: newVersion,
        storageKey: data.storageKey,
        storageUrl: data.storageUrl,
        fileSize: data.fileSize || existing.fileSize,
        createdById: data.createdById || null,
      });
    }

    return updated as unknown as MedicalAttachmentEntity;
  }

  async softDeleteAttachment(id: string): Promise<void> {
    await this.db.medicalAttachment.update({
      where: { id },
      data: { isDeleted: true, deletedAt: new Date() },
    });
  }

  async restoreAttachment(id: string): Promise<MedicalAttachmentEntity> {
    return (await this.db.medicalAttachment.update({
      where: { id },
      data: { isDeleted: false, deletedAt: null },
    })) as unknown as MedicalAttachmentEntity;
  }

  // ─── Attachment Versions ──────────────────────────────────────────────────
  async createAttachmentVersion(data: any): Promise<AttachmentVersionEntity> {
    return (await this.db.attachmentVersion.create({
      data: {
        attachmentId: data.attachmentId,
        version: data.version,
        storageKey: data.storageKey,
        storageUrl: data.storageUrl,
        fileSize: data.fileSize,
        createdById: data.createdById || null,
      },
    })) as unknown as AttachmentVersionEntity;
  }

  async findAttachmentVersions(attachmentId: string): Promise<AttachmentVersionEntity[]> {
    return (await this.db.attachmentVersion.findMany({
      where: { attachmentId },
      orderBy: { version: 'desc' },
    })) as unknown as AttachmentVersionEntity[];
  }

  // ─── Audit Logs ───────────────────────────────────────────────────────────
  async createAuditLog(data: {
    medicalRecordId?: string;
    attachmentId?: string;
    action: string;
    performedBy?: string;
    details?: string;
  }): Promise<MedicalRecordAuditLogEntity> {
    return (await this.db.medicalRecordAuditLog.create({
      data: {
        medicalRecordId: data.medicalRecordId || null,
        attachmentId: data.attachmentId || null,
        action: data.action,
        performedBy: data.performedBy || null,
        details: data.details || null,
      },
    })) as unknown as MedicalRecordAuditLogEntity;
  }
}

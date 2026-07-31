import { Injectable } from '@nestjs/common';
import { DatabaseService } from '@database/database.service';
import { IReportRepository } from '../../domain/repositories/report.repository.interface';
import { MedicalReportEntity, ReportAttachmentEntity, ReportVersionEntity, ReportAuditLogEntity } from '../../domain/entities/report.entity';

@Injectable()
export class ReportRepository implements IReportRepository {
  constructor(private readonly db: DatabaseService) {}

  async findProfileByUserId(userId: string): Promise<{ id: string } | null> {
    return this.db.patientProfile.findUnique({ where: { userId }, select: { id: true } });
  }

  async createReport(data: any): Promise<MedicalReportEntity> {
    const report = await this.db.medicalReport.create({
      data: {
        patientProfileId: data.patientProfileId,
        title: data.title,
        description: data.description || null,
        category: data.category || 'LAB',
        status: data.status || 'UPLOADED',
        reportDate: data.reportDate ? new Date(data.reportDate) : new Date(),
        prescribedBy: data.prescribedBy || null,
        providerName: data.providerName || null,
        facilityName: data.facilityName || null,
        doctorName: data.doctorName || null,
        pageCount: data.pageCount || 1,
        language: data.language || 'en',
        tags: data.tags || [],
        notes: data.notes || null,
        currentVersion: 1,
        attachments: data.fileName ? {
          create: {
            fileName: data.fileName,
            originalName: data.originalName || data.fileName,
            fileSize: data.fileSize,
            mimeType: data.mimeType,
            storageKey: data.storageKey || null,
            storageUrl: data.storageUrl,
            checksum: data.checksum || null,
          },
        } : undefined,
      },
      include: { attachments: true, versions: true },
    });

    // Create version 1 entry
    await this.createReportVersion({
      medicalReportId: report.id,
      version: 1,
      fileName: data.fileName,
      storageKey: data.storageKey || null,
      storageUrl: data.storageUrl,
      fileSize: data.fileSize,
      mimeType: data.mimeType,
      createdById: data.createdById || null,
    });

    return report as unknown as MedicalReportEntity;
  }

  async findReportById(id: string, includeDeleted = false): Promise<MedicalReportEntity | null> {
    return (await this.db.medicalReport.findFirst({
      where: { id, ...(includeDeleted ? {} : { isDeleted: false }) },
      include: { attachments: true, versions: { orderBy: { version: 'desc' } } },
    })) as unknown as MedicalReportEntity | null;
  }

  async findReportsByProfile(patientProfileId: string, category?: string): Promise<MedicalReportEntity[]> {
    return (await this.db.medicalReport.findMany({
      where: {
        patientProfileId,
        isDeleted: false,
        ...(category ? { category: category as any } : {}),
      },
      include: { attachments: true, versions: true },
      orderBy: { createdAt: 'desc' },
    })) as unknown as MedicalReportEntity[];
  }

  async updateReport(id: string, data: any): Promise<MedicalReportEntity> {
    return (await this.db.medicalReport.update({
      where: { id },
      data: {
        title: data.title || undefined,
        description: data.description || undefined,
        category: data.category as any || undefined,
        status: data.status as any || undefined,
        reportDate: data.reportDate ? new Date(data.reportDate) : undefined,
        prescribedBy: data.prescribedBy || undefined,
        providerName: data.providerName || undefined,
        facilityName: data.facilityName || undefined,
        doctorName: data.doctorName || undefined,
        pageCount: data.pageCount || undefined,
        language: data.language || undefined,
        tags: data.tags || undefined,
        notes: data.notes || undefined,
        verificationStatus: data.verificationStatus || undefined,
        verifiedBy: data.verifiedBy || undefined,
        verifiedAt: data.verifiedAt ? new Date(data.verifiedAt) : undefined,
        currentVersion: data.currentVersion || undefined,
      },
      include: { attachments: true, versions: true },
    })) as unknown as MedicalReportEntity;
  }

  async softDeleteReport(id: string): Promise<void> {
    await this.db.medicalReport.update({
      where: { id },
      data: { isDeleted: true, deletedAt: new Date() },
    });
  }

  async restoreReport(id: string): Promise<MedicalReportEntity> {
    return (await this.db.medicalReport.update({
      where: { id },
      data: { isDeleted: false, deletedAt: null, status: 'UPLOADED' },
      include: { attachments: true, versions: true },
    })) as unknown as MedicalReportEntity;
  }

  async searchReports(patientProfileId: string, query: string): Promise<MedicalReportEntity[]> {
    const q = query.toLowerCase();
    return (await this.db.medicalReport.findMany({
      where: {
        patientProfileId,
        isDeleted: false,
        OR: [
          { title: { contains: q, mode: 'insensitive' } },
          { description: { contains: q, mode: 'insensitive' } },
          { providerName: { contains: q, mode: 'insensitive' } },
          { doctorName: { contains: q, mode: 'insensitive' } },
          { notes: { contains: q, mode: 'insensitive' } },
          { tags: { has: q } },
        ],
      },
      include: { attachments: true, versions: true },
      orderBy: { createdAt: 'desc' },
    })) as unknown as MedicalReportEntity[];
  }

  async getCategoriesCount(patientProfileId: string): Promise<Record<string, number>> {
    const reports = await this.db.medicalReport.findMany({
      where: { patientProfileId, isDeleted: false },
      select: { category: true },
    });

    const counts: Record<string, number> = {
      LAB: 0, RADIOLOGY: 0, PRESCRIPTION: 0, REFERRAL: 0,
      DISCHARGE: 0, VACCINATION: 0, CLINICAL_NOTES: 0, INSURANCE: 0, CUSTOM: 0,
    };

    reports.forEach((r) => {
      counts[r.category] = (counts[r.category] || 0) + 1;
    });

    return counts;
  }

  async getTimeline(patientProfileId: string): Promise<any[]> {
    const reports = await this.findReportsByProfile(patientProfileId);
    return reports.map((r) => ({
      id: r.id,
      title: r.title,
      category: r.category,
      status: r.status,
      reportDate: r.reportDate || r.createdAt,
      pageCount: r.pageCount,
      verificationStatus: r.verificationStatus,
      createdAt: r.createdAt,
    })).sort((a, b) => new Date(b.reportDate).getTime() - new Date(a.reportDate).getTime());
  }

  async createAttachment(reportId: string, data: any): Promise<ReportAttachmentEntity> {
    return (await this.db.reportAttachment.create({
      data: {
        medicalReportId: reportId,
        fileName: data.fileName,
        originalName: data.originalName || data.fileName,
        fileSize: data.fileSize,
        mimeType: data.mimeType,
        storageKey: data.storageKey || null,
        storageUrl: data.storageUrl,
        checksum: data.checksum || null,
      },
    })) as unknown as ReportAttachmentEntity;
  }

  async createReportVersion(data: any): Promise<ReportVersionEntity> {
    return (await this.db.reportVersion.create({
      data: {
        medicalReportId: data.medicalReportId,
        version: data.version,
        fileName: data.fileName,
        storageKey: data.storageKey || null,
        storageUrl: data.storageUrl,
        fileSize: data.fileSize,
        mimeType: data.mimeType,
        createdById: data.createdById || null,
      },
    })) as unknown as ReportVersionEntity;
  }

  async findReportVersions(medicalReportId: string): Promise<ReportVersionEntity[]> {
    return (await this.db.reportVersion.findMany({
      where: { medicalReportId },
      orderBy: { version: 'desc' },
    })) as unknown as ReportVersionEntity[];
  }

  async createAuditLog(data: {
    medicalReportId: string;
    action: string;
    performedBy?: string;
    details?: string;
  }): Promise<ReportAuditLogEntity> {
    return (await this.db.reportAuditLog.create({
      data: {
        medicalReportId: data.medicalReportId,
        action: data.action,
        performedBy: data.performedBy || null,
        details: data.details || null,
      },
    })) as unknown as ReportAuditLogEntity;
  }
}

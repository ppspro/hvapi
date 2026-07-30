import { Injectable } from '@nestjs/common';
import { DatabaseService } from '@database/database.service';
import { IReportRepository } from '../../domain/repositories/report.repository.interface';
import { MedicalReportEntity, ReportAttachmentEntity } from '../../domain/entities/report.entity';

@Injectable()
export class ReportRepository implements IReportRepository {
  constructor(private readonly db: DatabaseService) {}

  async findProfileByUserId(userId: string): Promise<{ id: string } | null> {
    return this.db.patientProfile.findUnique({
      where: { userId },
      select: { id: true },
    });
  }

  async findReportsByProfileId(profileId: string): Promise<(MedicalReportEntity & { attachments: ReportAttachmentEntity[] })[]> {
    return (await this.db.medicalReport.findMany({
      where: { patientProfileId: profileId },
      include: { attachments: true },
      orderBy: { createdAt: 'desc' },
    })) as any[];
  }

  async findReportById(reportId: string): Promise<(MedicalReportEntity & { attachments: ReportAttachmentEntity[] }) | null> {
    return (await this.db.medicalReport.findUnique({
      where: { id: reportId },
      include: { attachments: true },
    })) as any;
  }

  async createReport(profileId: string, title: string, category: string, prescribedBy?: string): Promise<MedicalReportEntity> {
    return (await this.db.medicalReport.create({
      data: {
        patientProfileId: profileId,
        title,
        category,
        prescribedBy: prescribedBy || null,
      },
    })) as MedicalReportEntity;
  }

  async createAttachment(
    reportId: string,
    fileName: string,
    fileSize: number,
    mimeType: string,
    storageUrl: string,
  ): Promise<ReportAttachmentEntity> {
    return (await this.db.reportAttachment.create({
      data: {
        medicalReportId: reportId,
        fileName,
        fileSize,
        mimeType,
        storageUrl,
      },
    })) as ReportAttachmentEntity;
  }
}

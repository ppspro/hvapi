import { Injectable, NotFoundException, BadRequestException, ForbiddenException, Inject } from '@nestjs/common';
import { IReportRepository } from '../../domain/repositories/report.repository.interface';
import { UploadReportDto, UpdateReportDto, ReplaceReportFileDto, VerifyReportDto } from '../../presentation/dto/upload-report.dto';
import {
  FullReportResponseDto,
  DownloadTokenResponseDto,
  PreviewMetadataResponseDto,
  ReportVersionResponseDto,
} from '../../presentation/dto/report-detail-response.dto';
import { Logger } from 'nestjs-pino';

const ALLOWED_REPORT_MIME_TYPES = [
  'application/pdf',
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/tiff',
  'application/dicom',
];

import { QrService } from '@modules/qr/application/use-cases/qr.service';
import { QrEntityType } from '@modules/qr/presentation/dto/generate-qr.dto';

@Injectable()
export class ReportService {
  constructor(
    @Inject('IReportRepository')
    private readonly repository: IReportRepository,
    private readonly qrService: QrService,
    private readonly logger: Logger,
  ) {}


  private async resolveProfile(userId: string): Promise<string> {
    const profile = await this.repository.findProfileByUserId(userId);
    if (!profile) {
      throw new NotFoundException('Patient profile not found. Please complete registration first.');
    }
    return profile.id;
  }

  private mapReport(r: any): FullReportResponseDto {
    return {
      id: r.id,
      patientProfileId: r.patientProfileId,
      title: r.title,
      description: r.description || undefined,
      category: r.category,
      status: r.status,
      reportDate: r.reportDate ? new Date(r.reportDate).toISOString().split('T')[0] : undefined,
      prescribedBy: r.prescribedBy || undefined,
      providerName: r.providerName || undefined,
      facilityName: r.facilityName || undefined,
      doctorName: r.doctorName || undefined,
      pageCount: r.pageCount || 1,
      language: r.language || 'en',
      tags: r.tags || [],
      notes: r.notes || undefined,
      verificationStatus: r.verificationStatus,
      verifiedBy: r.verifiedBy || undefined,
      verifiedAt: r.verifiedAt?.toISOString() || undefined,
      currentVersion: r.currentVersion || 1,
      isDeleted: r.isDeleted,
      attachments: r.attachments?.map((a: any) => ({
        id: a.id,
        fileName: a.fileName,
        originalName: a.originalName || undefined,
        fileSize: a.fileSize,
        mimeType: a.mimeType,
        storageKey: a.storageKey || undefined,
        storageUrl: a.storageUrl,
        checksum: a.checksum || undefined,
        createdAt: a.createdAt.toISOString(),
      })) || [],
      versions: r.versions?.map((v: any) => this.mapVersion(v)),
      createdAt: r.createdAt.toISOString(),
      updatedAt: r.updatedAt.toISOString(),
    };
  }

  private mapVersion(v: any): ReportVersionResponseDto {
    return {
      id: v.id,
      medicalReportId: v.medicalReportId,
      version: v.version,
      fileName: v.fileName,
      storageKey: v.storageKey || undefined,
      storageUrl: v.storageUrl,
      fileSize: v.fileSize,
      mimeType: v.mimeType,
      createdById: v.createdById || undefined,
      createdAt: v.createdAt.toISOString(),
    };
  }

  // ─── Core Report Lifecycle ────────────────────────────────────────────────

  async uploadReport(userId: string, dto: UploadReportDto): Promise<FullReportResponseDto> {
    const profileId = await this.resolveProfile(userId);

    if (!ALLOWED_REPORT_MIME_TYPES.includes(dto.mimeType.toLowerCase())) {
      throw new BadRequestException(`File type '${dto.mimeType}' is not supported for diagnostic reports. Allowed: PDF, Images, DICOM.`);
    }

    const report = await this.repository.createReport({
      patientProfileId: profileId,
      title: dto.title,
      description: dto.description,
      category: dto.category || 'LAB',
      status: 'UPLOADED',
      reportDate: dto.reportDate,
      prescribedBy: dto.prescribedBy,
      providerName: dto.providerName,
      facilityName: dto.facilityName,
      doctorName: dto.doctorName,
      pageCount: dto.pageCount || 1,
      language: dto.language || 'en',
      tags: dto.tags || [],
      notes: dto.notes,
      fileName: dto.fileName,
      originalName: dto.fileName,
      fileSize: dto.fileSize,
      mimeType: dto.mimeType,
      storageKey: dto.storageKey,
      storageUrl: dto.storageUrl,
      checksum: dto.checksum,
      createdById: userId,
    });

    await this.repository.createAuditLog({
      medicalReportId: report.id,
      action: 'UPLOADED',
      performedBy: userId,
      details: `Uploaded report: ${report.title} (${dto.fileName})`,
    });

    this.logger.log({ msg: 'Report uploaded successfully', reportId: report.id, userId });
    return this.mapReport(report);
  }

  async getReportsList(userId: string, category?: string): Promise<FullReportResponseDto[]> {
    const profileId = await this.resolveProfile(userId);
    const reports = await this.repository.findReportsByProfile(profileId, category);
    return reports.map((r) => this.mapReport(r));
  }

  async getReportDetails(userId: string, reportId: string): Promise<FullReportResponseDto> {
    const profileId = await this.resolveProfile(userId);
    const report = await this.repository.findReportById(reportId);

    if (!report) throw new NotFoundException('Medical report not found');
    if (report.patientProfileId !== profileId) throw new ForbiddenException('Access denied');

    return this.mapReport(report);
  }

  async updateReport(userId: string, reportId: string, dto: UpdateReportDto): Promise<FullReportResponseDto> {
    const profileId = await this.resolveProfile(userId);
    const report = await this.repository.findReportById(reportId);

    if (!report) throw new NotFoundException('Medical report not found');
    if (report.patientProfileId !== profileId) throw new ForbiddenException('Access denied');
    if (report.status === 'ARCHIVED') {
      throw new BadRequestException('Archived reports are read-only. Restore the report before updating.');
    }

    const updated = await this.repository.updateReport(reportId, dto);

    await this.repository.createAuditLog({
      medicalReportId: reportId,
      action: 'UPDATED',
      performedBy: userId,
      details: 'Updated report metadata',
    });

    return this.mapReport(updated);
  }

  async softDeleteReport(userId: string, reportId: string): Promise<{ message: string }> {
    const profileId = await this.resolveProfile(userId);
    const report = await this.repository.findReportById(reportId);

    if (!report) throw new NotFoundException('Medical report not found');
    if (report.patientProfileId !== profileId) throw new ForbiddenException('Access denied');

    await this.repository.softDeleteReport(reportId);

    await this.repository.createAuditLog({
      medicalReportId: reportId,
      action: 'SOFT_DELETED',
      performedBy: userId,
    });

    return { message: 'Report soft-deleted successfully' };
  }

  async archiveReport(userId: string, reportId: string): Promise<FullReportResponseDto> {
    const profileId = await this.resolveProfile(userId);
    const report = await this.repository.findReportById(reportId);

    if (!report) throw new NotFoundException('Medical report not found');
    if (report.patientProfileId !== profileId) throw new ForbiddenException('Access denied');
    if (report.status === 'ARCHIVED') throw new BadRequestException('Report is already archived');

    const updated = await this.repository.updateReport(reportId, { status: 'ARCHIVED' });

    await this.repository.createAuditLog({
      medicalReportId: reportId,
      action: 'ARCHIVED',
      performedBy: userId,
    });

    return this.mapReport(updated);
  }

  async restoreReport(userId: string, reportId: string): Promise<FullReportResponseDto> {
    const profileId = await this.resolveProfile(userId);
    const report = await this.repository.findReportById(reportId, true);

    if (!report) throw new NotFoundException('Medical report not found');
    if (report.patientProfileId !== profileId) throw new ForbiddenException('Access denied');
    if (!report.isDeleted && report.status !== 'ARCHIVED') {
      throw new BadRequestException('Report is not deleted or archived');
    }

    const restored = await this.repository.restoreReport(reportId);

    await this.repository.createAuditLog({
      medicalReportId: reportId,
      action: 'RESTORED',
      performedBy: userId,
    });

    return this.mapReport(restored);
  }

  // ─── PDF Replacement & Versioning ────────────────────────────────────────

  async replaceReportFile(userId: string, reportId: string, dto: ReplaceReportFileDto): Promise<FullReportResponseDto> {
    const profileId = await this.resolveProfile(userId);
    const report = await this.repository.findReportById(reportId);

    if (!report) throw new NotFoundException('Medical report not found');
    if (report.patientProfileId !== profileId) throw new ForbiddenException('Access denied');
    if (report.status === 'ARCHIVED') {
      throw new BadRequestException('Archived reports cannot be replaced. Restore the report first.');
    }

    const newVersionNumber = report.currentVersion + 1;

    // Create attachment entry
    await this.repository.createAttachment(reportId, {
      fileName: dto.fileName,
      originalName: dto.fileName,
      fileSize: dto.fileSize,
      mimeType: dto.mimeType,
      storageKey: dto.storageKey,
      storageUrl: dto.storageUrl,
    });

    // Create immutable version entry
    await this.repository.createReportVersion({
      medicalReportId: reportId,
      version: newVersionNumber,
      fileName: dto.fileName,
      storageKey: dto.storageKey,
      storageUrl: dto.storageUrl,
      fileSize: dto.fileSize,
      mimeType: dto.mimeType,
      createdById: userId,
    });

    const updated = await this.repository.updateReport(reportId, {
      currentVersion: newVersionNumber,
    });

    await this.repository.createAuditLog({
      medicalReportId: reportId,
      action: 'REPLACED',
      performedBy: userId,
      details: `Replaced report PDF with version ${newVersionNumber} (${dto.fileName})`,
    });

    return this.mapReport(updated);
  }

  async getReportVersions(userId: string, reportId: string): Promise<ReportVersionResponseDto[]> {
    const profileId = await this.resolveProfile(userId);
    const report = await this.repository.findReportById(reportId, true);

    if (!report) throw new NotFoundException('Medical report not found');
    if (report.patientProfileId !== profileId) throw new ForbiddenException('Access denied');

    const versions = await this.repository.findReportVersions(reportId);
    return versions.map((v) => this.mapVersion(v));
  }

  // ─── Verification ─────────────────────────────────────────────────────────

  async verifyReport(userId: string, reportId: string, dto: VerifyReportDto): Promise<FullReportResponseDto> {
    const profileId = await this.resolveProfile(userId);
    const report = await this.repository.findReportById(reportId);

    if (!report) throw new NotFoundException('Medical report not found');
    if (report.patientProfileId !== profileId) throw new ForbiddenException('Access denied');

    const updated = await this.repository.updateReport(reportId, {
      status: 'VERIFIED',
      verificationStatus: 'VERIFIED',
      verifiedBy: userId,
      verifiedAt: new Date(),
      notes: dto.notes ? `${report.notes || ''}\n[Verification Note]: ${dto.notes}`.trim() : report.notes,
    });

    await this.repository.createAuditLog({
      medicalReportId: reportId,
      action: 'VERIFIED',
      performedBy: userId,
      details: `Report marked as VERIFIED: ${dto.notes || 'No notes'}`,
    });

    return this.mapReport(updated);
  }

  // ─── Search & Categories & Timeline ──────────────────────────────────────

  async searchReports(userId: string, query: string): Promise<FullReportResponseDto[]> {
    const profileId = await this.resolveProfile(userId);
    if (!query || query.trim().length === 0) {
      return this.getReportsList(userId);
    }
    const reports = await this.repository.searchReports(profileId, query.trim());
    return reports.map((r) => this.mapReport(r));
  }

  async getCategories(userId: string): Promise<{ categories: Record<string, number> }> {
    const profileId = await this.resolveProfile(userId);
    const counts = await this.repository.getCategoriesCount(profileId);
    return { categories: counts };
  }

  async getTimeline(userId: string): Promise<any[]> {
    const profileId = await this.resolveProfile(userId);
    return this.repository.getTimeline(profileId);
  }

  // ─── Secure Download & Preview Metadata ───────────────────────────────────

  async getDownloadToken(userId: string, reportId: string): Promise<DownloadTokenResponseDto> {
    const profileId = await this.resolveProfile(userId);
    const report = await this.repository.findReportById(reportId);

    if (!report) throw new NotFoundException('Medical report not found');
    if (report.patientProfileId !== profileId) throw new ForbiddenException('Access denied');

    const attachment = report.attachments?.[0];
    const storageUrl = attachment?.storageUrl || 'https://cdn.hvapi.com/reports/sample.pdf';

    const token = `dl_token_${Date.now()}_${reportId.slice(0, 8)}`;
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000).toISOString(); // 15 min expiry

    return {
      downloadUrl: `${storageUrl}?token=${token}`,
      token,
      expiresAt,
    };
  }

  async getPreviewMetadata(userId: string, reportId: string): Promise<PreviewMetadataResponseDto> {
    const profileId = await this.resolveProfile(userId);
    const report = await this.repository.findReportById(reportId);

    if (!report) throw new NotFoundException('Medical report not found');
    if (report.patientProfileId !== profileId) throw new ForbiddenException('Access denied');

    const attachment = report.attachments?.[0];

    return {
      id: report.id,
      title: report.title,
      fileName: attachment?.fileName || 'report.pdf',
      fileSize: attachment?.fileSize || 524288,
      mimeType: attachment?.mimeType || 'application/pdf',
      pageCount: report.pageCount || 1,
      language: report.language || 'en',
      storageUrl: attachment?.storageUrl || 'https://cdn.hvapi.com/reports/sample.pdf',
      isPdf: (attachment?.mimeType || 'application/pdf').toLowerCase() === 'application/pdf',
      verificationStatus: report.verificationStatus,
    };
  }
}

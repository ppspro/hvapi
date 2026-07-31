import { Injectable, NotFoundException, BadRequestException, ForbiddenException, Inject } from '@nestjs/common';
import { IMedicalRecordRepository } from '../../domain/repositories/medical-record.repository.interface';
import { CreateMedicalRecordDto, UpdateMedicalRecordDto } from '../../presentation/dto/create-medical-record.dto';
import { CreateAttachmentDto, UpdateAttachmentDto } from '../../presentation/dto/create-attachment.dto';
import {
  MedicalRecordResponseDto,
  MedicalAttachmentResponseDto,
  AttachmentVersionResponseDto,
  MedicalTimelineItemDto,
} from '../../presentation/dto/medical-record-response.dto';

const ALLOWED_MIME_TYPES = [
  'image/jpeg',
  'image/png',
  'image/webp',
  'application/pdf',
  'application/dicom',
  'image/tiff',
];
const MAX_FILE_SIZE = 15 * 1024 * 1024; // 15MB

import { QrService } from '@modules/qr/application/use-cases/qr.service';
import { QrEntityType } from '@modules/qr/presentation/dto/generate-qr.dto';

@Injectable()
export class MedicalRecordService {
  constructor(
    @Inject('IMedicalRecordRepository')
    private readonly repository: IMedicalRecordRepository,
    private readonly qrService: QrService,
  ) {}


  private async resolveProfile(userId: string): Promise<string> {
    const profile = await this.repository.findProfileByUserId(userId);
    if (!profile) {
      throw new NotFoundException('Patient profile not found. Please complete registration first.');
    }
    return profile.id;
  }

  private calculateBmi(heightCm?: number, weightKg?: number): number | undefined {
    if (heightCm && weightKg && heightCm > 0) {
      const heightM = heightCm / 100;
      return Math.round((weightKg / (heightM * heightM)) * 10) / 10;
    }
    return undefined;
  }

  private sanitizeFilename(filename: string): string {
    return filename.replace(/[^a-zA-Z0-9._-]/g, '_');
  }

  private mapRecord(r: any): MedicalRecordResponseDto {
    return {
      id: r.id,
      patientProfileId: r.patientProfileId,
      title: r.title,
      chiefComplaint: r.chiefComplaint || undefined,
      clinicalNotes: r.clinicalNotes || undefined,
      treatmentPlan: r.treatmentPlan || undefined,
      followUpInstructions: r.followUpInstructions || undefined,
      status: r.status,
      isDeleted: r.isDeleted,
      deletedAt: r.deletedAt?.toISOString() || undefined,
      encounters: r.encounters || [],
      diagnoses: r.diagnoses || [],
      vitalSigns: r.vitalSigns || [],
      procedures: r.procedures || [],
      attachments: r.attachments?.map((a: any) => this.mapAttachment(a)) || [],
      createdAt: r.createdAt.toISOString(),
      updatedAt: r.updatedAt.toISOString(),
    };
  }

  private mapAttachment(a: any): MedicalAttachmentResponseDto {
    return {
      id: a.id,
      medicalRecordId: a.medicalRecordId || undefined,
      patientProfileId: a.patientProfileId,
      fileName: a.fileName,
      originalName: a.originalName,
      fileSize: a.fileSize,
      mimeType: a.mimeType,
      category: a.category,
      storageKey: a.storageKey,
      storageUrl: a.storageUrl,
      checksum: a.checksum || undefined,
      version: a.version,
      isDeleted: a.isDeleted,
      virusScanStatus: a.virusScanStatus,
      createdAt: a.createdAt.toISOString(),
      updatedAt: a.updatedAt.toISOString(),
    };
  }

  // ─── Medical Records Lifecycle ────────────────────────────────────────────

  async createRecord(userId: string, dto: CreateMedicalRecordDto): Promise<MedicalRecordResponseDto> {
    const profileId = await this.resolveProfile(userId);

    // Calculate BMI if vitals provided
    if (dto.vitalSigns && dto.vitalSigns.heightCm && dto.vitalSigns.weightKg) {
      (dto.vitalSigns as any).bmi = this.calculateBmi(dto.vitalSigns.heightCm, dto.vitalSigns.weightKg);
    }

    const record = await this.repository.createRecord(profileId, {
      ...dto,
      createdById: userId,
    });

    await this.repository.createAuditLog({
      medicalRecordId: record.id,
      action: 'CREATED',
      performedBy: userId,
      details: `Created medical record: ${record.title}`,
    });

    return this.mapRecord(record);
  }

  async getRecords(userId: string): Promise<MedicalRecordResponseDto[]> {
    const profileId = await this.resolveProfile(userId);
    const records = await this.repository.findRecordsByProfile(profileId, true);
    return records.map((r) => this.mapRecord(r));
  }

  async getRecordById(userId: string, recordId: string): Promise<MedicalRecordResponseDto> {
    const profileId = await this.resolveProfile(userId);
    const record = await this.repository.findRecordById(recordId);

    if (!record) throw new NotFoundException('Medical record not found');
    if (record.patientProfileId !== profileId) throw new ForbiddenException('Access denied');

    return this.mapRecord(record);
  }

  async updateRecord(userId: string, recordId: string, dto: UpdateMedicalRecordDto): Promise<MedicalRecordResponseDto> {
    const profileId = await this.resolveProfile(userId);
    const record = await this.repository.findRecordById(recordId);

    if (!record) throw new NotFoundException('Medical record not found');
    if (record.patientProfileId !== profileId) throw new ForbiddenException('Access denied');
    if (record.status === 'ARCHIVED') {
      throw new BadRequestException('Archived medical records are immutable and cannot be updated. Restore it first.');
    }

    const updated = await this.repository.updateRecord(recordId, dto);

    await this.repository.createAuditLog({
      medicalRecordId: recordId,
      action: 'UPDATED',
      performedBy: userId,
      details: `Updated medical record fields`,
    });

    return this.mapRecord(updated);
  }

  async softDeleteRecord(userId: string, recordId: string): Promise<{ message: string }> {
    const profileId = await this.resolveProfile(userId);
    const record = await this.repository.findRecordById(recordId);

    if (!record) throw new NotFoundException('Medical record not found');
    if (record.patientProfileId !== profileId) throw new ForbiddenException('Access denied');

    await this.repository.softDeleteRecord(recordId);

    await this.repository.createAuditLog({
      medicalRecordId: recordId,
      action: 'SOFT_DELETED',
      performedBy: userId,
    });

    return { message: 'Medical record soft-deleted successfully' };
  }

  async archiveRecord(userId: string, recordId: string): Promise<MedicalRecordResponseDto> {
    const profileId = await this.resolveProfile(userId);
    const record = await this.repository.findRecordById(recordId);

    if (!record) throw new NotFoundException('Medical record not found');
    if (record.patientProfileId !== profileId) throw new ForbiddenException('Access denied');
    if (record.status === 'ARCHIVED') throw new BadRequestException('Record is already archived');

    const updated = await this.repository.updateRecord(recordId, { status: 'ARCHIVED' });

    await this.repository.createAuditLog({
      medicalRecordId: recordId,
      action: 'ARCHIVED',
      performedBy: userId,
    });

    return this.mapRecord(updated);
  }

  async restoreRecord(userId: string, recordId: string): Promise<MedicalRecordResponseDto> {
    const profileId = await this.resolveProfile(userId);
    const record = await this.repository.findRecordById(recordId, true);

    if (!record) throw new NotFoundException('Medical record not found');
    if (record.patientProfileId !== profileId) throw new ForbiddenException('Access denied');
    if (!record.isDeleted && record.status !== 'ARCHIVED') {
      throw new BadRequestException('Record is not deleted or archived');
    }

    const restored = await this.repository.restoreRecord(recordId);

    await this.repository.createAuditLog({
      medicalRecordId: recordId,
      action: 'RESTORED',
      performedBy: userId,
    });

    return this.mapRecord(restored);
  }

  async searchRecords(userId: string, query: string): Promise<MedicalRecordResponseDto[]> {
    const profileId = await this.resolveProfile(userId);
    if (!query || query.trim().length === 0) {
      return this.getRecords(userId);
    }
    const records = await this.repository.searchRecords(profileId, query.trim());
    return records.map((r) => this.mapRecord(r));
  }

  async getTimeline(userId: string): Promise<MedicalTimelineItemDto[]> {
    const profileId = await this.resolveProfile(userId);
    const rawEvents = await this.repository.getTimeline(profileId);
    return rawEvents.map((e) => ({
      id: e.id,
      eventType: e.eventType,
      title: e.title,
      status: e.status || undefined,
      category: e.category || undefined,
      date: new Date(e.date).toISOString(),
      details: e.details,
    }));
  }

  // ─── Attachments Infrastructure ──────────────────────────────────────────

  async uploadAttachment(
    userId: string,
    recordId: string | null,
    dto: CreateAttachmentDto,
  ): Promise<MedicalAttachmentResponseDto> {
    const profileId = await this.resolveProfile(userId);

    // Validate MIME type
    if (!ALLOWED_MIME_TYPES.includes(dto.mimeType.toLowerCase())) {
      throw new BadRequestException(`MIME type '${dto.mimeType}' is not supported. Allowed: ${ALLOWED_MIME_TYPES.join(', ')}`);
    }

    // Validate File Size
    if (dto.fileSize > MAX_FILE_SIZE) {
      throw new BadRequestException(`File size exceeds maximum limit of 15MB (${dto.fileSize} bytes provided).`);
    }

    // If recordId provided, verify record ownership
    if (recordId) {
      const record = await this.repository.findRecordById(recordId);
      if (!record) throw new NotFoundException('Target medical record not found');
      if (record.patientProfileId !== profileId) throw new ForbiddenException('Access denied');
    }

    const sanitizedFileName = this.sanitizeFilename(dto.fileName);

    const attachment = await this.repository.createAttachment({
      medicalRecordId: recordId,
      patientProfileId: profileId,
      fileName: sanitizedFileName,
      originalName: dto.originalName,
      fileSize: dto.fileSize,
      mimeType: dto.mimeType,
      category: dto.category || 'OTHER',
      storageKey: dto.storageKey,
      storageUrl: dto.storageUrl,
      checksum: dto.checksum,
      virusScanStatus: 'CLEAN', // Placeholder: architecture hook ready for scanner service
      createdById: userId,
    });

    await this.repository.createAuditLog({
      medicalRecordId: recordId || undefined,
      attachmentId: attachment.id,
      action: 'ATTACHMENT_UPLOADED',
      performedBy: userId,
      details: `Uploaded attachment: ${sanitizedFileName}`,
    });

    return this.mapAttachment(attachment);
  }

  async getRecordAttachments(userId: string, recordId: string): Promise<MedicalAttachmentResponseDto[]> {
    const profileId = await this.resolveProfile(userId);
    const record = await this.repository.findRecordById(recordId);

    if (!record) throw new NotFoundException('Medical record not found');
    if (record.patientProfileId !== profileId) throw new ForbiddenException('Access denied');

    const attachments = await this.repository.findAttachmentsByRecord(recordId);
    return attachments.map((a) => this.mapAttachment(a));
  }

  async getAttachmentById(userId: string, attachmentId: string): Promise<MedicalAttachmentResponseDto> {
    const profileId = await this.resolveProfile(userId);
    const attachment = await this.repository.findAttachmentById(attachmentId);

    if (!attachment) throw new NotFoundException('Attachment not found');
    if (attachment.patientProfileId !== profileId) throw new ForbiddenException('Access denied');

    return this.mapAttachment(attachment);
  }

  async updateAttachment(userId: string, attachmentId: string, dto: UpdateAttachmentDto): Promise<MedicalAttachmentResponseDto> {
    const profileId = await this.resolveProfile(userId);
    const attachment = await this.repository.findAttachmentById(attachmentId);

    if (!attachment) throw new NotFoundException('Attachment not found');
    if (attachment.patientProfileId !== profileId) throw new ForbiddenException('Access denied');

    const updated = await this.repository.updateAttachment(attachmentId, {
      ...dto,
      createdById: userId,
    });

    await this.repository.createAuditLog({
      attachmentId,
      action: 'ATTACHMENT_UPDATED',
      performedBy: userId,
      details: dto.storageKey ? 'Uploaded new attachment version' : 'Updated attachment metadata',
    });

    return this.mapAttachment(updated);
  }

  async softDeleteAttachment(userId: string, attachmentId: string): Promise<{ message: string }> {
    const profileId = await this.resolveProfile(userId);
    const attachment = await this.repository.findAttachmentById(attachmentId);

    if (!attachment) throw new NotFoundException('Attachment not found');
    if (attachment.patientProfileId !== profileId) throw new ForbiddenException('Access denied');

    await this.repository.softDeleteAttachment(attachmentId);

    await this.repository.createAuditLog({
      attachmentId,
      action: 'ATTACHMENT_DELETED',
      performedBy: userId,
    });

    return { message: 'Attachment soft-deleted successfully' };
  }

  async restoreAttachment(userId: string, attachmentId: string): Promise<MedicalAttachmentResponseDto> {
    const profileId = await this.resolveProfile(userId);
    const attachment = await this.repository.findAttachmentById(attachmentId, true);

    if (!attachment) throw new NotFoundException('Attachment not found');
    if (attachment.patientProfileId !== profileId) throw new ForbiddenException('Access denied');
    if (!attachment.isDeleted) throw new BadRequestException('Attachment is not deleted');

    const restored = await this.repository.restoreAttachment(attachmentId);

    await this.repository.createAuditLog({
      attachmentId,
      action: 'ATTACHMENT_RESTORED',
      performedBy: userId,
    });

    return this.mapAttachment(restored);
  }

  async getAttachmentVersions(userId: string, attachmentId: string): Promise<AttachmentVersionResponseDto[]> {
    const profileId = await this.resolveProfile(userId);
    const attachment = await this.repository.findAttachmentById(attachmentId, true);

    if (!attachment) throw new NotFoundException('Attachment not found');
    if (attachment.patientProfileId !== profileId) throw new ForbiddenException('Access denied');

    const versions = await this.repository.findAttachmentVersions(attachmentId);
    return versions.map((v) => ({
      id: v.id,
      attachmentId: v.attachmentId,
      version: v.version,
      storageKey: v.storageKey,
      storageUrl: v.storageUrl,
      fileSize: v.fileSize,
      createdById: v.createdById || undefined,
      createdAt: v.createdAt.toISOString(),
    }));
  }
}

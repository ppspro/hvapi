import { Injectable, NotFoundException, BadRequestException, ForbiddenException, Inject } from '@nestjs/common';
import { IImmunisationRepository } from '../../domain/repositories/immunisation.repository.interface';
import {
  CreateVaccineDto, CreateVaccinationScheduleDto, CreateVaccinationRecordDto,
  AdministerDoseDto, DeferDoseDto, CreateCertificateDto, ReminderConfigDto, RecordActionDto,
} from '../../presentation/dto/create-vaccine.dto';
import {
  VaccineResponseDto, VaccinationScheduleResponseDto, VaccinationRecordResponseDto,
  VaccinationCertificateResponseDto, ReminderConfigResponseDto, ImmunisationStatsResponseDto,
} from '../../presentation/dto/immunisation-response.dto';
import { QrService } from '@modules/qr/application/use-cases/qr.service';
import { QrEntityType } from '@modules/qr/presentation/dto/generate-qr.dto';
import { Logger } from 'nestjs-pino';

@Injectable()
export class ImmunisationService {
  constructor(
    @Inject('IImmunisationRepository')
    private readonly repository: IImmunisationRepository,
    private readonly qrService: QrService,
    private readonly logger: Logger,
  ) {}

  private async resolveProfile(userId: string): Promise<string> {
    const profile = await this.repository.findProfileByUserId(userId);
    if (!profile) {
      throw new NotFoundException('Patient profile not found. Complete demographics onboarding first.');
    }
    return profile.id;
  }

  private mapVaccine(v: any): VaccineResponseDto {
    return {
      id: v.id,
      name: v.name,
      code: v.code,
      manufacturer: v.manufacturer || undefined,
      targetGroup: v.targetGroup,
      minAgeMonths: v.minAgeMonths,
      maxAgeMonths: v.maxAgeMonths || undefined,
      totalDosesRequired: v.totalDosesRequired,
      minIntervalDays: v.minIntervalDays,
      description: v.description || undefined,
      contraindications: v.contraindications || [],
      isActive: v.isActive,
      createdAt: v.createdAt.toISOString(),
    };
  }

  private mapSchedule(s: any): VaccinationScheduleResponseDto {
    return {
      id: s.id,
      vaccineId: s.vaccineId,
      name: s.name,
      doseNumber: s.doseNumber,
      recommendedAgeMonths: s.recommendedAgeMonths,
      isBooster: s.isBooster,
      boosterIntervalDays: s.boosterIntervalDays || undefined,
      createdAt: s.createdAt.toISOString(),
    };
  }

  private mapRecord(r: any): VaccinationRecordResponseDto {
    return {
      id: r.id,
      patientProfileId: r.patientProfileId,
      vaccineId: r.vaccineId,
      scheduleId: r.scheduleId || undefined,
      doseNumber: r.doseNumber,
      status: r.status,
      dueDate: r.dueDate ? new Date(r.dueDate).toISOString().split('T')[0] : undefined,
      administeredDate: r.administeredDate ? new Date(r.administeredDate).toISOString().split('T')[0] : undefined,
      administeredBy: r.administeredBy || undefined,
      facilityName: r.facilityName || undefined,
      batchNumber: r.batchNumber || undefined,
      lotNumber: r.lotNumber || undefined,
      expirationDate: r.expirationDate ? new Date(r.expirationDate).toISOString().split('T')[0] : undefined,
      siteOfInjection: r.siteOfInjection || undefined,
      routeOfAdmin: r.routeOfAdmin || undefined,
      notes: r.notes || undefined,
      isDeleted: r.isDeleted,
      vaccine: r.vaccine ? this.mapVaccine(r.vaccine) : undefined,
      schedule: r.schedule ? this.mapSchedule(r.schedule) : undefined,
      createdAt: r.createdAt.toISOString(),
      updatedAt: r.updatedAt.toISOString(),
    };
  }

  private mapCert(c: any): VaccinationCertificateResponseDto {
    return {
      id: c.id,
      patientProfileId: c.patientProfileId,
      recordId: c.recordId,
      certificateNumber: c.certificateNumber,
      issueDate: c.issueDate.toISOString(),
      verificationStatus: c.verificationStatus,
      qrToken: c.qrToken || undefined,
      reportAttachmentId: c.reportAttachmentId || undefined,
      version: c.version,
      createdAt: c.createdAt.toISOString(),
    };
  }

  // ─── Vaccine & Schedule Directory ──────────────────────────────────────────

  async createVaccine(dto: CreateVaccineDto): Promise<VaccineResponseDto> {
    const vaccine = await this.repository.createVaccine(dto);
    return this.mapVaccine(vaccine);
  }

  async getVaccines(): Promise<VaccineResponseDto[]> {
    const vaccines = await this.repository.findVaccines();
    return vaccines.map((v) => this.mapVaccine(v));
  }

  async createSchedule(dto: CreateVaccinationScheduleDto): Promise<VaccinationScheduleResponseDto> {
    const schedule = await this.repository.createSchedule(dto);
    return this.mapSchedule(schedule);
  }

  async getSchedules(vaccineId?: string): Promise<VaccinationScheduleResponseDto[]> {
    const schedules = await this.repository.findSchedules(vaccineId);
    return schedules.map((s) => this.mapSchedule(s));
  }

  // ─── Vaccination Records Lifecycle ─────────────────────────────────────────

  async createRecord(userId: string, dto: CreateVaccinationRecordDto): Promise<VaccinationRecordResponseDto> {
    const profileId = await this.resolveProfile(userId);
    const vaccine = await this.repository.findVaccineById(dto.vaccineId);

    if (!vaccine) {
      throw new NotFoundException('Vaccine not found');
    }

    const record = await this.repository.createRecord({
      ...dto,
      patientProfileId: profileId,
      status: 'SCHEDULED',
    });

    await this.repository.createAuditLog({
      recordId: record.id,
      action: 'SCHEDULED',
      performedBy: userId,
      details: `Scheduled dose ${record.doseNumber} for ${vaccine.name}`,
    });

    return this.mapRecord(record);
  }

  async getRecords(userId: string): Promise<VaccinationRecordResponseDto[]> {
    const profileId = await this.resolveProfile(userId);
    const records = await this.repository.findRecordsByProfile(profileId);
    return records.map((r) => this.mapRecord(r));
  }

  async getRecordById(userId: string, id: string): Promise<VaccinationRecordResponseDto> {
    const profileId = await this.resolveProfile(userId);
    const record = await this.repository.findRecordById(id);

    if (!record) throw new NotFoundException('Vaccination record not found');
    if (record.patientProfileId !== profileId) throw new ForbiddenException('Access denied');

    return this.mapRecord(record);
  }

  async updateRecord(userId: string, id: string, dto: Partial<CreateVaccinationRecordDto>): Promise<VaccinationRecordResponseDto> {
    const profileId = await this.resolveProfile(userId);
    const record = await this.repository.findRecordById(id);

    if (!record) throw new NotFoundException('Vaccination record not found');
    if (record.patientProfileId !== profileId) throw new ForbiddenException('Access denied');
    if (record.status === 'ARCHIVED') {
      throw new BadRequestException('Archived records cannot be modified');
    }

    const updated = await this.repository.updateRecord(id, dto);

    await this.repository.createAuditLog({
      recordId: id,
      action: 'UPDATED',
      performedBy: userId,
      details: 'Updated vaccination record details',
    });

    return this.mapRecord(updated);
  }

  async administerDose(userId: string, id: string, dto: AdministerDoseDto): Promise<VaccinationRecordResponseDto> {
    const profileId = await this.resolveProfile(userId);
    const record = await this.repository.findRecordById(id);

    if (!record) throw new NotFoundException('Vaccination record not found');
    if (record.patientProfileId !== profileId) throw new ForbiddenException('Access denied');

    const prevStatus = record.status;
    const updated = await this.repository.updateRecord(id, {
      ...dto,
      status: 'ADMINISTERED',
      administeredDate: new Date(),
    });

    await this.repository.createHistory(id, {
      action: 'ADMINISTERED',
      previousStatus: prevStatus,
      newStatus: 'ADMINISTERED',
      reason: `Administered by ${dto.administeredBy} at ${dto.facilityName}`,
      performedBy: userId,
    });

    await this.repository.createAuditLog({
      recordId: id,
      action: 'ADMINISTERED',
      performedBy: userId,
      details: `Administered dose batch ${dto.batchNumber}`,
    });

    return this.mapRecord(updated);
  }

  async completeRecord(userId: string, id: string, dto: RecordActionDto): Promise<VaccinationRecordResponseDto> {
    const profileId = await this.resolveProfile(userId);
    const record = await this.repository.findRecordById(id);

    if (!record) throw new NotFoundException('Vaccination record not found');
    if (record.patientProfileId !== profileId) throw new ForbiddenException('Access denied');

    const prevStatus = record.status;
    const updated = await this.repository.updateRecord(id, { status: 'COMPLETED' });

    await this.repository.createHistory(id, {
      action: 'COMPLETED',
      previousStatus: prevStatus,
      newStatus: 'COMPLETED',
      reason: dto.reason || 'Vaccination series completed',
      performedBy: userId,
    });

    return this.mapRecord(updated);
  }

  async deferRecord(userId: string, id: string, dto: DeferDoseDto): Promise<VaccinationRecordResponseDto> {
    const profileId = await this.resolveProfile(userId);
    const record = await this.repository.findRecordById(id);

    if (!record) throw new NotFoundException('Vaccination record not found');
    if (record.patientProfileId !== profileId) throw new ForbiddenException('Access denied');

    const prevStatus = record.status;
    const updated = await this.repository.updateRecord(id, {
      status: 'DEFERRED',
      dueDate: dto.rescheduledDueDate ? new Date(dto.rescheduledDueDate) : undefined,
    });

    await this.repository.createHistory(id, {
      action: 'DEFERRED',
      previousStatus: prevStatus,
      newStatus: 'DEFERRED',
      reason: dto.reason,
      performedBy: userId,
    });

    return this.mapRecord(updated);
  }

  async archiveRecord(userId: string, id: string, dto: RecordActionDto): Promise<VaccinationRecordResponseDto> {
    const profileId = await this.resolveProfile(userId);
    const record = await this.repository.findRecordById(id);

    if (!record) throw new NotFoundException('Vaccination record not found');
    if (record.patientProfileId !== profileId) throw new ForbiddenException('Access denied');

    const prevStatus = record.status;
    const updated = await this.repository.updateRecord(id, { status: 'ARCHIVED' });

    await this.repository.createHistory(id, {
      action: 'ARCHIVED',
      previousStatus: prevStatus,
      newStatus: 'ARCHIVED',
      reason: dto.reason || 'Record archived',
      performedBy: userId,
    });

    return this.mapRecord(updated);
  }

  async restoreRecord(userId: string, id: string, dto: RecordActionDto): Promise<VaccinationRecordResponseDto> {
    const profileId = await this.resolveProfile(userId);
    const record = await this.repository.findRecordById(id, true);

    if (!record) throw new NotFoundException('Vaccination record not found');
    if (record.patientProfileId !== profileId) throw new ForbiddenException('Access denied');

    const prevStatus = record.status;
    const updated = await this.repository.updateRecord(id, {
      status: 'SCHEDULED',
      isDeleted: false,
      deletedAt: null,
    });

    await this.repository.createHistory(id, {
      action: 'RESTORED',
      previousStatus: prevStatus,
      newStatus: 'SCHEDULED',
      reason: dto.reason || 'Record restored',
      performedBy: userId,
    });

    return this.mapRecord(updated);
  }

  // ─── Digital Vaccine Certificates & QR ────────────────────────────────────

  async generateCertificate(userId: string, dto: CreateCertificateDto): Promise<VaccinationCertificateResponseDto> {
    const profileId = await this.resolveProfile(userId);
    const record = await this.repository.findRecordById(dto.recordId);

    if (!record) throw new NotFoundException('Vaccination record not found');
    if (record.patientProfileId !== profileId) throw new ForbiddenException('Access denied');

    let qrToken: string | undefined;
    try {
      const qr = await this.qrService.generateQr(userId, {
        entityId: record.id,
        entityType: QrEntityType.IMMUNISATION,
      });
      qrToken = qr.token;
    } catch (err) {
      this.logger.warn({ msg: 'QR generation skipped for vaccination certificate', err });
    }

    const cert = await this.repository.createCertificate({
      patientProfileId: profileId,
      recordId: dto.recordId,
      qrToken,
      reportAttachmentId: dto.reportAttachmentId || null,
    });

    await this.repository.createAuditLog({
      recordId: dto.recordId,
      action: 'CERTIFICATE_ISSUED',
      performedBy: userId,
      details: `Issued digital certificate ${cert.certificateNumber}`,
    });

    return this.mapCert(cert);
  }

  async getCertificates(userId: string): Promise<VaccinationCertificateResponseDto[]> {
    const profileId = await this.resolveProfile(userId);
    const certs = await this.repository.findCertificatesByProfile(profileId);
    return certs.map((c) => this.mapCert(c));
  }

  // ─── Reminder Infrastructure ──────────────────────────────────────────────

  async configureReminder(userId: string, dto: ReminderConfigDto): Promise<ReminderConfigResponseDto> {
    const profileId = await this.resolveProfile(userId);
    const config = await this.repository.upsertReminderConfig(profileId, dto);
    return {
      id: config.id,
      patientProfileId: config.patientProfileId,
      vaccineId: config.vaccineId,
      reminderDaysBefore: config.reminderDaysBefore,
      enableEmail: config.enableEmail,
      enableSms: config.enableSms,
      enablePush: config.enablePush,
      createdAt: config.createdAt.toISOString(),
    };
  }

  // ─── Search & Statistics ──────────────────────────────────────────────────

  async searchRecords(query: string): Promise<VaccinationRecordResponseDto[]> {
    if (!query || query.trim().length === 0) return [];
    const records = await this.repository.searchRecords(query.trim());
    return records.map((r) => this.mapRecord(r));
  }

  async getStatistics(): Promise<ImmunisationStatsResponseDto> {
    return this.repository.getStatistics();
  }
}

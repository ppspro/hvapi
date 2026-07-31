import { Injectable } from '@nestjs/common';
import { DatabaseService } from '@database/database.service';
import { IImmunisationRepository } from '../../domain/repositories/immunisation.repository.interface';
import {
  VaccineEntity,
  VaccinationScheduleEntity,
  VaccinationRecordEntity,
  VaccinationCertificateEntity,
  VaccinationReminderConfigEntity,
  VaccinationHistoryEntity,
  VaccinationAuditLogEntity,
} from '../../domain/entities/immunisation.entity';

@Injectable()
export class ImmunisationRepository implements IImmunisationRepository {
  constructor(private readonly db: DatabaseService) {}

  async findProfileByUserId(userId: string): Promise<{ id: string } | null> {
    return this.db.patientProfile.findUnique({ where: { userId }, select: { id: true } });
  }

  async createVaccine(data: any): Promise<VaccineEntity> {
    return (await this.db.vaccine.create({
      data: {
        name: data.name,
        code: data.code,
        manufacturer: data.manufacturer || null,
        targetGroup: data.targetGroup as any || 'ALL',
        minAgeMonths: data.minAgeMonths || 0,
        maxAgeMonths: data.maxAgeMonths || null,
        totalDosesRequired: data.totalDosesRequired || 1,
        minIntervalDays: data.minIntervalDays || 0,
        description: data.description || null,
        contraindications: data.contraindications || [],
        isActive: data.isActive ?? true,
      },
    })) as unknown as VaccineEntity;
  }

  async findVaccines(): Promise<VaccineEntity[]> {
    return (await this.db.vaccine.findMany({
      where: { isActive: true },
      orderBy: { name: 'asc' },
    })) as unknown as VaccineEntity[];
  }

  async findVaccineById(id: string): Promise<VaccineEntity | null> {
    return (await this.db.vaccine.findUnique({
      where: { id },
    })) as unknown as VaccineEntity | null;
  }

  async createSchedule(data: any): Promise<VaccinationScheduleEntity> {
    return (await this.db.vaccinationSchedule.create({
      data: {
        vaccineId: data.vaccineId,
        name: data.name,
        doseNumber: data.doseNumber,
        recommendedAgeMonths: data.recommendedAgeMonths,
        isBooster: data.isBooster ?? false,
        boosterIntervalDays: data.boosterIntervalDays || null,
      },
    })) as unknown as VaccinationScheduleEntity;
  }

  async findSchedules(vaccineId?: string): Promise<VaccinationScheduleEntity[]> {
    return (await this.db.vaccinationSchedule.findMany({
      where: vaccineId ? { vaccineId } : {},
      orderBy: { doseNumber: 'asc' },
    })) as unknown as VaccinationScheduleEntity[];
  }

  async createRecord(data: any): Promise<VaccinationRecordEntity> {
    const record = await this.db.vaccinationRecord.create({
      data: {
        patientProfileId: data.patientProfileId,
        vaccineId: data.vaccineId,
        scheduleId: data.scheduleId || null,
        doseNumber: data.doseNumber || 1,
        status: data.status || 'SCHEDULED',
        dueDate: data.dueDate ? new Date(data.dueDate) : null,
        administeredDate: data.administeredDate ? new Date(data.administeredDate) : null,
        administeredBy: data.administeredBy || null,
        facilityName: data.facilityName || null,
        batchNumber: data.batchNumber || null,
        lotNumber: data.lotNumber || null,
        expirationDate: data.expirationDate ? new Date(data.expirationDate) : null,
        siteOfInjection: data.siteOfInjection || null,
        routeOfAdmin: data.routeOfAdmin || null,
        notes: data.notes || null,
      },
      include: { vaccine: true, schedule: true, certificates: true, history: true },
    });

    await this.createHistory(record.id, {
      action: 'SCHEDULED',
      newStatus: record.status,
      reason: 'Scheduled vaccination dose',
    });

    return record as unknown as VaccinationRecordEntity;
  }

  async findRecordById(id: string, includeDeleted = false): Promise<VaccinationRecordEntity | null> {
    return (await this.db.vaccinationRecord.findFirst({
      where: { id, ...(includeDeleted ? {} : { isDeleted: false }) },
      include: { vaccine: true, schedule: true, certificates: true, history: { orderBy: { createdAt: 'desc' } } },
    })) as unknown as VaccinationRecordEntity | null;
  }

  async findRecordsByProfile(patientProfileId: string, includeDeleted = false): Promise<VaccinationRecordEntity[]> {
    return (await this.db.vaccinationRecord.findMany({
      where: { patientProfileId, ...(includeDeleted ? {} : { isDeleted: false }) },
      include: { vaccine: true, schedule: true, certificates: true, history: { orderBy: { createdAt: 'desc' } } },
      orderBy: { createdAt: 'desc' },
    })) as unknown as VaccinationRecordEntity[];
  }

  async updateRecord(id: string, data: any): Promise<VaccinationRecordEntity> {
    return (await this.db.vaccinationRecord.update({
      where: { id },
      data: {
        status: data.status as any || undefined,
        dueDate: data.dueDate ? new Date(data.dueDate) : undefined,
        administeredDate: data.administeredDate ? new Date(data.administeredDate) : undefined,
        administeredBy: data.administeredBy || undefined,
        facilityName: data.facilityName || undefined,
        batchNumber: data.batchNumber || undefined,
        lotNumber: data.lotNumber || undefined,
        expirationDate: data.expirationDate ? new Date(data.expirationDate) : undefined,
        siteOfInjection: data.siteOfInjection || undefined,
        routeOfAdmin: data.routeOfAdmin || undefined,
        notes: data.notes || undefined,
        isDeleted: data.isDeleted ?? undefined,
        deletedAt: data.deletedAt || undefined,
      },
      include: { vaccine: true, schedule: true, certificates: true, history: { orderBy: { createdAt: 'desc' } } },
    })) as unknown as VaccinationRecordEntity;
  }

  async softDeleteRecord(id: string): Promise<void> {
    await this.db.vaccinationRecord.update({
      where: { id },
      data: { isDeleted: true, deletedAt: new Date() },
    });
  }

  async searchRecords(query: string): Promise<VaccinationRecordEntity[]> {
    const q = query.toLowerCase();
    return (await this.db.vaccinationRecord.findMany({
      where: {
        isDeleted: false,
        OR: [
          { vaccine: { name: { contains: q, mode: 'insensitive' } } },
          { vaccine: { code: { contains: q, mode: 'insensitive' } } },
          { batchNumber: { contains: q, mode: 'insensitive' } },
          { facilityName: { contains: q, mode: 'insensitive' } },
        ],
      },
      include: { vaccine: true, schedule: true, certificates: true },
      orderBy: { createdAt: 'desc' },
    })) as unknown as VaccinationRecordEntity[];
  }

  async createCertificate(data: any): Promise<VaccinationCertificateEntity> {
    const certificateNumber = `VAC-CERT-${Date.now()}-${Math.floor(Math.random() * 10000)}`;
    return (await this.db.vaccinationCertificate.create({
      data: {
        patientProfileId: data.patientProfileId,
        recordId: data.recordId,
        certificateNumber,
        issueDate: new Date(),
        verificationStatus: 'VERIFIED',
        qrToken: data.qrToken || null,
        reportAttachmentId: data.reportAttachmentId || null,
        version: 1,
      },
    })) as unknown as VaccinationCertificateEntity;
  }

  async findCertificatesByProfile(patientProfileId: string): Promise<VaccinationCertificateEntity[]> {
    return (await this.db.vaccinationCertificate.findMany({
      where: { patientProfileId },
      orderBy: { createdAt: 'desc' },
    })) as unknown as VaccinationCertificateEntity[];
  }

  async upsertReminderConfig(patientProfileId: string, data: any): Promise<VaccinationReminderConfigEntity> {
    const existing = await this.db.vaccinationReminderConfig.findFirst({
      where: { patientProfileId, vaccineId: data.vaccineId },
    });

    if (existing) {
      return (await this.db.vaccinationReminderConfig.update({
        where: { id: existing.id },
        data: {
          reminderDaysBefore: data.reminderDaysBefore ?? existing.reminderDaysBefore,
          enableEmail: data.enableEmail ?? existing.enableEmail,
          enableSms: data.enableSms ?? existing.enableSms,
          enablePush: data.enablePush ?? existing.enablePush,
        },
      })) as unknown as VaccinationReminderConfigEntity;
    }

    return (await this.db.vaccinationReminderConfig.create({
      data: {
        patientProfileId,
        vaccineId: data.vaccineId,
        reminderDaysBefore: data.reminderDaysBefore || 7,
        enableEmail: data.enableEmail ?? true,
        enableSms: data.enableSms ?? false,
        enablePush: data.enablePush ?? true,
      },
    })) as unknown as VaccinationReminderConfigEntity;
  }

  async createHistory(recordId: string, data: {
    action: string;
    previousStatus?: string;
    newStatus: string;
    reason?: string;
    performedBy?: string;
  }): Promise<VaccinationHistoryEntity> {
    return (await this.db.vaccinationHistory.create({
      data: {
        recordId,
        action: data.action,
        previousStatus: data.previousStatus || null,
        newStatus: data.newStatus,
        reason: data.reason || null,
        performedBy: data.performedBy || null,
      },
    })) as unknown as VaccinationHistoryEntity;
  }

  async createAuditLog(data: {
    recordId: string;
    action: string;
    performedBy?: string;
    details?: string;
  }): Promise<VaccinationAuditLogEntity> {
    return (await this.db.vaccinationAuditLog.create({
      data: {
        recordId: data.recordId,
        action: data.action,
        performedBy: data.performedBy || null,
        details: data.details || null,
      },
    })) as unknown as VaccinationAuditLogEntity;
  }

  async getStatistics() {
    const totalVaccines = await this.db.vaccine.count({ where: { isActive: true } });
    const totalRecords = await this.db.vaccinationRecord.count({ where: { isDeleted: false } });
    const administeredDoses = await this.db.vaccinationRecord.count({ where: { status: 'ADMINISTERED', isDeleted: false } });
    const totalCertificates = await this.db.vaccinationCertificate.count();

    return {
      totalVaccines,
      totalRecords,
      administeredDoses,
      totalCertificates,
    };
  }
}

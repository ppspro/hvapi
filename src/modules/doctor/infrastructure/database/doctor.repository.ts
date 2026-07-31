import { Injectable } from '@nestjs/common';
import { DatabaseService } from '@database/database.service';
import { IDoctorRepository } from '../../domain/repositories/doctor.repository.interface';
import {
  DoctorProfileEntity,
  DoctorQualificationEntity,
  DoctorCertificationEntity,
  DoctorExperienceEntity,
  DoctorDocumentEntity,
  DoctorScheduleSlotEntity,
  DoctorHistoryEntity,
  DoctorAuditLogEntity,
} from '../../domain/entities/doctor.entity';

@Injectable()
export class DoctorRepository implements IDoctorRepository {
  constructor(private readonly db: DatabaseService) {}

  async findProfileByUserId(userId: string): Promise<DoctorProfileEntity | null> {
    return (await this.db.doctorProfile.findUnique({
      where: { userId },
      include: {
        qualifications: true,
        certifications: true,
        experiences: true,
        documents: { include: { medicalAttachment: true } },
        history: { orderBy: { createdAt: 'desc' } },
      },
    })) as unknown as DoctorProfileEntity | null;
  }

  async createDoctor(data: any): Promise<DoctorProfileEntity> {
    const providerIdentifier = `DOC-360-${Date.now().toString().slice(-6)}`;
    const created = await this.db.doctorProfile.create({
      data: {
        userId: data.userId,
        fullName: data.fullName,
        gender: data.gender || null,
        dateOfBirth: data.dateOfBirth ? new Date(data.dateOfBirth) : null,
        profilePhotoUrl: data.profilePhotoUrl || null,
        digitalSignatureUrl: data.digitalSignatureUrl || null,
        biography: data.biography || null,
        professionalSummary: data.professionalSummary || null,
        yearsOfExperience: data.yearsOfExperience || 0,
        primarySpecialization: data.primarySpecialization,
        secondarySpecializations: data.secondarySpecializations || [],
        medicalCouncil: data.medicalCouncil,
        registrationNumber: data.registrationNumber,
        licenseNumber: data.licenseNumber,
        providerIdentifier,
        registrationState: data.registrationState || null,
        registrationCountry: data.registrationCountry || null,
        registrationIssueDate: data.registrationIssueDate ? new Date(data.registrationIssueDate) : null,
        registrationExpiryDate: data.registrationExpiryDate ? new Date(data.registrationExpiryDate) : null,
        verificationStatus: 'PENDING',
        department: data.department || null,
        subSpecializations: data.subSpecializations || [],
        clinicalInterests: data.clinicalInterests || [],
        servicesOffered: data.servicesOffered || [],
        languagesSpoken: data.languagesSpoken || [],
        emergencyPhone: data.emergencyPhone || null,
      },
      include: {
        qualifications: true,
        certifications: true,
        experiences: true,
        documents: true,
        history: true,
      },
    });

    await this.createHistory(created.id, {
      action: 'REGISTERED',
      newStatus: 'PENDING',
      reason: 'Initial master doctor profile registration',
      performedBy: data.userId,
    });

    return created as unknown as DoctorProfileEntity;
  }

  async findDoctorById(id: string, includeDeleted = false): Promise<DoctorProfileEntity | null> {
    return (await this.db.doctorProfile.findFirst({
      where: { id, ...(includeDeleted ? {} : { isDeleted: false }) },
      include: {
        qualifications: true,
        certifications: true,
        experiences: true,
        documents: { include: { medicalAttachment: true } },
        history: { orderBy: { createdAt: 'desc' } },
      },
    })) as unknown as DoctorProfileEntity | null;
  }

  async findDoctorByRegistrationNumber(registrationNumber: string): Promise<DoctorProfileEntity | null> {
    return (await this.db.doctorProfile.findUnique({
      where: { registrationNumber },
    })) as unknown as DoctorProfileEntity | null;
  }

  async findDoctorByLicenseNumber(licenseNumber: string): Promise<DoctorProfileEntity | null> {
    return (await this.db.doctorProfile.findUnique({
      where: { licenseNumber },
    })) as unknown as DoctorProfileEntity | null;
  }

  async findDoctorByProviderIdentifier(providerIdentifier: string): Promise<DoctorProfileEntity | null> {
    return (await this.db.doctorProfile.findUnique({
      where: { providerIdentifier },
    })) as unknown as DoctorProfileEntity | null;
  }

  async findDoctors(includeDeleted = false): Promise<DoctorProfileEntity[]> {
    return (await this.db.doctorProfile.findMany({
      where: includeDeleted ? {} : { isDeleted: false },
      include: {
        qualifications: true,
        certifications: true,
        experiences: true,
        documents: true,
      },
      orderBy: { createdAt: 'desc' },
    })) as unknown as DoctorProfileEntity[];
  }

  async findPendingDoctors(): Promise<DoctorProfileEntity[]> {
    return (await this.db.doctorProfile.findMany({
      where: { verificationStatus: 'PENDING', isDeleted: false },
      include: { qualifications: true, documents: true },
      orderBy: { createdAt: 'desc' },
    })) as unknown as DoctorProfileEntity[];
  }

  async updateDoctor(id: string, data: any): Promise<DoctorProfileEntity> {
    return (await this.db.doctorProfile.update({
      where: { id },
      data: {
        fullName: data.fullName || undefined,
        gender: data.gender || undefined,
        dateOfBirth: data.dateOfBirth ? new Date(data.dateOfBirth) : undefined,
        profilePhotoUrl: data.profilePhotoUrl || undefined,
        digitalSignatureUrl: data.digitalSignatureUrl || undefined,
        biography: data.biography || undefined,
        professionalSummary: data.professionalSummary || undefined,
        yearsOfExperience: data.yearsOfExperience ?? undefined,
        primarySpecialization: data.primarySpecialization || undefined,
        secondarySpecializations: data.secondarySpecializations || undefined,
        medicalCouncil: data.medicalCouncil || undefined,
        registrationNumber: data.registrationNumber || undefined,
        licenseNumber: data.licenseNumber || undefined,
        registrationState: data.registrationState || undefined,
        registrationCountry: data.registrationCountry || undefined,
        registrationIssueDate: data.registrationIssueDate ? new Date(data.registrationIssueDate) : undefined,
        registrationExpiryDate: data.registrationExpiryDate ? new Date(data.registrationExpiryDate) : undefined,
        verificationStatus: data.verificationStatus as any || undefined,
        verificationNotes: data.verificationNotes || undefined,
        verifiedBy: data.verifiedBy || undefined,
        verifiedAt: data.verifiedAt ? new Date(data.verifiedAt) : undefined,
        department: data.department || undefined,
        subSpecializations: data.subSpecializations || undefined,
        clinicalInterests: data.clinicalInterests || undefined,
        servicesOffered: data.servicesOffered || undefined,
        languagesSpoken: data.languagesSpoken || undefined,
        emergencyPhone: data.emergencyPhone || undefined,
        isDeleted: data.isDeleted ?? undefined,
        deletedAt: data.deletedAt || undefined,
      },
      include: {
        qualifications: true,
        certifications: true,
        experiences: true,
        documents: { include: { medicalAttachment: true } },
        history: { orderBy: { createdAt: 'desc' } },
      },
    })) as unknown as DoctorProfileEntity;
  }

  async softDeleteDoctor(id: string): Promise<void> {
    await this.db.doctorProfile.update({
      where: { id },
      data: { isDeleted: true, deletedAt: new Date() },
    });
  }

  async searchDoctors(query: string): Promise<DoctorProfileEntity[]> {
    const q = query.toLowerCase();
    return (await this.db.doctorProfile.findMany({
      where: {
        isDeleted: false,
        OR: [
          { fullName: { contains: q, mode: 'insensitive' } },
          { registrationNumber: { contains: q, mode: 'insensitive' } },
          { licenseNumber: { contains: q, mode: 'insensitive' } },
          { primarySpecialization: { contains: q, mode: 'insensitive' } },
          { department: { contains: q, mode: 'insensitive' } },
        ],
      },
      include: { qualifications: true, documents: true },
      orderBy: { createdAt: 'desc' },
    })) as unknown as DoctorProfileEntity[];
  }

  async addQualification(doctorProfileId: string, data: any): Promise<DoctorQualificationEntity> {
    return (await this.db.doctorQualification.create({
      data: {
        doctorProfileId,
        degreeName: data.degreeName,
        instituteName: data.instituteName,
        passingYear: data.passingYear,
        specialization: data.specialization || null,
      },
    })) as unknown as DoctorQualificationEntity;
  }

  async addCertification(doctorProfileId: string, data: any): Promise<DoctorCertificationEntity> {
    return (await this.db.doctorCertification.create({
      data: {
        doctorProfileId,
        title: data.title,
        issuingAuthority: data.issuingAuthority,
        issueDate: data.issueDate ? new Date(data.issueDate) : null,
        expiryDate: data.expiryDate ? new Date(data.expiryDate) : null,
      },
    })) as unknown as DoctorCertificationEntity;
  }

  async addExperience(doctorProfileId: string, data: any): Promise<DoctorExperienceEntity> {
    return (await this.db.doctorExperience.create({
      data: {
        doctorProfileId,
        designation: data.designation,
        hospitalName: data.hospitalName,
        startDate: new Date(data.startDate),
        endDate: data.endDate ? new Date(data.endDate) : null,
        isCurrent: data.isCurrent ?? false,
      },
    })) as unknown as DoctorExperienceEntity;
  }

  async attachDocument(doctorProfileId: string, data: any): Promise<DoctorDocumentEntity> {
    return (await this.db.doctorDocument.create({
      data: {
        doctorProfileId,
        documentType: data.documentType,
        medicalAttachmentId: data.medicalAttachmentId || null,
        verificationStatus: 'PENDING',
      },
      include: { medicalAttachment: true },
    })) as unknown as DoctorDocumentEntity;
  }

  async findDocumentsByDoctorId(doctorProfileId: string): Promise<DoctorDocumentEntity[]> {
    return (await this.db.doctorDocument.findMany({
      where: { doctorProfileId },
      include: { medicalAttachment: true },
      orderBy: { createdAt: 'desc' },
    })) as unknown as DoctorDocumentEntity[];
  }

  async findSlotsByDoctorId(doctorProfileId: string): Promise<DoctorScheduleSlotEntity[]> {
    return (await this.db.doctorScheduleSlot.findMany({
      where: { doctorProfileId },
      orderBy: { startTime: 'asc' },
    })) as unknown as DoctorScheduleSlotEntity[];
  }

  async createHistory(doctorProfileId: string, data: {
    action: string;
    previousStatus?: string;
    newStatus: string;
    reason?: string;
    performedBy?: string;
  }): Promise<DoctorHistoryEntity> {
    return (await this.db.doctorHistory.create({
      data: {
        doctorProfileId,
        action: data.action,
        previousStatus: data.previousStatus || null,
        newStatus: data.newStatus,
        reason: data.reason || null,
        performedBy: data.performedBy || null,
      },
    })) as unknown as DoctorHistoryEntity;
  }

  async findHistoryByDoctorId(doctorProfileId: string): Promise<DoctorHistoryEntity[]> {
    return (await this.db.doctorHistory.findMany({
      where: { doctorProfileId },
      orderBy: { createdAt: 'desc' },
    })) as unknown as DoctorHistoryEntity[];
  }

  async createAuditLog(data: {
    doctorProfileId: string;
    action: string;
    performedBy?: string;
    details?: string;
  }): Promise<DoctorAuditLogEntity> {
    return (await this.db.doctorAuditLog.create({
      data: {
        doctorProfileId: data.doctorProfileId,
        action: data.action,
        performedBy: data.performedBy || null,
        details: data.details || null,
      },
    })) as unknown as DoctorAuditLogEntity;
  }

  async getStatistics() {
    const totalDoctors = await this.db.doctorProfile.count({ where: { isDeleted: false } });
    const verifiedDoctors = await this.db.doctorProfile.count({ where: { verificationStatus: 'VERIFIED', isDeleted: false } });
    const pendingDoctors = await this.db.doctorProfile.count({ where: { verificationStatus: 'PENDING', isDeleted: false } });
    const suspendedDoctors = await this.db.doctorProfile.count({ where: { verificationStatus: 'SUSPENDED', isDeleted: false } });

    return {
      totalDoctors,
      verifiedDoctors,
      pendingDoctors,
      suspendedDoctors,
    };
  }
}

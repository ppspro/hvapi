import { Injectable, NotFoundException, BadRequestException, ForbiddenException, ConflictException, Inject } from '@nestjs/common';
import { IDoctorRepository } from '../../domain/repositories/doctor.repository.interface';
import {
  RegisterDoctorDto, AddQualificationDto, AddCertificationDto, AddExperienceDto,
  AttachDoctorDocumentDto, DoctorActionDto, RenewLicenseDto,
} from '../../presentation/dto/register-doctor.dto';
import {
  DoctorProfileFullResponseDto, DoctorDocumentResponseDto, DoctorHistoryItemDto, DoctorStatsResponseDto,
} from '../../presentation/dto/doctor-response.dto';
import { DoctorProfileResponseDto, ScheduleSlotResponseDto } from '../../presentation/dto/doctor-profile.dto';
import { QrService } from '@modules/qr/application/use-cases/qr.service';
import { QrEntityType } from '@modules/qr/presentation/dto/generate-qr.dto';
import { Logger } from 'nestjs-pino';

@Injectable()
export class DoctorService {
  constructor(
    @Inject('IDoctorRepository')
    private readonly repository: IDoctorRepository,
    private readonly qrService: QrService,
    private readonly logger: Logger,
  ) {}

  private mapDoctor(d: any): DoctorProfileFullResponseDto {
    return {
      id: d.id,
      userId: d.userId,
      fullName: d.fullName,
      gender: d.gender || undefined,
      dateOfBirth: d.dateOfBirth ? new Date(d.dateOfBirth).toISOString().split('T')[0] : undefined,
      profilePhotoUrl: d.profilePhotoUrl || undefined,
      digitalSignatureUrl: d.digitalSignatureUrl || undefined,
      biography: d.biography || undefined,
      professionalSummary: d.professionalSummary || undefined,
      yearsOfExperience: d.yearsOfExperience,
      primarySpecialization: d.primarySpecialization,
      secondarySpecializations: d.secondarySpecializations || [],
      medicalCouncil: d.medicalCouncil,
      registrationNumber: d.registrationNumber,
      licenseNumber: d.licenseNumber,
      providerIdentifier: d.providerIdentifier,
      registrationState: d.registrationState || undefined,
      registrationCountry: d.registrationCountry || undefined,
      registrationIssueDate: d.registrationIssueDate ? new Date(d.registrationIssueDate).toISOString().split('T')[0] : undefined,
      registrationExpiryDate: d.registrationExpiryDate ? new Date(d.registrationExpiryDate).toISOString().split('T')[0] : undefined,
      verificationStatus: d.verificationStatus,
      verificationNotes: d.verificationNotes || undefined,
      verifiedBy: d.verifiedBy || undefined,
      verifiedAt: d.verifiedAt?.toISOString() || undefined,
      department: d.department || undefined,
      subSpecializations: d.subSpecializations || [],
      clinicalInterests: d.clinicalInterests || [],
      servicesOffered: d.servicesOffered || [],
      languagesSpoken: d.languagesSpoken || [],
      emergencyPhone: d.emergencyPhone || undefined,
      isDeleted: d.isDeleted,
      qualifications: d.qualifications?.map((q: any) => ({
        id: q.id,
        degreeName: q.degreeName,
        instituteName: q.instituteName,
        passingYear: q.passingYear,
        specialization: q.specialization || undefined,
        createdAt: q.createdAt.toISOString(),
      })) || [],
      certifications: d.certifications?.map((c: any) => ({
        id: c.id,
        title: c.title,
        issuingAuthority: c.issuingAuthority,
        issueDate: c.issueDate ? new Date(c.issueDate).toISOString().split('T')[0] : undefined,
        expiryDate: c.expiryDate ? new Date(c.expiryDate).toISOString().split('T')[0] : undefined,
        createdAt: c.createdAt.toISOString(),
      })) || [],
      experiences: d.experiences?.map((e: any) => ({
        id: e.id,
        designation: e.designation,
        hospitalName: e.hospitalName,
        startDate: new Date(e.startDate).toISOString().split('T')[0],
        endDate: e.endDate ? new Date(e.endDate).toISOString().split('T')[0] : undefined,
        isCurrent: e.isCurrent,
        createdAt: e.createdAt.toISOString(),
      })) || [],
      documents: d.documents?.map((doc: any) => ({
        id: doc.id,
        documentType: doc.documentType,
        medicalAttachmentId: doc.medicalAttachmentId || undefined,
        verificationStatus: doc.verificationStatus,
        createdAt: doc.createdAt.toISOString(),
      })) || [],
      createdAt: d.createdAt.toISOString(),
      updatedAt: d.updatedAt.toISOString(),
    };
  }

  // ─── Registration & Profile Management ────────────────────────────────────

  async registerDoctor(userId: string, dto: RegisterDoctorDto): Promise<DoctorProfileFullResponseDto> {
    const existingProfile = await this.repository.findProfileByUserId(userId);
    if (existingProfile) {
      throw new ConflictException('Doctor profile already exists for this user account');
    }

    const regDup = await this.repository.findDoctorByRegistrationNumber(dto.registrationNumber);
    if (regDup) {
      throw new ConflictException('Medical registration number already registered in Master Provider Registry');
    }

    const licDup = await this.repository.findDoctorByLicenseNumber(dto.licenseNumber);
    if (licDup) {
      throw new ConflictException('Medical license number already registered');
    }

    const created = await this.repository.createDoctor({
      ...dto,
      userId,
    });

    // Request QR identity token generation from Enterprise QR Subsystem
    try {
      const qr = await this.qrService.generateQr(userId, {
        entityId: created.id,
        entityType: QrEntityType.DOCTOR_ID,
      });
      (created as any).qrToken = qr.token;
    } catch (err) {
      this.logger.warn({ msg: 'QR generation skipped for doctor profile', err });
    }

    await this.repository.createAuditLog({
      doctorProfileId: created.id,
      action: 'REGISTERED',
      performedBy: userId,
      details: `Master Doctor profile created with provider ID ${created.providerIdentifier}`,
    });

    return this.mapDoctor(created);
  }

  async getDoctors(): Promise<DoctorProfileFullResponseDto[]> {
    const doctors = await this.repository.findDoctors();
    return doctors.map((d) => this.mapDoctor(d));
  }

  async getPendingDoctors(): Promise<DoctorProfileFullResponseDto[]> {
    const doctors = await this.repository.findPendingDoctors();
    return doctors.map((d) => this.mapDoctor(d));
  }

  async getDoctorById(id: string): Promise<DoctorProfileFullResponseDto> {
    const doctor = await this.repository.findDoctorById(id);
    if (!doctor) {
      throw new NotFoundException('Doctor profile not found in Master Registry');
    }
    return this.mapDoctor(doctor);
  }

  async updateDoctor(id: string, dto: Partial<RegisterDoctorDto>): Promise<DoctorProfileFullResponseDto> {
    const doctor = await this.repository.findDoctorById(id);
    if (!doctor) throw new NotFoundException('Doctor profile not found');

    const updated = await this.repository.updateDoctor(id, dto);

    await this.repository.createAuditLog({
      doctorProfileId: id,
      action: 'UPDATED',
      details: 'Updated master doctor profile details',
    });

    return this.mapDoctor(updated);
  }

  async softDeleteDoctor(id: string): Promise<{ message: string }> {
    const doctor = await this.repository.findDoctorById(id);
    if (!doctor) throw new NotFoundException('Doctor profile not found');

    await this.repository.softDeleteDoctor(id);
    return { message: 'Doctor profile soft-deleted from active registry' };
  }

  // ─── Verification Workflow ───────────────────────────────────────────────

  async verifyDoctor(id: string, dto: DoctorActionDto, verifierUserId?: string): Promise<DoctorProfileFullResponseDto> {
    const doctor = await this.repository.findDoctorById(id);
    if (!doctor) throw new NotFoundException('Doctor profile not found');

    const prevStatus = doctor.verificationStatus;
    const updated = await this.repository.updateDoctor(id, {
      verificationStatus: 'VERIFIED',
      verificationNotes: dto.reason || 'Medical credentials verified by admin',
      verifiedBy: verifierUserId || 'ADMIN',
      verifiedAt: new Date(),
    });

    await this.repository.createHistory(id, {
      action: 'VERIFIED',
      previousStatus: prevStatus,
      newStatus: 'VERIFIED',
      reason: dto.reason || 'Credentials verified',
      performedBy: verifierUserId || 'ADMIN',
    });

    await this.repository.createAuditLog({
      doctorProfileId: id,
      action: 'VERIFIED',
      performedBy: verifierUserId,
      details: 'Doctor profile status set to VERIFIED',
    });

    return this.mapDoctor(updated);
  }

  async rejectDoctor(id: string, dto: DoctorActionDto, verifierUserId?: string): Promise<DoctorProfileFullResponseDto> {
    const doctor = await this.repository.findDoctorById(id);
    if (!doctor) throw new NotFoundException('Doctor profile not found');

    const prevStatus = doctor.verificationStatus;
    const updated = await this.repository.updateDoctor(id, {
      verificationStatus: 'REJECTED',
      verificationNotes: dto.reason || 'Credentials verification rejected',
    });

    await this.repository.createHistory(id, {
      action: 'REJECTED',
      previousStatus: prevStatus,
      newStatus: 'REJECTED',
      reason: dto.reason || 'Verification rejected',
      performedBy: verifierUserId || 'ADMIN',
    });

    return this.mapDoctor(updated);
  }

  async suspendDoctor(id: string, dto: DoctorActionDto, adminUserId?: string): Promise<DoctorProfileFullResponseDto> {
    const doctor = await this.repository.findDoctorById(id);
    if (!doctor) throw new NotFoundException('Doctor profile not found');

    const prevStatus = doctor.verificationStatus;
    const updated = await this.repository.updateDoctor(id, {
      verificationStatus: 'SUSPENDED',
      verificationNotes: dto.reason || 'Practice suspended',
    });

    await this.repository.createHistory(id, {
      action: 'SUSPENDED',
      previousStatus: prevStatus,
      newStatus: 'SUSPENDED',
      reason: dto.reason || 'Registration suspended',
      performedBy: adminUserId || 'ADMIN',
    });

    return this.mapDoctor(updated);
  }

  async restoreDoctor(id: string, dto: DoctorActionDto, adminUserId?: string): Promise<DoctorProfileFullResponseDto> {
    const doctor = await this.repository.findDoctorById(id, true);
    if (!doctor) throw new NotFoundException('Doctor profile not found');

    const prevStatus = doctor.verificationStatus;
    const updated = await this.repository.updateDoctor(id, {
      verificationStatus: 'VERIFIED',
      isDeleted: false,
      deletedAt: null,
    });

    await this.repository.createHistory(id, {
      action: 'RESTORED',
      previousStatus: prevStatus,
      newStatus: 'VERIFIED',
      reason: dto.reason || 'Registration restored',
      performedBy: adminUserId || 'ADMIN',
    });

    return this.mapDoctor(updated);
  }

  async renewLicense(id: string, dto: RenewLicenseDto, adminUserId?: string): Promise<DoctorProfileFullResponseDto> {
    const doctor = await this.repository.findDoctorById(id);
    if (!doctor) throw new NotFoundException('Doctor profile not found');

    const prevExpiry = doctor.registrationExpiryDate;
    const updated = await this.repository.updateDoctor(id, {
      registrationExpiryDate: new Date(dto.newExpiryDate),
      verificationStatus: 'VERIFIED',
    });

    await this.repository.createHistory(id, {
      action: 'LICENSE_RENEWED',
      newStatus: 'VERIFIED',
      reason: dto.reason || `License extended to ${dto.newExpiryDate}`,
      performedBy: adminUserId || 'ADMIN',
    });

    return this.mapDoctor(updated);
  }

  // ─── Sub-entity Management (Qualifications & Documents) ────────────────────

  async addQualification(id: string, dto: AddQualificationDto): Promise<DoctorProfileFullResponseDto> {
    const doctor = await this.repository.findDoctorById(id);
    if (!doctor) throw new NotFoundException('Doctor profile not found');

    await this.repository.addQualification(id, dto);
    const updated = await this.repository.findDoctorById(id);
    return this.mapDoctor(updated!);
  }

  async addCertification(id: string, dto: AddCertificationDto): Promise<DoctorProfileFullResponseDto> {
    const doctor = await this.repository.findDoctorById(id);
    if (!doctor) throw new NotFoundException('Doctor profile not found');

    await this.repository.addCertification(id, dto);
    const updated = await this.repository.findDoctorById(id);
    return this.mapDoctor(updated!);
  }

  async addExperience(id: string, dto: AddExperienceDto): Promise<DoctorProfileFullResponseDto> {
    const doctor = await this.repository.findDoctorById(id);
    if (!doctor) throw new NotFoundException('Doctor profile not found');

    await this.repository.addExperience(id, dto);
    const updated = await this.repository.findDoctorById(id);
    return this.mapDoctor(updated!);
  }

  async attachDocument(id: string, dto: AttachDoctorDocumentDto): Promise<DoctorDocumentResponseDto> {
    const doctor = await this.repository.findDoctorById(id);
    if (!doctor) throw new NotFoundException('Doctor profile not found');

    const doc = await this.repository.attachDocument(id, dto);

    await this.repository.createAuditLog({
      doctorProfileId: id,
      action: 'DOCUMENT_ATTACHED',
      details: `Attached ${dto.documentType} document using MedicalAttachment ${dto.medicalAttachmentId}`,
    });

    return {
      id: doc.id,
      documentType: doc.documentType,
      medicalAttachmentId: doc.medicalAttachmentId || undefined,
      verificationStatus: doc.verificationStatus,
      createdAt: doc.createdAt.toISOString(),
    };
  }

  async getDocuments(id: string): Promise<DoctorDocumentResponseDto[]> {
    const doctor = await this.repository.findDoctorById(id);
    if (!doctor) throw new NotFoundException('Doctor profile not found');

    const docs = await this.repository.findDocumentsByDoctorId(id);
    return docs.map((d) => ({
      id: d.id,
      documentType: d.documentType,
      medicalAttachmentId: d.medicalAttachmentId || undefined,
      verificationStatus: d.verificationStatus,
      createdAt: d.createdAt.toISOString(),
    }));
  }

  async generateQr(userId: string, id: string): Promise<{ doctorId: string; qrToken: string }> {
    const doctor = await this.repository.findDoctorById(id);
    if (!doctor) throw new NotFoundException('Doctor profile not found');

    const qr = await this.qrService.generateQr(userId, {
      entityId: id,
      entityType: QrEntityType.DOCTOR_ID,
    });

    return { doctorId: id, qrToken: qr.token };
  }

  async getHistory(id: string): Promise<DoctorHistoryItemDto[]> {
    const doctor = await this.repository.findDoctorById(id, true);
    if (!doctor) throw new NotFoundException('Doctor profile not found');

    const history = await this.repository.findHistoryByDoctorId(id);
    return history.map((h) => ({
      id: h.id,
      doctorProfileId: h.doctorProfileId,
      action: h.action,
      previousStatus: h.previousStatus || undefined,
      newStatus: h.newStatus,
      reason: h.reason || undefined,
      performedBy: h.performedBy || undefined,
      createdAt: h.createdAt.toISOString(),
    }));
  }

  // ─── Search & Statistics ──────────────────────────────────────────────────

  async searchDoctors(query: string): Promise<DoctorProfileFullResponseDto[]> {
    if (!query || query.trim().length === 0) return [];
    const doctors = await this.repository.searchDoctors(query.trim());
    return doctors.map((d) => this.mapDoctor(d));
  }

  async getStatistics(): Promise<DoctorStatsResponseDto> {
    return this.repository.getStatistics();
  }

  // ─── Legacy Method Hooks (Backward Compatibility) ──────────────────────────

  async getDoctorProfile(doctorId: string): Promise<DoctorProfileResponseDto> {
    const doctor = await this.repository.findDoctorById(doctorId);
    if (!doctor) {
      throw new NotFoundException('Doctor profile not found');
    }

    return {
      id: doctor.id,
      fullName: doctor.fullName,
      specialization: doctor.primarySpecialization,
      credentials: doctor.medicalCouncil || 'MD',
    };
  }

  async getDoctorSlots(doctorId: string): Promise<ScheduleSlotResponseDto[]> {
    const doctor = await this.repository.findDoctorById(doctorId);
    if (!doctor) {
      throw new NotFoundException('Doctor profile not found');
    }

    const slots = await this.repository.findSlotsByDoctorId(doctorId);
    return slots.map((s) => ({
      id: s.id,
      startTime: s.startTime,
      endTime: s.endTime,
      isBooked: s.isBooked,
    }));
  }
}

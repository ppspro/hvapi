import { Injectable, NotFoundException, ConflictException, Inject } from '@nestjs/common';
import { IStaffRepository } from '../../domain/repositories/staff.repository.interface';
import {
  RegisterStaffDto, AddStaffQualificationDto, AttachStaffDocumentDto,
  AssignStaffFacilityDto, AssignStaffDepartmentDto, StaffActionDto,
} from '../../presentation/dto/register-staff.dto';
import {
  StaffFullResponseDto, StaffDocumentResponseDto, StaffHistoryItemDto, StaffStatsResponseDto,
} from '../../presentation/dto/staff-response.dto';
import { QrService } from '@modules/qr/application/use-cases/qr.service';
import { QrEntityType } from '@modules/qr/presentation/dto/generate-qr.dto';
import { Logger } from 'nestjs-pino';

@Injectable()
export class StaffService {
  constructor(
    @Inject('IStaffRepository')
    private readonly repository: IStaffRepository,
    private readonly qrService: QrService,
    private readonly logger: Logger,
  ) {}

  private mapStaff(s: any): StaffFullResponseDto {
    return {
      id: s.id,
      userId: s.userId || undefined,
      employeeCode: s.employeeCode,
      fullName: s.fullName,
      gender: s.gender || undefined,
      dateOfBirth: s.dateOfBirth ? new Date(s.dateOfBirth).toISOString().split('T')[0] : undefined,
      phone: s.phone,
      email: s.email || undefined,
      emergencyContact: s.emergencyContact || undefined,
      profilePhotoUrl: s.profilePhotoUrl || undefined,
      staffType: s.staffType,
      designation: s.designation,
      primaryFacilityId: s.primaryFacilityId,
      secondaryFacilityId: s.secondaryFacilityId || undefined,
      primaryDepartmentId: s.primaryDepartmentId || undefined,
      secondaryDepartmentId: s.secondaryDepartmentId || undefined,
      reportingManagerId: s.reportingManagerId || undefined,
      employmentType: s.employmentType,
      employmentStatus: s.employmentStatus,
      joiningDate: new Date(s.joiningDate).toISOString().split('T')[0],
      terminationDate: s.terminationDate ? new Date(s.terminationDate).toISOString().split('T')[0] : undefined,
      noticePeriodDays: s.noticePeriodDays,
      biography: s.biography || undefined,
      languagesSpoken: s.languagesSpoken || [],
      verificationStatus: s.verificationStatus,
      verificationNotes: s.verificationNotes || undefined,
      verifiedBy: s.verifiedBy || undefined,
      verifiedAt: s.verifiedAt?.toISOString() || undefined,
      isDeleted: s.isDeleted,
      qualifications: s.qualifications?.map((q: any) => ({
        id: q.id,
        degreeName: q.degreeName,
        instituteName: q.instituteName,
        passingYear: q.passingYear,
        fieldOfStudy: q.fieldOfStudy || undefined,
        createdAt: q.createdAt.toISOString(),
      })) || [],
      documents: s.documents?.map((doc: any) => ({
        id: doc.id,
        documentType: doc.documentType,
        medicalAttachmentId: doc.medicalAttachmentId || undefined,
        verificationStatus: doc.verificationStatus,
        createdAt: doc.createdAt.toISOString(),
      })) || [],
      createdAt: s.createdAt.toISOString(),
      updatedAt: s.updatedAt.toISOString(),
    };
  }

  // ─── Registration & Profile Management ────────────────────────────────────

  async registerStaff(userId: string, dto: RegisterStaffDto): Promise<StaffFullResponseDto> {
    if (dto.employeeCode) {
      const codeDup = await this.repository.findStaffByEmployeeCode(dto.employeeCode);
      if (codeDup) {
        throw new ConflictException('Employee code already registered in Master Workforce Registry');
      }
    }

    const created = await this.repository.createStaff({
      ...dto,
      registeredBy: userId,
    });

    // Issue Staff Digital Identity QR token
    try {
      const qr = await this.qrService.generateQr(userId, {
        entityId: created.id,
        entityType: QrEntityType.STAFF_ID,
      });
      (created as any).qrToken = qr.token;
    } catch (err) {
      this.logger.warn({ msg: 'QR generation skipped for staff member', err });
    }

    await this.repository.createAuditLog({
      staffId: created.id,
      action: 'REGISTERED',
      performedBy: userId,
      details: `Staff member registered with employee code ${created.employeeCode}`,
    });

    return this.mapStaff(created);
  }

  async getStaffMembers(): Promise<StaffFullResponseDto[]> {
    const staffList = await this.repository.findStaffMembers();
    return staffList.map((s) => this.mapStaff(s));
  }

  async getStaffById(id: string): Promise<StaffFullResponseDto> {
    const staff = await this.repository.findStaffById(id);
    if (!staff) {
      throw new NotFoundException('Staff member profile not found in Master Registry');
    }
    return this.mapStaff(staff);
  }

  async updateStaff(id: string, dto: Partial<RegisterStaffDto>): Promise<StaffFullResponseDto> {
    const staff = await this.repository.findStaffById(id);
    if (!staff) throw new NotFoundException('Staff member profile not found');

    const updated = await this.repository.updateStaff(id, dto);

    await this.repository.createAuditLog({
      staffId: id,
      action: 'UPDATED',
      details: 'Updated staff member profile details',
    });

    return this.mapStaff(updated);
  }

  async softDeleteStaff(id: string): Promise<{ message: string }> {
    const staff = await this.repository.findStaffById(id);
    if (!staff) throw new NotFoundException('Staff member profile not found');

    await this.repository.softDeleteStaff(id);
    return { message: 'Staff member soft-deleted from active registry' };
  }

  // ─── Verification Workflow ───────────────────────────────────────────────

  async verifyStaff(id: string, dto: StaffActionDto, adminUserId?: string): Promise<StaffFullResponseDto> {
    const staff = await this.repository.findStaffById(id);
    if (!staff) throw new NotFoundException('Staff member profile not found');

    const prevStatus = staff.verificationStatus;
    const updated = await this.repository.updateStaff(id, {
      verificationStatus: 'VERIFIED',
      verificationNotes: dto.reason || 'Background check and credentials verified by HR',
      verifiedBy: adminUserId || 'ADMIN',
      verifiedAt: new Date(),
    });

    await this.repository.createHistory(id, {
      action: 'VERIFIED',
      previousStatus: prevStatus,
      newStatus: 'VERIFIED',
      reason: dto.reason || 'Credentials verified',
      performedBy: adminUserId || 'ADMIN',
    });

    return this.mapStaff(updated);
  }

  async suspendStaff(id: string, dto: StaffActionDto, adminUserId?: string): Promise<StaffFullResponseDto> {
    const staff = await this.repository.findStaffById(id);
    if (!staff) throw new NotFoundException('Staff member profile not found');

    const prevStatus = staff.verificationStatus;
    const updated = await this.repository.updateStaff(id, {
      verificationStatus: 'SUSPENDED',
      verificationNotes: dto.reason || 'Employment suspended by management',
    });

    await this.repository.createHistory(id, {
      action: 'SUSPENDED',
      previousStatus: prevStatus,
      newStatus: 'SUSPENDED',
      reason: dto.reason || 'Employment suspended',
      performedBy: adminUserId || 'ADMIN',
    });

    return this.mapStaff(updated);
  }

  async restoreStaff(id: string, dto: StaffActionDto, adminUserId?: string): Promise<StaffFullResponseDto> {
    const staff = await this.repository.findStaffById(id, true);
    if (!staff) throw new NotFoundException('Staff member profile not found');

    const prevStatus = staff.verificationStatus;
    const updated = await this.repository.updateStaff(id, {
      verificationStatus: 'VERIFIED',
      isDeleted: false,
      deletedAt: null,
    });

    await this.repository.createHistory(id, {
      action: 'RESTORED',
      previousStatus: prevStatus,
      newStatus: 'VERIFIED',
      reason: dto.reason || 'Staff employment restored',
      performedBy: adminUserId || 'ADMIN',
    });

    return this.mapStaff(updated);
  }

  // ─── Sub-entity & Assignment Management ──────────────────────────────────

  async addQualification(id: string, dto: AddStaffQualificationDto): Promise<StaffFullResponseDto> {
    const staff = await this.repository.findStaffById(id);
    if (!staff) throw new NotFoundException('Staff member profile not found');

    await this.repository.addQualification(id, dto);
    const updated = await this.repository.findStaffById(id);
    return this.mapStaff(updated!);
  }

  async attachDocument(id: string, dto: AttachStaffDocumentDto): Promise<StaffDocumentResponseDto> {
    const staff = await this.repository.findStaffById(id);
    if (!staff) throw new NotFoundException('Staff member profile not found');

    const doc = await this.repository.attachDocument(id, dto);

    await this.repository.createAuditLog({
      staffId: id,
      action: 'DOCUMENT_ATTACHED',
      details: `Attached ${dto.documentType} using MedicalAttachment ${dto.medicalAttachmentId}`,
    });

    return {
      id: doc.id,
      documentType: doc.documentType,
      medicalAttachmentId: doc.medicalAttachmentId || undefined,
      verificationStatus: doc.verificationStatus,
      createdAt: doc.createdAt.toISOString(),
    };
  }

  async getDocuments(id: string): Promise<StaffDocumentResponseDto[]> {
    const staff = await this.repository.findStaffById(id);
    if (!staff) throw new NotFoundException('Staff member profile not found');

    const docs = await this.repository.findDocumentsByStaffId(id);
    return docs.map((d) => ({
      id: d.id,
      documentType: d.documentType,
      medicalAttachmentId: d.medicalAttachmentId || undefined,
      verificationStatus: d.verificationStatus,
      createdAt: d.createdAt.toISOString(),
    }));
  }

  async assignFacility(id: string, dto: AssignStaffFacilityDto): Promise<StaffFullResponseDto> {
    const staff = await this.repository.findStaffById(id);
    if (!staff) throw new NotFoundException('Staff member profile not found');

    const updated = await this.repository.assignFacility(id, dto.primaryFacilityId, dto.secondaryFacilityId);
    return this.mapStaff(updated);
  }

  async assignDepartment(id: string, dto: AssignStaffDepartmentDto): Promise<StaffFullResponseDto> {
    const staff = await this.repository.findStaffById(id);
    if (!staff) throw new NotFoundException('Staff member profile not found');

    const updated = await this.repository.assignDepartment(id, dto.primaryDepartmentId, dto.secondaryDepartmentId);
    return this.mapStaff(updated);
  }

  async generateQr(userId: string, id: string): Promise<{ staffId: string; qrToken: string }> {
    const staff = await this.repository.findStaffById(id);
    if (!staff) throw new NotFoundException('Staff member profile not found');

    const qr = await this.qrService.generateQr(userId, {
      entityId: id,
      entityType: QrEntityType.STAFF_ID,
    });

    return { staffId: id, qrToken: qr.token };
  }

  async getHistory(id: string): Promise<StaffHistoryItemDto[]> {
    const staff = await this.repository.findStaffById(id, true);
    if (!staff) throw new NotFoundException('Staff member profile not found');

    const history = await this.repository.findHistoryByStaffId(id);
    return history.map((h) => ({
      id: h.id,
      staffId: h.staffId,
      action: h.action,
      previousStatus: h.previousStatus || undefined,
      newStatus: h.newStatus,
      reason: h.reason || undefined,
      performedBy: h.performedBy || undefined,
      createdAt: h.createdAt.toISOString(),
    }));
  }

  // ─── Search & Statistics ──────────────────────────────────────────────────

  async searchStaff(query: string): Promise<StaffFullResponseDto[]> {
    if (!query || query.trim().length === 0) return [];
    const staffList = await this.repository.searchStaff(query.trim());
    return staffList.map((s) => this.mapStaff(s));
  }

  async getStatistics(): Promise<StaffStatsResponseDto> {
    return this.repository.getStatistics();
  }
}

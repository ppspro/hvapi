import { Injectable } from '@nestjs/common';
import { DatabaseService } from '@database/database.service';
import { IStaffRepository } from '../../domain/repositories/staff.repository.interface';
import {
  StaffMemberEntity,
  StaffQualificationEntity,
  StaffCertificationEntity,
  StaffExperienceEntity,
  StaffDocumentEntity,
  StaffHistoryEntity,
  StaffAuditLogEntity,
} from '../../domain/entities/staff.entity';

@Injectable()
export class StaffRepository implements IStaffRepository {
  constructor(private readonly db: DatabaseService) {}

  async createStaff(data: any): Promise<StaffMemberEntity> {
    const employeeCode = data.employeeCode || `STF-360-${Date.now().toString().slice(-6)}`;
    const created = await this.db.staffMember.create({
      data: {
        userId: data.userId || null,
        employeeCode,
        fullName: data.fullName,
        gender: data.gender || null,
        dateOfBirth: data.dateOfBirth ? new Date(data.dateOfBirth) : null,
        phone: data.phone,
        email: data.email || null,
        emergencyContact: data.emergencyContact || null,
        profilePhotoUrl: data.profilePhotoUrl || null,
        staffType: data.staffType,
        designation: data.designation,
        primaryFacilityId: data.primaryFacilityId,
        secondaryFacilityId: data.secondaryFacilityId || null,
        primaryDepartmentId: data.primaryDepartmentId || null,
        secondaryDepartmentId: data.secondaryDepartmentId || null,
        reportingManagerId: data.reportingManagerId || null,
        employmentType: data.employmentType || 'PERMANENT',
        employmentStatus: data.employmentStatus || 'ACTIVE',
        joiningDate: data.joiningDate ? new Date(data.joiningDate) : new Date(),
        terminationDate: data.terminationDate ? new Date(data.terminationDate) : null,
        noticePeriodDays: data.noticePeriodDays ?? 30,
        biography: data.biography || null,
        languagesSpoken: data.languagesSpoken || [],
        verificationStatus: 'PENDING',
      },
      include: {
        qualifications: true,
        certifications: true,
        experiences: true,
        documents: true,
      },
    });

    await this.createHistory(created.id, {
      action: 'REGISTERED',
      newStatus: 'PENDING',
      reason: 'Initial workforce registration',
      performedBy: data.registeredBy,
    });

    return created as unknown as StaffMemberEntity;
  }

  async findStaffById(id: string, includeDeleted = false): Promise<StaffMemberEntity | null> {
    return (await this.db.staffMember.findFirst({
      where: { id, ...(includeDeleted ? {} : { isDeleted: false }) },
      include: {
        qualifications: true,
        certifications: true,
        experiences: true,
        documents: { include: { medicalAttachment: true } },
        history: { orderBy: { createdAt: 'desc' } },
      },
    })) as unknown as StaffMemberEntity | null;
  }

  async findStaffByEmployeeCode(employeeCode: string): Promise<StaffMemberEntity | null> {
    return (await this.db.staffMember.findUnique({
      where: { employeeCode },
    })) as unknown as StaffMemberEntity | null;
  }

  async findStaffByUserId(userId: string): Promise<StaffMemberEntity | null> {
    return (await this.db.staffMember.findUnique({
      where: { userId },
    })) as unknown as StaffMemberEntity | null;
  }

  async findStaffMembers(includeDeleted = false): Promise<StaffMemberEntity[]> {
    return (await this.db.staffMember.findMany({
      where: includeDeleted ? {} : { isDeleted: false },
      include: {
        qualifications: true,
        certifications: true,
        experiences: true,
        documents: true,
      },
      orderBy: { createdAt: 'desc' },
    })) as unknown as StaffMemberEntity[];
  }

  async updateStaff(id: string, data: any): Promise<StaffMemberEntity> {
    return (await this.db.staffMember.update({
      where: { id },
      data: {
        fullName: data.fullName || undefined,
        gender: data.gender || undefined,
        dateOfBirth: data.dateOfBirth ? new Date(data.dateOfBirth) : undefined,
        phone: data.phone || undefined,
        email: data.email || undefined,
        emergencyContact: data.emergencyContact || undefined,
        profilePhotoUrl: data.profilePhotoUrl || undefined,
        staffType: data.staffType || undefined,
        designation: data.designation || undefined,
        primaryFacilityId: data.primaryFacilityId || undefined,
        secondaryFacilityId: data.secondaryFacilityId || undefined,
        primaryDepartmentId: data.primaryDepartmentId || undefined,
        secondaryDepartmentId: data.secondaryDepartmentId || undefined,
        reportingManagerId: data.reportingManagerId || undefined,
        employmentType: data.employmentType || undefined,
        employmentStatus: data.employmentStatus || undefined,
        joiningDate: data.joiningDate ? new Date(data.joiningDate) : undefined,
        terminationDate: data.terminationDate ? new Date(data.terminationDate) : undefined,
        noticePeriodDays: data.noticePeriodDays ?? undefined,
        biography: data.biography || undefined,
        languagesSpoken: data.languagesSpoken || undefined,
        verificationStatus: data.verificationStatus as any || undefined,
        verificationNotes: data.verificationNotes || undefined,
        verifiedBy: data.verifiedBy || undefined,
        verifiedAt: data.verifiedAt ? new Date(data.verifiedAt) : undefined,
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
    })) as unknown as StaffMemberEntity;
  }

  async softDeleteStaff(id: string): Promise<void> {
    await this.db.staffMember.update({
      where: { id },
      data: { isDeleted: true, deletedAt: new Date() },
    });
  }

  async searchStaff(query: string): Promise<StaffMemberEntity[]> {
    const q = query.toLowerCase();
    return (await this.db.staffMember.findMany({
      where: {
        isDeleted: false,
        OR: [
          { fullName: { contains: q, mode: 'insensitive' } },
          { employeeCode: { contains: q, mode: 'insensitive' } },
          { staffType: { contains: q, mode: 'insensitive' } },
          { designation: { contains: q, mode: 'insensitive' } },
          { phone: { contains: q, mode: 'insensitive' } },
        ],
      },
      include: { qualifications: true, documents: true },
      orderBy: { createdAt: 'desc' },
    })) as unknown as StaffMemberEntity[];
  }

  async addQualification(staffId: string, data: any): Promise<StaffQualificationEntity> {
    return (await this.db.staffQualification.create({
      data: {
        staffId,
        degreeName: data.degreeName,
        instituteName: data.instituteName,
        passingYear: data.passingYear,
        fieldOfStudy: data.fieldOfStudy || null,
      },
    })) as unknown as StaffQualificationEntity;
  }

  async addCertification(staffId: string, data: any): Promise<StaffCertificationEntity> {
    return (await this.db.staffCertification.create({
      data: {
        staffId,
        title: data.title,
        issuingAuthority: data.issuingAuthority,
        issueDate: data.issueDate ? new Date(data.issueDate) : null,
        expiryDate: data.expiryDate ? new Date(data.expiryDate) : null,
      },
    })) as unknown as StaffCertificationEntity;
  }

  async addExperience(staffId: string, data: any): Promise<StaffExperienceEntity> {
    return (await this.db.staffExperience.create({
      data: {
        staffId,
        designation: data.designation,
        organization: data.organization,
        startDate: new Date(data.startDate),
        endDate: data.endDate ? new Date(data.endDate) : null,
        isCurrent: data.isCurrent ?? false,
      },
    })) as unknown as StaffExperienceEntity;
  }

  async attachDocument(staffId: string, data: any): Promise<StaffDocumentEntity> {
    return (await this.db.staffDocument.create({
      data: {
        staffId,
        documentType: data.documentType,
        medicalAttachmentId: data.medicalAttachmentId || null,
        verificationStatus: 'PENDING',
      },
      include: { medicalAttachment: true },
    })) as unknown as StaffDocumentEntity;
  }

  async findDocumentsByStaffId(staffId: string): Promise<StaffDocumentEntity[]> {
    return (await this.db.staffDocument.findMany({
      where: { staffId },
      include: { medicalAttachment: true },
      orderBy: { createdAt: 'desc' },
    })) as unknown as StaffDocumentEntity[];
  }

  async assignFacility(staffId: string, primaryFacilityId: string, secondaryFacilityId?: string): Promise<StaffMemberEntity> {
    return (await this.db.staffMember.update({
      where: { id: staffId },
      data: {
        primaryFacilityId,
        secondaryFacilityId: secondaryFacilityId || null,
      },
      include: { qualifications: true, documents: true },
    })) as unknown as StaffMemberEntity;
  }

  async assignDepartment(staffId: string, primaryDepartmentId?: string, secondaryDepartmentId?: string): Promise<StaffMemberEntity> {
    return (await this.db.staffMember.update({
      where: { id: staffId },
      data: {
        primaryDepartmentId: primaryDepartmentId || null,
        secondaryDepartmentId: secondaryDepartmentId || null,
      },
      include: { qualifications: true, documents: true },
    })) as unknown as StaffMemberEntity;
  }

  async createHistory(staffId: string, data: {
    action: string;
    previousStatus?: string;
    newStatus: string;
    reason?: string;
    performedBy?: string;
  }): Promise<StaffHistoryEntity> {
    return (await this.db.staffHistory.create({
      data: {
        staffId,
        action: data.action,
        previousStatus: data.previousStatus || null,
        newStatus: data.newStatus,
        reason: data.reason || null,
        performedBy: data.performedBy || null,
      },
    })) as unknown as StaffHistoryEntity;
  }

  async findHistoryByStaffId(staffId: string): Promise<StaffHistoryEntity[]> {
    return (await this.db.staffHistory.findMany({
      where: { staffId },
      orderBy: { createdAt: 'desc' },
    })) as unknown as StaffHistoryEntity[];
  }

  async createAuditLog(data: {
    staffId: string;
    action: string;
    performedBy?: string;
    details?: string;
  }): Promise<StaffAuditLogEntity> {
    return (await this.db.staffAuditLog.create({
      data: {
        staffId: data.staffId,
        action: data.action,
        performedBy: data.performedBy || null,
        details: data.details || null,
      },
    })) as unknown as StaffAuditLogEntity;
  }

  async getStatistics() {
    const totalStaff = await this.db.staffMember.count({ where: { isDeleted: false } });
    const verifiedStaff = await this.db.staffMember.count({ where: { verificationStatus: 'VERIFIED', isDeleted: false } });
    const pendingStaff = await this.db.staffMember.count({ where: { verificationStatus: 'PENDING', isDeleted: false } });
    const suspendedStaff = await this.db.staffMember.count({ where: { verificationStatus: 'SUSPENDED', isDeleted: false } });
    const activeStaff = await this.db.staffMember.count({ where: { employmentStatus: 'ACTIVE', isDeleted: false } });

    return {
      totalStaff,
      verifiedStaff,
      pendingStaff,
      suspendedStaff,
      activeStaff,
    };
  }
}

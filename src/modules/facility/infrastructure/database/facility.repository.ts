import { Injectable } from '@nestjs/common';
import { DatabaseService } from '@database/database.service';
import { IFacilityRepository } from '../../domain/repositories/facility.repository.interface';
import {
  FacilityEntity,
  FacilityBranchEntity,
  FacilityDepartmentEntity,
  FacilityRoomEntity,
  FacilityLicenseEntity,
  FacilityAccreditationEntity,
  FacilityDocumentEntity,
  DoctorFacilityEntity,
  FacilityHistoryEntity,
  FacilityAuditLogEntity,
} from '../../domain/entities/facility.entity';

@Injectable()
export class FacilityRepository implements IFacilityRepository {
  constructor(private readonly db: DatabaseService) {}

  async createFacility(data: any): Promise<FacilityEntity> {
    const facilityCode = `FAC-360-${Date.now().toString().slice(-6)}`;
    const created = await this.db.facility.create({
      data: {
        name: data.name,
        legalName: data.legalName || null,
        facilityCode,
        registrationNumber: data.registrationNumber,
        facilityType: data.facilityType || 'HOSPITAL',
        ownershipType: data.ownershipType || 'PRIVATE',
        buildingName: data.buildingName || null,
        streetAddress: data.streetAddress,
        city: data.city,
        district: data.district || null,
        state: data.state,
        country: data.country || 'Pakistan',
        pinCode: data.pinCode || null,
        latitude: data.latitude ?? null,
        longitude: data.longitude ?? null,
        timezone: data.timezone || 'Asia/Karachi',
        phone: data.phone,
        emergencyPhone: data.emergencyPhone || null,
        email: data.email || null,
        website: data.website || null,
        profilePhotoUrl: data.profilePhotoUrl || null,
        verificationStatus: 'PENDING',
      },
      include: {
        branches: true,
        departments: true,
        rooms: true,
        licenses: true,
        accreditations: true,
        documents: true,
      },
    });

    await this.createHistory(created.id, {
      action: 'REGISTERED',
      newStatus: 'PENDING',
      reason: 'Initial master facility registration',
      performedBy: data.registeredBy,
    });

    return created as unknown as FacilityEntity;
  }

  async findFacilityById(id: string, includeDeleted = false): Promise<FacilityEntity | null> {
    return (await this.db.facility.findFirst({
      where: { id, ...(includeDeleted ? {} : { isDeleted: false }) },
      include: {
        branches: true,
        departments: true,
        rooms: true,
        licenses: true,
        accreditations: true,
        documents: { include: { medicalAttachment: true } },
        doctors: { include: { doctor: true, department: true } },
        history: { orderBy: { createdAt: 'desc' } },
      },
    })) as unknown as FacilityEntity | null;
  }

  async findFacilityByCode(facilityCode: string): Promise<FacilityEntity | null> {
    return (await this.db.facility.findUnique({
      where: { facilityCode },
    })) as unknown as FacilityEntity | null;
  }

  async findFacilityByRegistrationNumber(registrationNumber: string): Promise<FacilityEntity | null> {
    return (await this.db.facility.findUnique({
      where: { registrationNumber },
    })) as unknown as FacilityEntity | null;
  }

  async findAllFacilities(includeDeleted = false): Promise<FacilityEntity[]> {
    return (await this.db.facility.findMany({
      where: includeDeleted ? {} : { isDeleted: false },
      include: {
        departments: true,
        rooms: true,
        licenses: true,
        accreditations: true,
      },
      orderBy: { createdAt: 'desc' },
    })) as unknown as FacilityEntity[];
  }

  async updateFacility(id: string, data: any): Promise<FacilityEntity> {
    return (await this.db.facility.update({
      where: { id },
      data: {
        name: data.name || undefined,
        legalName: data.legalName || undefined,
        facilityType: data.facilityType || undefined,
        ownershipType: data.ownershipType || undefined,
        buildingName: data.buildingName || undefined,
        streetAddress: data.streetAddress || undefined,
        city: data.city || undefined,
        district: data.district || undefined,
        state: data.state || undefined,
        country: data.country || undefined,
        pinCode: data.pinCode || undefined,
        latitude: data.latitude ?? undefined,
        longitude: data.longitude ?? undefined,
        timezone: data.timezone || undefined,
        phone: data.phone || undefined,
        emergencyPhone: data.emergencyPhone || undefined,
        email: data.email || undefined,
        website: data.website || undefined,
        profilePhotoUrl: data.profilePhotoUrl || undefined,
        verificationStatus: data.verificationStatus as any || undefined,
        verificationNotes: data.verificationNotes || undefined,
        verifiedBy: data.verifiedBy || undefined,
        verifiedAt: data.verifiedAt ? new Date(data.verifiedAt) : undefined,
        isDeleted: data.isDeleted ?? undefined,
        deletedAt: data.deletedAt || undefined,
      },
      include: {
        branches: true,
        departments: true,
        rooms: true,
        licenses: true,
        accreditations: true,
        documents: { include: { medicalAttachment: true } },
        history: { orderBy: { createdAt: 'desc' } },
      },
    })) as unknown as FacilityEntity;
  }

  async softDeleteFacility(id: string): Promise<void> {
    await this.db.facility.update({
      where: { id },
      data: { isDeleted: true, deletedAt: new Date() },
    });
  }

  async searchFacilities(query: string): Promise<FacilityEntity[]> {
    const q = query.toLowerCase();
    return (await this.db.facility.findMany({
      where: {
        isDeleted: false,
        OR: [
          { name: { contains: q, mode: 'insensitive' } },
          { facilityCode: { contains: q, mode: 'insensitive' } },
          { registrationNumber: { contains: q, mode: 'insensitive' } },
          { city: { contains: q, mode: 'insensitive' } },
          { facilityType: { contains: q, mode: 'insensitive' } },
        ],
      },
      include: { departments: true, rooms: true },
      orderBy: { createdAt: 'desc' },
    })) as unknown as FacilityEntity[];
  }

  async createDepartment(facilityId: string, data: any): Promise<FacilityDepartmentEntity> {
    return (await this.db.facilityDepartment.create({
      data: {
        facilityId,
        name: data.name,
        code: data.code || null,
        description: data.description || null,
        departmentHead: data.departmentHead || null,
        operatingHours: data.operatingHours || null,
      },
    })) as unknown as FacilityDepartmentEntity;
  }

  async findDepartmentsByFacilityId(facilityId: string): Promise<FacilityDepartmentEntity[]> {
    return (await this.db.facilityDepartment.findMany({
      where: { facilityId },
      orderBy: { name: 'asc' },
    })) as unknown as FacilityDepartmentEntity[];
  }

  async createRoom(facilityId: string, data: any): Promise<FacilityRoomEntity> {
    return (await this.db.facilityRoom.create({
      data: {
        facilityId,
        departmentId: data.departmentId || null,
        roomNumber: data.roomNumber,
        roomName: data.roomName || null,
        building: data.building || null,
        block: data.block || null,
        floor: data.floor || null,
        wing: data.wing || null,
        roomCategory: data.roomCategory || 'CONSULTATION_ROOM',
        capacity: data.capacity || 1,
        isOperational: data.isOperational ?? true,
      },
    })) as unknown as FacilityRoomEntity;
  }

  async findRoomsByFacilityId(facilityId: string): Promise<FacilityRoomEntity[]> {
    return (await this.db.facilityRoom.findMany({
      where: { facilityId },
      orderBy: { roomNumber: 'asc' },
    })) as unknown as FacilityRoomEntity[];
  }

  async addLicense(facilityId: string, data: any): Promise<FacilityLicenseEntity> {
    return (await this.db.facilityLicense.create({
      data: {
        facilityId,
        licenseType: data.licenseType,
        licenseNumber: data.licenseNumber,
        issuingAuthority: data.issuingAuthority,
        issueDate: data.issueDate ? new Date(data.issueDate) : null,
        expiryDate: data.expiryDate ? new Date(data.expiryDate) : null,
        renewalDate: data.renewalDate ? new Date(data.renewalDate) : null,
        verificationStatus: 'VERIFIED',
      },
    })) as unknown as FacilityLicenseEntity;
  }

  async addAccreditation(facilityId: string, data: any): Promise<FacilityAccreditationEntity> {
    return (await this.db.facilityAccreditation.create({
      data: {
        facilityId,
        accreditationBody: data.accreditationBody,
        certificateNumber: data.certificateNumber,
        validFrom: data.validFrom ? new Date(data.validFrom) : null,
        validTo: data.validTo ? new Date(data.validTo) : null,
        status: 'ACTIVE',
      },
    })) as unknown as FacilityAccreditationEntity;
  }

  async attachDocument(facilityId: string, data: any): Promise<FacilityDocumentEntity> {
    return (await this.db.facilityDocument.create({
      data: {
        facilityId,
        documentType: data.documentType,
        medicalAttachmentId: data.medicalAttachmentId || null,
        verificationStatus: 'PENDING',
      },
      include: { medicalAttachment: true },
    })) as unknown as FacilityDocumentEntity;
  }

  async findDocumentsByFacilityId(facilityId: string): Promise<FacilityDocumentEntity[]> {
    return (await this.db.facilityDocument.findMany({
      where: { facilityId },
      include: { medicalAttachment: true },
      orderBy: { createdAt: 'desc' },
    })) as unknown as FacilityDocumentEntity[];
  }

  async assignDoctor(facilityId: string, data: any): Promise<DoctorFacilityEntity> {
    return (await this.db.doctorFacility.upsert({
      where: {
        doctorId_facilityId: {
          doctorId: data.doctorId,
          facilityId,
        },
      },
      update: {
        departmentId: data.departmentId || undefined,
        assignmentType: data.assignmentType || undefined,
        privileges: data.privileges || undefined,
        isActive: data.isActive ?? true,
      },
      create: {
        doctorId: data.doctorId,
        facilityId,
        departmentId: data.departmentId || null,
        assignmentType: data.assignmentType || 'PRIMARY',
        privileges: data.privileges || [],
        startDate: data.startDate ? new Date(data.startDate) : new Date(),
        endDate: data.endDate ? new Date(data.endDate) : null,
        isActive: true,
      },
      include: { doctor: true, department: true },
    })) as unknown as DoctorFacilityEntity;
  }

  async findDoctorsByFacilityId(facilityId: string): Promise<any[]> {
    const records = await this.db.doctorFacility.findMany({
      where: { facilityId, isActive: true },
      include: { doctor: true, department: true },
    });
    return records.map((r) => ({
      ...r.doctor,
      assignmentType: r.assignmentType,
      departmentName: r.department?.name || null,
    }));
  }

  async createHistory(facilityId: string, data: {
    action: string;
    previousStatus?: string;
    newStatus: string;
    reason?: string;
    performedBy?: string;
  }): Promise<FacilityHistoryEntity> {
    return (await this.db.facilityHistory.create({
      data: {
        facilityId,
        action: data.action,
        previousStatus: data.previousStatus || null,
        newStatus: data.newStatus,
        reason: data.reason || null,
        performedBy: data.performedBy || null,
      },
    })) as unknown as FacilityHistoryEntity;
  }

  async findHistoryByFacilityId(facilityId: string): Promise<FacilityHistoryEntity[]> {
    return (await this.db.facilityHistory.findMany({
      where: { facilityId },
      orderBy: { createdAt: 'desc' },
    })) as unknown as FacilityHistoryEntity[];
  }

  async createAuditLog(data: {
    facilityId: string;
    action: string;
    performedBy?: string;
    details?: string;
  }): Promise<FacilityAuditLogEntity> {
    return (await this.db.facilityAuditLog.create({
      data: {
        facilityId: data.facilityId,
        action: data.action,
        performedBy: data.performedBy || null,
        details: data.details || null,
      },
    })) as unknown as FacilityAuditLogEntity;
  }

  async getStatistics() {
    const totalFacilities = await this.db.facility.count({ where: { isDeleted: false } });
    const verifiedFacilities = await this.db.facility.count({ where: { verificationStatus: 'VERIFIED', isDeleted: false } });
    const pendingFacilities = await this.db.facility.count({ where: { verificationStatus: 'PENDING', isDeleted: false } });
    const suspendedFacilities = await this.db.facility.count({ where: { verificationStatus: 'SUSPENDED', isDeleted: false } });
    const totalDepartments = await this.db.facilityDepartment.count();
    const totalRooms = await this.db.facilityRoom.count();

    return {
      totalFacilities,
      verifiedFacilities,
      pendingFacilities,
      suspendedFacilities,
      totalDepartments,
      totalRooms,
    };
  }
}

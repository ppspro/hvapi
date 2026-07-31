"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FacilityRepository = void 0;
const common_1 = require("@nestjs/common");
const database_service_1 = require("../../../../database/database.service");
let FacilityRepository = class FacilityRepository {
    constructor(db) {
        this.db = db;
    }
    async createFacility(data) {
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
        return created;
    }
    async findFacilityById(id, includeDeleted = false) {
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
        }));
    }
    async findFacilityByCode(facilityCode) {
        return (await this.db.facility.findUnique({
            where: { facilityCode },
        }));
    }
    async findFacilityByRegistrationNumber(registrationNumber) {
        return (await this.db.facility.findUnique({
            where: { registrationNumber },
        }));
    }
    async findAllFacilities(includeDeleted = false) {
        return (await this.db.facility.findMany({
            where: includeDeleted ? {} : { isDeleted: false },
            include: {
                departments: true,
                rooms: true,
                licenses: true,
                accreditations: true,
            },
            orderBy: { createdAt: 'desc' },
        }));
    }
    async updateFacility(id, data) {
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
                verificationStatus: data.verificationStatus || undefined,
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
        }));
    }
    async softDeleteFacility(id) {
        await this.db.facility.update({
            where: { id },
            data: { isDeleted: true, deletedAt: new Date() },
        });
    }
    async searchFacilities(query) {
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
        }));
    }
    async createDepartment(facilityId, data) {
        return (await this.db.facilityDepartment.create({
            data: {
                facilityId,
                name: data.name,
                code: data.code || null,
                description: data.description || null,
                departmentHead: data.departmentHead || null,
                operatingHours: data.operatingHours || null,
            },
        }));
    }
    async findDepartmentsByFacilityId(facilityId) {
        return (await this.db.facilityDepartment.findMany({
            where: { facilityId },
            orderBy: { name: 'asc' },
        }));
    }
    async createRoom(facilityId, data) {
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
        }));
    }
    async findRoomsByFacilityId(facilityId) {
        return (await this.db.facilityRoom.findMany({
            where: { facilityId },
            orderBy: { roomNumber: 'asc' },
        }));
    }
    async addLicense(facilityId, data) {
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
        }));
    }
    async addAccreditation(facilityId, data) {
        return (await this.db.facilityAccreditation.create({
            data: {
                facilityId,
                accreditationBody: data.accreditationBody,
                certificateNumber: data.certificateNumber,
                validFrom: data.validFrom ? new Date(data.validFrom) : null,
                validTo: data.validTo ? new Date(data.validTo) : null,
                status: 'ACTIVE',
            },
        }));
    }
    async attachDocument(facilityId, data) {
        return (await this.db.facilityDocument.create({
            data: {
                facilityId,
                documentType: data.documentType,
                medicalAttachmentId: data.medicalAttachmentId || null,
                verificationStatus: 'PENDING',
            },
            include: { medicalAttachment: true },
        }));
    }
    async findDocumentsByFacilityId(facilityId) {
        return (await this.db.facilityDocument.findMany({
            where: { facilityId },
            include: { medicalAttachment: true },
            orderBy: { createdAt: 'desc' },
        }));
    }
    async assignDoctor(facilityId, data) {
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
        }));
    }
    async findDoctorsByFacilityId(facilityId) {
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
    async createHistory(facilityId, data) {
        return (await this.db.facilityHistory.create({
            data: {
                facilityId,
                action: data.action,
                previousStatus: data.previousStatus || null,
                newStatus: data.newStatus,
                reason: data.reason || null,
                performedBy: data.performedBy || null,
            },
        }));
    }
    async findHistoryByFacilityId(facilityId) {
        return (await this.db.facilityHistory.findMany({
            where: { facilityId },
            orderBy: { createdAt: 'desc' },
        }));
    }
    async createAuditLog(data) {
        return (await this.db.facilityAuditLog.create({
            data: {
                facilityId: data.facilityId,
                action: data.action,
                performedBy: data.performedBy || null,
                details: data.details || null,
            },
        }));
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
};
exports.FacilityRepository = FacilityRepository;
exports.FacilityRepository = FacilityRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [database_service_1.DatabaseService])
], FacilityRepository);
//# sourceMappingURL=facility.repository.js.map
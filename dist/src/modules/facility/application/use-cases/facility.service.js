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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FacilityService = void 0;
const common_1 = require("@nestjs/common");
const qr_service_1 = require("../../../qr/application/use-cases/qr.service");
const generate_qr_dto_1 = require("../../../qr/presentation/dto/generate-qr.dto");
const nestjs_pino_1 = require("nestjs-pino");
let FacilityService = class FacilityService {
    constructor(repository, qrService, logger) {
        this.repository = repository;
        this.qrService = qrService;
        this.logger = logger;
    }
    mapFacility(f) {
        return {
            id: f.id,
            name: f.name,
            legalName: f.legalName || undefined,
            facilityCode: f.facilityCode,
            registrationNumber: f.registrationNumber,
            facilityType: f.facilityType,
            ownershipType: f.ownershipType,
            buildingName: f.buildingName || undefined,
            streetAddress: f.streetAddress,
            city: f.city,
            district: f.district || undefined,
            state: f.state,
            country: f.country,
            pinCode: f.pinCode || undefined,
            latitude: f.latitude ?? undefined,
            longitude: f.longitude ?? undefined,
            timezone: f.timezone,
            phone: f.phone,
            emergencyPhone: f.emergencyPhone || undefined,
            email: f.email || undefined,
            website: f.website || undefined,
            profilePhotoUrl: f.profilePhotoUrl || undefined,
            verificationStatus: f.verificationStatus,
            verificationNotes: f.verificationNotes || undefined,
            verifiedBy: f.verifiedBy || undefined,
            verifiedAt: f.verifiedAt?.toISOString() || undefined,
            isDeleted: f.isDeleted,
            branches: f.branches?.map((b) => ({
                id: b.id,
                branchName: b.branchName,
                branchCode: b.branchCode || undefined,
                address: b.address,
                city: b.city,
                state: b.state,
                phone: b.phone || undefined,
            })) || [],
            departments: f.departments?.map((d) => ({
                id: d.id,
                facilityId: d.facilityId,
                name: d.name,
                code: d.code || undefined,
                description: d.description || undefined,
                departmentHead: d.departmentHead || undefined,
                operatingHours: d.operatingHours || undefined,
                createdAt: d.createdAt.toISOString(),
            })) || [],
            rooms: f.rooms?.map((r) => ({
                id: r.id,
                facilityId: r.facilityId,
                departmentId: r.departmentId || undefined,
                roomNumber: r.roomNumber,
                roomName: r.roomName || undefined,
                building: r.building || undefined,
                block: r.block || undefined,
                floor: r.floor || undefined,
                wing: r.wing || undefined,
                roomCategory: r.roomCategory,
                capacity: r.capacity,
                isOperational: r.isOperational,
                createdAt: r.createdAt.toISOString(),
            })) || [],
            licenses: f.licenses?.map((l) => ({
                id: l.id,
                licenseType: l.licenseType,
                licenseNumber: l.licenseNumber,
                issuingAuthority: l.issuingAuthority,
                issueDate: l.issueDate ? new Date(l.issueDate).toISOString().split('T')[0] : undefined,
                expiryDate: l.expiryDate ? new Date(l.expiryDate).toISOString().split('T')[0] : undefined,
                renewalDate: l.renewalDate ? new Date(l.renewalDate).toISOString().split('T')[0] : undefined,
                verificationStatus: l.verificationStatus,
            })) || [],
            accreditations: f.accreditations?.map((a) => ({
                id: a.id,
                accreditationBody: a.accreditationBody,
                certificateNumber: a.certificateNumber,
                validFrom: a.validFrom ? new Date(a.validFrom).toISOString().split('T')[0] : undefined,
                validTo: a.validTo ? new Date(a.validTo).toISOString().split('T')[0] : undefined,
                status: a.status,
            })) || [],
            documents: f.documents?.map((doc) => ({
                id: doc.id,
                documentType: doc.documentType,
                medicalAttachmentId: doc.medicalAttachmentId || undefined,
                verificationStatus: doc.verificationStatus,
                createdAt: doc.createdAt.toISOString(),
            })) || [],
            createdAt: f.createdAt.toISOString(),
            updatedAt: f.updatedAt.toISOString(),
        };
    }
    async registerFacility(userId, dto) {
        const regDup = await this.repository.findFacilityByRegistrationNumber(dto.registrationNumber);
        if (regDup) {
            throw new common_1.ConflictException('Facility registration number already registered');
        }
        const created = await this.repository.createFacility({
            ...dto,
            registeredBy: userId,
        });
        try {
            const qr = await this.qrService.generateQr(userId, {
                entityId: created.id,
                entityType: generate_qr_dto_1.QrEntityType.FACILITY_ID,
            });
            created.qrToken = qr.token;
        }
        catch (err) {
            this.logger.warn({ msg: 'QR generation skipped for facility', err });
        }
        await this.repository.createAuditLog({
            facilityId: created.id,
            action: 'REGISTERED',
            performedBy: userId,
            details: `Facility profile created with code ${created.facilityCode}`,
        });
        return this.mapFacility(created);
    }
    async getFacilities() {
        const facilities = await this.repository.findAllFacilities();
        return facilities.map((f) => this.mapFacility(f));
    }
    async getFacilityById(id) {
        const facility = await this.repository.findFacilityById(id);
        if (!facility) {
            throw new common_1.NotFoundException('Facility profile not found in Master Registry');
        }
        return this.mapFacility(facility);
    }
    async updateFacility(id, dto) {
        const facility = await this.repository.findFacilityById(id);
        if (!facility)
            throw new common_1.NotFoundException('Facility profile not found');
        const updated = await this.repository.updateFacility(id, dto);
        await this.repository.createAuditLog({
            facilityId: id,
            action: 'UPDATED',
            details: 'Updated facility profile details',
        });
        return this.mapFacility(updated);
    }
    async softDeleteFacility(id) {
        const facility = await this.repository.findFacilityById(id);
        if (!facility)
            throw new common_1.NotFoundException('Facility profile not found');
        await this.repository.softDeleteFacility(id);
        return { message: 'Facility soft-deleted from active registry' };
    }
    async verifyFacility(id, dto, adminUserId) {
        const facility = await this.repository.findFacilityById(id);
        if (!facility)
            throw new common_1.NotFoundException('Facility profile not found');
        const prevStatus = facility.verificationStatus;
        const updated = await this.repository.updateFacility(id, {
            verificationStatus: 'VERIFIED',
            verificationNotes: dto.reason || 'Government & Healthcare Commission licenses verified',
            verifiedBy: adminUserId || 'ADMIN',
            verifiedAt: new Date(),
        });
        await this.repository.createHistory(id, {
            action: 'VERIFIED',
            previousStatus: prevStatus,
            newStatus: 'VERIFIED',
            reason: dto.reason || 'Licenses & accreditations verified',
            performedBy: adminUserId || 'ADMIN',
        });
        return this.mapFacility(updated);
    }
    async suspendFacility(id, dto, adminUserId) {
        const facility = await this.repository.findFacilityById(id);
        if (!facility)
            throw new common_1.NotFoundException('Facility profile not found');
        const prevStatus = facility.verificationStatus;
        const updated = await this.repository.updateFacility(id, {
            verificationStatus: 'SUSPENDED',
            verificationNotes: dto.reason || 'Operations suspended by authority',
        });
        await this.repository.createHistory(id, {
            action: 'SUSPENDED',
            previousStatus: prevStatus,
            newStatus: 'SUSPENDED',
            reason: dto.reason || 'Operations suspended',
            performedBy: adminUserId || 'ADMIN',
        });
        return this.mapFacility(updated);
    }
    async restoreFacility(id, dto, adminUserId) {
        const facility = await this.repository.findFacilityById(id, true);
        if (!facility)
            throw new common_1.NotFoundException('Facility profile not found');
        const prevStatus = facility.verificationStatus;
        const updated = await this.repository.updateFacility(id, {
            verificationStatus: 'VERIFIED',
            isDeleted: false,
            deletedAt: null,
        });
        await this.repository.createHistory(id, {
            action: 'RESTORED',
            previousStatus: prevStatus,
            newStatus: 'VERIFIED',
            reason: dto.reason || 'Facility restored',
            performedBy: adminUserId || 'ADMIN',
        });
        return this.mapFacility(updated);
    }
    async createDepartment(id, dto) {
        const facility = await this.repository.findFacilityById(id);
        if (!facility)
            throw new common_1.NotFoundException('Facility profile not found');
        const dept = await this.repository.createDepartment(id, dto);
        return {
            id: dept.id,
            facilityId: dept.facilityId,
            name: dept.name,
            code: dept.code || undefined,
            description: dept.description || undefined,
            departmentHead: dept.departmentHead || undefined,
            operatingHours: dept.operatingHours || undefined,
            createdAt: dept.createdAt.toISOString(),
        };
    }
    async getDepartments(id) {
        const facility = await this.repository.findFacilityById(id);
        if (!facility)
            throw new common_1.NotFoundException('Facility profile not found');
        const depts = await this.repository.findDepartmentsByFacilityId(id);
        return depts.map((d) => ({
            id: d.id,
            facilityId: d.facilityId,
            name: d.name,
            code: d.code || undefined,
            description: d.description || undefined,
            departmentHead: d.departmentHead || undefined,
            operatingHours: d.operatingHours || undefined,
            createdAt: d.createdAt.toISOString(),
        }));
    }
    async createRoom(id, dto) {
        const facility = await this.repository.findFacilityById(id);
        if (!facility)
            throw new common_1.NotFoundException('Facility profile not found');
        const room = await this.repository.createRoom(id, dto);
        return {
            id: room.id,
            facilityId: room.facilityId,
            departmentId: room.departmentId || undefined,
            roomNumber: room.roomNumber,
            roomName: room.roomName || undefined,
            building: room.building || undefined,
            block: room.block || undefined,
            floor: room.floor || undefined,
            wing: room.wing || undefined,
            roomCategory: room.roomCategory,
            capacity: room.capacity,
            isOperational: room.isOperational,
            createdAt: room.createdAt.toISOString(),
        };
    }
    async getRooms(id) {
        const facility = await this.repository.findFacilityById(id);
        if (!facility)
            throw new common_1.NotFoundException('Facility profile not found');
        const rooms = await this.repository.findRoomsByFacilityId(id);
        return rooms.map((r) => ({
            id: r.id,
            facilityId: r.facilityId,
            departmentId: r.departmentId || undefined,
            roomNumber: r.roomNumber,
            roomName: r.roomName || undefined,
            building: r.building || undefined,
            block: r.block || undefined,
            floor: r.floor || undefined,
            wing: r.wing || undefined,
            roomCategory: r.roomCategory,
            capacity: r.capacity,
            isOperational: r.isOperational,
            createdAt: r.createdAt.toISOString(),
        }));
    }
    async attachDocument(id, dto) {
        const facility = await this.repository.findFacilityById(id);
        if (!facility)
            throw new common_1.NotFoundException('Facility profile not found');
        const doc = await this.repository.attachDocument(id, dto);
        await this.repository.createAuditLog({
            facilityId: id,
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
    async getDocuments(id) {
        const facility = await this.repository.findFacilityById(id);
        if (!facility)
            throw new common_1.NotFoundException('Facility profile not found');
        const docs = await this.repository.findDocumentsByFacilityId(id);
        return docs.map((d) => ({
            id: d.id,
            documentType: d.documentType,
            medicalAttachmentId: d.medicalAttachmentId || undefined,
            verificationStatus: d.verificationStatus,
            createdAt: d.createdAt.toISOString(),
        }));
    }
    async assignDoctor(id, dto) {
        const facility = await this.repository.findFacilityById(id);
        if (!facility)
            throw new common_1.NotFoundException('Facility profile not found');
        return this.repository.assignDoctor(id, dto);
    }
    async generateQr(userId, id) {
        const facility = await this.repository.findFacilityById(id);
        if (!facility)
            throw new common_1.NotFoundException('Facility profile not found');
        const qr = await this.qrService.generateQr(userId, {
            entityId: id,
            entityType: generate_qr_dto_1.QrEntityType.FACILITY_ID,
        });
        return { facilityId: id, qrToken: qr.token };
    }
    async getHistory(id) {
        const facility = await this.repository.findFacilityById(id, true);
        if (!facility)
            throw new common_1.NotFoundException('Facility profile not found');
        const history = await this.repository.findHistoryByFacilityId(id);
        return history.map((h) => ({
            id: h.id,
            facilityId: h.facilityId,
            action: h.action,
            previousStatus: h.previousStatus || undefined,
            newStatus: h.newStatus,
            reason: h.reason || undefined,
            performedBy: h.performedBy || undefined,
            createdAt: h.createdAt.toISOString(),
        }));
    }
    async searchFacilities(query) {
        if (!query || query.trim().length === 0)
            return [];
        const facilities = await this.repository.searchFacilities(query.trim());
        return facilities.map((f) => this.mapFacility(f));
    }
    async getStatistics() {
        return this.repository.getStatistics();
    }
    async listFacilities() {
        const list = await this.repository.findAllFacilities();
        return list.map((f) => ({
            id: f.id,
            name: f.name,
            address: f.streetAddress,
            phone: f.phone,
        }));
    }
    async getFacilityDetails(facilityId) {
        const facility = await this.repository.findFacilityById(facilityId);
        if (!facility)
            throw new common_1.NotFoundException('Facility not found');
        return {
            id: facility.id,
            name: facility.name,
            address: facility.streetAddress,
            phone: facility.phone,
        };
    }
    async listDepartments(facilityId) {
        const facility = await this.repository.findFacilityById(facilityId);
        if (!facility)
            throw new common_1.NotFoundException('Facility not found');
        const list = await this.repository.findDepartmentsByFacilityId(facilityId);
        return list.map((d) => ({
            id: d.id,
            name: d.name,
            description: d.description || undefined,
        }));
    }
    async listDoctors(facilityId) {
        const facility = await this.repository.findFacilityById(facilityId);
        if (!facility)
            throw new common_1.NotFoundException('Facility not found');
        const list = await this.repository.findDoctorsByFacilityId(facilityId);
        return list.map((d) => ({
            id: d.id,
            fullName: d.fullName,
            specialization: d.primarySpecialization || 'General',
            credentials: d.medicalCouncil || 'MD',
        }));
    }
};
exports.FacilityService = FacilityService;
exports.FacilityService = FacilityService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('IFacilityRepository')),
    __metadata("design:paramtypes", [Object, qr_service_1.QrService,
        nestjs_pino_1.Logger])
], FacilityService);
//# sourceMappingURL=facility.service.js.map
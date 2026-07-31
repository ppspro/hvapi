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
exports.StaffService = void 0;
const common_1 = require("@nestjs/common");
const qr_service_1 = require("../../../qr/application/use-cases/qr.service");
const generate_qr_dto_1 = require("../../../qr/presentation/dto/generate-qr.dto");
const nestjs_pino_1 = require("nestjs-pino");
let StaffService = class StaffService {
    constructor(repository, qrService, logger) {
        this.repository = repository;
        this.qrService = qrService;
        this.logger = logger;
    }
    mapStaff(s) {
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
            qualifications: s.qualifications?.map((q) => ({
                id: q.id,
                degreeName: q.degreeName,
                instituteName: q.instituteName,
                passingYear: q.passingYear,
                fieldOfStudy: q.fieldOfStudy || undefined,
                createdAt: q.createdAt.toISOString(),
            })) || [],
            documents: s.documents?.map((doc) => ({
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
    async registerStaff(userId, dto) {
        if (dto.employeeCode) {
            const codeDup = await this.repository.findStaffByEmployeeCode(dto.employeeCode);
            if (codeDup) {
                throw new common_1.ConflictException('Employee code already registered in Master Workforce Registry');
            }
        }
        const created = await this.repository.createStaff({
            ...dto,
            registeredBy: userId,
        });
        try {
            const qr = await this.qrService.generateQr(userId, {
                entityId: created.id,
                entityType: generate_qr_dto_1.QrEntityType.STAFF_ID,
            });
            created.qrToken = qr.token;
        }
        catch (err) {
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
    async getStaffMembers() {
        const staffList = await this.repository.findStaffMembers();
        return staffList.map((s) => this.mapStaff(s));
    }
    async getStaffById(id) {
        const staff = await this.repository.findStaffById(id);
        if (!staff) {
            throw new common_1.NotFoundException('Staff member profile not found in Master Registry');
        }
        return this.mapStaff(staff);
    }
    async updateStaff(id, dto) {
        const staff = await this.repository.findStaffById(id);
        if (!staff)
            throw new common_1.NotFoundException('Staff member profile not found');
        const updated = await this.repository.updateStaff(id, dto);
        await this.repository.createAuditLog({
            staffId: id,
            action: 'UPDATED',
            details: 'Updated staff member profile details',
        });
        return this.mapStaff(updated);
    }
    async softDeleteStaff(id) {
        const staff = await this.repository.findStaffById(id);
        if (!staff)
            throw new common_1.NotFoundException('Staff member profile not found');
        await this.repository.softDeleteStaff(id);
        return { message: 'Staff member soft-deleted from active registry' };
    }
    async verifyStaff(id, dto, adminUserId) {
        const staff = await this.repository.findStaffById(id);
        if (!staff)
            throw new common_1.NotFoundException('Staff member profile not found');
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
    async suspendStaff(id, dto, adminUserId) {
        const staff = await this.repository.findStaffById(id);
        if (!staff)
            throw new common_1.NotFoundException('Staff member profile not found');
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
    async restoreStaff(id, dto, adminUserId) {
        const staff = await this.repository.findStaffById(id, true);
        if (!staff)
            throw new common_1.NotFoundException('Staff member profile not found');
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
    async addQualification(id, dto) {
        const staff = await this.repository.findStaffById(id);
        if (!staff)
            throw new common_1.NotFoundException('Staff member profile not found');
        await this.repository.addQualification(id, dto);
        const updated = await this.repository.findStaffById(id);
        return this.mapStaff(updated);
    }
    async attachDocument(id, dto) {
        const staff = await this.repository.findStaffById(id);
        if (!staff)
            throw new common_1.NotFoundException('Staff member profile not found');
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
    async getDocuments(id) {
        const staff = await this.repository.findStaffById(id);
        if (!staff)
            throw new common_1.NotFoundException('Staff member profile not found');
        const docs = await this.repository.findDocumentsByStaffId(id);
        return docs.map((d) => ({
            id: d.id,
            documentType: d.documentType,
            medicalAttachmentId: d.medicalAttachmentId || undefined,
            verificationStatus: d.verificationStatus,
            createdAt: d.createdAt.toISOString(),
        }));
    }
    async assignFacility(id, dto) {
        const staff = await this.repository.findStaffById(id);
        if (!staff)
            throw new common_1.NotFoundException('Staff member profile not found');
        const updated = await this.repository.assignFacility(id, dto.primaryFacilityId, dto.secondaryFacilityId);
        return this.mapStaff(updated);
    }
    async assignDepartment(id, dto) {
        const staff = await this.repository.findStaffById(id);
        if (!staff)
            throw new common_1.NotFoundException('Staff member profile not found');
        const updated = await this.repository.assignDepartment(id, dto.primaryDepartmentId, dto.secondaryDepartmentId);
        return this.mapStaff(updated);
    }
    async generateQr(userId, id) {
        const staff = await this.repository.findStaffById(id);
        if (!staff)
            throw new common_1.NotFoundException('Staff member profile not found');
        const qr = await this.qrService.generateQr(userId, {
            entityId: id,
            entityType: generate_qr_dto_1.QrEntityType.STAFF_ID,
        });
        return { staffId: id, qrToken: qr.token };
    }
    async getHistory(id) {
        const staff = await this.repository.findStaffById(id, true);
        if (!staff)
            throw new common_1.NotFoundException('Staff member profile not found');
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
    async searchStaff(query) {
        if (!query || query.trim().length === 0)
            return [];
        const staffList = await this.repository.searchStaff(query.trim());
        return staffList.map((s) => this.mapStaff(s));
    }
    async getStatistics() {
        return this.repository.getStatistics();
    }
};
exports.StaffService = StaffService;
exports.StaffService = StaffService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('IStaffRepository')),
    __metadata("design:paramtypes", [Object, qr_service_1.QrService,
        nestjs_pino_1.Logger])
], StaffService);
//# sourceMappingURL=staff.service.js.map
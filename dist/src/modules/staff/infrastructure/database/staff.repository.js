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
exports.StaffRepository = void 0;
const common_1 = require("@nestjs/common");
const database_service_1 = require("../../../../database/database.service");
let StaffRepository = class StaffRepository {
    constructor(db) {
        this.db = db;
    }
    async createStaff(data) {
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
        return created;
    }
    async findStaffById(id, includeDeleted = false) {
        return (await this.db.staffMember.findFirst({
            where: { id, ...(includeDeleted ? {} : { isDeleted: false }) },
            include: {
                qualifications: true,
                certifications: true,
                experiences: true,
                documents: { include: { medicalAttachment: true } },
                history: { orderBy: { createdAt: 'desc' } },
            },
        }));
    }
    async findStaffByEmployeeCode(employeeCode) {
        return (await this.db.staffMember.findUnique({
            where: { employeeCode },
        }));
    }
    async findStaffByUserId(userId) {
        return (await this.db.staffMember.findUnique({
            where: { userId },
        }));
    }
    async findStaffMembers(includeDeleted = false) {
        return (await this.db.staffMember.findMany({
            where: includeDeleted ? {} : { isDeleted: false },
            include: {
                qualifications: true,
                certifications: true,
                experiences: true,
                documents: true,
            },
            orderBy: { createdAt: 'desc' },
        }));
    }
    async updateStaff(id, data) {
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
                verificationStatus: data.verificationStatus || undefined,
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
        }));
    }
    async softDeleteStaff(id) {
        await this.db.staffMember.update({
            where: { id },
            data: { isDeleted: true, deletedAt: new Date() },
        });
    }
    async searchStaff(query) {
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
        }));
    }
    async addQualification(staffId, data) {
        return (await this.db.staffQualification.create({
            data: {
                staffId,
                degreeName: data.degreeName,
                instituteName: data.instituteName,
                passingYear: data.passingYear,
                fieldOfStudy: data.fieldOfStudy || null,
            },
        }));
    }
    async addCertification(staffId, data) {
        return (await this.db.staffCertification.create({
            data: {
                staffId,
                title: data.title,
                issuingAuthority: data.issuingAuthority,
                issueDate: data.issueDate ? new Date(data.issueDate) : null,
                expiryDate: data.expiryDate ? new Date(data.expiryDate) : null,
            },
        }));
    }
    async addExperience(staffId, data) {
        return (await this.db.staffExperience.create({
            data: {
                staffId,
                designation: data.designation,
                organization: data.organization,
                startDate: new Date(data.startDate),
                endDate: data.endDate ? new Date(data.endDate) : null,
                isCurrent: data.isCurrent ?? false,
            },
        }));
    }
    async attachDocument(staffId, data) {
        return (await this.db.staffDocument.create({
            data: {
                staffId,
                documentType: data.documentType,
                medicalAttachmentId: data.medicalAttachmentId || null,
                verificationStatus: 'PENDING',
            },
            include: { medicalAttachment: true },
        }));
    }
    async findDocumentsByStaffId(staffId) {
        return (await this.db.staffDocument.findMany({
            where: { staffId },
            include: { medicalAttachment: true },
            orderBy: { createdAt: 'desc' },
        }));
    }
    async assignFacility(staffId, primaryFacilityId, secondaryFacilityId) {
        return (await this.db.staffMember.update({
            where: { id: staffId },
            data: {
                primaryFacilityId,
                secondaryFacilityId: secondaryFacilityId || null,
            },
            include: { qualifications: true, documents: true },
        }));
    }
    async assignDepartment(staffId, primaryDepartmentId, secondaryDepartmentId) {
        return (await this.db.staffMember.update({
            where: { id: staffId },
            data: {
                primaryDepartmentId: primaryDepartmentId || null,
                secondaryDepartmentId: secondaryDepartmentId || null,
            },
            include: { qualifications: true, documents: true },
        }));
    }
    async createHistory(staffId, data) {
        return (await this.db.staffHistory.create({
            data: {
                staffId,
                action: data.action,
                previousStatus: data.previousStatus || null,
                newStatus: data.newStatus,
                reason: data.reason || null,
                performedBy: data.performedBy || null,
            },
        }));
    }
    async findHistoryByStaffId(staffId) {
        return (await this.db.staffHistory.findMany({
            where: { staffId },
            orderBy: { createdAt: 'desc' },
        }));
    }
    async createAuditLog(data) {
        return (await this.db.staffAuditLog.create({
            data: {
                staffId: data.staffId,
                action: data.action,
                performedBy: data.performedBy || null,
                details: data.details || null,
            },
        }));
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
};
exports.StaffRepository = StaffRepository;
exports.StaffRepository = StaffRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [database_service_1.DatabaseService])
], StaffRepository);
//# sourceMappingURL=staff.repository.js.map
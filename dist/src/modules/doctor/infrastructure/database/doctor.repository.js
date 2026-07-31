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
exports.DoctorRepository = void 0;
const common_1 = require("@nestjs/common");
const database_service_1 = require("../../../../database/database.service");
let DoctorRepository = class DoctorRepository {
    constructor(db) {
        this.db = db;
    }
    async findProfileByUserId(userId) {
        return (await this.db.doctorProfile.findUnique({
            where: { userId },
            include: {
                qualifications: true,
                certifications: true,
                experiences: true,
                documents: { include: { medicalAttachment: true } },
                history: { orderBy: { createdAt: 'desc' } },
            },
        }));
    }
    async createDoctor(data) {
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
        return created;
    }
    async findDoctorById(id, includeDeleted = false) {
        return (await this.db.doctorProfile.findFirst({
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
    async findDoctorByRegistrationNumber(registrationNumber) {
        return (await this.db.doctorProfile.findUnique({
            where: { registrationNumber },
        }));
    }
    async findDoctorByLicenseNumber(licenseNumber) {
        return (await this.db.doctorProfile.findUnique({
            where: { licenseNumber },
        }));
    }
    async findDoctorByProviderIdentifier(providerIdentifier) {
        return (await this.db.doctorProfile.findUnique({
            where: { providerIdentifier },
        }));
    }
    async findDoctors(includeDeleted = false) {
        return (await this.db.doctorProfile.findMany({
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
    async findPendingDoctors() {
        return (await this.db.doctorProfile.findMany({
            where: { verificationStatus: 'PENDING', isDeleted: false },
            include: { qualifications: true, documents: true },
            orderBy: { createdAt: 'desc' },
        }));
    }
    async updateDoctor(id, data) {
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
                verificationStatus: data.verificationStatus || undefined,
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
        }));
    }
    async softDeleteDoctor(id) {
        await this.db.doctorProfile.update({
            where: { id },
            data: { isDeleted: true, deletedAt: new Date() },
        });
    }
    async searchDoctors(query) {
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
        }));
    }
    async addQualification(doctorProfileId, data) {
        return (await this.db.doctorQualification.create({
            data: {
                doctorProfileId,
                degreeName: data.degreeName,
                instituteName: data.instituteName,
                passingYear: data.passingYear,
                specialization: data.specialization || null,
            },
        }));
    }
    async addCertification(doctorProfileId, data) {
        return (await this.db.doctorCertification.create({
            data: {
                doctorProfileId,
                title: data.title,
                issuingAuthority: data.issuingAuthority,
                issueDate: data.issueDate ? new Date(data.issueDate) : null,
                expiryDate: data.expiryDate ? new Date(data.expiryDate) : null,
            },
        }));
    }
    async addExperience(doctorProfileId, data) {
        return (await this.db.doctorExperience.create({
            data: {
                doctorProfileId,
                designation: data.designation,
                hospitalName: data.hospitalName,
                startDate: new Date(data.startDate),
                endDate: data.endDate ? new Date(data.endDate) : null,
                isCurrent: data.isCurrent ?? false,
            },
        }));
    }
    async attachDocument(doctorProfileId, data) {
        return (await this.db.doctorDocument.create({
            data: {
                doctorProfileId,
                documentType: data.documentType,
                medicalAttachmentId: data.medicalAttachmentId || null,
                verificationStatus: 'PENDING',
            },
            include: { medicalAttachment: true },
        }));
    }
    async findDocumentsByDoctorId(doctorProfileId) {
        return (await this.db.doctorDocument.findMany({
            where: { doctorProfileId },
            include: { medicalAttachment: true },
            orderBy: { createdAt: 'desc' },
        }));
    }
    async findSlotsByDoctorId(doctorProfileId) {
        return (await this.db.doctorScheduleSlot.findMany({
            where: { doctorProfileId },
            orderBy: { startTime: 'asc' },
        }));
    }
    async createHistory(doctorProfileId, data) {
        return (await this.db.doctorHistory.create({
            data: {
                doctorProfileId,
                action: data.action,
                previousStatus: data.previousStatus || null,
                newStatus: data.newStatus,
                reason: data.reason || null,
                performedBy: data.performedBy || null,
            },
        }));
    }
    async findHistoryByDoctorId(doctorProfileId) {
        return (await this.db.doctorHistory.findMany({
            where: { doctorProfileId },
            orderBy: { createdAt: 'desc' },
        }));
    }
    async createAuditLog(data) {
        return (await this.db.doctorAuditLog.create({
            data: {
                doctorProfileId: data.doctorProfileId,
                action: data.action,
                performedBy: data.performedBy || null,
                details: data.details || null,
            },
        }));
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
};
exports.DoctorRepository = DoctorRepository;
exports.DoctorRepository = DoctorRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [database_service_1.DatabaseService])
], DoctorRepository);
//# sourceMappingURL=doctor.repository.js.map
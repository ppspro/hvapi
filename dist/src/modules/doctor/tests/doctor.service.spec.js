"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const doctor_service_1 = require("../application/use-cases/doctor.service");
const common_1 = require("@nestjs/common");
const nestjs_pino_1 = require("nestjs-pino");
const qr_service_1 = require("../../qr/application/use-cases/qr.service");
const mockProfileId = 'doctor-uuid-1';
const mockUserId = 'user-uuid-1';
const mockRepo = {
    findProfileByUserId: jest.fn(),
    createDoctor: jest.fn(),
    findDoctorById: jest.fn(),
    findDoctorByRegistrationNumber: jest.fn(),
    findDoctorByLicenseNumber: jest.fn(),
    findDoctorByProviderIdentifier: jest.fn(),
    findDoctors: jest.fn(),
    findPendingDoctors: jest.fn(),
    updateDoctor: jest.fn(),
    softDeleteDoctor: jest.fn(),
    searchDoctors: jest.fn(),
    addQualification: jest.fn(),
    addCertification: jest.fn(),
    addExperience: jest.fn(),
    attachDocument: jest.fn(),
    findDocumentsByDoctorId: jest.fn(),
    findSlotsByDoctorId: jest.fn(),
    createHistory: jest.fn(),
    findHistoryByDoctorId: jest.fn(),
    createAuditLog: jest.fn(),
    getStatistics: jest.fn(),
};
const mockLogger = {
    log: jest.fn(),
    error: jest.fn(),
    warn: jest.fn(),
};
const mockQrService = {
    generateQr: jest.fn(),
    verifyQrPayload: jest.fn(),
    rotateQr: jest.fn(),
    revokeQr: jest.fn(),
};
describe('DoctorService', () => {
    let service;
    beforeEach(async () => {
        jest.clearAllMocks();
        const module = await testing_1.Test.createTestingModule({
            providers: [
                doctor_service_1.DoctorService,
                { provide: 'IDoctorRepository', useValue: mockRepo },
                { provide: qr_service_1.QrService, useValue: mockQrService },
                { provide: nestjs_pino_1.Logger, useValue: mockLogger },
            ],
        }).compile();
        service = module.get(doctor_service_1.DoctorService);
    });
    describe('registerDoctor', () => {
        it('should throw if registration number is duplicate', async () => {
            mockRepo.findProfileByUserId.mockResolvedValue(null);
            mockRepo.findDoctorByRegistrationNumber.mockResolvedValue({ id: 'existing' });
            await expect(service.registerDoctor(mockUserId, {
                fullName: 'Dr. Fleming',
                primarySpecialization: 'Cardiology',
                medicalCouncil: 'PMDC',
                registrationNumber: 'REG-100',
                licenseNumber: 'LIC-100',
            })).rejects.toThrow(common_1.ConflictException);
        });
        it('should register doctor profile, issue provider ID, and generate QR identity', async () => {
            mockRepo.findProfileByUserId.mockResolvedValue(null);
            mockRepo.findDoctorByRegistrationNumber.mockResolvedValue(null);
            mockRepo.findDoctorByLicenseNumber.mockResolvedValue(null);
            const mockCreated = {
                id: mockProfileId,
                userId: mockUserId,
                fullName: 'Dr. Fleming',
                yearsOfExperience: 15,
                primarySpecialization: 'Cardiology',
                medicalCouncil: 'PMDC',
                registrationNumber: 'REG-100',
                licenseNumber: 'LIC-100',
                providerIdentifier: 'DOC-360-123456',
                verificationStatus: 'PENDING',
                isDeleted: false,
                qualifications: [],
                certifications: [],
                experiences: [],
                documents: [],
                createdAt: new Date(),
                updatedAt: new Date(),
            };
            mockRepo.createDoctor.mockResolvedValue(mockCreated);
            mockQrService.generateQr.mockResolvedValue({ token: 'HVQR-DOCTOR100' });
            mockRepo.createAuditLog.mockResolvedValue({});
            const result = await service.registerDoctor(mockUserId, {
                fullName: 'Dr. Fleming',
                primarySpecialization: 'Cardiology',
                medicalCouncil: 'PMDC',
                registrationNumber: 'REG-100',
                licenseNumber: 'LIC-100',
            });
            expect(result.id).toBe(mockProfileId);
            expect(result.providerIdentifier).toBe('DOC-360-123456');
            expect(result.verificationStatus).toBe('PENDING');
            expect(mockQrService.generateQr).toHaveBeenCalledWith(mockUserId, expect.objectContaining({
                entityId: mockProfileId,
            }));
        });
    });
    describe('verification workflow (verify / reject / renew)', () => {
        it('should verify doctor credentials and set status to VERIFIED', async () => {
            mockRepo.findDoctorById.mockResolvedValue({
                id: mockProfileId,
                verificationStatus: 'PENDING',
                isDeleted: false,
                qualifications: [],
                certifications: [],
                experiences: [],
                documents: [],
                createdAt: new Date(),
                updatedAt: new Date(),
            });
            const mockVerified = {
                id: mockProfileId,
                verificationStatus: 'VERIFIED',
                verifiedBy: 'admin-1',
                verifiedAt: new Date(),
                isDeleted: false,
                qualifications: [],
                certifications: [],
                experiences: [],
                documents: [],
                createdAt: new Date(),
                updatedAt: new Date(),
            };
            mockRepo.updateDoctor.mockResolvedValue(mockVerified);
            mockRepo.createHistory.mockResolvedValue({});
            mockRepo.createAuditLog.mockResolvedValue({});
            const result = await service.verifyDoctor(mockProfileId, { reason: 'Council record checked' }, 'admin-1');
            expect(result.verificationStatus).toBe('VERIFIED');
            expect(mockRepo.createHistory).toHaveBeenCalledWith(mockProfileId, expect.objectContaining({
                action: 'VERIFIED',
            }));
        });
        it('should renew medical registration license', async () => {
            mockRepo.findDoctorById.mockResolvedValue({
                id: mockProfileId,
                verificationStatus: 'VERIFIED',
                isDeleted: false,
                qualifications: [],
                certifications: [],
                experiences: [],
                documents: [],
                createdAt: new Date(),
                updatedAt: new Date(),
            });
            const mockRenewed = {
                id: mockProfileId,
                registrationExpiryDate: new Date('2029-12-31'),
                verificationStatus: 'VERIFIED',
                isDeleted: false,
                qualifications: [],
                certifications: [],
                experiences: [],
                documents: [],
                createdAt: new Date(),
                updatedAt: new Date(),
            };
            mockRepo.updateDoctor.mockResolvedValue(mockRenewed);
            mockRepo.createHistory.mockResolvedValue({});
            const result = await service.renewLicense(mockProfileId, { newExpiryDate: '2029-12-31' }, 'admin-1');
            expect(result.verificationStatus).toBe('VERIFIED');
        });
    });
    describe('document linkage (reusing MedicalAttachment)', () => {
        it('should attach document and link to MedicalAttachment ID', async () => {
            mockRepo.findDoctorById.mockResolvedValue({ id: mockProfileId });
            const mockDoc = {
                id: 'doc-1',
                doctorProfileId: mockProfileId,
                documentType: 'MEDICAL_LICENSE',
                medicalAttachmentId: 'attachment-uuid-1',
                verificationStatus: 'PENDING',
                createdAt: new Date(),
            };
            mockRepo.attachDocument.mockResolvedValue(mockDoc);
            mockRepo.createAuditLog.mockResolvedValue({});
            const result = await service.attachDocument(mockProfileId, {
                documentType: 'MEDICAL_LICENSE',
                medicalAttachmentId: 'attachment-uuid-1',
            });
            expect(result.id).toBe('doc-1');
            expect(result.medicalAttachmentId).toBe('attachment-uuid-1');
        });
    });
});
//# sourceMappingURL=doctor.service.spec.js.map
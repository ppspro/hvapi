"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const medical_record_service_1 = require("../application/use-cases/medical-record.service");
const common_1 = require("@nestjs/common");
const mockProfileId = 'profile-uuid-1';
const mockUserId = 'user-uuid-1';
const mockRecordId = 'record-uuid-1';
const mockAttachmentId = 'attachment-uuid-1';
const mockRepo = {
    findProfileByUserId: jest.fn(),
    createRecord: jest.fn(),
    findRecordById: jest.fn(),
    findRecordsByProfile: jest.fn(),
    updateRecord: jest.fn(),
    softDeleteRecord: jest.fn(),
    restoreRecord: jest.fn(),
    searchRecords: jest.fn(),
    getTimeline: jest.fn(),
    createAttachment: jest.fn(),
    findAttachmentById: jest.fn(),
    findAttachmentsByRecord: jest.fn(),
    findAttachmentsByProfile: jest.fn(),
    updateAttachment: jest.fn(),
    softDeleteAttachment: jest.fn(),
    restoreAttachment: jest.fn(),
    createAttachmentVersion: jest.fn(),
    findAttachmentVersions: jest.fn(),
    createAuditLog: jest.fn(),
};
const qr_service_1 = require("../../qr/application/use-cases/qr.service");
const mockQrService = {
    generateQr: jest.fn(),
    verifyQrPayload: jest.fn(),
    rotateQr: jest.fn(),
    revokeQr: jest.fn(),
};
describe('MedicalRecordService', () => {
    let service;
    beforeEach(async () => {
        jest.clearAllMocks();
        const module = await testing_1.Test.createTestingModule({
            providers: [
                medical_record_service_1.MedicalRecordService,
                { provide: 'IMedicalRecordRepository', useValue: mockRepo },
                { provide: qr_service_1.QrService, useValue: mockQrService },
            ],
        }).compile();
        service = module.get(medical_record_service_1.MedicalRecordService);
    });
    describe('createRecord', () => {
        it('should throw if patient profile is not found', async () => {
            mockRepo.findProfileByUserId.mockResolvedValue(null);
            await expect(service.createRecord(mockUserId, { title: 'Test Record' })).rejects.toThrow(common_1.NotFoundException);
        });
        it('should calculate BMI when height and weight are provided and create record', async () => {
            mockRepo.findProfileByUserId.mockResolvedValue({ id: mockProfileId });
            const mockCreated = {
                id: mockRecordId,
                patientProfileId: mockProfileId,
                title: 'Routine Checkup',
                status: 'FINAL',
                isDeleted: false,
                encounters: [],
                diagnoses: [],
                vitalSigns: [{ heightCm: 175, weightKg: 70, bmi: 22.9 }],
                procedures: [],
                attachments: [],
                createdAt: new Date(),
                updatedAt: new Date(),
            };
            mockRepo.createRecord.mockResolvedValue(mockCreated);
            mockRepo.createAuditLog.mockResolvedValue({});
            const result = await service.createRecord(mockUserId, {
                title: 'Routine Checkup',
                vitalSigns: { heightCm: 175, weightKg: 70 },
            });
            expect(result.id).toBe(mockRecordId);
            expect(result.title).toBe('Routine Checkup');
            expect(mockRepo.createAuditLog).toHaveBeenCalledWith(expect.objectContaining({
                action: 'CREATED',
                medicalRecordId: mockRecordId,
            }));
        });
    });
    describe('updateRecord', () => {
        it('should throw if record is archived', async () => {
            mockRepo.findProfileByUserId.mockResolvedValue({ id: mockProfileId });
            mockRepo.findRecordById.mockResolvedValue({
                id: mockRecordId,
                patientProfileId: mockProfileId,
                status: 'ARCHIVED',
            });
            await expect(service.updateRecord(mockUserId, mockRecordId, { title: 'New Title' })).rejects.toThrow(common_1.BadRequestException);
        });
        it('should throw if record belongs to another user', async () => {
            mockRepo.findProfileByUserId.mockResolvedValue({ id: mockProfileId });
            mockRepo.findRecordById.mockResolvedValue({
                id: mockRecordId,
                patientProfileId: 'other-profile',
                status: 'FINAL',
            });
            await expect(service.updateRecord(mockUserId, mockRecordId, { title: 'New Title' })).rejects.toThrow(common_1.ForbiddenException);
        });
    });
    describe('uploadAttachment', () => {
        it('should reject unsupported MIME type', async () => {
            mockRepo.findProfileByUserId.mockResolvedValue({ id: mockProfileId });
            await expect(service.uploadAttachment(mockUserId, null, {
                fileName: 'test.exe',
                originalName: 'test.exe',
                fileSize: 1000,
                mimeType: 'application/x-msdownload',
                storageKey: 'key',
                storageUrl: 'url',
            })).rejects.toThrow(common_1.BadRequestException);
        });
        it('should reject file exceeding 15MB size limit', async () => {
            mockRepo.findProfileByUserId.mockResolvedValue({ id: mockProfileId });
            await expect(service.uploadAttachment(mockUserId, null, {
                fileName: 'large.pdf',
                originalName: 'large.pdf',
                fileSize: 20 * 1024 * 1024,
                mimeType: 'application/pdf',
                storageKey: 'key',
                storageUrl: 'url',
            })).rejects.toThrow(common_1.BadRequestException);
        });
        it('should upload valid PDF attachment successfully', async () => {
            mockRepo.findProfileByUserId.mockResolvedValue({ id: mockProfileId });
            const mockCreatedAtt = {
                id: mockAttachmentId,
                patientProfileId: mockProfileId,
                fileName: 'report.pdf',
                originalName: 'report.pdf',
                fileSize: 1048576,
                mimeType: 'application/pdf',
                category: 'LAB_RESULT',
                storageKey: 'key',
                storageUrl: 'url',
                version: 1,
                isDeleted: false,
                virusScanStatus: 'CLEAN',
                createdAt: new Date(),
                updatedAt: new Date(),
            };
            mockRepo.createAttachment.mockResolvedValue(mockCreatedAtt);
            mockRepo.createAuditLog.mockResolvedValue({});
            const result = await service.uploadAttachment(mockUserId, null, {
                fileName: 'report.pdf',
                originalName: 'report.pdf',
                fileSize: 1048576,
                mimeType: 'application/pdf',
                category: 'LAB_RESULT',
                storageKey: 'key',
                storageUrl: 'url',
            });
            expect(result.id).toBe(mockAttachmentId);
            expect(result.virusScanStatus).toBe('CLEAN');
        });
    });
    describe('updateAttachment', () => {
        it('should increment version when a new storage key is provided', async () => {
            mockRepo.findProfileByUserId.mockResolvedValue({ id: mockProfileId });
            mockRepo.findAttachmentById.mockResolvedValue({
                id: mockAttachmentId,
                patientProfileId: mockProfileId,
                version: 1,
                fileSize: 1048576,
            });
            const mockUpdated = {
                id: mockAttachmentId,
                patientProfileId: mockProfileId,
                version: 2,
                fileSize: 2048576,
                fileName: 'v2.pdf',
                originalName: 'v2.pdf',
                mimeType: 'application/pdf',
                category: 'LAB_RESULT',
                storageKey: 'key2',
                storageUrl: 'url2',
                isDeleted: false,
                virusScanStatus: 'CLEAN',
                createdAt: new Date(),
                updatedAt: new Date(),
            };
            mockRepo.updateAttachment.mockResolvedValue(mockUpdated);
            const result = await service.updateAttachment(mockUserId, mockAttachmentId, {
                storageKey: 'key2',
                storageUrl: 'url2',
                fileSize: 2048576,
            });
            expect(result.version).toBe(2);
        });
    });
});
//# sourceMappingURL=medical-record.service.spec.js.map
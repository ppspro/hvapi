"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const staff_service_1 = require("../application/use-cases/staff.service");
const common_1 = require("@nestjs/common");
const nestjs_pino_1 = require("nestjs-pino");
const qr_service_1 = require("../../qr/application/use-cases/qr.service");
const mockStaffId = 'staff-uuid-1';
const mockUserId = 'user-uuid-1';
const mockRepo = {
    createStaff: jest.fn(),
    findStaffById: jest.fn(),
    findStaffByEmployeeCode: jest.fn(),
    findStaffByUserId: jest.fn(),
    findStaffMembers: jest.fn(),
    updateStaff: jest.fn(),
    softDeleteStaff: jest.fn(),
    searchStaff: jest.fn(),
    addQualification: jest.fn(),
    addCertification: jest.fn(),
    addExperience: jest.fn(),
    attachDocument: jest.fn(),
    findDocumentsByStaffId: jest.fn(),
    assignFacility: jest.fn(),
    assignDepartment: jest.fn(),
    createHistory: jest.fn(),
    findHistoryByStaffId: jest.fn(),
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
};
describe('StaffService', () => {
    let service;
    beforeEach(async () => {
        jest.clearAllMocks();
        const module = await testing_1.Test.createTestingModule({
            providers: [
                staff_service_1.StaffService,
                { provide: 'IStaffRepository', useValue: mockRepo },
                { provide: qr_service_1.QrService, useValue: mockQrService },
                { provide: nestjs_pino_1.Logger, useValue: mockLogger },
            ],
        }).compile();
        service = module.get(staff_service_1.StaffService);
    });
    describe('registerStaff', () => {
        it('should throw ConflictException if custom employeeCode is duplicate', async () => {
            mockRepo.findStaffByEmployeeCode.mockResolvedValue({ id: 'existing' });
            await expect(service.registerStaff(mockUserId, {
                fullName: 'Sister Mary Joseph',
                phone: '+92-300-9876543',
                staffType: 'NURSE',
                designation: 'Head ICU Staff Nurse',
                primaryFacilityId: 'facility-uuid-1',
                employeeCode: 'STF-NURSE-001',
            })).rejects.toThrow(common_1.ConflictException);
        });
        it('should register staff member profile, issue code, and generate QR digital identity', async () => {
            mockRepo.findStaffByEmployeeCode.mockResolvedValue(null);
            const mockCreated = {
                id: mockStaffId,
                fullName: 'Sister Mary Joseph',
                employeeCode: 'STF-360-998877',
                phone: '+92-300-9876543',
                staffType: 'NURSE',
                designation: 'Head ICU Staff Nurse',
                primaryFacilityId: 'facility-uuid-1',
                employmentType: 'PERMANENT',
                employmentStatus: 'ACTIVE',
                joiningDate: new Date(),
                noticePeriodDays: 30,
                verificationStatus: 'PENDING',
                isDeleted: false,
                qualifications: [],
                documents: [],
                createdAt: new Date(),
                updatedAt: new Date(),
            };
            mockRepo.createStaff.mockResolvedValue(mockCreated);
            mockQrService.generateQr.mockResolvedValue({ token: 'HVQR-STAFF100' });
            mockRepo.createAuditLog.mockResolvedValue({});
            const result = await service.registerStaff(mockUserId, {
                fullName: 'Sister Mary Joseph',
                phone: '+92-300-9876543',
                staffType: 'NURSE',
                designation: 'Head ICU Staff Nurse',
                primaryFacilityId: 'facility-uuid-1',
            });
            expect(result.id).toBe(mockStaffId);
            expect(result.employeeCode).toBe('STF-360-998877');
            expect(result.verificationStatus).toBe('PENDING');
            expect(mockQrService.generateQr).toHaveBeenCalledWith(mockUserId, expect.objectContaining({
                entityId: mockStaffId,
            }));
        });
    });
    describe('facility and department assignment', () => {
        it('should update primary and secondary facility assignments', async () => {
            mockRepo.findStaffById.mockResolvedValue({ id: mockStaffId });
            const mockAssigned = {
                id: mockStaffId,
                primaryFacilityId: 'facility-uuid-1',
                secondaryFacilityId: 'facility-uuid-2',
                joiningDate: new Date(),
                createdAt: new Date(),
                updatedAt: new Date(),
            };
            mockRepo.assignFacility.mockResolvedValue(mockAssigned);
            const result = await service.assignFacility(mockStaffId, {
                primaryFacilityId: 'facility-uuid-1',
                secondaryFacilityId: 'facility-uuid-2',
            });
            expect(result.primaryFacilityId).toBe('facility-uuid-1');
            expect(result.secondaryFacilityId).toBe('facility-uuid-2');
        });
    });
    describe('verification workflow', () => {
        it('should verify staff member and set status to VERIFIED', async () => {
            mockRepo.findStaffById.mockResolvedValue({
                id: mockStaffId,
                verificationStatus: 'PENDING',
                joiningDate: new Date(),
                createdAt: new Date(),
                updatedAt: new Date(),
            });
            const mockVerified = {
                id: mockStaffId,
                verificationStatus: 'VERIFIED',
                joiningDate: new Date(),
                createdAt: new Date(),
                updatedAt: new Date(),
            };
            mockRepo.updateStaff.mockResolvedValue(mockVerified);
            mockRepo.createHistory.mockResolvedValue({});
            const result = await service.verifyStaff(mockStaffId, { reason: 'Nursing Council credentials verified' }, 'admin-1');
            expect(result.verificationStatus).toBe('VERIFIED');
        });
    });
});
//# sourceMappingURL=staff.service.spec.js.map
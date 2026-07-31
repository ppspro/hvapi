"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const facility_service_1 = require("../application/use-cases/facility.service");
const common_1 = require("@nestjs/common");
const nestjs_pino_1 = require("nestjs-pino");
const qr_service_1 = require("../../qr/application/use-cases/qr.service");
const mockFacilityId = 'facility-uuid-1';
const mockUserId = 'user-uuid-1';
const mockRepo = {
    createFacility: jest.fn(),
    findFacilityById: jest.fn(),
    findFacilityByCode: jest.fn(),
    findFacilityByRegistrationNumber: jest.fn(),
    findAllFacilities: jest.fn(),
    updateFacility: jest.fn(),
    softDeleteFacility: jest.fn(),
    searchFacilities: jest.fn(),
    createDepartment: jest.fn(),
    findDepartmentsByFacilityId: jest.fn(),
    createRoom: jest.fn(),
    findRoomsByFacilityId: jest.fn(),
    addLicense: jest.fn(),
    addAccreditation: jest.fn(),
    attachDocument: jest.fn(),
    findDocumentsByFacilityId: jest.fn(),
    assignDoctor: jest.fn(),
    findDoctorsByFacilityId: jest.fn(),
    createHistory: jest.fn(),
    findHistoryByFacilityId: jest.fn(),
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
describe('FacilityService', () => {
    let service;
    beforeEach(async () => {
        jest.clearAllMocks();
        const module = await testing_1.Test.createTestingModule({
            providers: [
                facility_service_1.FacilityService,
                { provide: 'IFacilityRepository', useValue: mockRepo },
                { provide: qr_service_1.QrService, useValue: mockQrService },
                { provide: nestjs_pino_1.Logger, useValue: mockLogger },
            ],
        }).compile();
        service = module.get(facility_service_1.FacilityService);
    });
    describe('registerFacility', () => {
        it('should throw ConflictException if registration number is duplicate', async () => {
            mockRepo.findFacilityByRegistrationNumber.mockResolvedValue({ id: 'existing' });
            await expect(service.registerFacility(mockUserId, {
                name: 'Shaukat Khanum',
                registrationNumber: 'REG-100',
                streetAddress: '7A Johar Town',
                city: 'Lahore',
                state: 'Punjab',
                phone: '+92-42-35905000',
            })).rejects.toThrow(common_1.ConflictException);
        });
        it('should register facility profile, generate code, and issue QR identity', async () => {
            mockRepo.findFacilityByRegistrationNumber.mockResolvedValue(null);
            const mockCreated = {
                id: mockFacilityId,
                name: 'Shaukat Khanum',
                facilityCode: 'FAC-360-123456',
                registrationNumber: 'REG-100',
                facilityType: 'HOSPITAL',
                ownershipType: 'PRIVATE',
                streetAddress: '7A Johar Town',
                city: 'Lahore',
                state: 'Punjab',
                country: 'Pakistan',
                timezone: 'Asia/Karachi',
                phone: '+92-42-35905000',
                verificationStatus: 'PENDING',
                isDeleted: false,
                branches: [],
                departments: [],
                rooms: [],
                licenses: [],
                accreditations: [],
                documents: [],
                createdAt: new Date(),
                updatedAt: new Date(),
            };
            mockRepo.createFacility.mockResolvedValue(mockCreated);
            mockQrService.generateQr.mockResolvedValue({ token: 'HVQR-FACILITY100' });
            mockRepo.createAuditLog.mockResolvedValue({});
            const result = await service.registerFacility(mockUserId, {
                name: 'Shaukat Khanum',
                registrationNumber: 'REG-100',
                streetAddress: '7A Johar Town',
                city: 'Lahore',
                state: 'Punjab',
                phone: '+92-42-35905000',
            });
            expect(result.id).toBe(mockFacilityId);
            expect(result.facilityCode).toBe('FAC-360-123456');
            expect(result.verificationStatus).toBe('PENDING');
            expect(mockQrService.generateQr).toHaveBeenCalledWith(mockUserId, expect.objectContaining({
                entityId: mockFacilityId,
            }));
        });
    });
    describe('department and room creation', () => {
        it('should create department under facility', async () => {
            mockRepo.findFacilityById.mockResolvedValue({ id: mockFacilityId });
            const mockDept = {
                id: 'dept-1',
                facilityId: mockFacilityId,
                name: 'Oncology',
                code: 'ONCO',
                createdAt: new Date(),
            };
            mockRepo.createDepartment.mockResolvedValue(mockDept);
            const result = await service.createDepartment(mockFacilityId, {
                name: 'Oncology',
                code: 'ONCO',
            });
            expect(result.id).toBe('dept-1');
            expect(result.name).toBe('Oncology');
        });
        it('should create room under facility', async () => {
            mockRepo.findFacilityById.mockResolvedValue({ id: mockFacilityId });
            const mockRoom = {
                id: 'room-1',
                facilityId: mockFacilityId,
                roomNumber: '304',
                roomCategory: 'ICU',
                capacity: 2,
                isOperational: true,
                createdAt: new Date(),
            };
            mockRepo.createRoom.mockResolvedValue(mockRoom);
            const result = await service.createRoom(mockFacilityId, {
                roomNumber: '304',
                roomCategory: 'ICU',
                capacity: 2,
            });
            expect(result.id).toBe('room-1');
            expect(result.roomCategory).toBe('ICU');
        });
    });
    describe('verification workflow', () => {
        it('should verify facility and transition status to VERIFIED', async () => {
            mockRepo.findFacilityById.mockResolvedValue({
                id: mockFacilityId,
                verificationStatus: 'PENDING',
                isDeleted: false,
                createdAt: new Date(),
                updatedAt: new Date(),
            });
            const mockVerified = {
                id: mockFacilityId,
                verificationStatus: 'VERIFIED',
                isDeleted: false,
                createdAt: new Date(),
                updatedAt: new Date(),
            };
            mockRepo.updateFacility.mockResolvedValue(mockVerified);
            mockRepo.createHistory.mockResolvedValue({});
            const result = await service.verifyFacility(mockFacilityId, { reason: 'License checked' }, 'admin-1');
            expect(result.verificationStatus).toBe('VERIFIED');
        });
    });
});
//# sourceMappingURL=facility.service.spec.js.map
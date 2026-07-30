"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const doctor_service_1 = require("../application/use-cases/doctor.service");
describe('DoctorService', () => {
    let service;
    let mockDoctorRepository;
    let mockLogger;
    beforeEach(() => {
        mockDoctorRepository = {
            findDoctorById: jest.fn(),
            findSlotsByDoctorId: jest.fn(),
        };
        mockLogger = {
            log: jest.fn(),
        };
        service = new doctor_service_1.DoctorService(mockDoctorRepository, mockLogger);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
    describe('getDoctorProfile', () => {
        it('should return doctor profile details', async () => {
            mockDoctorRepository.findDoctorById.mockResolvedValue({
                id: 'doc-123',
                fullName: 'Dr. Watson',
                specialization: 'General',
                credentials: 'MD',
            });
            const result = await service.getDoctorProfile('doc-123');
            expect(result.fullName).toBe('Dr. Watson');
        });
    });
});
//# sourceMappingURL=doctor.service.spec.js.map
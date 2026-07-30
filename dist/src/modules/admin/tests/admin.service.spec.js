"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const admin_service_1 = require("../application/use-cases/admin.service");
describe('AdminService', () => {
    let service;
    let mockAdminRepository;
    let mockLogger;
    beforeEach(() => {
        mockAdminRepository = {
            getStats: jest.fn(),
            findAuditLogs: jest.fn(),
            createAuditLog: jest.fn(),
        };
        mockLogger = {
            log: jest.fn(),
        };
        service = new admin_service_1.AdminService(mockAdminRepository, mockLogger);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
    describe('getDashboardStats', () => {
        it('should retrieve database stats counts successfully', async () => {
            mockAdminRepository.getStats.mockResolvedValue({
                totalPatients: 10,
                totalDoctors: 2,
                pendingOcrReviews: 1,
                systemLogsCount: 150,
            });
            const result = await service.getDashboardStats();
            expect(result.totalPatients).toBe(10);
            expect(result.pendingOcrReviews).toBe(1);
        });
    });
});
//# sourceMappingURL=admin.service.spec.js.map
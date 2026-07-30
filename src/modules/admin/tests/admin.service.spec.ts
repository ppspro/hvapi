import { AdminService } from '../application/use-cases/admin.service';
import { Logger } from 'nestjs-pino';

describe('AdminService', () => {
  let service: AdminService;
  let mockAdminRepository: any;
  let mockLogger: any;

  beforeEach(() => {
    mockAdminRepository = {
      getStats: jest.fn(),
      findAuditLogs: jest.fn(),
      createAuditLog: jest.fn(),
    };

    mockLogger = {
      log: jest.fn(),
    } as unknown as Logger;

    service = new AdminService(mockAdminRepository, mockLogger);
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

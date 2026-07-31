import { Test, TestingModule } from '@nestjs/testing';
import { ObservabilityService } from '../application/use-cases/observability.service';
import { NotFoundException } from '@nestjs/common';
import { Logger } from 'nestjs-pino';

const mockUserId = 'user-uuid-1';

const mockRepo = {
  recordMetric: jest.fn(),
  findMetrics: jest.fn(),
  createLog: jest.fn(),
  findLogs: jest.fn(),
  createTrace: jest.fn(),
  findTraces: jest.fn(),
  updateTraceStatus: jest.fn(),
  createBackgroundJob: jest.fn(),
  findBackgroundJobs: jest.fn(),
  findBackgroundJobById: jest.fn(),
  recordHealthCheck: jest.fn(),
  getLatestHealthChecks: jest.fn(),
  recordPerformanceSnapshot: jest.fn(),
  getLatestPerformanceSnapshot: jest.fn(),
  getDashboardStats: jest.fn(),
};

const mockLogger = { log: jest.fn(), error: jest.fn(), warn: jest.fn() };

describe('ObservabilityService (Phase 24)', () => {
  let service: ObservabilityService;

  beforeEach(async () => {
    jest.clearAllMocks();
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ObservabilityService,
        { provide: 'IObservabilityRepository', useValue: mockRepo },
        { provide: Logger, useValue: mockLogger },
      ],
    }).compile();

    service = module.get<ObservabilityService>(ObservabilityService);
  });

  describe('Metrics Collection', () => {
    it('should record custom metric', async () => {
      const mockMetric = {
        id: 'metric-1',
        metricCategory: 'API',
        metricName: 'http_request_duration_ms',
        metricValue: 45.2,
        unit: 'ms',
        recordedAt: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      mockRepo.recordMetric.mockResolvedValue(mockMetric);

      const res = await service.recordMetric({
        metricCategory: 'API',
        metricName: 'http_request_duration_ms',
        metricValue: 45.2,
        unit: 'ms',
      });

      expect(res.id).toBe('metric-1');
      expect(res.metricValue).toBe(45.2);
    });
  });

  describe('Structured Logging & Distributed Tracing', () => {
    it('should record structured application log', async () => {
      const mockLog = {
        id: 'log-1',
        severity: 'INFO',
        service: 'hvapi-backend',
        module: 'patient',
        message: 'Patient profile retrieved',
        createdAt: new Date(),
      };
      mockRepo.createLog.mockResolvedValue(mockLog);

      const res = await service.createLog(mockUserId, {
        severity: 'INFO',
        module: 'patient',
        message: 'Patient profile retrieved',
      });

      expect(res.id).toBe('log-1');
    });

    it('should record trace execution', async () => {
      const mockTrace = {
        id: 'trace-exec-1',
        traceId: 'trace-999',
        service: 'hvapi-backend',
        operation: 'PatientService.getProfile',
        status: 'STARTED',
        startedAt: new Date(),
      };
      mockRepo.createTrace.mockResolvedValue(mockTrace);

      const res = await service.createTrace({
        traceId: 'trace-999',
        operation: 'PatientService.getProfile',
      });

      expect(res.traceId).toBe('trace-999');
    });
  });

  describe('Health Probes', () => {
    it('should return system health status map', async () => {
      mockRepo.getLatestHealthChecks.mockResolvedValue([
        { id: 'hc-1', component: 'postgresql', status: 'HEALTHY', responseTimeMs: 3, checkedAt: new Date() },
        { id: 'hc-2', component: 'ocr-cpu-engine', status: 'HEALTHY', responseTimeMs: 5, checkedAt: new Date() },
      ]);

      const res = await service.getHealthStatus();
      expect(res.status).toBe('HEALTHY');
      expect(res.components.length).toBe(2);
    });
  });

  describe('Performance Snapshots & Dashboard', () => {
    it('should return performance snapshot', async () => {
      mockRepo.getLatestPerformanceSnapshot.mockResolvedValue({
        id: 'snap-1',
        cpuUsage: 14.2,
        memoryUsage: 35.8,
        databaseLatency: 2.5,
        cacheHitRate: 0.99,
        queueDepth: 0,
        activeUsers: 15,
        requestRate: 60.0,
        errorRate: 0.0,
        createdAt: new Date(),
      });

      const res = await service.getPerformanceSnapshot();
      expect(res.cpuUsage).toBe(14.2);
      expect(res.cacheHitRate).toBe(0.99);
    });
  });
});

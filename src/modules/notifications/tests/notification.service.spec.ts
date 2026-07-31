import { Test, TestingModule } from '@nestjs/testing';
import { NotificationService } from '../application/use-cases/notification.service';
import { NotFoundException, ConflictException } from '@nestjs/common';
import { Logger } from 'nestjs-pino';

const mockUserId = 'user-uuid-1';

const mockRepo = {
  createTemplate: jest.fn(),
  findTemplates: jest.fn(),
  findTemplateByCode: jest.fn(),
  findTemplateById: jest.fn(),
  updateTemplate: jest.fn(),
  softDeleteTemplate: jest.fn(),
  createNotification: jest.fn(),
  findNotifications: jest.fn(),
  findNotificationById: jest.fn(),
  markAsRead: jest.fn(),
  softDeleteNotification: jest.fn(),
  updateNotificationStatus: jest.fn(),
  getPreferenceByUserId: jest.fn(),
  upsertPreference: jest.fn(),
  createQueueItem: jest.fn(),
  findPendingQueueItems: jest.fn(),
  updateQueueItem: jest.fn(),
  createAuditLog: jest.fn(),
  findAuditLogs: jest.fn(),
  getDashboardStats: jest.fn(),
};

const mockLogger = { log: jest.fn(), error: jest.fn(), warn: jest.fn() };

describe('NotificationService (Phase 21)', () => {
  let service: NotificationService;

  beforeEach(async () => {
    jest.clearAllMocks();
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        NotificationService,
        { provide: 'INotificationRepository', useValue: mockRepo },
        { provide: Logger, useValue: mockLogger },
      ],
    }).compile();

    service = module.get<NotificationService>(NotificationService);
  });

  describe('Templates', () => {
    it('should throw ConflictException if code exists', async () => {
      mockRepo.findTemplateByCode.mockResolvedValue({ id: 'tpl-1', code: 'TPL_WELCOME' });

      await expect(service.createTemplate(mockUserId, {
        code: 'TPL_WELCOME',
        name: 'Welcome',
        subject: 'Sub',
        body: 'Body',
      })).rejects.toThrow(ConflictException);
    });

    it('should create template and audit log', async () => {
      mockRepo.findTemplateByCode.mockResolvedValue(null);
      const mockTpl = {
        id: 'tpl-1',
        code: 'TPL_WELCOME',
        name: 'Welcome',
        subject: 'Sub',
        body: 'Body',
        channel: 'IN_APP',
        isActive: true,
        version: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      mockRepo.createTemplate.mockResolvedValue(mockTpl);
      mockRepo.createAuditLog.mockResolvedValue({});

      const res = await service.createTemplate(mockUserId, {
        code: 'TPL_WELCOME',
        name: 'Welcome',
        subject: 'Sub',
        body: 'Body',
      });

      expect(res.id).toBe('tpl-1');
      expect(mockRepo.createAuditLog).toHaveBeenCalled();
    });
  });

  describe('Notifications', () => {
    it('should create notification, queue item, and record audit log', async () => {
      mockRepo.getPreferenceByUserId.mockResolvedValue({ userId: mockUserId, emailEnabled: true });
      const mockNotif = {
        id: 'notif-1',
        title: 'Security Alert',
        message: 'Password changed',
        notificationType: 'SECURITY',
        priority: 'HIGH',
        channel: 'IN_APP',
        status: 'QUEUED',
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      mockRepo.createNotification.mockResolvedValue(mockNotif);
      mockRepo.createQueueItem.mockResolvedValue({});
      mockRepo.updateNotificationStatus.mockResolvedValue(mockNotif);
      mockRepo.createAuditLog.mockResolvedValue({});

      const res = await service.createNotification(mockUserId, {
        title: 'Security Alert',
        message: 'Password changed',
      });

      expect(res.id).toBe('notif-1');
      expect(mockRepo.createQueueItem).toHaveBeenCalledWith('notif-1', 1);
      expect(mockRepo.createAuditLog).toHaveBeenCalled();
    });

    it('should mark notification as READ', async () => {
      const mockNotif = { id: 'notif-1', status: 'SENT', title: 'Alert', message: 'Msg', notificationType: 'GENERAL', priority: 'NORMAL', channel: 'IN_APP', createdAt: new Date(), updatedAt: new Date() };
      mockRepo.findNotificationById.mockResolvedValue(mockNotif);
      mockRepo.markAsRead.mockResolvedValue({ ...mockNotif, status: 'READ', readAt: new Date() });
      mockRepo.createAuditLog.mockResolvedValue({});

      const res = await service.markAsRead('notif-1', mockUserId);
      expect(res.status).toBe('READ');
      expect(mockRepo.createAuditLog).toHaveBeenCalled();
    });
  });

  describe('Queue Retry', () => {
    it('should process pending queue items and increment retry attempt', async () => {
      const mockQueueItems = [{
        id: 'q-1',
        notificationId: 'notif-1',
        attempt: 1,
        status: 'QUEUED',
        createdAt: new Date(),
      }];
      mockRepo.findPendingQueueItems.mockResolvedValue(mockQueueItems);
      mockRepo.updateQueueItem.mockResolvedValue({});
      mockRepo.updateNotificationStatus.mockResolvedValue({});
      mockRepo.createAuditLog.mockResolvedValue({});

      const res = await service.retryQueue({}, mockUserId);
      expect(res.retried).toBe(1);
      expect(mockRepo.updateQueueItem).toHaveBeenCalledWith('q-1', 'QUEUED', 2, undefined, expect.any(Date));
    });
  });
});

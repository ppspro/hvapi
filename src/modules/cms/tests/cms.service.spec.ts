import { Test, TestingModule } from '@nestjs/testing';
import { CmsService } from '../application/use-cases/cms.service';
import { NotFoundException, ConflictException } from '@nestjs/common';
import { Logger } from 'nestjs-pino';

const mockUserId = 'user-uuid-1';

const mockRepo = {
  createPage: jest.fn(),
  findPageById: jest.fn(),
  findPageBySlug: jest.fn(),
  findPages: jest.fn(),
  updatePage: jest.fn(),
  softDeletePage: jest.fn(),
  searchPages: jest.fn(),
  createFaq: jest.fn(),
  findFaqs: jest.fn(),
  findFaqById: jest.fn(),
  updateFaq: jest.fn(),
  softDeleteFaq: jest.fn(),
  createAnnouncement: jest.fn(),
  findAnnouncements: jest.fn(),
  findAnnouncementById: jest.fn(),
  updateAnnouncement: jest.fn(),
  softDeleteAnnouncement: jest.fn(),
  createPolicy: jest.fn(),
  findPolicies: jest.fn(),
  findPolicyById: jest.fn(),
  updatePolicy: jest.fn(),
  softDeletePolicy: jest.fn(),
  createBanner: jest.fn(),
  findBanners: jest.fn(),
  findBannerById: jest.fn(),
  updateBanner: jest.fn(),
  softDeleteBanner: jest.fn(),
  createMedia: jest.fn(),
  findMedia: jest.fn(),
  findMediaById: jest.fn(),
  softDeleteMedia: jest.fn(),
  searchMedia: jest.fn(),
  createBlock: jest.fn(),
  findBlocks: jest.fn(),
  findBlockByCode: jest.fn(),
  findBlockById: jest.fn(),
  updateBlock: jest.fn(),
  softDeleteBlock: jest.fn(),
  createAuditLog: jest.fn(),
  getStatistics: jest.fn(),
};

const mockLogger = { log: jest.fn(), error: jest.fn(), warn: jest.fn() };

describe('CmsService (Phase 18)', () => {
  let service: CmsService;

  beforeEach(async () => {
    jest.clearAllMocks();
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CmsService,
        { provide: 'ICmsRepository', useValue: mockRepo },
        { provide: Logger, useValue: mockLogger },
      ],
    }).compile();

    service = module.get<CmsService>(CmsService);
  });

  describe('CmsPage', () => {
    it('should throw ConflictException if slug already exists', async () => {
      mockRepo.findPageBySlug.mockResolvedValue({ id: 'page-1', slug: 'terms' });

      await expect(service.createPage(mockUserId, {
        title: 'Terms of Service',
        slug: 'terms',
        content: 'Content',
      })).rejects.toThrow(ConflictException);
    });

    it('should create CMS page and log audit record', async () => {
      mockRepo.findPageBySlug.mockResolvedValue(null);
      const mockCreated = {
        id: 'page-1',
        title: 'Terms of Service',
        slug: 'terms',
        content: 'Content',
        status: 'DRAFT',
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      mockRepo.createPage.mockResolvedValue(mockCreated);
      mockRepo.createAuditLog.mockResolvedValue({});

      const page = await service.createPage(mockUserId, {
        title: 'Terms of Service',
        slug: 'terms',
        content: 'Content',
      });

      expect(page.id).toBe('page-1');
      expect(page.slug).toBe('terms');
      expect(mockRepo.createAuditLog).toHaveBeenCalled();
    });
  });

  describe('ContentBlock', () => {
    it('should throw ConflictException if content block code exists', async () => {
      mockRepo.findBlockByCode.mockResolvedValue({ id: 'block-1', code: 'FOOTER' });

      await expect(service.createBlock(mockUserId, {
        name: 'Footer Block',
        code: 'FOOTER',
        content: 'Content',
      })).rejects.toThrow(ConflictException);
    });
  });

  describe('getStatistics', () => {
    it('should return CMS platform statistics summary', async () => {
      mockRepo.getStatistics.mockResolvedValue({
        pagesCount: 10,
        faqsCount: 15,
        announcementsCount: 5,
        policiesCount: 3,
        bannersCount: 4,
        mediaCount: 25,
        blocksCount: 8,
        publishedCount: 30,
        draftCount: 12,
        archivedCount: 3,
      });

      const stats = await service.getStatistics();
      expect(stats.pagesCount).toBe(10);
      expect(stats.publishedCount).toBe(30);
    });
  });
});

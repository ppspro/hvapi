import { Injectable } from '@nestjs/common';
import { DatabaseService } from '@database/database.service';
import { ICmsRepository } from '../../domain/repositories/cms.repository.interface';
import {
  CmsPageEntity, CmsFaqEntity, CmsAnnouncementEntity, CmsPolicyEntity,
  CmsBannerEntity, MediaLibraryEntity, ContentBlockEntity, CmsAuditLogEntity,
} from '../../domain/entities/cms.entity';

@Injectable()
export class CmsRepository implements ICmsRepository {
  constructor(private readonly db: DatabaseService) {}

  // ─── CmsPage ─────────────────────────────────────────────────────────────

  async createPage(data: any): Promise<CmsPageEntity> {
    return (await this.db.cmsPage.create({
      data: {
        title: data.title,
        slug: data.slug,
        content: data.content,
        summary: data.summary || null,
        seoTitle: data.seoTitle || null,
        seoDescription: data.seoDescription || null,
        seoKeywords: data.seoKeywords || null,
        status: (data.status as any) || 'DRAFT',
        publishedAt: data.status === 'PUBLISHED' ? new Date() : null,
        createdBy: data.createdBy || null,
      },
    })) as unknown as CmsPageEntity;
  }

  async findPageById(id: string): Promise<CmsPageEntity | null> {
    return (await this.db.cmsPage.findFirst({
      where: { id, isDeleted: false },
    })) as unknown as CmsPageEntity | null;
  }

  async findPageBySlug(slug: string): Promise<CmsPageEntity | null> {
    return (await this.db.cmsPage.findFirst({
      where: { slug, isDeleted: false },
    })) as unknown as CmsPageEntity | null;
  }

  async findPages(status?: string): Promise<CmsPageEntity[]> {
    return (await this.db.cmsPage.findMany({
      where: {
        isDeleted: false,
        ...(status ? { status: status as any } : {}),
      },
      orderBy: { createdAt: 'desc' },
    })) as unknown as CmsPageEntity[];
  }

  async updatePage(id: string, data: any): Promise<CmsPageEntity> {
    const publishedAt = data.status === 'PUBLISHED' ? new Date() : undefined;
    return (await this.db.cmsPage.update({
      where: { id },
      data: {
        title: data.title || undefined,
        slug: data.slug || undefined,
        content: data.content || undefined,
        summary: data.summary || undefined,
        seoTitle: data.seoTitle || undefined,
        seoDescription: data.seoDescription || undefined,
        seoKeywords: data.seoKeywords || undefined,
        status: data.status as any || undefined,
        publishedAt,
        updatedBy: data.updatedBy || undefined,
      },
    })) as unknown as CmsPageEntity;
  }

  async softDeletePage(id: string): Promise<void> {
    await this.db.cmsPage.update({
      where: { id },
      data: { isDeleted: true, deletedAt: new Date() },
    });
  }

  async searchPages(query: string): Promise<CmsPageEntity[]> {
    const q = query.toLowerCase();
    return (await this.db.cmsPage.findMany({
      where: {
        isDeleted: false,
        OR: [
          { title: { contains: q, mode: 'insensitive' } },
          { slug: { contains: q, mode: 'insensitive' } },
          { content: { contains: q, mode: 'insensitive' } },
          { summary: { contains: q, mode: 'insensitive' } },
        ],
      },
      orderBy: { createdAt: 'desc' },
    })) as unknown as CmsPageEntity[];
  }

  // ─── CmsFaq ──────────────────────────────────────────────────────────────

  async createFaq(data: any): Promise<CmsFaqEntity> {
    return (await this.db.cmsFaq.create({
      data: {
        question: data.question,
        answer: data.answer,
        category: data.category || 'GENERAL',
        displayOrder: data.displayOrder ?? 0,
        status: (data.status as any) || 'PUBLISHED',
      },
    })) as unknown as CmsFaqEntity;
  }

  async findFaqs(category?: string): Promise<CmsFaqEntity[]> {
    return (await this.db.cmsFaq.findMany({
      where: {
        isDeleted: false,
        ...(category ? { category } : {}),
      },
      orderBy: [{ displayOrder: 'asc' }, { createdAt: 'desc' }],
    })) as unknown as CmsFaqEntity[];
  }

  async findFaqById(id: string): Promise<CmsFaqEntity | null> {
    return (await this.db.cmsFaq.findFirst({
      where: { id, isDeleted: false },
    })) as unknown as CmsFaqEntity | null;
  }

  async updateFaq(id: string, data: any): Promise<CmsFaqEntity> {
    return (await this.db.cmsFaq.update({
      where: { id },
      data: {
        question: data.question || undefined,
        answer: data.answer || undefined,
        category: data.category || undefined,
        displayOrder: data.displayOrder ?? undefined,
        status: data.status as any || undefined,
      },
    })) as unknown as CmsFaqEntity;
  }

  async softDeleteFaq(id: string): Promise<void> {
    await this.db.cmsFaq.update({
      where: { id },
      data: { isDeleted: true, deletedAt: new Date() },
    });
  }

  // ─── CmsAnnouncement ─────────────────────────────────────────────────────

  async createAnnouncement(data: any): Promise<CmsAnnouncementEntity> {
    return (await this.db.cmsAnnouncement.create({
      data: {
        title: data.title,
        description: data.description,
        startDate: data.startDate ? new Date(data.startDate) : null,
        endDate: data.endDate ? new Date(data.endDate) : null,
        priority: data.priority || 'NORMAL',
        status: (data.status as any) || 'DRAFT',
        publishedAt: data.status === 'PUBLISHED' ? new Date() : null,
        createdBy: data.createdBy || null,
      },
    })) as unknown as CmsAnnouncementEntity;
  }

  async findAnnouncements(activeOnly = false): Promise<CmsAnnouncementEntity[]> {
    const now = new Date();
    const where: any = { isDeleted: false };
    if (activeOnly) {
      where.status = 'PUBLISHED';
      where.OR = [
        { startDate: null, endDate: null },
        { startDate: { lte: now }, endDate: null },
        { startDate: null, endDate: { gte: now } },
        { startDate: { lte: now }, endDate: { gte: now } },
      ];
    }
    return (await this.db.cmsAnnouncement.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    })) as unknown as CmsAnnouncementEntity[];
  }

  async findAnnouncementById(id: string): Promise<CmsAnnouncementEntity | null> {
    return (await this.db.cmsAnnouncement.findFirst({
      where: { id, isDeleted: false },
    })) as unknown as CmsAnnouncementEntity | null;
  }

  async updateAnnouncement(id: string, data: any): Promise<CmsAnnouncementEntity> {
    return (await this.db.cmsAnnouncement.update({
      where: { id },
      data: {
        title: data.title || undefined,
        description: data.description || undefined,
        startDate: data.startDate ? new Date(data.startDate) : undefined,
        endDate: data.endDate ? new Date(data.endDate) : undefined,
        priority: data.priority || undefined,
        status: data.status as any || undefined,
        publishedAt: data.status === 'PUBLISHED' ? new Date() : undefined,
      },
    })) as unknown as CmsAnnouncementEntity;
  }

  async softDeleteAnnouncement(id: string): Promise<void> {
    await this.db.cmsAnnouncement.update({
      where: { id },
      data: { isDeleted: true, deletedAt: new Date() },
    });
  }

  // ─── CmsPolicy ───────────────────────────────────────────────────────────

  async createPolicy(data: any): Promise<CmsPolicyEntity> {
    return (await this.db.cmsPolicy.create({
      data: {
        title: data.title,
        policyType: data.policyType,
        version: data.version || '1.0',
        content: data.content,
        effectiveDate: data.effectiveDate ? new Date(data.effectiveDate) : null,
        status: (data.status as any) || 'DRAFT',
      },
    })) as unknown as CmsPolicyEntity;
  }

  async findPolicies(policyType?: string): Promise<CmsPolicyEntity[]> {
    return (await this.db.cmsPolicy.findMany({
      where: {
        isDeleted: false,
        ...(policyType ? { policyType } : {}),
      },
      orderBy: { createdAt: 'desc' },
    })) as unknown as CmsPolicyEntity[];
  }

  async findPolicyById(id: string): Promise<CmsPolicyEntity | null> {
    return (await this.db.cmsPolicy.findFirst({
      where: { id, isDeleted: false },
    })) as unknown as CmsPolicyEntity | null;
  }

  async updatePolicy(id: string, data: any): Promise<CmsPolicyEntity> {
    return (await this.db.cmsPolicy.update({
      where: { id },
      data: {
        title: data.title || undefined,
        policyType: data.policyType || undefined,
        version: data.version || undefined,
        content: data.content || undefined,
        effectiveDate: data.effectiveDate ? new Date(data.effectiveDate) : undefined,
        status: data.status as any || undefined,
      },
    })) as unknown as CmsPolicyEntity;
  }

  async softDeletePolicy(id: string): Promise<void> {
    await this.db.cmsPolicy.update({
      where: { id },
      data: { isDeleted: true, deletedAt: new Date() },
    });
  }

  // ─── CmsBanner ───────────────────────────────────────────────────────────

  async createBanner(data: any): Promise<CmsBannerEntity> {
    return (await this.db.cmsBanner.create({
      data: {
        title: data.title,
        imageUrl: data.imageUrl,
        mobileImageUrl: data.mobileImageUrl || null,
        redirectUrl: data.redirectUrl || null,
        displayOrder: data.displayOrder ?? 0,
        startDate: data.startDate ? new Date(data.startDate) : null,
        endDate: data.endDate ? new Date(data.endDate) : null,
        status: (data.status as any) || 'DRAFT',
      },
    })) as unknown as CmsBannerEntity;
  }

  async findBanners(activeOnly = false): Promise<CmsBannerEntity[]> {
    const now = new Date();
    const where: any = { isDeleted: false };
    if (activeOnly) {
      where.status = 'PUBLISHED';
      where.OR = [
        { startDate: null, endDate: null },
        { startDate: { lte: now }, endDate: null },
        { startDate: null, endDate: { gte: now } },
        { startDate: { lte: now }, endDate: { gte: now } },
      ];
    }
    return (await this.db.cmsBanner.findMany({
      where,
      orderBy: [{ displayOrder: 'asc' }, { createdAt: 'desc' }],
    })) as unknown as CmsBannerEntity[];
  }

  async findBannerById(id: string): Promise<CmsBannerEntity | null> {
    return (await this.db.cmsBanner.findFirst({
      where: { id, isDeleted: false },
    })) as unknown as CmsBannerEntity | null;
  }

  async updateBanner(id: string, data: any): Promise<CmsBannerEntity> {
    return (await this.db.cmsBanner.update({
      where: { id },
      data: {
        title: data.title || undefined,
        imageUrl: data.imageUrl || undefined,
        mobileImageUrl: data.mobileImageUrl || undefined,
        redirectUrl: data.redirectUrl || undefined,
        displayOrder: data.displayOrder ?? undefined,
        startDate: data.startDate ? new Date(data.startDate) : undefined,
        endDate: data.endDate ? new Date(data.endDate) : undefined,
        status: data.status as any || undefined,
      },
    })) as unknown as CmsBannerEntity;
  }

  async softDeleteBanner(id: string): Promise<void> {
    await this.db.cmsBanner.update({
      where: { id },
      data: { isDeleted: true, deletedAt: new Date() },
    });
  }

  // ─── MediaLibrary ────────────────────────────────────────────────────────

  async createMedia(data: any): Promise<MediaLibraryEntity> {
    return (await this.db.mediaLibrary.create({
      data: {
        fileName: data.fileName,
        originalName: data.originalName,
        filePath: data.filePath,
        mimeType: data.mimeType,
        fileSize: data.fileSize,
        mediaType: (data.mediaType as any) || 'OTHER',
        uploadedBy: data.uploadedBy || null,
        metadata: data.metadata ? JSON.stringify(data.metadata) : null,
      },
    })) as unknown as MediaLibraryEntity;
  }

  async findMedia(mediaType?: string): Promise<MediaLibraryEntity[]> {
    return (await this.db.mediaLibrary.findMany({
      where: {
        isDeleted: false,
        ...(mediaType ? { mediaType: mediaType as any } : {}),
      },
      orderBy: { createdAt: 'desc' },
    })) as unknown as MediaLibraryEntity[];
  }

  async findMediaById(id: string): Promise<MediaLibraryEntity | null> {
    return (await this.db.mediaLibrary.findFirst({
      where: { id, isDeleted: false },
    })) as unknown as MediaLibraryEntity | null;
  }

  async softDeleteMedia(id: string): Promise<void> {
    await this.db.mediaLibrary.update({
      where: { id },
      data: { isDeleted: true, deletedAt: new Date() },
    });
  }

  async searchMedia(query: string): Promise<MediaLibraryEntity[]> {
    const q = query.toLowerCase();
    return (await this.db.mediaLibrary.findMany({
      where: {
        isDeleted: false,
        OR: [
          { fileName: { contains: q, mode: 'insensitive' } },
          { originalName: { contains: q, mode: 'insensitive' } },
          { mimeType: { contains: q, mode: 'insensitive' } },
        ],
      },
      orderBy: { createdAt: 'desc' },
    })) as unknown as MediaLibraryEntity[];
  }

  // ─── ContentBlock ────────────────────────────────────────────────────────

  async createBlock(data: any): Promise<ContentBlockEntity> {
    return (await this.db.contentBlock.create({
      data: {
        name: data.name,
        code: data.code,
        content: data.content,
        status: (data.status as any) || 'PUBLISHED',
      },
    })) as unknown as ContentBlockEntity;
  }

  async findBlocks(): Promise<ContentBlockEntity[]> {
    return (await this.db.contentBlock.findMany({
      where: { isDeleted: false },
      orderBy: { createdAt: 'desc' },
    })) as unknown as ContentBlockEntity[];
  }

  async findBlockByCode(code: string): Promise<ContentBlockEntity | null> {
    return (await this.db.contentBlock.findFirst({
      where: { code, isDeleted: false },
    })) as unknown as ContentBlockEntity | null;
  }

  async findBlockById(id: string): Promise<ContentBlockEntity | null> {
    return (await this.db.contentBlock.findFirst({
      where: { id, isDeleted: false },
    })) as unknown as ContentBlockEntity | null;
  }

  async updateBlock(id: string, data: any): Promise<ContentBlockEntity> {
    return (await this.db.contentBlock.update({
      where: { id },
      data: {
        name: data.name || undefined,
        code: data.code || undefined,
        content: data.content || undefined,
        status: data.status as any || undefined,
      },
    })) as unknown as ContentBlockEntity;
  }

  async softDeleteBlock(id: string): Promise<void> {
    await this.db.contentBlock.update({
      where: { id },
      data: { isDeleted: true, deletedAt: new Date() },
    });
  }

  // ─── Audit & Stats ───────────────────────────────────────────────────────

  async createAuditLog(data: {
    contentType: string;
    contentId: string;
    action: string;
    performedBy?: string;
    details?: string;
  }): Promise<CmsAuditLogEntity> {
    return (await this.db.cmsAuditLog.create({
      data: {
        contentType: data.contentType,
        contentId: data.contentId,
        action: data.action,
        performedBy: data.performedBy || null,
        details: data.details || null,
      },
    })) as unknown as CmsAuditLogEntity;
  }

  async getStatistics() {
    const [
      pagesCount,
      faqsCount,
      announcementsCount,
      policiesCount,
      bannersCount,
      mediaCount,
      blocksCount,
      publishedPages,
      publishedAnnouncements,
      publishedBanners,
      draftPages,
      draftAnnouncements,
      draftBanners,
      archivedPages,
      archivedAnnouncements,
    ] = await Promise.all([
      this.db.cmsPage.count({ where: { isDeleted: false } }),
      this.db.cmsFaq.count({ where: { isDeleted: false } }),
      this.db.cmsAnnouncement.count({ where: { isDeleted: false } }),
      this.db.cmsPolicy.count({ where: { isDeleted: false } }),
      this.db.cmsBanner.count({ where: { isDeleted: false } }),
      this.db.mediaLibrary.count({ where: { isDeleted: false } }),
      this.db.contentBlock.count({ where: { isDeleted: false } }),

      this.db.cmsPage.count({ where: { isDeleted: false, status: 'PUBLISHED' } }),
      this.db.cmsAnnouncement.count({ where: { isDeleted: false, status: 'PUBLISHED' } }),
      this.db.cmsBanner.count({ where: { isDeleted: false, status: 'PUBLISHED' } }),

      this.db.cmsPage.count({ where: { isDeleted: false, status: 'DRAFT' } }),
      this.db.cmsAnnouncement.count({ where: { isDeleted: false, status: 'DRAFT' } }),
      this.db.cmsBanner.count({ where: { isDeleted: false, status: 'DRAFT' } }),

      this.db.cmsPage.count({ where: { isDeleted: false, status: 'ARCHIVED' } }),
      this.db.cmsAnnouncement.count({ where: { isDeleted: false, status: 'ARCHIVED' } }),
    ]);

    const publishedCount = publishedPages + publishedAnnouncements + publishedBanners;
    const draftCount = draftPages + draftAnnouncements + draftBanners;
    const archivedCount = archivedPages + archivedAnnouncements;

    return {
      pagesCount,
      faqsCount,
      announcementsCount,
      policiesCount,
      bannersCount,
      mediaCount,
      blocksCount,
      publishedCount,
      draftCount,
      archivedCount,
    };
  }
}

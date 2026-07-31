import {
  CmsPageEntity, CmsFaqEntity, CmsAnnouncementEntity, CmsPolicyEntity,
  CmsBannerEntity, MediaLibraryEntity, ContentBlockEntity, CmsAuditLogEntity,
} from '../entities/cms.entity';

export interface ICmsRepository {
  // CmsPage
  createPage(data: any): Promise<CmsPageEntity>;
  findPageById(id: string): Promise<CmsPageEntity | null>;
  findPageBySlug(slug: string): Promise<CmsPageEntity | null>;
  findPages(status?: string): Promise<CmsPageEntity[]>;
  updatePage(id: string, data: any): Promise<CmsPageEntity>;
  softDeletePage(id: string): Promise<void>;
  searchPages(query: string): Promise<CmsPageEntity[]>;

  // CmsFaq
  createFaq(data: any): Promise<CmsFaqEntity>;
  findFaqs(category?: string): Promise<CmsFaqEntity[]>;
  findFaqById(id: string): Promise<CmsFaqEntity | null>;
  updateFaq(id: string, data: any): Promise<CmsFaqEntity>;
  softDeleteFaq(id: string): Promise<void>;

  // CmsAnnouncement
  createAnnouncement(data: any): Promise<CmsAnnouncementEntity>;
  findAnnouncements(activeOnly?: boolean): Promise<CmsAnnouncementEntity[]>;
  findAnnouncementById(id: string): Promise<CmsAnnouncementEntity | null>;
  updateAnnouncement(id: string, data: any): Promise<CmsAnnouncementEntity>;
  softDeleteAnnouncement(id: string): Promise<void>;

  // CmsPolicy
  createPolicy(data: any): Promise<CmsPolicyEntity>;
  findPolicies(policyType?: string): Promise<CmsPolicyEntity[]>;
  findPolicyById(id: string): Promise<CmsPolicyEntity | null>;
  updatePolicy(id: string, data: any): Promise<CmsPolicyEntity>;
  softDeletePolicy(id: string): Promise<void>;

  // CmsBanner
  createBanner(data: any): Promise<CmsBannerEntity>;
  findBanners(activeOnly?: boolean): Promise<CmsBannerEntity[]>;
  findBannerById(id: string): Promise<CmsBannerEntity | null>;
  updateBanner(id: string, data: any): Promise<CmsBannerEntity>;
  softDeleteBanner(id: string): Promise<void>;

  // MediaLibrary
  createMedia(data: any): Promise<MediaLibraryEntity>;
  findMedia(mediaType?: string): Promise<MediaLibraryEntity[]>;
  findMediaById(id: string): Promise<MediaLibraryEntity | null>;
  softDeleteMedia(id: string): Promise<void>;
  searchMedia(query: string): Promise<MediaLibraryEntity[]>;

  // ContentBlock
  createBlock(data: any): Promise<ContentBlockEntity>;
  findBlocks(): Promise<ContentBlockEntity[]>;
  findBlockByCode(code: string): Promise<ContentBlockEntity | null>;
  findBlockById(id: string): Promise<ContentBlockEntity | null>;
  updateBlock(id: string, data: any): Promise<ContentBlockEntity>;
  softDeleteBlock(id: string): Promise<void>;

  // Audit
  createAuditLog(data: {
    contentType: string;
    contentId: string;
    action: string;
    performedBy?: string;
    details?: string;
  }): Promise<CmsAuditLogEntity>;

  // Statistics
  getStatistics(): Promise<{
    pagesCount: number;
    faqsCount: number;
    announcementsCount: number;
    policiesCount: number;
    bannersCount: number;
    mediaCount: number;
    blocksCount: number;
    publishedCount: number;
    draftCount: number;
    archivedCount: number;
  }>;
}

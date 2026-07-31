import { Injectable, NotFoundException, ConflictException, Inject } from '@nestjs/common';
import { ICmsRepository } from '../../domain/repositories/cms.repository.interface';
import {
  CmsPageResponseDto, HealthArticleResponseDto, FaqResponseDto, CmsAnnouncementResponseDto,
  CmsPolicyResponseDto, CmsBannerResponseDto, MediaLibraryResponseDto, ContentBlockResponseDto,
  CmsStatsResponseDto,
} from '../../presentation/dto/cms-response.dto';
import {
  CreateCmsPageDto, CreateCmsFaqDto, CreateCmsAnnouncementDto, CreateCmsPolicyDto,
  CreateCmsBannerDto, CreateMediaLibraryDto, CreateContentBlockDto,
} from '../../presentation/dto/cms-enterprise.dto';
import { Logger } from 'nestjs-pino';

@Injectable()
export class CmsService {
  constructor(
    @Inject('ICmsRepository')
    private readonly cmsRepository: ICmsRepository,
    private readonly logger: Logger,
  ) {}

  // ─── CmsPage ─────────────────────────────────────────────────────────────

  async createPage(userId: string, dto: CreateCmsPageDto): Promise<CmsPageResponseDto> {
    const existing = await this.cmsRepository.findPageBySlug(dto.slug);
    if (existing) {
      throw new ConflictException(`CMS Page with slug '${dto.slug}' already exists`);
    }

    const created = await this.cmsRepository.createPage({ ...dto, createdBy: userId });
    await this.cmsRepository.createAuditLog({
      contentType: 'PAGE',
      contentId: created.id,
      action: 'CREATED',
      performedBy: userId,
      details: `Created CMS Page: ${created.title} (${created.slug})`,
    });

    return this.mapPage(created);
  }

  async getPages(status?: string): Promise<CmsPageResponseDto[]> {
    const pages = await this.cmsRepository.findPages(status);
    return pages.map((p) => this.mapPage(p));
  }

  async getPageById(id: string): Promise<CmsPageResponseDto> {
    const page = await this.cmsRepository.findPageById(id);
    if (!page) throw new NotFoundException('CMS Page not found');
    return this.mapPage(page);
  }

  async getPage(slug: string): Promise<CmsPageResponseDto> {
    const page = await this.cmsRepository.findPageBySlug(slug);
    if (!page) throw new NotFoundException(`CMS Page with slug '${slug}' not found`);
    return this.mapPage(page);
  }

  async updatePage(id: string, dto: Partial<CreateCmsPageDto>, userId: string): Promise<CmsPageResponseDto> {
    const page = await this.cmsRepository.findPageById(id);
    if (!page) throw new NotFoundException('CMS Page not found');

    if (dto.slug && dto.slug !== page.slug) {
      const existing = await this.cmsRepository.findPageBySlug(dto.slug);
      if (existing) throw new ConflictException(`CMS Page with slug '${dto.slug}' already exists`);
    }

    const updated = await this.cmsRepository.updatePage(id, { ...dto, updatedBy: userId });
    await this.cmsRepository.createAuditLog({
      contentType: 'PAGE',
      contentId: id,
      action: 'UPDATED',
      performedBy: userId,
      details: `Updated CMS Page: ${updated.title}`,
    });

    return this.mapPage(updated);
  }

  async softDeletePage(id: string, userId: string): Promise<{ message: string }> {
    const page = await this.cmsRepository.findPageById(id);
    if (!page) throw new NotFoundException('CMS Page not found');

    await this.cmsRepository.softDeletePage(id);
    await this.cmsRepository.createAuditLog({
      contentType: 'PAGE',
      contentId: id,
      action: 'DELETED',
      performedBy: userId,
      details: `Soft-deleted CMS Page: ${page.title}`,
    });

    return { message: 'CMS Page soft-deleted successfully' };
  }

  async searchPages(query: string): Promise<CmsPageResponseDto[]> {
    if (!query?.trim()) return [];
    const pages = await this.cmsRepository.searchPages(query.trim());
    return pages.map((p) => this.mapPage(p));
  }

  private mapPage(p: any): CmsPageResponseDto {
    return {
      id: p.id,
      title: p.title,
      slug: p.slug,
      content: p.content,
      summary: p.summary || undefined,
      seoTitle: p.seoTitle || undefined,
      seoDescription: p.seoDescription || undefined,
      seoKeywords: p.seoKeywords || undefined,
      status: p.status,
      publishedAt: p.publishedAt ? p.publishedAt.toISOString() : undefined,
      createdBy: p.createdBy || undefined,
      updatedBy: p.updatedBy || undefined,
      createdAt: p.createdAt.toISOString(),
      updatedAt: p.updatedAt.toISOString(),
    };
  }

  // ─── CmsFaq ──────────────────────────────────────────────────────────────

  async createFaq(userId: string, dto: CreateCmsFaqDto): Promise<FaqResponseDto> {
    const faq = await this.cmsRepository.createFaq(dto);
    await this.cmsRepository.createAuditLog({
      contentType: 'FAQ',
      contentId: faq.id,
      action: 'CREATED',
      performedBy: userId,
      details: `Created FAQ: ${faq.question}`,
    });
    return this.mapFaq(faq);
  }

  async getFaqs(category?: string): Promise<FaqResponseDto[]> {
    const faqs = await this.cmsRepository.findFaqs(category);
    return faqs.map((f) => this.mapFaq(f));
  }

  async getFaqById(id: string): Promise<FaqResponseDto> {
    const faq = await this.cmsRepository.findFaqById(id);
    if (!faq) throw new NotFoundException('FAQ not found');
    return this.mapFaq(faq);
  }

  async updateFaq(id: string, dto: Partial<CreateCmsFaqDto>, userId: string): Promise<FaqResponseDto> {
    const faq = await this.cmsRepository.findFaqById(id);
    if (!faq) throw new NotFoundException('FAQ not found');

    const updated = await this.cmsRepository.updateFaq(id, dto);
    await this.cmsRepository.createAuditLog({
      contentType: 'FAQ',
      contentId: id,
      action: 'UPDATED',
      performedBy: userId,
      details: `Updated FAQ: ${updated.question}`,
    });
    return this.mapFaq(updated);
  }

  async softDeleteFaq(id: string, userId: string): Promise<{ message: string }> {
    const faq = await this.cmsRepository.findFaqById(id);
    if (!faq) throw new NotFoundException('FAQ not found');

    await this.cmsRepository.softDeleteFaq(id);
    await this.cmsRepository.createAuditLog({
      contentType: 'FAQ',
      contentId: id,
      action: 'DELETED',
      performedBy: userId,
      details: `Soft-deleted FAQ: ${faq.question}`,
    });
    return { message: 'FAQ soft-deleted successfully' };
  }

  private mapFaq(f: any): FaqResponseDto {
    return {
      id: f.id,
      question: f.question,
      answer: f.answer,
      category: f.category,
      displayOrder: f.displayOrder,
      status: f.status,
      createdAt: f.createdAt.toISOString(),
    };
  }

  // ─── CmsAnnouncement ─────────────────────────────────────────────────────

  async createAnnouncement(userId: string, dto: CreateCmsAnnouncementDto): Promise<CmsAnnouncementResponseDto> {
    const ann = await this.cmsRepository.createAnnouncement({ ...dto, createdBy: userId });
    await this.cmsRepository.createAuditLog({
      contentType: 'ANNOUNCEMENT',
      contentId: ann.id,
      action: 'CREATED',
      performedBy: userId,
      details: `Created Announcement: ${ann.title}`,
    });
    return this.mapAnnouncement(ann);
  }

  async getAnnouncements(activeOnly = false): Promise<CmsAnnouncementResponseDto[]> {
    const anns = await this.cmsRepository.findAnnouncements(activeOnly);
    return anns.map((a) => this.mapAnnouncement(a));
  }

  async getAnnouncementById(id: string): Promise<CmsAnnouncementResponseDto> {
    const ann = await this.cmsRepository.findAnnouncementById(id);
    if (!ann) throw new NotFoundException('Announcement not found');
    return this.mapAnnouncement(ann);
  }

  async updateAnnouncement(id: string, dto: Partial<CreateCmsAnnouncementDto>, userId: string): Promise<CmsAnnouncementResponseDto> {
    const ann = await this.cmsRepository.findAnnouncementById(id);
    if (!ann) throw new NotFoundException('Announcement not found');

    const updated = await this.cmsRepository.updateAnnouncement(id, dto);
    await this.cmsRepository.createAuditLog({
      contentType: 'ANNOUNCEMENT',
      contentId: id,
      action: 'UPDATED',
      performedBy: userId,
      details: `Updated Announcement: ${updated.title}`,
    });
    return this.mapAnnouncement(updated);
  }

  async softDeleteAnnouncement(id: string, userId: string): Promise<{ message: string }> {
    const ann = await this.cmsRepository.findAnnouncementById(id);
    if (!ann) throw new NotFoundException('Announcement not found');

    await this.cmsRepository.softDeleteAnnouncement(id);
    await this.cmsRepository.createAuditLog({
      contentType: 'ANNOUNCEMENT',
      contentId: id,
      action: 'DELETED',
      performedBy: userId,
      details: `Soft-deleted Announcement: ${ann.title}`,
    });
    return { message: 'Announcement soft-deleted successfully' };
  }

  private mapAnnouncement(a: any): CmsAnnouncementResponseDto {
    return {
      id: a.id,
      title: a.title,
      description: a.description,
      startDate: a.startDate ? a.startDate.toISOString() : undefined,
      endDate: a.endDate ? a.endDate.toISOString() : undefined,
      priority: a.priority,
      status: a.status,
      publishedAt: a.publishedAt ? a.publishedAt.toISOString() : undefined,
      createdBy: a.createdBy || undefined,
      createdAt: a.createdAt.toISOString(),
      updatedAt: a.updatedAt.toISOString(),
    };
  }

  // ─── CmsPolicy ───────────────────────────────────────────────────────────

  async createPolicy(userId: string, dto: CreateCmsPolicyDto): Promise<CmsPolicyResponseDto> {
    const policy = await this.cmsRepository.createPolicy(dto);
    await this.cmsRepository.createAuditLog({
      contentType: 'POLICY',
      contentId: policy.id,
      action: 'CREATED',
      performedBy: userId,
      details: `Created Policy: ${policy.title} v${policy.version}`,
    });
    return this.mapPolicy(policy);
  }

  async getPolicies(policyType?: string): Promise<CmsPolicyResponseDto[]> {
    const policies = await this.cmsRepository.findPolicies(policyType);
    return policies.map((p) => this.mapPolicy(p));
  }

  async getPolicyById(id: string): Promise<CmsPolicyResponseDto> {
    const policy = await this.cmsRepository.findPolicyById(id);
    if (!policy) throw new NotFoundException('Policy not found');
    return this.mapPolicy(policy);
  }

  async updatePolicy(id: string, dto: Partial<CreateCmsPolicyDto>, userId: string): Promise<CmsPolicyResponseDto> {
    const policy = await this.cmsRepository.findPolicyById(id);
    if (!policy) throw new NotFoundException('Policy not found');

    const updated = await this.cmsRepository.updatePolicy(id, dto);
    await this.cmsRepository.createAuditLog({
      contentType: 'POLICY',
      contentId: id,
      action: 'UPDATED',
      performedBy: userId,
      details: `Updated Policy: ${updated.title}`,
    });
    return this.mapPolicy(updated);
  }

  async softDeletePolicy(id: string, userId: string): Promise<{ message: string }> {
    const policy = await this.cmsRepository.findPolicyById(id);
    if (!policy) throw new NotFoundException('Policy not found');

    await this.cmsRepository.softDeletePolicy(id);
    await this.cmsRepository.createAuditLog({
      contentType: 'POLICY',
      contentId: id,
      action: 'DELETED',
      performedBy: userId,
      details: `Soft-deleted Policy: ${policy.title}`,
    });
    return { message: 'Policy soft-deleted successfully' };
  }

  private mapPolicy(p: any): CmsPolicyResponseDto {
    return {
      id: p.id,
      title: p.title,
      policyType: p.policyType,
      version: p.version,
      content: p.content,
      effectiveDate: p.effectiveDate ? p.effectiveDate.toISOString().split('T')[0] : undefined,
      status: p.status,
      createdAt: p.createdAt.toISOString(),
      updatedAt: p.updatedAt.toISOString(),
    };
  }

  // ─── CmsBanner ───────────────────────────────────────────────────────────

  async createBanner(userId: string, dto: CreateCmsBannerDto): Promise<CmsBannerResponseDto> {
    const banner = await this.cmsRepository.createBanner(dto);
    await this.cmsRepository.createAuditLog({
      contentType: 'BANNER',
      contentId: banner.id,
      action: 'CREATED',
      performedBy: userId,
      details: `Created Banner: ${banner.title}`,
    });
    return this.mapBanner(banner);
  }

  async getBanners(activeOnly = false): Promise<CmsBannerResponseDto[]> {
    const banners = await this.cmsRepository.findBanners(activeOnly);
    return banners.map((b) => this.mapBanner(b));
  }

  async getBannerById(id: string): Promise<CmsBannerResponseDto> {
    const banner = await this.cmsRepository.findBannerById(id);
    if (!banner) throw new NotFoundException('Banner not found');
    return this.mapBanner(banner);
  }

  async updateBanner(id: string, dto: Partial<CreateCmsBannerDto>, userId: string): Promise<CmsBannerResponseDto> {
    const banner = await this.cmsRepository.findBannerById(id);
    if (!banner) throw new NotFoundException('Banner not found');

    const updated = await this.cmsRepository.updateBanner(id, dto);
    await this.cmsRepository.createAuditLog({
      contentType: 'BANNER',
      contentId: id,
      action: 'UPDATED',
      performedBy: userId,
      details: `Updated Banner: ${updated.title}`,
    });
    return this.mapBanner(updated);
  }

  async softDeleteBanner(id: string, userId: string): Promise<{ message: string }> {
    const banner = await this.cmsRepository.findBannerById(id);
    if (!banner) throw new NotFoundException('Banner not found');

    await this.cmsRepository.softDeleteBanner(id);
    await this.cmsRepository.createAuditLog({
      contentType: 'BANNER',
      contentId: id,
      action: 'DELETED',
      performedBy: userId,
      details: `Soft-deleted Banner: ${banner.title}`,
    });
    return { message: 'Banner soft-deleted successfully' };
  }

  private mapBanner(b: any): CmsBannerResponseDto {
    return {
      id: b.id,
      title: b.title,
      imageUrl: b.imageUrl,
      mobileImageUrl: b.mobileImageUrl || undefined,
      redirectUrl: b.redirectUrl || undefined,
      displayOrder: b.displayOrder,
      startDate: b.startDate ? b.startDate.toISOString() : undefined,
      endDate: b.endDate ? b.endDate.toISOString() : undefined,
      status: b.status,
      createdAt: b.createdAt.toISOString(),
      updatedAt: b.updatedAt.toISOString(),
    };
  }

  // ─── MediaLibrary ────────────────────────────────────────────────────────

  async createMedia(userId: string, dto: CreateMediaLibraryDto): Promise<MediaLibraryResponseDto> {
    const media = await this.cmsRepository.createMedia({ ...dto, uploadedBy: userId });
    await this.cmsRepository.createAuditLog({
      contentType: 'MEDIA',
      contentId: media.id,
      action: 'CREATED',
      performedBy: userId,
      details: `Uploaded Media: ${media.fileName}`,
    });
    return this.mapMedia(media);
  }

  async getMedia(mediaType?: string): Promise<MediaLibraryResponseDto[]> {
    const mediaList = await this.cmsRepository.findMedia(mediaType);
    return mediaList.map((m) => this.mapMedia(m));
  }

  async getMediaById(id: string): Promise<MediaLibraryResponseDto> {
    const media = await this.cmsRepository.findMediaById(id);
    if (!media) throw new NotFoundException('Media item not found');
    return this.mapMedia(media);
  }

  async softDeleteMedia(id: string, userId: string): Promise<{ message: string }> {
    const media = await this.cmsRepository.findMediaById(id);
    if (!media) throw new NotFoundException('Media item not found');

    await this.cmsRepository.softDeleteMedia(id);
    await this.cmsRepository.createAuditLog({
      contentType: 'MEDIA',
      contentId: id,
      action: 'DELETED',
      performedBy: userId,
      details: `Soft-deleted Media: ${media.fileName}`,
    });
    return { message: 'Media item soft-deleted successfully' };
  }

  async searchMedia(query: string): Promise<MediaLibraryResponseDto[]> {
    if (!query?.trim()) return [];
    const mediaList = await this.cmsRepository.searchMedia(query.trim());
    return mediaList.map((m) => this.mapMedia(m));
  }

  private mapMedia(m: any): MediaLibraryResponseDto {
    return {
      id: m.id,
      fileName: m.fileName,
      originalName: m.originalName,
      filePath: m.filePath,
      mimeType: m.mimeType,
      fileSize: m.fileSize,
      mediaType: m.mediaType,
      uploadedBy: m.uploadedBy || undefined,
      metadata: m.metadata ? JSON.parse(m.metadata) : undefined,
      createdAt: m.createdAt.toISOString(),
      updatedAt: m.updatedAt.toISOString(),
    };
  }

  // ─── ContentBlock ────────────────────────────────────────────────────────

  async createBlock(userId: string, dto: CreateContentBlockDto): Promise<ContentBlockResponseDto> {
    const existing = await this.cmsRepository.findBlockByCode(dto.code);
    if (existing) {
      throw new ConflictException(`Content Block with code '${dto.code}' already exists`);
    }

    const block = await this.cmsRepository.createBlock(dto);
    await this.cmsRepository.createAuditLog({
      contentType: 'CONTENT_BLOCK',
      contentId: block.id,
      action: 'CREATED',
      performedBy: userId,
      details: `Created Content Block: ${block.name} (${block.code})`,
    });
    return this.mapBlock(block);
  }

  async getBlocks(): Promise<ContentBlockResponseDto[]> {
    const blocks = await this.cmsRepository.findBlocks();
    return blocks.map((b) => this.mapBlock(b));
  }

  async getBlockById(id: string): Promise<ContentBlockResponseDto> {
    const block = await this.cmsRepository.findBlockById(id);
    if (!block) throw new NotFoundException('Content Block not found');
    return this.mapBlock(block);
  }

  async getBlockByCode(code: string): Promise<ContentBlockResponseDto> {
    const block = await this.cmsRepository.findBlockByCode(code);
    if (!block) throw new NotFoundException(`Content Block with code '${code}' not found`);
    return this.mapBlock(block);
  }

  async updateBlock(id: string, dto: Partial<CreateContentBlockDto>, userId: string): Promise<ContentBlockResponseDto> {
    const block = await this.cmsRepository.findBlockById(id);
    if (!block) throw new NotFoundException('Content Block not found');

    if (dto.code && dto.code !== block.code) {
      const existing = await this.cmsRepository.findBlockByCode(dto.code);
      if (existing) throw new ConflictException(`Content Block with code '${dto.code}' already exists`);
    }

    const updated = await this.cmsRepository.updateBlock(id, dto);
    await this.cmsRepository.createAuditLog({
      contentType: 'CONTENT_BLOCK',
      contentId: id,
      action: 'UPDATED',
      performedBy: userId,
      details: `Updated Content Block: ${updated.name}`,
    });
    return this.mapBlock(updated);
  }

  async softDeleteBlock(id: string, userId: string): Promise<{ message: string }> {
    const block = await this.cmsRepository.findBlockById(id);
    if (!block) throw new NotFoundException('Content Block not found');

    await this.cmsRepository.softDeleteBlock(id);
    await this.cmsRepository.createAuditLog({
      contentType: 'CONTENT_BLOCK',
      contentId: id,
      action: 'DELETED',
      performedBy: userId,
      details: `Soft-deleted Content Block: ${block.name}`,
    });
    return { message: 'Content Block soft-deleted successfully' };
  }

  private mapBlock(b: any): ContentBlockResponseDto {
    return {
      id: b.id,
      name: b.name,
      code: b.code,
      content: b.content,
      status: b.status,
      createdAt: b.createdAt.toISOString(),
      updatedAt: b.updatedAt.toISOString(),
    };
  }

  // ─── Statistics ──────────────────────────────────────────────────────────

  async getStatistics(): Promise<CmsStatsResponseDto> {
    return this.cmsRepository.getStatistics();
  }

  // ─── Legacy Backward Compatibility ───────────────────────────────────────

  async getArticles(): Promise<HealthArticleResponseDto[]> {
    return [];
  }

  async getArticleDetails(id: string): Promise<HealthArticleResponseDto> {
    throw new NotFoundException('Health article not found');
  }
}

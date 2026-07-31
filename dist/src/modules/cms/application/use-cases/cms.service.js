"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CmsService = void 0;
const common_1 = require("@nestjs/common");
const nestjs_pino_1 = require("nestjs-pino");
let CmsService = class CmsService {
    constructor(cmsRepository, logger) {
        this.cmsRepository = cmsRepository;
        this.logger = logger;
    }
    async createPage(userId, dto) {
        const existing = await this.cmsRepository.findPageBySlug(dto.slug);
        if (existing) {
            throw new common_1.ConflictException(`CMS Page with slug '${dto.slug}' already exists`);
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
    async getPages(status) {
        const pages = await this.cmsRepository.findPages(status);
        return pages.map((p) => this.mapPage(p));
    }
    async getPageById(id) {
        const page = await this.cmsRepository.findPageById(id);
        if (!page)
            throw new common_1.NotFoundException('CMS Page not found');
        return this.mapPage(page);
    }
    async getPage(slug) {
        const page = await this.cmsRepository.findPageBySlug(slug);
        if (!page)
            throw new common_1.NotFoundException(`CMS Page with slug '${slug}' not found`);
        return this.mapPage(page);
    }
    async updatePage(id, dto, userId) {
        const page = await this.cmsRepository.findPageById(id);
        if (!page)
            throw new common_1.NotFoundException('CMS Page not found');
        if (dto.slug && dto.slug !== page.slug) {
            const existing = await this.cmsRepository.findPageBySlug(dto.slug);
            if (existing)
                throw new common_1.ConflictException(`CMS Page with slug '${dto.slug}' already exists`);
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
    async softDeletePage(id, userId) {
        const page = await this.cmsRepository.findPageById(id);
        if (!page)
            throw new common_1.NotFoundException('CMS Page not found');
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
    async searchPages(query) {
        if (!query?.trim())
            return [];
        const pages = await this.cmsRepository.searchPages(query.trim());
        return pages.map((p) => this.mapPage(p));
    }
    mapPage(p) {
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
    async createFaq(userId, dto) {
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
    async getFaqs(category) {
        const faqs = await this.cmsRepository.findFaqs(category);
        return faqs.map((f) => this.mapFaq(f));
    }
    async getFaqById(id) {
        const faq = await this.cmsRepository.findFaqById(id);
        if (!faq)
            throw new common_1.NotFoundException('FAQ not found');
        return this.mapFaq(faq);
    }
    async updateFaq(id, dto, userId) {
        const faq = await this.cmsRepository.findFaqById(id);
        if (!faq)
            throw new common_1.NotFoundException('FAQ not found');
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
    async softDeleteFaq(id, userId) {
        const faq = await this.cmsRepository.findFaqById(id);
        if (!faq)
            throw new common_1.NotFoundException('FAQ not found');
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
    mapFaq(f) {
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
    async createAnnouncement(userId, dto) {
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
    async getAnnouncements(activeOnly = false) {
        const anns = await this.cmsRepository.findAnnouncements(activeOnly);
        return anns.map((a) => this.mapAnnouncement(a));
    }
    async getAnnouncementById(id) {
        const ann = await this.cmsRepository.findAnnouncementById(id);
        if (!ann)
            throw new common_1.NotFoundException('Announcement not found');
        return this.mapAnnouncement(ann);
    }
    async updateAnnouncement(id, dto, userId) {
        const ann = await this.cmsRepository.findAnnouncementById(id);
        if (!ann)
            throw new common_1.NotFoundException('Announcement not found');
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
    async softDeleteAnnouncement(id, userId) {
        const ann = await this.cmsRepository.findAnnouncementById(id);
        if (!ann)
            throw new common_1.NotFoundException('Announcement not found');
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
    mapAnnouncement(a) {
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
    async createPolicy(userId, dto) {
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
    async getPolicies(policyType) {
        const policies = await this.cmsRepository.findPolicies(policyType);
        return policies.map((p) => this.mapPolicy(p));
    }
    async getPolicyById(id) {
        const policy = await this.cmsRepository.findPolicyById(id);
        if (!policy)
            throw new common_1.NotFoundException('Policy not found');
        return this.mapPolicy(policy);
    }
    async updatePolicy(id, dto, userId) {
        const policy = await this.cmsRepository.findPolicyById(id);
        if (!policy)
            throw new common_1.NotFoundException('Policy not found');
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
    async softDeletePolicy(id, userId) {
        const policy = await this.cmsRepository.findPolicyById(id);
        if (!policy)
            throw new common_1.NotFoundException('Policy not found');
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
    mapPolicy(p) {
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
    async createBanner(userId, dto) {
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
    async getBanners(activeOnly = false) {
        const banners = await this.cmsRepository.findBanners(activeOnly);
        return banners.map((b) => this.mapBanner(b));
    }
    async getBannerById(id) {
        const banner = await this.cmsRepository.findBannerById(id);
        if (!banner)
            throw new common_1.NotFoundException('Banner not found');
        return this.mapBanner(banner);
    }
    async updateBanner(id, dto, userId) {
        const banner = await this.cmsRepository.findBannerById(id);
        if (!banner)
            throw new common_1.NotFoundException('Banner not found');
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
    async softDeleteBanner(id, userId) {
        const banner = await this.cmsRepository.findBannerById(id);
        if (!banner)
            throw new common_1.NotFoundException('Banner not found');
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
    mapBanner(b) {
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
    async createMedia(userId, dto) {
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
    async getMedia(mediaType) {
        const mediaList = await this.cmsRepository.findMedia(mediaType);
        return mediaList.map((m) => this.mapMedia(m));
    }
    async getMediaById(id) {
        const media = await this.cmsRepository.findMediaById(id);
        if (!media)
            throw new common_1.NotFoundException('Media item not found');
        return this.mapMedia(media);
    }
    async softDeleteMedia(id, userId) {
        const media = await this.cmsRepository.findMediaById(id);
        if (!media)
            throw new common_1.NotFoundException('Media item not found');
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
    async searchMedia(query) {
        if (!query?.trim())
            return [];
        const mediaList = await this.cmsRepository.searchMedia(query.trim());
        return mediaList.map((m) => this.mapMedia(m));
    }
    mapMedia(m) {
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
    async createBlock(userId, dto) {
        const existing = await this.cmsRepository.findBlockByCode(dto.code);
        if (existing) {
            throw new common_1.ConflictException(`Content Block with code '${dto.code}' already exists`);
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
    async getBlocks() {
        const blocks = await this.cmsRepository.findBlocks();
        return blocks.map((b) => this.mapBlock(b));
    }
    async getBlockById(id) {
        const block = await this.cmsRepository.findBlockById(id);
        if (!block)
            throw new common_1.NotFoundException('Content Block not found');
        return this.mapBlock(block);
    }
    async getBlockByCode(code) {
        const block = await this.cmsRepository.findBlockByCode(code);
        if (!block)
            throw new common_1.NotFoundException(`Content Block with code '${code}' not found`);
        return this.mapBlock(block);
    }
    async updateBlock(id, dto, userId) {
        const block = await this.cmsRepository.findBlockById(id);
        if (!block)
            throw new common_1.NotFoundException('Content Block not found');
        if (dto.code && dto.code !== block.code) {
            const existing = await this.cmsRepository.findBlockByCode(dto.code);
            if (existing)
                throw new common_1.ConflictException(`Content Block with code '${dto.code}' already exists`);
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
    async softDeleteBlock(id, userId) {
        const block = await this.cmsRepository.findBlockById(id);
        if (!block)
            throw new common_1.NotFoundException('Content Block not found');
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
    mapBlock(b) {
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
    async getStatistics() {
        return this.cmsRepository.getStatistics();
    }
    async getArticles() {
        return [];
    }
    async getArticleDetails(id) {
        throw new common_1.NotFoundException('Health article not found');
    }
};
exports.CmsService = CmsService;
exports.CmsService = CmsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('ICmsRepository')),
    __metadata("design:paramtypes", [Object, nestjs_pino_1.Logger])
], CmsService);
//# sourceMappingURL=cms.service.js.map
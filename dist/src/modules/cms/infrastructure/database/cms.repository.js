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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CmsRepository = void 0;
const common_1 = require("@nestjs/common");
const database_service_1 = require("../../../../database/database.service");
let CmsRepository = class CmsRepository {
    constructor(db) {
        this.db = db;
    }
    async createPage(data) {
        return (await this.db.cmsPage.create({
            data: {
                title: data.title,
                slug: data.slug,
                content: data.content,
                summary: data.summary || null,
                seoTitle: data.seoTitle || null,
                seoDescription: data.seoDescription || null,
                seoKeywords: data.seoKeywords || null,
                status: data.status || 'DRAFT',
                publishedAt: data.status === 'PUBLISHED' ? new Date() : null,
                createdBy: data.createdBy || null,
            },
        }));
    }
    async findPageById(id) {
        return (await this.db.cmsPage.findFirst({
            where: { id, isDeleted: false },
        }));
    }
    async findPageBySlug(slug) {
        return (await this.db.cmsPage.findFirst({
            where: { slug, isDeleted: false },
        }));
    }
    async findPages(status) {
        return (await this.db.cmsPage.findMany({
            where: {
                isDeleted: false,
                ...(status ? { status: status } : {}),
            },
            orderBy: { createdAt: 'desc' },
        }));
    }
    async updatePage(id, data) {
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
                status: data.status || undefined,
                publishedAt,
                updatedBy: data.updatedBy || undefined,
            },
        }));
    }
    async softDeletePage(id) {
        await this.db.cmsPage.update({
            where: { id },
            data: { isDeleted: true, deletedAt: new Date() },
        });
    }
    async searchPages(query) {
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
        }));
    }
    async createFaq(data) {
        return (await this.db.cmsFaq.create({
            data: {
                question: data.question,
                answer: data.answer,
                category: data.category || 'GENERAL',
                displayOrder: data.displayOrder ?? 0,
                status: data.status || 'PUBLISHED',
            },
        }));
    }
    async findFaqs(category) {
        return (await this.db.cmsFaq.findMany({
            where: {
                isDeleted: false,
                ...(category ? { category } : {}),
            },
            orderBy: [{ displayOrder: 'asc' }, { createdAt: 'desc' }],
        }));
    }
    async findFaqById(id) {
        return (await this.db.cmsFaq.findFirst({
            where: { id, isDeleted: false },
        }));
    }
    async updateFaq(id, data) {
        return (await this.db.cmsFaq.update({
            where: { id },
            data: {
                question: data.question || undefined,
                answer: data.answer || undefined,
                category: data.category || undefined,
                displayOrder: data.displayOrder ?? undefined,
                status: data.status || undefined,
            },
        }));
    }
    async softDeleteFaq(id) {
        await this.db.cmsFaq.update({
            where: { id },
            data: { isDeleted: true, deletedAt: new Date() },
        });
    }
    async createAnnouncement(data) {
        return (await this.db.cmsAnnouncement.create({
            data: {
                title: data.title,
                description: data.description,
                startDate: data.startDate ? new Date(data.startDate) : null,
                endDate: data.endDate ? new Date(data.endDate) : null,
                priority: data.priority || 'NORMAL',
                status: data.status || 'DRAFT',
                publishedAt: data.status === 'PUBLISHED' ? new Date() : null,
                createdBy: data.createdBy || null,
            },
        }));
    }
    async findAnnouncements(activeOnly = false) {
        const now = new Date();
        const where = { isDeleted: false };
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
        }));
    }
    async findAnnouncementById(id) {
        return (await this.db.cmsAnnouncement.findFirst({
            where: { id, isDeleted: false },
        }));
    }
    async updateAnnouncement(id, data) {
        return (await this.db.cmsAnnouncement.update({
            where: { id },
            data: {
                title: data.title || undefined,
                description: data.description || undefined,
                startDate: data.startDate ? new Date(data.startDate) : undefined,
                endDate: data.endDate ? new Date(data.endDate) : undefined,
                priority: data.priority || undefined,
                status: data.status || undefined,
                publishedAt: data.status === 'PUBLISHED' ? new Date() : undefined,
            },
        }));
    }
    async softDeleteAnnouncement(id) {
        await this.db.cmsAnnouncement.update({
            where: { id },
            data: { isDeleted: true, deletedAt: new Date() },
        });
    }
    async createPolicy(data) {
        return (await this.db.cmsPolicy.create({
            data: {
                title: data.title,
                policyType: data.policyType,
                version: data.version || '1.0',
                content: data.content,
                effectiveDate: data.effectiveDate ? new Date(data.effectiveDate) : null,
                status: data.status || 'DRAFT',
            },
        }));
    }
    async findPolicies(policyType) {
        return (await this.db.cmsPolicy.findMany({
            where: {
                isDeleted: false,
                ...(policyType ? { policyType } : {}),
            },
            orderBy: { createdAt: 'desc' },
        }));
    }
    async findPolicyById(id) {
        return (await this.db.cmsPolicy.findFirst({
            where: { id, isDeleted: false },
        }));
    }
    async updatePolicy(id, data) {
        return (await this.db.cmsPolicy.update({
            where: { id },
            data: {
                title: data.title || undefined,
                policyType: data.policyType || undefined,
                version: data.version || undefined,
                content: data.content || undefined,
                effectiveDate: data.effectiveDate ? new Date(data.effectiveDate) : undefined,
                status: data.status || undefined,
            },
        }));
    }
    async softDeletePolicy(id) {
        await this.db.cmsPolicy.update({
            where: { id },
            data: { isDeleted: true, deletedAt: new Date() },
        });
    }
    async createBanner(data) {
        return (await this.db.cmsBanner.create({
            data: {
                title: data.title,
                imageUrl: data.imageUrl,
                mobileImageUrl: data.mobileImageUrl || null,
                redirectUrl: data.redirectUrl || null,
                displayOrder: data.displayOrder ?? 0,
                startDate: data.startDate ? new Date(data.startDate) : null,
                endDate: data.endDate ? new Date(data.endDate) : null,
                status: data.status || 'DRAFT',
            },
        }));
    }
    async findBanners(activeOnly = false) {
        const now = new Date();
        const where = { isDeleted: false };
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
        }));
    }
    async findBannerById(id) {
        return (await this.db.cmsBanner.findFirst({
            where: { id, isDeleted: false },
        }));
    }
    async updateBanner(id, data) {
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
                status: data.status || undefined,
            },
        }));
    }
    async softDeleteBanner(id) {
        await this.db.cmsBanner.update({
            where: { id },
            data: { isDeleted: true, deletedAt: new Date() },
        });
    }
    async createMedia(data) {
        return (await this.db.mediaLibrary.create({
            data: {
                fileName: data.fileName,
                originalName: data.originalName,
                filePath: data.filePath,
                mimeType: data.mimeType,
                fileSize: data.fileSize,
                mediaType: data.mediaType || 'OTHER',
                uploadedBy: data.uploadedBy || null,
                metadata: data.metadata ? JSON.stringify(data.metadata) : null,
            },
        }));
    }
    async findMedia(mediaType) {
        return (await this.db.mediaLibrary.findMany({
            where: {
                isDeleted: false,
                ...(mediaType ? { mediaType: mediaType } : {}),
            },
            orderBy: { createdAt: 'desc' },
        }));
    }
    async findMediaById(id) {
        return (await this.db.mediaLibrary.findFirst({
            where: { id, isDeleted: false },
        }));
    }
    async softDeleteMedia(id) {
        await this.db.mediaLibrary.update({
            where: { id },
            data: { isDeleted: true, deletedAt: new Date() },
        });
    }
    async searchMedia(query) {
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
        }));
    }
    async createBlock(data) {
        return (await this.db.contentBlock.create({
            data: {
                name: data.name,
                code: data.code,
                content: data.content,
                status: data.status || 'PUBLISHED',
            },
        }));
    }
    async findBlocks() {
        return (await this.db.contentBlock.findMany({
            where: { isDeleted: false },
            orderBy: { createdAt: 'desc' },
        }));
    }
    async findBlockByCode(code) {
        return (await this.db.contentBlock.findFirst({
            where: { code, isDeleted: false },
        }));
    }
    async findBlockById(id) {
        return (await this.db.contentBlock.findFirst({
            where: { id, isDeleted: false },
        }));
    }
    async updateBlock(id, data) {
        return (await this.db.contentBlock.update({
            where: { id },
            data: {
                name: data.name || undefined,
                code: data.code || undefined,
                content: data.content || undefined,
                status: data.status || undefined,
            },
        }));
    }
    async softDeleteBlock(id) {
        await this.db.contentBlock.update({
            where: { id },
            data: { isDeleted: true, deletedAt: new Date() },
        });
    }
    async createAuditLog(data) {
        return (await this.db.cmsAuditLog.create({
            data: {
                contentType: data.contentType,
                contentId: data.contentId,
                action: data.action,
                performedBy: data.performedBy || null,
                details: data.details || null,
            },
        }));
    }
    async getStatistics() {
        const [pagesCount, faqsCount, announcementsCount, policiesCount, bannersCount, mediaCount, blocksCount, publishedPages, publishedAnnouncements, publishedBanners, draftPages, draftAnnouncements, draftBanners, archivedPages, archivedAnnouncements,] = await Promise.all([
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
};
exports.CmsRepository = CmsRepository;
exports.CmsRepository = CmsRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [database_service_1.DatabaseService])
], CmsRepository);
//# sourceMappingURL=cms.repository.js.map
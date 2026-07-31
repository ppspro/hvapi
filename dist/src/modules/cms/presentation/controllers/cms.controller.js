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
exports.CmsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const passport_1 = require("@nestjs/passport");
const cms_service_1 = require("../../application/use-cases/cms.service");
const cms_response_dto_1 = require("../dto/cms-response.dto");
const cms_enterprise_dto_1 = require("../dto/cms-enterprise.dto");
let CmsController = class CmsController {
    constructor(cmsService) {
        this.cmsService = cmsService;
    }
    async getStatistics() {
        return this.cmsService.getStatistics();
    }
    async createPage(req, dto) {
        return this.cmsService.createPage(req.user.userId, dto);
    }
    async getPages(status) {
        return this.cmsService.getPages(status);
    }
    async searchPages(query) {
        return this.cmsService.searchPages(query);
    }
    async getPageById(id) {
        if (id.includes('-') && id.length < 32) {
            try {
                return await this.cmsService.getPage(id);
            }
            catch {
            }
        }
        return this.cmsService.getPageById(id);
    }
    async updatePage(req, id, dto) {
        return this.cmsService.updatePage(id, dto, req.user.userId);
    }
    async softDeletePage(req, id) {
        return this.cmsService.softDeletePage(id, req.user.userId);
    }
    async createFaq(req, dto) {
        return this.cmsService.createFaq(req.user.userId, dto);
    }
    async getFaqs(category) {
        return this.cmsService.getFaqs(category);
    }
    async updateFaq(req, id, dto) {
        return this.cmsService.updateFaq(id, dto, req.user.userId);
    }
    async softDeleteFaq(req, id) {
        return this.cmsService.softDeleteFaq(id, req.user.userId);
    }
    async createAnnouncement(req, dto) {
        return this.cmsService.createAnnouncement(req.user.userId, dto);
    }
    async getAnnouncements(activeOnly) {
        return this.cmsService.getAnnouncements(activeOnly);
    }
    async updateAnnouncement(req, id, dto) {
        return this.cmsService.updateAnnouncement(id, dto, req.user.userId);
    }
    async softDeleteAnnouncement(req, id) {
        return this.cmsService.softDeleteAnnouncement(id, req.user.userId);
    }
    async createPolicy(req, dto) {
        return this.cmsService.createPolicy(req.user.userId, dto);
    }
    async getPolicies(policyType) {
        return this.cmsService.getPolicies(policyType);
    }
    async updatePolicy(req, id, dto) {
        return this.cmsService.updatePolicy(id, dto, req.user.userId);
    }
    async softDeletePolicy(req, id) {
        return this.cmsService.softDeletePolicy(id, req.user.userId);
    }
    async createBanner(req, dto) {
        return this.cmsService.createBanner(req.user.userId, dto);
    }
    async getBanners(activeOnly) {
        return this.cmsService.getBanners(activeOnly);
    }
    async updateBanner(req, id, dto) {
        return this.cmsService.updateBanner(id, dto, req.user.userId);
    }
    async softDeleteBanner(req, id) {
        return this.cmsService.softDeleteBanner(id, req.user.userId);
    }
    async createMedia(req, dto) {
        return this.cmsService.createMedia(req.user.userId, dto);
    }
    async getMedia(mediaType) {
        return this.cmsService.getMedia(mediaType);
    }
    async searchMedia(query) {
        return this.cmsService.searchMedia(query);
    }
    async softDeleteMedia(req, id) {
        return this.cmsService.softDeleteMedia(id, req.user.userId);
    }
    async createBlock(req, dto) {
        return this.cmsService.createBlock(req.user.userId, dto);
    }
    async getBlocks() {
        return this.cmsService.getBlocks();
    }
    async updateBlock(req, id, dto) {
        return this.cmsService.updateBlock(id, dto, req.user.userId);
    }
    async softDeleteBlock(req, id) {
        return this.cmsService.softDeleteBlock(id, req.user.userId);
    }
};
exports.CmsController = CmsController;
__decorate([
    (0, common_1.Get)('statistics'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Get platform-wide CMS content statistics' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: cms_response_dto_1.CmsStatsResponseDto }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CmsController.prototype, "getStatistics", null);
__decorate([
    (0, common_1.Post)('pages'),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new CMS page' }),
    (0, swagger_1.ApiResponse)({ status: 201, type: cms_response_dto_1.CmsPageResponseDto }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, cms_enterprise_dto_1.CreateCmsPageDto]),
    __metadata("design:returntype", Promise)
], CmsController.prototype, "createPage", null);
__decorate([
    (0, common_1.Get)('pages'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'List all CMS pages' }),
    (0, swagger_1.ApiQuery)({ name: 'status', required: false, enum: ['DRAFT', 'REVIEW', 'PUBLISHED', 'ARCHIVED'] }),
    (0, swagger_1.ApiResponse)({ status: 200, type: [cms_response_dto_1.CmsPageResponseDto] }),
    __param(0, (0, common_1.Query)('status')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CmsController.prototype, "getPages", null);
__decorate([
    (0, common_1.Get)('pages/search'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Search CMS pages by title, slug, content, or summary' }),
    (0, swagger_1.ApiQuery)({ name: 'q', required: true }),
    (0, swagger_1.ApiResponse)({ status: 200, type: [cms_response_dto_1.CmsPageResponseDto] }),
    __param(0, (0, common_1.Query)('q')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CmsController.prototype, "searchPages", null);
__decorate([
    (0, common_1.Get)('pages/:id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Get CMS page by ID or slug' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'CMS Page ID or Unique Slug' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: cms_response_dto_1.CmsPageResponseDto }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CmsController.prototype, "getPageById", null);
__decorate([
    (0, common_1.Put)('pages/:id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Update CMS page details or publication status' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'CMS Page ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: cms_response_dto_1.CmsPageResponseDto }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", Promise)
], CmsController.prototype, "updatePage", null);
__decorate([
    (0, common_1.Delete)('pages/:id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Soft-delete a CMS page' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'CMS Page ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Page soft-deleted' }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], CmsController.prototype, "softDeletePage", null);
__decorate([
    (0, common_1.Post)('faqs'),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new FAQ item' }),
    (0, swagger_1.ApiResponse)({ status: 201, type: cms_response_dto_1.FaqResponseDto }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, cms_enterprise_dto_1.CreateCmsFaqDto]),
    __metadata("design:returntype", Promise)
], CmsController.prototype, "createFaq", null);
__decorate([
    (0, common_1.Get)('faqs'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'List FAQs, optionally filtered by category' }),
    (0, swagger_1.ApiQuery)({ name: 'category', required: false }),
    (0, swagger_1.ApiResponse)({ status: 200, type: [cms_response_dto_1.FaqResponseDto] }),
    __param(0, (0, common_1.Query)('category')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CmsController.prototype, "getFaqs", null);
__decorate([
    (0, common_1.Put)('faqs/:id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Update FAQ question, answer, category or display order' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'FAQ ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: cms_response_dto_1.FaqResponseDto }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", Promise)
], CmsController.prototype, "updateFaq", null);
__decorate([
    (0, common_1.Delete)('faqs/:id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Soft-delete a FAQ item' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'FAQ ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'FAQ soft-deleted' }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], CmsController.prototype, "softDeleteFaq", null);
__decorate([
    (0, common_1.Post)('announcements'),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new system announcement' }),
    (0, swagger_1.ApiResponse)({ status: 201, type: cms_response_dto_1.CmsAnnouncementResponseDto }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, cms_enterprise_dto_1.CreateCmsAnnouncementDto]),
    __metadata("design:returntype", Promise)
], CmsController.prototype, "createAnnouncement", null);
__decorate([
    (0, common_1.Get)('announcements'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'List announcements' }),
    (0, swagger_1.ApiQuery)({ name: 'activeOnly', required: false, type: Boolean }),
    (0, swagger_1.ApiResponse)({ status: 200, type: [cms_response_dto_1.CmsAnnouncementResponseDto] }),
    __param(0, (0, common_1.Query)('activeOnly')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Boolean]),
    __metadata("design:returntype", Promise)
], CmsController.prototype, "getAnnouncements", null);
__decorate([
    (0, common_1.Put)('announcements/:id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Update announcement' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Announcement ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: cms_response_dto_1.CmsAnnouncementResponseDto }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", Promise)
], CmsController.prototype, "updateAnnouncement", null);
__decorate([
    (0, common_1.Delete)('announcements/:id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Soft-delete an announcement' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Announcement ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Announcement soft-deleted' }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], CmsController.prototype, "softDeleteAnnouncement", null);
__decorate([
    (0, common_1.Post)('policies'),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new platform policy' }),
    (0, swagger_1.ApiResponse)({ status: 201, type: cms_response_dto_1.CmsPolicyResponseDto }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, cms_enterprise_dto_1.CreateCmsPolicyDto]),
    __metadata("design:returntype", Promise)
], CmsController.prototype, "createPolicy", null);
__decorate([
    (0, common_1.Get)('policies'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'List platform policies' }),
    (0, swagger_1.ApiQuery)({ name: 'policyType', required: false }),
    (0, swagger_1.ApiResponse)({ status: 200, type: [cms_response_dto_1.CmsPolicyResponseDto] }),
    __param(0, (0, common_1.Query)('policyType')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CmsController.prototype, "getPolicies", null);
__decorate([
    (0, common_1.Put)('policies/:id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Update policy details or version' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Policy ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: cms_response_dto_1.CmsPolicyResponseDto }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", Promise)
], CmsController.prototype, "updatePolicy", null);
__decorate([
    (0, common_1.Delete)('policies/:id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Soft-delete a policy' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Policy ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Policy soft-deleted' }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], CmsController.prototype, "softDeletePolicy", null);
__decorate([
    (0, common_1.Post)('banners'),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new promotional banner' }),
    (0, swagger_1.ApiResponse)({ status: 201, type: cms_response_dto_1.CmsBannerResponseDto }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, cms_enterprise_dto_1.CreateCmsBannerDto]),
    __metadata("design:returntype", Promise)
], CmsController.prototype, "createBanner", null);
__decorate([
    (0, common_1.Get)('banners'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'List promotional banners' }),
    (0, swagger_1.ApiQuery)({ name: 'activeOnly', required: false, type: Boolean }),
    (0, swagger_1.ApiResponse)({ status: 200, type: [cms_response_dto_1.CmsBannerResponseDto] }),
    __param(0, (0, common_1.Query)('activeOnly')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Boolean]),
    __metadata("design:returntype", Promise)
], CmsController.prototype, "getBanners", null);
__decorate([
    (0, common_1.Put)('banners/:id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Update banner image, redirect URL or display order' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Banner ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: cms_response_dto_1.CmsBannerResponseDto }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", Promise)
], CmsController.prototype, "updateBanner", null);
__decorate([
    (0, common_1.Delete)('banners/:id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Soft-delete a banner' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Banner ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Banner soft-deleted' }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], CmsController.prototype, "softDeleteBanner", null);
__decorate([
    (0, common_1.Post)('media'),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, swagger_1.ApiOperation)({ summary: 'Register a media item in Media Library' }),
    (0, swagger_1.ApiResponse)({ status: 201, type: cms_response_dto_1.MediaLibraryResponseDto }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, cms_enterprise_dto_1.CreateMediaLibraryDto]),
    __metadata("design:returntype", Promise)
], CmsController.prototype, "createMedia", null);
__decorate([
    (0, common_1.Get)('media'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'List media items in library' }),
    (0, swagger_1.ApiQuery)({ name: 'mediaType', required: false, enum: ['IMAGE', 'VIDEO', 'PDF', 'DOCUMENT', 'AUDIO', 'OTHER'] }),
    (0, swagger_1.ApiResponse)({ status: 200, type: [cms_response_dto_1.MediaLibraryResponseDto] }),
    __param(0, (0, common_1.Query)('mediaType')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CmsController.prototype, "getMedia", null);
__decorate([
    (0, common_1.Get)('media/search'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Search media library by file name or mime type' }),
    (0, swagger_1.ApiQuery)({ name: 'q', required: true }),
    (0, swagger_1.ApiResponse)({ status: 200, type: [cms_response_dto_1.MediaLibraryResponseDto] }),
    __param(0, (0, common_1.Query)('q')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CmsController.prototype, "searchMedia", null);
__decorate([
    (0, common_1.Delete)('media/:id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Soft-delete a media item' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Media ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Media item soft-deleted' }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], CmsController.prototype, "softDeleteMedia", null);
__decorate([
    (0, common_1.Post)('blocks'),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, swagger_1.ApiOperation)({ summary: 'Create a reusable content block' }),
    (0, swagger_1.ApiResponse)({ status: 201, type: cms_response_dto_1.ContentBlockResponseDto }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, cms_enterprise_dto_1.CreateContentBlockDto]),
    __metadata("design:returntype", Promise)
], CmsController.prototype, "createBlock", null);
__decorate([
    (0, common_1.Get)('blocks'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'List all content blocks' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: [cms_response_dto_1.ContentBlockResponseDto] }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CmsController.prototype, "getBlocks", null);
__decorate([
    (0, common_1.Put)('blocks/:id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Update a reusable content block' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Content Block ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: cms_response_dto_1.ContentBlockResponseDto }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", Promise)
], CmsController.prototype, "updateBlock", null);
__decorate([
    (0, common_1.Delete)('blocks/:id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Soft-delete a content block' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Content Block ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Content block soft-deleted' }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], CmsController.prototype, "softDeleteBlock", null);
exports.CmsController = CmsController = __decorate([
    (0, swagger_1.ApiTags)('CMS'),
    (0, common_1.Controller)('cms'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, swagger_1.ApiBearerAuth)('JWT-Auth'),
    __metadata("design:paramtypes", [cms_service_1.CmsService])
], CmsController);
//# sourceMappingURL=cms.controller.js.map
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
    async getPage(slug) {
        const page = await this.cmsRepository.findPageBySlug(slug);
        if (!page) {
            throw new common_1.NotFoundException('CMS page not found');
        }
        this.logger.log({ msg: 'CMS page requested', slug });
        return {
            slug: page.slug,
            title: page.title,
            content: page.content,
        };
    }
    async getArticles() {
        const list = await this.cmsRepository.findAllArticles();
        return list.map(a => ({
            id: a.id,
            title: a.title,
            summary: a.summary,
            body: a.body,
        }));
    }
    async getArticleDetails(id) {
        const article = await this.cmsRepository.findArticleById(id);
        if (!article) {
            throw new common_1.NotFoundException('Health article not found');
        }
        this.logger.log({ msg: 'Article viewed', articleId: id });
        return {
            id: article.id,
            title: article.title,
            summary: article.summary,
            body: article.body,
        };
    }
    async getFaqs() {
        this.logger.log({ msg: 'FAQ viewed' });
        const list = await this.cmsRepository.findAllFaqs();
        return list.map(f => ({
            id: f.id,
            question: f.question,
            answer: f.answer,
        }));
    }
};
exports.CmsService = CmsService;
exports.CmsService = CmsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('ICmsRepository')),
    __metadata("design:paramtypes", [Object, nestjs_pino_1.Logger])
], CmsService);
//# sourceMappingURL=cms.service.js.map
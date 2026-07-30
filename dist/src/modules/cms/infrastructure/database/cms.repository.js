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
    async findPageBySlug(slug) {
        return (await this.db.cmsPage.findUnique({
            where: { slug },
        }));
    }
    async findAllArticles() {
        return (await this.db.healthArticle.findMany({
            orderBy: { createdAt: 'desc' },
        }));
    }
    async findArticleById(id) {
        return (await this.db.healthArticle.findUnique({
            where: { id },
        }));
    }
    async findAllFaqs() {
        return (await this.db.faq.findMany({
            orderBy: { createdAt: 'asc' },
        }));
    }
};
exports.CmsRepository = CmsRepository;
exports.CmsRepository = CmsRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [database_service_1.DatabaseService])
], CmsRepository);
//# sourceMappingURL=cms.repository.js.map
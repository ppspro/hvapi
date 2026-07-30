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
let CmsController = class CmsController {
    constructor(cmsService) {
        this.cmsService = cmsService;
    }
    async getPage(slug) {
        return this.cmsService.getPage(slug);
    }
    async getArticles() {
        return this.cmsService.getArticles();
    }
    async getArticleDetails(id) {
        return this.cmsService.getArticleDetails(id);
    }
    async getFaqs() {
        return this.cmsService.getFaqs();
    }
};
exports.CmsController = CmsController;
__decorate([
    (0, common_1.Get)('pages/:slug'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Get Static Page Content by Slug (e.g. privacy-policy)' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: cms_response_dto_1.CmsPageResponseDto }),
    __param(0, (0, common_1.Param)('slug')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CmsController.prototype, "getPage", null);
__decorate([
    (0, common_1.Get)('articles'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'List Registered Health Articles' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: [cms_response_dto_1.HealthArticleResponseDto] }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CmsController.prototype, "getArticles", null);
__decorate([
    (0, common_1.Get)('articles/:id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Get Article Details' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: cms_response_dto_1.HealthArticleResponseDto }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CmsController.prototype, "getArticleDetails", null);
__decorate([
    (0, common_1.Get)('faqs'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Get FAQ Listing' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: [cms_response_dto_1.FaqResponseDto] }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CmsController.prototype, "getFaqs", null);
exports.CmsController = CmsController = __decorate([
    (0, swagger_1.ApiTags)('CMS'),
    (0, common_1.Controller)('cms'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, swagger_1.ApiBearerAuth)('JWT-Auth'),
    __metadata("design:paramtypes", [cms_service_1.CmsService])
], CmsController);
//# sourceMappingURL=cms.controller.js.map
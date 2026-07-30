"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cms_service_1 = require("../application/use-cases/cms.service");
describe('CmsService', () => {
    let service;
    let mockCmsRepository;
    let mockLogger;
    beforeEach(() => {
        mockCmsRepository = {
            findPageBySlug: jest.fn(),
            findAllArticles: jest.fn(),
            findArticleById: jest.fn(),
            findAllFaqs: jest.fn(),
        };
        mockLogger = {
            log: jest.fn(),
        };
        service = new cms_service_1.CmsService(mockCmsRepository, mockLogger);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
    describe('getPage', () => {
        it('should retrieve a static page by slug', async () => {
            mockCmsRepository.findPageBySlug.mockResolvedValue({
                slug: 'privacy-policy',
                title: 'Privacy Policy',
                content: 'Content details...',
            });
            const result = await service.getPage('privacy-policy');
            expect(result.title).toBe('Privacy Policy');
        });
    });
});
//# sourceMappingURL=cms.service.spec.js.map
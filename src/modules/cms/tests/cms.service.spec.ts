import { CmsService } from '../application/use-cases/cms.service';
import { Logger } from 'nestjs-pino';

describe('CmsService', () => {
  let service: CmsService;
  let mockCmsRepository: any;
  let mockLogger: any;

  beforeEach(() => {
    mockCmsRepository = {
      findPageBySlug: jest.fn(),
      findAllArticles: jest.fn(),
      findArticleById: jest.fn(),
      findAllFaqs: jest.fn(),
    };

    mockLogger = {
      log: jest.fn(),
    } as unknown as Logger;

    service = new CmsService(mockCmsRepository, mockLogger);
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

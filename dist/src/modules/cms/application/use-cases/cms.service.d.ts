import { ICmsRepository } from '../../domain/repositories/cms.repository.interface';
import { CmsPageResponseDto, HealthArticleResponseDto, FaqResponseDto, CmsAnnouncementResponseDto, CmsPolicyResponseDto, CmsBannerResponseDto, MediaLibraryResponseDto, ContentBlockResponseDto, CmsStatsResponseDto } from '../../presentation/dto/cms-response.dto';
import { CreateCmsPageDto, CreateCmsFaqDto, CreateCmsAnnouncementDto, CreateCmsPolicyDto, CreateCmsBannerDto, CreateMediaLibraryDto, CreateContentBlockDto } from '../../presentation/dto/cms-enterprise.dto';
import { Logger } from 'nestjs-pino';
export declare class CmsService {
    private readonly cmsRepository;
    private readonly logger;
    constructor(cmsRepository: ICmsRepository, logger: Logger);
    createPage(userId: string, dto: CreateCmsPageDto): Promise<CmsPageResponseDto>;
    getPages(status?: string): Promise<CmsPageResponseDto[]>;
    getPageById(id: string): Promise<CmsPageResponseDto>;
    getPage(slug: string): Promise<CmsPageResponseDto>;
    updatePage(id: string, dto: Partial<CreateCmsPageDto>, userId: string): Promise<CmsPageResponseDto>;
    softDeletePage(id: string, userId: string): Promise<{
        message: string;
    }>;
    searchPages(query: string): Promise<CmsPageResponseDto[]>;
    private mapPage;
    createFaq(userId: string, dto: CreateCmsFaqDto): Promise<FaqResponseDto>;
    getFaqs(category?: string): Promise<FaqResponseDto[]>;
    getFaqById(id: string): Promise<FaqResponseDto>;
    updateFaq(id: string, dto: Partial<CreateCmsFaqDto>, userId: string): Promise<FaqResponseDto>;
    softDeleteFaq(id: string, userId: string): Promise<{
        message: string;
    }>;
    private mapFaq;
    createAnnouncement(userId: string, dto: CreateCmsAnnouncementDto): Promise<CmsAnnouncementResponseDto>;
    getAnnouncements(activeOnly?: boolean): Promise<CmsAnnouncementResponseDto[]>;
    getAnnouncementById(id: string): Promise<CmsAnnouncementResponseDto>;
    updateAnnouncement(id: string, dto: Partial<CreateCmsAnnouncementDto>, userId: string): Promise<CmsAnnouncementResponseDto>;
    softDeleteAnnouncement(id: string, userId: string): Promise<{
        message: string;
    }>;
    private mapAnnouncement;
    createPolicy(userId: string, dto: CreateCmsPolicyDto): Promise<CmsPolicyResponseDto>;
    getPolicies(policyType?: string): Promise<CmsPolicyResponseDto[]>;
    getPolicyById(id: string): Promise<CmsPolicyResponseDto>;
    updatePolicy(id: string, dto: Partial<CreateCmsPolicyDto>, userId: string): Promise<CmsPolicyResponseDto>;
    softDeletePolicy(id: string, userId: string): Promise<{
        message: string;
    }>;
    private mapPolicy;
    createBanner(userId: string, dto: CreateCmsBannerDto): Promise<CmsBannerResponseDto>;
    getBanners(activeOnly?: boolean): Promise<CmsBannerResponseDto[]>;
    getBannerById(id: string): Promise<CmsBannerResponseDto>;
    updateBanner(id: string, dto: Partial<CreateCmsBannerDto>, userId: string): Promise<CmsBannerResponseDto>;
    softDeleteBanner(id: string, userId: string): Promise<{
        message: string;
    }>;
    private mapBanner;
    createMedia(userId: string, dto: CreateMediaLibraryDto): Promise<MediaLibraryResponseDto>;
    getMedia(mediaType?: string): Promise<MediaLibraryResponseDto[]>;
    getMediaById(id: string): Promise<MediaLibraryResponseDto>;
    softDeleteMedia(id: string, userId: string): Promise<{
        message: string;
    }>;
    searchMedia(query: string): Promise<MediaLibraryResponseDto[]>;
    private mapMedia;
    createBlock(userId: string, dto: CreateContentBlockDto): Promise<ContentBlockResponseDto>;
    getBlocks(): Promise<ContentBlockResponseDto[]>;
    getBlockById(id: string): Promise<ContentBlockResponseDto>;
    getBlockByCode(code: string): Promise<ContentBlockResponseDto>;
    updateBlock(id: string, dto: Partial<CreateContentBlockDto>, userId: string): Promise<ContentBlockResponseDto>;
    softDeleteBlock(id: string, userId: string): Promise<{
        message: string;
    }>;
    private mapBlock;
    getStatistics(): Promise<CmsStatsResponseDto>;
    getArticles(): Promise<HealthArticleResponseDto[]>;
    getArticleDetails(id: string): Promise<HealthArticleResponseDto>;
}

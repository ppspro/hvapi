import { ICmsRepository } from '../../domain/repositories/cms.repository.interface';
import { CmsPageResponseDto, HealthArticleResponseDto, FaqResponseDto } from '../../presentation/dto/cms-response.dto';
import { Logger } from 'nestjs-pino';
export declare class CmsService {
    private readonly cmsRepository;
    private readonly logger;
    constructor(cmsRepository: ICmsRepository, logger: Logger);
    getPage(slug: string): Promise<CmsPageResponseDto>;
    getArticles(): Promise<HealthArticleResponseDto[]>;
    getArticleDetails(id: string): Promise<HealthArticleResponseDto>;
    getFaqs(): Promise<FaqResponseDto[]>;
}

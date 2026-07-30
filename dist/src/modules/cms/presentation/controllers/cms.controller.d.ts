import { CmsService } from '../../application/use-cases/cms.service';
import { CmsPageResponseDto, HealthArticleResponseDto, FaqResponseDto } from '../dto/cms-response.dto';
export declare class CmsController {
    private readonly cmsService;
    constructor(cmsService: CmsService);
    getPage(slug: string): Promise<CmsPageResponseDto>;
    getArticles(): Promise<HealthArticleResponseDto[]>;
    getArticleDetails(id: string): Promise<HealthArticleResponseDto>;
    getFaqs(): Promise<FaqResponseDto[]>;
}

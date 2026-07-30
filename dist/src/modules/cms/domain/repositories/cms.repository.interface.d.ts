import { CmsPageEntity, HealthArticleEntity, FaqEntity } from '../entities/cms.entity';
export interface ICmsRepository {
    findPageBySlug(slug: string): Promise<CmsPageEntity | null>;
    findAllArticles(): Promise<HealthArticleEntity[]>;
    findArticleById(id: string): Promise<HealthArticleEntity | null>;
    findAllFaqs(): Promise<FaqEntity[]>;
}

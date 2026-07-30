import { DatabaseService } from "../../../../database/database.service";
import { ICmsRepository } from '../../domain/repositories/cms.repository.interface';
import { CmsPageEntity, HealthArticleEntity, FaqEntity } from '../../domain/entities/cms.entity';
export declare class CmsRepository implements ICmsRepository {
    private readonly db;
    constructor(db: DatabaseService);
    findPageBySlug(slug: string): Promise<CmsPageEntity | null>;
    findAllArticles(): Promise<HealthArticleEntity[]>;
    findArticleById(id: string): Promise<HealthArticleEntity | null>;
    findAllFaqs(): Promise<FaqEntity[]>;
}

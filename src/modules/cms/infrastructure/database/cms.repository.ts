import { Injectable } from '@nestjs/common';
import { DatabaseService } from '@database/database.service';
import { ICmsRepository } from '../../domain/repositories/cms.repository.interface';
import { CmsPageEntity, HealthArticleEntity, FaqEntity } from '../../domain/entities/cms.entity';

@Injectable()
export class CmsRepository implements ICmsRepository {
  constructor(private readonly db: DatabaseService) {}

  async findPageBySlug(slug: string): Promise<CmsPageEntity | null> {
    return (await this.db.cmsPage.findUnique({
      where: { slug },
    })) as CmsPageEntity | null;
  }

  async findAllArticles(): Promise<HealthArticleEntity[]> {
    return (await this.db.healthArticle.findMany({
      orderBy: { createdAt: 'desc' },
    })) as HealthArticleEntity[];
  }

  async findArticleById(id: string): Promise<HealthArticleEntity | null> {
    return (await this.db.healthArticle.findUnique({
      where: { id },
    })) as HealthArticleEntity | null;
  }

  async findAllFaqs(): Promise<FaqEntity[]> {
    return (await this.db.faq.findMany({
      orderBy: { createdAt: 'asc' },
    })) as FaqEntity[];
  }
}

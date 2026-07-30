import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { ICmsRepository } from '../../domain/repositories/cms.repository.interface';
import { CmsPageResponseDto, HealthArticleResponseDto, FaqResponseDto } from '../../presentation/dto/cms-response.dto';
import { Logger } from 'nestjs-pino';

@Injectable()
export class CmsService {
  constructor(
    @Inject('ICmsRepository')
    private readonly cmsRepository: ICmsRepository,
    private readonly logger: Logger,
  ) {}

  async getPage(slug: string): Promise<CmsPageResponseDto> {
    const page = await this.cmsRepository.findPageBySlug(slug);
    if (!page) {
      throw new NotFoundException('CMS page not found');
    }

    this.logger.log({ msg: 'CMS page requested', slug });

    return {
      slug: page.slug,
      title: page.title,
      content: page.content,
    };
  }

  async getArticles(): Promise<HealthArticleResponseDto[]> {
    const list = await this.cmsRepository.findAllArticles();
    return list.map(a => ({
      id: a.id,
      title: a.title,
      summary: a.summary,
      body: a.body,
    }));
  }

  async getArticleDetails(id: string): Promise<HealthArticleResponseDto> {
    const article = await this.cmsRepository.findArticleById(id);
    if (!article) {
      throw new NotFoundException('Health article not found');
    }

    this.logger.log({ msg: 'Article viewed', articleId: id });

    return {
      id: article.id,
      title: article.title,
      summary: article.summary,
      body: article.body,
    };
  }

  async getFaqs(): Promise<FaqResponseDto[]> {
    this.logger.log({ msg: 'FAQ viewed' });
    const list = await this.cmsRepository.findAllFaqs();
    return list.map(f => ({
      id: f.id,
      question: f.question,
      answer: f.answer,
    }));
  }
}

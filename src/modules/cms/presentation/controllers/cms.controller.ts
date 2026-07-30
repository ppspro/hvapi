import { Controller, Get, Param, UseGuards, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { CmsService } from '../../application/use-cases/cms.service';
import { CmsPageResponseDto, HealthArticleResponseDto, FaqResponseDto } from '../dto/cms-response.dto';

@ApiTags('CMS')
@Controller('cms')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth('JWT-Auth')
export class CmsController {
  constructor(private readonly cmsService: CmsService) {}

  @Get('pages/:slug')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get Static Page Content by Slug (e.g. privacy-policy)' })
  @ApiResponse({ status: 200, type: CmsPageResponseDto })
  async getPage(@Param('slug') slug: string): Promise<CmsPageResponseDto> {
    return this.cmsService.getPage(slug);
  }

  @Get('articles')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'List Registered Health Articles' })
  @ApiResponse({ status: 200, type: [HealthArticleResponseDto] })
  async getArticles(): Promise<HealthArticleResponseDto[]> {
    return this.cmsService.getArticles();
  }

  @Get('articles/:id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get Article Details' })
  @ApiResponse({ status: 200, type: HealthArticleResponseDto })
  async getArticleDetails(@Param('id') id: string): Promise<HealthArticleResponseDto> {
    return this.cmsService.getArticleDetails(id);
  }

  @Get('faqs')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get FAQ Listing' })
  @ApiResponse({ status: 200, type: [FaqResponseDto] })
  async getFaqs(): Promise<FaqResponseDto[]> {
    return this.cmsService.getFaqs();
  }
}

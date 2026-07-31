import {
  Controller, Get, Post, Put, Delete, Body, Param, Query, UseGuards, Req, HttpCode, HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse as SwaggerResponse, ApiBearerAuth, ApiParam, ApiQuery } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { CmsService } from '../../application/use-cases/cms.service';
import {
  CmsPageResponseDto, FaqResponseDto, CmsAnnouncementResponseDto, CmsPolicyResponseDto,
  CmsBannerResponseDto, MediaLibraryResponseDto, ContentBlockResponseDto, CmsStatsResponseDto,
} from '../dto/cms-response.dto';
import {
  CreateCmsPageDto, CreateCmsFaqDto, CreateCmsAnnouncementDto, CreateCmsPolicyDto,
  CreateCmsBannerDto, CreateMediaLibraryDto, CreateContentBlockDto,
} from '../dto/cms-enterprise.dto';

@ApiTags('CMS')
@Controller('cms')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth('JWT-Auth')
export class CmsController {
  constructor(private readonly cmsService: CmsService) {}

  // ─── Statistics ──────────────────────────────────────────────────────────

  @Get('statistics')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get platform-wide CMS content statistics' })
  @SwaggerResponse({ status: 200, type: CmsStatsResponseDto })
  async getStatistics(): Promise<CmsStatsResponseDto> {
    return this.cmsService.getStatistics();
  }

  // ─── Pages ───────────────────────────────────────────────────────────────

  @Post('pages')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new CMS page' })
  @SwaggerResponse({ status: 201, type: CmsPageResponseDto })
  async createPage(@Req() req: any, @Body() dto: CreateCmsPageDto): Promise<CmsPageResponseDto> {
    return this.cmsService.createPage(req.user.userId, dto);
  }

  @Get('pages')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'List all CMS pages' })
  @ApiQuery({ name: 'status', required: false, enum: ['DRAFT', 'REVIEW', 'PUBLISHED', 'ARCHIVED'] })
  @SwaggerResponse({ status: 200, type: [CmsPageResponseDto] })
  async getPages(@Query('status') status?: string): Promise<CmsPageResponseDto[]> {
    return this.cmsService.getPages(status);
  }

  @Get('pages/search')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Search CMS pages by title, slug, content, or summary' })
  @ApiQuery({ name: 'q', required: true })
  @SwaggerResponse({ status: 200, type: [CmsPageResponseDto] })
  async searchPages(@Query('q') query: string): Promise<CmsPageResponseDto[]> {
    return this.cmsService.searchPages(query);
  }

  @Get('pages/:id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get CMS page by ID or slug' })
  @ApiParam({ name: 'id', description: 'CMS Page ID or Unique Slug' })
  @SwaggerResponse({ status: 200, type: CmsPageResponseDto })
  async getPageById(@Param('id') id: string): Promise<CmsPageResponseDto> {
    // If param contains hyphens or no UUID structure, attempt slug resolution first
    if (id.includes('-') && id.length < 32) {
      try {
        return await this.cmsService.getPage(id);
      } catch {
        // Fall back to ID look up
      }
    }
    return this.cmsService.getPageById(id);
  }

  @Put('pages/:id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Update CMS page details or publication status' })
  @ApiParam({ name: 'id', description: 'CMS Page ID' })
  @SwaggerResponse({ status: 200, type: CmsPageResponseDto })
  async updatePage(
    @Req() req: any,
    @Param('id') id: string,
    @Body() dto: Partial<CreateCmsPageDto>,
  ): Promise<CmsPageResponseDto> {
    return this.cmsService.updatePage(id, dto, req.user.userId);
  }

  @Delete('pages/:id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Soft-delete a CMS page' })
  @ApiParam({ name: 'id', description: 'CMS Page ID' })
  @SwaggerResponse({ status: 200, description: 'Page soft-deleted' })
  async softDeletePage(@Req() req: any, @Param('id') id: string): Promise<any> {
    return this.cmsService.softDeletePage(id, req.user.userId);
  }

  // ─── FAQs ────────────────────────────────────────────────────────────────

  @Post('faqs')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new FAQ item' })
  @SwaggerResponse({ status: 201, type: FaqResponseDto })
  async createFaq(@Req() req: any, @Body() dto: CreateCmsFaqDto): Promise<FaqResponseDto> {
    return this.cmsService.createFaq(req.user.userId, dto);
  }

  @Get('faqs')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'List FAQs, optionally filtered by category' })
  @ApiQuery({ name: 'category', required: false })
  @SwaggerResponse({ status: 200, type: [FaqResponseDto] })
  async getFaqs(@Query('category') category?: string): Promise<FaqResponseDto[]> {
    return this.cmsService.getFaqs(category);
  }

  @Put('faqs/:id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Update FAQ question, answer, category or display order' })
  @ApiParam({ name: 'id', description: 'FAQ ID' })
  @SwaggerResponse({ status: 200, type: FaqResponseDto })
  async updateFaq(
    @Req() req: any,
    @Param('id') id: string,
    @Body() dto: Partial<CreateCmsFaqDto>,
  ): Promise<FaqResponseDto> {
    return this.cmsService.updateFaq(id, dto, req.user.userId);
  }

  @Delete('faqs/:id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Soft-delete a FAQ item' })
  @ApiParam({ name: 'id', description: 'FAQ ID' })
  @SwaggerResponse({ status: 200, description: 'FAQ soft-deleted' })
  async softDeleteFaq(@Req() req: any, @Param('id') id: string): Promise<any> {
    return this.cmsService.softDeleteFaq(id, req.user.userId);
  }

  // ─── Announcements ───────────────────────────────────────────────────────

  @Post('announcements')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new system announcement' })
  @SwaggerResponse({ status: 201, type: CmsAnnouncementResponseDto })
  async createAnnouncement(@Req() req: any, @Body() dto: CreateCmsAnnouncementDto): Promise<CmsAnnouncementResponseDto> {
    return this.cmsService.createAnnouncement(req.user.userId, dto);
  }

  @Get('announcements')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'List announcements' })
  @ApiQuery({ name: 'activeOnly', required: false, type: Boolean })
  @SwaggerResponse({ status: 200, type: [CmsAnnouncementResponseDto] })
  async getAnnouncements(@Query('activeOnly') activeOnly?: boolean): Promise<CmsAnnouncementResponseDto[]> {
    return this.cmsService.getAnnouncements(activeOnly);
  }

  @Put('announcements/:id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Update announcement' })
  @ApiParam({ name: 'id', description: 'Announcement ID' })
  @SwaggerResponse({ status: 200, type: CmsAnnouncementResponseDto })
  async updateAnnouncement(
    @Req() req: any,
    @Param('id') id: string,
    @Body() dto: Partial<CreateCmsAnnouncementDto>,
  ): Promise<CmsAnnouncementResponseDto> {
    return this.cmsService.updateAnnouncement(id, dto, req.user.userId);
  }

  @Delete('announcements/:id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Soft-delete an announcement' })
  @ApiParam({ name: 'id', description: 'Announcement ID' })
  @SwaggerResponse({ status: 200, description: 'Announcement soft-deleted' })
  async softDeleteAnnouncement(@Req() req: any, @Param('id') id: string): Promise<any> {
    return this.cmsService.softDeleteAnnouncement(id, req.user.userId);
  }

  // ─── Policies ────────────────────────────────────────────────────────────

  @Post('policies')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new platform policy' })
  @SwaggerResponse({ status: 201, type: CmsPolicyResponseDto })
  async createPolicy(@Req() req: any, @Body() dto: CreateCmsPolicyDto): Promise<CmsPolicyResponseDto> {
    return this.cmsService.createPolicy(req.user.userId, dto);
  }

  @Get('policies')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'List platform policies' })
  @ApiQuery({ name: 'policyType', required: false })
  @SwaggerResponse({ status: 200, type: [CmsPolicyResponseDto] })
  async getPolicies(@Query('policyType') policyType?: string): Promise<CmsPolicyResponseDto[]> {
    return this.cmsService.getPolicies(policyType);
  }

  @Put('policies/:id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Update policy details or version' })
  @ApiParam({ name: 'id', description: 'Policy ID' })
  @SwaggerResponse({ status: 200, type: CmsPolicyResponseDto })
  async updatePolicy(
    @Req() req: any,
    @Param('id') id: string,
    @Body() dto: Partial<CreateCmsPolicyDto>,
  ): Promise<CmsPolicyResponseDto> {
    return this.cmsService.updatePolicy(id, dto, req.user.userId);
  }

  @Delete('policies/:id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Soft-delete a policy' })
  @ApiParam({ name: 'id', description: 'Policy ID' })
  @SwaggerResponse({ status: 200, description: 'Policy soft-deleted' })
  async softDeletePolicy(@Req() req: any, @Param('id') id: string): Promise<any> {
    return this.cmsService.softDeletePolicy(id, req.user.userId);
  }

  // ─── Banners ─────────────────────────────────────────────────────────────

  @Post('banners')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new promotional banner' })
  @SwaggerResponse({ status: 201, type: CmsBannerResponseDto })
  async createBanner(@Req() req: any, @Body() dto: CreateCmsBannerDto): Promise<CmsBannerResponseDto> {
    return this.cmsService.createBanner(req.user.userId, dto);
  }

  @Get('banners')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'List promotional banners' })
  @ApiQuery({ name: 'activeOnly', required: false, type: Boolean })
  @SwaggerResponse({ status: 200, type: [CmsBannerResponseDto] })
  async getBanners(@Query('activeOnly') activeOnly?: boolean): Promise<CmsBannerResponseDto[]> {
    return this.cmsService.getBanners(activeOnly);
  }

  @Put('banners/:id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Update banner image, redirect URL or display order' })
  @ApiParam({ name: 'id', description: 'Banner ID' })
  @SwaggerResponse({ status: 200, type: CmsBannerResponseDto })
  async updateBanner(
    @Req() req: any,
    @Param('id') id: string,
    @Body() dto: Partial<CreateCmsBannerDto>,
  ): Promise<CmsBannerResponseDto> {
    return this.cmsService.updateBanner(id, dto, req.user.userId);
  }

  @Delete('banners/:id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Soft-delete a banner' })
  @ApiParam({ name: 'id', description: 'Banner ID' })
  @SwaggerResponse({ status: 200, description: 'Banner soft-deleted' })
  async softDeleteBanner(@Req() req: any, @Param('id') id: string): Promise<any> {
    return this.cmsService.softDeleteBanner(id, req.user.userId);
  }

  // ─── Media Library ───────────────────────────────────────────────────────

  @Post('media')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Register a media item in Media Library' })
  @SwaggerResponse({ status: 201, type: MediaLibraryResponseDto })
  async createMedia(@Req() req: any, @Body() dto: CreateMediaLibraryDto): Promise<MediaLibraryResponseDto> {
    return this.cmsService.createMedia(req.user.userId, dto);
  }

  @Get('media')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'List media items in library' })
  @ApiQuery({ name: 'mediaType', required: false, enum: ['IMAGE', 'VIDEO', 'PDF', 'DOCUMENT', 'AUDIO', 'OTHER'] })
  @SwaggerResponse({ status: 200, type: [MediaLibraryResponseDto] })
  async getMedia(@Query('mediaType') mediaType?: string): Promise<MediaLibraryResponseDto[]> {
    return this.cmsService.getMedia(mediaType);
  }

  @Get('media/search')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Search media library by file name or mime type' })
  @ApiQuery({ name: 'q', required: true })
  @SwaggerResponse({ status: 200, type: [MediaLibraryResponseDto] })
  async searchMedia(@Query('q') query: string): Promise<MediaLibraryResponseDto[]> {
    return this.cmsService.searchMedia(query);
  }

  @Delete('media/:id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Soft-delete a media item' })
  @ApiParam({ name: 'id', description: 'Media ID' })
  @SwaggerResponse({ status: 200, description: 'Media item soft-deleted' })
  async softDeleteMedia(@Req() req: any, @Param('id') id: string): Promise<any> {
    return this.cmsService.softDeleteMedia(id, req.user.userId);
  }

  // ─── Content Blocks ──────────────────────────────────────────────────────

  @Post('blocks')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a reusable content block' })
  @SwaggerResponse({ status: 201, type: ContentBlockResponseDto })
  async createBlock(@Req() req: any, @Body() dto: CreateContentBlockDto): Promise<ContentBlockResponseDto> {
    return this.cmsService.createBlock(req.user.userId, dto);
  }

  @Get('blocks')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'List all content blocks' })
  @SwaggerResponse({ status: 200, type: [ContentBlockResponseDto] })
  async getBlocks(): Promise<ContentBlockResponseDto[]> {
    return this.cmsService.getBlocks();
  }

  @Put('blocks/:id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Update a reusable content block' })
  @ApiParam({ name: 'id', description: 'Content Block ID' })
  @SwaggerResponse({ status: 200, type: ContentBlockResponseDto })
  async updateBlock(
    @Req() req: any,
    @Param('id') id: string,
    @Body() dto: Partial<CreateContentBlockDto>,
  ): Promise<ContentBlockResponseDto> {
    return this.cmsService.updateBlock(id, dto, req.user.userId);
  }

  @Delete('blocks/:id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Soft-delete a content block' })
  @ApiParam({ name: 'id', description: 'Content Block ID' })
  @SwaggerResponse({ status: 200, description: 'Content block soft-deleted' })
  async softDeleteBlock(@Req() req: any, @Param('id') id: string): Promise<any> {
    return this.cmsService.softDeleteBlock(id, req.user.userId);
  }
}

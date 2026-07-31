import { ApiProperty } from '@nestjs/swagger';

export class CmsPageResponseDto {
  @ApiProperty() id!: string;
  @ApiProperty() title!: string;
  @ApiProperty() slug!: string;
  @ApiProperty() content!: string;
  @ApiProperty({ nullable: true }) summary?: string;
  @ApiProperty({ nullable: true }) seoTitle?: string;
  @ApiProperty({ nullable: true }) seoDescription?: string;
  @ApiProperty({ nullable: true }) seoKeywords?: string;
  @ApiProperty() status!: string;
  @ApiProperty({ nullable: true }) publishedAt?: string;
  @ApiProperty({ nullable: true }) createdBy?: string;
  @ApiProperty({ nullable: true }) updatedBy?: string;
  @ApiProperty() createdAt!: string;
  @ApiProperty() updatedAt!: string;
}

export class HealthArticleResponseDto {
  @ApiProperty() id!: string;
  @ApiProperty() title!: string;
  @ApiProperty() summary!: string;
  @ApiProperty() body!: string;
}

export class FaqResponseDto {
  @ApiProperty() id!: string;
  @ApiProperty() question!: string;
  @ApiProperty() answer!: string;
  @ApiProperty({ required: false }) category?: string;
  @ApiProperty({ required: false }) displayOrder?: number;
  @ApiProperty({ required: false }) status?: string;
  @ApiProperty({ required: false }) createdAt?: string;
}

export class CmsAnnouncementResponseDto {
  @ApiProperty() id!: string;
  @ApiProperty() title!: string;
  @ApiProperty() description!: string;
  @ApiProperty({ nullable: true }) startDate?: string;
  @ApiProperty({ nullable: true }) endDate?: string;
  @ApiProperty() priority!: string;
  @ApiProperty() status!: string;
  @ApiProperty({ nullable: true }) publishedAt?: string;
  @ApiProperty({ nullable: true }) createdBy?: string;
  @ApiProperty() createdAt!: string;
  @ApiProperty() updatedAt!: string;
}

export class CmsPolicyResponseDto {
  @ApiProperty() id!: string;
  @ApiProperty() title!: string;
  @ApiProperty() policyType!: string;
  @ApiProperty() version!: string;
  @ApiProperty() content!: string;
  @ApiProperty({ nullable: true }) effectiveDate?: string;
  @ApiProperty() status!: string;
  @ApiProperty() createdAt!: string;
  @ApiProperty() updatedAt!: string;
}

export class CmsBannerResponseDto {
  @ApiProperty() id!: string;
  @ApiProperty() title!: string;
  @ApiProperty() imageUrl!: string;
  @ApiProperty({ nullable: true }) mobileImageUrl?: string;
  @ApiProperty({ nullable: true }) redirectUrl?: string;
  @ApiProperty() displayOrder!: number;
  @ApiProperty({ nullable: true }) startDate?: string;
  @ApiProperty({ nullable: true }) endDate?: string;
  @ApiProperty() status!: string;
  @ApiProperty() createdAt!: string;
  @ApiProperty() updatedAt!: string;
}

export class MediaLibraryResponseDto {
  @ApiProperty() id!: string;
  @ApiProperty() fileName!: string;
  @ApiProperty() originalName!: string;
  @ApiProperty() filePath!: string;
  @ApiProperty() mimeType!: string;
  @ApiProperty() fileSize!: number;
  @ApiProperty() mediaType!: string;
  @ApiProperty({ nullable: true }) uploadedBy?: string;
  @ApiProperty({ nullable: true }) metadata?: any;
  @ApiProperty() createdAt!: string;
  @ApiProperty() updatedAt!: string;
}

export class ContentBlockResponseDto {
  @ApiProperty() id!: string;
  @ApiProperty() name!: string;
  @ApiProperty() code!: string;
  @ApiProperty() content!: string;
  @ApiProperty() status!: string;
  @ApiProperty() createdAt!: string;
  @ApiProperty() updatedAt!: string;
}

export class CmsStatsResponseDto {
  @ApiProperty() pagesCount!: number;
  @ApiProperty() faqsCount!: number;
  @ApiProperty() announcementsCount!: number;
  @ApiProperty() policiesCount!: number;
  @ApiProperty() bannersCount!: number;
  @ApiProperty() mediaCount!: number;
  @ApiProperty() blocksCount!: number;
  @ApiProperty() publishedCount!: number;
  @ApiProperty() draftCount!: number;
  @ApiProperty() archivedCount!: number;
}

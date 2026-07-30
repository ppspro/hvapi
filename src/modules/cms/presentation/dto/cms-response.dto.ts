import { ApiProperty } from '@nestjs/swagger';

export class CmsPageResponseDto {
  @ApiProperty({ example: 'faq' })
  slug!: string;

  @ApiProperty({ example: 'Frequently Asked Questions' })
  title!: string;

  @ApiProperty({ example: '<p>FAQ Page Content...</p>' })
  content!: string;
}

export class HealthArticleResponseDto {
  @ApiProperty({ example: 'article-uuid-v4' })
  id!: string;

  @ApiProperty({ example: 'Understanding Blood Sugar Levels' })
  title!: string;

  @ApiProperty({ example: 'A brief guide to reading blood panel glucose tests.' })
  summary!: string;

  @ApiProperty({ example: '<p>Complete article body text...</p>' })
  body!: string;
}

export class FaqResponseDto {
  @ApiProperty({ example: 'faq-uuid-v4' })
  id!: string;

  @ApiProperty({ example: 'How do I download my health card?' })
  question!: string;

  @ApiProperty({ example: 'You can request the card from your home tab.' })
  answer!: string;
}

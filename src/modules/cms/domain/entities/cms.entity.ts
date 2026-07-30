export class CmsPageEntity {
  id!: string;
  slug!: string;
  title!: string;
  content!: string;
  createdAt!: Date;
  updatedAt!: Date;
}

export class HealthArticleEntity {
  id!: string;
  title!: string;
  summary!: string;
  body!: string;
  createdAt!: Date;
  updatedAt!: Date;
}

export class FaqEntity {
  id!: string;
  question!: string;
  answer!: string;
  createdAt!: Date;
  updatedAt!: Date;
}

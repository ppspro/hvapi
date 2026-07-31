export declare class CmsPageResponseDto {
    id: string;
    title: string;
    slug: string;
    content: string;
    summary?: string;
    seoTitle?: string;
    seoDescription?: string;
    seoKeywords?: string;
    status: string;
    publishedAt?: string;
    createdBy?: string;
    updatedBy?: string;
    createdAt: string;
    updatedAt: string;
}
export declare class HealthArticleResponseDto {
    id: string;
    title: string;
    summary: string;
    body: string;
}
export declare class FaqResponseDto {
    id: string;
    question: string;
    answer: string;
    category?: string;
    displayOrder?: number;
    status?: string;
    createdAt?: string;
}
export declare class CmsAnnouncementResponseDto {
    id: string;
    title: string;
    description: string;
    startDate?: string;
    endDate?: string;
    priority: string;
    status: string;
    publishedAt?: string;
    createdBy?: string;
    createdAt: string;
    updatedAt: string;
}
export declare class CmsPolicyResponseDto {
    id: string;
    title: string;
    policyType: string;
    version: string;
    content: string;
    effectiveDate?: string;
    status: string;
    createdAt: string;
    updatedAt: string;
}
export declare class CmsBannerResponseDto {
    id: string;
    title: string;
    imageUrl: string;
    mobileImageUrl?: string;
    redirectUrl?: string;
    displayOrder: number;
    startDate?: string;
    endDate?: string;
    status: string;
    createdAt: string;
    updatedAt: string;
}
export declare class MediaLibraryResponseDto {
    id: string;
    fileName: string;
    originalName: string;
    filePath: string;
    mimeType: string;
    fileSize: number;
    mediaType: string;
    uploadedBy?: string;
    metadata?: any;
    createdAt: string;
    updatedAt: string;
}
export declare class ContentBlockResponseDto {
    id: string;
    name: string;
    code: string;
    content: string;
    status: string;
    createdAt: string;
    updatedAt: string;
}
export declare class CmsStatsResponseDto {
    pagesCount: number;
    faqsCount: number;
    announcementsCount: number;
    policiesCount: number;
    bannersCount: number;
    mediaCount: number;
    blocksCount: number;
    publishedCount: number;
    draftCount: number;
    archivedCount: number;
}

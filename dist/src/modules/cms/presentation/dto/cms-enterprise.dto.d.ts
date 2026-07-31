export declare class CreateCmsPageDto {
    title: string;
    slug: string;
    content: string;
    summary?: string;
    seoTitle?: string;
    seoDescription?: string;
    seoKeywords?: string;
    status?: string;
}
export declare class CreateCmsFaqDto {
    question: string;
    answer: string;
    category?: string;
    displayOrder?: number;
    status?: string;
}
export declare class CreateCmsAnnouncementDto {
    title: string;
    description: string;
    startDate?: string;
    endDate?: string;
    priority?: string;
    status?: string;
}
export declare class CreateCmsPolicyDto {
    title: string;
    policyType: string;
    version?: string;
    content: string;
    effectiveDate?: string;
    status?: string;
}
export declare class CreateCmsBannerDto {
    title: string;
    imageUrl: string;
    mobileImageUrl?: string;
    redirectUrl?: string;
    displayOrder?: number;
    startDate?: string;
    endDate?: string;
    status?: string;
}
export declare class CreateMediaLibraryDto {
    fileName: string;
    originalName: string;
    filePath: string;
    mimeType: string;
    fileSize: number;
    mediaType?: string;
    metadata?: any;
}
export declare class CreateContentBlockDto {
    name: string;
    code: string;
    content: string;
    status?: string;
}

export declare class CmsPageEntity {
    id: string;
    title: string;
    slug: string;
    content: string;
    summary?: string | null;
    seoTitle?: string | null;
    seoDescription?: string | null;
    seoKeywords?: string | null;
    status: string;
    publishedAt?: Date | null;
    createdBy?: string | null;
    updatedBy?: string | null;
    isDeleted: boolean;
    deletedAt?: Date | null;
    createdAt: Date;
    updatedAt: Date;
}
export declare class CmsFaqEntity {
    id: string;
    question: string;
    answer: string;
    category: string;
    displayOrder: number;
    status: string;
    isDeleted: boolean;
    deletedAt?: Date | null;
    createdAt: Date;
    updatedAt: Date;
}
export declare class CmsAnnouncementEntity {
    id: string;
    title: string;
    description: string;
    startDate?: Date | null;
    endDate?: Date | null;
    priority: string;
    status: string;
    publishedAt?: Date | null;
    createdBy?: string | null;
    isDeleted: boolean;
    deletedAt?: Date | null;
    createdAt: Date;
    updatedAt: Date;
}
export declare class CmsPolicyEntity {
    id: string;
    title: string;
    policyType: string;
    version: string;
    content: string;
    effectiveDate?: Date | null;
    status: string;
    isDeleted: boolean;
    deletedAt?: Date | null;
    createdAt: Date;
    updatedAt: Date;
}
export declare class CmsBannerEntity {
    id: string;
    title: string;
    imageUrl: string;
    mobileImageUrl?: string | null;
    redirectUrl?: string | null;
    displayOrder: number;
    startDate?: Date | null;
    endDate?: Date | null;
    status: string;
    isDeleted: boolean;
    deletedAt?: Date | null;
    createdAt: Date;
    updatedAt: Date;
}
export declare class MediaLibraryEntity {
    id: string;
    fileName: string;
    originalName: string;
    filePath: string;
    mimeType: string;
    fileSize: number;
    mediaType: string;
    uploadedBy?: string | null;
    metadata?: string | null;
    isDeleted: boolean;
    deletedAt?: Date | null;
    createdAt: Date;
    updatedAt: Date;
}
export declare class ContentBlockEntity {
    id: string;
    name: string;
    code: string;
    content: string;
    status: string;
    isDeleted: boolean;
    deletedAt?: Date | null;
    createdAt: Date;
    updatedAt: Date;
}
export declare class CmsAuditLogEntity {
    id: string;
    contentType: string;
    contentId: string;
    action: string;
    performedBy?: string | null;
    details?: string | null;
    createdAt: Date;
}

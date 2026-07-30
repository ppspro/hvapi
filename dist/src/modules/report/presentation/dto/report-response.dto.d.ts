export declare class ReportAttachmentDto {
    id: string;
    fileName: string;
    fileSize: number;
    mimeType: string;
    storageUrl: string;
}
export declare class ReportResponseDto {
    id: string;
    title: string;
    category: string;
    prescribedBy?: string;
    createdAt: Date;
    attachments: ReportAttachmentDto[];
}

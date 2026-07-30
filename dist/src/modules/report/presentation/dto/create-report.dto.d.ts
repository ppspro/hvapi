export declare class CreateReportDto {
    title: string;
    category: string;
    prescribedBy?: string;
    fileName: string;
    fileSize: number;
    mimeType: string;
    storageUrl: string;
}
export declare class CreateReportResponseDto {
    reportId: string;
    message: string;
}

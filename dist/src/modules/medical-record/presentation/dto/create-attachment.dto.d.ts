import { AttachmentCategory } from './create-medical-record.dto';
export declare class CreateAttachmentDto {
    fileName: string;
    originalName: string;
    fileSize: number;
    mimeType: string;
    category?: AttachmentCategory;
    storageKey: string;
    storageUrl: string;
    checksum?: string;
}
export declare class UpdateAttachmentDto {
    category?: AttachmentCategory;
    fileName?: string;
    storageKey?: string;
    storageUrl?: string;
    fileSize?: number;
}

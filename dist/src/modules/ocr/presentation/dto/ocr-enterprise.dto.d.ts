export declare class CreateOCRJobDto {
    medicalAttachmentId: string;
    documentType?: string;
}
export declare class CreateOCRTemplateDto {
    code: string;
    name: string;
    documentType: string;
    fieldDefinitions?: any;
    validationRules?: any;
    isActive?: boolean;
}
export declare class UpdateOCRTemplateDto {
    name?: string;
    documentType?: string;
    isActive?: boolean;
}
export declare class VerifyOCRDto {
    reviewStatus: string;
    reviewNotes?: string;
}

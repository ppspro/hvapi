export declare class MedicalReportEntity {
    id: string;
    patientProfileId: string;
    title: string;
    category: string;
    prescribedBy: string | null;
    createdAt: Date;
    updatedAt: Date;
}
export declare class ReportAttachmentEntity {
    id: string;
    medicalReportId: string;
    fileName: string;
    fileSize: number;
    mimeType: string;
    storageUrl: string;
    createdAt: Date;
}

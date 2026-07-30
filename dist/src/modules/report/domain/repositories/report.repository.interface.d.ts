import { MedicalReportEntity, ReportAttachmentEntity } from '../entities/report.entity';
export interface IReportRepository {
    findProfileByUserId(userId: string): Promise<{
        id: string;
    } | null>;
    findReportsByProfileId(profileId: string): Promise<(MedicalReportEntity & {
        attachments: ReportAttachmentEntity[];
    })[]>;
    findReportById(reportId: string): Promise<(MedicalReportEntity & {
        attachments: ReportAttachmentEntity[];
    }) | null>;
    createReport(profileId: string, title: string, category: string, prescribedBy?: string): Promise<MedicalReportEntity>;
    createAttachment(reportId: string, fileName: string, fileSize: number, mimeType: string, storageUrl: string): Promise<ReportAttachmentEntity>;
}

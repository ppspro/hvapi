import { DatabaseService } from "../../../../database/database.service";
import { IReportRepository } from '../../domain/repositories/report.repository.interface';
import { MedicalReportEntity, ReportAttachmentEntity } from '../../domain/entities/report.entity';
export declare class ReportRepository implements IReportRepository {
    private readonly db;
    constructor(db: DatabaseService);
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

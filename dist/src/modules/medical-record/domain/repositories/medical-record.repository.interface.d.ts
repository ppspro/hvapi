import { MedicalRecordEntity, MedicalAttachmentEntity, AttachmentVersionEntity, MedicalRecordAuditLogEntity } from '../entities/medical-record.entity';
export interface IMedicalRecordRepository {
    findProfileByUserId(userId: string): Promise<{
        id: string;
    } | null>;
    createRecord(patientProfileId: string, data: any): Promise<MedicalRecordEntity>;
    findRecordById(id: string, includeDeleted?: boolean): Promise<MedicalRecordEntity | null>;
    findRecordsByProfile(patientProfileId: string, includeArchived?: boolean): Promise<MedicalRecordEntity[]>;
    updateRecord(id: string, data: any): Promise<MedicalRecordEntity>;
    softDeleteRecord(id: string): Promise<void>;
    restoreRecord(id: string): Promise<MedicalRecordEntity>;
    searchRecords(patientProfileId: string, query: string): Promise<MedicalRecordEntity[]>;
    getTimeline(patientProfileId: string): Promise<any[]>;
    createAttachment(data: any): Promise<MedicalAttachmentEntity>;
    findAttachmentById(id: string, includeDeleted?: boolean): Promise<MedicalAttachmentEntity | null>;
    findAttachmentsByRecord(medicalRecordId: string, includeDeleted?: boolean): Promise<MedicalAttachmentEntity[]>;
    findAttachmentsByProfile(patientProfileId: string, includeDeleted?: boolean): Promise<MedicalAttachmentEntity[]>;
    updateAttachment(id: string, data: any): Promise<MedicalAttachmentEntity>;
    softDeleteAttachment(id: string): Promise<void>;
    restoreAttachment(id: string): Promise<MedicalAttachmentEntity>;
    createAttachmentVersion(data: any): Promise<AttachmentVersionEntity>;
    findAttachmentVersions(attachmentId: string): Promise<AttachmentVersionEntity[]>;
    createAuditLog(data: {
        medicalRecordId?: string;
        attachmentId?: string;
        action: string;
        performedBy?: string;
        details?: string;
    }): Promise<MedicalRecordAuditLogEntity>;
}

import { IMedicalRecordRepository } from '../../domain/repositories/medical-record.repository.interface';
import { CreateMedicalRecordDto, UpdateMedicalRecordDto } from '../../presentation/dto/create-medical-record.dto';
import { CreateAttachmentDto, UpdateAttachmentDto } from '../../presentation/dto/create-attachment.dto';
import { MedicalRecordResponseDto, MedicalAttachmentResponseDto, AttachmentVersionResponseDto, MedicalTimelineItemDto } from '../../presentation/dto/medical-record-response.dto';
import { QrService } from "../../../qr/application/use-cases/qr.service";
export declare class MedicalRecordService {
    private readonly repository;
    private readonly qrService;
    constructor(repository: IMedicalRecordRepository, qrService: QrService);
    private resolveProfile;
    private calculateBmi;
    private sanitizeFilename;
    private mapRecord;
    private mapAttachment;
    createRecord(userId: string, dto: CreateMedicalRecordDto): Promise<MedicalRecordResponseDto>;
    getRecords(userId: string): Promise<MedicalRecordResponseDto[]>;
    getRecordById(userId: string, recordId: string): Promise<MedicalRecordResponseDto>;
    updateRecord(userId: string, recordId: string, dto: UpdateMedicalRecordDto): Promise<MedicalRecordResponseDto>;
    softDeleteRecord(userId: string, recordId: string): Promise<{
        message: string;
    }>;
    archiveRecord(userId: string, recordId: string): Promise<MedicalRecordResponseDto>;
    restoreRecord(userId: string, recordId: string): Promise<MedicalRecordResponseDto>;
    searchRecords(userId: string, query: string): Promise<MedicalRecordResponseDto[]>;
    getTimeline(userId: string): Promise<MedicalTimelineItemDto[]>;
    uploadAttachment(userId: string, recordId: string | null, dto: CreateAttachmentDto): Promise<MedicalAttachmentResponseDto>;
    getRecordAttachments(userId: string, recordId: string): Promise<MedicalAttachmentResponseDto[]>;
    getAttachmentById(userId: string, attachmentId: string): Promise<MedicalAttachmentResponseDto>;
    updateAttachment(userId: string, attachmentId: string, dto: UpdateAttachmentDto): Promise<MedicalAttachmentResponseDto>;
    softDeleteAttachment(userId: string, attachmentId: string): Promise<{
        message: string;
    }>;
    restoreAttachment(userId: string, attachmentId: string): Promise<MedicalAttachmentResponseDto>;
    getAttachmentVersions(userId: string, attachmentId: string): Promise<AttachmentVersionResponseDto[]>;
}

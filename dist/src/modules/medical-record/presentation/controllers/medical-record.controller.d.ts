import { MedicalRecordService } from '../../application/use-cases/medical-record.service';
import { CreateMedicalRecordDto, UpdateMedicalRecordDto } from '../dto/create-medical-record.dto';
import { CreateAttachmentDto, UpdateAttachmentDto } from '../dto/create-attachment.dto';
import { MedicalRecordResponseDto, MedicalAttachmentResponseDto, AttachmentVersionResponseDto, MedicalTimelineItemDto } from '../dto/medical-record-response.dto';
export declare class MedicalRecordController {
    private readonly service;
    constructor(service: MedicalRecordService);
    createRecord(req: any, dto: CreateMedicalRecordDto): Promise<MedicalRecordResponseDto>;
    getRecords(req: any): Promise<MedicalRecordResponseDto[]>;
    getTimeline(req: any): Promise<MedicalTimelineItemDto[]>;
    searchRecords(req: any, query: string): Promise<MedicalRecordResponseDto[]>;
    getRecordById(req: any, id: string): Promise<MedicalRecordResponseDto>;
    updateRecord(req: any, id: string, dto: UpdateMedicalRecordDto): Promise<MedicalRecordResponseDto>;
    softDeleteRecord(req: any, id: string): Promise<any>;
    archiveRecord(req: any, id: string): Promise<MedicalRecordResponseDto>;
    restoreRecord(req: any, id: string): Promise<MedicalRecordResponseDto>;
    uploadRecordAttachment(req: any, id: string, dto: CreateAttachmentDto): Promise<MedicalAttachmentResponseDto>;
    getRecordAttachments(req: any, id: string): Promise<MedicalAttachmentResponseDto[]>;
}
export declare class AttachmentController {
    private readonly service;
    constructor(service: MedicalRecordService);
    uploadGlobalAttachment(req: any, dto: CreateAttachmentDto): Promise<MedicalAttachmentResponseDto>;
    getAttachmentById(req: any, id: string): Promise<MedicalAttachmentResponseDto>;
    updateAttachment(req: any, id: string, dto: UpdateAttachmentDto): Promise<MedicalAttachmentResponseDto>;
    softDeleteAttachment(req: any, id: string): Promise<any>;
    restoreAttachment(req: any, id: string): Promise<MedicalAttachmentResponseDto>;
    getAttachmentVersions(req: any, id: string): Promise<AttachmentVersionResponseDto[]>;
}

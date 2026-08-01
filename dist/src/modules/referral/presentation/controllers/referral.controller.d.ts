import { ReferralService } from '../../application/use-cases/referral.service';
import { ReferralResponseDto, ReferralNoteResponseDto, ReferralAttachmentResponseDto, ReferralStatusHistoryResponseDto, ReferralDashboardStatsResponseDto } from '../dto/referral-response.dto';
import { CreateReferralDto, TriageReferralDto, UpdateReferralStatusDto, AddReferralNoteDto, AddReferralAttachmentDto } from '../dto/referral-enterprise.dto';
export declare class ReferralController {
    private readonly referralService;
    constructor(referralService: ReferralService);
    createReferral(req: any, dto: CreateReferralDto): Promise<ReferralResponseDto>;
    getReferrals(patientId?: string, referringDoctorId?: string, receivingDoctorId?: string, receivingFacilityId?: string, status?: string, priority?: string, page?: number, limit?: number): Promise<{
        data: ReferralResponseDto[];
        total: number;
    }>;
    getMyIncoming(req: any): Promise<{
        data: ReferralResponseDto[];
        total: number;
    }>;
    getMyOutgoing(req: any): Promise<{
        data: ReferralResponseDto[];
        total: number;
    }>;
    getDashboardStats(facilityId?: string): Promise<ReferralDashboardStatsResponseDto>;
    getReferralById(id: string): Promise<ReferralResponseDto>;
    triageReferral(req: any, id: string, dto: TriageReferralDto): Promise<ReferralResponseDto>;
    updateStatus(req: any, id: string, dto: UpdateReferralStatusDto): Promise<ReferralResponseDto>;
    addNote(req: any, id: string, dto: AddReferralNoteDto): Promise<ReferralNoteResponseDto>;
    getNotes(id: string): Promise<ReferralNoteResponseDto[]>;
    addAttachment(req: any, id: string, dto: AddReferralAttachmentDto): Promise<ReferralAttachmentResponseDto>;
    getAttachments(id: string): Promise<ReferralAttachmentResponseDto[]>;
    getHistory(id: string): Promise<ReferralStatusHistoryResponseDto[]>;
    softDeleteReferral(id: string): Promise<{
        message: string;
    }>;
}

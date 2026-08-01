import { IReferralRepository } from '../../domain/repositories/referral.repository.interface';
import { ReferralResponseDto, ReferralNoteResponseDto, ReferralAttachmentResponseDto, ReferralStatusHistoryResponseDto, ReferralDashboardStatsResponseDto } from '../../presentation/dto/referral-response.dto';
import { CreateReferralDto, TriageReferralDto, UpdateReferralStatusDto, AddReferralNoteDto, AddReferralAttachmentDto } from '../../presentation/dto/referral-enterprise.dto';
import { Logger } from 'nestjs-pino';
export declare class ReferralService {
    private readonly referralRepository;
    private readonly logger;
    constructor(referralRepository: IReferralRepository, logger: Logger);
    createReferral(userId: string, dto: CreateReferralDto): Promise<ReferralResponseDto>;
    getReferrals(filters: {
        patientId?: string;
        referringDoctorId?: string;
        receivingDoctorId?: string;
        receivingFacilityId?: string;
        status?: string;
        priority?: string;
        page?: number;
        limit?: number;
    }): Promise<{
        data: ReferralResponseDto[];
        total: number;
    }>;
    getReferralById(id: string): Promise<ReferralResponseDto>;
    triageReferral(id: string, userId: string, dto: TriageReferralDto): Promise<ReferralResponseDto>;
    updateStatus(id: string, userId: string, dto: UpdateReferralStatusDto): Promise<ReferralResponseDto>;
    addNote(id: string, userId: string, userRole: string, dto: AddReferralNoteDto): Promise<ReferralNoteResponseDto>;
    getNotes(id: string): Promise<ReferralNoteResponseDto[]>;
    addAttachment(id: string, userId: string, dto: AddReferralAttachmentDto): Promise<ReferralAttachmentResponseDto>;
    getAttachments(id: string): Promise<ReferralAttachmentResponseDto[]>;
    getHistory(id: string): Promise<ReferralStatusHistoryResponseDto[]>;
    getDashboardStats(facilityId?: string): Promise<ReferralDashboardStatsResponseDto>;
    softDeleteReferral(id: string): Promise<{
        message: string;
    }>;
    private mapReferral;
}

import { IFamilyRepository } from '../../domain/repositories/family.repository.interface';
import { CreateInvitationDto, InvitationResponseDto } from '../../presentation/dto/invitation.dto';
import { UpdateFamilyMemberDto, FamilyMemberResponseDto } from '../../presentation/dto/family-member.dto';
import { CreateGuardianDto, UpdateGuardianDto } from '../../presentation/dto/guardian.dto';
import { CreateDependentDto, UpdateDependentDto } from '../../presentation/dto/dependent.dto';
import { CreateConsentDto, UpdateConsentDto, ConsentRecordResponseDto, ConsentHistoryResponseDto } from '../../presentation/dto/consent.dto';
export declare class FamilyService {
    private readonly familyRepository;
    constructor(familyRepository: IFamilyRepository);
    private resolveProfile;
    private mapInvitation;
    private mapMember;
    private mapConsent;
    private mapHistory;
    createInvitation(userId: string, dto: CreateInvitationDto): Promise<InvitationResponseDto>;
    resendInvitation(userId: string, invitationId: string): Promise<InvitationResponseDto>;
    acceptInvitation(userId: string, invitationId: string): Promise<{
        message: string;
        memberId?: string;
    }>;
    rejectInvitation(userId: string, invitationId: string): Promise<{
        message: string;
    }>;
    cancelInvitation(userId: string, invitationId: string): Promise<{
        message: string;
    }>;
    getInvitations(userId: string): Promise<InvitationResponseDto[]>;
    getFamilyMembers(userId: string): Promise<FamilyMemberResponseDto[]>;
    getFamilyMemberById(userId: string, memberId: string): Promise<FamilyMemberResponseDto>;
    updateFamilyMember(userId: string, memberId: string, dto: UpdateFamilyMemberDto): Promise<FamilyMemberResponseDto>;
    removeFamilyMember(userId: string, memberId: string): Promise<{
        message: string;
    }>;
    getGuardians(userId: string): Promise<FamilyMemberResponseDto[]>;
    createGuardian(userId: string, dto: CreateGuardianDto): Promise<FamilyMemberResponseDto>;
    updateGuardian(userId: string, memberId: string, dto: UpdateGuardianDto): Promise<FamilyMemberResponseDto>;
    getDependents(userId: string): Promise<FamilyMemberResponseDto[]>;
    createDependent(userId: string, dto: CreateDependentDto): Promise<FamilyMemberResponseDto>;
    updateDependent(userId: string, memberId: string, dto: UpdateDependentDto): Promise<FamilyMemberResponseDto>;
    removeDependent(userId: string, memberId: string): Promise<{
        message: string;
    }>;
    grantConsent(userId: string, dto: CreateConsentDto): Promise<ConsentRecordResponseDto>;
    updateConsent(userId: string, consentId: string, dto: UpdateConsentDto): Promise<ConsentRecordResponseDto>;
    revokeConsent(userId: string, consentId: string): Promise<{
        message: string;
    }>;
    getConsents(userId: string): Promise<ConsentRecordResponseDto[]>;
    getConsentHistory(userId: string): Promise<ConsentHistoryResponseDto[]>;
}

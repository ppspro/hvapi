import { DatabaseService } from "../../../../database/database.service";
import { IFamilyRepository } from '../../domain/repositories/family.repository.interface';
import { FamilyMemberEntity, FamilyConsentEntity, ConsentRecordEntity, ConsentHistoryEntity } from '../../domain/entities/family.entity';
export declare class FamilyRepository implements IFamilyRepository {
    private readonly db;
    constructor(db: DatabaseService);
    findProfileByUserId(userId: string): Promise<{
        id: string;
    } | null>;
    createInvitation(patientProfileId: string, data: Partial<FamilyConsentEntity>): Promise<FamilyConsentEntity>;
    findInvitationById(id: string): Promise<FamilyConsentEntity | null>;
    findInvitationByToken(token: string): Promise<FamilyConsentEntity | null>;
    findInvitationsByProfile(patientProfileId: string): Promise<FamilyConsentEntity[]>;
    updateInvitation(id: string, data: Partial<FamilyConsentEntity>): Promise<FamilyConsentEntity>;
    deleteInvitation(id: string): Promise<void>;
    createFamilyMember(patientProfileId: string, data: Partial<FamilyMemberEntity>): Promise<FamilyMemberEntity>;
    findFamilyMemberById(id: string): Promise<FamilyMemberEntity | null>;
    findFamilyMembersByProfile(patientProfileId: string): Promise<FamilyMemberEntity[]>;
    findGuardiansByProfile(patientProfileId: string): Promise<FamilyMemberEntity[]>;
    findDependentsByProfile(patientProfileId: string): Promise<FamilyMemberEntity[]>;
    updateFamilyMember(id: string, data: Partial<FamilyMemberEntity>): Promise<FamilyMemberEntity>;
    deleteFamilyMember(id: string): Promise<void>;
    createConsentRecord(patientProfileId: string, familyMemberId: string, data: Partial<ConsentRecordEntity>): Promise<ConsentRecordEntity>;
    findConsentRecordById(id: string): Promise<ConsentRecordEntity | null>;
    findConsentsByProfile(patientProfileId: string, activeOnly?: boolean): Promise<ConsentRecordEntity[]>;
    findConsentsByMember(familyMemberId: string, activeOnly?: boolean): Promise<ConsentRecordEntity[]>;
    updateConsentRecord(id: string, data: Partial<ConsentRecordEntity>): Promise<ConsentRecordEntity>;
    createConsentHistory(consentRecordId: string, action: string, performedBy?: string, reason?: string): Promise<ConsentHistoryEntity>;
    findConsentHistory(consentRecordId: string): Promise<ConsentHistoryEntity[]>;
    findAllConsentHistoryByProfile(patientProfileId: string): Promise<ConsentHistoryEntity[]>;
}

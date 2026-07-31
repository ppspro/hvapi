import { FamilyRelationshipType } from './invitation.dto';
export declare enum FamilyMemberStatus {
    ACTIVE = "ACTIVE",
    INACTIVE = "INACTIVE",
    ARCHIVED = "ARCHIVED"
}
export declare class UpdateFamilyMemberDto {
    fullName?: string;
    relationship?: string;
    relationshipType?: FamilyRelationshipType;
    phone?: string;
    status?: FamilyMemberStatus;
    isPrimary?: boolean;
    notes?: string;
}
export declare class FamilyMemberResponseDto {
    id: string;
    fullName: string;
    relationship: string;
    relationshipType: string;
    phone: string;
    status: string;
    isPrimary: boolean;
    isGuardian: boolean;
    isDependent: boolean;
    isCaregiver: boolean;
    verificationStatus: string;
    notes?: string;
    createdAt: string;
    updatedAt: string;
}

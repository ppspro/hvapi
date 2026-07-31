export declare enum FamilyRelationshipType {
    GUARDIAN = "GUARDIAN",
    DEPENDENT = "DEPENDENT",
    PARENT = "PARENT",
    CHILD = "CHILD",
    SPOUSE = "SPOUSE",
    SIBLING = "SIBLING",
    CAREGIVER = "CAREGIVER",
    OTHER = "OTHER"
}
export declare class CreateInvitationDto {
    inviteePhone: string;
    inviteeName?: string;
    relationship: string;
    relationshipType?: FamilyRelationshipType;
    expiresAt?: string;
}
export declare class InvitationResponseDto {
    id: string;
    inviteePhone: string;
    inviteeName?: string;
    relationship: string;
    relationshipType: string;
    status: string;
    invitationToken: string;
    resendCount: number;
    expiresAt?: string;
    acceptedAt?: string;
    rejectedAt?: string;
    cancelledAt?: string;
    createdAt: string;
}

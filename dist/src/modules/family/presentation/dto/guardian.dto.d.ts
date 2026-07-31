import { FamilyRelationshipType } from './invitation.dto';
export declare class CreateGuardianDto {
    fullName: string;
    phone: string;
    relationshipType: FamilyRelationshipType;
    relationship: string;
    isPrimary?: boolean;
    notes?: string;
}
export declare class UpdateGuardianDto {
    verificationStatus?: string;
    isPrimary?: boolean;
    notes?: string;
}

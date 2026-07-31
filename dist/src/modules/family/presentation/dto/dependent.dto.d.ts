import { FamilyRelationshipType } from './invitation.dto';
export declare class CreateDependentDto {
    fullName: string;
    phone: string;
    relationshipType: FamilyRelationshipType;
    relationship: string;
    isCaregiver?: boolean;
    notes?: string;
}
export declare class UpdateDependentDto {
    fullName?: string;
    phone?: string;
    notes?: string;
}

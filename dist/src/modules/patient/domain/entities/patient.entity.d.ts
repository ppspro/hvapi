export declare class PatientProfileEntity {
    id: string;
    userId: string;
    firstName: string;
    lastName: string;
    dateOfBirth: Date;
    gender: string;
    bloodGroup: string | null;
    address: string | null;
    onboardingStep: number;
    createdAt: Date;
    updatedAt: Date;
}
export declare class EmergencyContactEntity {
    id: string;
    patientProfileId: string;
    name: string;
    relationship: string;
    phone: string;
    createdAt: Date;
    updatedAt: Date;
}
export declare class FamilyMemberEntity {
    id: string;
    patientProfileId: string;
    fullName: string;
    relationship: string;
    phone: string;
    createdAt: Date;
    updatedAt: Date;
}
export declare class FamilyConsentEntity {
    id: string;
    patientProfileId: string;
    inviteePhone: string;
    relationship: string;
    status: 'PENDING' | 'ACCEPTED' | 'REJECTED';
    createdAt: Date;
    updatedAt: Date;
}

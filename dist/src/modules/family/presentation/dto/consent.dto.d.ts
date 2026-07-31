export declare enum ConsentCategory {
    MEDICAL_RECORDS = "MEDICAL_RECORDS",
    HEALTH_CARD = "HEALTH_CARD",
    INSURANCE = "INSURANCE",
    EMERGENCY_ACCESS = "EMERGENCY_ACCESS",
    DOCTOR_ACCESS = "DOCTOR_ACCESS",
    FACILITY_ACCESS = "FACILITY_ACCESS"
}
export declare class CreateConsentDto {
    familyMemberId: string;
    category: ConsentCategory;
    expiresAt?: string;
    notes?: string;
}
export declare class UpdateConsentDto {
    expiresAt?: string;
    notes?: string;
}
export declare class ConsentRecordResponseDto {
    id: string;
    patientProfileId: string;
    familyMemberId: string;
    category: string;
    isActive: boolean;
    grantedAt: string;
    revokedAt?: string;
    expiresAt?: string;
    notes?: string;
    createdAt: string;
}
export declare class ConsentHistoryResponseDto {
    id: string;
    consentRecordId: string;
    action: string;
    performedBy?: string;
    reason?: string;
    createdAt: string;
}

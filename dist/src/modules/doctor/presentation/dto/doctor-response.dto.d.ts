export declare class QualificationResponseDto {
    id: string;
    degreeName: string;
    instituteName: string;
    passingYear: number;
    specialization?: string;
    createdAt: string;
}
export declare class CertificationResponseDto {
    id: string;
    title: string;
    issuingAuthority: string;
    issueDate?: string;
    expiryDate?: string;
    createdAt: string;
}
export declare class ExperienceResponseDto {
    id: string;
    designation: string;
    hospitalName: string;
    startDate: string;
    endDate?: string;
    isCurrent: boolean;
    createdAt: string;
}
export declare class DoctorDocumentResponseDto {
    id: string;
    documentType: string;
    medicalAttachmentId?: string;
    verificationStatus: string;
    createdAt: string;
}
export declare class DoctorProfileFullResponseDto {
    id: string;
    userId: string;
    fullName: string;
    gender?: string;
    dateOfBirth?: string;
    profilePhotoUrl?: string;
    digitalSignatureUrl?: string;
    biography?: string;
    professionalSummary?: string;
    yearsOfExperience: number;
    primarySpecialization: string;
    secondarySpecializations: string[];
    medicalCouncil: string;
    registrationNumber: string;
    licenseNumber: string;
    providerIdentifier: string;
    registrationState?: string;
    registrationCountry?: string;
    registrationIssueDate?: string;
    registrationExpiryDate?: string;
    verificationStatus: string;
    verificationNotes?: string;
    verifiedBy?: string;
    verifiedAt?: string;
    department?: string;
    subSpecializations: string[];
    clinicalInterests: string[];
    servicesOffered: string[];
    languagesSpoken: string[];
    emergencyPhone?: string;
    isDeleted: boolean;
    qualifications: QualificationResponseDto[];
    certifications: CertificationResponseDto[];
    experiences: ExperienceResponseDto[];
    documents: DoctorDocumentResponseDto[];
    qrToken?: string;
    createdAt: string;
    updatedAt: string;
}
export declare class DoctorHistoryItemDto {
    id: string;
    doctorProfileId: string;
    action: string;
    previousStatus?: string;
    newStatus: string;
    reason?: string;
    performedBy?: string;
    createdAt: string;
}
export declare class DoctorStatsResponseDto {
    totalDoctors: number;
    verifiedDoctors: number;
    pendingDoctors: number;
    suspendedDoctors: number;
}

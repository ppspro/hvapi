export declare enum DoctorVerificationStatus {
    PENDING = "PENDING",
    UNDER_REVIEW = "UNDER_REVIEW",
    VERIFIED = "VERIFIED",
    REJECTED = "REJECTED",
    SUSPENDED = "SUSPENDED",
    REVOKED = "REVOKED"
}
export declare class RegisterDoctorDto {
    fullName: string;
    gender?: string;
    dateOfBirth?: string;
    profilePhotoUrl?: string;
    digitalSignatureUrl?: string;
    biography?: string;
    professionalSummary?: string;
    yearsOfExperience?: number;
    primarySpecialization: string;
    secondarySpecializations?: string[];
    medicalCouncil: string;
    registrationNumber: string;
    licenseNumber: string;
    registrationState?: string;
    registrationCountry?: string;
    registrationIssueDate?: string;
    registrationExpiryDate?: string;
    department?: string;
    subSpecializations?: string[];
    clinicalInterests?: string[];
    servicesOffered?: string[];
    languagesSpoken?: string[];
    emergencyPhone?: string;
}
export declare class AddQualificationDto {
    degreeName: string;
    instituteName: string;
    passingYear: number;
    specialization?: string;
}
export declare class AddCertificationDto {
    title: string;
    issuingAuthority: string;
    issueDate?: string;
    expiryDate?: string;
}
export declare class AddExperienceDto {
    designation: string;
    hospitalName: string;
    startDate: string;
    endDate?: string;
    isCurrent?: boolean;
}
export declare class AttachDoctorDocumentDto {
    documentType: string;
    medicalAttachmentId: string;
}
export declare class DoctorActionDto {
    reason?: string;
}
export declare class RenewLicenseDto {
    newExpiryDate: string;
    reason?: string;
}

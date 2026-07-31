export declare class DoctorProfileEntity {
    id: string;
    userId: string;
    fullName: string;
    gender?: string | null;
    dateOfBirth?: Date | null;
    profilePhotoUrl?: string | null;
    digitalSignatureUrl?: string | null;
    biography?: string | null;
    professionalSummary?: string | null;
    yearsOfExperience: number;
    primarySpecialization: string;
    secondarySpecializations: string[];
    medicalCouncil: string;
    registrationNumber: string;
    licenseNumber: string;
    providerIdentifier: string;
    registrationState?: string | null;
    registrationCountry?: string | null;
    registrationIssueDate?: Date | null;
    registrationExpiryDate?: Date | null;
    verificationStatus: string;
    verificationNotes?: string | null;
    verifiedBy?: string | null;
    verifiedAt?: Date | null;
    department?: string | null;
    subSpecializations: string[];
    clinicalInterests: string[];
    servicesOffered: string[];
    languagesSpoken: string[];
    emergencyPhone?: string | null;
    isDeleted: boolean;
    deletedAt?: Date | null;
    createdAt: Date;
    updatedAt: Date;
    qualifications?: DoctorQualificationEntity[];
    certifications?: DoctorCertificationEntity[];
    experiences?: DoctorExperienceEntity[];
    documents?: DoctorDocumentEntity[];
}
export declare class DoctorQualificationEntity {
    id: string;
    doctorProfileId: string;
    degreeName: string;
    instituteName: string;
    passingYear: number;
    specialization?: string | null;
    createdAt: Date;
}
export declare class DoctorCertificationEntity {
    id: string;
    doctorProfileId: string;
    title: string;
    issuingAuthority: string;
    issueDate?: Date | null;
    expiryDate?: Date | null;
    createdAt: Date;
}
export declare class DoctorExperienceEntity {
    id: string;
    doctorProfileId: string;
    designation: string;
    hospitalName: string;
    startDate: Date;
    endDate?: Date | null;
    isCurrent: boolean;
    createdAt: Date;
}
export declare class DoctorDocumentEntity {
    id: string;
    doctorProfileId: string;
    documentType: string;
    medicalAttachmentId?: string | null;
    verificationStatus: string;
    createdAt: Date;
}
export declare class DoctorScheduleSlotEntity {
    id: string;
    doctorProfileId: string;
    startTime: Date;
    endTime: Date;
    isBooked: boolean;
    createdAt: Date;
    updatedAt: Date;
}
export declare class DoctorHistoryEntity {
    id: string;
    doctorProfileId: string;
    action: string;
    previousStatus?: string | null;
    newStatus: string;
    reason?: string | null;
    performedBy?: string | null;
    createdAt: Date;
}
export declare class DoctorAuditLogEntity {
    id: string;
    doctorProfileId: string;
    action: string;
    performedBy?: string | null;
    details?: string | null;
    ipAddress?: string | null;
    createdAt: Date;
}

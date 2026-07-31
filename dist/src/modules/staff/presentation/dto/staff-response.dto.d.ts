export declare class StaffQualificationResponseDto {
    id: string;
    degreeName: string;
    instituteName: string;
    passingYear: number;
    fieldOfStudy?: string;
    createdAt: string;
}
export declare class StaffDocumentResponseDto {
    id: string;
    documentType: string;
    medicalAttachmentId?: string;
    verificationStatus: string;
    createdAt: string;
}
export declare class StaffFullResponseDto {
    id: string;
    userId?: string;
    employeeCode: string;
    fullName: string;
    gender?: string;
    dateOfBirth?: string;
    phone: string;
    email?: string;
    emergencyContact?: string;
    profilePhotoUrl?: string;
    staffType: string;
    designation: string;
    primaryFacilityId: string;
    secondaryFacilityId?: string;
    primaryDepartmentId?: string;
    secondaryDepartmentId?: string;
    reportingManagerId?: string;
    employmentType: string;
    employmentStatus: string;
    joiningDate: string;
    terminationDate?: string;
    noticePeriodDays: number;
    biography?: string;
    languagesSpoken: string[];
    verificationStatus: string;
    verificationNotes?: string;
    verifiedBy?: string;
    verifiedAt?: string;
    isDeleted: boolean;
    qualifications: StaffQualificationResponseDto[];
    documents: StaffDocumentResponseDto[];
    qrToken?: string;
    createdAt: string;
    updatedAt: string;
}
export declare class StaffHistoryItemDto {
    id: string;
    staffId: string;
    action: string;
    previousStatus?: string;
    newStatus: string;
    reason?: string;
    performedBy?: string;
    createdAt: string;
}
export declare class StaffStatsResponseDto {
    totalStaff: number;
    verifiedStaff: number;
    pendingStaff: number;
    suspendedStaff: number;
    activeStaff: number;
}

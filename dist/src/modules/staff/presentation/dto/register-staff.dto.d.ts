export declare class RegisterStaffDto {
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
    employmentType?: string;
    employmentStatus?: string;
    joiningDate?: string;
    noticePeriodDays?: number;
    biography?: string;
    languagesSpoken?: string[];
    employeeCode?: string;
}
export declare class AddStaffQualificationDto {
    degreeName: string;
    instituteName: string;
    passingYear: number;
    fieldOfStudy?: string;
}
export declare class AttachStaffDocumentDto {
    documentType: string;
    medicalAttachmentId: string;
}
export declare class AssignStaffFacilityDto {
    primaryFacilityId: string;
    secondaryFacilityId?: string;
}
export declare class AssignStaffDepartmentDto {
    primaryDepartmentId?: string;
    secondaryDepartmentId?: string;
}
export declare class StaffActionDto {
    reason?: string;
}

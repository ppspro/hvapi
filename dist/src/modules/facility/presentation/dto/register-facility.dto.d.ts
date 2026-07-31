export declare class RegisterFacilityDto {
    name: string;
    legalName?: string;
    registrationNumber: string;
    facilityType?: string;
    ownershipType?: string;
    buildingName?: string;
    streetAddress: string;
    city: string;
    district?: string;
    state: string;
    country?: string;
    pinCode?: string;
    latitude?: number;
    longitude?: number;
    timezone?: string;
    phone: string;
    emergencyPhone?: string;
    email?: string;
    website?: string;
    profilePhotoUrl?: string;
}
export declare class CreateDepartmentDto {
    name: string;
    code?: string;
    description?: string;
    departmentHead?: string;
    operatingHours?: string;
}
export declare class CreateRoomDto {
    roomNumber: string;
    departmentId?: string;
    roomName?: string;
    building?: string;
    block?: string;
    floor?: string;
    wing?: string;
    roomCategory?: string;
    capacity?: number;
}
export declare class AddFacilityLicenseDto {
    licenseType: string;
    licenseNumber: string;
    issuingAuthority: string;
    issueDate?: string;
    expiryDate?: string;
}
export declare class AddFacilityAccreditationDto {
    accreditationBody: string;
    certificateNumber: string;
    validFrom?: string;
    validTo?: string;
}
export declare class AttachFacilityDocumentDto {
    documentType: string;
    medicalAttachmentId: string;
}
export declare class AssignDoctorToFacilityDto {
    doctorId: string;
    departmentId?: string;
    assignmentType?: string;
    privileges?: string[];
}
export declare class FacilityActionDto {
    reason?: string;
}

export declare class BranchResponseDto {
    id: string;
    branchName: string;
    branchCode?: string;
    address: string;
    city: string;
    state: string;
    phone?: string;
}
export declare class FullDepartmentResponseDto {
    id: string;
    facilityId: string;
    name: string;
    code?: string;
    description?: string;
    departmentHead?: string;
    operatingHours?: string;
    createdAt: string;
}
export declare class RoomResponseDto {
    id: string;
    facilityId: string;
    departmentId?: string;
    roomNumber: string;
    roomName?: string;
    building?: string;
    block?: string;
    floor?: string;
    wing?: string;
    roomCategory: string;
    capacity: number;
    isOperational: boolean;
    createdAt: string;
}
export declare class LicenseResponseDto {
    id: string;
    licenseType: string;
    licenseNumber: string;
    issuingAuthority: string;
    issueDate?: string;
    expiryDate?: string;
    renewalDate?: string;
    verificationStatus: string;
}
export declare class AccreditationResponseDto {
    id: string;
    accreditationBody: string;
    certificateNumber: string;
    validFrom?: string;
    validTo?: string;
    status: string;
}
export declare class FacilityDocumentResponseDto {
    id: string;
    documentType: string;
    medicalAttachmentId?: string;
    verificationStatus: string;
    createdAt: string;
}
export declare class FacilityFullResponseDto {
    id: string;
    name: string;
    legalName?: string;
    facilityCode: string;
    registrationNumber: string;
    facilityType: string;
    ownershipType: string;
    buildingName?: string;
    streetAddress: string;
    city: string;
    district?: string;
    state: string;
    country: string;
    pinCode?: string;
    latitude?: number;
    longitude?: number;
    timezone: string;
    phone: string;
    emergencyPhone?: string;
    email?: string;
    website?: string;
    profilePhotoUrl?: string;
    verificationStatus: string;
    verificationNotes?: string;
    verifiedBy?: string;
    verifiedAt?: string;
    isDeleted: boolean;
    branches: BranchResponseDto[];
    departments: FullDepartmentResponseDto[];
    rooms: RoomResponseDto[];
    licenses: LicenseResponseDto[];
    accreditations: AccreditationResponseDto[];
    documents: FacilityDocumentResponseDto[];
    qrToken?: string;
    createdAt: string;
    updatedAt: string;
}
export declare class FacilityHistoryItemDto {
    id: string;
    facilityId: string;
    action: string;
    previousStatus?: string;
    newStatus: string;
    reason?: string;
    performedBy?: string;
    createdAt: string;
}
export declare class FacilityStatsResponseDto {
    totalFacilities: number;
    verifiedFacilities: number;
    pendingFacilities: number;
    suspendedFacilities: number;
    totalDepartments: number;
    totalRooms: number;
}

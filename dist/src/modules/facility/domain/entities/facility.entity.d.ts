export declare class FacilityEntity {
    id: string;
    name: string;
    legalName?: string | null;
    facilityCode: string;
    registrationNumber: string;
    facilityType: string;
    ownershipType: string;
    buildingName?: string | null;
    streetAddress: string;
    city: string;
    district?: string | null;
    state: string;
    country: string;
    pinCode?: string | null;
    latitude?: number | null;
    longitude?: number | null;
    timezone: string;
    phone: string;
    emergencyPhone?: string | null;
    email?: string | null;
    website?: string | null;
    profilePhotoUrl?: string | null;
    verificationStatus: string;
    verificationNotes?: string | null;
    verifiedBy?: string | null;
    verifiedAt?: Date | null;
    isDeleted: boolean;
    deletedAt?: Date | null;
    createdAt: Date;
    updatedAt: Date;
    branches?: FacilityBranchEntity[];
    departments?: FacilityDepartmentEntity[];
    rooms?: FacilityRoomEntity[];
    licenses?: FacilityLicenseEntity[];
    accreditations?: FacilityAccreditationEntity[];
    documents?: FacilityDocumentEntity[];
    doctors?: DoctorFacilityEntity[];
}
export declare class FacilityBranchEntity {
    id: string;
    facilityId: string;
    branchName: string;
    branchCode?: string | null;
    address: string;
    city: string;
    state: string;
    phone?: string | null;
    createdAt: Date;
}
export declare class FacilityDepartmentEntity {
    id: string;
    facilityId: string;
    name: string;
    code?: string | null;
    description?: string | null;
    departmentHead?: string | null;
    operatingHours?: string | null;
    createdAt: Date;
    updatedAt: Date;
}
export declare class FacilityRoomEntity {
    id: string;
    facilityId: string;
    departmentId?: string | null;
    roomNumber: string;
    roomName?: string | null;
    building?: string | null;
    block?: string | null;
    floor?: string | null;
    wing?: string | null;
    roomCategory: string;
    capacity: number;
    isOperational: boolean;
    createdAt: Date;
}
export declare class FacilityLicenseEntity {
    id: string;
    facilityId: string;
    licenseType: string;
    licenseNumber: string;
    issuingAuthority: string;
    issueDate?: Date | null;
    expiryDate?: Date | null;
    renewalDate?: Date | null;
    verificationStatus: string;
    createdAt: Date;
}
export declare class FacilityAccreditationEntity {
    id: string;
    facilityId: string;
    accreditationBody: string;
    certificateNumber: string;
    validFrom?: Date | null;
    validTo?: Date | null;
    status: string;
    createdAt: Date;
}
export declare class FacilityDocumentEntity {
    id: string;
    facilityId: string;
    documentType: string;
    medicalAttachmentId?: string | null;
    verificationStatus: string;
    createdAt: Date;
}
export declare class DoctorFacilityEntity {
    id: string;
    doctorId: string;
    facilityId: string;
    departmentId?: string | null;
    assignmentType: string;
    privileges: string[];
    startDate?: Date | null;
    endDate?: Date | null;
    isActive: boolean;
    createdAt: Date;
    doctor?: any;
}
export declare class FacilityHistoryEntity {
    id: string;
    facilityId: string;
    action: string;
    previousStatus?: string | null;
    newStatus: string;
    reason?: string | null;
    performedBy?: string | null;
    createdAt: Date;
}
export declare class FacilityAuditLogEntity {
    id: string;
    facilityId: string;
    action: string;
    performedBy?: string | null;
    details?: string | null;
    ipAddress?: string | null;
    createdAt: Date;
}

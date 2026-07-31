import { StaffMemberEntity, StaffQualificationEntity, StaffCertificationEntity, StaffExperienceEntity, StaffDocumentEntity, StaffHistoryEntity, StaffAuditLogEntity } from '../entities/staff.entity';
export interface IStaffRepository {
    createStaff(data: any): Promise<StaffMemberEntity>;
    findStaffById(id: string, includeDeleted?: boolean): Promise<StaffMemberEntity | null>;
    findStaffByEmployeeCode(employeeCode: string): Promise<StaffMemberEntity | null>;
    findStaffByUserId(userId: string): Promise<StaffMemberEntity | null>;
    findStaffMembers(includeDeleted?: boolean): Promise<StaffMemberEntity[]>;
    updateStaff(id: string, data: any): Promise<StaffMemberEntity>;
    softDeleteStaff(id: string): Promise<void>;
    searchStaff(query: string): Promise<StaffMemberEntity[]>;
    addQualification(staffId: string, data: any): Promise<StaffQualificationEntity>;
    addCertification(staffId: string, data: any): Promise<StaffCertificationEntity>;
    addExperience(staffId: string, data: any): Promise<StaffExperienceEntity>;
    attachDocument(staffId: string, data: any): Promise<StaffDocumentEntity>;
    findDocumentsByStaffId(staffId: string): Promise<StaffDocumentEntity[]>;
    assignFacility(staffId: string, primaryFacilityId: string, secondaryFacilityId?: string): Promise<StaffMemberEntity>;
    assignDepartment(staffId: string, primaryDepartmentId?: string, secondaryDepartmentId?: string): Promise<StaffMemberEntity>;
    createHistory(staffId: string, data: {
        action: string;
        previousStatus?: string;
        newStatus: string;
        reason?: string;
        performedBy?: string;
    }): Promise<StaffHistoryEntity>;
    findHistoryByStaffId(staffId: string): Promise<StaffHistoryEntity[]>;
    createAuditLog(data: {
        staffId: string;
        action: string;
        performedBy?: string;
        details?: string;
    }): Promise<StaffAuditLogEntity>;
    getStatistics(): Promise<{
        totalStaff: number;
        verifiedStaff: number;
        pendingStaff: number;
        suspendedStaff: number;
        activeStaff: number;
    }>;
}

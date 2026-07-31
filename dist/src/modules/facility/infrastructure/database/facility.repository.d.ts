import { DatabaseService } from "../../../../database/database.service";
import { IFacilityRepository } from '../../domain/repositories/facility.repository.interface';
import { FacilityEntity, FacilityDepartmentEntity, FacilityRoomEntity, FacilityLicenseEntity, FacilityAccreditationEntity, FacilityDocumentEntity, DoctorFacilityEntity, FacilityHistoryEntity, FacilityAuditLogEntity } from '../../domain/entities/facility.entity';
export declare class FacilityRepository implements IFacilityRepository {
    private readonly db;
    constructor(db: DatabaseService);
    createFacility(data: any): Promise<FacilityEntity>;
    findFacilityById(id: string, includeDeleted?: boolean): Promise<FacilityEntity | null>;
    findFacilityByCode(facilityCode: string): Promise<FacilityEntity | null>;
    findFacilityByRegistrationNumber(registrationNumber: string): Promise<FacilityEntity | null>;
    findAllFacilities(includeDeleted?: boolean): Promise<FacilityEntity[]>;
    updateFacility(id: string, data: any): Promise<FacilityEntity>;
    softDeleteFacility(id: string): Promise<void>;
    searchFacilities(query: string): Promise<FacilityEntity[]>;
    createDepartment(facilityId: string, data: any): Promise<FacilityDepartmentEntity>;
    findDepartmentsByFacilityId(facilityId: string): Promise<FacilityDepartmentEntity[]>;
    createRoom(facilityId: string, data: any): Promise<FacilityRoomEntity>;
    findRoomsByFacilityId(facilityId: string): Promise<FacilityRoomEntity[]>;
    addLicense(facilityId: string, data: any): Promise<FacilityLicenseEntity>;
    addAccreditation(facilityId: string, data: any): Promise<FacilityAccreditationEntity>;
    attachDocument(facilityId: string, data: any): Promise<FacilityDocumentEntity>;
    findDocumentsByFacilityId(facilityId: string): Promise<FacilityDocumentEntity[]>;
    assignDoctor(facilityId: string, data: any): Promise<DoctorFacilityEntity>;
    findDoctorsByFacilityId(facilityId: string): Promise<any[]>;
    createHistory(facilityId: string, data: {
        action: string;
        previousStatus?: string;
        newStatus: string;
        reason?: string;
        performedBy?: string;
    }): Promise<FacilityHistoryEntity>;
    findHistoryByFacilityId(facilityId: string): Promise<FacilityHistoryEntity[]>;
    createAuditLog(data: {
        facilityId: string;
        action: string;
        performedBy?: string;
        details?: string;
    }): Promise<FacilityAuditLogEntity>;
    getStatistics(): Promise<{
        totalFacilities: number;
        verifiedFacilities: number;
        pendingFacilities: number;
        suspendedFacilities: number;
        totalDepartments: number;
        totalRooms: number;
    }>;
}

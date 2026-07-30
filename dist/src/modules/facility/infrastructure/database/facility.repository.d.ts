import { DatabaseService } from "../../../../database/database.service";
import { IFacilityRepository } from '../../domain/repositories/facility.repository.interface';
import { FacilityEntity, FacilityDepartmentEntity } from '../../domain/entities/facility.entity';
import { DoctorProfileEntity } from '../../../../modules/doctor/domain/entities/doctor.entity';
export declare class FacilityRepository implements IFacilityRepository {
    private readonly db;
    constructor(db: DatabaseService);
    findAllFacilities(): Promise<FacilityEntity[]>;
    findFacilityById(facilityId: string): Promise<FacilityEntity | null>;
    findDepartmentsByFacilityId(facilityId: string): Promise<FacilityDepartmentEntity[]>;
    findDoctorsByFacilityId(facilityId: string): Promise<DoctorProfileEntity[]>;
}

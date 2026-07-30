import { FacilityEntity, FacilityDepartmentEntity } from '../entities/facility.entity';
import { DoctorProfileEntity } from '../../../../modules/doctor/domain/entities/doctor.entity';
export interface IFacilityRepository {
    findAllFacilities(): Promise<FacilityEntity[]>;
    findFacilityById(facilityId: string): Promise<FacilityEntity | null>;
    findDepartmentsByFacilityId(facilityId: string): Promise<FacilityDepartmentEntity[]>;
    findDoctorsByFacilityId(facilityId: string): Promise<DoctorProfileEntity[]>;
}

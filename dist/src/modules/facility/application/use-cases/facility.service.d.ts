import { IFacilityRepository } from '../../domain/repositories/facility.repository.interface';
import { FacilityResponseDto, DepartmentResponseDto } from '../../presentation/dto/facility.dto';
import { DoctorProfileResponseDto } from '../../../../modules/doctor/presentation/dto/doctor-profile.dto';
import { Logger } from 'nestjs-pino';
export declare class FacilityService {
    private readonly facilityRepository;
    private readonly logger;
    constructor(facilityRepository: IFacilityRepository, logger: Logger);
    listFacilities(): Promise<FacilityResponseDto[]>;
    getFacilityDetails(facilityId: string): Promise<FacilityResponseDto>;
    listDepartments(facilityId: string): Promise<DepartmentResponseDto[]>;
    listDoctors(facilityId: string): Promise<DoctorProfileResponseDto[]>;
}

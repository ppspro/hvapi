import { FacilityService } from '../../application/use-cases/facility.service';
import { FacilityResponseDto, DepartmentResponseDto } from '../dto/facility.dto';
import { DoctorProfileResponseDto } from '../../../../modules/doctor/presentation/dto/doctor-profile.dto';
export declare class FacilityController {
    private readonly facilityService;
    constructor(facilityService: FacilityService);
    listFacilities(): Promise<FacilityResponseDto[]>;
    getFacilityDetails(facilityId: string): Promise<FacilityResponseDto>;
    listDepartments(facilityId: string): Promise<DepartmentResponseDto[]>;
    listDoctors(facilityId: string): Promise<DoctorProfileResponseDto[]>;
}

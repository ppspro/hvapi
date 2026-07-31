import { FacilityService } from '../../application/use-cases/facility.service';
import { RegisterFacilityDto, CreateDepartmentDto, CreateRoomDto, AttachFacilityDocumentDto, AssignDoctorToFacilityDto, FacilityActionDto } from '../dto/register-facility.dto';
import { FacilityFullResponseDto, FullDepartmentResponseDto, RoomResponseDto, FacilityDocumentResponseDto, FacilityHistoryItemDto, FacilityStatsResponseDto } from '../dto/facility-response.dto';
import { DoctorProfileResponseDto } from '../../../../modules/doctor/presentation/dto/doctor-profile.dto';
export declare class FacilityController {
    private readonly facilityService;
    constructor(facilityService: FacilityService);
    registerFacility(req: any, dto: RegisterFacilityDto): Promise<FacilityFullResponseDto>;
    getFacilities(): Promise<FacilityFullResponseDto[]>;
    searchFacilities(query: string): Promise<FacilityFullResponseDto[]>;
    getStatistics(): Promise<FacilityStatsResponseDto>;
    getFacilityById(id: string): Promise<FacilityFullResponseDto>;
    updateFacility(id: string, dto: Partial<RegisterFacilityDto>): Promise<FacilityFullResponseDto>;
    softDeleteFacility(id: string): Promise<any>;
    verifyFacility(req: any, id: string, dto: FacilityActionDto): Promise<FacilityFullResponseDto>;
    suspendFacility(req: any, id: string, dto: FacilityActionDto): Promise<FacilityFullResponseDto>;
    restoreFacility(req: any, id: string, dto: FacilityActionDto): Promise<FacilityFullResponseDto>;
    generateQr(req: any, id: string): Promise<any>;
    getDepartments(id: string): Promise<FullDepartmentResponseDto[]>;
    createDepartment(id: string, dto: CreateDepartmentDto): Promise<FullDepartmentResponseDto>;
    getRooms(id: string): Promise<RoomResponseDto[]>;
    createRoom(id: string, dto: CreateRoomDto): Promise<RoomResponseDto>;
    assignDoctor(id: string, dto: AssignDoctorToFacilityDto): Promise<any>;
    listDoctors(id: string): Promise<DoctorProfileResponseDto[]>;
    getDocuments(id: string): Promise<FacilityDocumentResponseDto[]>;
    attachDocument(id: string, dto: AttachFacilityDocumentDto): Promise<FacilityDocumentResponseDto>;
    getHistory(id: string): Promise<FacilityHistoryItemDto[]>;
}

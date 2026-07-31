import { IFacilityRepository } from '../../domain/repositories/facility.repository.interface';
import { RegisterFacilityDto, CreateDepartmentDto, CreateRoomDto, AttachFacilityDocumentDto, AssignDoctorToFacilityDto, FacilityActionDto } from '../../presentation/dto/register-facility.dto';
import { FacilityFullResponseDto, FullDepartmentResponseDto, RoomResponseDto, FacilityDocumentResponseDto, FacilityHistoryItemDto, FacilityStatsResponseDto } from '../../presentation/dto/facility-response.dto';
import { FacilityResponseDto, DepartmentResponseDto } from '../../presentation/dto/facility.dto';
import { DoctorProfileResponseDto } from '../../../doctor/presentation/dto/doctor-profile.dto';
import { QrService } from "../../../qr/application/use-cases/qr.service";
import { Logger } from 'nestjs-pino';
export declare class FacilityService {
    private readonly repository;
    private readonly qrService;
    private readonly logger;
    constructor(repository: IFacilityRepository, qrService: QrService, logger: Logger);
    private mapFacility;
    registerFacility(userId: string, dto: RegisterFacilityDto): Promise<FacilityFullResponseDto>;
    getFacilities(): Promise<FacilityFullResponseDto[]>;
    getFacilityById(id: string): Promise<FacilityFullResponseDto>;
    updateFacility(id: string, dto: Partial<RegisterFacilityDto>): Promise<FacilityFullResponseDto>;
    softDeleteFacility(id: string): Promise<{
        message: string;
    }>;
    verifyFacility(id: string, dto: FacilityActionDto, adminUserId?: string): Promise<FacilityFullResponseDto>;
    suspendFacility(id: string, dto: FacilityActionDto, adminUserId?: string): Promise<FacilityFullResponseDto>;
    restoreFacility(id: string, dto: FacilityActionDto, adminUserId?: string): Promise<FacilityFullResponseDto>;
    createDepartment(id: string, dto: CreateDepartmentDto): Promise<FullDepartmentResponseDto>;
    getDepartments(id: string): Promise<FullDepartmentResponseDto[]>;
    createRoom(id: string, dto: CreateRoomDto): Promise<RoomResponseDto>;
    getRooms(id: string): Promise<RoomResponseDto[]>;
    attachDocument(id: string, dto: AttachFacilityDocumentDto): Promise<FacilityDocumentResponseDto>;
    getDocuments(id: string): Promise<FacilityDocumentResponseDto[]>;
    assignDoctor(id: string, dto: AssignDoctorToFacilityDto): Promise<any>;
    generateQr(userId: string, id: string): Promise<{
        facilityId: string;
        qrToken: string;
    }>;
    getHistory(id: string): Promise<FacilityHistoryItemDto[]>;
    searchFacilities(query: string): Promise<FacilityFullResponseDto[]>;
    getStatistics(): Promise<FacilityStatsResponseDto>;
    listFacilities(): Promise<FacilityResponseDto[]>;
    getFacilityDetails(facilityId: string): Promise<FacilityResponseDto>;
    listDepartments(facilityId: string): Promise<DepartmentResponseDto[]>;
    listDoctors(facilityId: string): Promise<DoctorProfileResponseDto[]>;
}

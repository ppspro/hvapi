import { IStaffRepository } from '../../domain/repositories/staff.repository.interface';
import { RegisterStaffDto, AddStaffQualificationDto, AttachStaffDocumentDto, AssignStaffFacilityDto, AssignStaffDepartmentDto, StaffActionDto } from '../../presentation/dto/register-staff.dto';
import { StaffFullResponseDto, StaffDocumentResponseDto, StaffHistoryItemDto, StaffStatsResponseDto } from '../../presentation/dto/staff-response.dto';
import { QrService } from "../../../qr/application/use-cases/qr.service";
import { Logger } from 'nestjs-pino';
export declare class StaffService {
    private readonly repository;
    private readonly qrService;
    private readonly logger;
    constructor(repository: IStaffRepository, qrService: QrService, logger: Logger);
    private mapStaff;
    registerStaff(userId: string, dto: RegisterStaffDto): Promise<StaffFullResponseDto>;
    getStaffMembers(): Promise<StaffFullResponseDto[]>;
    getStaffById(id: string): Promise<StaffFullResponseDto>;
    updateStaff(id: string, dto: Partial<RegisterStaffDto>): Promise<StaffFullResponseDto>;
    softDeleteStaff(id: string): Promise<{
        message: string;
    }>;
    verifyStaff(id: string, dto: StaffActionDto, adminUserId?: string): Promise<StaffFullResponseDto>;
    suspendStaff(id: string, dto: StaffActionDto, adminUserId?: string): Promise<StaffFullResponseDto>;
    restoreStaff(id: string, dto: StaffActionDto, adminUserId?: string): Promise<StaffFullResponseDto>;
    addQualification(id: string, dto: AddStaffQualificationDto): Promise<StaffFullResponseDto>;
    attachDocument(id: string, dto: AttachStaffDocumentDto): Promise<StaffDocumentResponseDto>;
    getDocuments(id: string): Promise<StaffDocumentResponseDto[]>;
    assignFacility(id: string, dto: AssignStaffFacilityDto): Promise<StaffFullResponseDto>;
    assignDepartment(id: string, dto: AssignStaffDepartmentDto): Promise<StaffFullResponseDto>;
    generateQr(userId: string, id: string): Promise<{
        staffId: string;
        qrToken: string;
    }>;
    getHistory(id: string): Promise<StaffHistoryItemDto[]>;
    searchStaff(query: string): Promise<StaffFullResponseDto[]>;
    getStatistics(): Promise<StaffStatsResponseDto>;
}

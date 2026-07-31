import { StaffService } from '../../application/use-cases/staff.service';
import { RegisterStaffDto, AttachStaffDocumentDto, AssignStaffFacilityDto, AssignStaffDepartmentDto, StaffActionDto } from '../dto/register-staff.dto';
import { StaffFullResponseDto, StaffDocumentResponseDto, StaffHistoryItemDto, StaffStatsResponseDto } from '../dto/staff-response.dto';
export declare class StaffController {
    private readonly staffService;
    constructor(staffService: StaffService);
    registerStaff(req: any, dto: RegisterStaffDto): Promise<StaffFullResponseDto>;
    getStaffMembers(): Promise<StaffFullResponseDto[]>;
    searchStaff(query: string): Promise<StaffFullResponseDto[]>;
    getStatistics(): Promise<StaffStatsResponseDto>;
    getStaffById(id: string): Promise<StaffFullResponseDto>;
    updateStaff(id: string, dto: Partial<RegisterStaffDto>): Promise<StaffFullResponseDto>;
    softDeleteStaff(id: string): Promise<any>;
    verifyStaff(req: any, id: string, dto: StaffActionDto): Promise<StaffFullResponseDto>;
    suspendStaff(req: any, id: string, dto: StaffActionDto): Promise<StaffFullResponseDto>;
    restoreStaff(req: any, id: string, dto: StaffActionDto): Promise<StaffFullResponseDto>;
    generateQr(req: any, id: string): Promise<any>;
    assignFacility(id: string, dto: AssignStaffFacilityDto): Promise<StaffFullResponseDto>;
    assignDepartment(id: string, dto: AssignStaffDepartmentDto): Promise<StaffFullResponseDto>;
    getDocuments(id: string): Promise<StaffDocumentResponseDto[]>;
    attachDocument(id: string, dto: AttachStaffDocumentDto): Promise<StaffDocumentResponseDto>;
    getHistory(id: string): Promise<StaffHistoryItemDto[]>;
}

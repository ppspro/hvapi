import { DoctorService } from '../../application/use-cases/doctor.service';
import { RegisterDoctorDto, AttachDoctorDocumentDto, DoctorActionDto, RenewLicenseDto } from '../dto/register-doctor.dto';
import { DoctorProfileFullResponseDto, DoctorDocumentResponseDto, DoctorHistoryItemDto, DoctorStatsResponseDto } from '../dto/doctor-response.dto';
import { ScheduleSlotResponseDto } from '../dto/doctor-profile.dto';
export declare class DoctorController {
    private readonly doctorService;
    constructor(doctorService: DoctorService);
    registerDoctor(req: any, dto: RegisterDoctorDto): Promise<DoctorProfileFullResponseDto>;
    getDoctors(): Promise<DoctorProfileFullResponseDto[]>;
    searchDoctors(query: string): Promise<DoctorProfileFullResponseDto[]>;
    getStatistics(): Promise<DoctorStatsResponseDto>;
    getPendingDoctors(): Promise<DoctorProfileFullResponseDto[]>;
    getDoctorById(id: string): Promise<DoctorProfileFullResponseDto>;
    updateDoctor(id: string, dto: Partial<RegisterDoctorDto>): Promise<DoctorProfileFullResponseDto>;
    softDeleteDoctor(id: string): Promise<any>;
    verifyDoctor(req: any, id: string, dto: DoctorActionDto): Promise<DoctorProfileFullResponseDto>;
    rejectDoctor(req: any, id: string, dto: DoctorActionDto): Promise<DoctorProfileFullResponseDto>;
    suspendDoctor(req: any, id: string, dto: DoctorActionDto): Promise<DoctorProfileFullResponseDto>;
    restoreDoctor(req: any, id: string, dto: DoctorActionDto): Promise<DoctorProfileFullResponseDto>;
    renewLicense(req: any, id: string, dto: RenewLicenseDto): Promise<DoctorProfileFullResponseDto>;
    generateQr(req: any, id: string): Promise<any>;
    getDocuments(id: string): Promise<DoctorDocumentResponseDto[]>;
    attachDocument(id: string, dto: AttachDoctorDocumentDto): Promise<DoctorDocumentResponseDto>;
    getHistory(id: string): Promise<DoctorHistoryItemDto[]>;
    getDoctorSlots(doctorId: string): Promise<ScheduleSlotResponseDto[]>;
}

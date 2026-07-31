import { IDoctorRepository } from '../../domain/repositories/doctor.repository.interface';
import { RegisterDoctorDto, AddQualificationDto, AddCertificationDto, AddExperienceDto, AttachDoctorDocumentDto, DoctorActionDto, RenewLicenseDto } from '../../presentation/dto/register-doctor.dto';
import { DoctorProfileFullResponseDto, DoctorDocumentResponseDto, DoctorHistoryItemDto, DoctorStatsResponseDto } from '../../presentation/dto/doctor-response.dto';
import { DoctorProfileResponseDto, ScheduleSlotResponseDto } from '../../presentation/dto/doctor-profile.dto';
import { QrService } from "../../../qr/application/use-cases/qr.service";
import { Logger } from 'nestjs-pino';
export declare class DoctorService {
    private readonly repository;
    private readonly qrService;
    private readonly logger;
    constructor(repository: IDoctorRepository, qrService: QrService, logger: Logger);
    private mapDoctor;
    registerDoctor(userId: string, dto: RegisterDoctorDto): Promise<DoctorProfileFullResponseDto>;
    getDoctors(): Promise<DoctorProfileFullResponseDto[]>;
    getPendingDoctors(): Promise<DoctorProfileFullResponseDto[]>;
    getDoctorById(id: string): Promise<DoctorProfileFullResponseDto>;
    updateDoctor(id: string, dto: Partial<RegisterDoctorDto>): Promise<DoctorProfileFullResponseDto>;
    softDeleteDoctor(id: string): Promise<{
        message: string;
    }>;
    verifyDoctor(id: string, dto: DoctorActionDto, verifierUserId?: string): Promise<DoctorProfileFullResponseDto>;
    rejectDoctor(id: string, dto: DoctorActionDto, verifierUserId?: string): Promise<DoctorProfileFullResponseDto>;
    suspendDoctor(id: string, dto: DoctorActionDto, adminUserId?: string): Promise<DoctorProfileFullResponseDto>;
    restoreDoctor(id: string, dto: DoctorActionDto, adminUserId?: string): Promise<DoctorProfileFullResponseDto>;
    renewLicense(id: string, dto: RenewLicenseDto, adminUserId?: string): Promise<DoctorProfileFullResponseDto>;
    addQualification(id: string, dto: AddQualificationDto): Promise<DoctorProfileFullResponseDto>;
    addCertification(id: string, dto: AddCertificationDto): Promise<DoctorProfileFullResponseDto>;
    addExperience(id: string, dto: AddExperienceDto): Promise<DoctorProfileFullResponseDto>;
    attachDocument(id: string, dto: AttachDoctorDocumentDto): Promise<DoctorDocumentResponseDto>;
    getDocuments(id: string): Promise<DoctorDocumentResponseDto[]>;
    generateQr(userId: string, id: string): Promise<{
        doctorId: string;
        qrToken: string;
    }>;
    getHistory(id: string): Promise<DoctorHistoryItemDto[]>;
    searchDoctors(query: string): Promise<DoctorProfileFullResponseDto[]>;
    getStatistics(): Promise<DoctorStatsResponseDto>;
    getDoctorProfile(doctorId: string): Promise<DoctorProfileResponseDto>;
    getDoctorSlots(doctorId: string): Promise<ScheduleSlotResponseDto[]>;
}

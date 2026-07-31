import { ImmunisationService } from '../../application/use-cases/immunisation.service';
import { CreateVaccineDto, CreateVaccinationScheduleDto, CreateVaccinationRecordDto, AdministerDoseDto, DeferDoseDto, CreateCertificateDto, ReminderConfigDto, RecordActionDto } from '../dto/create-vaccine.dto';
import { VaccineResponseDto, VaccinationScheduleResponseDto, VaccinationRecordResponseDto, VaccinationCertificateResponseDto, ReminderConfigResponseDto, ImmunisationStatsResponseDto } from '../dto/immunisation-response.dto';
export declare class ImmunisationController {
    private readonly service;
    constructor(service: ImmunisationService);
    createVaccine(dto: CreateVaccineDto): Promise<VaccineResponseDto>;
    getVaccines(): Promise<VaccineResponseDto[]>;
    createSchedule(dto: CreateVaccinationScheduleDto): Promise<VaccinationScheduleResponseDto>;
    getSchedules(vaccineId?: string): Promise<VaccinationScheduleResponseDto[]>;
    createRecord(req: any, dto: CreateVaccinationRecordDto): Promise<VaccinationRecordResponseDto>;
    getRecords(req: any): Promise<VaccinationRecordResponseDto[]>;
    searchRecords(query: string): Promise<VaccinationRecordResponseDto[]>;
    getStatistics(): Promise<ImmunisationStatsResponseDto>;
    getRecordById(req: any, id: string): Promise<VaccinationRecordResponseDto>;
    updateRecord(req: any, id: string, dto: Partial<CreateVaccinationRecordDto>): Promise<VaccinationRecordResponseDto>;
    administerDose(req: any, id: string, dto: AdministerDoseDto): Promise<VaccinationRecordResponseDto>;
    completeRecord(req: any, id: string, dto: RecordActionDto): Promise<VaccinationRecordResponseDto>;
    deferRecord(req: any, id: string, dto: DeferDoseDto): Promise<VaccinationRecordResponseDto>;
    archiveRecord(req: any, id: string, dto: RecordActionDto): Promise<VaccinationRecordResponseDto>;
    restoreRecord(req: any, id: string, dto: RecordActionDto): Promise<VaccinationRecordResponseDto>;
    generateCertificate(req: any, dto: CreateCertificateDto): Promise<VaccinationCertificateResponseDto>;
    getCertificates(req: any): Promise<VaccinationCertificateResponseDto[]>;
    configureReminder(req: any, dto: ReminderConfigDto): Promise<ReminderConfigResponseDto>;
}

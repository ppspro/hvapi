import { VaccineEntity, VaccinationScheduleEntity, VaccinationRecordEntity, VaccinationCertificateEntity, VaccinationReminderConfigEntity, VaccinationHistoryEntity, VaccinationAuditLogEntity } from '../entities/immunisation.entity';
export interface IImmunisationRepository {
    findProfileByUserId(userId: string): Promise<{
        id: string;
    } | null>;
    createVaccine(data: any): Promise<VaccineEntity>;
    findVaccines(): Promise<VaccineEntity[]>;
    findVaccineById(id: string): Promise<VaccineEntity | null>;
    createSchedule(data: any): Promise<VaccinationScheduleEntity>;
    findSchedules(vaccineId?: string): Promise<VaccinationScheduleEntity[]>;
    createRecord(data: any): Promise<VaccinationRecordEntity>;
    findRecordById(id: string, includeDeleted?: boolean): Promise<VaccinationRecordEntity | null>;
    findRecordsByProfile(patientProfileId: string, includeDeleted?: boolean): Promise<VaccinationRecordEntity[]>;
    updateRecord(id: string, data: any): Promise<VaccinationRecordEntity>;
    softDeleteRecord(id: string): Promise<void>;
    searchRecords(query: string): Promise<VaccinationRecordEntity[]>;
    createCertificate(data: any): Promise<VaccinationCertificateEntity>;
    findCertificatesByProfile(patientProfileId: string): Promise<VaccinationCertificateEntity[]>;
    upsertReminderConfig(patientProfileId: string, data: any): Promise<VaccinationReminderConfigEntity>;
    createHistory(recordId: string, data: {
        action: string;
        previousStatus?: string;
        newStatus: string;
        reason?: string;
        performedBy?: string;
    }): Promise<VaccinationHistoryEntity>;
    createAuditLog(data: {
        recordId: string;
        action: string;
        performedBy?: string;
        details?: string;
    }): Promise<VaccinationAuditLogEntity>;
    getStatistics(): Promise<{
        totalVaccines: number;
        totalRecords: number;
        administeredDoses: number;
        totalCertificates: number;
    }>;
}

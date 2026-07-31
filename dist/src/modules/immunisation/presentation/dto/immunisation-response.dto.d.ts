export declare class VaccineResponseDto {
    id: string;
    name: string;
    code: string;
    manufacturer?: string;
    targetGroup: string;
    minAgeMonths: number;
    maxAgeMonths?: number;
    totalDosesRequired: number;
    minIntervalDays: number;
    description?: string;
    contraindications: string[];
    isActive: boolean;
    createdAt: string;
}
export declare class VaccinationScheduleResponseDto {
    id: string;
    vaccineId: string;
    name: string;
    doseNumber: number;
    recommendedAgeMonths: number;
    isBooster: boolean;
    boosterIntervalDays?: number;
    createdAt: string;
}
export declare class VaccinationRecordResponseDto {
    id: string;
    patientProfileId: string;
    vaccineId: string;
    scheduleId?: string;
    doseNumber: number;
    status: string;
    dueDate?: string;
    administeredDate?: string;
    administeredBy?: string;
    facilityName?: string;
    batchNumber?: string;
    lotNumber?: string;
    expirationDate?: string;
    siteOfInjection?: string;
    routeOfAdmin?: string;
    notes?: string;
    isDeleted: boolean;
    vaccine?: VaccineResponseDto;
    schedule?: VaccinationScheduleResponseDto;
    createdAt: string;
    updatedAt: string;
}
export declare class VaccinationCertificateResponseDto {
    id: string;
    patientProfileId: string;
    recordId: string;
    certificateNumber: string;
    issueDate: string;
    verificationStatus: string;
    qrToken?: string;
    reportAttachmentId?: string;
    version: number;
    createdAt: string;
}
export declare class ReminderConfigResponseDto {
    id: string;
    patientProfileId: string;
    vaccineId: string;
    reminderDaysBefore: number;
    enableEmail: boolean;
    enableSms: boolean;
    enablePush: boolean;
    createdAt: string;
}
export declare class ImmunisationStatsResponseDto {
    totalVaccines: number;
    totalRecords: number;
    administeredDoses: number;
    totalCertificates: number;
}

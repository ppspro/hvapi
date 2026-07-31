export declare enum VaccineTargetGroup {
    ALL = "ALL",
    INFANT = "INFANT",
    CHILD = "CHILD",
    ADOLESCENT = "ADOLESCENT",
    ADULT = "ADULT",
    ELDERLY = "ELDERLY",
    PREGNANT = "PREGNANT",
    HIGH_RISK = "HIGH_RISK"
}
export declare enum VaccinationStatus {
    SCHEDULED = "SCHEDULED",
    DUE = "DUE",
    ADMINISTERED = "ADMINISTERED",
    COMPLETED = "COMPLETED",
    MISSED = "MISSED",
    DEFERRED = "DEFERRED",
    CANCELLED = "CANCELLED",
    ARCHIVED = "ARCHIVED"
}
export declare class CreateVaccineDto {
    name: string;
    code: string;
    manufacturer?: string;
    targetGroup?: VaccineTargetGroup;
    minAgeMonths?: number;
    maxAgeMonths?: number;
    totalDosesRequired?: number;
    minIntervalDays?: number;
    description?: string;
    contraindications?: string[];
}
export declare class CreateVaccinationScheduleDto {
    vaccineId: string;
    name: string;
    doseNumber: number;
    recommendedAgeMonths: number;
    isBooster?: boolean;
    boosterIntervalDays?: number;
}
export declare class CreateVaccinationRecordDto {
    vaccineId: string;
    scheduleId?: string;
    doseNumber?: number;
    dueDate?: string;
    notes?: string;
}
export declare class AdministerDoseDto {
    administeredBy: string;
    facilityName: string;
    batchNumber: string;
    lotNumber?: string;
    expirationDate?: string;
    siteOfInjection?: string;
    routeOfAdmin?: string;
    notes?: string;
}
export declare class DeferDoseDto {
    reason: string;
    rescheduledDueDate?: string;
}
export declare class CreateCertificateDto {
    recordId: string;
    reportAttachmentId?: string;
}
export declare class ReminderConfigDto {
    vaccineId: string;
    reminderDaysBefore: number;
    enableEmail?: boolean;
    enableSms?: boolean;
    enablePush?: boolean;
}
export declare class RecordActionDto {
    reason?: string;
}

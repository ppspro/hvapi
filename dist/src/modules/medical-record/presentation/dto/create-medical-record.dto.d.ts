export declare enum MedicalRecordStatus {
    DRAFT = "DRAFT",
    FINAL = "FINAL",
    ARCHIVED = "ARCHIVED"
}
export declare enum AttachmentCategory {
    IMAGE = "IMAGE",
    PDF = "PDF",
    DICOM = "DICOM",
    SCANNED_DOC = "SCANNED_DOC",
    PRESCRIPTION = "PRESCRIPTION",
    REFERRAL_LETTER = "REFERRAL_LETTER",
    LAB_RESULT = "LAB_RESULT",
    RADIOLOGY = "RADIOLOGY",
    CLINICAL_NOTE = "CLINICAL_NOTE",
    OTHER = "OTHER"
}
export declare class EncounterDto {
    providerName?: string;
    facilityName?: string;
    encounterType?: string;
    encounterDate?: string;
}
export declare class ClinicalDiagnosisDto {
    code?: string;
    description: string;
    type?: string;
    status?: string;
}
export declare class VitalSignsDto {
    heightCm?: number;
    weightKg?: number;
    systolicBp?: number;
    diastolicBp?: number;
    pulseBpm?: number;
    respirationRate?: number;
    temperatureC?: number;
    bloodSugarMgDl?: number;
    oxygenSaturation?: number;
}
export declare class ProcedureDto {
    name: string;
    code?: string;
    performedAt?: string;
    notes?: string;
}
export declare class CreateMedicalRecordDto {
    title: string;
    chiefComplaint?: string;
    clinicalNotes?: string;
    treatmentPlan?: string;
    followUpInstructions?: string;
    status?: MedicalRecordStatus;
    encounter?: EncounterDto;
    diagnoses?: ClinicalDiagnosisDto[];
    vitalSigns?: VitalSignsDto;
    procedures?: ProcedureDto[];
}
export declare class UpdateMedicalRecordDto {
    title?: string;
    chiefComplaint?: string;
    clinicalNotes?: string;
    treatmentPlan?: string;
    followUpInstructions?: string;
    status?: MedicalRecordStatus;
}

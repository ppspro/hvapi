export declare enum QrEntityType {
    HEALTH_CARD = "HEALTH_CARD",
    MEDICAL_RECORD = "MEDICAL_RECORD",
    MEDICAL_REPORT = "MEDICAL_REPORT",
    INSURANCE = "INSURANCE",
    IMMUNISATION = "IMMUNISATION",
    DOCTOR_ID = "DOCTOR_ID",
    FACILITY_ID = "FACILITY_ID",
    STAFF_ID = "STAFF_ID",
    EMERGENCY_CARD = "EMERGENCY_CARD",
    CUSTOM = "CUSTOM"
}
export declare class GenerateQrDto {
    entityId: string;
    entityType: QrEntityType;
    validityDays?: number;
}
export declare class VerifyQrPayloadDto {
    token: string;
    deviceInfo?: string;
    location?: string;
}
export declare class RotateQrDto {
    reason?: string;
}
export declare class RevokeQrDto {
    reason?: string;
}
export declare class BulkGenerateQrDto {
    items: GenerateQrDto[];
}
export declare class BulkQrActionDto {
    qrIds: string[];
    reason?: string;
}
export declare class UpdateQrDto {
    validityDays?: number;
}

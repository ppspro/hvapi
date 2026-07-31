export declare class VerifyQrDto {
    qrPayload: string;
}
export declare class PatientDetailsDto {
    patientNumber: string;
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    bloodGroup: string;
}
export declare class VerifyQrResponseDto {
    isValid: boolean;
    status?: string;
    patientName?: string;
    cardNumber?: string;
    message?: string;
    patientDetails?: PatientDetailsDto;
}

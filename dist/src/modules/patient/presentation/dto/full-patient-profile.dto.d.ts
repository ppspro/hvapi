export declare class FullPatientProfileResponseDto {
    id: string;
    patientNumber?: string;
    firstName?: string;
    lastName?: string;
    dateOfBirth?: string;
    gender?: string;
    bloodGroup?: string;
    nationality?: string;
    occupation?: string;
    maritalStatus?: string;
    languages: string[];
    currentAddress?: {
        line1?: string;
        line2?: string;
        city?: string;
        state?: string;
        district?: string;
        postalCode?: string;
        country?: string;
    };
    permanentAddress?: {
        line1?: string;
        line2?: string;
        city?: string;
        state?: string;
        postalCode?: string;
        country?: string;
    };
    photoUrl?: string;
    knownAllergies: string[];
    chronicConditions: string[];
    disabilities: string[];
    prefContactMethod?: string;
    emailNotifications: boolean;
    smsNotifications: boolean;
    pushNotifications: boolean;
    profileVisibility: string;
    onboardingStep: number;
    status: string;
    createdAt: string;
    updatedAt: string;
}

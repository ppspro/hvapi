export declare class DoctorProfileEntity {
    id: string;
    userId: string;
    fullName: string;
    specialization: string;
    credentials: string;
    createdAt: Date;
    updatedAt: Date;
}
export declare class DoctorScheduleSlotEntity {
    id: string;
    doctorProfileId: string;
    startTime: Date;
    endTime: Date;
    isBooked: boolean;
    createdAt: Date;
    updatedAt: Date;
}

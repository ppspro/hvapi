import { DoctorProfileEntity, DoctorScheduleSlotEntity } from '../entities/doctor.entity';
export interface IDoctorRepository {
    findDoctorById(doctorId: string): Promise<DoctorProfileEntity | null>;
    findSlotsByDoctorId(doctorId: string): Promise<DoctorScheduleSlotEntity[]>;
}

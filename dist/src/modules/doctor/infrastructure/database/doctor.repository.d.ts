import { DatabaseService } from "../../../../database/database.service";
import { IDoctorRepository } from '../../domain/repositories/doctor.repository.interface';
import { DoctorProfileEntity, DoctorScheduleSlotEntity } from '../../domain/entities/doctor.entity';
export declare class DoctorRepository implements IDoctorRepository {
    private readonly db;
    constructor(db: DatabaseService);
    findDoctorById(doctorId: string): Promise<DoctorProfileEntity | null>;
    findSlotsByDoctorId(doctorId: string): Promise<DoctorScheduleSlotEntity[]>;
}

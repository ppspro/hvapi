import { IDoctorRepository } from '../../domain/repositories/doctor.repository.interface';
import { DoctorProfileResponseDto, ScheduleSlotResponseDto } from '../../presentation/dto/doctor-profile.dto';
import { Logger } from 'nestjs-pino';
export declare class DoctorService {
    private readonly doctorRepository;
    private readonly logger;
    constructor(doctorRepository: IDoctorRepository, logger: Logger);
    getDoctorProfile(doctorId: string): Promise<DoctorProfileResponseDto>;
    getDoctorSlots(doctorId: string): Promise<ScheduleSlotResponseDto[]>;
}

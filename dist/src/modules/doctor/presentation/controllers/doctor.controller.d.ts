import { DoctorService } from '../../application/use-cases/doctor.service';
import { DoctorProfileResponseDto, ScheduleSlotResponseDto } from '../dto/doctor-profile.dto';
export declare class DoctorController {
    private readonly doctorService;
    constructor(doctorService: DoctorService);
    getDoctorProfile(doctorId: string): Promise<DoctorProfileResponseDto>;
    getDoctorSlots(doctorId: string): Promise<ScheduleSlotResponseDto[]>;
}

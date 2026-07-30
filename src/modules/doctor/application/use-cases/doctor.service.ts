import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { IDoctorRepository } from '../../domain/repositories/doctor.repository.interface';
import { DoctorProfileResponseDto, ScheduleSlotResponseDto } from '../../presentation/dto/doctor-profile.dto';
import { Logger } from 'nestjs-pino';

@Injectable()
export class DoctorService {
  constructor(
    @Inject('IDoctorRepository')
    private readonly doctorRepository: IDoctorRepository,
    private readonly logger: Logger,
  ) {}

  async getDoctorProfile(doctorId: string): Promise<DoctorProfileResponseDto> {
    const doctor = await this.doctorRepository.findDoctorById(doctorId);
    if (!doctor) {
      throw new NotFoundException('Doctor profile not found');
    }

    this.logger.log({ msg: 'Doctor profile viewed', doctorId });

    return {
      id: doctor.id,
      fullName: doctor.fullName,
      specialization: doctor.specialization,
      credentials: doctor.credentials,
    };
  }

  async getDoctorSlots(doctorId: string): Promise<ScheduleSlotResponseDto[]> {
    const doctor = await this.doctorRepository.findDoctorById(doctorId);
    if (!doctor) {
      throw new NotFoundException('Doctor profile not found');
    }

    this.logger.log({ msg: 'Availability lookup requested for doctor', doctorId });

    const slots = await this.doctorRepository.findSlotsByDoctorId(doctorId);
    return slots.map(s => ({
      id: s.id,
      startTime: s.startTime,
      endTime: s.endTime,
      isBooked: s.isBooked,
    }));
  }
}

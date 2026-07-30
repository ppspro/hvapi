import { Injectable } from '@nestjs/common';
import { DatabaseService } from '@database/database.service';
import { IDoctorRepository } from '../../domain/repositories/doctor.repository.interface';
import { DoctorProfileEntity, DoctorScheduleSlotEntity } from '../../domain/entities/doctor.entity';

@Injectable()
export class DoctorRepository implements IDoctorRepository {
  constructor(private readonly db: DatabaseService) {}

  async findDoctorById(doctorId: string): Promise<DoctorProfileEntity | null> {
    return (await this.db.doctorProfile.findUnique({
      where: { id: doctorId },
    })) as DoctorProfileEntity | null;
  }

  async findSlotsByDoctorId(doctorId: string): Promise<DoctorScheduleSlotEntity[]> {
    return (await this.db.doctorScheduleSlot.findMany({
      where: { doctorProfileId: doctorId },
      orderBy: { startTime: 'asc' },
    })) as DoctorScheduleSlotEntity[];
  }
}

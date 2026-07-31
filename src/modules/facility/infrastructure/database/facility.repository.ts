import { Injectable } from '@nestjs/common';
import { DatabaseService } from '@database/database.service';
import { IFacilityRepository } from '../../domain/repositories/facility.repository.interface';
import { FacilityEntity, FacilityDepartmentEntity } from '../../domain/entities/facility.entity';
import { DoctorProfileEntity } from '../../../../modules/doctor/domain/entities/doctor.entity';

@Injectable()
export class FacilityRepository implements IFacilityRepository {
  constructor(private readonly db: DatabaseService) {}

  async findAllFacilities(): Promise<FacilityEntity[]> {
    return (await this.db.facility.findMany({
      orderBy: { name: 'asc' },
    })) as FacilityEntity[];
  }

  async findFacilityById(facilityId: string): Promise<FacilityEntity | null> {
    return (await this.db.facility.findUnique({
      where: { id: facilityId },
    })) as FacilityEntity | null;
  }

  async findDepartmentsByFacilityId(facilityId: string): Promise<FacilityDepartmentEntity[]> {
    return (await this.db.facilityDepartment.findMany({
      where: { facilityId },
      orderBy: { name: 'asc' },
    })) as FacilityDepartmentEntity[];
  }

  async findDoctorsByFacilityId(facilityId: string): Promise<DoctorProfileEntity[]> {
    const records = await this.db.doctorFacility.findMany({
      where: { facilityId },
      include: { doctor: true },
    });
    return records.map(r => r.doctor) as unknown as DoctorProfileEntity[];
  }

}

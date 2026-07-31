import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { IFacilityRepository } from '../../domain/repositories/facility.repository.interface';
import { FacilityResponseDto, DepartmentResponseDto } from '../../presentation/dto/facility.dto';
import { DoctorProfileResponseDto } from '../../../../modules/doctor/presentation/dto/doctor-profile.dto';
import { Logger } from 'nestjs-pino';

@Injectable()
export class FacilityService {
  constructor(
    @Inject('IFacilityRepository')
    private readonly facilityRepository: IFacilityRepository,
    private readonly logger: Logger,
  ) {}

  async listFacilities(): Promise<FacilityResponseDto[]> {
    const list = await this.facilityRepository.findAllFacilities();
    return list.map(f => ({
      id: f.id,
      name: f.name,
      address: f.address,
      phone: f.phone,
    }));
  }

  async getFacilityDetails(facilityId: string): Promise<FacilityResponseDto> {
    const facility = await this.facilityRepository.findFacilityById(facilityId);
    if (!facility) {
      throw new NotFoundException('Facility not found');
    }

    this.logger.log({ msg: 'Facility viewed', facilityId });

    return {
      id: facility.id,
      name: facility.name,
      address: facility.address,
      phone: facility.phone,
    };
  }

  async listDepartments(facilityId: string): Promise<DepartmentResponseDto[]> {
    const facility = await this.facilityRepository.findFacilityById(facilityId);
    if (!facility) {
      throw new NotFoundException('Facility not found');
    }

    this.logger.log({ msg: 'Department listing requested', facilityId });

    const list = await this.facilityRepository.findDepartmentsByFacilityId(facilityId);
    return list.map(d => ({
      id: d.id,
      name: d.name,
      description: d.description || undefined,
    }));
  }

  async listDoctors(facilityId: string): Promise<DoctorProfileResponseDto[]> {
    const facility = await this.facilityRepository.findFacilityById(facilityId);
    if (!facility) {
      throw new NotFoundException('Facility not found');
    }

    this.logger.log({ msg: 'Doctors list viewed for facility', facilityId });

    const list = await this.facilityRepository.findDoctorsByFacilityId(facilityId);
    return list.map(d => ({
      id: d.id,
      fullName: d.fullName,
      specialization: d.primarySpecialization,
      credentials: d.medicalCouncil || 'MD',
    }));

  }
}

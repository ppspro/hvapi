import { Injectable } from '@nestjs/common';
import { DatabaseService } from '@database/database.service';
import { IInsuranceRepository } from '../../domain/repositories/insurance.repository.interface';
import { InsurancePolicyEntity, InsuranceOcrRecordEntity } from '../../domain/entities/insurance.entity';

@Injectable()
export class InsuranceRepository implements IInsuranceRepository {
  constructor(private readonly db: DatabaseService) {}

  async findProfileByUserId(userId: string): Promise<{ id: string } | null> {
    return this.db.patientProfile.findUnique({
      where: { userId },
      select: { id: true },
    });
  }

  async findPolicyByProfileId(profileId: string): Promise<InsurancePolicyEntity | null> {
    return (await this.db.insurancePolicy.findUnique({
      where: { patientProfileId: profileId },
    })) as InsurancePolicyEntity | null;
  }

  async createPolicy(
    profileId: string,
    providerName: string,
    policyNumber: string,
    coverageDetails?: string,
  ): Promise<InsurancePolicyEntity> {
    return (await this.db.insurancePolicy.create({
      data: {
        patientProfileId: profileId,
        providerName,
        policyNumber,
        coverageDetails: coverageDetails || null,
      },
    })) as InsurancePolicyEntity;
  }

  async updatePolicy(
    policyId: string,
    providerName: string,
    policyNumber: string,
    coverageDetails?: string,
  ): Promise<InsurancePolicyEntity> {
    return (await this.db.insurancePolicy.update({
      where: { id: policyId },
      data: {
        providerName,
        policyNumber,
        coverageDetails: coverageDetails || null,
      },
    })) as InsurancePolicyEntity;
  }

  async createOcrRecord(profileId: string, imageUrl: string, extractedData: string): Promise<InsuranceOcrRecordEntity> {
    return (await this.db.insuranceOcrRecord.create({
      data: {
        patientProfileId: profileId,
        imageUrl,
        extractedData,
        isConfirmed: false,
      },
    })) as InsuranceOcrRecordEntity;
  }

  async findOcrRecordById(ocrId: string): Promise<InsuranceOcrRecordEntity | null> {
    return (await this.db.insuranceOcrRecord.findUnique({
      where: { id: ocrId },
    })) as InsuranceOcrRecordEntity | null;
  }

  async confirmOcrRecord(ocrId: string): Promise<void> {
    await this.db.insuranceOcrRecord.update({
      where: { id: ocrId },
      data: { isConfirmed: true },
    });
  }
}

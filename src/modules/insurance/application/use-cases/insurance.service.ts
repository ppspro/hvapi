import { Injectable, NotFoundException, BadRequestException, Inject } from '@nestjs/common';
import { IInsuranceRepository } from '../../domain/repositories/insurance.repository.interface';
import { OnboardInsuranceDto, OnboardInsuranceResponseDto } from '../../presentation/dto/onboard-insurance.dto';
import { InsuranceOcrScanDto, InsuranceOcrScanResponseDto } from '../../presentation/dto/insurance-ocr-scan.dto';
import { InsuranceOcrConfirmDto, InsuranceOcrConfirmResponseDto } from '../../presentation/dto/insurance-ocr-confirm.dto';
import { Logger } from 'nestjs-pino';

@Injectable()
export class InsuranceService {
  constructor(
    @Inject('IInsuranceRepository')
    private readonly insuranceRepository: IInsuranceRepository,
    private readonly logger: Logger,
  ) {}

  async onboardInsurance(userId: string, dto: OnboardInsuranceDto): Promise<OnboardInsuranceResponseDto> {
    const profile = await this.insuranceRepository.findProfileByUserId(userId);
    if (!profile) {
      throw new NotFoundException('Patient profile not found. Complete demographics onboarding first.');
    }

    let policy = await this.insuranceRepository.findPolicyByProfileId(profile.id);
    if (!policy) {
      policy = await this.insuranceRepository.createPolicy(
        profile.id,
        dto.providerName,
        dto.policyNumber,
        dto.coverageDetails,
      );
      this.logger.log({ msg: 'New insurance policy saved during onboarding step 4' });
    } else {
      policy = await this.insuranceRepository.updatePolicy(
        policy.id,
        dto.providerName,
        dto.policyNumber,
        dto.coverageDetails,
      );
      this.logger.log({ msg: 'Existing insurance policy updated during onboarding' });
    }

    return {
      policyId: policy.id,
      message: 'Insurance onboarding completed successfully',
      nextStep: 5,
    };
  }

  async scanInsuranceCard(userId: string, dto: InsuranceOcrScanDto): Promise<InsuranceOcrScanResponseDto> {
    const profile = await this.insuranceRepository.findProfileByUserId(userId);
    if (!profile) {
      throw new NotFoundException('Patient profile not found');
    }

    this.logger.log({ msg: 'OCR scan requested for insurance card' });

    // Mock OCR processing extraction logic per PRD workflow guidelines
    const mockExtracted = {
      providerName: 'Blue Shield OCR Candidate',
      policyNumber: 'POL987654321',
      coverageDetails: 'Co-pay $20 (Extracted)',
    };

    const record = await this.insuranceRepository.createOcrRecord(
      profile.id,
      dto.imageUrl,
      JSON.stringify(mockExtracted),
    );

    this.logger.log({ msg: 'OCR extraction completed', ocrId: record.id });

    return {
      ocrId: record.id,
      extractedData: mockExtracted,
      confidence: 0.95,
    };
  }

  async confirmOcrData(userId: string, dto: InsuranceOcrConfirmDto): Promise<InsuranceOcrConfirmResponseDto> {
    const profile = await this.insuranceRepository.findProfileByUserId(userId);
    if (!profile) {
      throw new NotFoundException('Patient profile not found');
    }

    const ocrRecord = await this.insuranceRepository.findOcrRecordById(dto.ocrId);
    if (!ocrRecord) {
      throw new NotFoundException('OCR record not found');
    }

    if (ocrRecord.isConfirmed) {
      throw new BadRequestException('OCR record has already been confirmed and processed');
    }

    // Mark OCR record verified/processed
    await this.insuranceRepository.confirmOcrRecord(dto.ocrId);
    this.logger.log({ msg: 'Manual correction submitted for OCR card scan' });

    // Create or update policy with Reviewed / Corrected manually confirmed values
    let policy = await this.insuranceRepository.findPolicyByProfileId(profile.id);
    if (!policy) {
      policy = await this.insuranceRepository.createPolicy(
        profile.id,
        dto.confirmedData.providerName,
        dto.confirmedData.policyNumber,
        dto.confirmedData.coverageDetails,
      );
    } else {
      policy = await this.insuranceRepository.updatePolicy(
        policy.id,
        dto.confirmedData.providerName,
        dto.confirmedData.policyNumber,
        dto.confirmedData.coverageDetails,
      );
    }

    this.logger.log({ msg: 'Policy saved and confirmed from OCR review' });

    return {
      policyId: policy.id,
      message: 'Insurance OCR data confirmed and policy saved',
    };
  }
}

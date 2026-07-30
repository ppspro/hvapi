import { IInsuranceRepository } from '../../domain/repositories/insurance.repository.interface';
import { OnboardInsuranceDto, OnboardInsuranceResponseDto } from '../../presentation/dto/onboard-insurance.dto';
import { InsuranceOcrScanDto, InsuranceOcrScanResponseDto } from '../../presentation/dto/insurance-ocr-scan.dto';
import { InsuranceOcrConfirmDto, InsuranceOcrConfirmResponseDto } from '../../presentation/dto/insurance-ocr-confirm.dto';
import { Logger } from 'nestjs-pino';
export declare class InsuranceService {
    private readonly insuranceRepository;
    private readonly logger;
    constructor(insuranceRepository: IInsuranceRepository, logger: Logger);
    onboardInsurance(userId: string, dto: OnboardInsuranceDto): Promise<OnboardInsuranceResponseDto>;
    scanInsuranceCard(userId: string, dto: InsuranceOcrScanDto): Promise<InsuranceOcrScanResponseDto>;
    confirmOcrData(userId: string, dto: InsuranceOcrConfirmDto): Promise<InsuranceOcrConfirmResponseDto>;
}

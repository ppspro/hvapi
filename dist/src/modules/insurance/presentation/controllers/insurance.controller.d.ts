import { InsuranceService } from '../../application/use-cases/insurance.service';
import { OnboardInsuranceDto, OnboardInsuranceResponseDto } from '../dto/onboard-insurance.dto';
import { InsuranceOcrScanDto, InsuranceOcrScanResponseDto } from '../dto/insurance-ocr-scan.dto';
import { InsuranceOcrConfirmDto, InsuranceOcrConfirmResponseDto } from '../dto/insurance-ocr-confirm.dto';
export declare class InsuranceController {
    private readonly insuranceService;
    constructor(insuranceService: InsuranceService);
    onboardInsurance(req: any, dto: OnboardInsuranceDto): Promise<OnboardInsuranceResponseDto>;
    scanInsuranceCard(req: any, dto: InsuranceOcrScanDto): Promise<InsuranceOcrScanResponseDto>;
    confirmOcrData(req: any, dto: InsuranceOcrConfirmDto): Promise<InsuranceOcrConfirmResponseDto>;
}

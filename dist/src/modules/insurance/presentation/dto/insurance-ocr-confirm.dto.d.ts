import { OnboardInsuranceDto } from './onboard-insurance.dto';
export declare class InsuranceOcrConfirmDto {
    ocrId: string;
    confirmedData: OnboardInsuranceDto;
}
export declare class InsuranceOcrConfirmResponseDto {
    policyId: string;
    message: string;
}

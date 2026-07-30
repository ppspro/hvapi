import { HealthCardService } from '../../application/use-cases/health-card.service';
import { OnboardHealthCardResponseDto } from '../dto/onboard-health-card.dto';
import { VerifyQrDto, VerifyQrResponseDto } from '../dto/verify-qr.dto';
import { HealthCardDetailsResponseDto } from '../dto/health-card-details.dto';
import { WalletPassResponseDto } from '../dto/wallet-pass.dto';
export declare class HealthCardController {
    private readonly healthCardService;
    constructor(healthCardService: HealthCardService);
    onboardHealthCard(req: any): Promise<OnboardHealthCardResponseDto>;
    getCardDetails(req: any): Promise<HealthCardDetailsResponseDto>;
    verifyQr(req: any, dto: VerifyQrDto): Promise<VerifyQrResponseDto>;
    refreshCardQr(req: any): Promise<HealthCardDetailsResponseDto>;
    generateWalletPass(req: any): Promise<WalletPassResponseDto>;
}

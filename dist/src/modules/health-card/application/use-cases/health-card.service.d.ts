import { IHealthCardRepository } from '../../domain/repositories/health-card.repository.interface';
import { OnboardHealthCardResponseDto } from '../../presentation/dto/onboard-health-card.dto';
import { VerifyQrDto, VerifyQrResponseDto } from '../../presentation/dto/verify-qr.dto';
import { HealthCardDetailsResponseDto } from '../../presentation/dto/health-card-details.dto';
import { WalletPassResponseDto } from '../../presentation/dto/wallet-pass.dto';
import { Logger } from 'nestjs-pino';
export declare class HealthCardService {
    private readonly healthCardRepository;
    private readonly logger;
    constructor(healthCardRepository: IHealthCardRepository, logger: Logger);
    onboardHealthCard(userId: string): Promise<OnboardHealthCardResponseDto>;
    getCardDetails(userId: string): Promise<HealthCardDetailsResponseDto>;
    verifyQr(verifierUserId: string, dto: VerifyQrDto): Promise<VerifyQrResponseDto>;
    refreshCardQr(userId: string): Promise<HealthCardDetailsResponseDto>;
    generateWalletPass(userId: string): Promise<WalletPassResponseDto>;
}

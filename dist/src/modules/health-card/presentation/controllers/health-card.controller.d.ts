import { HealthCardService } from '../../application/use-cases/health-card.service';
import { IssueCardDto, CardActionDto, UpdateCardDto } from '../dto/issue-card.dto';
import { FullHealthCardResponseDto, HealthCardHistoryItemDto } from '../dto/full-health-card.dto';
import { VerifyQrDto, VerifyQrResponseDto } from '../dto/verify-qr.dto';
export declare class HealthCardController {
    private readonly healthCardService;
    constructor(healthCardService: HealthCardService);
    issueCard(req: any, dto: IssueCardDto): Promise<FullHealthCardResponseDto>;
    getActiveCard(req: any): Promise<FullHealthCardResponseDto>;
    searchCards(query: string): Promise<FullHealthCardResponseDto[]>;
    getCardById(req: any, id: string): Promise<FullHealthCardResponseDto>;
    updateCard(req: any, id: string, dto: UpdateCardDto): Promise<FullHealthCardResponseDto>;
    activateCard(req: any, id: string, dto: CardActionDto): Promise<FullHealthCardResponseDto>;
    deactivateCard(req: any, id: string, dto: CardActionDto): Promise<FullHealthCardResponseDto>;
    suspendCard(req: any, id: string, dto: CardActionDto): Promise<FullHealthCardResponseDto>;
    blockCard(req: any, id: string, dto: CardActionDto): Promise<FullHealthCardResponseDto>;
    unblockCard(req: any, id: string, dto: CardActionDto): Promise<FullHealthCardResponseDto>;
    replaceCard(req: any, id: string, dto: CardActionDto): Promise<FullHealthCardResponseDto>;
    renewCard(req: any, id: string, dto: CardActionDto): Promise<FullHealthCardResponseDto>;
    archiveCard(req: any, id: string, dto: CardActionDto): Promise<FullHealthCardResponseDto>;
    restoreCard(req: any, id: string, dto: CardActionDto): Promise<FullHealthCardResponseDto>;
    getCardHistory(req: any, id: string): Promise<HealthCardHistoryItemDto[]>;
    verifyQr(req: any, dto: VerifyQrDto): Promise<VerifyQrResponseDto>;
}

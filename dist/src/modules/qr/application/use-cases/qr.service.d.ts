import { IQrRepository } from '../../domain/repositories/qr.repository.interface';
import { GenerateQrDto, VerifyQrPayloadDto, RotateQrDto, RevokeQrDto, BulkGenerateQrDto, BulkQrActionDto, UpdateQrDto } from '../../presentation/dto/generate-qr.dto';
import { QrResponseDto, QrVerificationResultDto, QrAnalyticsResponseDto, QrHistoryItemDto, QrScanLogItemDto } from '../../presentation/dto/qr-response.dto';
import { Logger } from 'nestjs-pino';
export declare class QrService {
    private readonly repository;
    private readonly logger;
    constructor(repository: IQrRepository, logger: Logger);
    private resolveProfile;
    private generateTokenAndSignature;
    private mapQr;
    generateQr(userId: string, dto: GenerateQrDto): Promise<QrResponseDto>;
    verifyQrPayload(dto: VerifyQrPayloadDto, verifierUserId?: string): Promise<QrVerificationResultDto>;
    rotateQr(userId: string, id: string, dto: RotateQrDto): Promise<QrResponseDto>;
    revokeQr(userId: string, id: string, dto: RevokeQrDto): Promise<QrResponseDto>;
    restoreQr(userId: string, id: string): Promise<QrResponseDto>;
    archiveQr(userId: string, id: string): Promise<QrResponseDto>;
    getUserQrs(userId: string, entityType?: string): Promise<QrResponseDto[]>;
    getQrById(userId: string, id: string): Promise<QrResponseDto>;
    updateQr(userId: string, id: string, dto: UpdateQrDto): Promise<QrResponseDto>;
    softDeleteQr(userId: string, id: string): Promise<{
        message: string;
    }>;
    getQrHistory(userId: string, id: string): Promise<QrHistoryItemDto[]>;
    getQrScanLogs(userId: string, id: string): Promise<QrScanLogItemDto[]>;
    searchQrs(query: string): Promise<QrResponseDto[]>;
    getAnalytics(): Promise<QrAnalyticsResponseDto>;
    bulkGenerate(userId: string, dto: BulkGenerateQrDto): Promise<QrResponseDto[]>;
    bulkRotate(userId: string, dto: BulkQrActionDto): Promise<{
        processed: number;
        message: string;
    }>;
    bulkRevoke(userId: string, dto: BulkQrActionDto): Promise<{
        processed: number;
        message: string;
    }>;
}

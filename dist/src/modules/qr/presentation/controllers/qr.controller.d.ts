import { QrService } from '../../application/use-cases/qr.service';
import { GenerateQrDto, VerifyQrPayloadDto, RotateQrDto, RevokeQrDto, BulkGenerateQrDto, BulkQrActionDto, UpdateQrDto } from '../dto/generate-qr.dto';
import { QrResponseDto, QrVerificationResultDto, QrAnalyticsResponseDto, QrHistoryItemDto, QrScanLogItemDto } from '../dto/qr-response.dto';
export declare class QrController {
    private readonly qrService;
    constructor(qrService: QrService);
    createQr(req: any, dto: GenerateQrDto): Promise<QrResponseDto>;
    generateQrAlias(req: any, dto: GenerateQrDto): Promise<QrResponseDto>;
    verifyQr(req: any, dto: VerifyQrPayloadDto): Promise<QrVerificationResultDto>;
    rotateQrAlias(req: any, dto: {
        id: string;
        reason?: string;
    }): Promise<QrResponseDto>;
    rotateQr(req: any, id: string, dto: RotateQrDto): Promise<QrResponseDto>;
    revokeQrAlias(req: any, dto: {
        id: string;
        reason?: string;
    }): Promise<QrResponseDto>;
    revokeQr(req: any, id: string, dto: RevokeQrDto): Promise<QrResponseDto>;
    restoreQr(req: any, id: string): Promise<QrResponseDto>;
    archiveQr(req: any, id: string): Promise<QrResponseDto>;
    getUserQrs(req: any, entityType?: string): Promise<QrResponseDto[]>;
    searchQrs(query: string): Promise<QrResponseDto[]>;
    getAnalytics(): Promise<QrAnalyticsResponseDto>;
    getQrById(req: any, id: string): Promise<QrResponseDto>;
    updateQr(req: any, id: string, dto: UpdateQrDto): Promise<QrResponseDto>;
    softDeleteQr(req: any, id: string): Promise<any>;
    getQrHistory(req: any, id: string): Promise<QrHistoryItemDto[]>;
    getQrScanLogs(req: any, id: string): Promise<QrScanLogItemDto[]>;
    bulkGenerate(req: any, dto: BulkGenerateQrDto): Promise<QrResponseDto[]>;
    bulkRotate(req: any, dto: BulkQrActionDto): Promise<any>;
    bulkRevoke(req: any, dto: BulkQrActionDto): Promise<any>;
}

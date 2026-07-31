import { QrCodeEntity, QrHistoryEntity, QrScanLogEntity, QrAuditLogEntity } from '../entities/qr.entity';
export interface IQrRepository {
    findProfileByUserId(userId: string): Promise<{
        id: string;
    } | null>;
    createQr(data: any): Promise<QrCodeEntity>;
    findQrById(id: string, includeDeleted?: boolean): Promise<QrCodeEntity | null>;
    findQrByToken(token: string): Promise<QrCodeEntity | null>;
    findQrByEntity(entityId: string, entityType: string): Promise<QrCodeEntity | null>;
    findQrsByOwner(ownerId: string, entityType?: string): Promise<QrCodeEntity[]>;
    updateQr(id: string, data: any): Promise<QrCodeEntity>;
    softDeleteQr(id: string): Promise<void>;
    searchQrs(query: string): Promise<QrCodeEntity[]>;
    createHistory(data: {
        qrCodeId: string;
        action: string;
        previousToken?: string;
        newToken?: string;
        previousStatus?: string;
        newStatus: string;
        reason?: string;
        performedBy?: string;
    }): Promise<QrHistoryEntity>;
    findHistoryByQrId(qrCodeId: string): Promise<QrHistoryEntity[]>;
    createScanLog(data: {
        qrCodeId?: string;
        entityId: string;
        entityType: string;
        verifierUserId?: string;
        validationResult: string;
        failureReason?: string;
        deviceInfo?: string;
        ipAddress?: string;
        location?: string;
        platform?: string;
    }): Promise<QrScanLogEntity>;
    findScanLogsByQrId(qrCodeId: string): Promise<QrScanLogEntity[]>;
    createAuditLog(data: {
        qrCodeId?: string;
        action: string;
        performedBy?: string;
        details?: string;
    }): Promise<QrAuditLogEntity>;
    getAnalytics(): Promise<{
        totalQrs: number;
        activeQrs: number;
        revokedQrs: number;
        totalScans: number;
        successfulScans: number;
        failedScans: number;
        scansByEntity: Record<string, number>;
    }>;
}

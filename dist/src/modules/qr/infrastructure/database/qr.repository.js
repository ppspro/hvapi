"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QrRepository = void 0;
const common_1 = require("@nestjs/common");
const database_service_1 = require("../../../../database/database.service");
let QrRepository = class QrRepository {
    constructor(db) {
        this.db = db;
    }
    async findProfileByUserId(userId) {
        return this.db.patientProfile.findUnique({ where: { userId }, select: { id: true } });
    }
    async createQr(data) {
        const created = await this.db.qrCode.create({
            data: {
                entityId: data.entityId,
                entityType: data.entityType,
                ownerId: data.ownerId,
                token: data.token,
                signature: data.signature,
                status: data.status || 'ACTIVE',
                version: 1,
                nonce: data.nonce,
                checksum: data.checksum || null,
                expiresAt: new Date(data.expiresAt),
            },
        });
        await this.createHistory({
            qrCodeId: created.id,
            action: 'GENERATED',
            newToken: data.token,
            newStatus: 'ACTIVE',
            reason: 'Initial QR identity generation',
            performedBy: data.ownerId,
        });
        return created;
    }
    async findQrById(id, includeDeleted = false) {
        return (await this.db.qrCode.findFirst({
            where: { id, ...(includeDeleted ? {} : { isDeleted: false }) },
        }));
    }
    async findQrByToken(token) {
        return (await this.db.qrCode.findUnique({
            where: { token },
        }));
    }
    async findQrByEntity(entityId, entityType) {
        return (await this.db.qrCode.findFirst({
            where: { entityId, entityType: entityType, isDeleted: false },
            orderBy: { createdAt: 'desc' },
        }));
    }
    async findQrsByOwner(ownerId, entityType) {
        return (await this.db.qrCode.findMany({
            where: {
                ownerId,
                isDeleted: false,
                ...(entityType ? { entityType: entityType } : {}),
            },
            orderBy: { createdAt: 'desc' },
        }));
    }
    async updateQr(id, data) {
        return (await this.db.qrCode.update({
            where: { id },
            data: {
                token: data.token || undefined,
                signature: data.signature || undefined,
                status: data.status || undefined,
                version: data.version || undefined,
                nonce: data.nonce || undefined,
                checksum: data.checksum || undefined,
                expiresAt: data.expiresAt ? new Date(data.expiresAt) : undefined,
                rotatedAt: data.rotatedAt || undefined,
                revokedAt: data.revokedAt || undefined,
                revocationReason: data.revocationReason || undefined,
                isDeleted: data.isDeleted ?? undefined,
                deletedAt: data.deletedAt || undefined,
            },
        }));
    }
    async softDeleteQr(id) {
        await this.db.qrCode.update({
            where: { id },
            data: { isDeleted: true, deletedAt: new Date() },
        });
    }
    async searchQrs(query) {
        const q = query.toLowerCase();
        return (await this.db.qrCode.findMany({
            where: {
                isDeleted: false,
                OR: [
                    { token: { contains: q, mode: 'insensitive' } },
                    { entityId: { contains: q, mode: 'insensitive' } },
                    { ownerId: { contains: q, mode: 'insensitive' } },
                ],
            },
            orderBy: { createdAt: 'desc' },
        }));
    }
    async createHistory(data) {
        return (await this.db.qrHistory.create({
            data: {
                qrCodeId: data.qrCodeId,
                action: data.action,
                previousToken: data.previousToken || null,
                newToken: data.newToken || null,
                previousStatus: data.previousStatus || null,
                newStatus: data.newStatus,
                reason: data.reason || null,
                performedBy: data.performedBy || null,
            },
        }));
    }
    async findHistoryByQrId(qrCodeId) {
        return (await this.db.qrHistory.findMany({
            where: { qrCodeId },
            orderBy: { createdAt: 'desc' },
        }));
    }
    async createScanLog(data) {
        return (await this.db.qrScanLog.create({
            data: {
                qrCodeId: data.qrCodeId || null,
                entityId: data.entityId,
                entityType: data.entityType,
                verifierUserId: data.verifierUserId || null,
                validationResult: data.validationResult,
                failureReason: data.failureReason || null,
                deviceInfo: data.deviceInfo || null,
                ipAddress: data.ipAddress || null,
                location: data.location || null,
                platform: data.platform || null,
            },
        }));
    }
    async findScanLogsByQrId(qrCodeId) {
        return (await this.db.qrScanLog.findMany({
            where: { qrCodeId },
            orderBy: { scannedAt: 'desc' },
        }));
    }
    async createAuditLog(data) {
        return (await this.db.qrAuditLog.create({
            data: {
                qrCodeId: data.qrCodeId || null,
                action: data.action,
                performedBy: data.performedBy || null,
                details: data.details || null,
            },
        }));
    }
    async getAnalytics() {
        const totalQrs = await this.db.qrCode.count({ where: { isDeleted: false } });
        const activeQrs = await this.db.qrCode.count({ where: { status: 'ACTIVE', isDeleted: false } });
        const revokedQrs = await this.db.qrCode.count({ where: { status: 'REVOKED', isDeleted: false } });
        const totalScans = await this.db.qrScanLog.count();
        const successfulScans = await this.db.qrScanLog.count({ where: { validationResult: 'VALID' } });
        const failedScans = totalScans - successfulScans;
        const scansGroup = await this.db.qrScanLog.groupBy({
            by: ['entityType'],
            _count: { id: true },
        });
        const scansByEntity = {};
        scansGroup.forEach((g) => {
            scansByEntity[g.entityType] = g._count.id;
        });
        return {
            totalQrs,
            activeQrs,
            revokedQrs,
            totalScans,
            successfulScans,
            failedScans,
            scansByEntity,
        };
    }
};
exports.QrRepository = QrRepository;
exports.QrRepository = QrRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [database_service_1.DatabaseService])
], QrRepository);
//# sourceMappingURL=qr.repository.js.map
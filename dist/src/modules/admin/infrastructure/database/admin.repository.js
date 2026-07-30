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
exports.AdminRepository = void 0;
const common_1 = require("@nestjs/common");
const database_service_1 = require("../../../../database/database.service");
let AdminRepository = class AdminRepository {
    constructor(db) {
        this.db = db;
    }
    async getStats() {
        const totalPatients = await this.db.patientProfile.count();
        const totalDoctors = await this.db.doctorProfile.count();
        const pendingOcrReviews = await this.db.ocrDocument.count({
            where: { status: 'PENDING' },
        });
        const systemLogsCount = await this.db.auditLog.count();
        return {
            totalPatients,
            totalDoctors,
            pendingOcrReviews,
            systemLogsCount,
        };
    }
    async findAuditLogs() {
        return (await this.db.auditLog.findMany({
            orderBy: { createdAt: 'desc' },
            take: 100,
        }));
    }
    async createAuditLog(userId, action, details, ipAddress) {
        return (await this.db.auditLog.create({
            data: {
                userId,
                action,
                details: details || null,
                ipAddress: ipAddress || null,
            },
        }));
    }
};
exports.AdminRepository = AdminRepository;
exports.AdminRepository = AdminRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [database_service_1.DatabaseService])
], AdminRepository);
//# sourceMappingURL=admin.repository.js.map
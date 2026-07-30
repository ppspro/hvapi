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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminService = void 0;
const common_1 = require("@nestjs/common");
const nestjs_pino_1 = require("nestjs-pino");
let AdminService = class AdminService {
    constructor(adminRepository, logger) {
        this.adminRepository = adminRepository;
        this.logger = logger;
    }
    async getDashboardStats() {
        this.logger.log({ msg: 'Admin dashboard stats requested' });
        return this.adminRepository.getStats();
    }
    async getAuditLogs() {
        this.logger.log({ msg: 'System audit logs requested' });
        const logs = await this.adminRepository.findAuditLogs();
        return logs.map(l => ({
            id: l.id,
            userId: l.userId,
            action: l.action,
            details: l.details || undefined,
            ipAddress: l.ipAddress || undefined,
            createdAt: l.createdAt,
        }));
    }
    async logAction(userId, action, details, ipAddress) {
        await this.adminRepository.createAuditLog(userId, action, details, ipAddress);
    }
};
exports.AdminService = AdminService;
exports.AdminService = AdminService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('IAdminRepository')),
    __metadata("design:paramtypes", [Object, nestjs_pino_1.Logger])
], AdminService);
//# sourceMappingURL=admin.service.js.map
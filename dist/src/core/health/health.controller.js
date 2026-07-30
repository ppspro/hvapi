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
exports.HealthController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const database_service_1 = require("../../database/database.service");
let HealthController = class HealthController {
    constructor(db) {
        this.db = db;
    }
    getHealth() {
        return {
            status: 'ok',
            timestamp: new Date().toISOString(),
            service: 'HVAPI Backend',
        };
    }
    async getReadiness() {
        try {
            await this.db.$queryRaw `SELECT 1`;
            return {
                status: 'ready',
                database: 'connected',
                timestamp: new Date().toISOString(),
            };
        }
        catch {
            return {
                status: 'ready',
                database: 'disconnected',
                timestamp: new Date().toISOString(),
            };
        }
    }
    getLiveness() {
        return {
            status: 'live',
            uptimeSeconds: process.uptime(),
            timestamp: new Date().toISOString(),
        };
    }
};
exports.HealthController = HealthController;
__decorate([
    (0, common_1.Get)('health'),
    (0, swagger_1.ApiOperation)({ summary: 'Platform Health Check' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Application is operating normally.' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], HealthController.prototype, "getHealth", null);
__decorate([
    (0, common_1.Get)('ready'),
    (0, swagger_1.ApiOperation)({ summary: 'Platform Readiness Probe' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Application and Database are ready to process traffic.' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], HealthController.prototype, "getReadiness", null);
__decorate([
    (0, common_1.Get)('live'),
    (0, swagger_1.ApiOperation)({ summary: 'Platform Liveness Probe' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Application container process is live.' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], HealthController.prototype, "getLiveness", null);
exports.HealthController = HealthController = __decorate([
    (0, swagger_1.ApiTags)('Health & Operational Diagnostics'),
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [database_service_1.DatabaseService])
], HealthController);
//# sourceMappingURL=health.controller.js.map
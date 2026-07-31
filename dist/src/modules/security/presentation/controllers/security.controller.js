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
exports.SecurityController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const passport_1 = require("@nestjs/passport");
const security_service_1 = require("../../application/use-cases/security.service");
const security_response_dto_1 = require("../dto/security-response.dto");
const security_enterprise_dto_1 = require("../dto/security-enterprise.dto");
let SecurityController = class SecurityController {
    constructor(securityService) {
        this.securityService = securityService;
    }
    async getDashboard() {
        return this.securityService.getDashboardStats();
    }
    async createConsent(req, dto) {
        return this.securityService.createConsent(req.user.userId, dto);
    }
    async getConsents(patientId, status) {
        return this.securityService.getConsents(patientId, status);
    }
    async getConsentById(id) {
        return this.securityService.getConsentById(id);
    }
    async withdrawConsent(req, id) {
        return this.securityService.withdrawConsent(id, req.user.userId);
    }
    async createRetentionPolicy(req, dto) {
        return this.securityService.createRetentionPolicy(req.user.userId, dto);
    }
    async getRetentionPolicies() {
        return this.securityService.getRetentionPolicies();
    }
    async updateRetentionPolicy(req, id, dto) {
        return this.securityService.updateRetentionPolicy(id, dto, req.user.userId);
    }
    async softDeleteRetentionPolicy(req, id) {
        return this.securityService.softDeleteRetentionPolicy(id, req.user.userId);
    }
    async createIncident(req, dto) {
        return this.securityService.createIncident(req.user.userId, dto);
    }
    async getIncidents(severity, status) {
        return this.securityService.getIncidents(severity, status);
    }
    async resolveIncident(req, id, dto) {
        return this.securityService.resolveIncident(id, req.user.userId, dto);
    }
    async getActiveEncryptionKey() {
        return this.securityService.getActiveEncryptionKey();
    }
    async rotateEncryptionKey(req) {
        return this.securityService.rotateEncryptionKey(req.user.userId);
    }
    async generateComplianceReport(req, dto) {
        return this.securityService.generateComplianceReport(req.user.userId, dto);
    }
    async getComplianceReports() {
        return this.securityService.getComplianceReports();
    }
    async getAuditLogs(userId, resource) {
        return this.securityService.getAuditLogs(userId, resource);
    }
};
exports.SecurityController = SecurityController;
__decorate([
    (0, common_1.Get)('dashboard'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Get Enterprise Security & Compliance Dashboard summary' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: security_response_dto_1.SecurityDashboardResponseDto }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SecurityController.prototype, "getDashboard", null);
__decorate([
    (0, common_1.Post)('consents'),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, swagger_1.ApiOperation)({ summary: 'Capture patient consent record' }),
    (0, swagger_1.ApiResponse)({ status: 201, type: security_response_dto_1.ConsentRecordResponseDto }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, security_enterprise_dto_1.CreateConsentDto]),
    __metadata("design:returntype", Promise)
], SecurityController.prototype, "createConsent", null);
__decorate([
    (0, common_1.Get)('consents'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'List patient consents with optional filters' }),
    (0, swagger_1.ApiQuery)({ name: 'patientId', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'status', required: false }),
    (0, swagger_1.ApiResponse)({ status: 200, type: [security_response_dto_1.ConsentRecordResponseDto] }),
    __param(0, (0, common_1.Query)('patientId')),
    __param(1, (0, common_1.Query)('status')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], SecurityController.prototype, "getConsents", null);
__decorate([
    (0, common_1.Get)('consents/:id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Get consent record details by ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Consent ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: security_response_dto_1.ConsentRecordResponseDto }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SecurityController.prototype, "getConsentById", null);
__decorate([
    (0, common_1.Post)('consents/:id/withdraw'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Withdraw patient consent' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Consent ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: security_response_dto_1.ConsentRecordResponseDto }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], SecurityController.prototype, "withdrawConsent", null);
__decorate([
    (0, common_1.Post)('retention'),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, swagger_1.ApiOperation)({ summary: 'Create data retention policy' }),
    (0, swagger_1.ApiResponse)({ status: 201, type: security_response_dto_1.RetentionPolicyResponseDto }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, security_enterprise_dto_1.CreateRetentionPolicyDto]),
    __metadata("design:returntype", Promise)
], SecurityController.prototype, "createRetentionPolicy", null);
__decorate([
    (0, common_1.Get)('retention'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'List all data retention policies' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: [security_response_dto_1.RetentionPolicyResponseDto] }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SecurityController.prototype, "getRetentionPolicies", null);
__decorate([
    (0, common_1.Put)('retention/:id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Update retention policy parameters' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Retention Policy ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: security_response_dto_1.RetentionPolicyResponseDto }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, security_enterprise_dto_1.UpdateRetentionPolicyDto]),
    __metadata("design:returntype", Promise)
], SecurityController.prototype, "updateRetentionPolicy", null);
__decorate([
    (0, common_1.Delete)('retention/:id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Soft-delete a retention policy' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Retention Policy ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Retention policy soft-deleted' }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], SecurityController.prototype, "softDeleteRetentionPolicy", null);
__decorate([
    (0, common_1.Post)('incidents'),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, swagger_1.ApiOperation)({ summary: 'Report a security incident' }),
    (0, swagger_1.ApiResponse)({ status: 201, type: security_response_dto_1.SecurityIncidentResponseDto }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, security_enterprise_dto_1.CreateSecurityIncidentDto]),
    __metadata("design:returntype", Promise)
], SecurityController.prototype, "createIncident", null);
__decorate([
    (0, common_1.Get)('incidents'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'List reported security incidents' }),
    (0, swagger_1.ApiQuery)({ name: 'severity', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'status', required: false }),
    (0, swagger_1.ApiResponse)({ status: 200, type: [security_response_dto_1.SecurityIncidentResponseDto] }),
    __param(0, (0, common_1.Query)('severity')),
    __param(1, (0, common_1.Query)('status')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], SecurityController.prototype, "getIncidents", null);
__decorate([
    (0, common_1.Put)('incidents/:id/resolve'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Mark security incident as RESOLVED' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Incident ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: security_response_dto_1.SecurityIncidentResponseDto }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, security_enterprise_dto_1.ResolveSecurityIncidentDto]),
    __metadata("design:returntype", Promise)
], SecurityController.prototype, "resolveIncident", null);
__decorate([
    (0, common_1.Get)('keys/active'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Get active KMS encryption key metadata' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: security_response_dto_1.EncryptionKeyResponseDto }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SecurityController.prototype, "getActiveEncryptionKey", null);
__decorate([
    (0, common_1.Post)('keys/rotate'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Trigger KMS encryption key rotation' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: security_response_dto_1.EncryptionKeyResponseDto }),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], SecurityController.prototype, "rotateEncryptionKey", null);
__decorate([
    (0, common_1.Post)('compliance/report'),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, swagger_1.ApiOperation)({ summary: 'Generate automated compliance assessment report' }),
    (0, swagger_1.ApiResponse)({ status: 201, type: security_response_dto_1.ComplianceReportResponseDto }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, security_enterprise_dto_1.GenerateComplianceReportDto]),
    __metadata("design:returntype", Promise)
], SecurityController.prototype, "generateComplianceReport", null);
__decorate([
    (0, common_1.Get)('compliance/reports'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'List generated compliance reports' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: [security_response_dto_1.ComplianceReportResponseDto] }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SecurityController.prototype, "getComplianceReports", null);
__decorate([
    (0, common_1.Get)('audit'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'List security audit logs' }),
    (0, swagger_1.ApiQuery)({ name: 'userId', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'resource', required: false }),
    (0, swagger_1.ApiResponse)({ status: 200, type: [security_response_dto_1.SecurityAuditLogResponseDto] }),
    __param(0, (0, common_1.Query)('userId')),
    __param(1, (0, common_1.Query)('resource')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], SecurityController.prototype, "getAuditLogs", null);
exports.SecurityController = SecurityController = __decorate([
    (0, swagger_1.ApiTags)('Security & Compliance'),
    (0, common_1.Controller)('security'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, swagger_1.ApiBearerAuth)('JWT-Auth'),
    __metadata("design:paramtypes", [security_service_1.SecurityService])
], SecurityController);
//# sourceMappingURL=security.controller.js.map
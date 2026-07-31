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
exports.ImmunisationController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const passport_1 = require("@nestjs/passport");
const immunisation_service_1 = require("../../application/use-cases/immunisation.service");
const create_vaccine_dto_1 = require("../dto/create-vaccine.dto");
const immunisation_response_dto_1 = require("../dto/immunisation-response.dto");
let ImmunisationController = class ImmunisationController {
    constructor(service) {
        this.service = service;
    }
    async createVaccine(dto) {
        return this.service.createVaccine(dto);
    }
    async getVaccines() {
        return this.service.getVaccines();
    }
    async createSchedule(dto) {
        return this.service.createSchedule(dto);
    }
    async getSchedules(vaccineId) {
        return this.service.getSchedules(vaccineId);
    }
    async createRecord(req, dto) {
        return this.service.createRecord(req.user.userId, dto);
    }
    async getRecords(req) {
        return this.service.getRecords(req.user.userId);
    }
    async searchRecords(query) {
        return this.service.searchRecords(query);
    }
    async getStatistics() {
        return this.service.getStatistics();
    }
    async getRecordById(req, id) {
        return this.service.getRecordById(req.user.userId, id);
    }
    async updateRecord(req, id, dto) {
        return this.service.updateRecord(req.user.userId, id, dto);
    }
    async administerDose(req, id, dto) {
        return this.service.administerDose(req.user.userId, id, dto);
    }
    async completeRecord(req, id, dto) {
        return this.service.completeRecord(req.user.userId, id, dto);
    }
    async deferRecord(req, id, dto) {
        return this.service.deferRecord(req.user.userId, id, dto);
    }
    async archiveRecord(req, id, dto) {
        return this.service.archiveRecord(req.user.userId, id, dto);
    }
    async restoreRecord(req, id, dto) {
        return this.service.restoreRecord(req.user.userId, id, dto);
    }
    async generateCertificate(req, dto) {
        return this.service.generateCertificate(req.user.userId, dto);
    }
    async getCertificates(req) {
        return this.service.getCertificates(req.user.userId);
    }
    async configureReminder(req, dto) {
        return this.service.configureReminder(req.user.userId, dto);
    }
};
exports.ImmunisationController = ImmunisationController;
__decorate([
    (0, common_1.Post)('vaccines'),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, swagger_1.ApiOperation)({ summary: 'Register a vaccine in directory' }),
    (0, swagger_1.ApiResponse)({ status: 201, type: immunisation_response_dto_1.VaccineResponseDto }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_vaccine_dto_1.CreateVaccineDto]),
    __metadata("design:returntype", Promise)
], ImmunisationController.prototype, "createVaccine", null);
__decorate([
    (0, common_1.Get)('vaccines'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'List all available vaccines' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: [immunisation_response_dto_1.VaccineResponseDto] }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ImmunisationController.prototype, "getVaccines", null);
__decorate([
    (0, common_1.Post)('schedules'),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, swagger_1.ApiOperation)({ summary: 'Create a vaccination schedule / dose rule' }),
    (0, swagger_1.ApiResponse)({ status: 201, type: immunisation_response_dto_1.VaccinationScheduleResponseDto }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_vaccine_dto_1.CreateVaccinationScheduleDto]),
    __metadata("design:returntype", Promise)
], ImmunisationController.prototype, "createSchedule", null);
__decorate([
    (0, common_1.Get)('schedules'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'List vaccination schedules (supports vaccineId filter)' }),
    (0, swagger_1.ApiQuery)({ name: 'vaccineId', required: false }),
    (0, swagger_1.ApiResponse)({ status: 200, type: [immunisation_response_dto_1.VaccinationScheduleResponseDto] }),
    __param(0, (0, common_1.Query)('vaccineId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ImmunisationController.prototype, "getSchedules", null);
__decorate([
    (0, common_1.Post)('records'),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, swagger_1.ApiOperation)({ summary: 'Create/Schedule a patient vaccination record' }),
    (0, swagger_1.ApiResponse)({ status: 201, type: immunisation_response_dto_1.VaccinationRecordResponseDto }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_vaccine_dto_1.CreateVaccinationRecordDto]),
    __metadata("design:returntype", Promise)
], ImmunisationController.prototype, "createRecord", null);
__decorate([
    (0, common_1.Get)('records'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'List all vaccination records for current patient' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: [immunisation_response_dto_1.VaccinationRecordResponseDto] }),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ImmunisationController.prototype, "getRecords", null);
__decorate([
    (0, common_1.Get)('search'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Search immunisation directory by vaccine, batch, or facility' }),
    (0, swagger_1.ApiQuery)({ name: 'q', required: true }),
    (0, swagger_1.ApiResponse)({ status: 200, type: [immunisation_response_dto_1.VaccinationRecordResponseDto] }),
    __param(0, (0, common_1.Query)('q')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ImmunisationController.prototype, "searchRecords", null);
__decorate([
    (0, common_1.Get)('statistics'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Get immunisation platform statistics' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: immunisation_response_dto_1.ImmunisationStatsResponseDto }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ImmunisationController.prototype, "getStatistics", null);
__decorate([
    (0, common_1.Get)('records/:id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Get specific vaccination record details' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Vaccination Record ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: immunisation_response_dto_1.VaccinationRecordResponseDto }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], ImmunisationController.prototype, "getRecordById", null);
__decorate([
    (0, common_1.Put)('records/:id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Update vaccination record details (blocked if ARCHIVED)' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Vaccination Record ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: immunisation_response_dto_1.VaccinationRecordResponseDto }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", Promise)
], ImmunisationController.prototype, "updateRecord", null);
__decorate([
    (0, common_1.Post)('records/:id/administer'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Administer a dose (captures batch, lot, site, administrator)' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Vaccination Record ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: immunisation_response_dto_1.VaccinationRecordResponseDto }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, create_vaccine_dto_1.AdministerDoseDto]),
    __metadata("design:returntype", Promise)
], ImmunisationController.prototype, "administerDose", null);
__decorate([
    (0, common_1.Post)('records/:id/complete'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Mark vaccination record / series as completed' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Vaccination Record ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: immunisation_response_dto_1.VaccinationRecordResponseDto }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, create_vaccine_dto_1.RecordActionDto]),
    __metadata("design:returntype", Promise)
], ImmunisationController.prototype, "completeRecord", null);
__decorate([
    (0, common_1.Post)('records/:id/defer'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Defer a dose with clinical reason and rescheduled date' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Vaccination Record ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: immunisation_response_dto_1.VaccinationRecordResponseDto }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, create_vaccine_dto_1.DeferDoseDto]),
    __metadata("design:returntype", Promise)
], ImmunisationController.prototype, "deferRecord", null);
__decorate([
    (0, common_1.Post)('records/:id/archive'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Archive a vaccination record' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Vaccination Record ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: immunisation_response_dto_1.VaccinationRecordResponseDto }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, create_vaccine_dto_1.RecordActionDto]),
    __metadata("design:returntype", Promise)
], ImmunisationController.prototype, "archiveRecord", null);
__decorate([
    (0, common_1.Post)('records/:id/restore'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Restore an archived vaccination record' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Vaccination Record ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: immunisation_response_dto_1.VaccinationRecordResponseDto }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, create_vaccine_dto_1.RecordActionDto]),
    __metadata("design:returntype", Promise)
], ImmunisationController.prototype, "restoreRecord", null);
__decorate([
    (0, common_1.Post)('certificates'),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, swagger_1.ApiOperation)({ summary: 'Generate digital vaccine certificate with QR token & PDF link' }),
    (0, swagger_1.ApiResponse)({ status: 201, type: immunisation_response_dto_1.VaccinationCertificateResponseDto }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_vaccine_dto_1.CreateCertificateDto]),
    __metadata("design:returntype", Promise)
], ImmunisationController.prototype, "generateCertificate", null);
__decorate([
    (0, common_1.Get)('certificates'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'List all digital vaccine certificates for current patient' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: [immunisation_response_dto_1.VaccinationCertificateResponseDto] }),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ImmunisationController.prototype, "getCertificates", null);
__decorate([
    (0, common_1.Post)('reminders/config'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Configure vaccination reminder metadata & preferences' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: immunisation_response_dto_1.ReminderConfigResponseDto }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_vaccine_dto_1.ReminderConfigDto]),
    __metadata("design:returntype", Promise)
], ImmunisationController.prototype, "configureReminder", null);
exports.ImmunisationController = ImmunisationController = __decorate([
    (0, swagger_1.ApiTags)('Immunisation Platform'),
    (0, common_1.Controller)('immunisation'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, swagger_1.ApiBearerAuth)('JWT-Auth'),
    __metadata("design:paramtypes", [immunisation_service_1.ImmunisationService])
], ImmunisationController);
//# sourceMappingURL=immunisation.controller.js.map
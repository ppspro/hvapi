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
exports.DoctorController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const passport_1 = require("@nestjs/passport");
const doctor_service_1 = require("../../application/use-cases/doctor.service");
const register_doctor_dto_1 = require("../dto/register-doctor.dto");
const doctor_response_dto_1 = require("../dto/doctor-response.dto");
const doctor_profile_dto_1 = require("../dto/doctor-profile.dto");
let DoctorController = class DoctorController {
    constructor(doctorService) {
        this.doctorService = doctorService;
    }
    async registerDoctor(req, dto) {
        return this.doctorService.registerDoctor(req.user.userId, dto);
    }
    async getDoctors() {
        return this.doctorService.getDoctors();
    }
    async searchDoctors(query) {
        return this.doctorService.searchDoctors(query);
    }
    async getStatistics() {
        return this.doctorService.getStatistics();
    }
    async getPendingDoctors() {
        return this.doctorService.getPendingDoctors();
    }
    async getDoctorById(id) {
        return this.doctorService.getDoctorById(id);
    }
    async updateDoctor(id, dto) {
        return this.doctorService.updateDoctor(id, dto);
    }
    async softDeleteDoctor(id) {
        return this.doctorService.softDeleteDoctor(id);
    }
    async verifyDoctor(req, id, dto) {
        return this.doctorService.verifyDoctor(id, dto, req.user.userId);
    }
    async rejectDoctor(req, id, dto) {
        return this.doctorService.rejectDoctor(id, dto, req.user.userId);
    }
    async suspendDoctor(req, id, dto) {
        return this.doctorService.suspendDoctor(id, dto, req.user.userId);
    }
    async restoreDoctor(req, id, dto) {
        return this.doctorService.restoreDoctor(id, dto, req.user.userId);
    }
    async renewLicense(req, id, dto) {
        return this.doctorService.renewLicense(id, dto, req.user.userId);
    }
    async generateQr(req, id) {
        return this.doctorService.generateQr(req.user.userId, id);
    }
    async getDocuments(id) {
        return this.doctorService.getDocuments(id);
    }
    async attachDocument(id, dto) {
        return this.doctorService.attachDocument(id, dto);
    }
    async getHistory(id) {
        return this.doctorService.getHistory(id);
    }
    async getDoctorSlots(doctorId) {
        return this.doctorService.getDoctorSlots(doctorId);
    }
};
exports.DoctorController = DoctorController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, swagger_1.ApiOperation)({ summary: 'Register/Create a doctor profile in Master Registry' }),
    (0, swagger_1.ApiResponse)({ status: 201, type: doctor_response_dto_1.DoctorProfileFullResponseDto }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, register_doctor_dto_1.RegisterDoctorDto]),
    __metadata("design:returntype", Promise)
], DoctorController.prototype, "registerDoctor", null);
__decorate([
    (0, common_1.Get)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'List all registered doctor profiles in Master Registry' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: [doctor_response_dto_1.DoctorProfileFullResponseDto] }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], DoctorController.prototype, "getDoctors", null);
__decorate([
    (0, common_1.Get)('search'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Enterprise doctor search (by name, registration, license, dept, specialization)' }),
    (0, swagger_1.ApiQuery)({ name: 'q', required: true }),
    (0, swagger_1.ApiResponse)({ status: 200, type: [doctor_response_dto_1.DoctorProfileFullResponseDto] }),
    __param(0, (0, common_1.Query)('q')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], DoctorController.prototype, "searchDoctors", null);
__decorate([
    (0, common_1.Get)('statistics'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Get platform-wide doctor directory statistics' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: doctor_response_dto_1.DoctorStatsResponseDto }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], DoctorController.prototype, "getStatistics", null);
__decorate([
    (0, common_1.Get)('verification/pending'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'List doctor profiles pending admin verification' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: [doctor_response_dto_1.DoctorProfileFullResponseDto] }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], DoctorController.prototype, "getPendingDoctors", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Get complete doctor profile details' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Doctor Profile ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: doctor_response_dto_1.DoctorProfileFullResponseDto }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], DoctorController.prototype, "getDoctorById", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Update doctor profile details' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Doctor Profile ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: doctor_response_dto_1.DoctorProfileFullResponseDto }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], DoctorController.prototype, "updateDoctor", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Soft-delete a doctor profile' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Doctor Profile ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Doctor profile soft-deleted' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], DoctorController.prototype, "softDeleteDoctor", null);
__decorate([
    (0, common_1.Post)(':id/verify'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Approve & verify doctor registration' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Doctor Profile ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: doctor_response_dto_1.DoctorProfileFullResponseDto }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, register_doctor_dto_1.DoctorActionDto]),
    __metadata("design:returntype", Promise)
], DoctorController.prototype, "verifyDoctor", null);
__decorate([
    (0, common_1.Post)(':id/reject'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Reject doctor verification with reason' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Doctor Profile ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: doctor_response_dto_1.DoctorProfileFullResponseDto }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, register_doctor_dto_1.DoctorActionDto]),
    __metadata("design:returntype", Promise)
], DoctorController.prototype, "rejectDoctor", null);
__decorate([
    (0, common_1.Post)(':id/suspend'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Suspend doctor registration' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Doctor Profile ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: doctor_response_dto_1.DoctorProfileFullResponseDto }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, register_doctor_dto_1.DoctorActionDto]),
    __metadata("design:returntype", Promise)
], DoctorController.prototype, "suspendDoctor", null);
__decorate([
    (0, common_1.Post)(':id/restore'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Restore suspended doctor registration' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Doctor Profile ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: doctor_response_dto_1.DoctorProfileFullResponseDto }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, register_doctor_dto_1.DoctorActionDto]),
    __metadata("design:returntype", Promise)
], DoctorController.prototype, "restoreDoctor", null);
__decorate([
    (0, common_1.Post)(':id/renew-license'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Renew medical registration license (extends expiry)' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Doctor Profile ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: doctor_response_dto_1.DoctorProfileFullResponseDto }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, register_doctor_dto_1.RenewLicenseDto]),
    __metadata("design:returntype", Promise)
], DoctorController.prototype, "renewLicense", null);
__decorate([
    (0, common_1.Post)(':id/generate-qr'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Generate/Issue Doctor Digital Verification QR token' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Doctor Profile ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Generated QR Token details' }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], DoctorController.prototype, "generateQr", null);
__decorate([
    (0, common_1.Get)(':id/documents'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'List attached doctor credential documents' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Doctor Profile ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: [doctor_response_dto_1.DoctorDocumentResponseDto] }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], DoctorController.prototype, "getDocuments", null);
__decorate([
    (0, common_1.Post)(':id/documents'),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, swagger_1.ApiOperation)({ summary: 'Attach credential document (reusing MedicalAttachment)' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Doctor Profile ID' }),
    (0, swagger_1.ApiResponse)({ status: 201, type: doctor_response_dto_1.DoctorDocumentResponseDto }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, register_doctor_dto_1.AttachDoctorDocumentDto]),
    __metadata("design:returntype", Promise)
], DoctorController.prototype, "attachDocument", null);
__decorate([
    (0, common_1.Get)(':id/history'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Get complete verification & status lifecycle history' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Doctor Profile ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: [doctor_response_dto_1.DoctorHistoryItemDto] }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], DoctorController.prototype, "getHistory", null);
__decorate([
    (0, common_1.Get)(':id/slots'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Get Doctor Availability Schedule Slots' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Doctor Profile ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: [doctor_profile_dto_1.ScheduleSlotResponseDto] }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], DoctorController.prototype, "getDoctorSlots", null);
exports.DoctorController = DoctorController = __decorate([
    (0, swagger_1.ApiTags)('Doctors'),
    (0, common_1.Controller)('doctors'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, swagger_1.ApiBearerAuth)('JWT-Auth'),
    __metadata("design:paramtypes", [doctor_service_1.DoctorService])
], DoctorController);
//# sourceMappingURL=doctor.controller.js.map
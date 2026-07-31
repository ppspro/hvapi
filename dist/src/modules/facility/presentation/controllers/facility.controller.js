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
exports.FacilityController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const passport_1 = require("@nestjs/passport");
const facility_service_1 = require("../../application/use-cases/facility.service");
const register_facility_dto_1 = require("../dto/register-facility.dto");
const facility_response_dto_1 = require("../dto/facility-response.dto");
const doctor_profile_dto_1 = require("../../../../modules/doctor/presentation/dto/doctor-profile.dto");
let FacilityController = class FacilityController {
    constructor(facilityService) {
        this.facilityService = facilityService;
    }
    async registerFacility(req, dto) {
        return this.facilityService.registerFacility(req.user.userId, dto);
    }
    async getFacilities() {
        return this.facilityService.getFacilities();
    }
    async searchFacilities(query) {
        return this.facilityService.searchFacilities(query);
    }
    async getStatistics() {
        return this.facilityService.getStatistics();
    }
    async getFacilityById(id) {
        return this.facilityService.getFacilityById(id);
    }
    async updateFacility(id, dto) {
        return this.facilityService.updateFacility(id, dto);
    }
    async softDeleteFacility(id) {
        return this.facilityService.softDeleteFacility(id);
    }
    async verifyFacility(req, id, dto) {
        return this.facilityService.verifyFacility(id, dto, req.user.userId);
    }
    async suspendFacility(req, id, dto) {
        return this.facilityService.suspendFacility(id, dto, req.user.userId);
    }
    async restoreFacility(req, id, dto) {
        return this.facilityService.restoreFacility(id, dto, req.user.userId);
    }
    async generateQr(req, id) {
        return this.facilityService.generateQr(req.user.userId, id);
    }
    async getDepartments(id) {
        return this.facilityService.getDepartments(id);
    }
    async createDepartment(id, dto) {
        return this.facilityService.createDepartment(id, dto);
    }
    async getRooms(id) {
        return this.facilityService.getRooms(id);
    }
    async createRoom(id, dto) {
        return this.facilityService.createRoom(id, dto);
    }
    async assignDoctor(id, dto) {
        return this.facilityService.assignDoctor(id, dto);
    }
    async listDoctors(id) {
        return this.facilityService.listDoctors(id);
    }
    async getDocuments(id) {
        return this.facilityService.getDocuments(id);
    }
    async attachDocument(id, dto) {
        return this.facilityService.attachDocument(id, dto);
    }
    async getHistory(id) {
        return this.facilityService.getHistory(id);
    }
};
exports.FacilityController = FacilityController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, swagger_1.ApiOperation)({ summary: 'Register/Create a facility profile in Master Registry' }),
    (0, swagger_1.ApiResponse)({ status: 201, type: facility_response_dto_1.FacilityFullResponseDto }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, register_facility_dto_1.RegisterFacilityDto]),
    __metadata("design:returntype", Promise)
], FacilityController.prototype, "registerFacility", null);
__decorate([
    (0, common_1.Get)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'List all registered facility profiles' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: [facility_response_dto_1.FacilityFullResponseDto] }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], FacilityController.prototype, "getFacilities", null);
__decorate([
    (0, common_1.Get)('search'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Enterprise facility search (by name, code, city, type)' }),
    (0, swagger_1.ApiQuery)({ name: 'q', required: true }),
    (0, swagger_1.ApiResponse)({ status: 200, type: [facility_response_dto_1.FacilityFullResponseDto] }),
    __param(0, (0, common_1.Query)('q')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], FacilityController.prototype, "searchFacilities", null);
__decorate([
    (0, common_1.Get)('statistics'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Get platform-wide facility directory statistics' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: facility_response_dto_1.FacilityStatsResponseDto }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], FacilityController.prototype, "getStatistics", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Get complete facility details' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Facility Profile ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: facility_response_dto_1.FacilityFullResponseDto }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], FacilityController.prototype, "getFacilityById", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Update facility details' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Facility Profile ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: facility_response_dto_1.FacilityFullResponseDto }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], FacilityController.prototype, "updateFacility", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Soft-delete a facility' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Facility Profile ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Facility soft-deleted' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], FacilityController.prototype, "softDeleteFacility", null);
__decorate([
    (0, common_1.Post)(':id/verify'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Approve & verify facility registration' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Facility Profile ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: facility_response_dto_1.FacilityFullResponseDto }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, register_facility_dto_1.FacilityActionDto]),
    __metadata("design:returntype", Promise)
], FacilityController.prototype, "verifyFacility", null);
__decorate([
    (0, common_1.Post)(':id/suspend'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Suspend facility registration' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Facility Profile ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: facility_response_dto_1.FacilityFullResponseDto }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, register_facility_dto_1.FacilityActionDto]),
    __metadata("design:returntype", Promise)
], FacilityController.prototype, "suspendFacility", null);
__decorate([
    (0, common_1.Post)(':id/restore'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Restore suspended facility registration' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Facility Profile ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: facility_response_dto_1.FacilityFullResponseDto }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, register_facility_dto_1.FacilityActionDto]),
    __metadata("design:returntype", Promise)
], FacilityController.prototype, "restoreFacility", null);
__decorate([
    (0, common_1.Post)(':id/generate-qr'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Generate Facility Digital Identity QR token' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Facility Profile ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Generated QR Token details' }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], FacilityController.prototype, "generateQr", null);
__decorate([
    (0, common_1.Get)(':id/departments'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'List facility departments' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Facility Profile ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: [facility_response_dto_1.FullDepartmentResponseDto] }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], FacilityController.prototype, "getDepartments", null);
__decorate([
    (0, common_1.Post)(':id/departments'),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, swagger_1.ApiOperation)({ summary: 'Create facility department' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Facility Profile ID' }),
    (0, swagger_1.ApiResponse)({ status: 201, type: facility_response_dto_1.FullDepartmentResponseDto }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, register_facility_dto_1.CreateDepartmentDto]),
    __metadata("design:returntype", Promise)
], FacilityController.prototype, "createDepartment", null);
__decorate([
    (0, common_1.Get)(':id/rooms'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'List facility rooms' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Facility Profile ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: [facility_response_dto_1.RoomResponseDto] }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], FacilityController.prototype, "getRooms", null);
__decorate([
    (0, common_1.Post)(':id/rooms'),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, swagger_1.ApiOperation)({ summary: 'Create facility room' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Facility Profile ID' }),
    (0, swagger_1.ApiResponse)({ status: 201, type: facility_response_dto_1.RoomResponseDto }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, register_facility_dto_1.CreateRoomDto]),
    __metadata("design:returntype", Promise)
], FacilityController.prototype, "createRoom", null);
__decorate([
    (0, common_1.Post)(':id/assign-doctor'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Assign doctor to facility' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Facility Profile ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Doctor assigned to facility' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, register_facility_dto_1.AssignDoctorToFacilityDto]),
    __metadata("design:returntype", Promise)
], FacilityController.prototype, "assignDoctor", null);
__decorate([
    (0, common_1.Get)(':id/doctors'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'List associated facility doctors' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Facility Profile ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: [doctor_profile_dto_1.DoctorProfileResponseDto] }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], FacilityController.prototype, "listDoctors", null);
__decorate([
    (0, common_1.Get)(':id/documents'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'List attached facility credential documents' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Facility Profile ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: [facility_response_dto_1.FacilityDocumentResponseDto] }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], FacilityController.prototype, "getDocuments", null);
__decorate([
    (0, common_1.Post)(':id/documents'),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, swagger_1.ApiOperation)({ summary: 'Attach credential document (reusing MedicalAttachment)' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Facility Profile ID' }),
    (0, swagger_1.ApiResponse)({ status: 201, type: facility_response_dto_1.FacilityDocumentResponseDto }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, register_facility_dto_1.AttachFacilityDocumentDto]),
    __metadata("design:returntype", Promise)
], FacilityController.prototype, "attachDocument", null);
__decorate([
    (0, common_1.Get)(':id/history'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Get complete verification & status lifecycle history' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Facility Profile ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: [facility_response_dto_1.FacilityHistoryItemDto] }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], FacilityController.prototype, "getHistory", null);
exports.FacilityController = FacilityController = __decorate([
    (0, swagger_1.ApiTags)('Facilities'),
    (0, common_1.Controller)('facilities'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, swagger_1.ApiBearerAuth)('JWT-Auth'),
    __metadata("design:paramtypes", [facility_service_1.FacilityService])
], FacilityController);
//# sourceMappingURL=facility.controller.js.map
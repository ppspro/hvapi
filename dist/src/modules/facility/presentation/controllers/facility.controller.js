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
const facility_dto_1 = require("../dto/facility.dto");
const doctor_profile_dto_1 = require("../../../../modules/doctor/presentation/dto/doctor-profile.dto");
let FacilityController = class FacilityController {
    constructor(facilityService) {
        this.facilityService = facilityService;
    }
    async listFacilities() {
        return this.facilityService.listFacilities();
    }
    async getFacilityDetails(facilityId) {
        return this.facilityService.getFacilityDetails(facilityId);
    }
    async listDepartments(facilityId) {
        return this.facilityService.listDepartments(facilityId);
    }
    async listDoctors(facilityId) {
        return this.facilityService.listDoctors(facilityId);
    }
};
exports.FacilityController = FacilityController;
__decorate([
    (0, common_1.Get)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'List Registered Health Facilities' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: [facility_dto_1.FacilityResponseDto] }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], FacilityController.prototype, "listFacilities", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Get Facility Details' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: facility_dto_1.FacilityResponseDto }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], FacilityController.prototype, "getFacilityDetails", null);
__decorate([
    (0, common_1.Get)(':id/departments'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'List Facility Departments' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: [facility_dto_1.DepartmentResponseDto] }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], FacilityController.prototype, "listDepartments", null);
__decorate([
    (0, common_1.Get)(':id/doctors'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'List Associated Facility Doctors' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: [doctor_profile_dto_1.DoctorProfileResponseDto] }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], FacilityController.prototype, "listDoctors", null);
exports.FacilityController = FacilityController = __decorate([
    (0, swagger_1.ApiTags)('Facilities'),
    (0, common_1.Controller)('facilities'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, swagger_1.ApiBearerAuth)('JWT-Auth'),
    __metadata("design:paramtypes", [facility_service_1.FacilityService])
], FacilityController);
//# sourceMappingURL=facility.controller.js.map
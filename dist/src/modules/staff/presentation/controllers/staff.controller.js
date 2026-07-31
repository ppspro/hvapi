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
exports.StaffController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const passport_1 = require("@nestjs/passport");
const staff_service_1 = require("../../application/use-cases/staff.service");
const register_staff_dto_1 = require("../dto/register-staff.dto");
const staff_response_dto_1 = require("../dto/staff-response.dto");
let StaffController = class StaffController {
    constructor(staffService) {
        this.staffService = staffService;
    }
    async registerStaff(req, dto) {
        return this.staffService.registerStaff(req.user.userId, dto);
    }
    async getStaffMembers() {
        return this.staffService.getStaffMembers();
    }
    async searchStaff(query) {
        return this.staffService.searchStaff(query);
    }
    async getStatistics() {
        return this.staffService.getStatistics();
    }
    async getStaffById(id) {
        return this.staffService.getStaffById(id);
    }
    async updateStaff(id, dto) {
        return this.staffService.updateStaff(id, dto);
    }
    async softDeleteStaff(id) {
        return this.staffService.softDeleteStaff(id);
    }
    async verifyStaff(req, id, dto) {
        return this.staffService.verifyStaff(id, dto, req.user.userId);
    }
    async suspendStaff(req, id, dto) {
        return this.staffService.suspendStaff(id, dto, req.user.userId);
    }
    async restoreStaff(req, id, dto) {
        return this.staffService.restoreStaff(id, dto, req.user.userId);
    }
    async generateQr(req, id) {
        return this.staffService.generateQr(req.user.userId, id);
    }
    async assignFacility(id, dto) {
        return this.staffService.assignFacility(id, dto);
    }
    async assignDepartment(id, dto) {
        return this.staffService.assignDepartment(id, dto);
    }
    async getDocuments(id) {
        return this.staffService.getDocuments(id);
    }
    async attachDocument(id, dto) {
        return this.staffService.attachDocument(id, dto);
    }
    async getHistory(id) {
        return this.staffService.getHistory(id);
    }
};
exports.StaffController = StaffController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, swagger_1.ApiOperation)({ summary: 'Register/Create a staff member profile in Master Workforce Registry' }),
    (0, swagger_1.ApiResponse)({ status: 201, type: staff_response_dto_1.StaffFullResponseDto }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, register_staff_dto_1.RegisterStaffDto]),
    __metadata("design:returntype", Promise)
], StaffController.prototype, "registerStaff", null);
__decorate([
    (0, common_1.Get)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'List all registered staff members in Master Workforce Registry' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: [staff_response_dto_1.StaffFullResponseDto] }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], StaffController.prototype, "getStaffMembers", null);
__decorate([
    (0, common_1.Get)('search'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Enterprise staff search (by name, code, designation, staff type)' }),
    (0, swagger_1.ApiQuery)({ name: 'q', required: true }),
    (0, swagger_1.ApiResponse)({ status: 200, type: [staff_response_dto_1.StaffFullResponseDto] }),
    __param(0, (0, common_1.Query)('q')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], StaffController.prototype, "searchStaff", null);
__decorate([
    (0, common_1.Get)('statistics'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Get platform-wide workforce directory statistics' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: staff_response_dto_1.StaffStatsResponseDto }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], StaffController.prototype, "getStatistics", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Get complete staff member details' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Staff Member Profile ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: staff_response_dto_1.StaffFullResponseDto }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], StaffController.prototype, "getStaffById", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Update staff member profile details' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Staff Member Profile ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: staff_response_dto_1.StaffFullResponseDto }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], StaffController.prototype, "updateStaff", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Soft-delete a staff member profile' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Staff Member Profile ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Staff member soft-deleted' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], StaffController.prototype, "softDeleteStaff", null);
__decorate([
    (0, common_1.Post)(':id/verify'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Approve & verify staff registration' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Staff Member Profile ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: staff_response_dto_1.StaffFullResponseDto }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, register_staff_dto_1.StaffActionDto]),
    __metadata("design:returntype", Promise)
], StaffController.prototype, "verifyStaff", null);
__decorate([
    (0, common_1.Post)(':id/suspend'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Suspend staff registration' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Staff Member Profile ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: staff_response_dto_1.StaffFullResponseDto }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, register_staff_dto_1.StaffActionDto]),
    __metadata("design:returntype", Promise)
], StaffController.prototype, "suspendStaff", null);
__decorate([
    (0, common_1.Post)(':id/restore'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Restore suspended staff registration' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Staff Member Profile ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: staff_response_dto_1.StaffFullResponseDto }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, register_staff_dto_1.StaffActionDto]),
    __metadata("design:returntype", Promise)
], StaffController.prototype, "restoreStaff", null);
__decorate([
    (0, common_1.Post)(':id/generate-qr'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Generate Staff Digital Identity QR token' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Staff Member Profile ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Generated QR Token details' }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], StaffController.prototype, "generateQr", null);
__decorate([
    (0, common_1.Post)(':id/assign-facility'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Assign staff member to primary / secondary facilities' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Staff Member Profile ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: staff_response_dto_1.StaffFullResponseDto }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, register_staff_dto_1.AssignStaffFacilityDto]),
    __metadata("design:returntype", Promise)
], StaffController.prototype, "assignFacility", null);
__decorate([
    (0, common_1.Post)(':id/assign-department'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Assign staff member to primary / secondary departments' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Staff Member Profile ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: staff_response_dto_1.StaffFullResponseDto }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, register_staff_dto_1.AssignStaffDepartmentDto]),
    __metadata("design:returntype", Promise)
], StaffController.prototype, "assignDepartment", null);
__decorate([
    (0, common_1.Get)(':id/documents'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'List attached staff credential documents' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Staff Member Profile ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: [staff_response_dto_1.StaffDocumentResponseDto] }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], StaffController.prototype, "getDocuments", null);
__decorate([
    (0, common_1.Post)(':id/documents'),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, swagger_1.ApiOperation)({ summary: 'Attach credential document (reusing MedicalAttachment)' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Staff Member Profile ID' }),
    (0, swagger_1.ApiResponse)({ status: 201, type: staff_response_dto_1.StaffDocumentResponseDto }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, register_staff_dto_1.AttachStaffDocumentDto]),
    __metadata("design:returntype", Promise)
], StaffController.prototype, "attachDocument", null);
__decorate([
    (0, common_1.Get)(':id/history'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Get complete verification & employment status history' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Staff Member Profile ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: [staff_response_dto_1.StaffHistoryItemDto] }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], StaffController.prototype, "getHistory", null);
exports.StaffController = StaffController = __decorate([
    (0, swagger_1.ApiTags)('Staff'),
    (0, common_1.Controller)('staff'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, swagger_1.ApiBearerAuth)('JWT-Auth'),
    __metadata("design:paramtypes", [staff_service_1.StaffService])
], StaffController);
//# sourceMappingURL=staff.controller.js.map
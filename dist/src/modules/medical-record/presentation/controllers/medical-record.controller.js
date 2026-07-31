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
exports.AttachmentController = exports.MedicalRecordController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const passport_1 = require("@nestjs/passport");
const medical_record_service_1 = require("../../application/use-cases/medical-record.service");
const create_medical_record_dto_1 = require("../dto/create-medical-record.dto");
const create_attachment_dto_1 = require("../dto/create-attachment.dto");
const medical_record_response_dto_1 = require("../dto/medical-record-response.dto");
let MedicalRecordController = class MedicalRecordController {
    constructor(service) {
        this.service = service;
    }
    async createRecord(req, dto) {
        return this.service.createRecord(req.user.userId, dto);
    }
    async getRecords(req) {
        return this.service.getRecords(req.user.userId);
    }
    async getTimeline(req) {
        return this.service.getTimeline(req.user.userId);
    }
    async searchRecords(req, query) {
        return this.service.searchRecords(req.user.userId, query);
    }
    async getRecordById(req, id) {
        return this.service.getRecordById(req.user.userId, id);
    }
    async updateRecord(req, id, dto) {
        return this.service.updateRecord(req.user.userId, id, dto);
    }
    async softDeleteRecord(req, id) {
        return this.service.softDeleteRecord(req.user.userId, id);
    }
    async archiveRecord(req, id) {
        return this.service.archiveRecord(req.user.userId, id);
    }
    async restoreRecord(req, id) {
        return this.service.restoreRecord(req.user.userId, id);
    }
    async uploadRecordAttachment(req, id, dto) {
        return this.service.uploadAttachment(req.user.userId, id, dto);
    }
    async getRecordAttachments(req, id) {
        return this.service.getRecordAttachments(req.user.userId, id);
    }
};
exports.MedicalRecordController = MedicalRecordController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new medical record with encounter, vitals, diagnosis, and procedures' }),
    (0, swagger_1.ApiResponse)({ status: 201, type: medical_record_response_dto_1.MedicalRecordResponseDto }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_medical_record_dto_1.CreateMedicalRecordDto]),
    __metadata("design:returntype", Promise)
], MedicalRecordController.prototype, "createRecord", null);
__decorate([
    (0, common_1.Get)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Get all medical records for the authenticated patient' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: [medical_record_response_dto_1.MedicalRecordResponseDto] }),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], MedicalRecordController.prototype, "getRecords", null);
__decorate([
    (0, common_1.Get)('timeline'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Get unified medical timeline combining records and attachments' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: [medical_record_response_dto_1.MedicalTimelineItemDto] }),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], MedicalRecordController.prototype, "getTimeline", null);
__decorate([
    (0, common_1.Get)('search'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Search medical records by title, complaints, notes, diagnosis, or plan' }),
    (0, swagger_1.ApiQuery)({ name: 'q', description: 'Search term', required: true }),
    (0, swagger_1.ApiResponse)({ status: 200, type: [medical_record_response_dto_1.MedicalRecordResponseDto] }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)('q')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], MedicalRecordController.prototype, "searchRecords", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Get a specific medical record by ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Medical Record ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: medical_record_response_dto_1.MedicalRecordResponseDto }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], MedicalRecordController.prototype, "getRecordById", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Update an existing medical record (blocked if ARCHIVED)' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Medical Record ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: medical_record_response_dto_1.MedicalRecordResponseDto }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, create_medical_record_dto_1.UpdateMedicalRecordDto]),
    __metadata("design:returntype", Promise)
], MedicalRecordController.prototype, "updateRecord", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Soft delete a medical record' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Medical Record ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Medical record soft-deleted' }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], MedicalRecordController.prototype, "softDeleteRecord", null);
__decorate([
    (0, common_1.Post)(':id/archive'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Archive a medical record (makes record immutable)' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Medical Record ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: medical_record_response_dto_1.MedicalRecordResponseDto }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], MedicalRecordController.prototype, "archiveRecord", null);
__decorate([
    (0, common_1.Post)(':id/restore'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Restore a soft-deleted or archived medical record' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Medical Record ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: medical_record_response_dto_1.MedicalRecordResponseDto }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], MedicalRecordController.prototype, "restoreRecord", null);
__decorate([
    (0, common_1.Post)(':id/attachments'),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, swagger_1.ApiOperation)({ summary: 'Upload and link an attachment to a specific medical record' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Medical Record ID' }),
    (0, swagger_1.ApiResponse)({ status: 201, type: medical_record_response_dto_1.MedicalAttachmentResponseDto }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, create_attachment_dto_1.CreateAttachmentDto]),
    __metadata("design:returntype", Promise)
], MedicalRecordController.prototype, "uploadRecordAttachment", null);
__decorate([
    (0, common_1.Get)(':id/attachments'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'List all attachments linked to a specific medical record' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Medical Record ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: [medical_record_response_dto_1.MedicalAttachmentResponseDto] }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], MedicalRecordController.prototype, "getRecordAttachments", null);
exports.MedicalRecordController = MedicalRecordController = __decorate([
    (0, swagger_1.ApiTags)('Medical Records'),
    (0, common_1.Controller)('medical-records'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, swagger_1.ApiBearerAuth)('JWT-Auth'),
    __metadata("design:paramtypes", [medical_record_service_1.MedicalRecordService])
], MedicalRecordController);
let AttachmentController = class AttachmentController {
    constructor(service) {
        this.service = service;
    }
    async uploadGlobalAttachment(req, dto) {
        return this.service.uploadAttachment(req.user.userId, null, dto);
    }
    async getAttachmentById(req, id) {
        return this.service.getAttachmentById(req.user.userId, id);
    }
    async updateAttachment(req, id, dto) {
        return this.service.updateAttachment(req.user.userId, id, dto);
    }
    async softDeleteAttachment(req, id) {
        return this.service.softDeleteAttachment(req.user.userId, id);
    }
    async restoreAttachment(req, id) {
        return this.service.restoreAttachment(req.user.userId, id);
    }
    async getAttachmentVersions(req, id) {
        return this.service.getAttachmentVersions(req.user.userId, id);
    }
};
exports.AttachmentController = AttachmentController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, swagger_1.ApiOperation)({ summary: 'Upload an unlinked or global attachment (reusable across system)' }),
    (0, swagger_1.ApiResponse)({ status: 201, type: medical_record_response_dto_1.MedicalAttachmentResponseDto }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_attachment_dto_1.CreateAttachmentDto]),
    __metadata("design:returntype", Promise)
], AttachmentController.prototype, "uploadGlobalAttachment", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Get attachment metadata by ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Attachment ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: medical_record_response_dto_1.MedicalAttachmentResponseDto }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], AttachmentController.prototype, "getAttachmentById", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Update attachment category, metadata, or upload a new file version' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Attachment ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: medical_record_response_dto_1.MedicalAttachmentResponseDto }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, create_attachment_dto_1.UpdateAttachmentDto]),
    __metadata("design:returntype", Promise)
], AttachmentController.prototype, "updateAttachment", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Soft-delete an attachment' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Attachment ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Attachment soft-deleted' }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], AttachmentController.prototype, "softDeleteAttachment", null);
__decorate([
    (0, common_1.Post)(':id/restore'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Restore a soft-deleted attachment' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Attachment ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: medical_record_response_dto_1.MedicalAttachmentResponseDto }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], AttachmentController.prototype, "restoreAttachment", null);
__decorate([
    (0, common_1.Get)(':id/versions'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Get file version history for an attachment' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Attachment ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: [medical_record_response_dto_1.AttachmentVersionResponseDto] }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], AttachmentController.prototype, "getAttachmentVersions", null);
exports.AttachmentController = AttachmentController = __decorate([
    (0, swagger_1.ApiTags)('Attachments Platform'),
    (0, common_1.Controller)('attachments'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, swagger_1.ApiBearerAuth)('JWT-Auth'),
    __metadata("design:paramtypes", [medical_record_service_1.MedicalRecordService])
], AttachmentController);
//# sourceMappingURL=medical-record.controller.js.map
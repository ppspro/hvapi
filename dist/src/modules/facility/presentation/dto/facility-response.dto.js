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
exports.FacilityStatsResponseDto = exports.FacilityHistoryItemDto = exports.FacilityFullResponseDto = exports.FacilityDocumentResponseDto = exports.AccreditationResponseDto = exports.LicenseResponseDto = exports.RoomResponseDto = exports.FullDepartmentResponseDto = exports.BranchResponseDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class BranchResponseDto {
}
exports.BranchResponseDto = BranchResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], BranchResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], BranchResponseDto.prototype, "branchName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true }),
    __metadata("design:type", String)
], BranchResponseDto.prototype, "branchCode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], BranchResponseDto.prototype, "address", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], BranchResponseDto.prototype, "city", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], BranchResponseDto.prototype, "state", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true }),
    __metadata("design:type", String)
], BranchResponseDto.prototype, "phone", void 0);
class FullDepartmentResponseDto {
}
exports.FullDepartmentResponseDto = FullDepartmentResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], FullDepartmentResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], FullDepartmentResponseDto.prototype, "facilityId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], FullDepartmentResponseDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true }),
    __metadata("design:type", String)
], FullDepartmentResponseDto.prototype, "code", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true }),
    __metadata("design:type", String)
], FullDepartmentResponseDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true }),
    __metadata("design:type", String)
], FullDepartmentResponseDto.prototype, "departmentHead", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true }),
    __metadata("design:type", String)
], FullDepartmentResponseDto.prototype, "operatingHours", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], FullDepartmentResponseDto.prototype, "createdAt", void 0);
class RoomResponseDto {
}
exports.RoomResponseDto = RoomResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], RoomResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], RoomResponseDto.prototype, "facilityId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true }),
    __metadata("design:type", String)
], RoomResponseDto.prototype, "departmentId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], RoomResponseDto.prototype, "roomNumber", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true }),
    __metadata("design:type", String)
], RoomResponseDto.prototype, "roomName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true }),
    __metadata("design:type", String)
], RoomResponseDto.prototype, "building", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true }),
    __metadata("design:type", String)
], RoomResponseDto.prototype, "block", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true }),
    __metadata("design:type", String)
], RoomResponseDto.prototype, "floor", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true }),
    __metadata("design:type", String)
], RoomResponseDto.prototype, "wing", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], RoomResponseDto.prototype, "roomCategory", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], RoomResponseDto.prototype, "capacity", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Boolean)
], RoomResponseDto.prototype, "isOperational", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], RoomResponseDto.prototype, "createdAt", void 0);
class LicenseResponseDto {
}
exports.LicenseResponseDto = LicenseResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], LicenseResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], LicenseResponseDto.prototype, "licenseType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], LicenseResponseDto.prototype, "licenseNumber", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], LicenseResponseDto.prototype, "issuingAuthority", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true }),
    __metadata("design:type", String)
], LicenseResponseDto.prototype, "issueDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true }),
    __metadata("design:type", String)
], LicenseResponseDto.prototype, "expiryDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true }),
    __metadata("design:type", String)
], LicenseResponseDto.prototype, "renewalDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], LicenseResponseDto.prototype, "verificationStatus", void 0);
class AccreditationResponseDto {
}
exports.AccreditationResponseDto = AccreditationResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], AccreditationResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], AccreditationResponseDto.prototype, "accreditationBody", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], AccreditationResponseDto.prototype, "certificateNumber", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true }),
    __metadata("design:type", String)
], AccreditationResponseDto.prototype, "validFrom", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true }),
    __metadata("design:type", String)
], AccreditationResponseDto.prototype, "validTo", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], AccreditationResponseDto.prototype, "status", void 0);
class FacilityDocumentResponseDto {
}
exports.FacilityDocumentResponseDto = FacilityDocumentResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], FacilityDocumentResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], FacilityDocumentResponseDto.prototype, "documentType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true }),
    __metadata("design:type", String)
], FacilityDocumentResponseDto.prototype, "medicalAttachmentId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], FacilityDocumentResponseDto.prototype, "verificationStatus", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], FacilityDocumentResponseDto.prototype, "createdAt", void 0);
class FacilityFullResponseDto {
}
exports.FacilityFullResponseDto = FacilityFullResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], FacilityFullResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], FacilityFullResponseDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true }),
    __metadata("design:type", String)
], FacilityFullResponseDto.prototype, "legalName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], FacilityFullResponseDto.prototype, "facilityCode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], FacilityFullResponseDto.prototype, "registrationNumber", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], FacilityFullResponseDto.prototype, "facilityType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], FacilityFullResponseDto.prototype, "ownershipType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true }),
    __metadata("design:type", String)
], FacilityFullResponseDto.prototype, "buildingName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], FacilityFullResponseDto.prototype, "streetAddress", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], FacilityFullResponseDto.prototype, "city", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true }),
    __metadata("design:type", String)
], FacilityFullResponseDto.prototype, "district", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], FacilityFullResponseDto.prototype, "state", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], FacilityFullResponseDto.prototype, "country", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true }),
    __metadata("design:type", String)
], FacilityFullResponseDto.prototype, "pinCode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true }),
    __metadata("design:type", Number)
], FacilityFullResponseDto.prototype, "latitude", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true }),
    __metadata("design:type", Number)
], FacilityFullResponseDto.prototype, "longitude", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], FacilityFullResponseDto.prototype, "timezone", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], FacilityFullResponseDto.prototype, "phone", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true }),
    __metadata("design:type", String)
], FacilityFullResponseDto.prototype, "emergencyPhone", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true }),
    __metadata("design:type", String)
], FacilityFullResponseDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true }),
    __metadata("design:type", String)
], FacilityFullResponseDto.prototype, "website", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true }),
    __metadata("design:type", String)
], FacilityFullResponseDto.prototype, "profilePhotoUrl", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], FacilityFullResponseDto.prototype, "verificationStatus", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true }),
    __metadata("design:type", String)
], FacilityFullResponseDto.prototype, "verificationNotes", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true }),
    __metadata("design:type", String)
], FacilityFullResponseDto.prototype, "verifiedBy", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true }),
    __metadata("design:type", String)
], FacilityFullResponseDto.prototype, "verifiedAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Boolean)
], FacilityFullResponseDto.prototype, "isDeleted", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [BranchResponseDto] }),
    __metadata("design:type", Array)
], FacilityFullResponseDto.prototype, "branches", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [FullDepartmentResponseDto] }),
    __metadata("design:type", Array)
], FacilityFullResponseDto.prototype, "departments", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [RoomResponseDto] }),
    __metadata("design:type", Array)
], FacilityFullResponseDto.prototype, "rooms", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [LicenseResponseDto] }),
    __metadata("design:type", Array)
], FacilityFullResponseDto.prototype, "licenses", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [AccreditationResponseDto] }),
    __metadata("design:type", Array)
], FacilityFullResponseDto.prototype, "accreditations", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [FacilityDocumentResponseDto] }),
    __metadata("design:type", Array)
], FacilityFullResponseDto.prototype, "documents", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true }),
    __metadata("design:type", String)
], FacilityFullResponseDto.prototype, "qrToken", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], FacilityFullResponseDto.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], FacilityFullResponseDto.prototype, "updatedAt", void 0);
class FacilityHistoryItemDto {
}
exports.FacilityHistoryItemDto = FacilityHistoryItemDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], FacilityHistoryItemDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], FacilityHistoryItemDto.prototype, "facilityId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], FacilityHistoryItemDto.prototype, "action", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true }),
    __metadata("design:type", String)
], FacilityHistoryItemDto.prototype, "previousStatus", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], FacilityHistoryItemDto.prototype, "newStatus", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true }),
    __metadata("design:type", String)
], FacilityHistoryItemDto.prototype, "reason", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true }),
    __metadata("design:type", String)
], FacilityHistoryItemDto.prototype, "performedBy", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], FacilityHistoryItemDto.prototype, "createdAt", void 0);
class FacilityStatsResponseDto {
}
exports.FacilityStatsResponseDto = FacilityStatsResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], FacilityStatsResponseDto.prototype, "totalFacilities", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], FacilityStatsResponseDto.prototype, "verifiedFacilities", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], FacilityStatsResponseDto.prototype, "pendingFacilities", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], FacilityStatsResponseDto.prototype, "suspendedFacilities", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], FacilityStatsResponseDto.prototype, "totalDepartments", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], FacilityStatsResponseDto.prototype, "totalRooms", void 0);
//# sourceMappingURL=facility-response.dto.js.map
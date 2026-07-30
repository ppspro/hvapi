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
exports.PatientController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const passport_1 = require("@nestjs/passport");
const patient_service_1 = require("../../application/use-cases/patient.service");
const onboard_demographics_dto_1 = require("../dto/onboard-demographics.dto");
const onboard_emergency_info_dto_1 = require("../dto/onboard-emergency-info.dto");
const onboard_family_invite_dto_1 = require("../dto/onboard-family-invite.dto");
const update_family_consent_dto_1 = require("../dto/update-family-consent.dto");
const patient_profile_dto_1 = require("../dto/patient-profile.dto");
let PatientController = class PatientController {
    constructor(patientService) {
        this.patientService = patientService;
    }
    async onboardDemographics(req, dto) {
        return this.patientService.onboardDemographics(req.user.userId, dto);
    }
    async onboardEmergencyInfo(req, dto) {
        return this.patientService.onboardEmergencyInfo(req.user.userId, dto);
    }
    async onboardFamilyInvite(req, dto) {
        return this.patientService.onboardFamilyInvite(req.user.userId, dto);
    }
    async updateFamilyConsent(consentId, dto) {
        return this.patientService.updateFamilyConsent(consentId, dto);
    }
    async getProfile(req) {
        return this.patientService.getProfile(req.user.userId);
    }
    async updateProfile(req, dto) {
        return this.patientService.updateProfile(req.user.userId, dto);
    }
};
exports.PatientController = PatientController;
__decorate([
    (0, common_1.Post)('onboarding/demographics'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Step 2: Patient Demographic Registration' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: onboard_demographics_dto_1.OnboardDemographicsResponseDto }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, onboard_demographics_dto_1.OnboardDemographicsDto]),
    __metadata("design:returntype", Promise)
], PatientController.prototype, "onboardDemographics", null);
__decorate([
    (0, common_1.Post)('onboarding/emergency-info'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Step 3: Emergency Contact Info' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: onboard_emergency_info_dto_1.OnboardEmergencyInfoResponseDto }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, onboard_emergency_info_dto_1.OnboardEmergencyInfoDto]),
    __metadata("design:returntype", Promise)
], PatientController.prototype, "onboardEmergencyInfo", null);
__decorate([
    (0, common_1.Post)('onboarding/family-invite'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Step 6: Family Account Linkage Request' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: onboard_family_invite_dto_1.OnboardFamilyInviteResponseDto }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, onboard_family_invite_dto_1.OnboardFamilyInviteDto]),
    __metadata("design:returntype", Promise)
], PatientController.prototype, "onboardFamilyInvite", null);
__decorate([
    (0, common_1.Patch)('family-consents/:id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Accept / Reject Family Linkage Consent' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: update_family_consent_dto_1.UpdateFamilyConsentResponseDto }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_family_consent_dto_1.UpdateFamilyConsentDto]),
    __metadata("design:returntype", Promise)
], PatientController.prototype, "updateFamilyConsent", null);
__decorate([
    (0, common_1.Get)('me'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Get Patient Profile Details' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: patient_profile_dto_1.PatientProfileResponseDto }),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PatientController.prototype, "getProfile", null);
__decorate([
    (0, common_1.Put)('me'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Update Patient Profile' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: patient_profile_dto_1.PatientProfileResponseDto }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, onboard_demographics_dto_1.OnboardDemographicsDto]),
    __metadata("design:returntype", Promise)
], PatientController.prototype, "updateProfile", null);
exports.PatientController = PatientController = __decorate([
    (0, swagger_1.ApiTags)('Patients'),
    (0, common_1.Controller)('patients'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, swagger_1.ApiBearerAuth)('JWT-Auth'),
    __metadata("design:paramtypes", [patient_service_1.PatientService])
], PatientController);
//# sourceMappingURL=patient.controller.js.map
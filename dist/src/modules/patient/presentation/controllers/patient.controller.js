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
const register_patient_dto_1 = require("../dto/register-patient.dto");
const onboard_insurance_dto_1 = require("../dto/onboard-insurance.dto");
const onboard_health_card_dto_1 = require("../dto/onboard-health-card.dto");
const onboarding_progress_dto_1 = require("../dto/onboarding-progress.dto");
const update_basic_info_dto_1 = require("../dto/update-basic-info.dto");
const update_contact_dto_1 = require("../dto/update-contact.dto");
const update_address_dto_1 = require("../dto/update-address.dto");
const update_preferences_dto_1 = require("../dto/update-preferences.dto");
const update_medical_summary_dto_1 = require("../dto/update-medical-summary.dto");
const full_patient_profile_dto_1 = require("../dto/full-patient-profile.dto");
const profile_completion_dto_1 = require("../dto/profile-completion.dto");
let PatientController = class PatientController {
    constructor(patientService) {
        this.patientService = patientService;
    }
    async register(req) {
        return this.patientService.register(req.user.userId);
    }
    async getRegistrationStatus(req) {
        return this.patientService.getRegistrationStatus(req.user.userId);
    }
    async resumeRegistration(req, step) {
        return this.patientService.resumeRegistration(req.user.userId, parseInt(step || '1', 10));
    }
    async onboardDemographics(req, dto) {
        return this.patientService.onboardDemographics(req.user.userId, dto);
    }
    async updateDemographics(req, dto) {
        return this.patientService.onboardDemographics(req.user.userId, dto);
    }
    async onboardEmergencyContact(req, dto) {
        return this.patientService.onboardEmergencyInfo(req.user.userId, dto);
    }
    async updateEmergencyContact(req, dto) {
        return this.patientService.onboardEmergencyInfo(req.user.userId, dto);
    }
    async onboardInsurance(req, dto) {
        return this.patientService.onboardInsurance(req.user.userId, dto);
    }
    async updateInsurance(req, dto) {
        return this.patientService.onboardInsurance(req.user.userId, dto);
    }
    async onboardHealthCard(req) {
        return this.patientService.onboardHealthCard(req.user.userId);
    }
    async onboardFamilyInvite(req, dto) {
        return this.patientService.onboardFamilyInvite(req.user.userId, dto);
    }
    async getOnboardingProgress(req) {
        return this.patientService.getOnboardingProgress(req.user.userId);
    }
    async completeOnboarding(req) {
        return this.patientService.completeOnboarding(req.user.userId);
    }
    async getCompletionPercentage(req) {
        const progress = await this.patientService.getOnboardingProgress(req.user.userId);
        return { completionPercentage: progress.completionPercentage };
    }
    async getProfile(req) {
        return this.patientService.getProfile(req.user.userId);
    }
    async updateProfile(req, dto) {
        return this.patientService.updateProfile(req.user.userId, dto);
    }
    async updateFamilyConsent(consentId, dto) {
        return this.patientService.updateFamilyConsent(consentId, dto);
    }
    async getFullProfile(req) {
        return this.patientService.getFullProfile(req.user.userId);
    }
    async updateBasicInfo(req, dto) {
        return this.patientService.updateBasicInfo(req.user.userId, dto);
    }
    async updateContact(req, dto) {
        return this.patientService.updateContact(req.user.userId, dto);
    }
    async updateAddress(req, dto) {
        return this.patientService.updateAddress(req.user.userId, dto);
    }
    async updatePreferences(req, dto) {
        return this.patientService.updatePreferences(req.user.userId, dto);
    }
    async updateMedicalSummary(req, dto) {
        return this.patientService.updateMedicalSummary(req.user.userId, dto);
    }
    async uploadPhoto(req, body) {
        return this.patientService.uploadPhoto(req.user.userId, body.photoUrl, body.photoKey);
    }
    async deletePhoto(req) {
        return this.patientService.deletePhoto(req.user.userId);
    }
    async getProfileCompletion(req) {
        return this.patientService.getProfileCompletion(req.user.userId);
    }
    async getProfileTimeline(req) {
        return this.patientService.getProfileTimeline(req.user.userId);
    }
    async getProfileActivity(req) {
        return this.patientService.getProfileActivity(req.user.userId);
    }
};
exports.PatientController = PatientController;
__decorate([
    (0, common_1.Post)('register'),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, swagger_1.ApiOperation)({ summary: 'Step 1: Initialize Patient Draft Registration' }),
    (0, swagger_1.ApiResponse)({ status: 201, type: register_patient_dto_1.RegisterPatientResponseDto }),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PatientController.prototype, "register", null);
__decorate([
    (0, common_1.Get)('register/status'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Check Draft Registration Progress Status' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Current registration phase status' }),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PatientController.prototype, "getRegistrationStatus", null);
__decorate([
    (0, common_1.Patch)('register/resume'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Resume and update registration progress' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Resumed registration details' }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)('step')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], PatientController.prototype, "resumeRegistration", null);
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
    (0, common_1.Put)('onboarding/demographics'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Step 2: Update Demographics Details' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: onboard_demographics_dto_1.OnboardDemographicsResponseDto }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, onboard_demographics_dto_1.OnboardDemographicsDto]),
    __metadata("design:returntype", Promise)
], PatientController.prototype, "updateDemographics", null);
__decorate([
    (0, common_1.Post)('onboarding/emergency-contact'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Step 3: Save Emergency Contact' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: onboard_emergency_info_dto_1.OnboardEmergencyInfoResponseDto }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, onboard_emergency_info_dto_1.OnboardEmergencyInfoDto]),
    __metadata("design:returntype", Promise)
], PatientController.prototype, "onboardEmergencyContact", null);
__decorate([
    (0, common_1.Put)('onboarding/emergency-contact'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Step 3: Update Emergency Contact' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: onboard_emergency_info_dto_1.OnboardEmergencyInfoResponseDto }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, onboard_emergency_info_dto_1.OnboardEmergencyInfoDto]),
    __metadata("design:returntype", Promise)
], PatientController.prototype, "updateEmergencyContact", null);
__decorate([
    (0, common_1.Post)('onboarding/insurance'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Step 4: Save Primary/Secondary Insurance Link' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: onboard_insurance_dto_1.OnboardInsuranceResponseDto }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, onboard_insurance_dto_1.OnboardInsuranceDto]),
    __metadata("design:returntype", Promise)
], PatientController.prototype, "onboardInsurance", null);
__decorate([
    (0, common_1.Put)('onboarding/insurance'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Step 4: Update Insurance Details' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: onboard_insurance_dto_1.OnboardInsuranceResponseDto }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, onboard_insurance_dto_1.OnboardInsuranceDto]),
    __metadata("design:returntype", Promise)
], PatientController.prototype, "updateInsurance", null);
__decorate([
    (0, common_1.Post)('onboarding/health-card'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Step 5: Initialize Secure Digital Health Card' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: onboard_health_card_dto_1.OnboardHealthCardResponseDto }),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PatientController.prototype, "onboardHealthCard", null);
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
    (0, common_1.Get)('onboarding/progress'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Get Step-by-Step Onboarding Progress Checklist' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: onboarding_progress_dto_1.OnboardingProgressResponseDto }),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PatientController.prototype, "getOnboardingProgress", null);
__decorate([
    (0, common_1.Post)('onboarding/complete'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Finalize and Complete Onboarding Registration' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Final onboarding status transition completed successfully' }),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PatientController.prototype, "completeOnboarding", null);
__decorate([
    (0, common_1.Get)('profile/completion'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Get overall Patient Profile Completion percentage' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Completion percentage value' }),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PatientController.prototype, "getCompletionPercentage", null);
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
    (0, common_1.Get)('me/full'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Get Full Patient Profile with all extended fields' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: full_patient_profile_dto_1.FullPatientProfileResponseDto }),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PatientController.prototype, "getFullProfile", null);
__decorate([
    (0, common_1.Patch)('me/basic'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Update Basic Patient Information (name, DOB, gender, nationality, etc.)' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: full_patient_profile_dto_1.FullPatientProfileResponseDto }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, update_basic_info_dto_1.UpdateBasicInfoDto]),
    __metadata("design:returntype", Promise)
], PatientController.prototype, "updateBasicInfo", null);
__decorate([
    (0, common_1.Patch)('me/contact'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Update Contact Preferences' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Contact preferences updated' }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, update_contact_dto_1.UpdateContactDto]),
    __metadata("design:returntype", Promise)
], PatientController.prototype, "updateContact", null);
__decorate([
    (0, common_1.Patch)('me/address'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Update Current and Permanent Address' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Address updated' }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, update_address_dto_1.UpdateAddressDto]),
    __metadata("design:returntype", Promise)
], PatientController.prototype, "updateAddress", null);
__decorate([
    (0, common_1.Patch)('me/preferences'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Update Communication Preferences and Privacy Settings' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Communication preferences updated' }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, update_preferences_dto_1.UpdatePreferencesDto]),
    __metadata("design:returntype", Promise)
], PatientController.prototype, "updatePreferences", null);
__decorate([
    (0, common_1.Patch)('me/medical-summary'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Update Medical Summary (blood group, allergies, conditions, disabilities)' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Medical summary updated' }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, update_medical_summary_dto_1.UpdateMedicalSummaryDto]),
    __metadata("design:returntype", Promise)
], PatientController.prototype, "updateMedicalSummary", null);
__decorate([
    (0, common_1.Post)('me/photo'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Upload or Replace Profile Photo (provide photoUrl and photoKey)' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Profile photo uploaded' }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], PatientController.prototype, "uploadPhoto", null);
__decorate([
    (0, common_1.Delete)('me/photo'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Delete Profile Photo' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Profile photo deleted' }),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PatientController.prototype, "deletePhoto", null);
__decorate([
    (0, common_1.Get)('profile/completion'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Get Patient Profile Completion Status with section breakdown' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: profile_completion_dto_1.ProfileCompletionResponseDto }),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PatientController.prototype, "getProfileCompletion", null);
__decorate([
    (0, common_1.Get)('profile/timeline'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Get Patient Profile Change Timeline' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: profile_completion_dto_1.ProfileTimelineResponseDto }),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PatientController.prototype, "getProfileTimeline", null);
__decorate([
    (0, common_1.Get)('profile/activity'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Get Patient Profile Activity Summary' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Profile activity summary' }),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PatientController.prototype, "getProfileActivity", null);
exports.PatientController = PatientController = __decorate([
    (0, swagger_1.ApiTags)('Patients'),
    (0, common_1.Controller)('patients'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, swagger_1.ApiBearerAuth)('JWT-Auth'),
    __metadata("design:paramtypes", [patient_service_1.PatientService])
], PatientController);
//# sourceMappingURL=patient.controller.js.map
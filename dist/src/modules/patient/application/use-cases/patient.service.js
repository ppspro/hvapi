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
exports.PatientService = void 0;
const common_1 = require("@nestjs/common");
let PatientService = class PatientService {
    constructor(patientRepository) {
        this.patientRepository = patientRepository;
    }
    async onboardDemographics(userId, dto) {
        let profile = await this.patientRepository.findProfileByUserId(userId);
        if (!profile) {
            profile = await this.patientRepository.createProfile(userId, {
                firstName: dto.firstName,
                lastName: dto.lastName,
                dateOfBirth: new Date(dto.dateOfBirth),
                gender: dto.gender,
                bloodGroup: dto.bloodGroup,
                address: dto.address,
            });
        }
        else {
            profile = await this.patientRepository.updateProfile(profile.id, {
                firstName: dto.firstName,
                lastName: dto.lastName,
                dateOfBirth: new Date(dto.dateOfBirth),
                gender: dto.gender,
                bloodGroup: dto.bloodGroup,
                address: dto.address,
                onboardingStep: 2,
            });
        }
        return {
            profileId: profile.id,
            message: 'Demographics onboarding completed successfully',
            nextStep: 3,
        };
    }
    async onboardEmergencyInfo(userId, dto) {
        const profile = await this.patientRepository.findProfileByUserId(userId);
        if (!profile) {
            throw new common_1.NotFoundException('Patient profile not found. Complete demographics step first.');
        }
        let contact = await this.patientRepository.findEmergencyContactByProfileId(profile.id);
        if (!contact) {
            contact = await this.patientRepository.createEmergencyContact(profile.id, {
                name: dto.name,
                relationship: dto.relationship,
                phone: dto.phone,
            });
        }
        else {
            contact = await this.patientRepository.updateEmergencyContact(profile.id, {
                name: dto.name,
                relationship: dto.relationship,
                phone: dto.phone,
            });
        }
        await this.patientRepository.updateProfile(profile.id, { onboardingStep: 3 });
        return {
            contactId: contact.id,
            message: 'Emergency information onboarding completed successfully',
            nextStep: 4,
        };
    }
    async onboardFamilyInvite(userId, dto) {
        const profile = await this.patientRepository.findProfileByUserId(userId);
        if (!profile) {
            throw new common_1.NotFoundException('Patient profile not found');
        }
        const consent = await this.patientRepository.createFamilyConsent(profile.id, dto.inviteePhone, dto.relationship);
        await this.patientRepository.updateProfile(profile.id, { onboardingStep: 7 });
        return {
            consentId: consent.id,
            message: 'Family invitation sent successfully',
            nextStep: 7,
        };
    }
    async updateFamilyConsent(consentId, dto) {
        const consent = await this.patientRepository.findConsentById(consentId);
        if (!consent) {
            throw new common_1.NotFoundException('Consent invitation not found');
        }
        if (consent.status !== 'PENDING') {
            throw new common_1.BadRequestException('Consent status has already been decided');
        }
        await this.patientRepository.updateConsentStatus(consentId, dto.status);
        if (dto.status === 'ACCEPTED') {
            await this.patientRepository.createFamilyMember(consent.patientProfileId, 'Family Member', consent.relationship, consent.inviteePhone);
        }
        return {
            success: true,
            message: `Consent invitation updated to ${dto.status} successfully`,
        };
    }
    async getProfile(userId) {
        const profile = await this.patientRepository.findProfileByUserId(userId);
        if (!profile) {
            throw new common_1.NotFoundException('Patient profile not found');
        }
        return {
            id: profile.id,
            firstName: profile.firstName,
            lastName: profile.lastName,
            dateOfBirth: profile.dateOfBirth.toISOString().split('T')[0],
            gender: profile.gender,
            bloodGroup: profile.bloodGroup || undefined,
            address: profile.address || undefined,
            onboardingStep: profile.onboardingStep,
        };
    }
    async updateProfile(userId, dto) {
        const profile = await this.patientRepository.findProfileByUserId(userId);
        if (!profile) {
            throw new common_1.NotFoundException('Patient profile not found');
        }
        const updated = await this.patientRepository.updateProfile(profile.id, {
            firstName: dto.firstName,
            lastName: dto.lastName,
            dateOfBirth: dto.dateOfBirth ? new Date(dto.dateOfBirth) : undefined,
            gender: dto.gender,
            bloodGroup: dto.bloodGroup,
            address: dto.address,
        });
        return {
            id: updated.id,
            firstName: updated.firstName,
            lastName: updated.lastName,
            dateOfBirth: updated.dateOfBirth.toISOString().split('T')[0],
            gender: updated.gender,
            bloodGroup: updated.bloodGroup || undefined,
            address: updated.address || undefined,
            onboardingStep: updated.onboardingStep,
        };
    }
};
exports.PatientService = PatientService;
exports.PatientService = PatientService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('IPatientRepository')),
    __metadata("design:paramtypes", [Object])
], PatientService);
//# sourceMappingURL=patient.service.js.map
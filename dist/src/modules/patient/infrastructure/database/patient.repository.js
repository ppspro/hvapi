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
exports.PatientRepository = void 0;
const common_1 = require("@nestjs/common");
const database_service_1 = require("../../../../database/database.service");
let PatientRepository = class PatientRepository {
    constructor(db) {
        this.db = db;
    }
    async findProfileByUserId(userId) {
        return (await this.db.patientProfile.findUnique({
            where: { userId },
        }));
    }
    async findProfileById(profileId) {
        return (await this.db.patientProfile.findUnique({
            where: { id: profileId },
        }));
    }
    async createProfile(userId, data) {
        return (await this.db.patientProfile.create({
            data: {
                userId,
                firstName: data.firstName,
                lastName: data.lastName,
                dateOfBirth: new Date(data.dateOfBirth),
                gender: data.gender,
                bloodGroup: data.bloodGroup || null,
                address: data.address || null,
                onboardingStep: 2,
            },
        }));
    }
    async updateProfile(profileId, data) {
        const updateData = { ...data };
        if (data.dateOfBirth) {
            updateData.dateOfBirth = new Date(data.dateOfBirth);
        }
        return (await this.db.patientProfile.update({
            where: { id: profileId },
            data: updateData,
        }));
    }
    async createEmergencyContact(profileId, data) {
        return (await this.db.emergencyContact.create({
            data: {
                patientProfileId: profileId,
                name: data.name,
                relationship: data.relationship,
                phone: data.phone,
            },
        }));
    }
    async updateEmergencyContact(profileId, data) {
        return (await this.db.emergencyContact.update({
            where: { patientProfileId: profileId },
            data,
        }));
    }
    async findEmergencyContactByProfileId(profileId) {
        return (await this.db.emergencyContact.findUnique({
            where: { patientProfileId: profileId },
        }));
    }
    async createFamilyConsent(profileId, inviteePhone, relationship) {
        return (await this.db.familyConsent.create({
            data: {
                patientProfileId: profileId,
                inviteePhone,
                relationship,
                status: 'PENDING',
            },
        }));
    }
    async findConsentById(consentId) {
        return (await this.db.familyConsent.findUnique({
            where: { id: consentId },
        }));
    }
    async updateConsentStatus(consentId, status) {
        return (await this.db.familyConsent.update({
            where: { id: consentId },
            data: { status },
        }));
    }
    async createFamilyMember(profileId, fullName, relationship, phone) {
        return (await this.db.familyMember.create({
            data: {
                patientProfileId: profileId,
                fullName,
                relationship,
                phone,
            },
        }));
    }
};
exports.PatientRepository = PatientRepository;
exports.PatientRepository = PatientRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [database_service_1.DatabaseService])
], PatientRepository);
//# sourceMappingURL=patient.repository.js.map
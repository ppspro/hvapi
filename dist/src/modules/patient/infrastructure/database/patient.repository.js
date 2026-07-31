"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
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
                patientNumber: data.patientNumber || null,
                firstName: data.firstName || null,
                lastName: data.lastName || null,
                dateOfBirth: data.dateOfBirth ? new Date(data.dateOfBirth) : null,
                gender: data.gender || null,
                bloodGroup: data.bloodGroup || null,
                address: data.address || null,
                onboardingStep: data.onboardingStep || 1,
                status: data.status || 'DRAFT',
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
    async createInsurancePolicy(profileId, data) {
        return await this.db.insurancePolicy.create({
            data: {
                patientProfileId: profileId,
                providerName: data.providerName,
                policyNumber: data.policyNumber,
                coverageDetails: data.coverageDetails || null,
                expiryDate: data.expiryDate ? new Date(data.expiryDate) : null,
                secondaryProvider: data.secondaryProvider || null,
                secondaryPolicyNumber: data.secondaryPolicyNumber || null,
                secondaryCoverage: data.secondaryCoverage || null,
                verificationStatus: data.verificationStatus || 'PENDING',
            },
        });
    }
    async updateInsurancePolicy(profileId, data) {
        const updateData = { ...data };
        if (data.expiryDate) {
            updateData.expiryDate = new Date(data.expiryDate);
        }
        return await this.db.insurancePolicy.update({
            where: { patientProfileId: profileId },
            data: updateData,
        });
    }
    async findInsurancePolicyByProfileId(profileId) {
        return await this.db.insurancePolicy.findUnique({
            where: { patientProfileId: profileId },
        });
    }
    async createHealthCard(profileId, data) {
        return await this.db.healthCard.create({
            data: {
                patientProfileId: profileId,
                cardNumber: data.cardNumber,
                status: data.status || 'ACTIVE',
                issuedAt: data.issuedAt ? new Date(data.issuedAt) : new Date(),
                expiresAt: new Date(data.expiresAt),
            },
        });
    }
    async findHealthCardByProfileId(profileId) {
        return await this.db.healthCard.findUnique({
            where: { patientProfileId: profileId },
        });
    }
    async createFamilyConsent(profileId, inviteePhone, relationship) {
        const { randomUUID } = await Promise.resolve().then(() => __importStar(require('crypto')));
        return (await this.db.familyConsent.create({
            data: {
                patientProfileId: profileId,
                inviteePhone,
                relationship,
                invitationToken: randomUUID(),
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
    async createProfileAuditLog(profileId, action, fieldChanged, previousValue, newValue, performedByUserId) {
        await this.db.profileAuditLog.create({
            data: {
                patientProfileId: profileId,
                action,
                fieldChanged: fieldChanged || null,
                previousValue: previousValue || null,
                newValue: newValue || null,
                performedByUserId: performedByUserId || null,
            },
        });
    }
    async findProfileAuditLogs(profileId) {
        return await this.db.profileAuditLog.findMany({
            where: { patientProfileId: profileId },
            orderBy: { createdAt: 'desc' },
            take: 50,
        });
    }
};
exports.PatientRepository = PatientRepository;
exports.PatientRepository = PatientRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [database_service_1.DatabaseService])
], PatientRepository);
//# sourceMappingURL=patient.repository.js.map
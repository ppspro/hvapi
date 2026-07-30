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
exports.InsuranceRepository = void 0;
const common_1 = require("@nestjs/common");
const database_service_1 = require("../../../../database/database.service");
let InsuranceRepository = class InsuranceRepository {
    constructor(db) {
        this.db = db;
    }
    async findProfileByUserId(userId) {
        return this.db.patientProfile.findUnique({
            where: { userId },
            select: { id: true },
        });
    }
    async findPolicyByProfileId(profileId) {
        return (await this.db.insurancePolicy.findUnique({
            where: { patientProfileId: profileId },
        }));
    }
    async createPolicy(profileId, providerName, policyNumber, coverageDetails) {
        return (await this.db.insurancePolicy.create({
            data: {
                patientProfileId: profileId,
                providerName,
                policyNumber,
                coverageDetails: coverageDetails || null,
            },
        }));
    }
    async updatePolicy(policyId, providerName, policyNumber, coverageDetails) {
        return (await this.db.insurancePolicy.update({
            where: { id: policyId },
            data: {
                providerName,
                policyNumber,
                coverageDetails: coverageDetails || null,
            },
        }));
    }
    async createOcrRecord(profileId, imageUrl, extractedData) {
        return (await this.db.insuranceOcrRecord.create({
            data: {
                patientProfileId: profileId,
                imageUrl,
                extractedData,
                isConfirmed: false,
            },
        }));
    }
    async findOcrRecordById(ocrId) {
        return (await this.db.insuranceOcrRecord.findUnique({
            where: { id: ocrId },
        }));
    }
    async confirmOcrRecord(ocrId) {
        await this.db.insuranceOcrRecord.update({
            where: { id: ocrId },
            data: { isConfirmed: true },
        });
    }
};
exports.InsuranceRepository = InsuranceRepository;
exports.InsuranceRepository = InsuranceRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [database_service_1.DatabaseService])
], InsuranceRepository);
//# sourceMappingURL=insurance.repository.js.map
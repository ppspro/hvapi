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
exports.ImmunisationRepository = void 0;
const common_1 = require("@nestjs/common");
const database_service_1 = require("../../../../database/database.service");
let ImmunisationRepository = class ImmunisationRepository {
    constructor(db) {
        this.db = db;
    }
    async findProfileByUserId(userId) {
        return this.db.patientProfile.findUnique({ where: { userId }, select: { id: true } });
    }
    async createVaccine(data) {
        return (await this.db.vaccine.create({
            data: {
                name: data.name,
                code: data.code,
                manufacturer: data.manufacturer || null,
                targetGroup: data.targetGroup || 'ALL',
                minAgeMonths: data.minAgeMonths || 0,
                maxAgeMonths: data.maxAgeMonths || null,
                totalDosesRequired: data.totalDosesRequired || 1,
                minIntervalDays: data.minIntervalDays || 0,
                description: data.description || null,
                contraindications: data.contraindications || [],
                isActive: data.isActive ?? true,
            },
        }));
    }
    async findVaccines() {
        return (await this.db.vaccine.findMany({
            where: { isActive: true },
            orderBy: { name: 'asc' },
        }));
    }
    async findVaccineById(id) {
        return (await this.db.vaccine.findUnique({
            where: { id },
        }));
    }
    async createSchedule(data) {
        return (await this.db.vaccinationSchedule.create({
            data: {
                vaccineId: data.vaccineId,
                name: data.name,
                doseNumber: data.doseNumber,
                recommendedAgeMonths: data.recommendedAgeMonths,
                isBooster: data.isBooster ?? false,
                boosterIntervalDays: data.boosterIntervalDays || null,
            },
        }));
    }
    async findSchedules(vaccineId) {
        return (await this.db.vaccinationSchedule.findMany({
            where: vaccineId ? { vaccineId } : {},
            orderBy: { doseNumber: 'asc' },
        }));
    }
    async createRecord(data) {
        const record = await this.db.vaccinationRecord.create({
            data: {
                patientProfileId: data.patientProfileId,
                vaccineId: data.vaccineId,
                scheduleId: data.scheduleId || null,
                doseNumber: data.doseNumber || 1,
                status: data.status || 'SCHEDULED',
                dueDate: data.dueDate ? new Date(data.dueDate) : null,
                administeredDate: data.administeredDate ? new Date(data.administeredDate) : null,
                administeredBy: data.administeredBy || null,
                facilityName: data.facilityName || null,
                batchNumber: data.batchNumber || null,
                lotNumber: data.lotNumber || null,
                expirationDate: data.expirationDate ? new Date(data.expirationDate) : null,
                siteOfInjection: data.siteOfInjection || null,
                routeOfAdmin: data.routeOfAdmin || null,
                notes: data.notes || null,
            },
            include: { vaccine: true, schedule: true, certificates: true, history: true },
        });
        await this.createHistory(record.id, {
            action: 'SCHEDULED',
            newStatus: record.status,
            reason: 'Scheduled vaccination dose',
        });
        return record;
    }
    async findRecordById(id, includeDeleted = false) {
        return (await this.db.vaccinationRecord.findFirst({
            where: { id, ...(includeDeleted ? {} : { isDeleted: false }) },
            include: { vaccine: true, schedule: true, certificates: true, history: { orderBy: { createdAt: 'desc' } } },
        }));
    }
    async findRecordsByProfile(patientProfileId, includeDeleted = false) {
        return (await this.db.vaccinationRecord.findMany({
            where: { patientProfileId, ...(includeDeleted ? {} : { isDeleted: false }) },
            include: { vaccine: true, schedule: true, certificates: true, history: { orderBy: { createdAt: 'desc' } } },
            orderBy: { createdAt: 'desc' },
        }));
    }
    async updateRecord(id, data) {
        return (await this.db.vaccinationRecord.update({
            where: { id },
            data: {
                status: data.status || undefined,
                dueDate: data.dueDate ? new Date(data.dueDate) : undefined,
                administeredDate: data.administeredDate ? new Date(data.administeredDate) : undefined,
                administeredBy: data.administeredBy || undefined,
                facilityName: data.facilityName || undefined,
                batchNumber: data.batchNumber || undefined,
                lotNumber: data.lotNumber || undefined,
                expirationDate: data.expirationDate ? new Date(data.expirationDate) : undefined,
                siteOfInjection: data.siteOfInjection || undefined,
                routeOfAdmin: data.routeOfAdmin || undefined,
                notes: data.notes || undefined,
                isDeleted: data.isDeleted ?? undefined,
                deletedAt: data.deletedAt || undefined,
            },
            include: { vaccine: true, schedule: true, certificates: true, history: { orderBy: { createdAt: 'desc' } } },
        }));
    }
    async softDeleteRecord(id) {
        await this.db.vaccinationRecord.update({
            where: { id },
            data: { isDeleted: true, deletedAt: new Date() },
        });
    }
    async searchRecords(query) {
        const q = query.toLowerCase();
        return (await this.db.vaccinationRecord.findMany({
            where: {
                isDeleted: false,
                OR: [
                    { vaccine: { name: { contains: q, mode: 'insensitive' } } },
                    { vaccine: { code: { contains: q, mode: 'insensitive' } } },
                    { batchNumber: { contains: q, mode: 'insensitive' } },
                    { facilityName: { contains: q, mode: 'insensitive' } },
                ],
            },
            include: { vaccine: true, schedule: true, certificates: true },
            orderBy: { createdAt: 'desc' },
        }));
    }
    async createCertificate(data) {
        const certificateNumber = `VAC-CERT-${Date.now()}-${Math.floor(Math.random() * 10000)}`;
        return (await this.db.vaccinationCertificate.create({
            data: {
                patientProfileId: data.patientProfileId,
                recordId: data.recordId,
                certificateNumber,
                issueDate: new Date(),
                verificationStatus: 'VERIFIED',
                qrToken: data.qrToken || null,
                reportAttachmentId: data.reportAttachmentId || null,
                version: 1,
            },
        }));
    }
    async findCertificatesByProfile(patientProfileId) {
        return (await this.db.vaccinationCertificate.findMany({
            where: { patientProfileId },
            orderBy: { createdAt: 'desc' },
        }));
    }
    async upsertReminderConfig(patientProfileId, data) {
        const existing = await this.db.vaccinationReminderConfig.findFirst({
            where: { patientProfileId, vaccineId: data.vaccineId },
        });
        if (existing) {
            return (await this.db.vaccinationReminderConfig.update({
                where: { id: existing.id },
                data: {
                    reminderDaysBefore: data.reminderDaysBefore ?? existing.reminderDaysBefore,
                    enableEmail: data.enableEmail ?? existing.enableEmail,
                    enableSms: data.enableSms ?? existing.enableSms,
                    enablePush: data.enablePush ?? existing.enablePush,
                },
            }));
        }
        return (await this.db.vaccinationReminderConfig.create({
            data: {
                patientProfileId,
                vaccineId: data.vaccineId,
                reminderDaysBefore: data.reminderDaysBefore || 7,
                enableEmail: data.enableEmail ?? true,
                enableSms: data.enableSms ?? false,
                enablePush: data.enablePush ?? true,
            },
        }));
    }
    async createHistory(recordId, data) {
        return (await this.db.vaccinationHistory.create({
            data: {
                recordId,
                action: data.action,
                previousStatus: data.previousStatus || null,
                newStatus: data.newStatus,
                reason: data.reason || null,
                performedBy: data.performedBy || null,
            },
        }));
    }
    async createAuditLog(data) {
        return (await this.db.vaccinationAuditLog.create({
            data: {
                recordId: data.recordId,
                action: data.action,
                performedBy: data.performedBy || null,
                details: data.details || null,
            },
        }));
    }
    async getStatistics() {
        const totalVaccines = await this.db.vaccine.count({ where: { isActive: true } });
        const totalRecords = await this.db.vaccinationRecord.count({ where: { isDeleted: false } });
        const administeredDoses = await this.db.vaccinationRecord.count({ where: { status: 'ADMINISTERED', isDeleted: false } });
        const totalCertificates = await this.db.vaccinationCertificate.count();
        return {
            totalVaccines,
            totalRecords,
            administeredDoses,
            totalCertificates,
        };
    }
};
exports.ImmunisationRepository = ImmunisationRepository;
exports.ImmunisationRepository = ImmunisationRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [database_service_1.DatabaseService])
], ImmunisationRepository);
//# sourceMappingURL=immunisation.repository.js.map
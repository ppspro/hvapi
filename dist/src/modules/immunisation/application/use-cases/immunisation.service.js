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
exports.ImmunisationService = void 0;
const common_1 = require("@nestjs/common");
const qr_service_1 = require("../../../qr/application/use-cases/qr.service");
const generate_qr_dto_1 = require("../../../qr/presentation/dto/generate-qr.dto");
const nestjs_pino_1 = require("nestjs-pino");
let ImmunisationService = class ImmunisationService {
    constructor(repository, qrService, logger) {
        this.repository = repository;
        this.qrService = qrService;
        this.logger = logger;
    }
    async resolveProfile(userId) {
        const profile = await this.repository.findProfileByUserId(userId);
        if (!profile) {
            throw new common_1.NotFoundException('Patient profile not found. Complete demographics onboarding first.');
        }
        return profile.id;
    }
    mapVaccine(v) {
        return {
            id: v.id,
            name: v.name,
            code: v.code,
            manufacturer: v.manufacturer || undefined,
            targetGroup: v.targetGroup,
            minAgeMonths: v.minAgeMonths,
            maxAgeMonths: v.maxAgeMonths || undefined,
            totalDosesRequired: v.totalDosesRequired,
            minIntervalDays: v.minIntervalDays,
            description: v.description || undefined,
            contraindications: v.contraindications || [],
            isActive: v.isActive,
            createdAt: v.createdAt.toISOString(),
        };
    }
    mapSchedule(s) {
        return {
            id: s.id,
            vaccineId: s.vaccineId,
            name: s.name,
            doseNumber: s.doseNumber,
            recommendedAgeMonths: s.recommendedAgeMonths,
            isBooster: s.isBooster,
            boosterIntervalDays: s.boosterIntervalDays || undefined,
            createdAt: s.createdAt.toISOString(),
        };
    }
    mapRecord(r) {
        return {
            id: r.id,
            patientProfileId: r.patientProfileId,
            vaccineId: r.vaccineId,
            scheduleId: r.scheduleId || undefined,
            doseNumber: r.doseNumber,
            status: r.status,
            dueDate: r.dueDate ? new Date(r.dueDate).toISOString().split('T')[0] : undefined,
            administeredDate: r.administeredDate ? new Date(r.administeredDate).toISOString().split('T')[0] : undefined,
            administeredBy: r.administeredBy || undefined,
            facilityName: r.facilityName || undefined,
            batchNumber: r.batchNumber || undefined,
            lotNumber: r.lotNumber || undefined,
            expirationDate: r.expirationDate ? new Date(r.expirationDate).toISOString().split('T')[0] : undefined,
            siteOfInjection: r.siteOfInjection || undefined,
            routeOfAdmin: r.routeOfAdmin || undefined,
            notes: r.notes || undefined,
            isDeleted: r.isDeleted,
            vaccine: r.vaccine ? this.mapVaccine(r.vaccine) : undefined,
            schedule: r.schedule ? this.mapSchedule(r.schedule) : undefined,
            createdAt: r.createdAt.toISOString(),
            updatedAt: r.updatedAt.toISOString(),
        };
    }
    mapCert(c) {
        return {
            id: c.id,
            patientProfileId: c.patientProfileId,
            recordId: c.recordId,
            certificateNumber: c.certificateNumber,
            issueDate: c.issueDate.toISOString(),
            verificationStatus: c.verificationStatus,
            qrToken: c.qrToken || undefined,
            reportAttachmentId: c.reportAttachmentId || undefined,
            version: c.version,
            createdAt: c.createdAt.toISOString(),
        };
    }
    async createVaccine(dto) {
        const vaccine = await this.repository.createVaccine(dto);
        return this.mapVaccine(vaccine);
    }
    async getVaccines() {
        const vaccines = await this.repository.findVaccines();
        return vaccines.map((v) => this.mapVaccine(v));
    }
    async createSchedule(dto) {
        const schedule = await this.repository.createSchedule(dto);
        return this.mapSchedule(schedule);
    }
    async getSchedules(vaccineId) {
        const schedules = await this.repository.findSchedules(vaccineId);
        return schedules.map((s) => this.mapSchedule(s));
    }
    async createRecord(userId, dto) {
        const profileId = await this.resolveProfile(userId);
        const vaccine = await this.repository.findVaccineById(dto.vaccineId);
        if (!vaccine) {
            throw new common_1.NotFoundException('Vaccine not found');
        }
        const record = await this.repository.createRecord({
            ...dto,
            patientProfileId: profileId,
            status: 'SCHEDULED',
        });
        await this.repository.createAuditLog({
            recordId: record.id,
            action: 'SCHEDULED',
            performedBy: userId,
            details: `Scheduled dose ${record.doseNumber} for ${vaccine.name}`,
        });
        return this.mapRecord(record);
    }
    async getRecords(userId) {
        const profileId = await this.resolveProfile(userId);
        const records = await this.repository.findRecordsByProfile(profileId);
        return records.map((r) => this.mapRecord(r));
    }
    async getRecordById(userId, id) {
        const profileId = await this.resolveProfile(userId);
        const record = await this.repository.findRecordById(id);
        if (!record)
            throw new common_1.NotFoundException('Vaccination record not found');
        if (record.patientProfileId !== profileId)
            throw new common_1.ForbiddenException('Access denied');
        return this.mapRecord(record);
    }
    async updateRecord(userId, id, dto) {
        const profileId = await this.resolveProfile(userId);
        const record = await this.repository.findRecordById(id);
        if (!record)
            throw new common_1.NotFoundException('Vaccination record not found');
        if (record.patientProfileId !== profileId)
            throw new common_1.ForbiddenException('Access denied');
        if (record.status === 'ARCHIVED') {
            throw new common_1.BadRequestException('Archived records cannot be modified');
        }
        const updated = await this.repository.updateRecord(id, dto);
        await this.repository.createAuditLog({
            recordId: id,
            action: 'UPDATED',
            performedBy: userId,
            details: 'Updated vaccination record details',
        });
        return this.mapRecord(updated);
    }
    async administerDose(userId, id, dto) {
        const profileId = await this.resolveProfile(userId);
        const record = await this.repository.findRecordById(id);
        if (!record)
            throw new common_1.NotFoundException('Vaccination record not found');
        if (record.patientProfileId !== profileId)
            throw new common_1.ForbiddenException('Access denied');
        const prevStatus = record.status;
        const updated = await this.repository.updateRecord(id, {
            ...dto,
            status: 'ADMINISTERED',
            administeredDate: new Date(),
        });
        await this.repository.createHistory(id, {
            action: 'ADMINISTERED',
            previousStatus: prevStatus,
            newStatus: 'ADMINISTERED',
            reason: `Administered by ${dto.administeredBy} at ${dto.facilityName}`,
            performedBy: userId,
        });
        await this.repository.createAuditLog({
            recordId: id,
            action: 'ADMINISTERED',
            performedBy: userId,
            details: `Administered dose batch ${dto.batchNumber}`,
        });
        return this.mapRecord(updated);
    }
    async completeRecord(userId, id, dto) {
        const profileId = await this.resolveProfile(userId);
        const record = await this.repository.findRecordById(id);
        if (!record)
            throw new common_1.NotFoundException('Vaccination record not found');
        if (record.patientProfileId !== profileId)
            throw new common_1.ForbiddenException('Access denied');
        const prevStatus = record.status;
        const updated = await this.repository.updateRecord(id, { status: 'COMPLETED' });
        await this.repository.createHistory(id, {
            action: 'COMPLETED',
            previousStatus: prevStatus,
            newStatus: 'COMPLETED',
            reason: dto.reason || 'Vaccination series completed',
            performedBy: userId,
        });
        return this.mapRecord(updated);
    }
    async deferRecord(userId, id, dto) {
        const profileId = await this.resolveProfile(userId);
        const record = await this.repository.findRecordById(id);
        if (!record)
            throw new common_1.NotFoundException('Vaccination record not found');
        if (record.patientProfileId !== profileId)
            throw new common_1.ForbiddenException('Access denied');
        const prevStatus = record.status;
        const updated = await this.repository.updateRecord(id, {
            status: 'DEFERRED',
            dueDate: dto.rescheduledDueDate ? new Date(dto.rescheduledDueDate) : undefined,
        });
        await this.repository.createHistory(id, {
            action: 'DEFERRED',
            previousStatus: prevStatus,
            newStatus: 'DEFERRED',
            reason: dto.reason,
            performedBy: userId,
        });
        return this.mapRecord(updated);
    }
    async archiveRecord(userId, id, dto) {
        const profileId = await this.resolveProfile(userId);
        const record = await this.repository.findRecordById(id);
        if (!record)
            throw new common_1.NotFoundException('Vaccination record not found');
        if (record.patientProfileId !== profileId)
            throw new common_1.ForbiddenException('Access denied');
        const prevStatus = record.status;
        const updated = await this.repository.updateRecord(id, { status: 'ARCHIVED' });
        await this.repository.createHistory(id, {
            action: 'ARCHIVED',
            previousStatus: prevStatus,
            newStatus: 'ARCHIVED',
            reason: dto.reason || 'Record archived',
            performedBy: userId,
        });
        return this.mapRecord(updated);
    }
    async restoreRecord(userId, id, dto) {
        const profileId = await this.resolveProfile(userId);
        const record = await this.repository.findRecordById(id, true);
        if (!record)
            throw new common_1.NotFoundException('Vaccination record not found');
        if (record.patientProfileId !== profileId)
            throw new common_1.ForbiddenException('Access denied');
        const prevStatus = record.status;
        const updated = await this.repository.updateRecord(id, {
            status: 'SCHEDULED',
            isDeleted: false,
            deletedAt: null,
        });
        await this.repository.createHistory(id, {
            action: 'RESTORED',
            previousStatus: prevStatus,
            newStatus: 'SCHEDULED',
            reason: dto.reason || 'Record restored',
            performedBy: userId,
        });
        return this.mapRecord(updated);
    }
    async generateCertificate(userId, dto) {
        const profileId = await this.resolveProfile(userId);
        const record = await this.repository.findRecordById(dto.recordId);
        if (!record)
            throw new common_1.NotFoundException('Vaccination record not found');
        if (record.patientProfileId !== profileId)
            throw new common_1.ForbiddenException('Access denied');
        let qrToken;
        try {
            const qr = await this.qrService.generateQr(userId, {
                entityId: record.id,
                entityType: generate_qr_dto_1.QrEntityType.IMMUNISATION,
            });
            qrToken = qr.token;
        }
        catch (err) {
            this.logger.warn({ msg: 'QR generation skipped for vaccination certificate', err });
        }
        const cert = await this.repository.createCertificate({
            patientProfileId: profileId,
            recordId: dto.recordId,
            qrToken,
            reportAttachmentId: dto.reportAttachmentId || null,
        });
        await this.repository.createAuditLog({
            recordId: dto.recordId,
            action: 'CERTIFICATE_ISSUED',
            performedBy: userId,
            details: `Issued digital certificate ${cert.certificateNumber}`,
        });
        return this.mapCert(cert);
    }
    async getCertificates(userId) {
        const profileId = await this.resolveProfile(userId);
        const certs = await this.repository.findCertificatesByProfile(profileId);
        return certs.map((c) => this.mapCert(c));
    }
    async configureReminder(userId, dto) {
        const profileId = await this.resolveProfile(userId);
        const config = await this.repository.upsertReminderConfig(profileId, dto);
        return {
            id: config.id,
            patientProfileId: config.patientProfileId,
            vaccineId: config.vaccineId,
            reminderDaysBefore: config.reminderDaysBefore,
            enableEmail: config.enableEmail,
            enableSms: config.enableSms,
            enablePush: config.enablePush,
            createdAt: config.createdAt.toISOString(),
        };
    }
    async searchRecords(query) {
        if (!query || query.trim().length === 0)
            return [];
        const records = await this.repository.searchRecords(query.trim());
        return records.map((r) => this.mapRecord(r));
    }
    async getStatistics() {
        return this.repository.getStatistics();
    }
};
exports.ImmunisationService = ImmunisationService;
exports.ImmunisationService = ImmunisationService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('IImmunisationRepository')),
    __metadata("design:paramtypes", [Object, qr_service_1.QrService,
        nestjs_pino_1.Logger])
], ImmunisationService);
//# sourceMappingURL=immunisation.service.js.map
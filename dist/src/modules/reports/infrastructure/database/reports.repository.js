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
exports.ReportsRepository = void 0;
const common_1 = require("@nestjs/common");
const database_service_1 = require("../../../../database/database.service");
let ReportsRepository = class ReportsRepository {
    constructor(db) {
        this.db = db;
    }
    async createDefinition(data) {
        const code = data.code || `RPT-${data.module.toUpperCase()}-${Date.now().toString().slice(-4)}`;
        return (await this.db.reportDefinition.create({
            data: {
                name: data.name,
                code,
                description: data.description || null,
                reportType: data.reportType || 'SUMMARY',
                module: data.module,
                configuration: data.configuration ? JSON.stringify(data.configuration) : null,
                isSystem: data.isSystem ?? false,
                isActive: data.isActive ?? true,
                createdBy: data.createdBy || null,
            },
        }));
    }
    async findDefinitions(module) {
        return (await this.db.reportDefinition.findMany({
            where: {
                isDeleted: false,
                ...(module ? { module } : {}),
            },
            orderBy: { createdAt: 'desc' },
        }));
    }
    async findDefinitionByCode(code) {
        return (await this.db.reportDefinition.findFirst({
            where: { code, isDeleted: false },
        }));
    }
    async findDefinitionById(id) {
        return (await this.db.reportDefinition.findFirst({
            where: { id, isDeleted: false },
        }));
    }
    async updateDefinition(id, data) {
        return (await this.db.reportDefinition.update({
            where: { id },
            data: {
                name: data.name || undefined,
                description: data.description || undefined,
                reportType: data.reportType || undefined,
                module: data.module || undefined,
                configuration: data.configuration ? JSON.stringify(data.configuration) : undefined,
                isActive: data.isActive ?? undefined,
                updatedBy: data.updatedBy || undefined,
            },
        }));
    }
    async softDeleteDefinition(id) {
        await this.db.reportDefinition.update({
            where: { id },
            data: { isDeleted: true, deletedAt: new Date() },
        });
    }
    async createGeneratedReport(data) {
        return (await this.db.generatedReport.create({
            data: {
                reportDefinitionId: data.reportDefinitionId || null,
                generatedBy: data.generatedBy || null,
                reportName: data.reportName,
                filters: data.filters ? JSON.stringify(data.filters) : null,
                exportFormat: data.exportFormat || 'JSON',
                filePath: data.filePath || null,
                status: data.status || 'GENERATED',
                expiresAt: data.expiresAt ? new Date(data.expiresAt) : null,
            },
        }));
    }
    async findGeneratedReports(userId) {
        return (await this.db.generatedReport.findMany({
            where: userId ? { generatedBy: userId } : {},
            include: { reportDefinition: true },
            orderBy: { generatedAt: 'desc' },
        }));
    }
    async findGeneratedReportById(id) {
        return (await this.db.generatedReport.findUnique({
            where: { id },
            include: { reportDefinition: true },
        }));
    }
    async updateGeneratedReportStatus(id, status, filePath) {
        return (await this.db.generatedReport.update({
            where: { id },
            data: {
                status: status,
                filePath: filePath || undefined,
            },
        }));
    }
    async createWidget(data) {
        return (await this.db.dashboardWidget.create({
            data: {
                title: data.title,
                widgetCode: data.widgetCode,
                widgetType: data.widgetType,
                module: data.module,
                configuration: data.configuration ? JSON.stringify(data.configuration) : null,
                displayOrder: data.displayOrder ?? 0,
                isEnabled: data.isEnabled ?? true,
            },
        }));
    }
    async findWidgets(isEnabledOnly = false) {
        return (await this.db.dashboardWidget.findMany({
            where: isEnabledOnly ? { isEnabled: true } : {},
            orderBy: [{ displayOrder: 'asc' }, { createdAt: 'desc' }],
        }));
    }
    async findWidgetByCode(code) {
        return (await this.db.dashboardWidget.findUnique({
            where: { widgetCode: code },
        }));
    }
    async findWidgetById(id) {
        return (await this.db.dashboardWidget.findUnique({
            where: { id },
        }));
    }
    async updateWidget(id, data) {
        return (await this.db.dashboardWidget.update({
            where: { id },
            data: {
                title: data.title || undefined,
                widgetType: data.widgetType || undefined,
                module: data.module || undefined,
                configuration: data.configuration ? JSON.stringify(data.configuration) : undefined,
                displayOrder: data.displayOrder ?? undefined,
                isEnabled: data.isEnabled ?? undefined,
            },
        }));
    }
    async reorderWidgets(widgetOrders) {
        for (const item of widgetOrders) {
            await this.db.dashboardWidget.update({
                where: { id: item.id },
                data: { displayOrder: item.displayOrder },
            });
        }
    }
    async createSnapshot(data) {
        return (await this.db.analyticsSnapshot.create({
            data: {
                module: data.module,
                metric: data.metric,
                metricValue: data.metricValue,
                snapshotDate: new Date(data.snapshotDate || Date.now()),
                metadata: data.metadata ? JSON.stringify(data.metadata) : null,
            },
        }));
    }
    async findSnapshots(module, metric, startDate, endDate) {
        const where = { module, metric };
        if (startDate || endDate) {
            where.snapshotDate = {};
            if (startDate)
                where.snapshotDate.gte = startDate;
            if (endDate)
                where.snapshotDate.lte = endDate;
        }
        return (await this.db.analyticsSnapshot.findMany({
            where,
            orderBy: { snapshotDate: 'asc' },
        }));
    }
    async createAuditLog(data) {
        return (await this.db.analyticsReportAuditLog.create({
            data: {
                reportId: data.reportId || null,
                action: data.action,
                performedBy: data.performedBy || null,
                details: data.details || null,
            },
        }));
    }
    async getExecutiveDashboardData(startDate, endDate) {
        const dateFilter = startDate || endDate ? {
            createdAt: {
                ...(startDate ? { gte: startDate } : {}),
                ...(endDate ? { lte: endDate } : {}),
            },
        } : {};
        const [totalPatients, totalDoctors, totalFacilities, totalStaff, totalHealthCards, totalInsurancePolicies, totalImmunisations, totalReports, totalAuditLogs,] = await Promise.all([
            this.db.patientProfile.count({ where: { ...dateFilter, isDeleted: false } }),
            this.db.doctorProfile.count({ where: { ...dateFilter, isDeleted: false } }),
            this.db.facility.count({ where: { ...dateFilter, isDeleted: false } }),
            this.db.staffMember.count({ where: { ...dateFilter, isDeleted: false } }),
            this.db.healthCard.count({ where: { ...dateFilter, isDeleted: false } }),
            this.db.insurancePolicy.count({ where: { ...dateFilter, isDeleted: false } }),
            this.db.vaccinationRecord.count({ where: dateFilter }),
            this.db.generatedReport.count({ where: dateFilter }),
            this.db.auditLog.count({ where: dateFilter }),
        ]);
        return {
            platformOverview: {
                totalPatients,
                totalDoctors,
                totalFacilities,
                totalStaff,
                totalHealthCards,
                totalInsurancePolicies,
                totalImmunisations,
                totalReports,
                totalAuditLogs,
            },
        };
    }
    async getModuleAnalytics(module, startDate, endDate) {
        const dateFilter = startDate || endDate ? {
            createdAt: {
                ...(startDate ? { gte: startDate } : {}),
                ...(endDate ? { lte: endDate } : {}),
            },
        } : {};
        const mod = module.toLowerCase();
        switch (mod) {
            case 'patient': {
                const total = await this.db.patientProfile.count({ where: { ...dateFilter, isDeleted: false } });
                const male = await this.db.patientProfile.count({ where: { ...dateFilter, gender: 'MALE', isDeleted: false } });
                const female = await this.db.patientProfile.count({ where: { ...dateFilter, gender: 'FEMALE', isDeleted: false } });
                return { module: 'patient', total, genderDistribution: { male, female, other: total - male - female } };
            }
            case 'doctor': {
                const total = await this.db.doctorProfile.count({ where: { ...dateFilter, isDeleted: false } });
                const verified = await this.db.doctorProfile.count({ where: { ...dateFilter, verificationStatus: 'VERIFIED', isDeleted: false } });
                const pending = await this.db.doctorProfile.count({ where: { ...dateFilter, verificationStatus: 'PENDING', isDeleted: false } });
                return { module: 'doctor', total, verificationStatus: { verified, pending, other: total - verified - pending } };
            }
            case 'facility': {
                const total = await this.db.facility.count({ where: { ...dateFilter, isDeleted: false } });
                const verified = await this.db.facility.count({ where: { ...dateFilter, verificationStatus: 'VERIFIED', isDeleted: false } });
                return { module: 'facility', total, verified };
            }
            case 'staff': {
                const total = await this.db.staffMember.count({ where: { ...dateFilter, isDeleted: false } });
                const active = await this.db.staffMember.count({ where: { ...dateFilter, employmentStatus: 'ACTIVE', isDeleted: false } });
                return { module: 'staff', total, active };
            }
            case 'insurance': {
                const policies = await this.db.insurancePolicy.count({ where: { ...dateFilter, isDeleted: false } });
                const active = await this.db.insurancePolicy.count({ where: { ...dateFilter, status: 'ACTIVE', isDeleted: false } });
                return { module: 'insurance', policies, activePolicies: active };
            }
            case 'immunisation': {
                const total = await this.db.vaccinationRecord.count({ where: dateFilter });
                const completed = await this.db.vaccinationRecord.count({ where: { ...dateFilter, status: 'COMPLETED' } });
                return { module: 'immunisation', totalRecords: total, completed };
            }
            default: {
                return { module, count: 0 };
            }
        }
    }
};
exports.ReportsRepository = ReportsRepository;
exports.ReportsRepository = ReportsRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [database_service_1.DatabaseService])
], ReportsRepository);
//# sourceMappingURL=reports.repository.js.map
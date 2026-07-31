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
exports.GovernanceRepository = void 0;
const common_1 = require("@nestjs/common");
const database_service_1 = require("../../../../database/database.service");
let GovernanceRepository = class GovernanceRepository {
    constructor(db) {
        this.db = db;
    }
    async createConfiguration(data) {
        const created = await this.db.systemConfiguration.create({
            data: {
                category: data.category || 'GENERAL',
                key: data.key,
                value: data.value,
                valueType: data.valueType || 'STRING',
                description: data.description || null,
                isEncrypted: data.isEncrypted ?? false,
                isEditable: data.isEditable ?? true,
                createdBy: data.createdBy || null,
            },
            include: { versions: true },
        });
        await this.db.configurationVersion.create({
            data: {
                configurationId: created.id,
                version: 1,
                previousValue: null,
                newValue: data.isEncrypted ? '********' : data.value,
                changedBy: data.createdBy || null,
                changeReason: 'Initial Configuration Creation',
            },
        });
        return created;
    }
    async findConfigurations(category) {
        return (await this.db.systemConfiguration.findMany({
            where: {
                isDeleted: false,
                ...(category ? { category: category } : {}),
            },
            include: { versions: { orderBy: { version: 'desc' } } },
            orderBy: { key: 'asc' },
        }));
    }
    async findConfigurationByKey(key) {
        return (await this.db.systemConfiguration.findFirst({
            where: { key, isDeleted: false },
            include: { versions: { orderBy: { version: 'desc' } } },
        }));
    }
    async findConfigurationById(id) {
        return (await this.db.systemConfiguration.findFirst({
            where: { id, isDeleted: false },
            include: { versions: { orderBy: { version: 'desc' } } },
        }));
    }
    async updateConfiguration(id, data, changeReason) {
        const existing = await this.db.systemConfiguration.findUnique({ where: { id } });
        const newVersionNumber = (existing?.version || 1) + 1;
        const updated = await this.db.systemConfiguration.update({
            where: { id },
            data: {
                value: data.value !== undefined ? data.value : undefined,
                category: data.category || undefined,
                valueType: data.valueType || undefined,
                description: data.description || undefined,
                isEncrypted: data.isEncrypted ?? undefined,
                version: newVersionNumber,
                updatedBy: data.updatedBy || undefined,
            },
            include: { versions: { orderBy: { version: 'desc' } } },
        });
        if (data.value !== undefined && data.value !== existing?.value) {
            await this.db.configurationVersion.create({
                data: {
                    configurationId: id,
                    version: newVersionNumber,
                    previousValue: existing?.isEncrypted ? '********' : existing?.value,
                    newValue: data.isEncrypted || existing?.isEncrypted ? '********' : data.value,
                    changedBy: data.updatedBy || null,
                    changeReason: changeReason || 'Configuration Value Updated',
                },
            });
        }
        return updated;
    }
    async softDeleteConfiguration(id) {
        await this.db.systemConfiguration.update({
            where: { id },
            data: { isDeleted: true, deletedAt: new Date() },
        });
    }
    async bulkUpsertConfigurations(configs, userId) {
        let count = 0;
        for (const c of configs) {
            const existing = await this.findConfigurationByKey(c.key);
            if (existing) {
                await this.updateConfiguration(existing.id, { ...c, updatedBy: userId }, 'Bulk Import Update');
            }
            else {
                await this.createConfiguration({ ...c, createdBy: userId });
            }
            count++;
        }
        return count;
    }
    async createFeatureFlag(data) {
        return (await this.db.featureFlag.create({
            data: {
                code: data.code,
                name: data.name,
                description: data.description || null,
                status: data.status || 'DISABLED',
                enabledForRoles: data.enabledForRoles || [],
                enabledForModules: data.enabledForModules || [],
                rolloutPercentage: data.rolloutPercentage ?? 100,
            },
        }));
    }
    async findFeatureFlags() {
        return (await this.db.featureFlag.findMany({
            where: { isDeleted: false },
            orderBy: { code: 'asc' },
        }));
    }
    async findFeatureFlagByCode(code) {
        return (await this.db.featureFlag.findFirst({
            where: { code, isDeleted: false },
        }));
    }
    async findFeatureFlagById(id) {
        return (await this.db.featureFlag.findFirst({
            where: { id, isDeleted: false },
        }));
    }
    async updateFeatureFlag(id, data) {
        const existing = await this.db.featureFlag.findUnique({ where: { id } });
        return (await this.db.featureFlag.update({
            where: { id },
            data: {
                name: data.name || undefined,
                description: data.description || undefined,
                status: data.status || undefined,
                enabledForRoles: data.enabledForRoles || undefined,
                enabledForModules: data.enabledForModules || undefined,
                rolloutPercentage: data.rolloutPercentage ?? undefined,
                version: (existing?.version || 1) + 1,
            },
        }));
    }
    async softDeleteFeatureFlag(id) {
        await this.db.featureFlag.update({
            where: { id },
            data: { isDeleted: true, deletedAt: new Date() },
        });
    }
    async createMasterCategory(data) {
        return (await this.db.masterDataCategory.create({
            data: {
                code: data.code,
                name: data.name,
                description: data.description || null,
                status: data.status || 'ACTIVE',
            },
            include: { items: true },
        }));
    }
    async findMasterCategories() {
        return (await this.db.masterDataCategory.findMany({
            where: { isDeleted: false },
            include: { items: { where: { isDeleted: false }, orderBy: { sortOrder: 'asc' } } },
            orderBy: { name: 'asc' },
        }));
    }
    async findMasterCategoryByCode(code) {
        return (await this.db.masterDataCategory.findFirst({
            where: { code, isDeleted: false },
            include: { items: { where: { isDeleted: false }, orderBy: { sortOrder: 'asc' } } },
        }));
    }
    async findMasterCategoryById(id) {
        return (await this.db.masterDataCategory.findFirst({
            where: { id, isDeleted: false },
            include: { items: { where: { isDeleted: false }, orderBy: { sortOrder: 'asc' } } },
        }));
    }
    async createMasterItem(data) {
        return (await this.db.masterDataItem.create({
            data: {
                categoryId: data.categoryId,
                code: data.code,
                name: data.name,
                description: data.description || null,
                sortOrder: data.sortOrder ?? 0,
                isDefault: data.isDefault ?? false,
                status: data.status || 'ACTIVE',
            },
        }));
    }
    async findMasterItems(categoryId) {
        return (await this.db.masterDataItem.findMany({
            where: {
                isDeleted: false,
                ...(categoryId ? { categoryId } : {}),
            },
            orderBy: [{ sortOrder: 'asc' }, { name: 'asc' }],
        }));
    }
    async findMasterItemById(id) {
        return (await this.db.masterDataItem.findFirst({
            where: { id, isDeleted: false },
        }));
    }
    async updateMasterItem(id, data) {
        return (await this.db.masterDataItem.update({
            where: { id },
            data: {
                name: data.name || undefined,
                description: data.description || undefined,
                sortOrder: data.sortOrder ?? undefined,
                isDefault: data.isDefault ?? undefined,
                status: data.status || undefined,
            },
        }));
    }
    async softDeleteMasterItem(id) {
        await this.db.masterDataItem.update({
            where: { id },
            data: { isDeleted: true, deletedAt: new Date() },
        });
    }
    async countActiveItemsInCategory(categoryId) {
        return this.db.masterDataItem.count({
            where: { categoryId, isDeleted: false, status: 'ACTIVE' },
        });
    }
    async createPolicy(data) {
        return (await this.db.platformGovernancePolicy.create({
            data: {
                code: data.code,
                title: data.title,
                description: data.description || null,
                content: data.content,
                version: data.version || '1.0',
                effectiveDate: data.effectiveDate ? new Date(data.effectiveDate) : null,
                status: data.status || 'ACTIVE',
            },
        }));
    }
    async findPolicies() {
        return (await this.db.platformGovernancePolicy.findMany({
            where: { isDeleted: false },
            orderBy: { createdAt: 'desc' },
        }));
    }
    async findPolicyByCode(code) {
        return (await this.db.platformGovernancePolicy.findFirst({
            where: { code, isDeleted: false },
        }));
    }
    async findPolicyById(id) {
        return (await this.db.platformGovernancePolicy.findFirst({
            where: { id, isDeleted: false },
        }));
    }
    async updatePolicy(id, data) {
        return (await this.db.platformGovernancePolicy.update({
            where: { id },
            data: {
                title: data.title || undefined,
                description: data.description || undefined,
                content: data.content || undefined,
                version: data.version || undefined,
                effectiveDate: data.effectiveDate ? new Date(data.effectiveDate) : undefined,
                status: data.status || undefined,
            },
        }));
    }
    async softDeletePolicy(id) {
        await this.db.platformGovernancePolicy.update({
            where: { id },
            data: { isDeleted: true, deletedAt: new Date() },
        });
    }
    async getMaintenanceConfig() {
        return (await this.db.maintenanceConfiguration.findFirst({
            orderBy: { createdAt: 'desc' },
        }));
    }
    async updateMaintenanceConfig(data) {
        const existing = await this.getMaintenanceConfig();
        if (existing) {
            return (await this.db.maintenanceConfiguration.update({
                where: { id: existing.id },
                data: {
                    mode: data.mode || undefined,
                    message: data.message || undefined,
                    startsAt: data.startsAt ? new Date(data.startsAt) : undefined,
                    endsAt: data.endsAt ? new Date(data.endsAt) : undefined,
                    allowAdminAccess: data.allowAdminAccess ?? undefined,
                },
            }));
        }
        return (await this.db.maintenanceConfiguration.create({
            data: {
                mode: data.mode || 'OFF',
                message: data.message || null,
                startsAt: data.startsAt ? new Date(data.startsAt) : null,
                endsAt: data.endsAt ? new Date(data.endsAt) : null,
                allowAdminAccess: data.allowAdminAccess ?? true,
            },
        }));
    }
    async createAuditLog(data) {
        return (await this.db.governanceAuditLog.create({
            data: {
                entityType: data.entityType,
                entityId: data.entityId,
                action: data.action,
                performedBy: data.performedBy || null,
                oldValue: data.oldValue || null,
                newValue: data.newValue || null,
                metadata: data.metadata ? JSON.stringify(data.metadata) : null,
            },
        }));
    }
    async findAuditLogs(entityType, limit = 100) {
        return (await this.db.governanceAuditLog.findMany({
            where: entityType ? { entityType } : {},
            orderBy: { createdAt: 'desc' },
            take: limit,
        }));
    }
    async findAuditLogById(id) {
        return (await this.db.governanceAuditLog.findUnique({
            where: { id },
        }));
    }
    async getGovernanceDashboardData() {
        const [totalConfigurations, activeFeatureFlags, masterDataCategoriesCount, masterDataItemsCount, activePoliciesCount, maintenanceConfig, recentAuditLogsCount,] = await Promise.all([
            this.db.systemConfiguration.count({ where: { isDeleted: false } }),
            this.db.featureFlag.count({ where: { isDeleted: false, status: 'ENABLED' } }),
            this.db.masterDataCategory.count({ where: { isDeleted: false } }),
            this.db.masterDataItem.count({ where: { isDeleted: false } }),
            this.db.platformGovernancePolicy.count({ where: { isDeleted: false, status: 'ACTIVE' } }),
            this.getMaintenanceConfig(),
            this.db.governanceAuditLog.count(),
        ]);
        return {
            totalConfigurations,
            activeFeatureFlags,
            masterDataCategoriesCount,
            masterDataItemsCount,
            activePoliciesCount,
            maintenanceMode: maintenanceConfig?.mode || 'OFF',
            recentAuditLogsCount,
        };
    }
};
exports.GovernanceRepository = GovernanceRepository;
exports.GovernanceRepository = GovernanceRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [database_service_1.DatabaseService])
], GovernanceRepository);
//# sourceMappingURL=governance.repository.js.map
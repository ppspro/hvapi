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
exports.GovernanceService = void 0;
const common_1 = require("@nestjs/common");
const nestjs_pino_1 = require("nestjs-pino");
let GovernanceService = class GovernanceService {
    constructor(governanceRepository, logger) {
        this.governanceRepository = governanceRepository;
        this.logger = logger;
    }
    async getDashboardSummary() {
        return this.governanceRepository.getGovernanceDashboardData();
    }
    async createConfiguration(userId, dto) {
        const existing = await this.governanceRepository.findConfigurationByKey(dto.key);
        if (existing) {
            throw new common_1.ConflictException(`Configuration key '${dto.key}' already exists`);
        }
        const config = await this.governanceRepository.createConfiguration({ ...dto, createdBy: userId });
        await this.governanceRepository.createAuditLog({
            entityType: 'CONFIGURATION',
            entityId: config.id,
            action: 'CREATED',
            performedBy: userId,
            newValue: config.isEncrypted ? '********' : config.value,
            metadata: { key: config.key },
        });
        return this.mapConfiguration(config);
    }
    async getConfigurations(category) {
        const configs = await this.governanceRepository.findConfigurations(category);
        return configs.map((c) => this.mapConfiguration(c));
    }
    async getConfigurationById(id) {
        const config = await this.governanceRepository.findConfigurationById(id);
        if (!config)
            throw new common_1.NotFoundException('System configuration not found');
        return this.mapConfiguration(config);
    }
    async updateConfiguration(id, dto, userId) {
        const config = await this.governanceRepository.findConfigurationById(id);
        if (!config)
            throw new common_1.NotFoundException('System configuration not found');
        const updated = await this.governanceRepository.updateConfiguration(id, { ...dto, updatedBy: userId }, dto.changeReason);
        await this.governanceRepository.createAuditLog({
            entityType: 'CONFIGURATION',
            entityId: id,
            action: 'UPDATED',
            performedBy: userId,
            oldValue: config.isEncrypted ? '********' : config.value,
            newValue: updated.isEncrypted ? '********' : updated.value,
            metadata: { key: config.key, changeReason: dto.changeReason },
        });
        return this.mapConfiguration(updated);
    }
    async softDeleteConfiguration(id, userId) {
        const config = await this.governanceRepository.findConfigurationById(id);
        if (!config)
            throw new common_1.NotFoundException('System configuration not found');
        await this.governanceRepository.softDeleteConfiguration(id);
        await this.governanceRepository.createAuditLog({
            entityType: 'CONFIGURATION',
            entityId: id,
            action: 'DELETED',
            performedBy: userId,
            metadata: { key: config.key },
        });
        return { message: 'System configuration soft-deleted successfully' };
    }
    async importConfigurations(dto, userId) {
        const imported = await this.governanceRepository.bulkUpsertConfigurations(dto.configurations, userId);
        await this.governanceRepository.createAuditLog({
            entityType: 'CONFIGURATION',
            entityId: 'BULK_IMPORT',
            action: 'IMPORTED',
            performedBy: userId,
            metadata: { count: imported },
        });
        return { imported };
    }
    async exportConfigurations(category) {
        return this.getConfigurations(category);
    }
    mapConfiguration(c) {
        return {
            id: c.id,
            category: c.category,
            key: c.key,
            value: c.isEncrypted ? '********' : c.value,
            valueType: c.valueType,
            description: c.description || undefined,
            isEncrypted: c.isEncrypted,
            isEditable: c.isEditable,
            version: c.version,
            createdBy: c.createdBy || undefined,
            updatedBy: c.updatedBy || undefined,
            status: c.status,
            versions: c.versions?.map((v) => ({
                id: v.id,
                version: v.version,
                previousValue: v.previousValue || undefined,
                newValue: v.newValue,
                changedBy: v.changedBy || undefined,
                changeReason: v.changeReason || undefined,
                createdAt: v.createdAt.toISOString(),
            })) || [],
            createdAt: c.createdAt.toISOString(),
            updatedAt: c.updatedAt.toISOString(),
        };
    }
    async createFeatureFlag(userId, dto) {
        const existing = await this.governanceRepository.findFeatureFlagByCode(dto.code);
        if (existing)
            throw new common_1.ConflictException(`Feature Flag code '${dto.code}' already exists`);
        const flag = await this.governanceRepository.createFeatureFlag(dto);
        await this.governanceRepository.createAuditLog({
            entityType: 'FEATURE_FLAG',
            entityId: flag.id,
            action: 'CREATED',
            performedBy: userId,
            newValue: flag.status,
            metadata: { code: flag.code },
        });
        return this.mapFeatureFlag(flag);
    }
    async getFeatureFlags() {
        const flags = await this.governanceRepository.findFeatureFlags();
        return flags.map((f) => this.mapFeatureFlag(f));
    }
    async getFeatureFlagById(id) {
        const flag = await this.governanceRepository.findFeatureFlagById(id);
        if (!flag)
            throw new common_1.NotFoundException('Feature Flag not found');
        return this.mapFeatureFlag(flag);
    }
    async updateFeatureFlag(id, dto, userId) {
        const flag = await this.governanceRepository.findFeatureFlagById(id);
        if (!flag)
            throw new common_1.NotFoundException('Feature Flag not found');
        const updated = await this.governanceRepository.updateFeatureFlag(id, dto);
        await this.governanceRepository.createAuditLog({
            entityType: 'FEATURE_FLAG',
            entityId: id,
            action: 'UPDATED',
            performedBy: userId,
            oldValue: flag.status,
            newValue: updated.status,
            metadata: { code: flag.code },
        });
        return this.mapFeatureFlag(updated);
    }
    async softDeleteFeatureFlag(id, userId) {
        const flag = await this.governanceRepository.findFeatureFlagById(id);
        if (!flag)
            throw new common_1.NotFoundException('Feature Flag not found');
        await this.governanceRepository.softDeleteFeatureFlag(id);
        await this.governanceRepository.createAuditLog({
            entityType: 'FEATURE_FLAG',
            entityId: id,
            action: 'DELETED',
            performedBy: userId,
            metadata: { code: flag.code },
        });
        return { message: 'Feature Flag soft-deleted successfully' };
    }
    mapFeatureFlag(f) {
        return {
            id: f.id,
            code: f.code,
            name: f.name,
            description: f.description || undefined,
            status: f.status,
            enabledForRoles: f.enabledForRoles || [],
            enabledForModules: f.enabledForModules || [],
            rolloutPercentage: f.rolloutPercentage,
            version: f.version,
            createdAt: f.createdAt.toISOString(),
            updatedAt: f.updatedAt.toISOString(),
        };
    }
    async createMasterCategory(userId, dto) {
        const existing = await this.governanceRepository.findMasterCategoryByCode(dto.code);
        if (existing)
            throw new common_1.ConflictException(`Master Data Category code '${dto.code}' already exists`);
        const cat = await this.governanceRepository.createMasterCategory(dto);
        await this.governanceRepository.createAuditLog({
            entityType: 'MASTER_DATA_CATEGORY',
            entityId: cat.id,
            action: 'CREATED',
            performedBy: userId,
            metadata: { code: cat.code },
        });
        return this.mapMasterCategory(cat);
    }
    async getMasterCategories() {
        const cats = await this.governanceRepository.findMasterCategories();
        return cats.map((c) => this.mapMasterCategory(c));
    }
    async createMasterItem(userId, dto) {
        const cat = await this.governanceRepository.findMasterCategoryById(dto.categoryId);
        if (!cat)
            throw new common_1.NotFoundException('Master Data Category not found');
        const item = await this.governanceRepository.createMasterItem(dto);
        await this.governanceRepository.createAuditLog({
            entityType: 'MASTER_DATA_ITEM',
            entityId: item.id,
            action: 'CREATED',
            performedBy: userId,
            metadata: { categoryId: dto.categoryId, code: item.code },
        });
        return this.mapMasterItem(item);
    }
    async getMasterItems(categoryId) {
        const items = await this.governanceRepository.findMasterItems(categoryId);
        return items.map((i) => this.mapMasterItem(i));
    }
    async updateMasterItem(id, dto, userId) {
        const item = await this.governanceRepository.findMasterItemById(id);
        if (!item)
            throw new common_1.NotFoundException('Master Data Item not found');
        const updated = await this.governanceRepository.updateMasterItem(id, dto);
        await this.governanceRepository.createAuditLog({
            entityType: 'MASTER_DATA_ITEM',
            entityId: id,
            action: 'UPDATED',
            performedBy: userId,
            metadata: { code: item.code },
        });
        return this.mapMasterItem(updated);
    }
    async softDeleteMasterItem(id, userId) {
        const item = await this.governanceRepository.findMasterItemById(id);
        if (!item)
            throw new common_1.NotFoundException('Master Data Item not found');
        await this.governanceRepository.softDeleteMasterItem(id);
        await this.governanceRepository.createAuditLog({
            entityType: 'MASTER_DATA_ITEM',
            entityId: id,
            action: 'DELETED',
            performedBy: userId,
            metadata: { code: item.code },
        });
        return { message: 'Master Data Item soft-deleted successfully' };
    }
    mapMasterCategory(c) {
        return {
            id: c.id,
            code: c.code,
            name: c.name,
            description: c.description || undefined,
            status: c.status,
            items: c.items?.map((i) => this.mapMasterItem(i)) || [],
            createdAt: c.createdAt.toISOString(),
        };
    }
    mapMasterItem(i) {
        return {
            id: i.id,
            categoryId: i.categoryId,
            code: i.code,
            name: i.name,
            description: i.description || undefined,
            sortOrder: i.sortOrder,
            isDefault: i.isDefault,
            status: i.status,
            createdAt: i.createdAt.toISOString(),
        };
    }
    async createPolicy(userId, dto) {
        const existing = await this.governanceRepository.findPolicyByCode(dto.code);
        if (existing)
            throw new common_1.ConflictException(`Platform Policy code '${dto.code}' already exists`);
        const policy = await this.governanceRepository.createPolicy(dto);
        await this.governanceRepository.createAuditLog({
            entityType: 'PLATFORM_POLICY',
            entityId: policy.id,
            action: 'CREATED',
            performedBy: userId,
            metadata: { code: policy.code, version: policy.version },
        });
        return this.mapPolicy(policy);
    }
    async getPolicies() {
        const policies = await this.governanceRepository.findPolicies();
        return policies.map((p) => this.mapPolicy(p));
    }
    async getPolicyById(id) {
        const policy = await this.governanceRepository.findPolicyById(id);
        if (!policy)
            throw new common_1.NotFoundException('Platform Policy not found');
        return this.mapPolicy(policy);
    }
    async updatePolicy(id, dto, userId) {
        const policy = await this.governanceRepository.findPolicyById(id);
        if (!policy)
            throw new common_1.NotFoundException('Platform Policy not found');
        const updated = await this.governanceRepository.updatePolicy(id, dto);
        await this.governanceRepository.createAuditLog({
            entityType: 'PLATFORM_POLICY',
            entityId: id,
            action: 'UPDATED',
            performedBy: userId,
            oldValue: policy.version,
            newValue: updated.version,
            metadata: { code: policy.code },
        });
        return this.mapPolicy(updated);
    }
    async softDeletePolicy(id, userId) {
        const policy = await this.governanceRepository.findPolicyById(id);
        if (!policy)
            throw new common_1.NotFoundException('Platform Policy not found');
        await this.governanceRepository.softDeletePolicy(id);
        await this.governanceRepository.createAuditLog({
            entityType: 'PLATFORM_POLICY',
            entityId: id,
            action: 'DELETED',
            performedBy: userId,
            metadata: { code: policy.code },
        });
        return { message: 'Platform Policy soft-deleted successfully' };
    }
    mapPolicy(p) {
        return {
            id: p.id,
            code: p.code,
            title: p.title,
            description: p.description || undefined,
            content: p.content,
            version: p.version,
            effectiveDate: p.effectiveDate ? p.effectiveDate.toISOString().split('T')[0] : undefined,
            status: p.status,
            createdAt: p.createdAt.toISOString(),
            updatedAt: p.updatedAt.toISOString(),
        };
    }
    async getMaintenanceConfig() {
        const config = await this.governanceRepository.getMaintenanceConfig();
        if (!config) {
            return {
                id: 'default',
                mode: 'OFF',
                message: 'System operating normally.',
                allowAdminAccess: true,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
            };
        }
        return {
            id: config.id,
            mode: config.mode,
            message: config.message || undefined,
            startsAt: config.startsAt ? config.startsAt.toISOString() : undefined,
            endsAt: config.endsAt ? config.endsAt.toISOString() : undefined,
            allowAdminAccess: config.allowAdminAccess,
            createdAt: config.createdAt.toISOString(),
            updatedAt: config.updatedAt.toISOString(),
        };
    }
    async updateMaintenanceConfig(dto, userId) {
        const config = await this.governanceRepository.updateMaintenanceConfig(dto);
        await this.governanceRepository.createAuditLog({
            entityType: 'MAINTENANCE',
            entityId: config.id,
            action: 'MAINTENANCE_MODE_UPDATED',
            performedBy: userId,
            newValue: config.mode,
            metadata: { mode: config.mode, allowAdminAccess: config.allowAdminAccess },
        });
        return {
            id: config.id,
            mode: config.mode,
            message: config.message || undefined,
            startsAt: config.startsAt ? config.startsAt.toISOString() : undefined,
            endsAt: config.endsAt ? config.endsAt.toISOString() : undefined,
            allowAdminAccess: config.allowAdminAccess,
            createdAt: config.createdAt.toISOString(),
            updatedAt: config.updatedAt.toISOString(),
        };
    }
    async getAuditLogs(entityType) {
        const logs = await this.governanceRepository.findAuditLogs(entityType);
        return logs.map((l) => ({
            id: l.id,
            entityType: l.entityType,
            entityId: l.entityId,
            action: l.action,
            performedBy: l.performedBy || undefined,
            oldValue: l.oldValue || undefined,
            newValue: l.newValue || undefined,
            metadata: l.metadata ? JSON.parse(l.metadata) : undefined,
            createdAt: l.createdAt.toISOString(),
        }));
    }
    async getAuditLogById(id) {
        const log = await this.governanceRepository.findAuditLogById(id);
        if (!log)
            throw new common_1.NotFoundException('Governance audit log not found');
        return {
            id: log.id,
            entityType: log.entityType,
            entityId: log.entityId,
            action: log.action,
            performedBy: log.performedBy || undefined,
            oldValue: log.oldValue || undefined,
            newValue: log.newValue || undefined,
            metadata: log.metadata ? JSON.parse(log.metadata) : undefined,
            createdAt: log.createdAt.toISOString(),
        };
    }
};
exports.GovernanceService = GovernanceService;
exports.GovernanceService = GovernanceService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('IGovernanceRepository')),
    __metadata("design:paramtypes", [Object, nestjs_pino_1.Logger])
], GovernanceService);
//# sourceMappingURL=governance.service.js.map
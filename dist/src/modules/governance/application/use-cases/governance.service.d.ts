import { IGovernanceRepository } from '../../domain/repositories/governance.repository.interface';
import { SystemConfigurationResponseDto, FeatureFlagResponseDto, MasterDataCategoryResponseDto, MasterDataItemResponseDto, PlatformGovernancePolicyResponseDto, MaintenanceConfigurationResponseDto, GovernanceAuditLogResponseDto, GovernanceDashboardResponseDto } from '../../presentation/dto/governance-response.dto';
import { CreateConfigurationDto, UpdateConfigurationDto, ImportConfigurationsDto, CreateFeatureFlagDto, CreateMasterCategoryDto, CreateMasterItemDto, CreatePlatformPolicyDto, UpdateMaintenanceModeDto } from '../../presentation/dto/governance-enterprise.dto';
import { Logger } from 'nestjs-pino';
export declare class GovernanceService {
    private readonly governanceRepository;
    private readonly logger;
    constructor(governanceRepository: IGovernanceRepository, logger: Logger);
    getDashboardSummary(): Promise<GovernanceDashboardResponseDto>;
    createConfiguration(userId: string, dto: CreateConfigurationDto): Promise<SystemConfigurationResponseDto>;
    getConfigurations(category?: string): Promise<SystemConfigurationResponseDto[]>;
    getConfigurationById(id: string): Promise<SystemConfigurationResponseDto>;
    updateConfiguration(id: string, dto: UpdateConfigurationDto, userId: string): Promise<SystemConfigurationResponseDto>;
    softDeleteConfiguration(id: string, userId: string): Promise<{
        message: string;
    }>;
    importConfigurations(dto: ImportConfigurationsDto, userId: string): Promise<{
        imported: number;
    }>;
    exportConfigurations(category?: string): Promise<SystemConfigurationResponseDto[]>;
    private mapConfiguration;
    createFeatureFlag(userId: string, dto: CreateFeatureFlagDto): Promise<FeatureFlagResponseDto>;
    getFeatureFlags(): Promise<FeatureFlagResponseDto[]>;
    getFeatureFlagById(id: string): Promise<FeatureFlagResponseDto>;
    updateFeatureFlag(id: string, dto: Partial<CreateFeatureFlagDto>, userId: string): Promise<FeatureFlagResponseDto>;
    softDeleteFeatureFlag(id: string, userId: string): Promise<{
        message: string;
    }>;
    private mapFeatureFlag;
    createMasterCategory(userId: string, dto: CreateMasterCategoryDto): Promise<MasterDataCategoryResponseDto>;
    getMasterCategories(): Promise<MasterDataCategoryResponseDto[]>;
    createMasterItem(userId: string, dto: CreateMasterItemDto): Promise<MasterDataItemResponseDto>;
    getMasterItems(categoryId?: string): Promise<MasterDataItemResponseDto[]>;
    updateMasterItem(id: string, dto: Partial<CreateMasterItemDto>, userId: string): Promise<MasterDataItemResponseDto>;
    softDeleteMasterItem(id: string, userId: string): Promise<{
        message: string;
    }>;
    private mapMasterCategory;
    private mapMasterItem;
    createPolicy(userId: string, dto: CreatePlatformPolicyDto): Promise<PlatformGovernancePolicyResponseDto>;
    getPolicies(): Promise<PlatformGovernancePolicyResponseDto[]>;
    getPolicyById(id: string): Promise<PlatformGovernancePolicyResponseDto>;
    updatePolicy(id: string, dto: Partial<CreatePlatformPolicyDto>, userId: string): Promise<PlatformGovernancePolicyResponseDto>;
    softDeletePolicy(id: string, userId: string): Promise<{
        message: string;
    }>;
    private mapPolicy;
    getMaintenanceConfig(): Promise<MaintenanceConfigurationResponseDto>;
    updateMaintenanceConfig(dto: UpdateMaintenanceModeDto, userId: string): Promise<MaintenanceConfigurationResponseDto>;
    getAuditLogs(entityType?: string): Promise<GovernanceAuditLogResponseDto[]>;
    getAuditLogById(id: string): Promise<GovernanceAuditLogResponseDto>;
}
